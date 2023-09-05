// Create a new Thread
// const multer = require('multer');

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#threads-name').value.trim();
  const category = document.querySelector('#threads-category').value.trim();
  const description = document.querySelector('#threads-desc').value.trim();
  // const image = document.querySelector('#threads-image').value;
  
  // const storage = multer.diskStorage({
  //   destination: './public/uploads/',
  //   filename: (req, file, cb) => {
  //     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  //   }
  // });
  
  const upload = multer({
    storage: storage
  })
  
  
  const data= {
    name: name,
    category: category,
    description: description,
    image: image.filename,
  }
  console.log(data);
  
  
  if (name && category && description) {
    const response = await fetch('/api/threads', {
      method: 'POST',
      body: JSON.stringify({ name, category, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to create thread');
    }
  }
};
  

// Delete Button
const delButtonHandler = async (event) => {
if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/threads/${id}`, {
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