const firebaseAdmin = require('firebase-admin');

const send = (deviceTokens, message, callback) => {
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
                .catch((error) => {
                    callback(error, undefined);
                });
}

const sendTopic = (deviceTokens, message, callback) => {
    firebaseAdmin.messaging()
        .send(message)
        .then((response) => {
            callback(undefined, response);
        })
        .catch((error) => {
            callback(error, undefined);
        });
}

module.exports = {
    send,
    sendTopic
};