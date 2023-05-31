let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;

    constructor() {
        this.clientId = process.env.GOOGLE_OAUTH_ID;
        this.secretId = process.env.GOOGLE_OAUTH_SECRET;

        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback"
        },
            (accessToken, refreshToken, profile, done) => {
                console.log("[GooglePassport] Inside new password google strategy");
                process.nextTick(() => {
                    // console.log('[GooglePassport] validating google profile:' + JSON.stringify(profile));
                    // console.log("[GooglePassport] userId:" + profile.id);
                    // console.log("[GooglePassport] displayName: " + profile.displayName);
                    // console.log("[GooglePassport] Retrieved all of the profile info needed");
                    console.log(`[GooglePassport] \n\tid: ${profile.id}\n\tdisplayName: ${profile.displayName}\n\timage: ${profile.photos[0].value}\n\temail: ${profile.emails[0].value}`);
                    // this.email = profile.emails[0].value;
                    return done(null, profile);
                });
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;