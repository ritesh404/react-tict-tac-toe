import { togglePlayer } from "../GameBoard";
import { Player } from "../../lib/constants";

// TODO: Write snapshot tests and more unit tests
describe("<GameBoard/>", () => {
  describe("togglePlayer", () => {
    it("Should toggle Player X to O", () => {
      expect(togglePlayer(Player.X)).toEqual(Player.O);
    });
    it("Should toggle Player O to X", () => {
      expect(togglePlayer(Player.O)).toEqual(Player.X);
    });
  });
});
