// threadsPage.js

// Select elements
const addCommentButton = document.getElementById("add-comment-button");
const commentBox = document.getElementById("comment-box");
const commentTextarea = document.getElementById("comment-textarea");
const submitCommentButton = document.getElementById("submit-comment-button");
const commentsList = document.querySelector(".comments-list");

// Add a click event listener to the "Add Comment" button
addCommentButton.addEventListener("click", () => {
  // Toggle the visibility of the comment box
  if (commentBox.style.display === "block") {
    commentBox.style.display = "none";
  } else {
    commentBox.style.display = "block";
  }
});

// Add a click event listener to the "Submit" button for toggling comment box
submitCommentButton.addEventListener("click", (e) => {
  e.preventDefault();
  const commentText = commentTextarea.value;
  console.log("Comment:", commentText);
  commentTextarea.value = "";
  commentBox.style.display = "none";

  // Add the new comment to the comments list
  const commentItem = document.createElement("li");
  commentItem.textContent = commentText;
  commentsList.appendChild(commentItem);
});