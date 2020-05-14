import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { withRouter } from "react-router";
import t from 'tcomb-form-native';

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
                    likes: 'Fashion',
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
                console.log(`IN CATEGORY: ${JSON.stringify(response)}`);
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
        }).catch(error => {
            alert(`An error has occurred`);
            console.log(error);
        })
    }

    render(){
      return (
        <View style={styles.categoryContainer}>
          <Form 
            ref={c => this._form = c}
            type={Item}
            value={this.state.category}
            onChange={this.handleChange}
            options={options}
          /> 
          <TouchableOpacity onPress={() => this.handleSubmit('Fashion', this.props.history)}>
            <Image 
                source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-03f7f7d93782e67e3fc9b15d2225c170-shirt.png'}}
                style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSubmit('Food', this.props.history)}>
            <Image 
                source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png'}}
                style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSubmit('Sports', this.props.history)}>
            <Image 
                source={{ uri: 'https://images.vexels.com/media/users/3/136491/isolated/preview/5ecfc6015087e42a5deb98d549fafd85-olympic-marathon-cartoon-by-vexels.png'}}
                style={styles.image}
            />
          </TouchableOpacity>
        </View>   
    )
    }
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 150
  },
  image: {
    height: 200,
    width: 200,
  },  
  textInput: {
    height: 40,
    width: 200,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'red',
  },
});

export default withRouter(CategoryPick);
