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

// Profile button click events
//const editProfileBtn = document.getElementById("editProfileBtn");
//editProfileBtn.addEventListener('click', function(e) {
  //e.preventDefault();
  //document.location.replace('/edit-profile');;
//});

const browseBtn = document.getElementById("browseBtn");
browseBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.location.replace('/');;
});

const createBtn = document.getElementById("createBtn");
createBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.location.replace('/createThread');;
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/my-threads"); // Use the new route for user-specific threads
    if (response.ok) {
      const data = await response.json();
      const threads = data.threads;

      // Assuming you have a Handlebars template with an ID like "thread-template"
      const templateSource = document.getElementById("thread-template").innerHTML;
      const template = Handlebars.compile(templateSource);

      // Assuming you have a container where you want to display the threads, like an element with the ID "threads-container"
      const threadsContainer = document.getElementById("threads-container");

      // Render the threads using Handlebars
      const threadsHTML = template({ threads });
      threadsContainer.innerHTML = threadsHTML;
    } else {
      console.error("Failed to fetch user-specific threads:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("An error occurred while fetching user-specific threads:", error);
  }
  
});
