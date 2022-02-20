import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Signup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false,
            username: '',
            phonenumber: ''
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
                this.props.navigation.replace('MainScreen', { firebaseUser: firebaseUser })
                firestore()
                    .collection('Users')
                    .doc(firebaseUser.uid)
                    .collection('User_Details')
                    .doc(firebaseUser.email)
                    .set({
                        name: this.state.username,
                        email: this.state.email,
                        phonenumber: this.state.phonenumber
                    })
                    .then(() => {
                        console.log('User added!');
                    });

                firestore()
                    .collection('Users')
                    .doc(firebaseUser.uid)
                    .collection('Monthly_Payment')
                    .doc('monthly')
                    .set({
                        january: 0,
                        february: 0,
                        march: 0,
                        april: 0,
                        may: 0,
                        june: 0,
                        july: 0,
                        august: 0,
                        september: 0,
                        october: 0,
                        november: 0,
                        december: 0
                    })
                    .then(() => console.log('Monthly payment initialized'))
                    .catch((error) => console.log(error))

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
                    <View style={{ flexDirection: 'row', top: 50 }}>
                        <MaterialIcons
                            name="account-circle"
                            size={33}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter username"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={nameText => this.setState({ username: nameText })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top: 80 }}>
                        <Ionicons
                            name="call"
                            size={28}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.phonenumber}
                            placeholder="Enter phone number"
                            placeholderTextColor="#9e9e9d"
                            onChangeText={nameText => this.setState({ phonenumber: nameText })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top: 100 }}>
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
                    <View style={{ flexDirection: 'row', top: 120 }}>
                        <Ionicons
                            name="lock-closed"
                            size={28}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.passw}
                            placeholder="Enter password"
                            placeholderTextColor="#9e9e9d"
                            secureTextEntry={true}
                            onChangeText={passwText => this.setState({ passw: passwText })}
                        />
                    </View>

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
        borderRadius: 20,
        color: '#fff',
    },
    email: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    phonenumber: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
    },
    passw: {
        width: '90%',
        height: 50,
        backgroundColor: '#465881',
        borderRadius: 20,
        color: '#fff',
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