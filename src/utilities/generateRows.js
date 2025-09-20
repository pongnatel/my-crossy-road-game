import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";

export function generateRows(amount) {
  const rows = [];
  for (let rowIndex = 0; rowIndex < amount; rowIndex++) {
    const row = generateRow();
    rows.push(row);
  }
  return rows;
}

function generateRow() {
  const type = randomElement(["car", "truck", "forest"]);
  if (type === "car") {
    return generateCarRow();
  } else if (type === "truck") {
    return generateTruckRow();
  } else if (type === "forest") {
    return generateForestRow();
  }
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateForestRow() {
  const occupiedTiles = new Set();
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);
    const height = randomElement([30, 40, 50]);
    return {
      tileIndex,
      height,
    };
  });
  return {
    type: "forest",
    trees,
  };
}

// Added functions to generate car and truck rows

function generateCarRow() {
  const direction = randomElement([true, false]);
  const speed = THREE.MathUtils.randInt(60, 120);
  const numCars = THREE.MathUtils.randInt(2, 4);
  const occupiedTiles = new Set();
  const vehicles = Array.from({ length: numCars }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);
    occupiedTiles.add(tileIndex + 1);
    occupiedTiles.add(tileIndex - 1);
    const color = randomElement([
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "pink",
      "brown",
      "gray",
      "black",
      "white",
    ]);
    return {
      initialTileIndex: tileIndex,
      color,
    };
  });
  return {
    type: "car",
    direction,
    speed,
    vehicles,
  };
}

function generateTruckRow() {
  // Generate a row with trucks
  // Trucks have a direction (true: right, false: left), a speed, and vehicles array
  const direction = randomElement([true, false]);
  const speed = THREE.MathUtils.randInt(40, 80);
  const numTrucks = THREE.MathUtils.randInt(1, 2);
  const occupiedTiles = new Set();
  const vehicles = Array.from({ length: numTrucks }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);
    occupiedTiles.add(tileIndex + 1);
    occupiedTiles.add(tileIndex - 1);
    occupiedTiles.add(tileIndex + 2);
    occupiedTiles.add(tileIndex - 2);

    const color = randomElement([
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "pink",
      "brown",
      "gray",
      "black",
      "white",
    ]);
    return {
      initialTileIndex: tileIndex,
      color,
    };
  });
  return {
    type: "truck",
    direction,
    speed,
    vehicles,
  };
}
