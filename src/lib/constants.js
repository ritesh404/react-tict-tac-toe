import K from "fp-kudojs";

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
