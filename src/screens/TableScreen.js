import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import { db } from '../config';
import * as COLOR from '../theme/color'
import * as type from '../redux/actiontypes'
import { MaterialIcons } from '@expo/vector-icons';

export default function NoteScreen(props) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isChanged, setChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View>
          <MaterialIcons
            name="check"
            size={24}
            style={styles.button}
            onPress={saveNote}
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
    })
  })

  const handleChangeTitle = (text) => {
    setTitle(text);
    setChanged(true);
  }

  const handleChangeContent = (text) => {
    setContent(text);
    setChanged(true);
  }

  const saveNote = () => {
    let date = new Date();
    dispatch({ type: type.NEW_NOTE, payload: { title: title, content: content, date: date, id: date } })
    props.navigation.navigate('HomeScreen');
  }

  const goBack = () => {
    Alert.alert(
      'Chú ý',
      'Bạn chưa lưu ghi chú. Bạn muốn xóa ghi chú hiện tại?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => props.navigation.navigate('HomeScreen') },
      ],
      { cancelable: false }
    );
  }


  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextInput
              style={styles.title}
              placeholder='Tiêu đề'
              multiline={true}
              numberOfLines={1}
              autoFocus={true}
              onChangeText={handleChangeTitle}
              value={title}
            />
          </View>
          <View style={styles.line} />
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ flex: 3, alignItems: 'center', justifyContent: 'space-around' }}>
              <AntDesign style={{}} name="table" size={60} color={"black"} onPress={() => showDialog()} />
            </TouchableOpacity>
            <View style={{ flex: 5 }}>
              <ScrollView>
                <ScrollView horizontal={true}>
                  <Table numberOfCol={numberOfCol} numberOfRow={numberOfRow} />
                </ScrollView>
              </ScrollView>
            </View>
          </View>

          
        </ScrollView>
    </View>
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
  }
});
