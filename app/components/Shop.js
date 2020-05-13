import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class Shop extends Component {
  constructor(props){
    super(props)
    this.state = {
      imageUri: ''
    }
  }  
  
  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.imageUri;//passed down via props
  }

  componentDidMount(){
    const category = 'sports';//
    this.setState({
      imageUri: 'https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01-825x510.png'//${sports}
    })
  }


  render(){
    return (
      <View style={styles.shopContainer}>
        <Image 
          style={styles.image}
          source={{ uri: this.state.imageUri }}
          accessibilityLabel='api data'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity><Text style={styles.button}>CLICK ME!</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.button}>CLICK ME!</Text></TouchableOpacity>
        </View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  shopContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    marginTop: '10%',
    marginRight: '10%',
    textAlign: 'center',
  },
});


export default Shop;