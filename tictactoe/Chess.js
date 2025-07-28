// Chess.js - Chess game logic with proper rules enforcement

class ChessGame {
    constructor() {
        this.board = [];
        this.selectedPiece = null;
        this.validMoves = [];
        this.isWhiteTurn = true;
        this.gameStatus = "White's turn";
        this.initialize();
    }

    initialize() {
        this.board = [
            '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
            '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '',
            '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
            '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
        ];
        this.selectedPiece = null;
        this.validMoves = [];
        this.isWhiteTurn = true;
        this.gameStatus = "White's turn";
        return this.getGameState();
    }

    getGameState() {
        return {
            board: this.board,
            selectedPiece: this.selectedPiece,
            validMoves: this.validMoves,
            gameStatus: this.gameStatus,
            isWhiteTurn: this.isWhiteTurn
        };
    }

    isPieceWhite(piece) {
        return '♔♕♖♗♘♙'.includes(piece);
    }

    isPieceBlack(piece) {
        return '♚♛♜♝♞♟'.includes(piece);
    }

    handleMove(index) {
        const piece = this.board[index];
        
        // Select a piece
        if (this.selectedPiece === null) {
            if ((this.isWhiteTurn && this.isPieceWhite(piece)) || 
                (!this.isWhiteTurn && this.isPieceBlack(piece))) {
                this.selectedPiece = index;
                this.validMoves = this.getValidMoves(index);
            }
            return this.getGameState();
        }

        // Move the selected piece
        if (this.validMoves.includes(index)) {
            this.board[index] = this.board[this.selectedPiece];
            this.board[this.selectedPiece] = '';
            this.isWhiteTurn = !this.isWhiteTurn;
            this.gameStatus = this.isWhiteTurn ? "White's turn" : "Black's turn";
        }

        this.selectedPiece = null;
        this.validMoves = [];
        return this.getGameState();
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    getValidMoves(index) {
        const piece = this.board[index];
        const row = Math.floor(index / 8);
        const col = index % 8;
        const moves = [];

        switch (piece) {
            case '♙': // White Pawn
                // Move forward one square
                if (row > 0 && !this.board[(row - 1) * 8 + col]) {
                    moves.push((row - 1) * 8 + col);
                    // Initial two-square move
                    if (row === 6 && !this.board[(row - 2) * 8 + col]) {
                        moves.push((row - 2) * 8 + col);
                    }
                }
                // Capture diagonally
                if (row > 0) {
                    if (col > 0) {
                        const leftCapture = this.board[(row - 1) * 8 + (col - 1)];
                        if (leftCapture && this.isPieceBlack(leftCapture)) {
                            moves.push((row - 1) * 8 + (col - 1));
                        }
                    }
                    if (col < 7) {
                        const rightCapture = this.board[(row - 1) * 8 + (col + 1)];
                        if (rightCapture && this.isPieceBlack(rightCapture)) {
                            moves.push((row - 1) * 8 + (col + 1));
                        }
                    }
                }
                break;

            case '♟': // Black Pawn
                // Move forward one square
                if (row < 7 && !this.board[(row + 1) * 8 + col]) {
                    moves.push((row + 1) * 8 + col);
                    // Initial two-square move
                    if (row === 1 && !this.board[(row + 2) * 8 + col]) {
                        moves.push((row + 2) * 8 + col);
                    }
                }
                // Capture diagonally
                if (row < 7) {
                    if (col > 0) {
                        const leftCapture = this.board[(row + 1) * 8 + (col - 1)];
                        if (leftCapture && this.isPieceWhite(leftCapture)) {
                            moves.push((row + 1) * 8 + (col - 1));
                        }
                    }
                    if (col < 7) {
                        const rightCapture = this.board[(row + 1) * 8 + (col + 1)];
                        if (rightCapture && this.isPieceWhite(rightCapture)) {
                            moves.push((row + 1) * 8 + (col + 1));
                        }
                    }
                }
                break;

            case '♖':
            case '♜': // Rook
                // Check horizontal and vertical moves
                const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (const [dx, dy] of directions) {
                    let newRow = row + dx;
                    let newCol = col + dy;
                    while (this.isValidPosition(newRow, newCol)) {
                        const targetIndex = newRow * 8 + newCol;
                        const targetPiece = this.board[targetIndex];
                        if (!targetPiece) {
                            moves.push(targetIndex);
                        } else {
                            if ((this.isPieceWhite(piece) && this.isPieceBlack(targetPiece)) ||
                                (this.isPieceBlack(piece) && this.isPieceWhite(targetPiece))) {
                                moves.push(targetIndex);
                            }
                            break;
                        }
                        newRow += dx;
                        newCol += dy;
                    }
                }
                break;

            case '♗':
            case '♝': // Bishop
                // Check diagonal moves
                const diagonals = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
                for (const [dx, dy] of diagonals) {
                    let newRow = row + dx;
                    let newCol = col + dy;
                    while (this.isValidPosition(newRow, newCol)) {
                        const targetIndex = newRow * 8 + newCol;
                        const targetPiece = this.board[targetIndex];
                        if (!targetPiece) {
                            moves.push(targetIndex);
                        } else {
                            if ((this.isPieceWhite(piece) && this.isPieceBlack(targetPiece)) ||
                                (this.isPieceBlack(piece) && this.isPieceWhite(targetPiece))) {
                                moves.push(targetIndex);
                            }
                            break;
                        }
                        newRow += dx;
                        newCol += dy;
                    }
                }
                break;

            case '♕':
            case '♛': // Queen (combines Rook and Bishop moves)
                const queenDirections = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1],           [0, 1],
                    [1, -1],  [1, 0],  [1, 1]
                ];
                for (const [dx, dy] of queenDirections) {
                    let newRow = row + dx;
                    let newCol = col + dy;
                    while (this.isValidPosition(newRow, newCol)) {
                        const targetIndex = newRow * 8 + newCol;
                        const targetPiece = this.board[targetIndex];
                        if (!targetPiece) {
                            moves.push(targetIndex);
                        } else {
                            if ((this.isPieceWhite(piece) && this.isPieceBlack(targetPiece)) ||
                                (this.isPieceBlack(piece) && this.isPieceWhite(targetPiece))) {
                                moves.push(targetIndex);
                            }
                            break;
                        }
                        newRow += dx;
                        newCol += dy;
                    }
                }
                break;

            case '♔':
            case '♚': // King
                const kingMoves = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1],           [0, 1],
                    [1, -1],  [1, 0],  [1, 1]
                ];
                for (const [dx, dy] of kingMoves) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (this.isValidPosition(newRow, newCol)) {
                        const targetIndex = newRow * 8 + newCol;
                        const targetPiece = this.board[targetIndex];
                        if (!targetPiece || 
                            (this.isPieceWhite(piece) && this.isPieceBlack(targetPiece)) ||
                            (this.isPieceBlack(piece) && this.isPieceWhite(targetPiece))) {
                            moves.push(targetIndex);
                        }
                    }
                }
                break;

            case '♘':
            case '♞': // Knight
                const knightMoves = [
                    [-2, -1], [-2, 1],
                    [-1, -2], [-1, 2],
                    [1, -2],  [1, 2],
                    [2, -1],  [2, 1]
                ];
                for (const [dx, dy] of knightMoves) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (this.isValidPosition(newRow, newCol)) {
                        const targetIndex = newRow * 8 + newCol;
                        const targetPiece = this.board[targetIndex];
                        if (!targetPiece || 
                            (this.isPieceWhite(piece) && this.isPieceBlack(targetPiece)) ||
                            (this.isPieceBlack(piece) && this.isPieceWhite(targetPiece))) {
                            moves.push(targetIndex);
                        }
                    }
                }
                break;
        }

        return moves;
    }

    getSquareColor(index) {
        const row = Math.floor(index / 8);
        const col = index % 8;
        return (row + col) % 2 === 0 ? 'white' : 'black';
    }

    reset() {
        return this.initialize();
    }
}

// Make it globally available
window.ChessGame = ChessGame;