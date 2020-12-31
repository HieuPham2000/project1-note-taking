import React, { useState, Component, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Text} from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as COLOR from "../theme/color"
import { useDispatch } from "react-redux";

export default function Table(props) {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [widthCell, setWidthCell] = useState([]);
  const [numberLineCell, setNumberLineCell] = useState([]);
  
  useEffect(() => {
    let numberOfRow = props.numberOfRow;
    let numberOfCol = props.numberOfCol;
    if(row!=numberOfRow || col!=numberOfCol) {
      let tmp = new Array(numberOfRow + 1);
      for(var i = 0; i < numberOfRow + 1; i++) {
        tmp[i] = new Array(numberOfCol + 1);
        tmp[i].fill("");
      }
      
      for(var i = 0; i < numberOfRow + 1; i++) {
        tmp[i][0] = String(i);
      }
      for(var j = 0; j < numberOfCol + 1; j++) {
        tmp[0][j] = String(j);
      }
      tmp[0][0] = "";
      
      let w = new Array(numberOfCol+ 1);
      w.fill(100);
      let h = new Array(numberOfRow+ 1);
      h.fill(1);

      setRow(numberOfRow);
      setCol(numberOfCol);
      setTableData([...tmp]);
      setWidthCell([...w]);
      setNumberLineCell([...h]);
    }
  })

 
  const handleChangeText = (r, c, text) => {
    let tmp = [...tableData];
    tmp[r][c] = text;
    setTableData([...tmp])
  }
  

  const cell = (r, c) => {
    if(r==0) {
      return (
        <Text 
          style={{
            margin: 5, 
            fontSize: 14, 
            alignSelf: "center", 
            opacity: 0.2
          }}>{tableData[r][c]}</Text>
      )
    } else if (c==0) {
      return (
        <Text 
          style={{
            margin: 20, 
            fontSize: 14, 
            alignSelf:'center',
            opacity: 0.2
          }}>{tableData[r][c]}</Text>
      )
    } else {
      return (
        <TextInput 
          value={tableData[r][c]} 
          onChangeText={(text) => handleChangeText(r, c, text)}         
          multiline={true}
          style={{margin: 5, fontSize: 16}}
        />
      )
    }
  }

  const renderCell = (r, c) => {
    if(tableData.length > 0 && widthCell.length > 0) {
    return (
      <View 
      key = {c} 
      style={{ flex: 1, borderWidth: (r==0||c==0)?0:1, alignSelf:'stretch',width: widthCell[c], minWidth: 100}}>
          {cell(r, c)}
      </View>
    )
  }
  }

  const renderRow = (r) => {
    const data = new Array(props.numberOfCol + 1);
    data.fill(10);
    return (
      <View key={r} style={{ flex: 1, alignSelf:'stretch', flexDirection: 'row',}}>
        {data.map((i, c) => {
          return renderCell(r, c)
        })}
      </View>
    );
  }

  const data = new Array(props.numberOfRow + 1);
  data.fill(10);
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        {data.map((i, r) => {
          return renderRow(r)
        })}
      </View>
    
  )
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