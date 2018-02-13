var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     { 
//         name: "Granite Hill", 
//         image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" ,
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
        
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });        
        }
    });
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YELPCAMP Server HAS STARTED")
});