import * as type from '../actiontypes'

const noteReducer = (state = [], action) => {
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

export default noteReducer;