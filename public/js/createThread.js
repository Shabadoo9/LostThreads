/* const create = async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/threads');
  } else {
    alert(response.statusText);
  }
};
*/
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#threads-name').value.trim();
    const description = document.querySelector('#threads-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/threads`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create threads');
      }
    }
};
  
const delButtonHandler = async (event) => {
if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/threads/${id}`, {
    method: 'DELETE',
    });

    if (response.ok) {
    document.location.replace('/profile');
    } else {
    alert('Failed to delete threads');
    }
}
};
  
document
    .querySelector('.new-threads-form')
    .addEventListener('submit', newFormHandler);

document
  .querySelector('.threads-list')
  .addEventListener('click', delButtonHandler);