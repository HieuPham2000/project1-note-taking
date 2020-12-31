import * as React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';
import { convertDate, convertString } from '../utils/convert';
import * as COLOR from '../theme/color';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as type from '../redux/actiontypes'
import { useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const convertStringCell = function (str) {
  if (str.length > 20) {
    return (str.slice(0, 20) + '...');
  }
  return str;
}

export function NomalizeTableToShow({row, col, table}) {
  const nomalizeTable = () => {
    if(row <= 3 && col <= 3) {
      // ít hơn 1 hàng, 1 cột so với table
      let tmp = [...Array(row)].map((i) => Array(col).fill(""));
      for(var i = 1; i <= row; i++) {
        for(var j = 1; j <= col; j++) {
          tmp[i-1][j-1]= convertStringCell(table[i][j]);
        }
      }
      return tmp;
      
    } else if (row > 3 && col <= 3) {
      let tmp = [...Array(4)].map((i) => Array(col).fill(""));
      for(var i = 1; i <= 3; i++) {
        for(var j = 1; j <= col; j++) {
          tmp[i-1][j-1]= convertStringCell(table[i][j]);
        }
      }
      for(var j = 1; j <= col; j++) {
          tmp[3][j - 1]= "...";
      }
      return tmp;

    } else if (row <= 3 && col > 3) {
      let tmp = [...Array(row)].map((i) => Array(4).fill(""));
      for(var i = 1; i <= row; i++) {
        for(var j = 1; j <= 3; j++) {
          tmp[i-1][j-1]= convertStringCell(table[i][j]);
        }
      }
      for(var i = 1; i <= row; i++) {
          tmp[i-1][3]= "...";
      }
      return tmp;

    } else {
      let tmp = [...Array(4)].map((i) => Array(4).fill(""));
      for(var i = 1; i < 4; i++) {
        for(var j = 1; j < 4; j++) {
          tmp[i-1][j-1]= convertStringCell(table[i][j]);
        }
      }
      for(var i = 0; i < 4; i++) {
          tmp[i][3]= "...";
          tmp[3][i]= "...";
      }
      return tmp;
    }
  }

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Rows data={nomalizeTable()} textStyle={styles.text}/>
      </Table>
    </View>
  )
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  }
});