import React, { useState, Component, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Text, Alert} from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as COLOR from "../theme/color"
import { useDispatch } from "react-redux";
import MyTable from '../components/MyTable';
import * as type from '../redux/actiontypes'

export default function App({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const [numberOfCol, setNumberOfCol] = useState(0);
  const [numberOfRow, setNumberOfRow] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [widthCell, setWidthCell] = useState([]);

  const idNote = route.params===undefined? -1 : route.params.idNote;
  const titleNote = route.params===undefined? '' : route.params.titleNote;
  const contentNote = route.params===undefined? '' : route.params.contentNote;

  const [id, setId] = useState(idNote);
  const [title, setTitle] = useState(titleNote);
  const [content, setContent] = useState(contentNote);
  const dispatch = useDispatch();

  

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

  const saveTableNote = (tableData) => {
    dispatch({type: type.NEW_TABLE_NOTE, payload: {title: title, content: content, table: tableData} })
    navigation.navigate('HomeScreen');
  }

  const updateImageNote = (tableData) => {
    dispatch({type: type.UPDATE_IMAGE_NOTE, payload: {id: id, title: title, content: content, table: tableData} })
    navigation.navigate('HomeScreen');
  }

  const confirm = () => {
    if(id===-1) {
      saveTableNote();
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
          { text: 'Không lưu', onPress: () => navigation.navigate('HomeScreen') },
          { text: 'Lưu', onPress: () => saveTableNote() }
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


  const showDialog = () => {
    setRow("");
    setColumn("");
    setNumberOfRow(0);
    setNumberOfCol(0);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setNumberOfRow(Number(row));
    setNumberOfCol(Number(column));
    setVisible(false);
  };


  return (
    <View style={styles.container}>
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

        <TouchableOpacity 
          style={{ flex:3, alignItems: 'center', justifyContent:'space-around' }}
          onPress={showDialog}
        >
          <AntDesign style={{}} name="table" size={60} color={"black"} />
          {/* <Text>Tạo bảng</Text> */}
        </TouchableOpacity>
        <View style={{ flex:5}}>
          <ScrollView>
            <ScrollView horizontal={true}>
              <MyTable numberOfCol={numberOfCol} numberOfRow={numberOfRow} />
            </ScrollView>
          </ScrollView>
        </View>
      </ScrollView>

      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.title}>Tạo bảng</Dialog.Title>
        {
          (!column || !row) &&
          <Dialog.Description style={{}} children={"Mời bạn nhập kích thước bảng"} />
        }

        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
          <Dialog.Input
            label={"Số hàng"}
            placeholder={"Nhập số hàng"}
            onChangeText={(text) => { setRow(text.replace(/[^0-9]/g, '')) }}
            value={row}
            style={styles.input}
            keyboardType={"numeric"}
            maxLength={2}
          />
          <Dialog.Input
            label="Số cột"
            placeholder={"Nhập số cột"}
            onChangeText={(text) => { setColumn(text.replace(/[^0-9]/g, '')) }}
            value={column}
            style={styles.input}
            keyboardType={"numeric"}
            maxLength={2}
          />
        </View>
        {
          column && row
          &&
          <View>
            <Dialog.Description style={styles.done} children={`Tạo bảng ${row}x${column}.`} />
          </View>

        }

        <Dialog.Button label="Hủy" onPress={() => handleCancel()} />
        <Dialog.Button
          label="Xác nhận"
          onPress={() => handleConfirm()}
          disabled={(!row) || (!column)}
          style={{ opacity: (row && column) ? 1 : 0.3 }}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontWeight: '700',
  },
  done: {
    color: "green",
    marginLeft: 8,
  },
  doing: {
    color: "red",
    marginLeft: 8,
  },
  input: {
    borderBottomWidth: 1,
    //borderBottomColor: "black"
  },
  cell: {
    borderWidth: 1,
  },
  table: {
    flex: 0.5,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
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