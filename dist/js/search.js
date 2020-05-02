// eslint-disable-next-line no-unused-vars
const searchSong = () => {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const ul = document.getElementById('card-deck');
  const li = ul.getElementsByClassName('card');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName('a')[0];
    const txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
};
