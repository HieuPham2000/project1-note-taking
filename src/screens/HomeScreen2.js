import * as React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';
import NoteItem from '../components/NoteItem';
import EmptyNote from '../components/EmptyNote'
import {} from '../theme/color'

export default function HomeScreen(props) {
  const [notes, setNotes ] = React.useState({});
  const [notesKeys, setNotesKeys] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      db.ref('/notes').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let noteItems = { ...data };
        setNotes(noteItems);
        setNotesKeys(Object.keys(noteItems).reverse());
      });
    });
    return unsubscribe;
  }, [props.navigation]);



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR3 }}>
      <View>
        {notesKeys.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {notesKeys.map(key => (
              <NoteItem
                key={key}
                id={key}
                date={notes[key].date}
                title={notes[key].title}
                content={notes[key].content}
                navigation={props.navigation} 
              />
            ))}
          </ScrollView>
        ) : (
            <EmptyNote />
          )}
      </View>
      <View style={{
        position: 'absolute',
        bottom: 60,
        right: 40,
      }}>
        <MaterialIcons
          name="add"
          size={60}
          style={styles.buttonAdd}
          onPress={() => props.navigation.navigate('Note')}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonAdd: {
    borderRadius: 50,
    color: COLOR_HEADER_TEXT,
    backgroundColor: COLOR_HEADER,
    elevation: 8,
  },
})