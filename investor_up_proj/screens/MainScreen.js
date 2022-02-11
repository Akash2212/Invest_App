import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'



export default class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})