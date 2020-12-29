import { app } from '../config'


export async function uploadImageAsync(uri) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = app
    .storage()
    .ref()
    .child("/image.png");

  const snapshot = await ref.put(blob);
  // We're done with the blob, close and release it
  blob.close();
  const imgUrl = await snapshot.ref.getDownloadURL();
  /* console.log(imgUrl);
  const imgUrl2 = await ref.getDownloadURL();
  console.log(imgUrl2) */
  return imgUrl;
}
