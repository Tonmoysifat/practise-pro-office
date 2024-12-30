import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import httpStatus from "http-status";
import {authService} from "./auth.service";
import sendResponse from "../../../shared/sendResponse";


const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const result = await authService.createUser(data);

    res.cookie("token", result.token, {
        // secure: config.env === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User information created successfully",
        data: result,
    });

})

const createCustomerWithGoogle = catchAsync(async (req: Request, res: Response) => {
    const googleProfile = req.user;
    const result = await authService.createUserWithGoogleSer(googleProfile);

    res.cookie("token", result.token, {
        // secure: config.env === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User information created successfully",
        data: result,
    });
    res.send("Success")
    // console.log(googleProfile)
})
export const authController ={
    createCustomer,
    createCustomerWithGoogle
}