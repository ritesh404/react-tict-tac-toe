import K from "fp-kudojs";
import daggy from "daggy";

const { Maybe, caseOf } = K;
const { Nothing, Just } = Maybe;

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

export const Player = daggy.taggedSum("Player", {
  X: [],
  O: []
});

export const GameState = daggy.taggedSum("GameState", {
  Playable: [],
  Win: ["player"]
});
