const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const mysql = require("mysql2");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//EVENTS//////////////////////////////////////////////////////////////////
app.get("/events", (req, res) => {
  models.events.findAll().then(events => {
    console.log(events)
    res.json({events})
  })

});


// need to use useEffect on the component in React to get info. Routing in React is fine.
app.get("/event/:id", (req, res) => {
  models.events.findByPk(parseInt(req.params.id)).then((event) => {
    if (event) {
      res.json({
        EventName: event.eventName,
      });
    } else {
      res.send("Event not found");
    }
  });
});

//SIGNUP//////////////////////////////////////////////////////////////////

app.post("/signup", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username,
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect("login"); //<---Change this line to redirect to the login screen
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
        Username: req.body.username,
        Password: req.body.password,
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

//PROFILE//////////////////////////////////////////////////////////////////

app.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});


models.sequelize.sync().then(function () {
  console.log("DB is running!");
});

app.listen(port, () => `Server running on port ${port}`);
