import {
    CheckoutPaymentIntent,
    OrdersController,
    ApiError as StripeApiError,
} from "@paypal/paypal-server-sdk";
import {client} from "../../../helpers/paypal";


const orderController = new OrdersController(client)
const createOrder = async () => {
    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: "100.00",
                    },
                },
            ],
        },
        prefer: "return=minimal",
    };

    try {
        const { body, ...httpResponse } = await orderController.ordersCreate(
            collect
        );
        // return {
        //   jsonResponse: body,
        //   httpStatusCode: httpResponse.statusCode,
        // };

        const data = typeof body === "string" ? JSON.parse(body) : body;
        // console.log(data, "data");

        const orderID = data.id;
        // console.log(orderID, "orderID");

        return orderID;
    } catch (error) {
        if (error instanceof StripeApiError) {
            // PayPal-specific error handling
            throw new Error(`PayPal API Error: ${error.message}`);
        } else {
            // General error handling
            throw new Error("An unexpected error occurred.");
        }
    }
};

const captureOrder = async (orderID: string) => {
    const collect = {
        id: orderID,
        prefer: "return=minimal",
    };

    try {
        const { body, ...httpResponse } = await orderController.ordersCapture(
            collect
        );
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        const data = typeof body === "string" ? JSON.parse(body) : body;

        return data;
    } catch (error) {
        if (error instanceof StripeApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message);
        }
    }
};

export const PaymentService = {
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



// PAYPAL_CLIENT_ID = Ac9T4lMsgL-DAfPYKYlJCzXeZZOla0DgQZjr957LvvTyLG7xSreh7cDmFLIVbeDekNOeUhDs2oJw99yT
// PAYPAL_CLIENT_SECRET = EGEbbTbfCQcC9Y-JTBwgni1o2hQp2wqbNyENM1BaL7YVuoaQRFdT6SRUY-f10GWGCoQC5HVBexZGLc7k
// PAYPAL_MODE=SANDBOX