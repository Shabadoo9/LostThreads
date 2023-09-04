// Select elements
const addCommentButton = document.getElementById("add-comment-button");
const commentBox = document.getElementById("comment-box");
const commentTextarea = document.getElementById("comment-textarea");
const submitCommentButton = document.getElementById("submit-comment-button");

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
  }

  // Hide the comment box
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