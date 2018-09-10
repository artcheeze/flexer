/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, KeyboardAvoidingView, Animated, ScrollView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import Main from './main'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      loading: false,
      fadeAnim: new Animated.Value(0),
      fadeMain: new Animated.Value(0),
      login: true,

    };

  }

  login() {
    this.setState({ loading: true })
    fetch('https://flexer-api.herokuapp.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        pass: this.state.pass
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "AUTH") {
         
          this.setState({ loading: false,login: true })
        } else {
          alert("Username or password incorrect!")
          this.setState({ loading: false })
        }
      })
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 400,                   // Animate to opacity: 1 (opaque)
        duration: 1500,              // Make it take a while
      },      
    ).start();

    
    
  }

  render() {
    let { fadeAnim } = this.state;
    var i = 0;
    return (

      <ScrollView>
        <KeyboardAvoidingView style={styles.container} >
          {
            this.state.login ?

              [
                <View style={{ width: 415, height:660,zIndex:20}} >
                  <Main key={i} />
                </View>
              ]
              :
              [
                <Animated.View style={{ width: 415, height: 360, backgroundColor: '#E8BAA4', zIndex: 20, bottom: fadeAnim, marginTop: 700 }} >

                  <Content>
                    <Form>
                      <Item style={{ width: 100 }} floatingLabel>
                        <Label style={{ color: 'white' }}>Username</Label>
                        <Input onChangeText={(user) => this.setState({ user })} />
                      </Item>
                      <Item style={{ width: 100 }} floatingLabel last>
                        <Label style={{ color: 'white' }}>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(pass) => this.setState({ pass })} />
                      </Item>
                    </Form>

                    <Button primary style={{ borderRadius: 30, marginTop: 50, marginLeft: 130, width: 100, justifyContent: 'center' }} onPress={e => this.login()}>{this.state.loading ? <Spinner color='white' /> : <Text>Sign up</Text>}</Button>

                  </Content>

                </Animated.View>
              ]



          }

          <Image
            style={{ position: 'absolute', marginTop: 100, marginLeft: 20, width: 170, height: 170 }}
            source={require('./img/logo.png')}
          />




        </KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#443229',
    paddingTop: Platform.OS === "ios" ? 25 : 0

  }
});
