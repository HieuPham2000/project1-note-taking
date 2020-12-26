import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as COLOR from '../theme/color';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../redux/actiontypes'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const TodoItem = ({id}) => {
  const todo = useSelector((state) => state.todo[id]);
  const dispatch = useDispatch();
  const onCheck = () => {
    dispatch({type: type.CHECK_TODO, payload: id})
  };

  const deleteTodo = () => {
    Alert.alert(
      'Xóa công việc',
      'Bạn không thể hoàn tác. Bạn có chắc chắn muốn xóa?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => dispatch({type: type.DELETE_TODO, payload: id}) },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={styles.todoItem}>
      <CheckBox 
        checkedColor={COLOR.COLOR2}
        onPress={onCheck}
        checked={todo.done}
        size={30}
        containerStyle={{padding: 0}}
      />
      {todo.done ?
      <Text style={[styles.todoText, {opacity: 0.2}, {textDecorationLine: 'line-through'}]}>{todo.body}</Text> 
      :<Text style={styles.todoText}>{todo.body}</Text> 
      } 
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    margin: 3
  },
  todoText: {
    fontSize: 16,
    width: 0.8*W,
    maxWidth: 0.8*W,
    textAlign: 'justify',
    textAlignVertical: 'center'
  },
});