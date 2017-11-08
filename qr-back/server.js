const express = require('express');
const app = express();
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseconfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qrdinger.firebaseio.com"
});

const db = admin.database();

router.route('/rapi/:rid/')
  .get(function(req, res){
    let userCodes = db.ref(`/redirects/${req.params.rid}/`);
    userCodes.on("value", (snapshot) => {
      let redirect = snapshot.val();
      res.redirect(redirect.redirect);
    });
  });

app.use('', router);

app.listen(3000);
