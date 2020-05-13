// import React from 'react';
// import {View, Text, Button} from 'react-native';

// function CategoryPick({history}){
//     return (
//         <View>
//             <Text></Text>
//             <Button title='Fashion' onPress={() => history.push('/shop')}></Button>
//             <Button title='Food' onPress={() => history.push('/shop')}></Button>
//             <Button title='Sports' onPress={() => history.push('/shop')}></Button>
//         </View>   
//     )
// }

// export default CategoryPick;

import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { withRouter } from "react-router";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Item = t.struct({
  category: t.String
})

const options = {
  fields: {
    category: {
      label: "Please select a category you'd like to browse...",
      error: 'This field is required'
    }
  }
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

    handleSubmit = (history) => {
        bpResTxt = this.props.location.search//"Budget added to user with ID: n"
        bpResId = parseInt(bpResTxt.slice(-1));
        updatedUser = {
            budget: parseInt(this.props.location.state.budget.budget),
            likes: this.state.category.category,
            id: bpResId
        }        
        console.log(JSON.stringify(updatedUser));
        axios({
            method: 'put',
            url: `http://localhost:3003/users/${bpResId}`,//IDEALLY: ${this.props.id}
            data: updatedUser
        }).then(response => {
            if(response.status === 200){
                history.push('/shop')
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
          <Button 
            title='Next'
            onPress={() => this.handleSubmit(this.props.history)} 
          />
        </View>   
    )
    }
}
const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
  },
});

export default withRouter(CategoryPick);
