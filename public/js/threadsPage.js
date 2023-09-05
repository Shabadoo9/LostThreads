const addCommentButton = document.getElementById("add-comment-button");
const commentBox = document.getElementById("comment-box");
const commentTextarea = document.getElementById("comment-textarea");
const submitCommentButton = document.getElementById("submit-comment-button");
const commentsList = document.querySelector(".comments-list"); // Add this line

// Function to render comments
function renderComments(comments) {
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment");
    commentItem.innerHTML = `
      <p><strong>${comment.User.name}</strong></p>
      <p>${formatDate(comment.date_created)}</p>
      <p>${comment.description}</p>
    `;
    commentsList.appendChild(commentItem);
  });
}

// Add a click event listener to the "Add Comment" button
addCommentButton.addEventListener("click", () => {
  // Toggle the visibility of the comment box
  if (commentBox.style.display === "block") {
    commentBox.style.display = "none"; // Hide the comment box if it's shown
  } else {
    commentBox.style.display = "block"; // Show the comment box if it's hidden
  }
});

// Add a click event listener to the "Submit" button
submitCommentButton.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent the form from submitting (you can send the data to your server here)

  // Get the comment text from the textarea
  const commentText = commentTextarea.value;

  // Create a new comment on the server and fetch updated comments
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: commentText }),
    });
  
    if (response.ok) {
      const data = await response.json();
      const newComments = data.comments;
      renderComments(newComments);
      commentTextarea.value = "";
    } else {
      // Handle non-OK responses (e.g., 400 Bad Request, 500 Internal Server Error)
      // You can log the response status, display an error message, or take other actions.
      console.error("Request failed with status:", response.status);
      // Example: Display an error message to the user
      // showErrorToUser("Request failed. Please try again later.");
    }
  } catch (error) {
    // Handle network or other errors that occurred during the fetch.
    console.error("An error occurred during the fetch:", error);
    // Example: Display an error message to the user
    // showErrorToUser("An error occurred. Please check your network connection.");
  }
  commentBox.style.display = "none";
});

// Function to format dates (replace with your date formatting function)
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Fetch and render comments on page load
(async () => {
  const response = await fetch("/api/comments");
  if (response.ok) {
    const data = await response.json();
    const comments = data.comments;
    renderComments(comments);
  }
})();