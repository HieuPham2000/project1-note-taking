import { TODOS } from '../../utils/dataTodos';
import * as type from '../actiontypes'
import { db } from '../../config'

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case type.INIT_TODOS:
      /* var todoItem = [];
      db.ref('/todos').once('value', querySnapShot => {
        var data = querySnapShot.val() ? querySnapShot.val() : {};
        for(var key in data) {
          todoItem.push({...data[key]});
        }
      })
      return todoItem; */
      return action.payload;
      

    case type.NEW_TODO:
      var myRef = db.ref("/todos").push();
      var key = myRef.key;
      var newTodo = {
        id: key,
        done: false,
        body: action.payload.body,
      }
      myRef.set({...newTodo});
      /* console.log("oldState redux:");
      console.log([...state]); */
      return [...state, newTodo];


    /* case type.DELETE_TODO:
      let indexDelete = action.payload;
      let newStateDelete = [...state];
      newStateDelete = newStateDelete.splice(indexDelete, 1);
      return newStateDelete; */

    case type.DELETE_ALL_TODOS:
      db.ref('/todos').remove();
      return [];

    case type.DELETE_CHECKED_TODOS:
      state.forEach((i) => {
        if(i.done==true) {
          db.ref('/todos').child(i.id).remove();
        }
      })
      let tmp = state.filter(({...i}) => {
        return i.done === false;
      });
      return tmp;
    
    case type.CHECK_TODO:
      let index = action.payload;
      let newState = [...state];
      // firebase
      db.ref('/todos').update({
        [newState[index].id] : {
        id: newState[index].id,
        done: !newState[index].done,
        body: newState[index].body
      }})
      // cập nhật phải để dưới, nếu không newState[index].done bị set nhầm
      newState[index].done = !newState[index].done;
      return newState;

    case type.CHECK_ALL_TODOS:
      // firebase
      state.map((i) => {
        db.ref('/todos').update({
          [i.id] : {
          id: i.id,
          done: true,
          body: i.body
        }})
      })
      // redux
      tmp = state.map((i) => {
        let obj = Object.assign({}, i);
        if (obj.done==false) {
          obj.done = true;
        }
        return obj;
      });
      return tmp
      /* tmp = state.map((i) => ({done: true, body: i.body}));
      return tmp; */

    case type.UNCHECK_ALL_TODOS:
      // firebase
      state.map((i) => {
        db.ref('/todos').update({
          [i.id] : {
          id: i.id,
          done: false,
          body: i.body
        }})
      })
      // redux
      tmp = state.map((i) => {
        let obj = Object.assign({}, i);
        if (obj.done==true) {
          obj.done = false;
        }
        return obj;
      });
      return tmp

    default:
      return state;
  }
};

export default todoReducer;
