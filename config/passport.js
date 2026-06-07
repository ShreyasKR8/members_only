const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const localStrategy =
    new LocalStrategy(async (username, password, done) => {
        try {
            // console.log('Attempting login:', username);
            const user = await db.getUserByUsername(username);

            if (!user) {
                return done(null, false, {
                    message: "Incorrect username",
                });
            }

            const match = await bcrypt.compare(
                password,
                user.password_hash
            );

            if (!match) {
                return done(null, false, {
                    message: "Incorrect password",
                });
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    });

passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = db.getUserById(id);

        done(null, user);
    }
    catch (err) {
        done(err);
    }
});