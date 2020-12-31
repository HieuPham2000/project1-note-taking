import React, { useState, Component, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Text} from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as COLOR from "../theme/color"
import { useDispatch, useSelector } from "react-redux";
import * as type from "../redux/actiontypes"

export default function Table({row, col}) {
  const tableData = useSelector((state) => state.table);
  const dispatch = useDispatch();

  const handleChangeText = (r, c, text) => {
    dispatch({type: type.CHANGE_TEXT_CELL, payload: {row: r, col: c, text: text}});
  }

 /*  useEffect(() => {
    console.log(tableData);
  }, [tableData]) */

  const cell = (r, c) => {
    if(tableData.length > 0 /* && widthCell.length > 0 */) {
     if(r==0) {
      return (
        <Text 
          style={{
            margin: 5, 
            fontSize: 14, 
            alignSelf: "center", 
            color: "#c8e1ff"
          }}>{tableData[r][c]}</Text>
      )
    } else if (c==0) {
      return (
        <Text 
          style={{
            margin: 5, 
            fontSize: 14, 
            alignSelf:'center',
            color: "#c8e1ff"
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
  }

  const renderCell = (r, c) => {
    if(tableData.length > 0 /* && widthCell.length > 0 */) {
    return (
      <View 
      key = {c} 
      style={{ flex: 1, borderWidth: (r==0||c==0)?0:1, borderColor: "#c8e1ff", alignSelf:'stretch',width: (c==0)?20:100,}}>
          {cell(r, c)}
      </View>
    )
    }
  }

  const renderRow = (r) => {
    if(!tableData) {
      return;
    }
    const data = new Array(col + 1);
    data.fill(10);
    return (
      <View key={r} style={{ flex: 1, alignSelf:'stretch', flexDirection: 'row',}}>
        {data.map((i, c) => {
          return renderCell(r, c)
        })}
      </View>
    );
  }

  const data = new Array(row + 1);
  data.fill(10);
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        {tableData.length > 0 && data.map((i, r) => {
          return renderRow(r)
        })}
      </View>
    
  )
}

const styles = StyleSheet.create({
});