import * as React from 'react';
import { View, Button, StyleSheet, SafeAreaView, Text, ScrollView, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as COLOR from './theme/color'
import { HomeScreen, NoteScreen, TodoScreen, SupportScreen, ImageScreen, CameraScreen } from './screens'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import * as type from './redux/actiontypes'
import {db} from './config'


function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.container} {...props}>
      <View style={{ height: 100, alignItems: 'center', justifyContent: 'space-around', flexDirection:'row' }}>
        <Image
            source={require('../assets/icon2.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain'
            }}
        />
        <Text style={{ fontSize: 26, color: COLOR.COLOR_SPECIAL_TEXT, paddingRight: 20 }}>
          NOTE TAKING
        </Text>
      </View>
      <ScrollView>
        <DrawerItemList {...props} />
      </ScrollView>
    </SafeAreaView>
    
  );
}

const Drawer = createDrawerNavigator();
export default function Navigator() {
  /* const dispatch = useDispatch();
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
    }, 2000);
    })
    // todos
    var todoItem = [];
    db.ref('/todos').once('value', querySnapShot => {
      var todoData = querySnapShot.val() ? querySnapShot.val() : {};
      for(var key in todoData) {
        todoItem.push({...todoData[key]});
      }
      setTimeout(() => {
        dispatch({ type: type.INIT_TODOS, payload: todoItem });
    }, 2000);
    })
    //dispatch({ type: type.INIT_TODOS });
  }, []) */

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: COLOR.COLOR_HIGHLIGHT_TEXT,
          inactiveTintColor: COLOR.COLOR_SPECIAL_TEXT,
          labelStyle: {
            fontWeight: '500',
            fontSize: 16
          }
        }}
      >
        <Drawer.Screen 
          name="NoteStack" 
          component={NoteStack} 
          options={{
            title: "Ghi chú",
            drawerIcon: ({ focused, color, size }) => <FontAwesome name={focused ? 'sticky-note' : 'sticky-note-o'} size={size} color={color} />
          }}
        />
        <Drawer.Screen 
          name="TodoStack" 
          component={TodoStack}
          options={{
            title: "Danh sách",
            drawerIcon: ({ focused, color, size }) => <AntDesign name={focused ? 'checksquare' : 'checksquareo'} size={size} color={color} />
          }} 
        />
        <Drawer.Screen 
          name="SupportStack" 
          component={SupportStack}
          options={{
            title: "Phản hồi",
            drawerIcon: ({ focused, color, size }) => <AntDesign name={focused ? 'questioncircle' : 'questioncircleo'} size={size} color={color} />
          }} 
          
        />
      </Drawer.Navigator> 
    </NavigationContainer>
  );
}


const Stack = createStackNavigator();
function NoteStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: COLOR.COLOR_HEADER,
          },
          headerTintColor: COLOR.COLOR_HEADER_TEXT,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '400',
          },
          headerTitleAlign:'center'
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={ ({ navigation }) => ({ 
            title: 'Ghi chú', 
            headerLeft: () => (
              <View>
                <MaterialIcons
                  name="menu"
                  size={36}
                  style={styles.button}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            )
          })}
          
        />
        <Stack.Screen 
          name="NoteScreen" 
          component={NoteScreen}
          options={ ({ navigation }) => ({ 
            title: 'Ghi chú mới', 
            headerRight: () => (
              <View>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={styles.button}
                />
              </View>
            )
          })}
        />
        <Stack.Screen 
          name="ImageScreen" 
          component={ImageScreen}
          options={{title: 'Ghi chú hình ảnh'}}
        />
        <Stack.Screen 
          name="CameraScreen" 
          component={CameraScreen}
          options={ ({ navigation }) => ({ 
            title: 'Camera', 
            headerRight: () => (
              <View>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={styles.button}
                />
              </View>
            )
          })}
        />
      </Stack.Navigator>
  );
}

function TodoStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: COLOR.COLOR_HEADER,
          },
          headerTintColor: COLOR.COLOR_HEADER_TEXT,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '400',
          },
          headerTitleAlign:'center'
        }}
      >
        <Stack.Screen 
          name="TodoScreen" 
          component={TodoScreen} 
          options={ ({ navigation }) => ({ 
            title: 'Danh sách', 
            headerLeft: () => (
              <View>
                <MaterialIcons
                  name="menu"
                  size={36}
                  style={styles.button}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            )
          })} 
        />
      </Stack.Navigator>
  );
}

function SupportStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: COLOR.COLOR_HEADER,
          },
          headerTintColor: COLOR.COLOR_HEADER_TEXT,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: '400',
          },
          headerTitleAlign:'center'
        }}
      >
        <Stack.Screen 
          name="SupportScreen" 
          component={SupportScreen} 
          options={ ({ navigation }) => ({ 
            title: 'Trợ giúp và phản hồi', 
            headerLeft: () => (
              <View>
                <MaterialIcons
                  name="menu"
                  size={36}
                  style={styles.button}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            )
          })} 
        />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    color: COLOR.COLOR_HEADER_TEXT,
    paddingHorizontal: 15,
  }
})


