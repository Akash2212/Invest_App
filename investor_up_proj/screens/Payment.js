import React, { Component } from 'react';
import { Button, StyleSheet, View, NativeModules, NativeEventEmitter } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default class payment extends Component {

    _onPressButton() {

        var orderID = 'order_'
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0123456789";
        for (var i = 0; i < 14; i++)
            orderID += possible.charAt(Math.floor(Math.random() * 14));


        console.log(orderID)


        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_live_dZAIxh9mgzdnl7',
            amount: '100',
            name: 'foo',
            order_id: 'order_ItymcH65cAkZbN',
            prefill: {
                email: 'investapp123@gmail.com',
                contact: '7867972157',
                name: 'Razorpay Software'
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            if (data.razorpay_payment_id != NULL) {
                alert(`Success: ${data.razorpay_payment_id}`);
            }
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Press Me"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});