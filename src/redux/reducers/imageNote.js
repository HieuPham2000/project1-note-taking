import * as type from '../actiontypes'
import { db, app } from '../../config'
import { uploadImageAsync } from '../../utils/uploadImage'

const imageNoteReducer = (state = [], action) => {
  switch(action.type) {
    case type.INIT_IMAGES:
      return [...action.payload]

    case type.ADD_IMAGE:
      let newImage = {
        name: action.payload.name,
        uri: action.payload.uri,
        caption: ""
      }
      return [...state, newImage];
    
    case type.DELETE_IMAGE:
      try {
        if(action.payload.id==-1) {
          app.storage().ref().child(action.payload.name).delete();
        }
      } catch (error) {
        console.log(error)
      }
      let newState = [...state]
      let index = newState.findIndex((i) => i.name == action.payload.name);
      newState.splice(index, 1);
      return [...newState];

    case type.UPDATE_IMAGE:
      if(action.payload.id==-1) {
        app.storage().ref().child(action.payload.old).delete();
      }
      newState = [...state]
      index = newState.findIndex((i) => i.name == action.payload.old);
      newState[index].name = action.payload.name;
      newState[index].uri = action.payload.uri;
      newState[index].caption = "";
      return [...newState];

    case type.UPDATE_CAPTION:
      newState = [...state]
      index = newState.findIndex((i) => i.name == action.payload.name);
      newState[index].caption = action.payload.text;
      return [...newState];

    default:
      return state;
  }
}

export default imageNoteReducer;


