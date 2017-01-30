import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

class AddTodo extends Component {

  render() {
    const { onChangeText, value, addList } = this.props
    return (
      <View style={styles.container}>
        <TextInput 
          autoFocus
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={addList}
          blurOnSubmit={false}
          returnKeyType="done"
          placeholder={'Add things to do!'}
          style={styles.input}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  input: {
    height: 50,
    flex: 1,
    marginLeft:16,
  },
})

export default AddTodo;