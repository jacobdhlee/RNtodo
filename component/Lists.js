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
import Icon from '@exponent/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

// let slideMenuWidth = width * 0.2;
// let minOpenWidth = width * 0.1;
let slideRightMenuWidth = width * 0.4;
let minOpenRight = width * 0.2;

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        right: 0,
      },
      open: false,
    };
    this.right = 0;

    this.slideAnimation = new Animated.Value(0)
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);
    this.handleEditPress = this.handleEditPress.bind(this);
  }

  componentWillMount() {
    console.log('minimum ',minOpenRight)
    this.slideAnimation.setValue(0);
    Animated.timing(this.slideAnimation, {
      toValue: 1,
      duration: 500,
    }).start();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStart,
      onMoveShouldSetPanResponder: this.handleStart,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleEnd
    });
  }

  onHandleUpdate(right, open) {
    let position = { right };
    this.right = right;
    this.setState({ position, open });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  handleStart(e, gestureState) {
    const { dx, dy } = gestureState;
    return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
  }

  handleMove(e, gestureState) {
    const { open, position } = this.state;
    console.log('dx is ', Math.abs(gestureState.dx), ' open ', this.state.open )

    this.right = Math.abs(gestureState.dx)
    if(this.right > minOpenRight) {
      this.right = slideRightMenuWidth;
      this.onHandleUpdate(this.right, true)
    } 
    else if( this.state.open && gestureState.dx > 5 ) {
      this.right = 0
      this.onHandleUpdate(this.right, false);
    } 
    else {
      this.onHandleUpdate(this.right, false)
    }

  }

  handleEnd(e, gestureState) {
    console.log('this shoule work')
    if(!this.state.open) {
      const position = { right: 0 };
      const open = false;
      this.setState({
        position,
        open
      })
      console.log('right is ', this.right);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  handleEditPress() {
    this.props.edit()
    this.onHandleUpdate(0, false);
  }

  render() {
    const { thingsTodo, refs } = this.props

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
            <View style={styles.sideRightMenu}>
              <TouchableOpacity style={styles.edit} onPress={this.handleEditPress}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.delete} onPress={() => this.props.delete()}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.container, this.state.position, { backgroundColor: 'white' }]} {...this.panResponder.panHandlers}>
            
            <TouchableOpacity style={styles.completeButton} onPress={() => this.props.complete()}>
              <Icon name="check" size={20} color={completeColor}/>
            </TouchableOpacity>

            <View style={{flex: 8, justifyContent: 'center', alignItems:'center'}}>
              <Text style={[styles.text, thingsTodo.complete && styles.completeText]}>{thingsTodo.todo}</Text>
            </View>

            <TouchableOpacity style={styles.starButton} onPress={() => this.props.important()}>
              <Icon name="star" size={20} color={starColor}/>
            </TouchableOpacity>

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
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 20,
    fontWeight: '500'
  },
  sideRightMenu: {
    flexDirection: 'row',
    width: slideRightMenuWidth,
    height: 49,
    
  },

  sideMenu: {
    position: 'absolute',
    justifyContent: 'flex-end',
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
    width: width * 0.2,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  delete: {
    width: width * 0.2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
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