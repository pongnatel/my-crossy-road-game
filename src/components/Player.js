import * as THREE from "three";
import { endUpValidPosition } from "../utilities/endUpValidPosition";
import { metadata as rows, addRows } from "./Map";
export const player = Player();

export function Player() {
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({ color: "white", flatShading: true })
  );

  body.position.z = 10;
  body.receiveShadow = true;
  body.castShadow = true;

  const playerContainer = new THREE.Group();
  playerContainer.add(body);
  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const moveQueue = [];

export function initializePlayer() {
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 10;

  position.currentRow = 0;
  position.currentTile = 0;
  moveQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endUpValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...moveQueue, direction]
  );
  if (!isValidMove) return;
  moveQueue.push(direction);
}

export function stepCompleted() {
  const direction = moveQueue.shift();

  switch (direction) {
    case "forward":
      position.currentRow++;
      break;
    case "backward":
      position.currentRow--;
      break;
    case "left":
      position.currentTile--;
      break;
    case "right":
      position.currentTile++;
      break;
  }

  if (position.currentRow > rows.length - 10) {
    addRows();
  }

  const scoreDOM = document.getElementById("score");
  if (scoreDOM) {
    scoreDOM.innerText = position.currentRow.toString();
  }
}
