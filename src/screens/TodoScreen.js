import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, Button, Alert, LogBox, Keyboard } from 'react-native';
import EmptyTodo from '../components/EmptyTodo';
import * as COLOR from '../theme/color';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect, useRef } from 'react';
import TodoItem from '../components/TodoItem'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
//Import ActionButton
import ActionButton from 'react-native-action-button';
//Import Icon for the ActionButton
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../redux/actiontypes';
import { db } from '../config'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function TodoScreen(props) {
  // giải pháp tình thế => update: đã fix
  LogBox.ignoreAllLogs()
  const todos = useSelector((state) => state.todo);
  //const todos = useSelector((state) => state.todo, []);
  const [presentTodo, setPresentTodo] = useState('');
  const [activeButton, setActive] = useState(false);
  const scrollViewRef = useRef();

  const dispatch = useDispatch();

  /* useEffect(() => {
      dispatch({ type: type.INIT_TODOS}); 
  }, []) */

  const addTodo = () => {
    dispatch({type: type.NEW_TODO, payload: {done: false, body: presentTodo}});
    setPresentTodo('');
  }

  const delAllTodos = () => {
    dispatch({type: type.DELETE_ALL_TODOS});
  }
  const delCheckedTodos = () => {
    dispatch({type: type.DELETE_CHECKED_TODOS});
  }

  const clearTodos = () => {
    Alert.alert(
      'Xóa danh sách công việc',
      'Bạn không thể hoàn tác. Bạn có chắc chắn muốn xóa?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => delAllTodos() },
      ],
      { cancelable: false }
    );
  }

  const statistic = () => {
    if(!todos) {
      return;
    }
    let numDone = 0;
    todos.forEach((i) => {
      if (i.done==true) {
        numDone ++;
      }
    });
    return (
    <Text style={{
      fontSize: 18, 
      margin: 5, 
      padding: 5, 
      borderWidth: 1, 
      borderRadius: 5,
      backgroundColor: COLOR.COLOR3,
      color: numDone===todos.length?'green':COLOR.COLOR1}}
    >Hoàn thành: {numDone}/{todos.length} công việc</Text>)
  }
  const clearCheckedTodos = () => {
    Alert.alert(
      'Xóa các công việc đã hoàn thành',
      'Bạn không thể hoàn tác. Bạn có chắc chắn muốn xóa?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => delCheckedTodos() },
      ],
      { cancelable: false }
    );
  }
  const checkAllTodos = () => {
     dispatch({type: type.CHECK_ALL_TODOS});
  }
  const uncheckAllTodos = () => {
    dispatch({type: type.UNCHECK_ALL_TODOS});
  }
  


  /* useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, []);

  const _keyboardDidShow = () => {
    setActive(false);
  }; */

  return (
    <View style={styles.container}>   
      {todos.length > 0 && statistic()} 
      <ScrollView
        contentContainerStyle={{}}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
            {scrollViewRef.current.scrollToEnd({animated: true})}
        }}
      >
        {todos.length > 0 ?
        <View>
          {todos.map((i, k) => (
              <TodoItem
                key={k}
                id={k}
              />
          )
          )}
        </View>
        :
        <View>
          <EmptyTodo />
        </View>}
      </ScrollView>

      {todos.length > 0 &&
      <ActionButton 
        buttonColor={COLOR.COLOR1} 
        buttonTextStyle={{fontSize: 40}}
        style={{bottom: 50, right: 5}}
        onPress={Keyboard.dismiss}
      >
        
          <ActionButton.Item
            buttonColor={COLOR.COLOR2}
            title="Chọn tất cả"
            size={50}
            onPress={checkAllTodos}>
            <Icon
              name="md-done-all"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Bỏ chọn tất cả"
            size={50}
            onPress={uncheckAllTodos}>
            <MaterialCommunityIcons
              name="cancel"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Xóa mục đã chọn"
            size={50}
            onPress={clearCheckedTodos}
          >
            <Icon
              name="md-remove"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Xóa tất cả"
            size={50}
            onPress={clearTodos}>
            <AntDesign
              name="delete"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
      }
      <View 
        style={{
          flexDirection:'row', 
          alignItems:'center',  
          backgroundColor:COLOR.COLOR5,
          width: W,
          elevation: 20,
          //position: 'absolute',
          
        }}>
        <TextInput 
          style={{ 
            borderWidth: 1, 
            borderColor: COLOR.COLOR2,
            borderRadius: 5,
            backgroundColor: COLOR.COLOR3,
            width: 0.9*W, 
            maxWidth:0.9*W, 
            padding: 5, 
            margin: 10, 
            color: COLOR.COLOR_NORMAL_TEXT,
            fontSize: 16
          }}
          placeholder="Thêm công việc mới"
          blurOnSubmit = {true}
          multiline={true}
          value={presentTodo}
          onChangeText={(text)=>setPresentTodo(text)}
          onSubmitEditing={addTodo}
          
          //onFocus={setActive(false)}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: COLOR.COLOR_BACKGROUND
  },
  buttonAdd: {
    borderRadius: 50,
    color: COLOR.COLOR_HEADER_TEXT,
    backgroundColor: COLOR.COLOR_HEADER,
    elevation: 8,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})