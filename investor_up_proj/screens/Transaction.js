import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

var user = auth().currentUser;

var transactionHistory = [];

if (user != null) {
    firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Payments')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                transactionHistory.push(documentSnapshot.data());
            })

        })
}

export default class Transaction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(transactionHistory)

        const Item = ({ amount, date, payment_ID }) => (
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <Ionicons
                        name="checkmark-circle"
                        size={40}
                        color="#4287f5"
                    />
                </View>
                <View>
                    <Text style={styles.payment}>{payment_ID}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View>
                    <Text style={styles.amount}>₹{amount}</Text>
                </View>
            </View>
        );

        const renderItem = ({ item }) => (
            <Item amount={item.amount} date={item.date} payment_ID={item.payment_ID} />
        );



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
                        <Text style={styles.title}>TRANSACTION HISTORY</Text>
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
                <FlatList
                    data={transactionHistory}
                    renderItem={renderItem}
                    extraData={true}
                    keyExtractor={item => item.payment_ID}
                />
                <View>

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
        fontSize: 20,
        fontWeight: '800',
        left: 10,
    },
    item: {
        padding: 5,
        height: 60,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    amount: {
        fontSize: 27,
        fontWeight: '700',
        color: '#000'
    },
    payment: {
        color: '#000',
        fontSize: 20
    },
    date: {
        color: '#000',
        fontSize: 18
    }
});