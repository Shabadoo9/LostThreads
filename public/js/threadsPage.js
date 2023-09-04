// Select elements
const commentTextarea = document.getElementById("comment-textarea");
const submitCommentButton = document.getElementById("submit-comment-button");
const commentsList = document.querySelector(".comments-list");

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

// Add a click event listener to the "Submit" button
submitCommentButton.addEventListener("click", async () => {
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