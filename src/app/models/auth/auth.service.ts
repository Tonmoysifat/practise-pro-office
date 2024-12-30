import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import {UserRoles} from "@prisma/client";
import {jwtHelpers} from "../../../helpers/jwtHelper";
import {Secret} from "jsonwebtoken";
import config from "../../../config";


const createUser = async (payload: { username: string, email: string, password: string, role: string }) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (existingUser) {
        throw new Error("User already exists!")
    }

    const res = await prisma.$transaction(async (tcl) => {
        const hashedPassword = await bcrypt.hash(payload.password, 12)
        const user = await tcl.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: hashedPassword,
                role: UserRoles.VISITOR,
            },
        })
        await tcl.visitor.create({
            data: {
                VisitorId: user.id
            }
        })
        const token = jwtHelpers.generateToken({
                id: user.id,
                role: user.role,
            },
            config.jwt.jwt_secret as Secret,
            config.jwt.expires_in as string
        )
        return {user,token}

    })
    return res;
}

const createUserWithGoogleSer = async (payload: { username: string, email: string, role: string })=>{
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (existingUser) {
        throw new Error("User already exists!")
    }

    const res = await prisma.$transaction(async (tcl) => {
        // const hashedPassword = await bcrypt.hash(payload.password, 12)
        const user = await tcl.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                // password: hashedPassword,
                role: UserRoles.VISITOR,
            },
        })
        await tcl.visitor.create({
            data: {
                VisitorId: user.id
            }
        })
        const token = jwtHelpers.generateToken({
                id: user.id,
                role: user.role,
            },
            config.jwt.jwt_secret as Secret,
            config.jwt.expires_in as string
        )
        return {user,token}

    })
    return res;
}

export const authService = {
    createUser,
    createUserWithGoogleSer
}