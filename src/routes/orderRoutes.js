import express from "express";
import { createOrder, paymentWebhook } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/webhook", paymentWebhook);

export default router;