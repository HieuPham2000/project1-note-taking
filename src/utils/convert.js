const convertString = function (str) {
  if (str.length > 500) {
    // đảm bảo không ngắt giữa từ
    //var pos = str.indexOf(' ', 400);
    var pos = str.indexOf('.', 400);
    if(pos == -1) {
      pos = str.indexOf(' ', 400);
    }
    if(pos == -1) {
      pos = 400;
    }
    return (str.slice(0, pos) + '...');
  }
  return str;
}

const convertDay = function (num) {
  if (num === 0) {
    return 'CN';
  } else {
    return `T${num + 1}`;
  }
}

const convertDate = function (newDateStr) {
  let newDate = new Date(newDateStr);
  let minute = (newDate.getMinutes() < 10) ? "0" + newDate.getMinutes() : newDate.getMinutes();
  let hour = newDate.getHours()
  let day = convertDay(newDate.getDay())
  let date = newDate.getDate()
  // vì month tính từ 0 nên phải cộng thêm 1
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()

  let today = new Date();
  let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  if( newDate.toDateString() === today.toDateString() ) {
    return `Hôm nay, ${hour}:${minute}`
  } else if ( newDate.toDateString() === yesterday.toDateString() ) {
    return `Hôm qua, ${hour}:${minute}`
  }
  return `${day}, ${date}/${month}/${year}, ${hour}:${minute}`;
}

export {convertDate, convertString}