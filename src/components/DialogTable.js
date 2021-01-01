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
import * as COLOR from '../theme/color'
import Dialog from "react-native-dialog";
import * as type from "../redux/actiontypes"
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';


const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

export default function DialogTable({ TYPE, visible, setVisible }) {
  //const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState("");
  const dispatch = useDispatch();

  /* useEffect(()=> {
    setVisible()
  }) */
  
  const handleCancel = () => {
    setVisible(false);
    setIndex("");
  }

  const handleConfirm = () => {
    dispatch({type: TYPE, payload:{index: Number(index)}});
    setIndex("");
    Keyboard.dismiss();
    setVisible(false);
  }

  const renderTitle = () => {
    switch (TYPE) {
      case type.DELETE_ROW:
        return "Xóa hàng";
      case type.DELETE_DATA_IN_ROW:
        return "Xóa dữ liệu trên hàng";
      case type.DELETE_COLUMN:
        return "Xóa cột";
      case type.DELETE_DATA_IN_COLUMN:
        return "Xóa dữ liệu trên cột";
      case type.ADD_ROW:
        return "Thêm hàng";
      case type.ADD_COLUMN:
        return "Thêm cột"; 
    } 
  }
  const renderDescription = () => {
    switch (TYPE) {
      case type.DELETE_ROW:
        return "Mời bạn nhập hàng cần xóa";
      case type.DELETE_DATA_IN_ROW:
        return "Mời bạn nhập hàng cần xóa dữ liệu";
      case type.DELETE_COLUMN:
        return "Mời bạn nhập cột cần xóa";
      case type.DELETE_DATA_IN_COLUMN:
        return "Mời bạn nhập hàng cần xóa dữ liệu";
      case type.ADD_ROW:
        return "Mời bạn nhập vị trí chèn thêm hàng";
      case type.ADD_COLUMN:
        return "Mời bạn nhập vị trí chèn thêm cột"; 
    } 
  }
  const renderPlaceholder = () => {
    switch (TYPE) {
      case type.DELETE_ROW:
        return "Số thứ tự hàng";
      case type.DELETE_DATA_IN_ROW:
        return "Số thứ tự hàng";
      case type.DELETE_COLUMN:
        return "Số thứ tự cột";
      case type.DELETE_DATA_IN_COLUMN:
        return "Số thứ tự cột";
      case type.ADD_ROW:
        return "Số thứ tự hàng";
      case type.ADD_COLUMN:
        return "Số thứ tự cột"; 
    } 
  }

  if(!TYPE) {
    return <View></View>
  }
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.title}>{renderTitle()}</Dialog.Title>
          <Dialog.Description>{renderDescription()}</Dialog.Description>
          <Dialog.Input
            //label={renderLabel()}
            placeholder={renderPlaceholder()}
            onChangeText={(text) => { setIndex(text.replace(/[^0-9]/g, '')) }}
            value={String(index)}
            style={{...styles.input, /* borderBottomColor: (index) ? '#5ab4ac' : 'black' */ }}
            keyboardType={"numeric"}
            maxLength={2}
          />
        <Dialog.Button label="Hủy" onPress={handleCancel} />
        <Dialog.Button
          label="Xác nhận"
          onPress={handleConfirm}
          disabled={index==""}
          style={{ opacity: (index) ? 1 : 0.3 }}
        />
      </Dialog.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.COLOR_BACKGROUND
  },
  title: {
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    //borderBottomColor: "black"
  },
});




