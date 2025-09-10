
import axios from "axios";
import crypto from "crypto";
import Order from "../DB/models/order.js";

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID_CARD = process.env.PAYMOB_INTEGRATION_ID_CARD;
const PAYMOB_INTEGRATION_ID_WALLET = process.env.PAYMOB_INTEGRATION_ID_WALLET;
const PAYMOB_HMAC = process.env.PAYMOB_HMAC;


export const createOrder = async (req, res) => {
  try {
    const { courseId, amount, paymentMethod } = req.body;
    const userId = req.user.id; 


    const newOrder = await Order.create({
      userId,
      courseId,
      amount,
      status: "pending",
    });

    
    const authRes = await axios.post("https://accept.paymob.com/api/auth/tokens", {
      api_key: PAYMOB_API_KEY,
    });

    const token = authRes.data.token;

    
    const paymobOrder = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount * 100,
        currency: "EGP",
        items: [],
      }
    );

    
    newOrder.paymobOrderId = paymobOrder.data.id;
    await newOrder.save();

    
    const paymentKeyRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
        amount_cents: amount * 100,
        currency: "EGP",
        order_id: paymobOrder.data.id,
        integration_id:
          paymentMethod === "wallet"
            ? PAYMOB_INTEGRATION_ID_WALLET
            : PAYMOB_INTEGRATION_ID_CARD,
        billing_data: {
          apartment: "NA",
          email: "test@example.com",
          floor: "NA",
          first_name: "Student",
          street: "NA",
          building: "NA",
          phone_number: "+201000000000",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: "User",
          state: "NA",
        },
      }
    );

    return res.json({
      order: newOrder,
      paymentKey: paymentKeyRes.data.token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Payment error", error: err.message });
  }
};


export const paymentWebhook = async (req, res) => {
  try {
    const {
      obj: { id, order, success, hmac, transaction_id },
    } = req.body;

    
    const calculatedHmac = crypto
      .createHmac("sha512", PAYMOB_HMAC)
      .update(order.toString())
      .digest("hex");

    if (hmac !== calculatedHmac) {
      return res.status(400).json({ message: "Invalid HMAC" });
    }

    
    const dbOrder = await Order.findOne({ paymobOrderId: order });
    if (!dbOrder) return res.status(404).json({ message: "Order not found" });

    dbOrder.status = success ? "paid" : "failed";
    dbOrder.transactionId = transaction_id;
    await dbOrder.save();

    return res.json({ message: "Order updated", order: dbOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Webhook error", error: err.message });
  }
};
