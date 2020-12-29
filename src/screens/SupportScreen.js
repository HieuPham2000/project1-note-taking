import { Button, Linking, View, TouchableOpacity, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import React from 'react';
import * as COLOR from '../theme/color'
import { MaterialIcons } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
/* function Anchor(props) {
  const handlePress = () => {
    //console.log("Link clicked for " + props.href);
    Linking.openURL(props.href);
    props.onPress && props.onPress();
  };

    return (

      <Button style={{backgroundColor: COLOR.COLOR1, color: COLOR.COLOR6}} title={props.title} onPress={handlePress} />
    );
} */
const HREF = "mailto:hieu.pt183535@gmail.com"
export default function SupportScreen({navigation}) {
  const handlePress = () => {
    Linking.openURL(HREF);
    //onPress && onPress();
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" />
      <Text style={[styles.text, {color: COLOR.COLOR2}]}>Thông tin ứng dụng</Text>
      <Text style={[styles.text, {color: COLOR.COLOR2}]}>Thông tin ứng dụng</Text>
      <TouchableOpacity onPress={handlePress} style={styles.feedback}>
        <MaterialIcons name="feedback" size={36} color={COLOR.COLOR1}/>
        <Text style={{ fontSize: 20, color: COLOR.COLOR1, margin: 10}}>Gửi ý kiến phản hồi</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    color: COLOR.COLOR1, 
    margin: 10
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  }
})