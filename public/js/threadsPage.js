document.addEventListener("DOMContentLoaded", async () => {
  const addCommentButton = document.getElementById("add-comment-button");
  const commentBox = document.getElementById("comment-box");
  const commentTextarea = document.getElementById("comment-textarea");
  const commentsList = document.querySelector(".comments-list");
  const threadId = window.location.pathname.split('/').pop();

  // Function to render comments
  async function renderComments(comments) {
    // Check if comments is an array and not undefined
    if (Array.isArray(comments) && comments.length > 0) {
      // Create an HTML string for the comments
      const commentsHTML = [];

      for (const comment of comments) {
        // Fetch the user information based on user_id
        const user = await fetchUserById(comment.user_id);

        commentsHTML.push(`
          <div class="comment">
            <p><strong>${user.name}</strong></p>
            <p>${formatDate(comment.date_created)}</p>
            <p>${comment.description}</p>
          </div>
        `);
      }

      // Set the inner HTML of the comments list
      commentsList.innerHTML = commentsHTML.join('');
    } else {
      // Handle the case where comments are empty or undefined
      commentsList.innerHTML = '<p>No comments available.</p>';
    }
  }

  // Function to format dates (replace with your date formatting function)
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Function to fetch user information by ID
  async function fetchUserById(userId) {
    try {
      const response = await fetch(`/api/users/${userId}`); // Replace with your API endpoint for fetching user details
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        console.error("Failed to fetch user:", response.status, response.statusText);
        return { name: "Unknown" }; // Provide a default name if the user cannot be fetched
      }
    } catch (error) {
      console.error("An error occurred while fetching user:", error);
      return { name: "Unknown" }; // Provide a default name if an error occurs
    }
  }

  // Fetch and render comments on page load
  async function fetchAndRenderComments() {
    try {
      const response = await fetch(`/api/comments?thread_id=${threadId}`);
      if (response.ok) {
        const data = await response.json();
        const comments = data.comments;
        await renderComments(comments);
      } else {
        console.error("Failed to fetch comments:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching comments:", error);
    }
  }

  // Initial fetch and render
  await fetchAndRenderComments();

  // Add a click event listener to the "Add Comment" button
  addCommentButton.addEventListener("click", () => {
    // Toggle the visibility of the comment box
    const commentBox = document.getElementById("comment-box");
    commentBox.style.display = commentBox.style.display === "block" ? "none" : "block";
  });

  // Add a click event listener to the "Submit" button
  const submitCommentButton = document.getElementById("submit-comment-button");
  submitCommentButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the form from submitting (you can send the data to your server here)

    try {
      // Get the comment text from the textarea
      const commentText = commentTextarea.value;

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: commentText, thread_id: threadId }),
      });
      console.log("Comment Text:", commentText);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const newComments = data.comments;
          await renderComments(newComments);
          commentTextarea.value = "";
        } else {
          console.error("No data received from the server.");
        }
      } else {
        console.error("Failed to submit comment:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while submitting a comment:", error);
    }

    // Hide the comment box
    const commentBox = document.getElementById("comment-box");
    commentBox.style.display = "none";
  });
});const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// New route to fetch user details by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ['name'], // Include only the 'name' attribute
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;