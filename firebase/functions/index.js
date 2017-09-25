const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const redirects = admin.database().ref('/redurects/');
const codes = functions.database.ref('/codes/{uid}/{codeId}');

export.writeRedirect = function(){
  codes.onCreate(e => {
    const val = e.data.val();
    if( val.model.type === 'redirect' ){
      redirects.child(val.model.path).set({
        redirect:val.model.redirect,
        uid:e.data.ref.parent().key,
        codeid:e.data.key
      })
    }
  });
}
export.updateRedirect = function(){
  codes.onUpdate(e => {
    const val = e.data.val();
    if( val.model.type === 'redirect' ){
      redirects.child(val.model.path).set({
        redirect:val.model.redirect,
        uid:e.data.ref.parent().key,
        codeid:e.data.key
      })
    }
  });
}
export.deleteRedirect = function(){
  codes.onDelete(e => {
    const val = e.previous.val();
    if( val.model.type === 'redirect' ){
      redirects.child(val.model.path).remove();
    }
  });
}
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
