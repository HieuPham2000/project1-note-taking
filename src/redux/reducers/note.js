import * as type from '../actiontypes'
import { db } from '../../config'

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case type.INIT_NOTES:
      return action.payload;

    case type.NEW_TEXT_NOTE:
      // firebase
      let myRef = db.ref("/notes").push();
      let key = myRef.key;
      let date = Date.now();
      let newTextNote = {
        key: key,
        date: date,
        typeNote: 'text',
        title: action.payload.title,
        content: action.payload.content,
      }
      myRef.set({...newTextNote});
      // local
      return [newTextNote,...state];
    
    case type.DELETE_TEXT_NOTE:
      let indexDelete = state.findIndex((note) => note.key === action.payload);
      let newStateDelete = [...state];
      // firebase
      db.ref('/notes').child(action.payload).remove();
      // local
      newStateDelete.splice(indexDelete, 1);
      return newStateDelete;
      
    case type.UPDATE_TEXT_NOTE:
      //let index = state.findIndex((note) => note.id === action.payload);
      let index = state.findIndex((note) => note.key === action.payload.id);
      let newState = [...state];
      // firebase
      db.ref('/notes').child(action.payload.id).remove();
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      newTextNote = {
        key: key,
        date: date,
        typeNote: 'text',
        title: action.payload.title,
        content: action.payload.content,
      }
      myRef.set({...newTextNote});
      // local
      newState.splice(index, 1);
      return [newTextNote, ...newState];
    
    default:
      return state;
  }
}

export default noteReducer;


/* const noteReducer = (state = [], action) => {
  switch(action.type) {
    case type.NEW_NOTE:
      let date = Date.now();
      return [{ id: date, date: date, title: action.payload.title, content: action.payload.content }, ...state];
    
    case type.DELETE_NOTE:
      let indexDelete = state.findIndex((note) => note.id === action.payload);
      let newStateDelete = [...state];
      newStateDelete.splice(indexDelete, 1);
      return newStateDelete;
      
    case type.UPDATE_NOTE:
      //let index = state.findIndex((note) => note.id === action.payload.id);
      //console.log(index);
      let index = action.payload.id;
      let newState = [...state];
      newState.splice(index, 1);

      date = Date.now();
      return [{ id: date, date: date, title: action.payload.title, content: action.payload.content }, ...newState];
    
    default:
      return state;
  }
}

export default noteReducer; */