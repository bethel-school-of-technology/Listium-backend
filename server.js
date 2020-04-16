const express = require('express');

const app = express();

app.get('/api/events', (req, res) => {
  let events = [
    {
        id: 1,
        eventName: "The day we got our first dog!",
        eventCategory: "Special Day",
        eventDate: "April 13"
    },
    {
        id: 2,
        eventName: "Michael's Birthday",
        eventCategory: "Birthday",
        eventDate: "February 23"
    },
    {
        id: 3,
        eventName: "Parent's Anniversary",
        eventCategory: "Anniversary",
        eventDate: "March 11"
    },
    {
        id: 4,
        eventName: "Jim's Birthday",
        eventCategory: "Birthday",
        eventDate: "December 25"
    },
    {
        id: 5,
        eventName: "The day I first met my wife",
        eventCategory: "Special Day",
        eventDate: "January 12"
    },
    {
        id: 6,
        eventName: "Michael Scott's Birthday",
        eventCategory: "Birthday",
        eventDate: "November 25"
    },
    {
        id: 7,
        eventName: "Richa's Birthday",
        eventCategory: "Birthday",
        eventDate: "May 7"
    }
]
  res.json(events);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);