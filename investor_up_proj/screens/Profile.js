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
                </View>

                <View style={styles.bottomContainer}>

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
    }
})