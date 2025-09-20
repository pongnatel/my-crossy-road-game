import * as THREE from "three";
import { tileSize, tilesPerRow } from "../constants";

export function Grass(rowIndex) {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3);
  const material = new THREE.MeshLambertMaterial({
    color: 0xbaf455,
  });
  const grass = new THREE.Mesh(geometry, material);
  grass.position.z = 1.5;
  group.position.y = rowIndex * tileSize;
  grass.receiveShadow = true;
  group.add(grass);
  return group;
}
