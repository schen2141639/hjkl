module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log(req.isAuthenticated(), "^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(req.user, "*********************")
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
