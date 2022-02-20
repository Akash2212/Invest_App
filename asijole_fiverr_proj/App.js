import React, { Component } from 'react';
import { Platform, View, Image, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
//import PushController from './PushController'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
    console.disableYellowBox = true;
  }

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ loaded: true })
    }, 2000);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }



  render() {
    if (this.state.loaded) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            automaticallyAdjustContentInsets={false}
            source={{ uri: 'https://asijole.co.za' }}
            javaScriptEnabled={true}
            scalesPageToFit={(Platform.OS === 'ios') ? false : true}
            ref={(webView) => { this.webView.ref = webView; }}
            onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
            startInLoadingState={true}
            domStorageEnabled={true}
          />
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Image
            source={require('./Images/logo.png')}
          />
        </View>
      )
    }

  }
}





