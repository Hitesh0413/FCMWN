const express = require('express');
const firebaseAdmin = require('firebase-admin')
const subscribe = require('./src/subscribe');
const unsubscribe = require('./src/unsubscribe');
const notification = require('./src/notifiction');
const deviceToken = require('./src/device-token');

const app = express();
const port = parseInt(process.env.PORT || 3000);

const serviceAccount = require('./firebase_console/service-account.json');
firebaseAdmin.initializeApp({credential: firebaseAdmin.credential.cert(serviceAccount)});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/*
Request Routes.
*/
app.post('/notification', (req, res) => {
    let tokens = req.body.deviceToken;
    let message = {
        title : req.body.notificationTitle,
        body: req.body.notificationDescription,
        icon:"https://pbs.twimg.com/profile_images/1214827542303035393/qiWBdirT_400x400.jpg"   
    }
    notification(tokens, message, (error, response) => {
        if(!error){
            return res.send(response);
        }
        else{
            return res.send(error);
        }
    });
})



/*
Request Handler For Other Then Specified Route.
 */
app.post('/*', (req, res) => {
    res.send({
        "type": "/errors/incorrect-route",
        "title": "Resource Not Found",
        "status": 404,
        "detail": "Incorrect Request",
        "instance": req.originalUrl
    })
});

/*
Starting Server.
*/
app.listen(port, () => {
    return console.log('Server Started At Port '+port);
});