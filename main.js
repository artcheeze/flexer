/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, KeyboardAvoidingView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };

  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 415,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      },
    ).start();



  }
  render() {
    let { fadeAnim } = this.state;
    return (


      <Animated.View style={{ flex: 1, width: 415, marginLeft: 415, right: fadeAnim }} >
        <View style={{ flex: 1, backgroundColor: 'red' }}>
        

        </View>
        <View style={{ flex: 3, backgroundColor: 'black' }}>


        </View>


      </Animated.View>


    );
  }
}