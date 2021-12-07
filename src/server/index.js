require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// API call to get rover general info
// RE-START YARN TO REFLECT UPDATES IN INDEX.JS !!
app.get("/rovers", async (req, res) => {
  try {
    let roversRet = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ roversRet }); //sends roversRet object
  } catch (err) {
    console.log("error:", err);
  }
});

// API call to get a rover's manifest
// RE-START YARN TO REFLECT UPDATES IN INDEX.JS !!
app.get("/mani", async (req, res) => {
  const url = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
  let manifestRet = [];
  try {
    manifestRet[0] = await fetch(
      `${url}curiosity?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    manifestRet[1] = await fetch(
      `${url}spirit?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    manifestRet[2] = await fetch(
      `${url}opportunity?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ manifestRet }); //sends manifestRet array of 3 objects
  } catch (err) {
    console.log("error:", err);
  }
});

// API call to get the latest photos by rover
app.get("/photos:latestDate", async (req, res) => {
  let photosRet = {};
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
  try {
    photosRet.curiosity = await fetch(
      `${url}curiosity/photos?earth_date=${req.params.latestDate}&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    photosRet.spirit = await fetch(
      `${url}spirit/photos?earth_date=2010-03-21&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    photosRet.opportunity = await fetch(
      `${url}opportunity/photos?earth_date=2018-06-11&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    //sends photosRet object, each element (.spirit, ..) is an array
    res.send({ photosRet });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
