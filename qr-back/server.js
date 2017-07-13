'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/.well-known/jwks.json"
    }),
    audience: '{YOUR-AUTH0-API-IDENTIFIER}',
    issuer: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/codes', authCheck, (req,res)=>{
  let deals = [{
    options:{
      background: '#ffffff',
      foreground: '#000000',
      level: 'h'
    },
    id:'1',
    name:'kek',
    model:{
      type:'sms',
      number:'1',
      message:'1'
    }
  },{
    options:{
      background: '#eaeaea',
      foreground: '#444444',
      level: 'l'
    },
    id:'2',
    name:'kek2',
    model:{
      type:'wifi',
      networkType:'WPA',
      name:'WPA',
      pass:'WPA',
      hidden:false
    }
  }];
  res.json(deals);
})

app.listen(3001);
console.log('Listening on localhost:3001');
