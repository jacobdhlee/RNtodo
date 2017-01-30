import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

class Lists extends Component {
  
  render() {
    const { thingsTodo } = this.props

    const starColor = thingsTodo.important ? "#f2d518" : '#1acc5e';
    const completeColor = thingsTodo.complete ? "#1acc5e" : 'lightgrey';


    const renderHiddenContent =  (
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this.props.hidden(true)}>
            <Text>X</Text>
          </TouchableOpacity>

          <View style={styles.body}>
            <TouchableOpacity style={styles.edit} onPress={() =>  this.props.edit()}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={() => this.props.delete()}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    
    const renderContent = (
      <View style={styles.container}>
        <TouchableOpacity style={styles.starButton} onPress={() => this.props.important()}>
          <Icon name="star" size={20} color={starColor}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.body} onLongPress={() => this.props.hidden(false)}>
          <Text style={[styles.text, thingsTodo.complete && styles.completeText]}>{thingsTodo.todo}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completeButton} onPress={() => this.props.complete()}>
          <Icon name="check" size={20} color={completeColor}/>
        </TouchableOpacity>
      </View>
    )

    return (
        <View>
            { thingsTodo.hidden ? renderContent : renderHiddenContent }                     
        </View>           
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: '500'
  },
  body: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  starButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10
  },
  completeButton:{
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
  },
  completeText: {
    color: 'darkgrey',
    textDecorationLine: 'line-through'
  },
  edit: {
    width: width * 0.2,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40

  },
  delete: {
    width: width * 0.2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40
  },
  buttonText:{
    fontSize: 15,
    fontWeight: '500',
  }
  
})

export default Lists;