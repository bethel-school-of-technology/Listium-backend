const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const models = require("../models");
const Sequelize = require("sequelize");
const cors = require("cors");
const bodyParser = require("body-parser");

router.get("/", function (req, res, next) {
  res.render("Home", { title: "Listium" });
});



router.get("/event/:id", function (req, res, next) {
  let Id = parseInt(req.params.id);
  models.events
    .findOne({
      where: {
        Id: Id,
      },
    })
    .then((event) => {
      res.render("event", {
        event: event,
      });
    });
});

router.post("/", function (req, res) {
  res.send("");
});

module.exports = router;