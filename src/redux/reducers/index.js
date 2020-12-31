import { combineReducers } from 'redux';
import todoReducer from './todo';
import noteReducer from './note'
import imageNoteReducer from './imageNote'
import tableReducer from './table'

const rootReducer = combineReducers({
  todo: todoReducer,
  note: noteReducer,
  imageNote: imageNoteReducer,
  table: tableReducer,
});

export default rootReducer;
