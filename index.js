// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:dateTime", function (req, res) {
  const dateTime = req.params.dateTime;

  // Check if the parameter is a valid date or Unix timestamp
  const date = new Date(isNaN(dateTime) ? dateTime : parseInt(dateTime));

  if (isNaN(date.getTime())) {
    // If the date is invalid, return an error response
    return res.status(400).json({ error: 'Invalid date or timestamp' });
  }

  // Format the UTC time
  const utcTime = date.toUTCString();
  const unixTimestamp = date.getTime();

  // Send the response with Unix timestamp and UTC time
  res.json({ unix: unixTimestamp, utc: utcTime });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
