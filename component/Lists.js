import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Modal,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

let slideMenuWidth = width * 0.2;
let minOpenWidth = width * 0.1;
let slideRightMenuWidth = width * 0.4;
let minOpenRightWIdth = width * 0.2;

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openRight : false,
    }

    this.prevLeft = 0;
    this.prevRight = 0;

    this.slideAnimation = new Animated.Value(0);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);
  }

  componentWillMount() {
    this.slideAnimation.setValue(0);
    Animated.timing(this.slideAnimation, {
      toValue: 1,
      duration: 500,
    }).start()

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStart,
      onMoveShouldSetPanResponder: this.handleStart,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleEnd,
    })
  }

  onHandleUpdate(left , right, open, openRight) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  handleStart(e, gestureState) {
    const { dx, dy } = gestureState;
    return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10 
  }

  handleMove(e, gestureState) {
    const { dx } = gestureState;
    const { open, openRight } = this.state;
    console.log('dx is ? ', dx);
    


  }

  handleEnd(e, gestureState) {
    const { dx } = gestureState
    const { menuPosition ,open, menuRight, openRight } = this.state
  }

  render() {
    const { thingsTodo } = this.props
    const { menuPosition } = this.state
    const starColor = thingsTodo.important ? "#f2d518" : '#1acc5e';
    const completeColor = thingsTodo.complete ? "#1acc5e" : 'lightgrey';

    const slideTodo = this.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-1000, 0]
    })

    return (
      <View>
        <Animated.View style={{ left: slideTodo }} > 
          <View style={[styles.container, styles.sideMenu]}>
            <View style={styles.sideLeftMenu}>
              <Text>Hi</Text>
            </View>

            <View style={styles.sideRightMenu}>
              <Text>Hi Right</Text>
            </View>
          </View> 

          <View style={[styles.container, menuPosition, { backgroundColor: 'white' }]} {...this.panResponder.panHandlers}>
            <Text style={[styles.text, thingsTodo.complete && styles.completeText]}>{thingsTodo.todo}</Text>
          </View>

        </Animated.View>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 20,
    fontWeight: '500'
  },
  sideRightMenu: {
    width: slideRightMenuWidth,
    alignItems: 'center'
  },

  sideLeftMenu: {
    width: slideMenuWidth,
    alignItems: 'center'
  },

  sideMenu: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',

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

// <TouchableOpacity style={styles.edit} onPress={() =>  this.props.edit()}>
//               <Text style={styles.buttonText}>Edit</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.delete} onPress={() => this.props.delete()}>
//               <Text style={styles.buttonText}>Delete</Text>
//             </TouchableOpacity>


// <TouchableOpacity style={styles.starButton} onPress={() => this.props.important()}>
//               <Icon name="star" size={20} color={starColor}/>
//             </TouchableOpacity>

// <TouchableOpacity style={styles.completeButton} onPress={() => this.props.complete()}>
//               <Icon name="check" size={20} color={completeColor}/>
//             </TouchableOpacity>