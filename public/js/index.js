// Get all the list items with class "choice"
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








document.addEventListener("DOMContentLoaded", function() {
  // Get all tab choices
  const choices = document.querySelectorAll('.choice');

  // Add event listener to each choice
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