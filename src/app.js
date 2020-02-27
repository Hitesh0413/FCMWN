const express = require('express');
const firebaseAdmin = require('firebase-admin');
const subscription = require('./subscription');
const notification = require('./notifiction');

const app = express();
const port = parseInt(process.env.PORT || 3000);

const serviceAccount = require('../firebase_console/service-account.json');
firebaseAdmin.initializeApp({credential: firebaseAdmin.credential.cert(serviceAccount)});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/*
Request Routes.
*/
app.post('/notification/send', (req, res) => {
    let tokens = req.body.deviceToken;
    let message = {
        title : req.body.notificationTitle,
        body: req.body.notificationDescription,
        icon:"https://pbs.twimg.com/profile_images/1214827542303035393/qiWBdirT_400x400.jpg"   
    }
    notification.send(tokens, message, (error, response) => {
        if(!error){
            return res.send(response);
        }
        else{
            return res.send(error);
        }
    });
});

app.post('/notification/subscribe', (req, res) => {
    let tokens = req.body.deviceToken;
    let topic = req.body.notificationTopic;

    subscription.subscribe(tokens, topic, (error, response) => {
        if(!error){
            return res.send(response);
        }
        else{
            return res.send(error);
        }
    });
});

app.post('/notification/unsubscribe', (req, res) => {
    let tokens = req.body.deviceToken;
    let topic = req.body.notificationTopic;

    subscription.unsubscribe(tokens, topic, (error, response) => {
        if (!error) {
            return res.send(response);
        }
        else {
            return res.send(error);
        }
    });
});

app.post('/notification/send/topic', (req, res) => {
    let tokens = req.body.deviceToken;
    let message = {
        notification : {
            title: req.body.notificationTitle,
            body: req.body.notificationDescription,
            icon: "https://pbs.twimg.com/profile_images/1214827542303035393/qiWBdirT_400x400.jpg"
        },
        topic: req.body.notificationTopic
    };
    
    notification.sendTopic(tokens, message, (error, response) => {
        if (!error) {
            return res.send(response);
        }
        else {
            return res.send(error);
        }
    });
});


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