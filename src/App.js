import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import firebase from 'react-native-firebase';

import remoteConfigDefaults from './constant/remote_config_defaults';

const firebaseRemoteConfig = firebase.config();

export default class App extends Component {
  state = {
    greetingMessage: 'Welcome !',
    eventPicture: 'https://images.moviepilot.com/image/upload/c_fill,h_630,q_auto:best,w_1200/iloar0rvcsy1bhmpy0at.jpg',
    isShowEventPicture: true,
    buttonColor: '#6f1425',
  };

  componentDidMount() {
    if (__DEV__) {
      firebaseRemoteConfig.enableDeveloperMode();
    }
    // Set default values
    firebaseRemoteConfig.setDefaults({
      ...remoteConfigDefaults,
    });

    this.getRemoteValues();
  }

  getRemoteValues = () => {
    const keys = ['greeting_message', 'event_picture', 'is_show_event_picture', 'button_color'];
    const cacheExpiration = __DEV__ ? 0 : 3600;  // 1 hour

    firebaseRemoteConfig.fetch(cacheExpiration)
      .then((res) => firebaseRemoteConfig.activateFetched())
      .then((activated) => {
        if (!activated) console.log('Fetched data not activated');
        return firebaseRemoteConfig.getValues(keys);
      })
      .then((datas) => {
        console.log('datas : ', datas)
        const greetingMessage = datas.greeting_message.val();
        const eventPicture = datas.event_picture.val();
        const isShowEventPicture = datas.is_show_event_picture.val();
        const buttonColor = datas.button_color.val();

        this.setState({
          greetingMessage,
          eventPicture,
          isShowEventPicture,
          buttonColor,
        });
      })
      .catch((error) => console.log('err : ', error) )

  }

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
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
  },
  picture: {
    height: 250,
    width: 250,
    marginVertical: 20,
  },
  button: {
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
  },
});
