const addCommentButton = document.getElementById("add-comment-button");
const commentBox = document.getElementById("comment-box");
const commentTextarea = document.getElementById("comment-textarea");
const submitCommentButton = document.getElementById("submit-comment-button");
const commentsList = document.querySelector(".comments-list");
const threadId = window.location.pathname.split('/').pop();

document.addEventListener("DOMContentLoaded", () => {
  // Function to render comments
  function renderComments(comments) {
    const commentsList = document.querySelector(".comments-list");

    // Create an HTML string for the comments
    const commentsHTML = comments.map((comment) => `
      <div class="comment">
        <p><strong>${comment.User.name}</strong></p>
        <p>${formatDate(comment.date_created)}</p>
        <p>${comment.description}</p>
      </div>
    `).join('');

    // Set the inner HTML of the comments list
    commentsList.innerHTML = commentsHTML;
  }

  // Add a click event listener to the "Add Comment" button
  const addCommentButton = document.getElementById("add-comment-button");
  addCommentButton.addEventListener("click", () => {
    // Toggle the visibility of the comment box
    const commentBox = document.getElementById("comment-box");
    commentBox.style.display = commentBox.style.display === "block" ? "none" : "block";
  });

  // Add a click event listener to the "Submit" button
  const submitCommentButton = document.getElementById("submit-comment-button");
  submitCommentButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the form from submitting (you can send the data to your server here)

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
      const newComments = data.comments;
      renderComments(newComments);
      commentTextarea.value = "";
    }

    // Hide the comment box
    const commentBox = document.getElementById("comment-box");
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
  });
});