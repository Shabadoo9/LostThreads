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


const browse = async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/home');
  } else {
    alert(response.statusText);
  }
};

const create = async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/createthread');
  } else {
    alert(response.statusText);
  }
};



getGreeting();
document.getElementById('browseBtn').addEventListener('click', browse);
document.getElementById('createBtn').addEventListener('click', create);
