document.addEventListener("DOMContentLoaded", function () {
        const btnGhost = document.getElementById("btnGhost");
        // const GhostStyle = document.getElementById("ghostanimation");

        btnGhost.addEventListener("click", () => {
                console.log("button clicked!");
                // if (GhostStyle.style.display === "none") {
                //         GhostStyle.style.display = "block";
                //         btnGhost.innerHTML = "Hide";
                // } else {
                //         GhostStyle.style.display = "none";
                //         btnGhost.innerHTML = "Play Ghost";
                // }
        });
});
