const db = require("../models");
const reservationData = require("../public/data/reservation.js");

const makeReservation = (reservation, res) => {
  const {
    reservationName,
    reservationDate,
    reservationTime,
    reservationEmail,
    reservationNoOfPeople,
    reservationPhone,
    TableId
  } = reservation;
  db.Reservation.create({
    reservationName,
    reservationDate,
    reservationTime,
    reservationEmail,
    reservationNoOfPeople,
    reservationPhone,
    TableId
  }).then(result => {
    res.json(result);
  });
};

const makeOrder = (tableMenus, res) => {
  tableMenus.map(tableMenu =>
    db.TableMenu.create(tableMenu).then(result => res.json(result))
  );
};

module.exports = function(app) {
  app.post("/api/menus/", function(req, res) {
    db.Menu.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/menus/", function(req, res) {
    let query = {};
    if (req.query.category) {
      query.menuCategory = req.query.category;
    }
    db.Menu.findAll({ where: query }).then(function(menus) {
      res.json(menus);
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
    let query = {};
    if (req.query.reservationDate) {
      query.reservationDate = req.query.reservationDate;
    }
    db.Reservation.findAll({
      where: query
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/reservations", function(req, res) {
    makeReservation(req.body, res);
  });

  app.get("/api/orders", (req, res) => {
    db.Order.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/orders", (req, res) => {
    makeOrder(req.body, res);
  });

  app.get("/api/informations", (req, res) => {
    db.Information.findAll({}).then(data => res.json(data));
  });

  app.get("/api/reserve", function(req, res) {
    res.json(reservationData);
  });

  app.post("/api/reserve", function(req, res) {
    db.Example.findAll({}).then(function(result) {
      res.json(result);
    });
  });
};
