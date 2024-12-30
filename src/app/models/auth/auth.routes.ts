import express, { Request, Response,NextFunction }  from "express";
import {authController} from "./auth.controller";
import passport from "../passport/passport-setup";
const router = express.Router();

router.post('/create-user', authController.createCustomer)
router.get('/google', passport.authenticate('google', { scope: ['profile',"email"] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    authController.createCustomer
);

export const customerRouter = router

