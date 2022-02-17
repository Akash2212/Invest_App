import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

var user = auth().currentUser;
var months = []
var monthly_amounts = []
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

    firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Monthly_Payment')
        .doc('monthly')
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                monthly_amounts.push(documentSnapshot.data().january)
                monthly_amounts.push(documentSnapshot.data().february)
                monthly_amounts.push(documentSnapshot.data().march)
                monthly_amounts.push(documentSnapshot.data().april)
                monthly_amounts.push(documentSnapshot.data().may)
                monthly_amounts.push(documentSnapshot.data().june)
                monthly_amounts.push(documentSnapshot.data().july)
                monthly_amounts.push(documentSnapshot.data().august)
                monthly_amounts.push(documentSnapshot.data().september)
                monthly_amounts.push(documentSnapshot.data().october)
                monthly_amounts.push(documentSnapshot.data().november)
                monthly_amounts.push(documentSnapshot.data().december)
            }
        })

}
export default class Statistics extends Component {


    constructor(props) {
        super(props);
        this.state = {
            button1: true,
            button2: false,

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

    weekly() {
        this.setState({ button1: true, button2: false });
    }

    monthly() {
        this.setState({ button1: false, button2: true });
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
                        <Text style={styles.title}>STATISTICS</Text>
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

                <View style={styles.topContainer}>
                    <ScrollView
                        horizontal={true}
                    >
                        {this.state.button1 &&
                            <LineChart
                                data={{
                                    labels: dates,
                                    datasets: [
                                        {
                                            data: amounts
                                        }
                                    ]

                                }}
                                width={amounts.length < 5 ? Dimensions.get("window").width - 10 : Dimensions.get("window").width * amounts.length} // from react-native
                                height={320}
                                yAxisLabel="₹"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#003f5c",
                                    backgroundGradientTo: "#0e79ab",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        }

                        {this.state.button2 &&
                            <LineChart
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        {
                                            data: monthly_amounts
                                        }
                                    ]

                                }}
                                width={monthly_amounts.length < 5 ? Dimensions.get("window").width : Dimensions.get("window").width * monthly_amounts.length} // from react-native
                                height={320}
                                yAxisLabel="₹"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#003f5c",
                                    backgroundGradientTo: "#0e79ab",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        }

                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.weekly()} style={this.state.button1 == true ? styles.radioButton1Clicked : styles.radioButton1}>
                            <Text style={this.state.button1 == true ? styles.buttonText1Clicked : styles.buttonText1}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.monthly()} style={this.state.button2 == true ? styles.radioButton2Clicked : styles.radioButton2}>
                            <Text style={this.state.button2 == true ? styles.buttonText2Clicked : styles.buttonText2}>Monthly</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.transaction} onPress={() => this.props.navigation.navigate('Transaction')}><Text style={styles.transactionText}>See the transaction history</Text></TouchableOpacity>
                </View>
            </View >
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
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bottomContainer: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000'
    },
    transactionText: {
        fontSize: 25,
        fontWeight: '700',
        color: '#fff'
    },
    transaction: {
        width: '90%',
        height: 50,
        backgroundColor: '#003f5c',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    radioButton1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    radioButton1Clicked: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#003f5c',
        padding: 5,
        borderRadius: 5,
    },
    radioButton2: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        left: 5,
        padding: 5,
        borderRadius: 5,
    },
    radioButton2Clicked: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#003f5c',
        left: 5,
        padding: 5,
        borderRadius: 5,
    },
    buttonText1Clicked: {
        fontSize: 20,
        color: '#fff'
    },
    buttonText1: {
        fontSize: 20,
        color: '#000'
    },
    buttonText2Clicked: {
        fontSize: 20,
        color: '#fff'
    },
    buttonText2: {
        fontSize: 20,
        color: '#000'
    }
})