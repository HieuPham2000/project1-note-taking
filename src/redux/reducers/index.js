import { combineReducers } from 'redux';
import todoReducer from './todo';
import noteReducer from './note'

const rootReducer = combineReducers({
  todo: todoReducer,
  note: noteReducer,
});

export default rootReducer;
