var db = require("../models");
var reservationData = require("../public/data/reservation.js");

const makeReservation = (reservation, res) => {
  const {
    reservationName,
    reservationNoOfPeople,
    tableReservedTime,
    CustomerId,
    tableId,
    menuId
  } = reservation;
  db.Reservation.create({
    reservationName,
    reservationNoOfPeople,
    CustomerId
  })
    .then(function(result) {
      console.log(tableId);
      db.Table.update(
        {
          tableReserved: true,
          tableReservedTime,
          tableAvailability: false,
          CustomerId
        },
        {
          where: {
            id: tableId
          }
        }
      );
    })
    .then(result => {
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
    var query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.Reservation.findAll({
      where: query,
      include: [db.Customer]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/reservations", function(req, res) {
    if (!Object.keys(req.body).includes("tableId"))
      db.Table.findAll({
        where: {
          tableAvailability: true
        }
      })
        .then(function(result) {
          req.body.tableId = result[0].dataValues.id;
        })
        .then(function(result) {
          makeReservation(req.body, res);
        });
    else makeReservation(req.body, res);
  });

  app.post("/api/order", (req, res) => {
    makeOrder(req.body, res);
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
