const compareTable = (tableA, tableB) => {
  // chưa có phần test falsy value???
  // if(!tableA) return false;
  if(tableA.length != tableB.length) {
    return false;
  }
  if(tableA[0]==undefined && tableB[0]!=undefined) {
    return false;
  }
  if(tableA[0]!=undefined && tableB[0]==undefined) {
    return false;
  }
  if(tableA[0]!=undefined && tableB[0]!=undefined) {
    let row = tableA.length, colA = tableA[0].length, colB = tableB[0].length;
    if(colA != colB) {
      return false;
    }
    for(let i = 0; i < row; i++) {
      for(let j = 0; j < colA; j++) {
        if(tableA[i][j] != tableB[i][j]) {
          return false;
        }
      }
    }

  }
  return true;
}


const compareImages = (imagesA, imagesB) => {
  if(imagesA.length != imagesB.length) {
    return false;
  }
  let len = imagesA.length;
  for(let i = 0; i < len; i++) {
    if(imagesA[i].name != imagesB[i].name) {
      return false;
    }
    if(imagesA[i].uri != imagesB[i].uri) {
      return false;
    }
    if(imagesA[i].caption != imagesB[i].caption) {
      return false;
    }
  }
  return true;
}

export {compareImages, compareTable}