import * as THREE from "three";
import { Grass } from "./Grass.js";
import { Tree } from "./Tree.js";
import { Road } from "./Road.js";
import { Car } from "./Car.js";
import { Truck } from "./Truck.js";
import { generateRows } from "../utilities/generateRows.js";
import { tileSize } from "../constants";
export const metadata = [
  //   {
  //     type: "forest",
  //     trees: [
  //       { tileIndex: -3, height: 50 },
  //       { tileIndex: 2, height: 30 },
  //       { tileIndex: 5, height: 40 },
  //     ],
  //   },
  //   {
  //     type: "car",
  //     direction: false,
  //     speed: 100,
  //     vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  //   },
  //   {
  //     type: "truck",
  //     direction: true,
  //     speed: 90,
  //     vehicles: [{ initialTileIndex: -4, color: 0x00ff00 }],
  //   },
];

export const map = new THREE.Group();

export function initializeMap() {
  metadata.length = 0;
  map.remove(...map.children);
  for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
    const grass = new Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  const newMetadata = generateRows(20);
  const startIndex = metadata.length;

  metadata.push(...newMetadata);
  newMetadata.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

    if (rowData.type === "forest") {
      const row = Grass(rowIndex);

      rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = Tree(tileIndex, height);
        row.add(tree);
      });

      map.add(row);
    }

    if (rowData.type === "car") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const car = Car(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = car;
        row.add(car);
      });

      map.add(row);
    }

    if (rowData.type === "truck") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const truck = Truck(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = truck;
        row.add(truck);
      });

      map.add(row);
    }
  });
}
