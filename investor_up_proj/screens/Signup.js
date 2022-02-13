import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default class Signup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false,
            username: ''
        }
        this.signup = this.signup.bind(this)
    }

    signup() {
        var user = auth().currentUser;
        if (this.state.email != '' && this.state.passw != '' && user == null) {
            this.setState({ buttonFade: true, button: false })
            auth().createUserWithEmailAndPassword(this.state.email, this.state.passw)
                .then(() => console.log("User account created"))
                .catch((error) => { this.setState({ buttonFade: false, button: true }), console.log(error); ToastAndroid.show(error.toString(), ToastAndroid.SHORT) })
        }

        auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser != null) {
                this.props.navigation.replace('MainScreen')
                firestore()
                    .collection('Users')
                    .doc(firebaseUser.uid)
                    .collection('User_Details')
                    .add({
                        name: this.state.username,
                        email: this.state.email
                    })
                    .then(() => {
                        console.log('User added!');
                    });
            }
        })

    }

    gologin() {
        console.log("Props")
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signupContainer}>
                    <Text style={styles.title}>Invest APP</Text>
                    <TextInput
                        style={styles.username}
                        placeholder="Enter username"
                        onChangeText={nameText => this.setState({ username: nameText })}
                    />
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
                            <Text style={styles.buttonTextFade}>Signup</Text>
                        </View>
                    }

                    {
                        this.state.button &&
                        < TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity><Text onPress={() => this.gologin()} style={{ color: '#fff', top: 180, fontSize: 18 }}>Login</Text></TouchableOpacity>

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
        alignItems: 'center',
    },
    signupContainer: {
        width: '80%',
        height: '70%',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    username: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        top: 50,
        borderRadius: 20,
        color: '#fff'
    },
    email: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        top: 80,
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