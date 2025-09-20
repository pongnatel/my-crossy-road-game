import * as THREE from "three";
import { metadata as rows } from "./components/Map.js";
import { position, player } from "./components/Player.js";

const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");

export function hitTest() {
  const row = rows[position.currentRow - 1];
  if (!row) return;

  if (row.type === "car" || row.type === "truck") {
    const vehicles = row.vehicles;
    const playerBoundingBox = new THREE.Box3().setFromObject(player);

    vehicles.forEach(({ ref }) => {
      const vehicleBoundingBox = new THREE.Box3().setFromObject(ref);
      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        resultDOM.style.visibility = "visible";
        finalScoreDOM.innerText = position.currentRow.toString();
      }
    });
  }
}
