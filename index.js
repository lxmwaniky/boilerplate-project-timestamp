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

app.get("/api/:date?", function (req, res) {
  // Extract the date parameter from the URL
  const userDate = req.params.date;

  // If the date parameter is empty, use the current time
  let date;
  if (!userDate) {
    date = new Date();
  } else {
    // Check if the provided date is valid
    date = new Date(userDate);
    if (isNaN(date.getTime())) {
      // If the date is invalid, return an error response
      return res.status(400).json({ error: 'Invalid Date' });
    }
  }

  // Format the UTC time
  const utcTime = date.toUTCString();

  // Send the response with Unix timestamp and UTC time
  res.json({ unix: date.getTime(), utc: utcTime });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
