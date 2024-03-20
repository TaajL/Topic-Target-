let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');
const DeleteBtn = document.getElementById('delete-button');

startSearchBtn.onclick = function() {
  modalBox.style.display = 'none';
}




searchBtn.addEventListener('click', search);
function search(){ let wikiSearch = document.getElementById('userInput').value
fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${wikiSearch}&utf8=&format=json`)}


DeleteBtn.addEventListener('click', deleteAll);

function deleteAll(){
  localStorage.clear();
}
