import React, { useState, Component, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, ScrollView} from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as COLOR from "../theme/color"
import { useDispatch } from "react-redux";

function Table(props) {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [widthCell, setWidthCell] = useState([]);
  
  useEffect(() => {
    let numberOfRow = props.numberOfRow;
    let numberOfCol = props.numberOfCol;
    if(row!=numberOfRow || col!=numberOfCol) {
      let tmp = new Array(numberOfRow);
      for(var i = 0; i < numberOfRow; i++) {
        tmp[i] = new Array(numberOfCol);
        tmp[i].fill("");
      }
      let w = new Array(numberOfCol);
      w.fill(100);

      setRow(numberOfRow);
      setCol(numberOfCol);
      setTableData([...tmp]);
      setWidthCell([...w]);
    }
  })

 
  const handleChangeText = (r, c, text) => {
    let tmp = [...tableData];
    tmp[r][c] = text;
    setTableData([...tmp])
    /* if(text.length== 10) {
      let w = [...widthCell];
      w[c] = 200;
      setWidthCell([...w])
    } */
  }
  

  const renderCell = (r, c) => {
    if(tableData.length > 0 && widthCell.length > 0) {
    return (
      <View 
      key = {c} 
      style={{ flex: 1, borderWidth:1, alignSelf:'stretch',width: widthCell[c], minWidth: 100}}>
          <TextInput 
          value={tableData[r][c]} 
          onChangeText={(text) => handleChangeText(r, c, text)}
          /* onContentSizeChange={(event) => {
            if (event && event.nativeEvent && event.nativeEvent.contentSize) {
              let w = [...widthCell];
              w[c] = event.nativeEvent.contentSize.width;
              console.log(w[c]);
              setWidthCell([...w])
            }
            //props.onContentSizeChange && this.props.onContentSizeChange(event)
            }} */
            
          multiline={true}
          style={{margin: 5, fontSize: 16}}
          />
      </View>
    )
  }
  }

  const renderRow = (r) => {
    const data = new Array(props.numberOfCol);
    data.fill(10);
    return (
      <View key={r} style={{ flex: 1, alignSelf:'stretch', flexDirection: 'row',}}>
        {data.map((i, c) => {
          return renderCell(r, c)
        })}
      </View>
    );
  }

  const data = new Array(props.numberOfRow);
  data.fill(10);
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        {data.map((i, r) => {
          return renderRow(r)
        })}
      </View>
    
  )
}
export default function App({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const [numberOfCol, setNumberOfCol] = useState(0);
  const [numberOfRow, setNumberOfRow] = useState(0);

  const idNote = route.params===undefined? -1 : route.params.idNote;
  const titleNote = route.params===undefined? '' : route.params.titleNote;
  const contentNote = route.params===undefined? '' : route.params.contentNote;
  const imageNote = route.params===undefined? [] : route.params.imageNote;

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

  const saveImageNote = () => {
    dispatch({type: type.NEW_IMAGE_NOTE, payload: {title: title, content: content, image: image} })
    navigation.navigate('HomeScreen');
  }

  const updateImageNote = () => {
    dispatch({type: type.UPDATE_IMAGE_NOTE, payload: {id: id, title: title, content: content, image: image} })
    navigation.navigate('HomeScreen');
  }

  const notUpdateImageNote = () => {
    //dispatch({type: type.UPDATE_IMAGE_NOTE, payload: {id: id, title: title, content: content, image: imageNote} })
    navigation.navigate('HomeScreen');
  }

  const confirm = () => {
    if(id===-1) {
      saveImageNote();
      Alert.alert('Thông báo','Tạo ghi chú thành công!');
    } else if (title !== titleNote || content != contentNote || image != imageNote) {
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
          { text: 'Lưu', onPress: () => saveImageNote() }
        ],
        { cancelable: false }
      );
    } else if (title !== titleNote || content != contentNote || image != imageNote ) {
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

        <TouchableOpacity style={{ flex:3, alignItems: 'center', justifyContent:'space-around' }}>
          <AntDesign style={{}} name="table" size={60} color={"black"} onPress={() => showDialog()} />
        </TouchableOpacity>
        <View style={{ flex:5}}>
          <ScrollView>
            <ScrollView horizontal={true}>
              <Table numberOfCol={numberOfCol} numberOfRow={numberOfRow} />
            </ScrollView>
          </ScrollView>
        </View>
      </ScrollView>
{/* 
      <View style={{flex:1}}>
        <TouchableOpacity style={{ flex:3, alignItems: 'center', justifyContent:'space-around' }}>
          <AntDesign style={{}} name="table" size={60} color={"black"} onPress={() => showDialog()} />
        </TouchableOpacity>
        <View style={{ flex:5}}>
          <ScrollView>
            <ScrollView horizontal={true}>
              <Table numberOfCol={numberOfCol} numberOfRow={numberOfRow} />
            </ScrollView>
          </ScrollView>
        </View>
      </View> */}

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
            {/* <Dialog.Description
              style={styles.doing}
              children={`Chú ý: Bạn không thể thay đổi kích thước bảng sau khi tạo!`}
            /> */}
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