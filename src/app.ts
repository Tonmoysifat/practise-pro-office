import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status"
import path from "path";
// import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import passportSd from "./app/models/passport/passport-setup";
const app: Application = express();

export const corsOptions = {
    origin: [
        "https://api.myfinancialtrading.com",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

// Middleware setup
// app.options("*", cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passportSd.initialize());
// Route handler for the root endpoint
app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "How's Project API",
    });
});

// app.use("/uploads", express.static(path.join("/var/www/uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve static files from the "uploads" directory

// Setup API routes
app.use("/api/v1", router);

// Error handling middleware
// app.use(GlobalErrorHandler);

// Initialize cron jobs
// initializeCronJobs();

// 404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});

export default app;