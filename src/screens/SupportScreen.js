import { Button, Linking, View } from 'react-native';
import React from 'react';

function Anchor(props) {
  const _handlePress = () => {
    console.log("Link clicked for " + props.href);
    Linking.openURL(props.href);
    props.onPress && props.onPress();
  };

    return (
      <Button title={props.title} onPress={_handlePress} />
    );
}

export default function SupportScreen() {
    return (
      <View style={{marginVertical: 300, flex: 1}}>
        <Anchor href="mailto:hieu.pt183535@gmail.com" title="Phản hồi" />
      </View>
    );
}