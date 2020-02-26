const firebaseAdmin = require('firebase-admin');

const notification = (deviceTokens, message, callback) => {
    const payload = {
        notification: message
    };

    const options = {
        priority: 'high',
        timeToLive: 60 * 60 *24, // 1 day
    };

    
    firebaseAdmin.messaging()
                 .sendToDevice(deviceTokens, payload, options)
                 .then( (response) => {
                    callback(undefined,response);
                })
                .catch((e) => {
                    callback(e, undefined);
                });
}

module.exports = notification;