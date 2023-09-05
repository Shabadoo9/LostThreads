const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#logemail').value.trim();
  const password = document.querySelector('#logpass').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      console.log("Logged in");
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
      alert("Please Sign-Up or try a different email/password!");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#logname').value.trim();
  const email = document.querySelector('#newlogemail').value.trim();
  const password = document.querySelector('#logpass').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.card-front form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.card-back form')
  .addEventListener('submit', signupFormHandler);
