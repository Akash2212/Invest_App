import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Ionicons from 'react-native-vector-icons/Ionicons'

var user = auth().currentUser;


export default class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }

    }

    componentDidMount() {

        if (user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('User_Details')
                .doc(user.email)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ username: documentSnapshot.data().name })

                    }
                })
                .catch(error => console.log(error))
        }
    }

    logout() {
        auth().signOut().then(() => this.props.navigation.navigate('Signup'))
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.toolbar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Ionicons
                                name="ios-arrow-back-sharp"
                                size={40}
                                color="#fff"
                                style={{ left: 10 }}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>PROFILE</Text>
                    </View>

                </View>
                <View style={styles.topContainer}>
                    <MaterialIcons
                        name="account-circle"
                        size={100}
                        color="#000"
                        onPress={() => this.props.navigation.navigate('Profile')}
                    />
                    <Text style={styles.username}>{this.state.username}</Text>
                    <TouchableOpacity onPress={() => this.logout()} style={styles.logout}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <View style={styles.about}>
                        <Text style={styles.aboutText}>We are the latest platform for digital payments. Our goal is to help people invest any chunk of amount daily for a fixed amount of time and earn a good rate of interest for this.</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 70,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
        left: 20
    },
    topContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000'
    },
    aboutTitle: {
        fontSize: 40,
        color: '#000',
        fontWeight: '700',
        bottom: 20
    },
    about: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderRadius: 20,
        padding: 10
    },
    aboutText: {
        fontSize: 27,
        fontStyle: 'italic'
    },
    logout: {
        width: '80%',
        height: 50,
        backgroundColor: '#003f5c',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    logoutText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 30
    }
})