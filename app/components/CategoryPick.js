import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { withRouter } from "react-router";
import t from 'tcomb-form-native';
const bg = require('../img/bg.gif');
const fashion = require('../img/fashion.png');
const food = require('../img/food.png');
const sports = require('../img/sports.png');

const Form = t.form.Form;

const Item = t.struct({
  category: t.String
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
      label: "Please select a category you'd like to browse...",
      error: 'This field is required'
    }
  },
  stylesheet: formStyles,
}

class CategoryPick extends Component {
    constructor(props){
      super(props)
      this.state = {
        category: ''
      }
    }  

    handleChange = (e) => {
      this.setState({category: this._form.getValue()});
    }

    handleSubmit = (choice, history) => {
        textProps = this.props.location.search//"Budget added to user with ID: n"
        idProps = parseInt(textProps.slice(-1));
        budgetProps = parseInt(this.props.location.state.budget.budget)
        switch(choice){
            case 'Fashion':
                updatedUser = {
                    budget: budgetProps,
                    likes: 'Clothes',//changed from 'Fashion' due to api 
                    id: idProps
                }       
                break;
            case 'Food':
                updatedUser = {
                    budget: budgetProps,
                    likes: 'Food',
                    id: idProps
                }       
                break;
            case 'Sports':
                updatedUser = {
                    budget: budgetProps,
                    likes: 'Sports',
                    id: idProps
                }       
            break;
        }
        //console.log(`IN CATEGORY: ${JSON.stringify(updatedUser)}`);
        axios({
            method: 'put',
            url: `http://localhost:3003/users/${idProps}`,//IDEALLY: ${this.props.id}
            data: updatedUser
        }).then(response => {
            if(response.status === 200){
                console.log(`IN CATEGORY1: ${JSON.stringify(response)}`);
                history.push({
                    pathname: '/shop',
                    state: {
                        budget: updatedUser.budget,//budgetProps,
                        likes: updatedUser.likes,
                        id: updatedUser.id
                    },
                    search: response.data
                })
            }
            else {
                throw new Error();
            }
            return (
              axios({
                method: 'post',
                url: `http://localhost:3003/items/`,
                data: updatedUser.likes
              })              
            )        
        }).then(response => {
          console.log(`IN CATEGORY2: ${JSON.stringify(response)}`);
          /*
          if(response.status === 200){
            console.log(`IN CATEGORY2: ${JSON.stringify(response)}`);
          }
          else {
            throw new Error();
          }
          */
        }).catch(error => {
            alert(`An error has occurred`);
            console.log(error);
        })
    }

    render(){
      return (
        <View style={styles.categoryContainer}>
          <ImageBackground source={bg} style={styles.bg}>
            <Text style={styles.text}>Please select a category...</Text>
            <Form 
              ref={c => this._form = c}
              type={Item}
              value={this.state.category}
              onChange={this.handleChange}
              options={options}
            /> 
            <TouchableOpacity onPress={() => this.handleSubmit('Fashion', this.props.history)}>
              <Image 
                  source={fashion}
                  style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSubmit('Food', this.props.history)}>
              <Image 
                  source={food}
                  style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSubmit('Sports', this.props.history)}>
              <Image 
                  source={sports}
                  style={styles.image}
              />
            </TouchableOpacity>
          </ImageBackground>  
        </View>   
    )
    }
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    paddingBottom: '10%',
    opacity: 0.8
  },
  image: {
    height: 200,
    width: 200,
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

export default withRouter(CategoryPick);
