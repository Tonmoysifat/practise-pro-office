import catchAsync from "../../../shared/catchAsync";
import {PaymentService} from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.createOrder();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order created successfully",
        data: result,
    });
});

const captureOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderID } = req.params;

    const result = await PaymentService.captureOrder(orderID);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order captured successfully",
        data: result,
    });
});

export const PaymentController = {
    createOrder,
    captureOrder,

    // card payment
    // createCardPaymentIntent,
    // handleStripeWebhook,
    // paymentUpdateStudent,
    //
    // // crypto payment
    // addCryptoPaymentProof,
    // getCryptoPaymentProof,
    // updateCryptoPaymentProof,
};