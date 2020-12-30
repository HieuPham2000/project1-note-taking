import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import * as COLOR from '../theme/color'

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
export default function EmptyNote({typeNote}) {
  // test
  const [text, setText] = useState("");
  React.useEffect(() => {
    if(typeNote == "all") {
      setText("Bạn chưa tạo ghi chú!");
    } else if(typeNote == "text") {
      setText("Bạn không có ghi chú văn bản!");
    } else if(typeNote == "image") {
      setText("Bạn không có ghi chú hình ảnh!");
    } else {
      setText("Bạn không có ghi chú bảng!");
    }
  }, [typeNote])
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.COLOR_BACKGROUND, alignItems: 'center' }}>
      <Image
          source={require('../../assets/Empty_Note.png')}
          style={{
            width: 0.8*W,
            height: 0.75*H,
            resizeMode: 'contain'
          }}
      />
      <Text style={{ fontSize: 20, color: COLOR.COLOR_SPECIAL_TEXT, top: 0.6*H, position:'absolute' }}>{text}</Text>
    </View>
  )
}
