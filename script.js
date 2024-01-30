document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const bubbleRadius = 25;

  let score = 0;
  let time = 30;
  let targetBubble = generateRandomBubble();

  canvas.addEventListener("click", clickHandler);

  function clickHandler(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isTargetBubble(x, y)) {
      score++;
      playClickSound();
    }

    targetBubble = generateRandomBubble();
    updateScore();
  }

  function isTargetBubble(x, y) {
    const distance = Math.sqrt(
      (x - targetBubble.x) ** 2 + (y - targetBubble.y) ** 2
    );
    return distance < bubbleRadius;
  }

  function playClickSound() {
    const audio = new Audio("mouse-click-153941.mp3");
    audio.play().catch((error) => console.error("Error playing sound:", error));
  }

  function generateRandomBubble() {
    const newX =
      Math.random() * (canvas.width - 2 * bubbleRadius) + bubbleRadius;
    const newY =
      Math.random() * (canvas.height - 2 * bubbleRadius) + bubbleRadius;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(newX, newY, bubbleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    return { x: newX, y: newY };
  }

  function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
  }

  function updateTimer() {
    document.getElementById("timer").innerText = `Time: ${time} seconds`;
    time--;

    if (time < 0) {
      endGame();
    } else {
      setTimeout(updateTimer, 1000);
    }
  }

  function endGame() {
    alert(`Game Over! Your final score is ${score}.`);
    canvas.removeEventListener("click", clickHandler);
  }

  updateTimer();
});
