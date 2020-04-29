const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res, next) {
  res.render("index", { title: "Listium" });
});

app.get("/events", (req, res) => {
  models.users.findall({
        include: [models.events],
      })
      .then((eventsFound) => {
        res.render("events", {
          events: { eventsFound },
        });
      });
  res.json({ events });
});

app.get("/api/events", (req, res) => {
  let events = [
    {
      id: 1,
      eventName: "The day we got our first dog!",
      eventCategory: "Special Day",
      eventDate: "April 13",
    },
    {
      id: 2,
      eventName: "Michael's Birthday",
      eventCategory: "Birthday",
      eventDate: "February 23",
    },
    {
      id: 3,
      eventName: "Parent's Anniversary",
      eventCategory: "Anniversary",
      eventDate: "March 11",
    },
    {
      id: 4,
      eventName: "Jim's Birthday",
      eventCategory: "Birthday",
      eventDate: "December 25",
    },
    {
      id: 5,
      eventName: "The day I first met my wife",
      eventCategory: "Special Day",
      eventDate: "January 12",
    },
    {
      id: 6,
      eventName: "Michael Scott's Birthday",
      eventCategory: "Birthday",
      eventDate: "November 25",
    },
    {
      id: 7,
      eventName: "Richa's Birthday",
      eventCategory: "Birthday",
      eventDate: "May 7",
    },
  ];
  res.json({ events });
});


models.sequelize.sync().then(function () {
  console.log("DB is running!")
});

app.listen(port, () => `Server running on port ${port}`);
