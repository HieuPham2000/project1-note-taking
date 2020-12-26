import * as React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EmptyNote from '../components/EmptyNote'
import * as COLOR from '../theme/color'
import NoteItem from '../components/NoteItem'
//Import ActionButton
import ActionButton from 'react-native-action-button';
//Import Icon for the ActionButton
import Icon from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function HomeScreen(props) {
  // giải pháp tình thế => update: đã fix
  LogBox.ignoreAllLogs()

  const notes = useSelector((state) => state.note);
  
  return (
    <View style={styles.container}>  
      <ScrollView
        contentContainerStyle={{}}
      >
        {notes.length > 0 ?
        <View>
          {notes.map((i, k) => (
              <NoteItem
                key={k}
                id={k}
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
            onPress={() => props.navigation.navigate("CameraScreen")}
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