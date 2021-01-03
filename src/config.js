import Firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyDqQCOY8z5s9eNf4bXt7trVtCm6dguGasU",
  authDomain: "project-1-79684.firebaseapp.com",
  databaseURL: "https://project-1-79684.firebaseio.com",
  projectId: "project-1-79684",
  storageBucket: "project-1-79684.appspot.com",
  messagingSenderId: "324851759341",
  appId: "1:324851759341:web:0c9646db8fc46ab562b4e4"
};

/* if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} */
export const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();

/* // firebase.js
// contains the Firebase context and provider

import React, { createContext} from 'react'
import firebaseConfig from './config';
import app from 'firebase/app'
import 'firebase/database';
import { useDispatch } from 'react-redux';
import { setTodos } from './redux/reducers/todo'

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {
    let firebase = {
        app: null,
        database: null
    }

    const dispatch = useDispatch();

    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    if (!app.apps.length) {
        app.initializeApp(firebaseConfig);
        firebase = {
            app: app,
            database: app.database(),

            api: {
                getTodos
            }
        }
    }

    // function to query Todos from the database and
    // fire a Redux action to update the items in real-time
    function getTodos(){
        firebase.database.ref('todos').on('value', (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for(var key in vals){
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            // setTodos is a Redux action that would update the todo store
            // to the _records payload
            dispatch(setTodos(_records));
        })
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
} */