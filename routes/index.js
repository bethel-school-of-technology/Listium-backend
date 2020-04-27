const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const models = require("../models");
const Sequelize = require("sequelize");

router.get("/", function (req, res, next) {
  res.render("Home", { title: "Listium" });
});

router.get("/events", function (req, res, next) {
  models.user
    .findAll({
      include: [models.events],
    })
    .then((eventsFound) => {
      res.render("events", {
        events: eventsFound,
      });
    });
});

router.get("/event/:id", function (req, res, next) {
  let Id = parseInt(req.params.id);
  models.event
    .findOne({
      where: {
        Id: Id,
      },
    })
    .then((event) => {
      res.render("specificEvent", {
        event: event,
      });
    });
});

router.post("/", function (req, res) {
  res.send("")
})


module.exports = router;
