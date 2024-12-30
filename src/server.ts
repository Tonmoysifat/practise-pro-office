import { Server } from "http";
import app from "./app";
import config from "./config";
// import ngrok from "ngrok";

let server: Server;

// Main function to start the server
function main() {
    try {
        server = app.listen(config.PORT, () => {
            console.log(`Server is listening on: http://localhost:${config.PORT}`);

            // Start ngrok
            // const ngrokUrl = await ngrok.connect(5000);
            // console.log(`ngrok tunnel created at: ${ngrokUrl}`);
        });
    } catch (error) {
        console.log(error);
    }
}

// Start the server
main();

process.on("unhandledRejection", (err) => {
    console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
