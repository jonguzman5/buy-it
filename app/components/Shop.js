import React, {Component} from 'react';
import axios from 'axios';
import { getData } from '../FakerData';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { withRouter } from "react-router";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Item = t.struct({
  purchase: t.String 
})

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
      normal: {
        display: 'none'
      },
    },
}

const options = {
  fields: {
    category: {
      label: '',
      error: 'This field is required'
    }
  },
  stylesheet: formStyles,
}

class Shop extends Component {
  constructor(props){
    super(props)
    this.state = {
      imageUri: '',
      purchase: ''
    }
  }  
  
  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.imageUri;//passed down via props
  }

  componentDidMount(){
    let data = getData();
    this.setState({
      imageUri: data.foodImage
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
          <TouchableOpacity><Text style={styles.button}>NO</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.button}>YES</Text></TouchableOpacity>
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