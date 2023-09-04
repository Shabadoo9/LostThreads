
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
submitCommentButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the form from submitting (you can send the data to your server here)

  // Get the comment text from the textarea
  const commentText = commentTextarea.value;

  // Do something with the comment text (e.g., send it to the server)
  console.log("Comment:", commentText);

  // Clear the textarea
  commentTextarea.value = "";

  // Hide the comment box
  commentBox.style.display = "none";
});