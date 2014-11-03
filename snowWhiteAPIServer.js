// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database'); 			// load the database config
var port = process.env.PORT || 2100; 		// set our port
var host = process.env.HOST || 'localhost';// set our host
var router = express.Router(); 				// get an instance of the express Router



//global.db = mongoose.createConnection(database.url);
//35 connect to735 mongoDB database
global.db = mongoose.connect(database.url, function (err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    } else {

    }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
//app.use(express.bodyParser());
//app.use(express.methodOverride());

 //test route to make sure everything is working (accessed at GET http://localhost:2100/)
 //middleware to use for all requests
router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Content-Disposition', 'inline; filename="files.json"');

    res.JSON = true;
    // do logging    
    console.log(req.method);
    console.log(req.url);
    next(); // make sure we go to the next routes and don't stop here
});
var routes_setting = require('./app/routes/setting');

router.post('/AddSetting', routes_setting.AddSetting);//add new Setting
router.post('/UpdateSetting/:id', routes_setting.UpdateSetting);//update Setting
router.delete('/DeleteSetting/:id', routes_setting.DeleteSetting);//delete Setting
router.get('/GetSettings', routes_setting.GetSettings);//List all Setting
router.get('/GetSettingInfo/:email', routes_setting.GetSettingInfo);//get Setting info

var routes_user = require('./app/routes/user');

router.post('/LoginUser', routes_user.LoginUser);//login by posting email & password
router.post('/AddUser/:username', routes_user.AddUser);//add new user
router.post('/UpdateUserWithoutImage/:user_id', routes_user.UpdateUserWithoutImage);//update user
router.post('/UpdateUserWithImage/:username', routes_user.UpdateUserWithImage);//update user
router.delete('/DeleteUser/:user_id', routes_user.DeleteUser);//delete user


router.get('/GetUsers', routes_user.GetUsers);//List all users
router.get('/GetUsernames', routes_user.GetUsernames);//get details specified user
router.get('/GetProfileInfo/:email', routes_user.GetProfileInfo);//get profile info


var routes_file = require('./app/routes/file')

router.get('/file/list/:name', routes_file.findFiles);
router.post('/file/add/:name', routes_file.addFile);
router.delete('/file/delete/:file_id', routes_file.deleteFile);
router.put('/file/update/:file_id', routes_file.updateFile);

app.use('/api', router);
// START735 THE SERVER
// =============================================================================
app.listen(port);
console.log('http-server running on ' + host + ':' + port);

if (process.platform !== 'win32') {
    //
    // Signal handlers don't work on Windows.
    //
    process.on('SIGINT', function () {
        console.log('http-server stopped.');
        process.exit();
    });
}