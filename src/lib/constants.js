import K from "fp-kudojs";
import daggy from "daggy";

const { Maybe } = K;
const { Nothing } = Maybe;

export const defaultBoard = [
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing(),
  Nothing()
];

export const winningCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const Player = daggy.taggedSum("Player", {
  X: [],
  O: []
});

// Note: We create NoPlayer separate from Player to avoid impossible state where in
// the current turn would be for NoPlayer
// NoPlayer is used only to evaluate to value of a Cell
export const NoPlayer = daggy.tagged("NoPlayer", []);

export const GameState = daggy.taggedSum("GameState", {
  Playable: [],
  Win: ["player"],
  Draw: []
});
