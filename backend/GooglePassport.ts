import googleAppAuth2 from './googleOAuth2';

let passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
     
    constructor() { 
        this.clientId = googleAppAuth2.id;
        this.secretId = googleAppAuth2.secret;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback"
//                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("[GooglePassport] Inside new password google strategy");
                process.nextTick( () => {
                    console.log('[GooglePassport] validating google profile:' + JSON.stringify(profile));
                    console.log("[GooglePassport] userId:" + profile.id);
                    console.log("[GooglePassport] displayName: " + profile.displayName);
                    console.log("[GooglePassport] Retrieved all of the profile info needed");
                    // this.email = profile.emails[0].value;
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;