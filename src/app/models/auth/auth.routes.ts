import express from "express";
import {authController} from "./auth.controller";
import passport from "../passport/passport-setup";
const router = express.Router();

router.post('/create-user', authController.createCustomer)
router.post('/login-user', authController.loginCustomer)
router.get('/google', passport.authenticate('google', { scope: ['profile',"email"] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    authController.createCustomerWithGoogle
);

router.get("/get-visitor", authController.getAllVisitor)

export const customerRouter = router

