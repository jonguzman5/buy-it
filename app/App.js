import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import BudgetPick from './components/BudgetPick';
import CategoryPick from './components/CategoryPick';
import Shop from './components/Shop';

class App extends Component {
  render(){
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path='/' component={BudgetPick}/>
            <Route exact path='/categoryPick' component={CategoryPick}/>
            <Route exact path='/shop' component={Shop}/>
          </Switch>
        </View>
      </NativeRouter>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  }
});


export default App;