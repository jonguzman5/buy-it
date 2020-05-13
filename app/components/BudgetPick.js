import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Item = t.struct({
  budget: t.Integer
})
const options = {
  fields: {
    budget: {
      label: 'Please Enter Your Budget (USD)',
      error: 'This field is required'
    }
  }
}

class BudgetPick extends Component {
    constructor(props){
      super(props)
      this.state = {
        budget: 0
      }
    }  

    handleChange = (e) => {
      this.setState({budget: this._form.getValue()});
    }

    handleSubmit = (history) => {
      axios({
        method: 'post',
        url: `http://localhost:3003/users/`,
        data: this.state.budget
      }).then((response) => {
        console.log(`IN BUDGETPICK: ${JSON.stringify(response.data)}`);
        history.push({
          pathname: '/categoryPick',
          state: {
            budget: this.state.budget,
          },
          search: response.data
        })
      })
      //const value = this._form.getValue();
    }

    render(){
      return (
        <View style={styles.budgetContainer}>
          <Form 
            ref={c => this._form = c}
            type={Item}
            value={this.state.budget}
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
  budgetContainer: {
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

export default BudgetPick;
