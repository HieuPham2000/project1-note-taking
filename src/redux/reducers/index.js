import { combineReducers } from 'redux';
import todoReducer from './todo';
import noteReducer from './note'
import imageNoteReducer from './imageNote'

const rootReducer = combineReducers({
  todo: todoReducer,
  note: noteReducer,
  imageNote: imageNoteReducer,
});

export default rootReducer;
