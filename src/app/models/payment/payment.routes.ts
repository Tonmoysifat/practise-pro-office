import express from "express";
// import { upload } from "../../../helpars/fileUploader";
import { PaymentController } from "./payment.controller";

const router = express.Router();

// const uploadSingle = upload.single("image");

router.post("/create-order", PaymentController.createOrder);
router.post("/capture-order/:orderID", PaymentController.captureOrder);

// router.post("/update-student-payment", PaymentController.paymentUpdateStudent);

// router.post(
//     "/create-card-payment-intent",
//     PaymentController.createCardPaymentIntent
// );
//
//
//
// router.post(
//     "/webhook",
//     express.json({ type: "application/json" }),
//     PaymentController.handleStripeWebhook
// );
//
// router.post(
//     "/add-crypto-payment-proof",
//     uploadSingle,
//     PaymentController.addCryptoPaymentProof
// );
//
// router.post(
//     "/update-crypto-payment-proof",
//     PaymentController.updateCryptoPaymentProof
// );
//
// router.get(
//     "/get-crypto-payment-proof",
//     PaymentController.getCryptoPaymentProof
// );

export const PaymentRoute = router;
