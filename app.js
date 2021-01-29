const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function() {
    console.log('Server running on port 3000');
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/user", function(req, res) {
  const data = {
    fname: req.body.fname,
    lname: req.body.lname
  };
  res.json(data);
});

app.post("/result", function(req, res) {
  const data = {
    result: req.body.result
  }
  const fname = req.body.fname;
  const lname = req.body.lname;
  if (fname && lname) {
    console.log(`${fname} ${lname}'s ${req.body.result}`);
  } else {
    console.log(req.body.result);
  }
  res.json(data);
});