var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds});        
        }
    });
});

router.post("/", function(req, res) {
    // gte data from form and add to cmapgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            // redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;