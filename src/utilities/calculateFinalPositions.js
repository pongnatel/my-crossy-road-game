export function calculateFinalPositions(currentPosition, moves) {
  return moves.reduce((position, direction) => {
    if (direction === "forward") {
      return {
        rowIndex: position.rowIndex + 1,
        tileIndex: position.tileIndex,
      };
    } else if (direction === "backward") {
      return {
        rowIndex: position.rowIndex - 1,
        tileIndex: position.tileIndex,
      };
    } else if (direction === "left") {
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex - 1,
      };
    } else if (direction === "right") {
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex + 1,
      };
    }
    return position;
  }, currentPosition);
}
