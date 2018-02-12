var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg" },
    { name: "Granite Hill", image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" },
    { name: "Mountain Goat's Rest", image: "https://www.mrmr.biz/wp-content/uploads/2014/09/camping1.jpg" },
    { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg" },
    { name: "Granite Hill", image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" },
    { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg" },
    { name: "Granite Hill", image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" },
    { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg" },
    { name: "Granite Hill", image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" }            
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    // gte data from form and add to cmapgrounds array
    var name = req.body.name;
    var image = req.body.image;

    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, "localhost", function() {
    console.log("YELPCAMP Server HAS STARTED")
});