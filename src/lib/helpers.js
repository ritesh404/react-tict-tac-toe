export const playerToString = player =>
  player.cata({
    X: _ => "X",
    O: _ => "O"
  });
