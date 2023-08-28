function moveGhost() {
    const ghost = document.querySelector('.ghost');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);
    ghost.style.left = `${randomX}px`;
    ghost.style.top = `${randomY}px`;
}

function startGhostAnimation() {
    moveGhost();
    // const ghostSound = document.getElementById('ghostSound');
    // ghostSound.play(); // Play the sound effect when the animation starts
    setInterval(moveGhost, Math.random() * 5000 + 3000); // Random interval between 3 to 8 seconds
    // setInterval(() => {
    //     moveGhost();
    //     ghostSound.currentTime = 0; // Reset the sound effect to the beginning
    //     ghostSound.play(); // Play the sound effect again
    // }, Math.random() * 5000 + 3000); // Random interval between 3 to 8 seconds

}

startGhostAnimation();