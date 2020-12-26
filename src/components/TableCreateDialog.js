import React, { useState, Component, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, Text} from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 0,
      col: 0,
      tableData: [],
      widthCell: [],
    };

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  //async UNSAFE_componentWillMout
  /* async componentDidMount() {
    let row = await this.props.numberOfRow;
    let col = await this.props.numberOfCol;
    console.log(row + " - " + col);
    let tmp = new Array(row);
    for(var i = 0; i < row; i++) {
      tmp[i] = new Array(col);
      tmp[i].fill("");
    }
    let w = new Array(col);
    w.fill(100)
    this.setState({
      tableData: [...tmp],
      widthCell: [...w]
    })
  } */

  componentDidUpdate() {
    let numberOfRow = this.props.numberOfRow;
    let numberOfCol = this.props.numberOfCol;
    if(this.state.row!=numberOfRow || this.state.col!=numberOfCol) {
      let tmp = new Array(numberOfRow);
      for(var i = 0; i < numberOfRow; i++) {
        tmp[i] = new Array(numberOfCol);
        tmp[i].fill("");
      }
      let w = new Array(numberOfCol);
      w.fill(100)
    this.setState({
      row: numberOfRow,
      col: numberOfCol,
      tableData: [...tmp],
      widthCell: [...w]
    })
    }
    
  }

 
  handleChangeText = (r, c, text) => {
    let tmp = [...this.state.tableData];
    tmp[r][c] = text;
    this.setState({
      tableData: [...tmp]
    })
  }

  find_dimesions(c, layout){
    const {x, y, width, height} = layout;
    /* let tmp = [...this.state.widthCell];
    tmp[c] = Math.max(width, 100);
    this.setState({
      widthCell: [...tmp]
    }) */
    /* console.log(x);
    console.log(y);
    console.log(width);
    console.log(height); */
  }

  renderCell(r, c) {
    //console.log(this.state.widthCell);
    //console.log(this.state.widthCell.length);
    if(this.state.tableData.length > 0 && this.state.widthCell.length > 0) {
    return (
      <View 
      //onLayout={(event) => { this.find_dimesions(c, event.nativeEvent.layout)}}
      key = {c} 
      style={{ flex: 1, alignSelf:'stretch', borderWidth:1, width: 100}}>
          <TextInput 
          value={this.state.tableData[r][c]} 
          onChangeText={(text) => this.handleChangeText(r, c, text)}
          multiline={true}
          style={{margin: 5, fontSize: 16}}
          />
      </View>
    )
  }
  }

  renderRow(r) {
    const data = new Array(this.props.numberOfCol);
    data.fill(10);
    return (
      <View key={r} style={{ flex: 1, alignSelf:'stretch', flexDirection: 'row',}}>
        {data.map((i, c) => {
          return this.renderCell(r, c)
        })}
      </View>
    );
  }

  render() {
    const data = new Array(this.props.numberOfRow);
    data.fill(10);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        {data.map((i, r) => {
          return this.renderRow(r)
        })}
      </View>
    );
  }
}
export default function App() {
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const [numberOfCol, setNumberOfCol] = useState(0);
  const [numberOfRow, setNumberOfRow] = useState(0);


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
      </View>

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
            <Dialog.Description
              style={styles.doing}
              children={`Chú ý: Bạn không thể thay đổi kích thước bảng sau khi tạo!`}
            />
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
});