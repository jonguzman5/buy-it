import React, {Component} from 'react';
import axios from 'axios';
import { getData } from '../FakerData';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
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

  componentDidMount(){
    let data = getData();
    this.setState({
      imageUri: data.foodImage
    })
    //console.log(`IN SHOP: ${}`)      
  }

  handleChange = (e) => {
    this.setState({purchase: this._form.getValue()});
  }  

  handleSubmit = (choice) => {
    textProps = this.props.location.search;//"Like added to user with ID: n"
    idProps = parseInt(textProps.slice(-1));
    budgetProps = parseInt(this.props.location.state.budget);
    categoryProps = this.props.location.state.likes;
    switch(choice){
      case 'Yes':
          updatedUser = {
              budget: budgetProps,
              likes: categoryProps,
              purchaseHistory: 'test1',
              id: idProps
          }       
          break;
      case 'No':
          updatedUser = {
              budget: budgetProps,
              likes: categoryProps,
              purchaseHistory: 'test2',//dislikes: 'IMAGE_URI_HERE'
              id: idProps
          }       
          break;
    }
    //console.log(`IN SHOP: ${JSON.stringify(updatedUser)}`);
    axios({
        method: 'put',
        url: `http://localhost:3003/users/${idProps}`,
        data: updatedUser
    }).then(response => {
        if(response.status === 200){
          console.log(`IN SHOP: ${JSON.stringify(response)}`);
            //cycle api image
        }
        else {
            throw new Error();
        }        
    }).catch(error => {
        alert(`An error has occurred`);
        console.log(error);
    })      
  }

  render(){
    return (
      <View style={styles.shopContainer}>
        <Form 
          ref={c => this._form = c}
          type={Item}
          value={this.state.purchase}
          onChange={this.handleChange}
          options={options}
        />         
        <Image 
          style={styles.image}
          source={{ uri: this.state.imageUri }}
          accessibilityLabel='api data'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.handleSubmit('No')}>
            <Text style={styles.button}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSubmit('Yes')}>
            <Text style={styles.button}>YES</Text>
          </TouchableOpacity>
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


export default withRouter(Shop);