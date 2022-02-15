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
                    <ScrollView
                        horizontal={true}
                    >
                        <BarChart
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        data: amounts
                                    }
                                ]
                            }}
                            width={amounts.length <= 7 ? Dimensions.get('window').width : Dimensions.get('window').width * amounts.length} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#2ca",
                                backgroundGradientFrom: "#003f5c",
                                backgroundGradientTo: "#07648f",
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
                    </ScrollView>
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