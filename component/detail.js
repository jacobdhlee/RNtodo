import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
  Switch,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const springAnimationProperties = {
  type: 'easeInEaseOut',
  property: 'opacity',
}

const animationConfig = {
  duration: 1000,
  create: springAnimationProperties,
  update: springAnimationProperties,
  delete: springAnimationProperties,
};

class Detail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      key: this.props.keys,
      value: this.props.text,
      note: this.props.note,
      reminder: false,
      views: []
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.onHandleSwitch = this.onHandleSwitch.bind(this);
  }

  componentWillMount() {
    LayoutAnimation.configureNext(animationConfig);
  }

  handleTextChange(text) {
    this.setState({
      value: text
    })
  }

  handleNoteChange(text) {
    this.setState({
      note: text
    })
  }

  onHandleSwitch() {
    // LayoutAnimation.configureNext(custom);
    const reminderView = (
        <TouchableOpacity>
          <Text>Working?</Text>
        </TouchableOpacity>
    )
    reminder = !this.state.reminder
    this.setState({
      reminder,
    })
    if(reminder) {
      this.setState((state) => ({views: [...state.views, {}]}))
      console.log('state is ', this.state.views)
    } else {
      this.setState((state) => ({views: state.views.slice(0, -1)}));
    }
  }

  render() {
    const views = this.state.views.map((view, i) =>
      <View key={i} style={styles.notification}>
        <TouchableOpacity>
          <Text>Working?</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Details</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.changeTodo}>
              <TextInput 
                onChangeText={(text) => this.handleTextChange(text)}
                value={this.state.value}
                style={styles.inputTodoChange}
              /> 
            </View>

            <View style={styles.addNoteStyle}>
              <View style={styles.notification}>
                <View style={{flex: 4, paddingLeft: 10}}>
                  <Text style={styles.notificationText}>Remind Me!</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center'}}>
                  <Switch
                    value={this.state.reminder}
                    onValueChange={this.onHandleSwitch}
                  />
                </View>
              </View>
              {views}
              <View style={styles.noteTextBox}>
                <Text style={styles.noteText}>Note :</Text>
              </View>
              <TextInput 
                multiline
                autoFocus
                value={this.state.note}
                onChangeText={(text) => this.handleNoteChange(text) }
                style={styles.noteInput}
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity onPress={(keys, value, note, edit) => this.props.onChangeText(this.state.key, this.state.value, this.state.note, false)} style={styles.buttonBox}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalBox: {
    height: height * 0.8, 
    width: width * 0.9, 
    backgroundColor: 'white',
    borderRadius: 10
  },
  header: {
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '800'
  },
  body: {
    flex: 1,  
  },
  inputTodoChange:{
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  changeTodo: {
    flex: 1,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
  },
  addNoteStyle: {
    flex: 4,
    backgroundColor: 'lightgreen',
    padding: 10,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  noteTextBox: {
    flex: 1, 
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  noteText: {
    fontSize: 15,
    fontWeight: '500'
  },
  notificationText: {
    fontSize: 15,
    fontWeight: '500'
  },
  noteInput: {
    backgroundColor: '#ed7d7d',
    flex: 3,
    marginTop: 10,
    padding: 10,
    fontSize: 16,
  },
  notification:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    marginBottom: 10,
  },
  buttonBox: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  }
})

export default Detail