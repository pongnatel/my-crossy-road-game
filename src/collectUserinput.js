import { queueMove } from "./components/Player.js";

let lastKeyPress = 0;
const KEY_THROTTLE_TIME = 150;
const pressedKeys = new Set();

document.getElementById("forward").addEventListener("click", () => {
  queueMove("forward");
});

document.getElementById("backward").addEventListener("click", () => {
  queueMove("backward");
});

document.getElementById("left").addEventListener("click", () => {
  queueMove("left");
});

document.getElementById("right").addEventListener("click", () => {
  queueMove("right");
});

window.addEventListener("keydown", (event) => {
  const now = Date.now();
  const key = event.key;

  if (pressedKeys.has(key)) {
    return;
  }

  if (now - lastKeyPress < KEY_THROTTLE_TIME) {
    return;
  }

  switch (key) {
    case "ArrowUp":
      event.preventDefault();
      pressedKeys.add(key);
      lastKeyPress = now;
      queueMove("forward");
      break;
    case "ArrowDown":
      event.preventDefault();
      pressedKeys.add(key);
      lastKeyPress = now;
      queueMove("backward");
      break;
    case "ArrowLeft":
      event.preventDefault();
      pressedKeys.add(key);
      lastKeyPress = now;
      queueMove("left");
      break;
    case "ArrowRight":
      event.preventDefault();
      pressedKeys.add(key);
      lastKeyPress = now;
      queueMove("right");
      break;
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key;
  pressedKeys.delete(key);
});
