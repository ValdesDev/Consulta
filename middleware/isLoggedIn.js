module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.user) {
    console.log("loged in")
    return res.redirect("/auth/login");
  }
  req.user = req.session.user;
  next();
};
