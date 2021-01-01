import React, { useState, Component, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, TextInput, View, TouchableHighlight, ScrollView, Text, Alert } from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as COLOR from "../theme/color"
import { useDispatch, useSelector } from "react-redux";
import MyTable from '../components/MyTable';
import * as type from '../redux/actiontypes';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { compareTable } from "../utils/compare";
import DialogTable from "../components/DialogTable";

const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;
export default function App({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const tableData = useSelector((state) => state.table);

  const idNote = route.params === undefined ? -1 : route.params.idNote;
  const titleNote = route.params === undefined ? '' : route.params.titleNote;
  const contentNote = route.params === undefined ? '' : route.params.contentNote;
  const numberOfCol = route.params === undefined ? "" : route.params.numberOfCol;
  const numberOfRow = route.params === undefined ? "" : route.params.numberOfRow;

  const [id, setId] = useState(idNote);
  const [title, setTitle] = useState(titleNote);
  const [content, setContent] = useState(contentNote);
  const [column, setColumn] = useState(numberOfCol);
  const [row, setRow] = useState(numberOfRow);
  /*   const [numColumn, setNumColumn] = useState(0);
    const [numRow, setNumRow] = useState(0); */
  const dispatch = useDispatch();

  const menuDelete = useRef();
  const hideMenuDelete = () => menuDelete.current.hide();
  const showMenuDelete = () => menuDelete.current.show();
  const menuModify = useRef();
  const hideMenuModify = () => menuModify.current.hide();
  const showMenuModify = () => menuModify.current.show();

  // test dialog delete, modify table
  const [visibleDialogTable, setVisibleDialogTable] = useState(false);
  const [TYPE, setTYPE] = useState("");

  useEffect(() => {
    if (route.params !== undefined) {
      let tmp = [];
      let len = route.params.tableNote.length;
      for (let i = 0; i < len; i++) {
        tmp.push([...route.params.tableNote[i]])
      }
      dispatch({ type: type.INIT_TABLE, payload: tmp });
    } else {
      dispatch({ type: type.INIT_TABLE, payload: [] })
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
    })
  })


  const handleChangeTitle = (text) => {
    setTitle(text);
  }

  const handleChangeContent = (text) => {
    setContent(text);
  }

  const saveTableNote = () => {
    dispatch({ type: type.NEW_TABLE_NOTE, payload: { title: title, content: content, table: tableData, col: Number(column), row: Number(row) } })
    navigation.navigate('HomeScreen');
  }

  const updateTableNote = () => {
    dispatch({ type: type.UPDATE_TABLE_NOTE, payload: { id: id, title: title, content: content, table: tableData, col: Number(column), row: Number(row) } })
    navigation.navigate('HomeScreen');
  }

  const confirm = () => {
    console.log(tableData);
    console.log(route.params.tableNote);
    if (id === -1) {
      saveTableNote();
      Alert.alert('Thông báo', 'Tạo ghi chú thành công!');
    } else if (title !== titleNote || content != contentNote || !compareTable(tableData, route.params.tableNote)) {
      Alert.alert(
        'Cập nhật',
        'Bạn muốn cập nhật ghi chú hiện tại?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Cập nhật', onPress: () => updateTableNote() },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('HomeScreen');
    }
  }

  const goBack = () => {
    if (id === -1) {
      Alert.alert(
        'Chú ý',
        'Bạn chưa lưu ghi chú! Bạn có muốn lưu?',
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
    } else if (title !== titleNote || content != contentNote || !compareTable(tableData, route.params.tableNote)) {
      Alert.alert(
        'Chú ý',
        'Thay đổi chưa được lưu! Bạn có muốn lưu thay đổi? ',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          { text: 'Không lưu', onPress: () => navigation.navigate("HomeScreen") },
          { text: 'Lưu', onPress: () => updateTableNote() }
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
    /* setNumberOfRow(0);
    setNumberOfCol(0); */
    setVisible(true);
  };

  const handleCancel = () => {
    setRow("");
    setColumn("");
    setVisible(false);
  };

  const handleConfirm = () => {
    //console.log(`row: ${row} & col: ${column}`);
    /* setNumColumn(Number(column));
    setNumRow(Number(row));
    setRow("");
    setColumn("");
    console.log(`row: ${numRow} & col: ${numColumn}`); */
    dispatch({ type: type.ADD_TABLE, payload: { row: Number(row), col: Number(column) } })
    setVisible(false);
  };

  const deleteTable = () => {
    dispatch({ type: type.DELETE_TABLE });
    setColumn("");
    setRow("");
  }

  const deleteDataInTable = () => {
    dispatch({ type: type.DELETE_DATA_IN_TABLE });
  }


  return (
    <View style={styles.container}>
      {/* ********************
      **                    **
      **   Title, Content   **
      **                    **
      ************************ */}
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
        {/* ********************
      **                    **
      ** Show Dialog Button **
      **                    **
      ************************ */}
        {(column == "" || row == "") && <TouchableHighlight
          style={styles.tableButton}
          onPress={showDialog}>
          <Text style={styles.textTableButton}>Tạo bảng</Text>
        </TouchableHighlight>}

        {/* ******************************
      **                              **
      **   Button Del, Modify Table   **
      **                              **
      ********************************** */}
        {(column != "" && row != "")
          &&
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableHighlight
              style={{ ...styles.tableButton, /* backgroundColor: COLOR.COLOR3  */ }}
              onPress={showMenuModify}>
              <Text style={styles.textTableButton}>Chỉnh sửa </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.tableButton, backgroundColor: COLOR.COLOR5, borderColor: COLOR.COLOR1, borderWidth: 0.5 }}
              onPress={showMenuDelete}>
              <Text style={{ ...styles.textTableButton, color: COLOR.COLOR1 }}>Xóa</Text>
            </TouchableHighlight>
          </View>
        }

        {/* ******************************
      **                              **
      **   Menu Delete                **
      **                              **
      ********************************** */}
        <View style={{ width: 0.6 * W, position: 'absolute', right: 0, top: 0 }}>
          <Menu ref={menuDelete} style={{ width: 0.6 * W, position: 'absolute', right: 0 }}>
            <MenuDivider />
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                deleteTable() 
              }}
              disabled={false}>Xóa bảng</MenuItem>
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                setVisibleDialogTable(true); 
                setTYPE(type.DELETE_COLUMN);
                setColumn(String(Number(column) - 1)); 
              }}
              disabled={false}>Xóa cột</MenuItem>
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                setVisibleDialogTable(true); 
                setTYPE(type.DELETE_ROW);
                setRow(String(Number(row) - 1));
              }}
              disabled={false}>Xóa hàng</MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                deleteDataInTable() 
              }}
              disabled={false}>Xóa toàn bộ dữ liệu</MenuItem>
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                setVisibleDialogTable(true); 
                setTYPE(type.DELETE_DATA_IN_COLUMN);
              }}
              disabled={false}>Xóa dữ liệu trên cột</MenuItem>
            <MenuItem
              onPress={() => { 
                hideMenuDelete(); 
                setVisibleDialogTable(true); 
                setTYPE(type.DELETE_DATA_IN_ROW);
              }}
              disabled={false}>Xóa dữ liệu trên hàng</MenuItem>
          </Menu>
        </View>
        {/* ******************************
      **                              **
      **   Menu Modify                **
      **                              **
      ********************************** */}
        <View style={{ width: 0.6 * W, position: 'absolute', left: 0, top: 0 }}>
          <Menu ref={menuModify} style={{ width: 0.6 * W }}>
            <MenuDivider />
            <MenuItem
              onPress={() => { 
                hideMenuModify();
                setVisibleDialogTable(true); 
                setTYPE(type.ADD_COLUMN); 
                setColumn(String(Number(column) + 1));
              }}
              disabled={false}>Chèn thêm cột</MenuItem>
            <MenuItem
              onPress={() => { 
                hideMenuModify();
                setVisibleDialogTable(true); 
                setTYPE(type.ADD_ROW); 
                setRow(String(Number(row) + 1));
              }}
              disabled={false}>Chèn thêm hàng</MenuItem>
          </Menu>
        </View>

      {/* ******************************
      **                              **
      **   Dialog thao tác bảng       **
      **                              **
      ********************************** */}
      <DialogTable visible={visibleDialogTable} setVisible={setVisibleDialogTable} TYPE={TYPE} />

        {/* ******************************
      **                              **
      **   Bảng                       **
      **                              **
      ********************************** */}
        {/* column!="" && row!="" && */
          <View style={{ flex: 5, marginBottom: 50 }}>
            <ScrollView>
              <ScrollView horizontal={true}>
                <MyTable
                  col={Number(column)}
                  row={Number(row)}
                />
              </ScrollView>
            </ScrollView>
          </View>}
      </ScrollView>



      {/* ******************************
      **                              **
      **   Dialog tạo bảng            **
      **                              **
      ********************************** */}
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.titleDialog}>Tạo bảng</Dialog.Title>
        {
          (!column || !row) &&
          <Dialog.Description style={{}} children={"Mời bạn nhập kích thước bảng"} />
        }

        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
          <Dialog.Input
            label={"Số hàng"}
            placeholder={"Nhập số hàng"}
            onChangeText={(text) => { setRow(text.replace(/[^0-9]/g, '')) }}
            value={String(row)}
            style={styles.input}
            keyboardType={"numeric"}
            maxLength={2}
          />
          <Dialog.Input
            label="Số cột"
            placeholder={"Nhập số cột"}
            onChangeText={(text) => { setColumn(text.replace(/[^0-9]/g, '')) }}
            value={String(column)}
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

        <Dialog.Button label="Hủy" onPress={handleCancel} />
        <Dialog.Button
          label="Xác nhận"
          onPress={handleConfirm}
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
  titleDialog: {
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
  tableButton: {
    width: 0.3 * W,
    alignSelf: "center",
    backgroundColor: COLOR.COLOR1,
    /* borderColor: COLOR.COLOR2,
    borderWidth: 0.5, */
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textTableButton: {
    color: COLOR.COLOR5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  }
});