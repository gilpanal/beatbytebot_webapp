
/* https://www.w3schools.com/howto/howto_js_filter_lists.asp */
const input = document.getElementById('searchInput')

input.onkeyup = (evt) => {
  evt = evt || window.event
  searchSong()
}
const searchSong = () => {    
    const filter = input.value.toUpperCase()
    const ul = document.getElementById('card-deck')
    const li = ul.getElementsByClassName('card')    
    for (let i = 0; i < li.length; i++) {
      const a = li[i].getElementsByTagName('a')[1]
      const txtValue = a.textContent || a.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ''
      } else {
        li[i].style.display = 'none'
      }
    }
}