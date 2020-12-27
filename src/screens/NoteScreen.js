import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import * as COLOR from '../theme/color'
import * as type from  '../redux/actiontypes'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native';

//import DelayInput from 'react-native-debounce-input'


export default function NoteScreen({navigation, route}) {
  const idNote = route.params===undefined? -1 : route.params.idNote;
  const titleNote = route.params===undefined? '' : route.params.titleNote;
  const contentNote = route.params===undefined? '' : route.params.contentNote;
  //console.log(idNote + " " + titleNote + " " + contentNote);

  const [id, setId] = useState(idNote);
  const [title, setTitle] = useState(titleNote);
  const [content, setContent] = useState(contentNote);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [idTimeout, setIdTimeout] = useState(null);
  const [oldTitle, setOldTitle] = useState(title);
  const [oldContent, setOldContent] = useState(content);

  const dispatch = useDispatch();

  const titleRef = useRef();
  

  /* componentDidMount() {
    this.setState({
      id: this.props.route.params?.id ?? '', // tại sao trên web thì id: this.props.route.params.id không lỗi
      title: this.props.route.params?.title ?? '',
      content: this.props.route.params?.content ?? '',
    })
  } */
  // Test
  /* useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, []); */


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
    //console.log("handelChangeTitle is called!")
    //console.log(text)

    setRedoStack([]);

    clearTimeout(idTimeout);
    const tmp = setTimeout(() => {setUndoStack([oldTitle, ...undoStack]), setOldTitle(text)}, 500) ;
    setIdTimeout(tmp);

    setTitle(text);
  }

  const handleChangeContent = (text) =>  {
    setContent(text);
  }

  const handleUndo = () => {
    // vì khi ấn undo thì tham số text ở handleTitleChange vẫn lưu giá trị cũ??
    // nên lỗi xảy ra khi đã undo, redo giữa chừng mà nhập text mới => sai
    titleRef.current.clear()
    //setTitle('Press undo');
    if(undoStack.length >= 1) {
      const newHistory = [...undoStack];
      const value = newHistory.shift();
      setUndoStack([...newHistory]);
      if(redoStack.length == 0) {
        setRedoStack([value, title, ...redoStack]);
      } else {
        setRedoStack([value, ...redoStack]);
      }
      setTitle(value);
      // phải set Old Title vì...
      setOldTitle(value);
    }
  }

  const handleRedo = () => {
    if(redoStack.length >= 2) {
      const newHistory = [...redoStack];
      const value = newHistory.shift();
      setRedoStack([...newHistory]);
      setUndoStack([value, ...undoStack]);
      setTitle(redoStack[1]);
      setOldTitle(redoStack[1]);
    }
    
  }

  const printUndoStack = () => {
    console.log(undoStack);
  }

  const printRedoStack = () => {
    console.log(redoStack);
  }

  const saveNote = () => {
    //let date = new Date();
    dispatch({type: type.NEW_NOTE, payload: {title: title, content: content, /*date: date, id: date*/ } })
    navigation.navigate('HomeScreen');
  }

  const updateNote = () => {
    dispatch({type: type.UPDATE_NOTE, payload: {id: id, title: title, content: content} })
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


    return (
      <View style={styles.container}>
        <View>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextInput
              //delayTimeout={500}
              //inputRef={titleRef}
              ref = {titleRef}
              style={styles.title}
              placeholder='Tiêu đề'
              multiline={true}
              numberOfLines={1}
              autoFocus={true}
              onChangeText={handleChangeTitle}
              value={title}
            />
            {/* <Text>title: {title}</Text> */}
          </View>
          <View style={styles.line} />
          <View style={styles.contentWrapper}>
            <TextInput
              style={styles.content}
              placeholder='Ghi chú'
              multiline={true}
              numberOfLines={8}
              onChangeText={handleChangeContent}
              value={content}
            />
            {/* <Text>content: {content}</Text> */}
          </View>
        </ScrollView>
        </View>
        {(undoStack.length>0||redoStack.length-1>0)&&<View style={styles.undoBar}>
          <Button onPress={printUndoStack} title="undo"/>
          <View style={{flex: 5}}/>
          <FontAwesome5 
            name="undo" 
            size={26} 
            color={COLOR.COLOR2} 
            onPress={handleUndo}
            disable={undoStack.length>0?false:true}
            style={{opacity: undoStack.length>0?1:0.2}}
          />
          <View style={{flex: 2}}/>
          <FontAwesome5 
            name="redo" 
            size={26} 
            color={COLOR.COLOR2} 
            onPress={handleRedo}
            disable={redoStack.length>0?false:true}
            style={{opacity: redoStack.length - 1>0?1:0.2}}
          />
          <View style={{flex: 5}}/>
          <Button onPress={printRedoStack} title="redo"/>
        </View>}
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
  button: {
    color: COLOR.COLOR_HEADER_TEXT,
    paddingHorizontal: 15,
  },
  undoBar: {
    flexDirection:'row',
    elevation: 20,
    backgroundColor: COLOR.COLOR5,
    position: 'absolute',
    bottom: 0,
    padding: 10,
  }
});
