import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { convertDate, convertString } from '../utils/convert';
import * as COLOR from '../theme/color';
import { useDispatch } from 'react-redux';
import * as type from '../redux/actiontypes'
import { useState } from 'react';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function NoteImageItem({ id, date, title, content, image, navigation }) {
  const [ratio, setRatio] = useState(1);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

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

  const shareNote = () => {
    Share.share({
      message: `${convertDate(date)}\n${title}\n${content}`,
      title: `Ghi chú`,
    });
  };

  if(image.length > 0) {
    Image.getSize(image[0].uri, (width, height) => {
      setRatio(height / width);
    })
  }
  
  return (
    <View style={styles.noteItem} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign 
              name="close" 
              size={30} 
              color={COLOR.COLOR6} 
              style={{alignSelf:'flex-end', opacity: 0.6}} 
              onPress={() => setModalVisible(false)} 
            />
            <TouchableOpacity  
              onPress={() => {shareNote(); setModalVisible(false)}} 
              style={styles.modalOption}
            >
              <Entypo name="share" size={30} color={COLOR.COLOR2}  />
              <Text style={styles.modalOptionText}>Chia sẻ ghi chú</Text>
            </TouchableOpacity>

            <TouchableOpacity  
              onPress={() => {deleteNote(); setModalVisible(false)}} 
              style={styles.modalOption}
            >
              <MaterialIcons name="delete" size={30} color={COLOR.COLOR2} />
              <Text style={styles.modalOptionText}>Xóa ghi chú</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <TouchableWithoutFeedback onLongPress={() => setModalVisible(true)} onPress={editNote}>
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
  },
  // Modal
  modalOption: {
    flexDirection: 'row',
    marginBottom: 20,
    opacity: 1,
  },
  modalOptionText: {
    textAlignVertical: 'center',
    fontSize: 18,
    color: COLOR.COLOR2,
    marginLeft: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})