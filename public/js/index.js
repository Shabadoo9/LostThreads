// Get all the list items with class "choice"
const listItems = document.querySelectorAll('.tabmenu li');

//Remove "selected" from all tabs and give clicked tab the class="selected"
function handleTabClick(event) {
  listItems.forEach(item => {
    item.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

listItems.forEach(item => {
  item.addEventListener('click', handleTabClick);
});