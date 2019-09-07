const db = require("../models");
const path = require("path");
const fs = require("fs");

module.exports = function(app) {
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
    const subCateArr = function(menus, menuCategory) {
      let subCategory = new Array();
      menus
        .filter(menu1 => menu1.menuCategory === menuCategory)
        .map(menu => {
          if (!subCategory.includes(menu.menuSubcategory))
            subCategory[menu.menuSubcategory] = menus
              .filter(
                item =>
                  item.menuSubcategory === menu.menuSubcategory &&
                  item.menuCategory === menu.menuCategory
              )
              .map(item => ({
                menuName: item["menuName"],
                menuDescription: item["menuDescription"],
                menuPrice: item["menuPrice"]
              }));
        });

      return subCategory;
    };

    const displayMenu = async () => {
      const res = await fetch("./api/menus/");
      const menus = await res.json();
      let menusByCategory = [];
      menus.map(menu => {
        if (!Object.keys(menusByCategory).includes(menu.menuCategory))
          menusByCategory[menu.menuCategory] = new Array(
            subCateArr(menus, menu.menuCategory)
          );
      });
      return menusByCateory;
    };

    displayMenu();
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

  app.get("/special-events", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cart.html"));
  });

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cart.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
