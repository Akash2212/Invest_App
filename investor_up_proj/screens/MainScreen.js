import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class MainScreen extends Component {
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
                        <Text style={styles.totalMoney}>Total money - ₹1000</Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Payment')}><Text style={styles.invest}>Invest MONEY</Text></TouchableOpacity>
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
    button: {
        backgroundColor: '#fb5b5a',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 50
    },
    invest: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    }


})