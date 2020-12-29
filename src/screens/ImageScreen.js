import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ActivityIndicator,
   Button, 
   Image, 
   StatusBar, 
   StyleSheet, 
   Text, 
   View, 
   Dimensions,
  ScrollView,
  TextInput } from 'react-native';
import { app } from '../config'
import * as COLOR from '../theme/color'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { uploadImageAsync} from '../utils/uploadImage'
import { shareImage, copyToClipboard } from '../utils/shareImage'
import RenderImage from '../components/MyImage'





const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function App({navigation, route}) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const idNote = route.params===undefined? -1 : route.params.idNote;
  const titleNote = route.params===undefined? '' : route.params.titleNote;
  const contentNote = route.params===undefined? '' : route.params.contentNote;
  //console.log(idNote + " " + titleNote + " " + contentNote);

  const [id, setId] = useState(idNote);
  const [title, setTitle] = useState(titleNote);
  const [content, setContent] = useState(contentNote);

  useEffect(() => {
    (async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    })();
  }, []);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <MaterialIcons
            name="check"
            size={24}
            style={styles.button}
            onPress={confirm}
          />
        </View>
      ),
      headerLeft: () => (
        <View>
          <MaterialIcons
            name="arrow-back"
            size={24}
            style={styles.button}
            onPress={goBack}
          />
        </View>
      )
    })})


  const handleChangeTitle = (text)  => {
    setTitle(text);
  }

  const handleChangeContent = (text) =>  {
    setContent(text);
  }

  const saveNote = () => {
    //dispatch({type: type.NEW_NOTE, payload: {title: title, content: content} })
    dispatch({type: type.NEW_TEXT_NOTE, payload: {title: title, content: content} })
    navigation.navigate('HomeScreen');
  }

  const updateNote = () => {
    //dispatch({type: type.UPDATE_NOTE, payload: {id: id, title: title, content: content} })
    dispatch({type: type.UPDATE_TEXT_NOTE, payload: {id: id, title: title, content: content} })
    navigation.navigate('HomeScreen');
  }

  const confirm = () => {
    if(id===-1) {
      saveNote();
      Alert.alert('Thông báo','Tạo ghi chú thành công!');
    } else if (title !== titleNote || content != contentNote) {
      Alert.alert(
        'Cập nhật ghi chú',
        'Bạn muốn cập nhật ghi chú hiện tại?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Cập nhật', onPress: () => updateNote() },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('HomeScreen');
    }
  }

  const goBack = () => {
    if(id===-1) {
      Alert.alert(
        'Chú ý',
        'Bạn chưa lưu ghi chú! Bạn có muốn lưu ghi chú hiện tại?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Không lưu', onPress: () => navigation.navigate('HomeScreen') },
          { text: 'Lưu', onPress: () => saveNote() }
        ],
        { cancelable: false }
      );
    } else if (title !== titleNote || content != contentNote) {
      Alert.alert(
        'Chú ý',
        'Thay đổi chưa được lưu! Bạn có muốn lưu thay đổi? ',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Không lưu', onPress: () => navigation.navigate('HomeScreen') },
          { text: 'Lưu', onPress: () => updateNote() }
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('HomeScreen');
    }
    return false;
  }

  const renderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const renderImage = () => {
    if (!image) {
      return;
    }
    
    var a = Image.getSize(image, (width, height) => {
      setRatio(height/width)
    })
    return (
      <View
        style={{
          marginTop: 30,
          borderRadius: 3,
          elevation: 2,
          width: 0.9*W,
          alignSelf:'center'
        }}>
        {/* <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
            alignSelf:'center'
          }}>
          <Image source={{ uri: image }} style={{ width: 0.9*W, aspectRatio:1, resizeMode: 'contain'}} />
        </View> */}
        <Image source={{ uri: image }} style={{ width: 0.9*W, height: 0.9*W*ratio}} />
        <Text
          onPress={() => copyToClipboard(image)} // phải có () =>, vì func này...
          onLongPress={() => shareImage(image)}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };


  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const pickImageFromLibrary = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async pickerResult => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        //const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(pickerResult.uri);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Thông báo', 'Upload thất bại!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor:COLOR.COLOR_BACKGROUND}}>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <TextInput
            style={styles.title}
            placeholder='Tiêu đề'
            multiline={true}
            numberOfLines={1}
            autoFocus={id === -1}
            onChangeText={handleChangeTitle}
            value={title}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.contentWrapper}>
          <TextInput
            style={styles.content}
            placeholder='Ghi chú'
            multiline={true}
            numberOfLines={2}
            onChangeText={handleChangeContent}
            value={content}
          />
        </View>
        <View></View>
        <RenderImage image={image} takePhoto={takePhoto} pickImageFromLibrary={pickImageFromLibrary}/>
      </ScrollView>

      <Button
        onPress={pickImageFromLibrary}
        title="Chọn hình ảnh từ thư viện"
      />

      <Button onPress={takePhoto} title="Chụp ảnh" />

      {/* {renderImage()} */}
      {renderUploadingOverlay()}

      <StatusBar barStyle="default" />
    </View>
  );
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
  titleWrapper: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlignVertical: 'top',
    padding: 10,
    color: COLOR.COLOR2,
    lineHeight: 30,
  },
  contentWrapper: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  content: {
    fontSize: 18,
    textAlignVertical: 'top',
    padding: 10,
    lineHeight: 25,
  },
  button: {
    color: COLOR.COLOR_HEADER_TEXT,
    paddingHorizontal: 15,
  },
});




