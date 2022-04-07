function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

type PlayerSymbol = "X" | "O" | " ";

enum Position {
  TopLeft,
  TopCenter,
  TopRight,

  MiddleLeft,
  MiddleCenter,
  MiddleRight,

  BottomLeft,
  BottomCenter,
  BottomRight,
}

export class Game {
  private _lastSymbol: PlayerSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: PlayerSymbol, position: Position): void {
    //if first move
    if (this._lastSymbol == " ") {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(position).Symbol != " ") {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, position);
  }

  public Winner(): PlayerSymbol {
    //if the positions in first row are taken
    if (
      this._board.TileAt(Position.TopLeft)!.Symbol != " " &&
      this._board.TileAt(Position.TopCenter)!.Symbol != " " &&
      this._board.TileAt(Position.TopRight)!.Symbol != " "
    ) {
      //if first row is full with same symbol
      if (
        this._board.TileAt(Position.TopLeft)!.Symbol ==
          this._board.TileAt(Position.TopCenter)!.Symbol &&
        this._board.TileAt(Position.TopRight)!.Symbol ==
          this._board.TileAt(Position.TopCenter)!.Symbol
      ) {
        return this._board.TileAt(Position.TopLeft)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      this._board.TileAt(Position.MiddleLeft)!.Symbol != " " &&
      this._board.TileAt(Position.MiddleCenter)!.Symbol != " " &&
      this._board.TileAt(Position.MiddleRight)!.Symbol != " "
    ) {
      //if middle row is full with same symbol
      if (
        this._board.TileAt(Position.MiddleLeft)!.Symbol ==
          this._board.TileAt(Position.MiddleCenter)!.Symbol &&
        this._board.TileAt(Position.MiddleRight)!.Symbol ==
          this._board.TileAt(Position.MiddleCenter)!.Symbol
      ) {
        return this._board.TileAt(Position.MiddleLeft)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      this._board.TileAt(Position.BottomLeft)!.Symbol != " " &&
      this._board.TileAt(Position.BottomCenter)!.Symbol != " " &&
      this._board.TileAt(Position.BottomRight)!.Symbol != " "
    ) {
      //if middle row is full with same symbol
      if (
        this._board.TileAt(Position.BottomLeft)!.Symbol ==
          this._board.TileAt(Position.BottomCenter)!.Symbol &&
        this._board.TileAt(Position.BottomRight)!.Symbol ==
          this._board.TileAt(Position.BottomCenter)!.Symbol
      ) {
        return this._board.TileAt(Position.BottomLeft)!.Symbol;
      }
    }

    return " ";
  }
}

interface Tile {
  Position: Position;
  Symbol: PlayerSymbol;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (const position in enumKeys(Position)) {
      const tile: Tile = {
        Position: Position[position] as unknown as Position,
        Symbol: " ",
      };
      this._plays.push(tile);
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {}
    }
  }

  public TileAt(position: Position): Tile {
    return this._plays.find((t: Tile) => t.Position === position)!;
  }

  public AddTileAt(symbol: PlayerSymbol, position: Position): void {
    const tile: Tile = { Position: position, Symbol: symbol };

    this._plays.find((t: Tile) => t.Position === position)!.Symbol = symbol;
  }
}
