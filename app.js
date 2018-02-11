var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg" },
        { name: "Granite Hill", image: "https://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/camping-expert-north-cascade-range-washington-lightweight-tent-0514.jpg?itok=u5IHDgjl" },
        { name: "Mountain Goat's Rest", image: "https://www.mrmr.biz/wp-content/uploads/2014/09/camping1.jpg" }
    ];

    res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, "localhost", function() {
    console.log("YELPCAMP Server HAS STARTED")
});