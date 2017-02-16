import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  Keyboard,
  Modal,
  Dimensions,
} from 'react-native';
import Moment from 'moment';
import AddTodo from './addTodo';
import Lists from './Lists';
import Detail from './detail';

const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
      star: false,
      complete: false,
      edit: false,
      modalKey: ''
    }

    this.addList = this.addList.bind(this);
    this.handleDeleteItems = this.handleDeleteItems.bind(this);
    this.handleHidden = this.handleHidden.bind(this);
    this.completeButton = this.completeButton.bind(this);
    this.handleEditItems = this.handleEditItems.bind(this);
    this.modalonChangeText = this.modalonChangeText.bind(this);
  }

  addList() {
    if(!this.state.value) {
      return;
    }
    const newTodo = [
      ...this.state.items,
      {
        key: Date.now(),
        todo: this.state.value,
        hidden: true,
        complete: false,
        important: false,
        edit: false,
        note: ''
      },
    ]
    this.setState({
      items: newTodo,
      dataSource: this.state.dataSource.cloneWithRows(newTodo),
      value: '',
    })
  }

  handleEditItems(key, edit) {
    edit = !this.state.edit
    const newItems = this.state.items.map((todo => {
      if(todo.key === key.key) {
        return {
          ...todo,
          edit
        }
      }
      return todo
    }))
     this.setState({
       items: newItems,
       dataSource: this.state.dataSource.cloneWithRows(newItems),
       edit: !this.state.edit,
       modalKey: key
     })
  }

  handleDeleteItems(key) {
    const newTodo = this.state.items.filter((todo) => {
      return todo.key !== key.key
    })
    this.setState({
      items: newTodo,
      dataSource: this.state.dataSource.cloneWithRows(newTodo),
    })
    this.handleHidden
  }

  handleHidden(key, hidden) {
    const { items, dataSource } = this.state
    const newItems = items.map((todo) => {
      if(todo.key === key.key) {
        return {
          ...todo,
          hidden
        }
      }
      return todo
    });

    this.setState({
      items: newItems,
      dataSource: dataSource.cloneWithRows(newItems)
    });
  }

  starButtonPress(key, important) {
    important = !this.state.star
    const { items, dataSource } = this.state
    const newItems = items.map((todo) => {
      if(todo.key === key.key) {
        return {
          ...todo,
          important
        }
      }
      return todo
    });

    newItems.sort((item1, item2) => {
      if(!item1.complete && !item2.complete){
        return item2.important - item1.important;
      }
    })

    this.setState({
      items: newItems,
      dataSource: dataSource.cloneWithRows(newItems),
      star: important
    });
  }

  completeButton(key, complete) {
    complete = !this.state.complete
    const { items, dataSource } = this.state
    let completeTodo;
    const newItems = items.map((todo) => {
      if(todo.key === key.key) {
         return {
          ...todo,
          complete
        }
      }
      return todo
    });

    newItems.sort((item1, item2) => {   
      return item1.complete - item2.complete;      
    })

    this.setState({
      items: newItems,
      dataSource: dataSource.cloneWithRows(newItems),
      complete,
    });
  }

  modalonChangeText(keys, value, note, edit) {
    const { items, dataSource } = this.state
    const newItems = items.map((item) => {
      if(item.key === keys) {
         return {
          ...item,
          todo: value,
          note: note,
          hidden: true,
        }
      }
      return item;
    });
    this.setState({
      items: newItems,
      dataSource: dataSource.cloneWithRows(newItems),
      edit,
    });
  }


  render() {
    const weekOfYear = Moment().format('wo') + ' week of ' +  Moment().format('YYYY')
    const { modalKey } = this.state;
    const modalContent = (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.edit}
      >
        <Detail 
          text={modalKey.todo}
          keys={modalKey.key}
          note={modalKey.note}
          onChangeText={(keys, value, note, edit) => this.modalonChangeText(keys, value, note, edit)}
        />
      </Modal>
    );

    const listView = (
      <ListView 
            style={styles.list}
            dataSource={this.state.dataSource}
            enableEmptySections
            onScroll={() => Keyboard.dismiss()}
            renderRow={(key, ...value) => {
              return(
                <Lists
                  refs={"menu"}
                  thingsTodo={key} 
                  edit={(edit) => this.handleEditItems(key, edit)}
                  delete={() => this.handleDeleteItems(key)}
                  hidden={(hidden) => this.handleHidden(key, hidden)}
                  important={(important) => this.starButtonPress(key, important)}
                  complete={(complete)=> this.completeButton(key, complete)}
                  {...value}
                />
              )
            }}
          />
    );

    const noList = (
      <Text style={{ fontSize: 16, fontWeight: '600'}}>Nothing to do for now</Text>
    );

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Weekly To Do</Text>
        </View>

        <View style={styles.weekBar}>
          <Text style={styles.weekBarText}>{weekOfYear}</Text>
        </View>

        <AddTodo 
          value={this.state.value}
          onChangeText={(value) => this.setState({ value })}
          addList={this.addList}
        />

        <View style={styles.body}>
          {this.state.items.length > 0 ? listView : noList}
        </View>
          { modalContent }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
    }),
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  weekBar: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#5e727c',
    alignItems:'center',
    height: 25,
  },
  weekBarText: {
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor:'#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#f4f8ff',
  },
  separate: {
    borderWidth: 0.5,
    borderColor: '#717272'
  },
});

export default App;