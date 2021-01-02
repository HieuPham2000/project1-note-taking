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
import * as COLOR from '../theme/color'
import { MaterialIcons, Entypo} from '@expo/vector-icons';
import { uploadImageAsync} from '../utils/uploadImage'
import RenderImage from '../components/MyImage';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../redux/actiontypes';
import { compareImages } from "../utils/compare";
import { useKeyboardStatus } from "../utils/useKeyboardStatus"

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function App({navigation, route}) {
  const idNote = route.params===undefined? -1 : route.params.idNote;
  const titleNote = route.params===undefined? '' : route.params.titleNote;
  const contentNote = route.params===undefined? '' : route.params.contentNote;
  const imageNote = route.params===undefined? [] : route.params.imageNote;

  const [id, setId] = useState(idNote);
  const [title, setTitle] = useState(titleNote);
  const [content, setContent] = useState(contentNote);
  const image = useSelector((state) => state.imageNote)
  const [uploading, setUploading] = useState(false);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  // test useKeyboardStatus
  const isOpenKeyboard = useKeyboardStatus();

  useEffect(() => {
    (async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    })();
  }, []);

  useEffect(() => {
    if(route.params!==undefined) {
      let tmp = []
      let len = route.params.imageNote.length;
      for(let i = 0; i < len; i++) {
        tmp.push({...route.params.imageNote[i]})
      }
      dispatch({type: type.INIT_IMAGES, payload: tmp});
    } else {
      dispatch({type: type.INIT_IMAGES, payload: []})
    }
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

  const saveImageNote = () => {
    dispatch({type: type.NEW_IMAGE_NOTE, payload: {title: title, content: content, image: image} })
    navigation.navigate('HomeScreen');
  }

  const notSaveImageNote = () => {
    dispatch({type: type.NOT_SAVE_IMAGE_NOTE, payload: {images: image} })
    navigation.navigate('HomeScreen');
  }

  const updateImageNote = () => {
    dispatch({type: type.UPDATE_IMAGE_NOTE, payload: {id: id, title: title, content: content, image: image, oldImages: imageNote} })
    navigation.navigate('HomeScreen');
  }

  const notUpdateImageNote = () => {
    dispatch({type: type.NOT_UPDATE_IMAGE_NOTE, payload: {oldImages: imageNote, newImages: image} })
    navigation.navigate('HomeScreen');
  }

  const confirm = () => {
    if(id===-1) {
      saveImageNote();
      Alert.alert('Thông báo','Tạo ghi chú thành công!');
    } else if (title !== titleNote || content != contentNote || !compareImages(image, imageNote)) {
      Alert.alert(
        'Cập nhật',
        'Bạn muốn cập nhật ghi chú hiện tại?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Cập nhật', onPress: () => updateImageNote() },
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
        'Bạn chưa lưu ghi chú! Tất cả hình ảnh sẽ bị xóa. Bạn có muốn lưu?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Không lưu', onPress: () => notSaveImageNote() },
          { text: 'Lưu', onPress: () => saveImageNote() }
        ],
        { cancelable: false }
      );
    } else if (title !== titleNote || content != contentNote || !compareImages(image, imageNote) ) {
      Alert.alert(
        'Chú ý',
        'Thay đổi chưa được lưu! Bạn có muốn lưu thay đổi? ',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Không lưu', onPress: () => notUpdateImageNote() },
          { text: 'Lưu', onPress: () => updateImageNote() }
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


  const takePhoto = async (pos) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    handleImagePicked(pickerResult, pos);
  };

  const pickImageFromLibrary = async (pos) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    handleImagePicked(pickerResult, pos);
  };

  const handleImagePicked = async (pickerResult, pos) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const nameImage = String(Date.now())
        const uploadUrl = await uploadImageAsync(nameImage, pickerResult.uri);
        if(pos==-1) {
          dispatch({type: type.ADD_IMAGE, payload: {name: nameImage, uri: uploadUrl}})
          setTimeout(() => scrollViewRef.current.scrollToEnd({animated: false}), 1000);
        } else {
          // lỗi khi xóa 
          /* dispatch({type: type.UPDATE_IMAGE, payload: {id:idNote, name: pos, uri: uploadUrl}}) */
          dispatch({type: type.UPDATE_IMAGE, payload: {id:idNote, old: pos, name: nameImage, uri: uploadUrl}})
        } 
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Thông báo', 'Upload thất bại!');
    } finally {
      /* console.log("image");
      console.log(image); */
      setUploading(false);
    }
  };


  const setCaptionImage = (text, id) => {
    dispatch({type: type.UPDATE_CAPTION, payload: {text: text, name: id}});
  }
  const deleteImage = (id) => {
    dispatch({type: type.DELETE_IMAGE, payload: id});
  }
  return (
    <View style={{ flex: 1, backgroundColor:COLOR.COLOR_BACKGROUND}}>
      <ScrollView
        ref={scrollViewRef}
      >
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
        {image && image.length > 0 && image.map((i,k) => 
          <RenderImage 
            linkImage={i.uri} 
            caption={i.caption} 
            key={k}
            id={i.name} 
            takePhoto={takePhoto} 
            pickImageFromLibrary={pickImageFromLibrary}
            setCaption={setCaptionImage}
            deleteImage={deleteImage}
          />
        )}
      </ScrollView>

      {/* !isOpenKeyboard && */
      <View style={styles.buttonUpImageBar}>
          <Entypo name="camera" size={28} color={COLOR.COLOR2} 
            onPress={() => takePhoto(-1)}
          />
          <Entypo name="folder-images" size={28} color={COLOR.COLOR2} 
            onPress={() => pickImageFromLibrary(-1)}
          />
      </View>}
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
  buttonUpImageBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 30,
    backgroundColor: COLOR.COLOR5,
    paddingVertical: 10,
  },
});




