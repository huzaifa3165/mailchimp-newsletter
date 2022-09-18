const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const { json } = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
    let first_name = req.body.fname
    let last_name = req.body.lname
    let emailAddress = req.body.email
    let data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    }
    let JSONData = JSON.stringify(data);
    let options = {
        url: "https://us9.api.mailchimp.com/3.0/lists/f3a793a1dc",
        method: "POST",
        headers: {
            "Authorization": "huzaifa3165 8c92ba8fa759449104ad3294bccf7beb-us9"
        },
        body: JSONData
    }
    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html")
        } else {
            if (response.statusCode == 200) {
                res.sendFile(__dirname + "/success.html")
            }
            else {
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })
})


app.listen(process.env.PORT || 3000, function () {
    console.log(`Server listening at port ` + port + `
Go to localhost:` + port)
})

// List ID:   f3a793a1dc

// Api Key:   8c92ba8fa759449104ad3294bccf7beb-us9