import dotenv from "dotenv"

import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    PORT: process.env.PORT || 7985,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_in: process.env.EXPIRES_IN,
        // refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        // refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
        // reset_pass_secret: process.env.RESET_PASS_TOKEN,
        // reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
    },
    googleCred:{
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        // redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
        // scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    },
    paypal: {
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET,
        mode: process.env.PAYPAL_MODE,
    },

    // UPLOAD_PATH: process.env.UPLOAD_PATH,
    // CRON_JOBS: process.env.CRON_JOBS,
}