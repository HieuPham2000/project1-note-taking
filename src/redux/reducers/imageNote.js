import * as type from '../actiontypes'
import { db } from '../../config'

const imageNoteReducer = (state = [], action) => {
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
    
    
    case type.NEW_IMAGE_NOTE:
      // firebase
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      newTextNote = {
        key: key,
        date: date,
        typeNote: 'image',
        title: action.payload.title,
        content: action.payload.content,
        image: action.payload.image
      }
      myRef.set({...newTextNote});
      // local
      return [newTextNote,...state];



    default:
      return state;
  }
}

export default imageNoteReducer;


