// Create a new Thread
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#threads-name').value.trim();
    const category = document.querySelector('#threads-category').value.trim();
    const description = document.querySelector('#threads-desc').value.trim();
    const imageFiles = document.querySelector('#threads-image');


    if (name && category && description) {
      // const response = await fetch(`/api/threads`, {
      //   method: 'POST',
      //   body: JSON.stringify({ name, category, description }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      const formData = new FormData(); // Create a FormData object to handle file uploads
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);


      if (imageFiles.files.length > 0) { // Check if imageFiles exists and has files
        formData.append('threads-image', imageInput.files[0]); // Append each selected image file
      }

      console.log(...formData);

      // if (response.ok) {
      //   document.location.replace('/home');
      // } else {
      //   alert('Failed to create threads');
      // }
    
      try {
        const response = await fetch('/api/threads', {
          method: 'POST',
          body: formData, // Use the FormData object as the request body
        });
  
        if (response.ok) {
          document.location.replace('/home');
        } else {
          alert('Failed to create thread');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the thread');
      }
      
    }
};
  

// Delete Button
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