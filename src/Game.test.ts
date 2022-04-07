import { Game, Position } from "./Game";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it("should not allow player O to play first", () => {
    expect(() => game.Play("O", Position.TopLeft)).toThrow();
  });

  it("should not allow player x to play twice in a row", () => {
    game.Play("X", Position.TopLeft);
    expect(() => game.Play("X", Position.MiddleLeft)).toThrow();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play("X", Position.TopLeft);
    expect(() => game.Play("O", Position.TopLeft)).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play("X", Position.TopLeft);
    game.Play("O", Position.MiddleLeft);
    expect(() => game.Play("X", Position.TopLeft)).toThrow();
  });

  it("should declare player X as winner if it plays three in top row", () => {
    game.Play("X", Position.TopLeft);
    game.Play("O", Position.MiddleLeft);
    game.Play("X", Position.TopCenter);
    game.Play("O", Position.MiddleCenter);
    game.Play("X", Position.TopRight);

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in top row", () => {
    game.Play("X", Position.MiddleLeft);
    game.Play("O", Position.TopLeft);
    game.Play("X", Position.MiddleCenter);
    game.Play("O", Position.TopCenter);
    game.Play("X", Position.BottomRight);
    game.Play("O", Position.TopRight);

    var winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in middle row", () => {
    game.Play("X", Position.MiddleLeft);
    game.Play("O", Position.TopLeft);
    game.Play("X", Position.MiddleCenter);
    game.Play("O", Position.TopCenter);
    game.Play("X", Position.MiddleRight);

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in middle row", () => {
    game.Play("X", Position.TopLeft);
    game.Play("O", Position.MiddleLeft);
    game.Play("X", Position.BottomCenter);
    game.Play("O", Position.MiddleCenter);
    game.Play("X", Position.BottomRight);
    game.Play("O", Position.MiddleRight);

    var winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in bottom row", () => {
    game.Play("X", Position.BottomLeft);
    game.Play("O", Position.TopLeft);
    game.Play("X", Position.BottomCenter);
    game.Play("O", Position.TopCenter);
    game.Play("X", Position.BottomRight);

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in bottom row", () => {
    game.Play("X", Position.TopLeft);
    game.Play("O", Position.BottomLeft);
    game.Play("X", Position.MiddleCenter);
    game.Play("O", Position.BottomCenter);
    game.Play("X", Position.TopCenter);
    game.Play("O", Position.BottomRight);

    var winner = game.Winner();

    expect(winner).toBe("O");
  });
});
