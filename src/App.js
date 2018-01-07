import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  state = {
    greetingMessage: 'Welcome !',
    eventPicture: 'https://images.moviepilot.com/image/upload/c_fill,h_630,q_auto:best,w_1200/iloar0rvcsy1bhmpy0at.jpg',
    isShowEventPicture: true,
    buttonColor: '#6f1425',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.greetingMessage}</Text>
        {
          this.state.isShowEventPicture &&
          <Image style={styles.picture} source={{uri: this.state.eventPicture}} resizeMode={'cover'} />
        }
        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.buttonColor}]}>
          <Text style={styles.buttonTitle}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  picture: {
    height: 250,
    width: 250,
  },
  button: {
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
  },
});
