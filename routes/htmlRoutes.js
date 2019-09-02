var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/menu", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/menu.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reserve.html"));
  });

  app.get("/catering", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/catering.html"));
  });

  app.get("/table-layout", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/table-layout.html"));
  });

  app.get("/cart", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cart.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
