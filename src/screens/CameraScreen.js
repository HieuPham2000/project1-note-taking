import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native';
import {db, app} from '../config'

//const LINK = app.storage().ref().child("/image.png").getDownloadURL().then((url) => {console.log(url); return url;}).catch((e)=> console.log(e));

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [capture, setCapture] = useState("");
  
  //const link = LINK;
  const LINK = 'https://firebasestorage.googleapis.com/v0/b/project-1-79684.appspot.com/o/image.png?alt=media&token=de8e9ea4-5523-48e6-8bc3-28c57f36084a'
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const options = {quality: 1, base64: true, /*skipProcessing: true*/};
        const data = await cameraRef.current.takePictureAsync(options);
        //console.log(data); => không hiển thị ra, hiện thị sẽ lỗi vì base 64 huge
        setCapture(data.uri);
        app.storage().ref().put(data);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
        
    }
  };


  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>

        </View>
        <Button onPress={() => takePicture()} title="Chụp"/>
      </Camera>
      <Image source={{ uri: LINK }} style={{width:250,height:250}} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 0.5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
