function ShowHideDiv(btnGhost) {
    var GhostStyle = document.getElementById("ghostanimation");
    if (btnGhost.value == "Hide Ghost") {
            GhostStyle.style.display = "none";
            btnGhost.value = "Play Ghost";
    } else {
            GhostStyle.style.display = "block";
            btnGhost.value = "Hide Ghost";
        }
}