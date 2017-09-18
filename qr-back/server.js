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

router.route('/rapi/:uid/:code')
  .get(function(req, res){
    let userCodes = db.ref(`/codes/${req.params.uid}/`);
    userCodes.on("value",(snapshot)=>{
      let codes = snapshot.val();
      for (var code in codes) {
        let codeInstance = codes[code];
        console.log(codeInstance)
        if (codeInstance.model && codeInstance.model.type === 'redirect') {
          console.log(codeInstance)
          codeInstance.model.path === req.params.code;
          res.redirect(codeInstance.model.redirect);
        }
      }
    })
  });

app.use('', router);

app.listen(3000);
