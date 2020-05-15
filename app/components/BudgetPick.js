import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import t from 'tcomb-form-native';
const bg = require('../img/bg.gif');

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
        //console.log(`IN BUDGETPICK: ${JSON.stringify(response.data)}`);
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
          <ImageBackground source={bg} style={styles.bg}>
            <View style={styles.formContainer}>
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
          </ImageBackground>
        </View>   
    )
    }
}
const styles = StyleSheet.create({
  budgetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    opacity: 0.8
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    position: 'absolute',
    justifyContent: "center"
  },
});

export default BudgetPick;
