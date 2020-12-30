import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';
import { convertDate, convertString } from '../utils/convert';
import * as COLOR from '../theme/color';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as type from '../redux/actiontypes'
import { useState } from 'react';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function NoteImageItem({ id, date, title, content, image, navigation }) {
  const [ratio, setRatio] = useState(1);
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
    dispatch({ type: type.DELETE_IMAGE_NOTE, payload: id });
  }

  const editNote = () => {
    navigation.navigate('ImageScreen', { idNote: id, titleNote: title, contentNote: content, imageNote: image });
  }

  if(image.length > 0) {
    Image.getSize(image[0].uri, (width, height) => {
      setRatio(height / width);
    })
  }
  
  return (
    <View style={styles.noteItem} >
      <TouchableWithoutFeedback onLongPress={deleteNote} onPress={editNote}>
        <View>
          <Text style={styles.itemDate}>{convertDate(date)}</Text>
          {title !== "" && <Text style={styles.itemTitle}>{convertString(title)}</Text>}
          {title !== "" && <View style={styles.line} />}
          <Text style={styles.itemContent}>{convertString(content)}</Text>
          {image.length > 0 && <View
            style={{
              marginTop: 20,
              borderRadius: 3,
              elevation: 2,
              width: 0.85 * W,
              alignSelf: 'center',
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: 'rgba(0,0,0,1)',
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden',
                alignSelf: 'center'
              }}>
              <Image
                source={{ uri: image[0].uri }}
                style={{
                  width: 0.85 * W,
                  height: 0.85 * W * ratio,
                }}
              >
              </Image>
            </View>
          </View>}
          {image.length>1&&<Text style={styles.itemContent}>và {image.length - 1} ảnh khác</Text>}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const styles = StyleSheet.create({
  noteItem: {
    width: W * 0.9,
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    margin: 10,
    alignSelf: 'center',
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