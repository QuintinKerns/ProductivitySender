var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var http = require("http");
var https = require("https");

var j = schedule.scheduleJob('0 7-22 * * 2-6', sendProductivity());

var sendProductivity = function(){

}

var getProductivity = function(){
  // Use webscraper to log into cfahome, navigate to page with productivity, get productivity, log out, and return productivity value

  return 0;
}

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

// HTTP Request Options
var options = {
  host: 'https://hooks.slack.com/services/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',
  port: 443,
  path: '',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  }
};

module.exports = router;
