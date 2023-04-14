const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  let first_name = req.body.fname;
  let last_name = req.body.lname;
  let emailAddress = req.body.email;
  let data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name,
        },
      },
    ],
  };
  let JSONData = JSON.stringify(data);
  axios
    .post(process.env.API_URL, JSONData, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
    .then((response) => {
      res.sendFile(__dirname + "/success.html");
    })
    .catch((error) => {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    `Server listening at port ` +
      port +
      `
Go to localhost:` +
      port
  );
});

// List ID:   f3a793a1dc

// Api Key:   8c92ba8fa759449104ad3294bccf7beb-us9
