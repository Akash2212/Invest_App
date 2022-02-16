import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

var user = auth().currentUser;

var amounts = [];
var dates = [];
if (user != null) {
    firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Payments')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                amounts.push(documentSnapshot.data().amount)
                dates.push(documentSnapshot.data().date)
            });
        });
}
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
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        this.setState({ username: documentSnapshot.data().name })
                    });
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>

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