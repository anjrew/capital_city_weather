// IMPORTS
const express = require('express');
const chalk = require('chalk');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const print = require('./utils/print');
const server = require('http').Server(app);
const http = require('http');
const weatherApiKey = process.env.NODE_ENV != 'production' ? require('./secrets.json').weatherApiKey : process.env.WEATHER_API_KEY;

console.log("THE ENVIROMENT VARS ARE", process.env);


global.appRoot = path.resolve(__dirname);

// Very important to get the POST reests of forms
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    // console.log(chalk.bgBlue(`Recieve ${req.method} to ${req.url}`));
    next();
});


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


// Direct the user to the welcome screen if they are not logged in
// If there is a user ID the user must be logged in.

app.get('/get-weather/:city', function(req, res) {

    const city = req.params.city;

    getWeather(city,(err, response)=> {
        if (err) {
            print.error(err);
            res.sendStatus(500);
        }
        else{
            res.json(response);
        }
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

function getWeather(city ,callback){
	console.log(chalk.bgRedBright('The weather API key is'), weatherApiKey);
    const req = http.request({
        host: `api.openweathermap.org`,
        path:  encodeURI(`/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`),
        method: 'GET',
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    }, 
    // The the response comes in a callback
    (res) => {
        if (res.statusCode != 200){
            console.log("There was an error in the respone for get weather", res);

            callback(new Error(res.statusCode));
        }
        else{

            let body = '';
            res
                .on('data', (chunk) => body += chunk)
                .on('end', () => {
                    try {
                        body = JSON.parse(body);
                        callback(null, body);
                    } catch (e) {
                        callback(e);
                    }
                });
        }
    });

    req.on('error', (err) => callback(err));
    req.write('grant_type=client_credentials');
    req.end();
}

if (require.main === module) {
    server.listen(process.env.PORT || 8080, function() {
        console.log("I'm listening ON 8080.");
        console.log("Server addess", server.address());
    });
}
