import prisma from "../../shared/prisma";
import {UserRoles} from "@prisma/client";
import bcrypt from "bcrypt"

export const initiateAdmin = async () => {
    const payload = {
        username: "Admin",
        email: "tonmoysifatmd@gmail.com",
        password: "123456",
        role: UserRoles.ADMIN,
    }

    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    })
    if (existingAdmin){
        return
    }
    await prisma.$transaction(async (TransactionClient) => {
        const hashedPassword = await bcrypt.hash(payload.password,12)
        const user = await TransactionClient.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: hashedPassword,
                role: payload.role,
            },
        })
        await TransactionClient.admin.create({
            data:{
                adminId: user.id
            }
        })
    })
}