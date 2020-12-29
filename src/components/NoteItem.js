import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';
import { convertDate, convertString } from '../utils/convert';
import * as COLOR from '../theme/color';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as type from '../redux/actiontypes'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function NoteItem({id, date, title, content, navigation}) {
  const dispatch = useDispatch();
  const deleteNote = () => {
    Alert.alert(
      'Xóa ghi chú',
      'Bạn không thể hoàn tác. Bạn có chắc chắn muốn xóa?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => del() },
      ],
      { cancelable: false }
    );
  }

  const del = () => {
    //dispatch({type: type.DELETE_NOTE, payload: id });
    dispatch({type: type.DELETE_TEXT_NOTE, payload: id });
  }

  const editNote = () => {
    navigation.navigate('NoteScreen', {idNote: id, titleNote: title, contentNote: content});
    /* console.log(title);
    console.log(content); */
  }
  return (
    <View style={styles.noteItem} >
      <TouchableWithoutFeedback onLongPress={deleteNote} onPress={editNote}>
        <View>
          <Text style={styles.itemDate}>{convertDate(date)}</Text>
          {title!=="" && <Text style={styles.itemTitle}>{convertString(title)}</Text>}
          {title!=="" && <View style={styles.line} />}
          <Text style={styles.itemContent}>{convertString(content)}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const styles = StyleSheet.create({
  noteItem: {
    width: W*0.9,
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 8
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: COLOR.COLOR2,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 2,
  },
  line: {
    borderWidth: 1,
    opacity: 0.2,
    borderColor: COLOR.COLOR2,
    margin: 5,
  },
  itemContent: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemDate: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: COLOR.COLOR2,
  }
})