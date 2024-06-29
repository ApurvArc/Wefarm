const express = require("express");
const path = require("path");
const http = require("http");
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
var mongodb = require("mongodb");
const server = http.createServer(app);
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var bcrypt = require("bcrypt");
var fileSystem = require("fs");

var jwt = require("jsonwebtoken");
var accessTokenSecret = "myAccessTokenSecret1234567890";

// var mainURL = "http://localhost:3000";

app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;

// check connect

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
  
    return res.redirect("index.html");
  });


  app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    // var email = req.body.email;
    var phno = req.body.phno;
    var state = req.body.state;
    var city = req.body.city;
    var data = {
        "name": name,
        // "email": email,
        "phno": phno,
        "state": state,
        "city": city
    }
  
    //sent database
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('index.html');
  
  })

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));