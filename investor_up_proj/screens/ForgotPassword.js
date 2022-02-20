import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import auth from '@react-native-firebase/auth'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            button: true,
            buttonFade: false,
        }
    }

    forgot() {
        if (this.state.email != '') {
            auth().sendPasswordResetEmail(this.state.email)
                .then((user) => {
                    alert('Please check your email...')
                    this.props.navigation.goBack()
                }).catch(function (e) {
                    console.log(e)
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.forgotPassw}>Forgot password</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Fontisto
                        name="email"
                        size={28}
                        color="#fff"
                        style={{ top: 5, right: 10 }}
                    />
                    <TextInput
                        style={styles.email}
                        placeholder="Enter email"
                        placeholderTextColor="#9e9e9d"
                        onChangeText={emailText => this.setState({ email: emailText })}
                    />
                </View>
                {
                    this.state.buttonFade &&
                    <View style={styles.buttonFade}>
                        <Text style={styles.buttonTextFade}>Click here</Text>
                    </View>
                }

                {
                    this.state.button &&
                    < TouchableOpacity style={styles.button} onPress={() => this.forgot()}>
                        <Text style={styles.buttonText}>Click here</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    email: {
        width: '80%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fb5b5a',
        width: '80%',
        height: 50,
        top: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonTextFade: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonFade: {
        backgroundColor: 'rgba(251, 91, 90, 0.5)',
        width: '80%',
        height: 50,
        top: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassw: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fff',
        bottom: 80
    }
})