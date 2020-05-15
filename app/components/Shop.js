import React, {Component} from 'react';
import axios from 'axios';
//import { getData } from '../FakerData';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { withRouter } from "react-router";
import t from 'tcomb-form-native';
const bg = require('../img/bg.gif');
const no = require('../img/no.png');
const yes = require('../img/yes.png');

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

  getApiData = (categoryProps) => {
    this.setState({
      imageUri: `https://loremflickr.com/400/400/${categoryProps}?random=${Date.now()}`
    })
  }

  componentDidMount(){
    let categoryProps = this.props.location.state.likes;
    this.getApiData(categoryProps); 
  }

  handleChange = (e) => {
    this.setState({purchase: this._form.getValue()});
  }  

  handleSubmit = (choice) => {
    textProps = this.props.location.search;//"Like added to user with ID: n"
    idProps = parseInt(textProps.slice(-1));
    budgetProps = parseInt(this.props.location.state.budget);
    categoryProps = this.props.location.state.likes;
    let url = JSON.stringify([...this.state.imageUri].join(''))

    switch(choice){
      case 'Yes':
          updatedUser = {
              budget: budgetProps,
              likes: categoryProps,
              purchaseHistory: url,
              id: idProps
          }       
          break;
      case 'No':
          updatedUser = {
              budget: budgetProps,
              likes: categoryProps,
              purchaseHistory: url,//dislikes: 'IMAGE_URI_HERE'
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
          //console.log(`IN SHOP: ${JSON.stringify(response)}`);
          this.getApiData(categoryProps);
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
        <ImageBackground source={bg} style={styles.bg}>
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
              <Image 
                source={no}
                style={styles.nobutton}
              />
            </TouchableOpacity>            
            <TouchableOpacity onPress={() => this.handleSubmit('Yes')}>
              <Image 
                source={yes}
                style={styles.yesbutton}
              />        
            </TouchableOpacity>
          </View>
        </ImageBackground>  
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 5
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nobutton: {
    marginRight: '5%',
    height: 100,
    width: 100,
  },
  yesbutton: {
    marginLeft: '5%',
    height: 80,
    width: 80,    
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: "center"
  },
});


export default withRouter(Shop);