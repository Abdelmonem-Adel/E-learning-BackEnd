import crypto from "crypto";

const verifyHmac = (req, res, next) => {
  try {
    const hmac = req.query.hmac || req.body.hmac; 
    const secret = process.env.PAYMOB_HMAC_SECRET;

   
    const fields = [
      "amount_cents",
      "created_at",
      "currency",
      "error_occured",
      "has_parent_transaction",
      "id",
      "integration_id",
      "is_3d_secure",
      "is_auth",
      "is_capture",
      "is_refunded",
      "is_standalone_payment",
      "is_voided",
      "order.id",
      "owner",
      "pending",
      "source_data.pan",
      "source_data.sub_type",
      "source_data.type",
      "success",
    ];

    let data = "";
    fields.forEach((field) => {
      const value = field.split(".").reduce((o, key) => (o ? o[key] : ""), req.body);
      data += value ? value.toString() : "";
    });

    const calculatedHmac = crypto
      .createHmac("sha512", secret)
      .update(data)
      .digest("hex");

    if (calculatedHmac !== hmac) {
      return res.status(403).json({ message: "Invalid HMAC signature" });
    }

    next();
  } catch (err) {
    console.error("HMAC verification failed:", err.message);
    return res.status(500).json({ message: "HMAC verification failed" });
  }
};

export default verifyHmac;
