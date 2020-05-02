/* eslint-disable no-undef */

firebase.initializeApp(CONFIG_DEV);
const dbRef = firebase.database().ref();


let listElelemts = '';
let errorIs = null;
dbRef.child('songs').once('value').then((snapshot) => {
  const data = snapshot.val();

  if (data) {
    const keys = Object.keys(data);
    keys.forEach((element) => {
      const template = `
        <div class="card">
        <img class="card-img-top" src="song/agp.png" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title"></h5>
        <a href="/song/song.html?songId=${element}" class="card-link">${data[element].name}</a></div></div>
        `;
      listElelemts += template;
    });
  }
}).catch((error) => {
  errorIs = error;
})
.finally(() => {
  const loaderElement = document.getElementById('loader');
  loaderElement.classList.remove('loader');
  document.getElementById('card-deck').insertAdjacentHTML('afterbegin', listElelemts);
  if (errorIs) {
    alert(errorIs);
  } else {
    document.getElementById('searchInput').removeAttribute('disabled');
  }
});
