window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const tabs = document.querySelector('.tabs');
  const scrollY = window.scrollY;

  if (scrollY > 0) {
      header.classList.add('sticky');
      tabs.classList.add('sticky');
  } else {
      header.classList.remove('sticky');
      tabs.classList.remove('sticky');
  }
});


// Tab functionality to highlight selected tab
const tab = document.querySelectorAll('.tabmenu li');

//Remove "selected" from all tabs and give clicked tab the class="selected"
function handleTabClick(event) {
  tab.forEach(item => {
    item.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

tab.forEach(item => {
  item.addEventListener('click', handleTabClick);
});



//Tab and filter functionality to filter by data-category upon selecting a tab
document.addEventListener("DOMContentLoaded", function() {

  const choices = document.querySelectorAll('.choice');

  choices.forEach(choice => {
    choice.addEventListener('click', function(e) {
      e.preventDefault();

      // Get the clicked category
      const selectedCategory = e.target.getAttribute('data-category');

      // Get all threads
      const threads = document.querySelectorAll('.threads');

      // Loop over each thread and hide or show based on the category
      threads.forEach(thread => {
        const threadCategory = thread.getAttribute('data-category');

        // Check for "All" tab or match with the selected category
        if (selectedCategory === "Houses Warehouses Historic Haunted Factories Hospitals Misc" || selectedCategory === threadCategory) {
          thread.style.display = 'flex';
        } else {
          thread.style.display = 'none';
        }
      });
    });
  });
});