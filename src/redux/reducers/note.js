import * as type from '../actiontypes'
import { db, app } from '../../config'

const noteReducer = (state = [], action) => {
  switch (action.type) {
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
      myRef.set({ ...newTextNote });
      // local
      return [newTextNote, ...state];

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
      myRef.set({ ...newTextNote });
      // local
      newState.splice(index, 1);
      return [newTextNote, ...newState];


    case type.NEW_IMAGE_NOTE:
      // firebase
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      let newImageNote = {
        key: key,
        date: date,
        typeNote: 'image',
        title: action.payload.title,
        content: action.payload.content,
        image: action.payload.image
      }
      myRef.set({ ...newImageNote });
      // local
      return [newImageNote, ...state];
    
    case type.NOT_SAVE_IMAGE_NOTE:
      let images = action.payload.images;
      images.map((i) => {
        app.storage().ref().child(i.name).delete();
      })
      return state;

    case type.DELETE_IMAGE_NOTE:
      indexDelete = state.findIndex((note) => note.key === action.payload);
      newStateDelete = [...state];
      // firebase
      db.ref('/notes').child(action.payload).remove();
      // remove ảnh
      newStateDelete[indexDelete].image.map((i) => {
        app.storage().ref().child(i.name).delete();
      })
      // local
      newStateDelete.splice(indexDelete, 1);
      return newStateDelete;

    case type.UPDATE_IMAGE_NOTE:
      index = state.findIndex((note) => note.key === action.payload.id);
      newState = [...state];
      // firebase
      db.ref('/notes').child(action.payload.id).remove();
      // remove
      let oldImages = action.payload.oldImages;
      let newImages = action.payload.image;
        // kiểm tra object thì sẽ không bao giờ trùng nhau, nên nó luôn false???
        // let tmp = newImages.filter(i => !oldImages.includes(i)); 
        // giải pháp
      let oldImagesName = oldImages.map(i => i.name);
      let newImagesName = newImages.map(i => i.name);
      let tmp = oldImagesName.filter( name => !newImagesName.includes(name));
      tmp.map((name) => {
        app.storage().ref().child(name).delete();
      })
      // add new note
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      newImageNote = {
        key: key,
        date: date,
        typeNote: 'image',
        title: action.payload.title,
        content: action.payload.content,
        image: action.payload.image
      }
      myRef.set({ ...newImageNote });
      // local
      newState.splice(index, 1);
      return [newImageNote, ...newState];

      case type.NOT_UPDATE_IMAGE_NOTE:
        oldImages = action.payload.oldImages;
        newImages = action.payload.newImages;
        // kiểm tra object thì sẽ không bao giờ trùng nhau, nên nó luôn false???
        /* let tmp = newImages.filter(i => !oldImages.includes(i)); */
        // giải pháp
        oldImagesName = oldImages.map(i => i.name);
        newImagesName = newImages.map(i => i.name);
        tmp = newImagesName.filter( name => !oldImagesName.includes(name));
        tmp.map((name) => {
          app.storage().ref().child(name).delete();
        })
        return state;



    case type.NEW_TABLE_NOTE:
      // firebase
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      // console.log(action.payload.table);
      let newTableNote = {
        key: key,
        date: date,
        typeNote: 'table',
        title: action.payload.title,
        content: action.payload.content,
        row: action.payload.row,
        col: action.payload.col,
        table: action.payload.table,
      }
      myRef.set({ ...newTableNote });
      // local
      return [newTableNote, ...state];

    case type.DELETE_TABLE_NOTE:
      indexDelete = state.findIndex((note) => note.key === action.payload);
      newStateDelete = [...state];
      // firebase
      db.ref('/notes').child(action.payload).remove();
      // local
      newStateDelete.splice(indexDelete, 1);
      return newStateDelete;

    case type.UPDATE_TABLE_NOTE:
      //let index = state.findIndex((note) => note.id === action.payload);
      index = state.findIndex((note) => note.key === action.payload.id);
      newState = [...state];
      // firebase
      db.ref('/notes').child(action.payload.id).remove();
      myRef = db.ref("/notes").push();
      key = myRef.key;
      date = Date.now();
      newTextNote = {
        key: key,
        date: date,
        typeNote: 'table',
        row: action.payload.row,
        col: action.payload.col,
        title: action.payload.title,
        content: action.payload.content,
        table: action.payload.table,
      }
      myRef.set({ ...newTextNote });
      // local
      newState.splice(index, 1);
      return [newTextNote, ...newState];
      
    default:
      return state;
  }
}

export default noteReducer;
