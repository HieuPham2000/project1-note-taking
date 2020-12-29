import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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
  TextInput, TouchableOpacity
} from 'react-native';
import { app } from '../config'
import * as COLOR from '../theme/color'
import { MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { uploadImageAsync } from '../utils/uploadImage'
import { shareImage, copyToClipboard } from '../utils/shareImage'
import { ImageBackground } from 'react-native';


const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function MyImage({ image, takePhoto, pickImageFromLibraty }) {
  const [ratio, setRatio] = useState(1);
  const [caption, setCaption] = useState("");
  const [linkImage, setImage] = useState(image);
  const handleChangeCaption = (text) => {
    setCaption(text);
  }
  const deleteImage = () => {
    setImage(null);
  }
  useEffect(() => {
    setImage(image);
  }, [image])
  const renderImage = () => {
    if (!linkImage) {
      return;
    }

    var a = Image.getSize(linkImage, (width, height) => {
      setRatio(height / width)
    })
    return (
      <View
        style={{
          marginTop: 30,
          borderRadius: 3,
          elevation: 2,
          width: 0.9 * W,
          alignSelf: 'center',
          marginBottom: 20,
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
          <ImageBackground
            source={{ uri: linkImage }}
            style={{
              width: 0.9 * W,
              height: 0.9 * W * ratio,
            }}>
            <View style={styles.buttonBar}>

              <View style={styles.copylinkContainer}>
                <Entypo 
                  name="link" 
                  size={34} 
                  color={COLOR.COLOR5} 
                  style={styles.copylink} 
                  onPress={() => copyToClipboard(linkImage)} // phải có () =>, vì func này...}
                />
              </View>
            </View>
          </ImageBackground>
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
        <View style={styles.buttonBar}>
          <Entypo name="camera" size={28} color="black" 
            onPress={()=>takePhoto()}
          />
          <Entypo name="folder-images" size={28} color="black" 
            onPress={()=>pickImageFromLibraty()}
          />
          <Entypo name="share" size={28} color="black" 
            onPress={() => shareImage(linkImage)}
          />
          <MaterialIcons name="delete" size={28} color="black" 
            onPress={deleteImage} 
          />
        </View>
      </View>
    );
  };

  return (
    <View>
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
    opacity: 0.3,
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
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  copylinkContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'flex-end'
  },
  copylink: {
    opacity: 0.5
  },
});




