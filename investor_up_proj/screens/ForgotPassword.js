import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import auth from '@react-native-firebase/auth'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    forgot() {
        auth().sendPasswordResetEmail(this.state.email)
            .then((user) => {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter email"
                    onChangeText={newText => this.setState({ email: newText })}
                />
                <TouchableOpacity onPress={() => this.forgot()}>
                    <Text>Click here</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})