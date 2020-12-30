import * as React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import EmptyNote from '../components/EmptyNote'
import * as COLOR from '../theme/color'
import NoteItem from '../components/NoteItem'
import NoteImageItem from '../components/NoteImageItem'
import ActionButton from 'react-native-action-button';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { db } from '../config';
import * as type from '../redux/actiontypes'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
export default function HomeScreen(props) {
  // giải pháp tình thế => update: đã fix
  LogBox.ignoreAllLogs()

  const notes = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // test filter menu
  const [showNote, setShowNote] = useState("all");
  const menu = useRef();
  const buttonMenu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

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
      for (var key in noteData) {
        // khắc phục lỗi ghi chú ảnh nhưng không có ảnh
        let tmp = noteData[key];
        if (tmp.typeNote == "image" && !tmp.image) {
          tmp.image = [];
        }
        //noteItem.unshift({ ...noteData[key] });
        noteItem.unshift({ ...tmp });
      }
      setTimeout(() => {
        dispatch({ type: type.INIT_NOTES, payload: noteItem });
        setLoading(false);
      }, 500);
    })
  }, [])


  const filterNote = () => {
    if (showNote == "all") {
      return notes;
    } else if (showNote == "text") {
      return notes.filter((i) => i.typeNote == "text");
    } else if (showNote == "image") {
      return notes.filter((i) => i.typeNote == "image");
    } else {
      return notes.filter((i) => i.typeNote == "table");
    }
  }

  React.useEffect(() => {
    let headerTitle = "";
    switch(showNote) {
      case "all":
        headerTitle = "Ghi chú của bạn"; break;
      case "text":
        headerTitle = "Ghi chú văn bản"; break;
      case "image":
        headerTitle = "Ghi chú hình ảnh"; break;
      case "table":
        headerTitle = "Ghi chú bảng"; break;
      default:
        headerTitle = "Ghi chú của bạn"; 
    }
    props.navigation.setOptions({
      title: headerTitle,
      headerRight: () => (
        <View>
          <Ionicons
            ref={buttonMenu}
            name="md-options"
            size={24}
            style={styles.headerRight}
            onPress={showMenu}
          />
        </View>
      )
    })
  });
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <Menu ref={menu} style={{ width: 0.6 * W }}>
          <MenuItem
            onPress={() => { hideMenu(); setShowNote("all") }}
            disabled={showNote == "all"}>Hiển thị tất cả</MenuItem>
          <MenuItem
            onPress={() => { hideMenu(); setShowNote("text") }}
            disabled={showNote == "text"}>Hiển thị ghi chú văn bản</MenuItem>
          <MenuItem
            onPress={() => { hideMenu(); setShowNote("image") }}
            disabled={showNote == "image"}>Hiển thị ghi chú hình ảnh</MenuItem>
          <MenuItem
            onPress={() => { hideMenu(); setShowNote("table") }}
            disabled={showNote == "table"}>Hiển thị ghi chú bảng</MenuItem>
          {/* <MenuDivider /> */}
        </Menu>
      </View>

      <StatusBar barStyle="default" />
      <ScrollView
        contentContainerStyle={{}}
      >
        {filterNote().length > 0 ?
          <View style={{marginTop: 20, marginBottom: 50}}>
            {filterNote().map((i, k) => {
              if (i.typeNote == "text") {
                return (
                  <NoteItem
                    key={k}
                    id={i.key}
                    date={i.date}
                    title={i.title}
                    content={i.content}
                    navigation={props.navigation}
                  />
                )
              } else if (i.typeNote == "image") {
                return (
                  <NoteImageItem
                    key={k}
                    id={i.key}
                    date={i.date}
                    title={i.title}
                    content={i.content}
                    image={i.image}
                    navigation={props.navigation}
                  />
                )
              }
            }

            )
            }
          </View>
          :
          <View>
            <EmptyNote typeNote={showNote} />
          </View>}
      </ScrollView>

      <ActionButton
        buttonColor={COLOR.COLOR2}
        buttonTextStyle={{ fontSize: 40 }}
        style={{ bottom: 50, right: 5 }}
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
          onPress={() => props.navigation.navigate("TableScreen")}
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
  headerRight: {
    color: COLOR.COLOR_HEADER_TEXT,
    paddingHorizontal: 15,
  },
})