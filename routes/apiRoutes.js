var db = require("../models");
var reservationData = require("../public/data/reservation.js");

module.exports = function(app) {
  // Get all examples
  app.post("/api/menus/", function(req, res) {
    db.Menu.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/menus/", function(req, res) {
    db.Menu.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/tables/", function(req, res) {
    db.Table.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/tables/", function(req, res) {
    db.Menu.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/customers/", function(req, res) {
    db.Customer.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/customers/", function(req, res) {
    db.Customer.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/reservations", function(req, res) {
    db.Reservation.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/reservations", function(req, res) {
    console.log(req.body);
    const {
      reservation_name,
      reservation_no_of_people,
      reservation_time,
      CustomerId,
      menuId
    } = req.body;
    db.Reservation.create({
      reservation_name,
      reservation_no_of_people,
      reservation_time
    }).then(function(result) {
      db.CustomerReservation.create({ CustomerId, ReservationId: 1 });
    });
    res.end();
  });

  app.get("/api/reserve", function(req, res) {
    res.json(reservationData);
  });

  app.post("/api/reserve", function(req, res) {
    db.Example.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  // Create a new example
  app.post("/api/reserve", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
