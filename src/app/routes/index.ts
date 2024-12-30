import express from "express";
import {customerRouter} from "../models/auth/auth.routes";
const router = express.Router();

const moduleRoutes = [
    {
        path:"/auth",
        route: customerRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;