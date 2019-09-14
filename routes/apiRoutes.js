require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const db = require("../models");
const reservationData = require("../public/data/reservation.js");
const Op = require("sequelize").Op;

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

const getMonthInNumber = month => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return months.indexOf(month) + 1;
};

const separateDateTime = datetime => {
  let [day, mm, dd, yyyy, time, timeZone] = datetime.split(" ");
  time = time.split(".")[0];
  let [hour, min, sec] = time.split(":");
  mm = getMonthInNumber(mm);
  let noon = "AM";
  if (hour >= 12) {
    if (hour > 12) hour -= 12;
    noon = "PM";
  }
  return [`${mm}/${dd}/${yyyy}`, `${hour}:${min} ${noon}`];
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
    if (req.query.reservationEmail || req.query.reservationPhone) {
      query[Op.or] = [
        { reservationEmail: req.query.reservationEmail },
        { reservationPhone: req.query.reservationPhone }
      ];
    }
    db.Reservation.findAll({
      where: query,
      include: [db.Table]
    }).then(function(result) {
      if (req.query.reservationEmail || req.query.reservationPhone) {
        res.json(
          result.map(reservation => {
            let [reservationDate, reservationTime] = separateDateTime(
              `${reservation.reservationTime}`
            );
            let reservationResult = {
              id: reservation.id,
              reservationName: reservation.reservationName,
              reservationEmail: reservation.reservationEmail,
              reservationPhone: reservation.reservationPhone,
              reservationDate,
              reservationTime,
              reservationTableName: reservation.Table.tableName
            };
            return reservationResult;
          })
        );
      } else {
        res.json(result);
      }
    });
  });

  app.post("/api/reservations", function(req, res) {
    makeReservation(req.body, res);
  });

  app.put("/api/reservations/", function(req, res) {
    db.Reservation.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
  app.put("/api/tables/", function(req, res) {
    db.Table.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
  app.put("/api/menus/", function(req, res) {
    db.Menu.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
  app.put("/api/informations/", function(req, res) {
    db.Information.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    });
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
  app.get("/api/bookings/checkout-session/:name/:price", function(req, res) {
    stripe.checkout.sessions
      .create({
        ["payment_method_types"]: ["card"],
        ["success_url"]: `${req.protocol}://${req.get("host")}/`,
        ["cancel_url"]: `${req.protocol}://${req.get("host")}/`,
        ["line_items"]: [
          {
            amount: req.params.price * 100,
            currency: "usd",
            quantity: 1,
            name: req.params.name
          }
        ]
      })
      .then(result =>
        res.status(200).json({
          status: "success"
        })
      );
  });
};
