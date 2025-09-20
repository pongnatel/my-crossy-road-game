import * as THREE from "three";
import { player, initializePlayer } from "./components/Player";
import { Camera } from "./components/Camera";
import { Renderer } from "./components/Renderer";
import { initializeMap, map } from "./components/Map";
import { DirectionalLight } from "./components/DirectionalLight.js";
import { animateVehicles } from "./animateVehicles.js";
import "./collectUserinput.js";
import { animatePlayer } from "./animatePlayer.js";
import { hitTest } from "./hitTest.js";

const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const directionalLight = DirectionalLight();
// scene.add(directionalLight);
directionalLight.target = player;
player.add(directionalLight);

const camera = Camera();
// scene.add(camera);
player.add(camera);

initializeGame();

document.getElementById("retry").addEventListener("click", () => {
  initializeGame();
});

function initializeGame() {
  initializePlayer();
  initializeMap();

  if (scoreDOM) {
    scoreDOM.innerText = "0";
  }

  if (resultDOM) {
    resultDOM.style.visibility = "hidden";
  }
}

const renderer = Renderer();
function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
