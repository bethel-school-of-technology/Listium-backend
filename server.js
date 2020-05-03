const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const mysql = require("mysql2");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//EVENTS////z//////////////////////////////////////////////////////////////
app.get("/events", (req, res) => {
  models.events.findAll().then((events) => {
    console.log(events);
    res.json(events);
  });
});

// app.post("/events", events.create);

// need to use useEffect on the component in React to get info. Routing in React is fine.
app.get("/event/:id", (req, res) => {
  models.events.findByPk(parseInt(req.params.id)).then((event) => {
    if (event) {
      res.json({
        EventName: event.eventName,
        EventCategory: event.eventCategory,
        EventDate: event.eventDate,
      });
    } else {
      res.send("Event not found");
    }
  });
});

app.post("/event",  (req, res, next) => {
  models.events
    .findOrCreate({
      where: {
        eventName: req.body.eventName,
      },
      defaults: {
        eventCategory: req.body.eventCategory,
        eventDate: req.body.eventDate,
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.send("EventCreated");
      } else {
        res.send("This event already exists!");
      }
    });
});

app.delete("/event/:id", (req, res) => {
  models.events.
    destroy({
      where: { id: req.body.id }
    })
    .then(result => res.send("Deleted!"))
    .catch(err => {
      res.status(400);
      res.send("Not today! Make sure you are specifying the correct id.");
    });
});
  

//PROFILE//////////////////////////////////////////////////////////////////

app.get("/profile/:id", function (req, res, next) {
  models.users.findByPk(parseInt(req.params.id)).then((user) => {
    if (user) {
      res.json({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Username: user.Username,
      });
    } else {
      res.send("User not found");
    }
  });
});

//SIGNUP//////////////////////////////////////////////////////////////////

app.post("/signup", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username,
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.send("success");
      } else {
        res.send("This username is taken!");
      }
    });
});
//LOGIN////////////////////////////////////////////////////////////////

app.post("/login", function (req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.Username,
        Password: req.body.Password,
      },
    })
    .then((user) => {
      if (user) {
        res.redirect("profile/" + user.UserId);
      } else {
        res.send("Invalid login!");
      }
    });
});




models.sequelize.sync().then(function () {
  console.log("DB is running!");
});

app.listen(port, () => `Server running on port ${port}`);
