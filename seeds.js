const mongoose = require("mongoose"),
	  Campground = require("./models/campground"),
	  Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/reserve/UJO0jYLtRte4qpyA37Xu_9X6A7388.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
		description: "Lorem ipsum dolor sit amet, elit luctus orci dolor, dictumst nulla et ut. Purus cras scelerisque vivamus ut, turpis velit ipsum nullam, nulla dapibus vestibulum placerat, est dis donec vivamus. Magna mauris pede mauris tellus, et vel massa conubia velit. Mi ipsum eu eleifend, volutpat vestibulum in ante suspendisse, quisque nulla ac et. Dui elementum commodo lobortis, ante lacus sed viverra. Lobortis praesent sit sollicitudin nullam, nulla sint quam mollis in, sit nunc sodales ipsum. Pharetra ornare etiam etiam erat, congue ac iaculis phasellus impedit."
	},
		{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
		description: "Lorem ipsum dolor sit amet, elit luctus orci dolor, dictumst nulla et ut. Purus cras scelerisque vivamus ut, turpis velit ipsum nullam, nulla dapibus vestibulum placerat, est dis donec vivamus. Magna mauris pede mauris tellus, et vel massa conubia velit. Mi ipsum eu eleifend, volutpat vestibulum in ante suspendisse, quisque nulla ac et. Dui elementum commodo lobortis, ante lacus sed viverra. Lobortis praesent sit sollicitudin nullam, nulla sint quam mollis in, sit nunc sodales ipsum. Pharetra ornare etiam etiam erat, congue ac iaculis phasellus impedit."
	},
	{
		name: "Something Creative",
		image: "https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, elit luctus orci dolor, dictumst nulla et ut. Purus cras scelerisque vivamus ut, turpis velit ipsum nullam, nulla dapibus vestibulum placerat, est dis donec vivamus. Magna mauris pede mauris tellus, et vel massa conubia velit. Mi ipsum eu eleifend, volutpat vestibulum in ante suspendisse, quisque nulla ac et. Dui elementum commodo lobortis, ante lacus sed viverra. Lobortis praesent sit sollicitudin nullam, nulla sint quam mollis in, sit nunc sodales ipsum. Pharetra ornare etiam etiam erat, congue ac iaculis phasellus impedit."
	}
];

function seedDB(){
	//remove all campgrounds
	Campground.deleteMany({}, (err) => {
		if(err){
			console.log(err);
		}
			console.log("DELETED CAMPGROUNDS");
		//add a few campgrounds
			data.forEach((seed) => {
				Campground.create(seed, (err, campground) =>{
					if(err){
						console.log(err);
					} else {
						console.log("added a campground");
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
						}, (err, comment) => {
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
							
						}
						);
					}
				});
			});
		});
}

module.exports = seedDB;


