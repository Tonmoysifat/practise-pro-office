import passport from "passport";
import config from "../../../config";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
passport.use(
    <passport.Strategy>new GoogleStrategy(
        {
            clientID: config.googleCred.client_id || '',
            clientSecret: config.googleCred.client_secret || '',
            callbackURL: 'http://localhost:7985/api/v1/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            if (profile.emails) {
                const data = {
                    username: profile.displayName,
                    email: profile.emails[0].value
                }
                done(null, data);
            }

        }
    )
);
export default passport;