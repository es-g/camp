var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("back");
			console.log(err);
		} else {
			// does the user own campground
			if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
				next();
			} else {
				req.flash("error", "You don't have permission to do that");
				res.redirect("back");
			}
			
		}
	});
	} else {
		req.flash("You need to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
	//is used logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err){
			res.redirect("back");
			console.log(err);
		} else {
			// does the user own campground
		if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
				next();
			} else {
				req.flash("error", "You do not have permissions to do that");
				res.redirect("back");
			}
			
		}
	});
	} else {
		req.flash("error", "You need to be logged in");
		res.redirect("back");
	}
};



middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first!");
	res.redirect("/login");
};

module.exports = middlewareObj;