import * as type from '../actiontypes'

const tableReducer = (state = [], action) => {
  switch(action.type) {
    case type.INIT_TABLE:
      return [...action.payload]

    case type.ADD_TABLE:
      let numberOfRow = action.payload.row;
      let numberOfCol = action.payload.col;
      /* let tmp = new Array(numberOfRow + 1);
      for(var i = 0; i < numberOfRow + 1; i++) {
        tmp[i] = new Array(numberOfCol + 1);
        tmp[i].fill("");
      } */
      let tmp = [...Array(numberOfRow + 1)].map((i) => Array(numberOfCol + 1).fill(""))
      
      for(var i = 0; i < numberOfRow + 1; i++) {
        tmp[i][0] = String(i);
      }
      for(var j = 0; j < numberOfCol + 1; j++) {
        tmp[0][j] = String(j);
      }
      tmp[0][0] = "";
      return tmp;

    case type.CHANGE_TEXT_CELL:
      tmp = [...state];
      let indexRow = action.payload.row;
      let indexCol = action.payload.col;
      tmp[indexRow][indexCol] = action.payload.text;
      return tmp;

    case type.DELETE_TABLE:
      return [];

    case type.DELETE_DATA_IN_TABLE:
      numberOfRow = state.length;
      numberOfCol = state[0].length;
      tmp = [...Array(numberOfRow + 1)].map((i) => Array(numberOfCol + 1).fill(""))
      for(var i = 0; i < numberOfRow + 1; i++) {
        tmp[i][0] = String(i);
      }
      for(var j = 0; j < numberOfCol + 1; j++) {
        tmp[0][j] = String(j);
      }
      tmp[0][0] = "";
      return tmp;

    case type.DELETE_ROW:
      tmp = [];
      // len khác số row, len = row + 1
      let len = state.length;
      //console.log(len);
      if(action.payload.index < len && action.payload.index >= 1) {
        for(let i = 0; i < len; i++) {
          tmp.push([...state[i]]);
        }
        tmp.splice(action.payload.index, 1);
        // đánh lại giá trị:
        for(let i = 1; i < len - 1; i++) {
          tmp[i][0] = i;
        }
        // có vẻ không cần thiết
        tmp[0][0] = "";
        //
        return tmp;
      }
      //console.log(state);
      return state;
      

    case type.DELETE_DATA_IN_ROW:
      tmp = [];
      len = state.length;
      if(action.payload.index < len && action.payload.index >= 1) {
        for(let i = 0; i < len; i++) {
          tmp.push([...state[i]]);
        }
        tmp[action.payload.index].fill("");
        // chú ý vị trí đầu
        tmp[action.payload.index][0] = action.payload.index;
        return tmp;
      }
      return state;
      

    case type.DELETE_COLUMN:
      tmp = [];
      len = state.length;
      let numCol = state[0].length - 1;
      if(action.payload.index <= numCol && action.payload.index >= 1) {
        for(let i = 0; i < len; i++) {
          let tmp_row = [...state[i]];
          tmp_row.splice(action.payload.index, 1);
          tmp.push([...tmp_row]);
        }
        // đánh lại giá trị:
        for(let j = 1; j < numCol - 1; j++) {
          tmp[0][j] = j;
        }
        // có vẻ không cần thiết
        tmp[0][0] = "";
        //
        return tmp;
      }
      return state;
      

    case type.DELETE_DATA_IN_COLUMN:
      tmp = [];
      len = state.length;
      numCol = state[0].length - 1;
      if(action.payload.index <= numCol && action.payload.index >= 1) {
        for(let i = 0; i < len; i++) {
          let tmp_row = [...state[i]];
          // chú ý vị trí đầu
          if(i!=0) {
            tmp_row[action.payload.index] = "";
          }
          tmp.push([...tmp_row]);
        }
        return tmp;
      }
      return state;
      

    case type.ADD_ROW:
      tmp = [];
      len = state.length;
      let index = action.payload.index;
      if(index < len) {
        if(index <= 0) {
          index = 1;
        } 
        for(let i = 0; i < len; i++) {
          /* if(i==action.payload.index) {
            let numCol = state[i].length;
            tmp.push(Array(numCol).fill(""));
          } */
          tmp.push([...state[i]]);
        }
        numCol = state[0].length;
        tmp.splice(index, 0, Array(numCol).fill(""));
        // đánh lại giá trị:
        for(let i = 1; i < len + 1; i++) {
          tmp[i][0] = i;
        }
        tmp[0][0] = "";
        
      } else {
        for(let i = 0; i < len; i++) {
          tmp.push([...state[i]]);
        }
        numCol = state[0].length;
        tmp.push(Array(numCol).fill(""));
        
        for(let i = 1; i < len + 1; i++) {
          tmp[i][0] = i;
        }
        tmp[0][0] = "";
      }
      return tmp;

    case type.ADD_COLUMN:
      tmp = [];
      len = state.length;
      numCol = state[0].length;
      index = action.payload.index;
      if(index < numCol) {
        if(index <= 0) {
          index = 1;
        }
        for(let i = 0; i < len; i++) {
          // insert bằng splice
          let tmp_row = [...state[i]];
          tmp_row.splice(index, 0, "");
          tmp.push([...tmp_row]);
        }
      } else {
        for(let i = 0; i < len; i++) {
          // insert bằng splice
          let tmp_row = [...state[i]];
          tmp_row.push("");
          tmp.push([...tmp_row]);
        }
      }
      // đánh lại giá trị:
      for(let j = 1; j < numCol + 1; j++) {
        tmp[0][j] = j;
      }
      tmp[0][0] = "";
      return tmp;

    default:
      return state;
  }
}

export default tableReducer;


