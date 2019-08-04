const express = require("express");
var router = express.Router();
const passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", (req, res) => {
	res.render("landing");
});


// =====================
// AUTH ROUTES
// =====================

// show register form
router.get("/register", (req, res) => {
	res.render("register", {page: "register"});
});

//handle sign up logic
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	if(req.body.adminCode === "secretcode456") {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login", {page: "login"});
});

//handling login logic
router.post("/login", passport.authenticate("local", 	
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),(req, res) => {	
});

//logout route
router.get("/logout", (req,res) => {
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/campgrounds");
});

module.exports = router;
