const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (loggedInuser, done) {
  let user = userController.getUserById(loggedInuser.id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});
passport.use(localLogin);
module.exports = passport;
