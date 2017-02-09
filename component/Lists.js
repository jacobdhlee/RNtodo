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
      previousLeft: 0,
      previousRight: 0,
      menuPosition: {
        left: this.previousLeft,
        right: this.previousRight,
      },
      open: false,
    }

    this.slideAnimation = new Animated.Value(0)
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);
  }

  componentWillMount() {
    // Animations when add todo list slide left to right
    this.slideAnimation.setValue(0);
    Animated.timing(this.slideAnimation, {
      toValue: 1,
      duration: 500,
    }).start()
    // create panrespond for side menu
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStart,
      onMoveShouldSetPanResponder: this.handleStart,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleEnd
    })
  }

  onHandleUpdate(left, open) {
    let isOpen = open || this.state.open
    let menuPosition = {
      left: left,
    }
    this.setState({ 
      menuPosition,
      open: isOpen, 
    })
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  handleStart(e, gestureState) {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10 
  }

  handleMove(e, gestureState) {
    // destructure state and gestureState
    const { dx } = gestureState;
    const { previousLeft, previousRight, left, right, open, menuPosition } = this.state
    console.log('dx is ', dx, '  menu', menuPosition.left, ' previousLeft ', previousLeft, ' open ', open)

    // setting left button Open
    let movingLeft = previousLeft + dx
    movingLeft > slideMenuWidth ? (movingLeft = slideMenuWidth) : movingLeft
    this.onHandleUpdate(movingLeft)

    if(dx > minOpenWidth) {
      this.onHandleUpdate(slideMenuWidth, true)
    }

    if ( open && dx < -10 ) {
      this.onHandleUpdate(0) 
      this.setState({open: false})
      console.log(this.state)
    } 


    
    // let openingLeft = gestureState.dx > 10
    // if((openingLeft && this.state.open) || (!openingLeft && !this.state.open)) {
    //   return;
    // 

    // let left = this.state.previousLeft + gestureState.dx
    // let menuPosition = {
    //   left: left,
    //   right: this.state.previousRight,
    // }

    // this.setState({
    //   previousLeft: left,
    //   menuPosition,
    // })

    // if(Math.abs(gestureState.dx) > minOpenWidth) {
    //   let open = !this.state.open
    //   this.setState({open})
    //   if(open) {
    //     this.setState({
    //       menuPosition: {
    //         left: slideMenuWidth,
    //         right: 0,
    //       }
    //     })
    //   }
    // }
  }

  handleEnd(e, gestureState) {
    const { dx } = gestureState
    if(!this.state.open) {
      this.setState({
        menuPosition: {
          left: 0,
          right: 0,
        }
      })
    } else {
      let previousLeft = this.state.previousLeft + dx
      this.setState({ previousLeft })
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const { thingsTodo, refs } = this.props

    const starColor = thingsTodo.important ? "#f2d518" : '#1acc5e';
    const completeColor = thingsTodo.complete ? "#1acc5e" : 'lightgrey';

    const slideTodo = this.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-1000, 0]
    })

    const slideMenu = {
      left: this.state.previousLeft,
    }

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

          <View style={[styles.container, this.state.menuPosition, { backgroundColor: 'white' }]} {...this.panResponder.panHandlers}>
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