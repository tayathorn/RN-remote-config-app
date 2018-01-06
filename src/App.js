import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';

import remoteConfigDefaults from './constant/remote_config_defaults'

const firebaseRemoteConfig = firebase.config();

export default class App extends Component {

  state = {
    greetingMessage: 'Hi',
    eventPicture: '',
    isShowEventPicture: true,
    buttonColor: 'red',
  }

  componentDidMount() {
    // Set default values
    firebaseRemoteConfig.setDefaults({
      ...remoteConfigDefaults,
    });

    this.getRemoteConfigValues();
  }

  getRemoteConfigValues = () => {
    // const keys = ['greeting_message', 'event_picture', 'is_show_event_picture', 'button_color'];

    // firebaseRemoteConfig.getValues(keys)
    //   .then((snapshots) => {
    //     const greetingMessage = snapshots.greeting_message.val()

    //     this.setState({
    //       greetingMessage,
    //     })
    //   });

    firebaseRemoteConfig.getValue('greeting_message')
      .then((data) => {
        console.log('data : ', data)
        this.setState({
          greetingMessage: data.val(),
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.greetingMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
