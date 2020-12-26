import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import * as COLOR from '../theme/color'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
export default function EmptyTodo() {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.COLOR_BACKGROUND, alignItems: 'center' }}>
      <Image
        source={require('../../assets/Empty_Todo.png')}
        style={{
          width: 0.9*W,
          height: 0.7*H,
          resizeMode: 'contain'
        }}
      />
      <Text style={{ fontSize: 22, color: COLOR.COLOR_SPECIAL_TEXT, top: 0.6*H, position:'absolute' }}>
        Bạn chưa tạo danh sách!
      </Text>
    </View>
  )
}
