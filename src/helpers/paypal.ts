import {Client, Environment} from "@paypal/paypal-server-sdk";
import config from "../config";

export const client = new Client({
    clientCredentialsAuthCredentials:{
        oAuthClientId: config.paypal.client_id as string,
        oAuthClientSecret: config.paypal.client_secret as string,
    },
    timeout: 0,
    environment: Environment.Sandbox,
})