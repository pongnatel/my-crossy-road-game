import { minTileIndex, maxTileIndex } from "../constants";
import { calculateFinalPositions } from "./calculateFinalPositions";
import { metadata as rows } from "../components/Map";

export function endUpValidPosition(currentPosition, moves) {
  const finalPosition = calculateFinalPositions(currentPosition, moves);

  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    return false;
  }

  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    console.log("Tree hit");
    return false;
  }

  return true;
}
