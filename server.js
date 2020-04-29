const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  models.users
    .findall({
      include: [models.events],
    })
    .then((eventsFound) => {
      res.render("events", {
        events: { eventsFound },
      });
    });

  res.json({ events });
});

app.listen(port, () => `Server running on port ${port}`);
