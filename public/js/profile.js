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


// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#threads-name').value.trim();
//   const description = document.querySelector('#threads-desc').value.trim();

//   if (name && description) {
//     const response = await fetch(`/api/threads`, {
//       method: 'POST',
//       body: JSON.stringify({ name, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create threads');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/threads/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete threads');
//     }
//   }
// };

// document
//   .querySelector('.new-threads-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.threads-list')
//   .addEventListener('click', delButtonHandler);
