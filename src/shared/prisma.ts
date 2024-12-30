import  {PrismaClient} from "@prisma/client"
import {initiateAdmin} from "../app/db/db";

const prisma  = new PrismaClient

const connectPrisma = async()=>{
    try{
        await prisma.$connect();
        console.log("Prisma connected to the database successfully!");
        initiateAdmin()
    }
    catch (error){
        console.error("Prisma connection failed:", error);
        process.exit(1);
    }
    process.on("SIGINT", async () => {
        await prisma.$disconnect();
        console.log("Prisma disconnected due to application termination.");
        process.exit(0);
    });
}
connectPrisma()

export default prisma