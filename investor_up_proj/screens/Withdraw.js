import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

var user = auth().currentUser;

export default class MainScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            bankname: '',
            accno: '',
            ifsc: '',
            requestSent: false,
            bodyContainerToRender: true
        }
        this.sendreq = this.sendreq.bind(this)
    }

    sendreq() {

        if (this.state.bankname != '' && this.state.accno != '' && this.state.ifsc != '' && user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Bank_Details')
                .add({
                    bank_name: this.state.bankname,
                    account_number: this.state.accno,
                    ifsc_code: this.state.ifsc
                })
                .then(() => this.setState({ requestSent: true, bodyContainerToRender: false }))
                .catch((error) => ToastAndroid.show(error.toString(), ToastAndroid.SHORT))
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
                        <Text style={styles.title}>Invest APP</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="account-circle"
                                size={50}
                                color="#fff"
                                style={{ right: 10 }}
                                onPress={() => this.props.navigation.navigate('Profile')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.bodyContainer}>
                    {
                        this.state.requestSent &&
                        <View style={{ height: '60%', width: '90%', alignItems: 'center' }}>
                            <Ionicons
                                name="checkmark-circle"
                                size={90}
                                color="#003f5c"
                            />
                            <Text style={{ top: 100, fontSize: 30, fontWeight: '600', color: '#000' }}>Request sent</Text>
                        </View>
                    }
                    {
                        this.state.bodyContainerToRender &&
                        <View style={styles.contentContainer}>
                            <Text style={{ fontSize: 30, fontWeight: '700', color: '#003f5c' }}>Withdraw Money</Text>
                            <TextInput
                                placeholder="Enter bank name"
                                style={styles.bankname}
                                onChangeText={bname => this.setState({ bankname: bname })}
                            />
                            <TextInput
                                placeholder="Enter account number"
                                style={styles.accno}
                                onChangeText={acc => this.setState({ accno: acc })}
                            />
                            <TextInput
                                placeholder="Enter ifsc code"
                                style={styles.ifsc}
                                onChangeText={ifsccode => this.setState({ ifsc: ifsccode })}
                            />
                            <TouchableOpacity onPress={() => this.sendreq()} style={styles.withdrawbutton}><Text style={styles.sendreq}>Send request</Text></TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 30
    },

    withdrawbutton: {
        backgroundColor: '#fb5b5a',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: 180
    },
    bankname: {
        height: 50,
        backgroundColor: '#465881',
        top: 30,
        borderRadius: 15,
        color: '#fff'
    },
    accno: {
        height: 50,
        backgroundColor: '#465881',
        top: 80,
        borderRadius: 15,
        color: '#fff'
    },
    ifsc: {
        height: 50,
        backgroundColor: '#465881',
        top: 130,
        borderRadius: 15,
        color: '#fff'
    },
    sendreq: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500'
    }


})