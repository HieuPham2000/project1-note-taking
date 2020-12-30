import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput, TouchableWithoutFeedback, Modal, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { app } from '../config'
import * as COLOR from '../theme/color'
import { MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { uploadImageAsync } from '../utils/uploadImage'
import { shareImage, copyToClipboard } from '../utils/shareImage'
import { ImageBackground } from 'react-native';


const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function MyImage({ linkImage, caption, id, takePhoto, pickImageFromLibrary, setCaption, deleteImage}) {
  const [ratio, setRatio] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeCaption = (text) => {
    setCaption(text, id);
  }
  const renderImage = () => {
    if (!linkImage) {
      return;
    }

    Image.getSize(linkImage, (width, height) => {
      setRatio(height / width)
    })
    return (
      <View
        style={{
          //marginTop: 30,
          borderRadius: 3,
          elevation: 2,
          width: 0.9 * W,
          alignSelf: 'center',
          marginBottom: 30,
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
          <TouchableHighlight onPress={() => setModalVisible(true)}>
          <ImageBackground
            source={{ uri: linkImage }}
            style={{
              width: 0.9 * W,
              height: 0.9 * W * ratio,
            }}>

              <View style={styles.copylinkContainer}>
                <Entypo 
                  name="link" 
                  size={34} 
                  color={COLOR.COLOR5} 
                  style={styles.copylink} 
                  onPress={() => copyToClipboard(linkImage)} // phải có () =>, vì func này...}
                />
              </View>
            
          </ImageBackground>
          </TouchableHighlight>
        </View>
        <View style={styles.line} />
        <View style={styles.captionWrapper}>
          <TextInput
            style={styles.caption}
            placeholder='Nội dung'
            multiline={true}
            numberOfLines={1}
            autoFocus={false}
            onChangeText={handleChangeCaption}
            value={caption}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
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
              onPress={()=> {takePhoto(id); setModalVisible(false)}} 
              style={styles.handleImg}
            >
              <Entypo name="camera" size={30} color={COLOR.COLOR2} />
              <Text style={styles.handleImgText}>Chụp ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=> {pickImageFromLibrary(id); setModalVisible(false)}} 
              style={styles.handleImg}
            >
              <Entypo name="folder-images" size={30} color={COLOR.COLOR2} />
              <Text style={styles.handleImgText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>

            <TouchableOpacity  
              onPress={() => {shareImage(linkImage); setModalVisible(false)}} 
              style={styles.handleImg}
            >
              <Entypo name="share" size={30} color={COLOR.COLOR2}  />
              <Text style={styles.handleImgText}>Chia sẻ ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity  
              onPress={() => {deleteImage(id); setModalVisible(false)}} 
              style={styles.handleImg
            }>
              <MaterialIcons name="delete" size={30} color={COLOR.COLOR2} />
              <Text style={styles.handleImgText}>Xóa ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderImage()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.COLOR_BACKGROUND
  },
  line: {
    borderWidth: 1,
    opacity: 0.2,
    borderColor: COLOR.COLOR_NORMAL_TEXT,
  },
  captionWrapper: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    marginBottom: 20,
    width: 0.85 * W,
    alignSelf: 'center'
  },
  caption: {
    fontSize: 16,
    textAlignVertical: 'top',
    color: COLOR.COLOR_NORMAL_TEXT,
    padding: 10,
    lineHeight: 20,
  },
  copylinkContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 20,
  },
  copylink: {
    opacity: 0.6,
    alignSelf:'flex-end'
  },

  handleImg: {
    flexDirection: 'row',
    marginBottom: 20,
    opacity: 1,
  },
  handleImgText: {
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

});




