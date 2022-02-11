import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth'

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false
        }
        this.login = this.login.bind(this)
    }

    login() {
        var user = auth().currentUser;
        if (this.state.email != '' && this.state.passw != '' && user == null) {
            this.setState({ buttonFade: true, button: false })
            auth().signInWithEmailAndPassword(this.state.email, this.state.passw)
                .then(() => console.log("User logged in"))
                .catch((error) => { this.setState({ buttonFade: false, button: true }), console.log(error); ToastAndroid.show(error.toString(), ToastAndroid.SHORT) })
        }

        auth().onAuthStateChanged(firebaseUser => {
            this.props.navigation.navigate('MainScreen')
        })

    }

    gosignup() {
        console.log("Props")
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Invest APP</Text>
                    <TextInput
                        style={styles.email}
                        placeholder="Enter email"
                        onChangeText={emailText => this.setState({ email: emailText })}
                    />
                    <TextInput
                        style={styles.passw}
                        placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={passwText => this.setState({ passw: passwText })}
                    />

                    <TouchableOpacity><Text style={{ color: '#fff', top: 110, fontSize: 15 }}>Forgot Password</Text></TouchableOpacity>

                    {
                        this.state.buttonFade &&
                        <View style={styles.buttonFade}>
                            <Text style={styles.buttonTextFade}>Login</Text>
                        </View>
                    }

                    {
                        this.state.button &&
                        < TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity><Text onPress={() => this.gologin()} style={{ color: '#fff', top: 180, fontSize: 18 }}>Signup</Text></TouchableOpacity>

                </View>
            </View >
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
    loginContainer: {
        width: '80%',
        height: '50%',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    email: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        top: 50,
        borderRadius: 20,
        color: '#fff'
    },
    passw: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        top: 100,
        borderRadius: 20,
        color: '#fff'
    },
    button: {
        backgroundColor: '#fb5b5a',
        width: '90%',
        height: 50,
        top: 150,
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
        width: '90%',
        height: 50,
        top: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})