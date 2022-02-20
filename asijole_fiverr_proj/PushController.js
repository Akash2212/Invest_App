import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

var user = auth().currentUser


PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids);
});

if (user != null) {

    database().ref('Users/' + user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
                if (snapshot.val().sendMessage == 'yes') {
                    if (snapshot.val().title != 'null' && snapshot.val().message != 'null') {
                        console.log(snapshot.val().title)
                        PushNotification.localNotification({
                            channelId: 'Heytap PUSH',
                            title: snapshot.val().title,
                            message: snapshot.val().message,
                            allowWhileIdle: false,
                            repeatTime: 1,
                            largeIcon: '../Images/logo.png'
                        })
                        database().ref('Users/' + user.uid).update({ sendMessage: 'no' }).then(() => { console.log('Data updated') })
                    }
                }
            }
        })
}

PushNotification.configure({
    onRegister: function (token) {
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        PushNotification.localNotification({
            channelId: notification.channelId,
            title: notification.title,
            message: notification.message,
            allowWhileIdle: false,
            repeatTime: 1
        })

    },
    senderID: "494282567914",

    popInitialNotification: true,
    requestPermissions: true
});



export default class PushController extends Component {


    render() {
        return null;
    }
}