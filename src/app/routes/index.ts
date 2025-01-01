import express from "express";
import {customerRouter} from "../models/auth/auth.routes";
import {PaymentRoute} from "../models/payment/payment.routes";
const router = express.Router();

const moduleRoutes = [
    {
        path:"/auth",
        route: customerRouter
    },
    {
        path: "/payment",
        route: PaymentRoute,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;