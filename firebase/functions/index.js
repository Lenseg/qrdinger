const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const redirects = admin.database().ref('/redirects/');
const codes = functions.database.ref('/codes/{uid}/{codeId}');

exports.writeRedirect = codes.onCreate(e => {
  const val = e.data.val();
  if( val.model.type === 'redirect' ){
    return redirects.child(val.model.path).set({
      redirect:val.model.redirect,
      uid:e.params.uid,
      codeid:e.params.codeId
    })
  }
  return 'No operation execluded';
});
exports.updateRedirect = codes.onUpdate(e => {
  const val = e.data.val();
  if( val.model.type === 'redirect' ){
    return redirects.child(val.model.path).set({
      redirect:val.model.redirect,
      uid:e.params.uid,
      codeid:e.params.codeId
    })
  }
  return 'No operation execluded';
});
exports.deleteRedirect = codes.onDelete(e => {
    const val = e.previous.val();
    if( val.model.type === 'redirect' ){
      return redirects.child(val.model.path).remove();
    }
    return 'No operation execluded';
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
