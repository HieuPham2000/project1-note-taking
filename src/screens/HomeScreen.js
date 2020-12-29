import * as React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, StatusBar} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EmptyNote from '../components/EmptyNote'
import * as COLOR from '../theme/color'
import NoteItem from '../components/NoteItem'
import ActionButton from 'react-native-action-button';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {db} from '../config';
import * as type from '../redux/actiontypes'
import { Share } from 'react-native';


export default function HomeScreen(props) {
  // giải pháp tình thế => update: đã fix
  LogBox.ignoreAllLogs()

  const notes = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const isLoadingData = () => {
    if (loading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  React.useEffect(() => {
    // notes
    var noteItem = [];
    db.ref('/notes').once('value', querySnapShot => {
      var noteData = querySnapShot.val() ? querySnapShot.val() : {};
      for(var key in noteData) {
        noteItem.unshift({...noteData[key]});
      }
      setTimeout(() => {
        dispatch({ type: type.INIT_NOTES, payload: noteItem });
        setLoading(false);
      }, 500);
      })
  }, [])
  

  const share = () => {
    Share.share({
      title: "Hello",
      message: "Test",
    })
  }
  return (
    <View style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <ScrollView
        contentContainerStyle={{}}
      >
        {notes.length > 0 ?
        <View>
          {notes.map((i, k) => (
              <NoteItem
                //key={k}
                key={k}
                id={i.key}
                date={i.date}
                title={i.title}
                content={i.content}
                navigation={props.navigation}
              />
          )
          )}
        </View>
        :
        <View>
          <EmptyNote />
        </View>}
      </ScrollView>
      {/* <View style={{
        position: 'absolute',
        bottom: 60,
        right: 40,
      }}>
        <MaterialIcons
          name="add"
          size={60}
          style={styles.buttonAdd}
          onPress={() => props.navigation.navigate("NoteScreen")}
        />
      </View> */}
      <ActionButton 
        buttonColor={COLOR.COLOR2} 
        buttonTextStyle={{fontSize: 40}}
        style={{bottom: 50, right: 5}}
      >
          <ActionButton.Item
            buttonColor={COLOR.COLOR2}
            title="Văn bản"
            size={50}
            onPress={() => props.navigation.navigate("NoteScreen")}>
            <AntDesign
              name="filetext1"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Bảng"
            size={50}
            onPress={share}
          >
            <AntDesign
              name="table"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Hình ảnh"
            size={50}
            onPress={() => props.navigation.navigate("ImageScreen")}
          >
            <AntDesign
              name="picture"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
        {/* để dưới dùng */}
        {isLoadingData()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: COLOR.COLOR_BACKGROUND
  },
  buttonAdd: {
    borderRadius: 50,
    color: COLOR.COLOR_HEADER_TEXT,
    backgroundColor: COLOR.COLOR_HEADER,
    elevation: 8,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})