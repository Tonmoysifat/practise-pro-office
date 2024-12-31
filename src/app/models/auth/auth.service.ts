import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import {Prisma, UserRoles} from "@prisma/client";
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

    // let data: Prisma.UserCreateInput = {
    //     username: payload.username,
    //     email: payload.email,
    //     role: UserRoles.VISITOR,
    // };

    const res = await prisma.$transaction(async (tcl) => {
        const hashedPassword = await bcrypt.hash(payload.password, 12)
        const user = await tcl.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                role: UserRoles.VISITOR,
                password: hashedPassword,
            }
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
        return {user, token}

    })
    return res;
}

const loginUser = async (payload: { email: string, password: string }) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!existingUser) {
        throw new Error("User not found")
    }

    if (!existingUser.password) {
        throw new Error("Account is created using Google account");
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
        payload.password,
        existingUser.password
    );

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }

    const token = jwtHelpers.generateToken({
            id: existingUser.id,
            role: existingUser.role,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    )
    return {existingUser, token}
}

const createUserWithGoogleService = async (payload: {
    username: string,
    email: string,
    password?: string,
    role: string
}) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (existingUser) {
        if (existingUser.password && !payload.password) {
            throw new Error("Password is required");
        }

        const token = jwtHelpers.generateToken({
                id: existingUser.id,
                role: existingUser.role,
            },
            config.jwt.jwt_secret as Secret,
            config.jwt.expires_in as string
        )
        return {"login": true, existingUser, token}

    }

    const res = await prisma.$transaction(async (tcl) => {
        const user = await tcl.user.create({
            data: {
                username: payload.username,
                email: payload.email,
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
        return {user, token}

    })
    return res;
}

const getAllVisitorsService = async () => {
    const visitors = await prisma.visitor.findMany({
        include: {
            user: true,
        },
    });

    return visitors;
};
export const authService = {
    createUser,
    createUserWithGoogleService,
    loginUser,
    getAllVisitorsService
}