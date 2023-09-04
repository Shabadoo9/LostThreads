const btnGhost = document.getElementById("btnGhost");
const GhostStyle = document.getElementById("ghostanimation");

//His name is Humphrey

btnGhost.addEventListener("click", () => {
        // console.log("button clicked!");
        if (GhostStyle.style.display === "none") {
                GhostStyle.style.display = "block";
                btnGhost.innerHTML = "Hide Ghost";
        } else {
                GhostStyle.style.display = "none";
                btnGhost.innerHTML = "Play Ghost";
        }
});

