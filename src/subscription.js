const firebaseAdmin = require('firebase-admin');

const subscribe = (deviceTokens, topic, callback) => {
    firebaseAdmin.messaging().subscribeToTopic(deviceTokens, topic)
        .then(function (response) {
            callback(undefined,response);
        })
        .catch(function (error) {
            callback(error, undefined);
        });
}

const unsubscribe = (deviceTokens, topic, callback) => {
    firebaseAdmin.messaging().unsubscribeFromTopic(deviceTokens, topic)
        .then(function (response) {
            callback(undefined, response);
        })
        .catch(function (error) {
            callback(error, undefined);
        });
}   

module.exports = {
    subscribe,
    unsubscribe
};