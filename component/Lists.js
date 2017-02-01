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
  constructor(props) {
    super(props)
    this.flipCard = this.flipCard.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({value}) => this.value = value)
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }

  flipCard() {
    if(this.value > 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
       Animated.spring(this.animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10
        }).start()
    }
  }

  render() {
    const { thingsTodo } = this.props

    const starColor = thingsTodo.important ? "#f2d518" : '#1acc5e';
    const completeColor = thingsTodo.complete ? "#1acc5e" : 'lightgrey';

     const frontAmimateStyle = {
      transform: [
        {rotateY: this.frontInterpolate}
      ]
    }
    const backAmimateStyle = {
      transform: [
        {rotateY: this.backInterpolate}
      ]
    }

    return (
        <View style={styles.container}>
          <Animated.View style={[frontAmimateStyle, styles.frontView]}>
            <TouchableOpacity style={styles.starButton} onPress={() => this.props.important()}>
              <Icon name="star" size={20} color={starColor}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.body} onPress={this.flipCard}>
              <Text style={[styles.text, thingsTodo.complete && styles.completeText]}>{thingsTodo.todo}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.completeButton} onPress={() => this.props.complete()}>
              <Icon name="check" size={20} color={completeColor}/>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[backAmimateStyle, styles.frontView, styles.backView]}>
            <TouchableOpacity style={styles.back} onPress={this.flipCard}>
              <View />
            </TouchableOpacity>
              <TouchableOpacity style={styles.edit} onPress={() =>  this.props.edit()}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.delete} onPress={() => this.props.delete()}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
          </Animated.View>
        </View>           
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 20,
    fontWeight: '500'
  },

  frontView: {
    flex: 1,
    flexDirection: 'row',
    backfaceVisibility: 'hidden',
  },
  
  backView: {
    position: 'absolute',
    flexDirection: 'row'
  },

  starButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10
  },

  body: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    width: width * 0.3,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    
  },
  delete: {
    width: width * 0.3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5
  },
  buttonText:{
    fontSize: 15,
    fontWeight: '500',
  },

  back: {
    width: width * 0.2,
  }
  
})

export default Lists;