import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import PushController from './PushController'

var user = auth().currentUser;

export default class MainScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            total_amount: 0,
            previous_amount: null,
            previous_date: '',
            startDate: '',
            endDate: ''
        }
    }

    componentDidMount() {
        if (user != null) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Total_Amount')
                .doc('total')
                .get()
                .then(documentSnapshot => {

                    if (documentSnapshot.exists) {
                        this.setState({ total_amount: documentSnapshot.data().total_amount })
                    }
                });

            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('StartEnd_Date')
                .doc('startend')
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        this.setState({ startDate: documentSnapshot.data().start_date, endDate: documentSnapshot.data().end_date })
                    }
                })

            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Previous_Payment')
                .doc('prev_pay')
                .get()
                .then(documentSnapshot => {

                    if (documentSnapshot.exists) {
                        this.setState({ previous_date: documentSnapshot.data().date, previous_amount: documentSnapshot.data().amount })
                    }
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <View><Text style={styles.title}>Invest APP</Text></View>
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
                    <View style={styles.contentContainer}>
                        <Text style={styles.totalMoney}>Total money - ₹{this.state.total_amount}</Text>
                        <Text style={styles.previous}>Previous Amount details: </Text>
                        <Text style={styles.previousDate}>Date: {this.state.previous_date}</Text>
                        <Text style={styles.previousAmount}>Amount: ₹{this.state.previous_amount}</Text>
                        <Text style={styles.start}>Start date: {this.state.startDate}</Text>
                        <Text style={styles.end}>End date: {this.state.endDate}</Text>
                        <TouchableOpacity style={styles.investbutton} onPress={() => this.props.navigation.navigate('Payment')}><Text style={styles.invest}>Invest MONEY</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.withdrawbutton} onPress={() => this.props.navigation.navigate('Withdraw')}><Text style={styles.invest}>Withdraw MONEY</Text></TouchableOpacity>
                    </View>
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
        fontSize: 20,
        fontWeight: '800',
        left: 10
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
    totalMoney: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    investbutton: {
        backgroundColor: '#fb5b5a',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 100
    },
    invest: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    withdrawbutton: {
        backgroundColor: '#fb5b5a',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 130
    },
    previous: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
        top: 30
    },
    previousAmount: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    },
    previousDate: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
        top: 80
    },
    start: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
        top: 70
    },
    end: {
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
        top: 90
    }


})