const express = require('express');
const app = express();


var admin = require("firebase-admin");

var serviceAccount = require("firebaseconfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qrdinger.firebaseio.com"
});

app.get('/', function(req, res){

});

app.listen(3000);
