const passport = require("passport");
const connection = require("./conf");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      connection.query(
        `SELECT * FROM users WHERE user_email = '${email}' AND user_password='${password}'`,
        (err, result) => {
          if (err || result.length === 0) {
            return cb(null, false, {
              message: "E-mail ou mot de passe incorrects."
            });
          } else {
            return cb(
              null,
              { id: result[0].user_id, email: result[0].user_email },
              { message: "Logged In Successfully" }
            );
          }
        }
      );
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      const user = jwtPayload;
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return cb(null, user);
    }
  )
);
