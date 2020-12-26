import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { db } from '../config';
import * as COLOR from '../theme/color'

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      isChanged: false,

      /* past: [],
      future: [], */
    }
    this.props.navigation.saveNote = this.saveNote.bind(this);
    this.props.navigation.deleteNote = this.deleteNote.bind(this);
    //test
    /* this.updateStateContent = this.updateStateContent.bind(this);
    this.updateStateTitle = this.updateStateTitle.bind(this);
    this.redo = this.redo.bind(this);
    this.undo = this.undo.bind(this); */
    // test
  }


  componentDidMount() {
    this.setState({
      id: this.props.route.params?.id ?? '', // tại sao trên web thì id: this.props.route.params.id không lỗi
      title: this.props.route.params?.title ?? '',
      content: this.props.route.params?.content ?? '',
    })
  }

  // test
  /* updateStateContent(value) {
    this.setState((state) => ({
      past: [...state.past,  {title: state.title, content: state.content}],
      content: value,
    })
    )
  };

  updateStateTitle(value) {
    this.setState((state) => ({
      past: [...state.past,  {title: state.title, content: state.content}],
      title: value,
    })
    )
  };

  undo() {
    let tmp = this.state.past.pop();
    this.setState((state) => ({
      future: [...state.future, {title: state.title, content: state.content}],
      content: tmp.content,
      title: tmp.title,
    }))
  };

  redo() {
    let tmp = this.state.future.pop();
    this.setState((state) => ({
      past: [...state.past, {title: state.title, content: state.content}],
      content: tmp.content,
      title: tmp.title,
    }))
  }; */
  //



  handleChangeTitle(text) {
    //_.debounce(this.updateStateTitle(text), 1000);
    //this.updateStateTitle(text);
    this.setState({
      title: text,
      isChanged: true,
    })

  }

  handleChangeContent(text) {
    //this.updateStateContent(text);
    this.setState({
      content: text,
      isChanged: true,
    })
  }
  async deleteNote() {
    await db.ref('/notes').child(this.state.id).remove()
    Alert.alert('Thông báo!', 'Đã xóa ghi chú!')
    this.props.navigation.navigate('Home');
  }
  async saveNote() {
    if (this.state.id === '') { // note mới
      if (this.state.title !== '' || this.state.content !== '') {
        db.ref('/notes').push({
          title: this.state.title,
          content: this.state.content,
          date: (new Date()).toISOString() // date: (new Date()).toString() có được?
        });
        Alert.alert('Thông báo!', 'Ghi chú mới đã được tạo!');
      } else {
        Alert.alert('Thông báo!', 'Ghi chú rỗng đã bị xóa!');
      }
    } else if (this.state.isChanged === true) { // note cũ không hề thay đổi
      // update xong vị trí note không được cập nhật
      /* db.ref('/notes').update({
        [this.state.id] : {
        title: this.state.title,
        content: this.state.content,
        date: (new Date()).toISOString()
      }}); */
      await db.ref('/notes').child(this.state.id).remove();
      await db.ref('/notes').push({
        title: this.state.title,
        content: this.state.content,
        date: (new Date()).toISOString()
      });
      Alert.alert('Thông báo!', 'Đã chỉnh sửa ghi chú!');
    }

    this.props.navigation.navigate('Home');
  }



  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar
          barStyle = "dark-content"
          // dark-content, light-content and default
          hidden = {false}
          //To hide statusBar
          backgroundColor = "#00BCD4"
          //Background color of statusBar only works for Android
          translucent = {false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible = {true}
        /> */}
        {/* <FuncButton canUndo={this.state.canUndo} canRedo={this.state.canRedo} undo={this.undo} redo={this.redo}/> */}
     {/*    <View style={styles.funcbutton}>
          <View style={{ flexDirection: 'row', flex: 6, justifyContent: 'space-around' }}>

            <Entypo name="text" size={24} color={COLOR5} />
            <TouchableOpacity>
              <Entypo name="image" size={24} color={COLOR5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="table" size={24} color={COLOR5} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flex: 2 }} />
          <View style={{
            flexDirection: 'row', flex: 4, justifyContent: 'space-around'
          }}>
              <TouchableOpacity 
                onPress={this.undo}
                disabled={this.state.past.length>0 ? false: true}
              >
                <MaterialIcons 
                  name="undo" 
                  size={24} 
                  color={COLOR5} 
                  style={{ opacity: this.state.past.length>0 ? 1 : 0.3 }}
                  />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={this.redo}
                disabled={this.state.future.length>0 ? false: true} 
              >
                <MaterialIcons 
                  name="redo" 
                  size={24} 
                  color={COLOR5} 
                  style={{ opacity: this.state.future.length>0 ? 1 : 0.3 }}
                />
              </TouchableOpacity>
          </View>
        </View> */}
        <View>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextInput
              style={styles.title}
              placeholder='Tiêu đề'
              multiline={true}
              numberOfLines={1}
              autoFocus={true}
              onChangeText={this.handleChangeTitle.bind(this)}
              value={this.state.title}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.contentWrapper}>
            <TextInput
              style={styles.content}
              placeholder='Ghi chú'
              multiline={true}
              numberOfLines={8}
              onChangeText={this.handleChangeContent.bind(this)}
              value={this.state.content}
            />

          </View>
          {/* test */}
          {/* <Text>{this.state.title}</Text>
          <Text>{this.state.content}</Text> */}
        </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.COLOR_BACKGROUND
  },
  /* funcbutton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: CO,
    maxHeight: 50,
    alignItems: 'center'
  }, */
  line: {
    borderWidth: 1,
    opacity: 0.3,
    borderColor: COLOR.COLOR_NORMAL_TEXT,
  },
  wrapper: {
  },
  titleWrapper: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'top',
    padding: 10,
  },
  contentWrapper: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  content: {
    fontSize: 18,
    textAlignVertical: 'top',
    padding: 10,
  },
});
