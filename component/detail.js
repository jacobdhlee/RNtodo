import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.keys,
      value: this.props.text,
      note: this.props.note,
      reminder: false,
      views: [],
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleTextChange(text) {
    this.setState({ value: text });
  }

  handleNoteChange(text) {
    this.setState({ note: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <View style={styles.headerBox}/>
            <View style={styles.headerBox}>
              <Text style={styles.headerText}>Details</Text>
            </View>
            <TouchableOpacity 
              style={[styles.headerBox, styles.doneButton]} 
              onPress={(keys, value, note, edit) => this.props.onChangeText(this.state.key, this.state.value, this.state.note, false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
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
              <View style={styles.noteTextBox}>
                <Text style={styles.noteText}>Note :</Text>
              </View>
              <TextInput 
                autoFocus
                value={this.state.note}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={Keyboard.dismiss}
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
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  doneButtonText: {
    fontSize: 15,
    fontWeight: '600'
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
  },
  changeTodo: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1 
  },
  addNoteStyle: {
    flex: 4,
    padding: 10,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  noteTextBox: {
    flex: 1, 
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
    flex: 3,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3b5998',
  },
  notification:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3b5998',
    marginHorizontal: 30,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3b5998'
  }
})

export default Detail