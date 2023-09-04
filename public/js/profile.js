// ============== function to render profile greeting ===============//
function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = '';

  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Good Morning,';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon,';
  } else {
    greeting = 'Good Evening,';
  }

  // Update the content of the 'greeting' div
  document.getElementById('greeting').textContent = greeting;
}

getGreeting();


//Profile button click events
const editProfileBtn = document.getElementById("editProfileBtn");
editProfileBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.location.replace('/edit-profile');;
});

const browseBtn = document.getElementById("browseBtn");
browseBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.location.replace('/');;
});

const createBtn = document.getElementById("createBtn");
createBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.location.replace('/create-thread');;
});
