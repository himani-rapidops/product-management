// initialize express for handling routing and http requests
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //for parsing request body 
require('./config/mongo');
global.ROOT_PATH = __dirname;

const multer =require('multer');
//multer image store
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file : ', file);
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let splitFileName = file.originalname.split('.');
    file.originalname  = `${Math.random().toString(36).substring(2)}.${splitFileName[splitFileName.length-1]}`;
    cb(null, file.originalname);
  }
});

global.upload = multer({ storage: storage }).array('file', 1);
global.moreImagesUpload = multer({ storage: storage }).array('uploads[]', 10);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let mainModules = require('./modules');
let modules = new mainModules(app);

modules.initAPIs();

module.exports = app;
