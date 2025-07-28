

const { createApp, ref, computed  } = Vue;

createApp({
    setup() {
        const currentScreen = ref('start');

         // Tic Tac Toe Game State
        const board = ref(Array(9).fill(''));
        const currentPlayer = ref('X');
        const gameStatus = ref('Player X\'s Turn');



        // Chess Game State
        const chessGame = ref(null);
        const chessBoard = ref([]);
        const selectedPiece = ref(null);
        const validMoves = ref([]);
        const chessStatus = ref("White's turn");
        const isWhiteTurn = ref(true);




         // Hangman Game State
         const words = [
            'JAVASCRIPT', 'PYTHON', 'PROGRAMMING', 'COMPUTER', 
            'ALGORITHM', 'DEVELOPER', 'GAMING', 'WEBSITE'
        ];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const hangmanWord = ref('');
        const usedLetters = ref([]);
        const hangmanAttempts = ref(6);
        const hangmanStatus = ref('');

        const displayWord = computed(() => {
            return hangmanWord.value.split('').map(letter => 
                usedLetters.value.includes(letter) ? letter : '_'
            );
        });







        function startLoading() {
            currentScreen.value = 'loading';
            setTimeout(() => {
                currentScreen.value = 'game-menu';
            }, 10000);
        }

        // Tic Tac Toe Functions
        function startTicTacToe() {
            currentScreen.value = 'tic-tac-toe';
            resetGame();
        }

        function makeMove(index) {
            if (board.value[index] || checkWinner()) return;

            board.value[index] = currentPlayer.value;
            
            if (checkWinner()) {
                gameStatus.value = `${currentPlayer.value} Wins!`;
                return;
            }

            if (checkDraw()) {
                gameStatus.value = 'It\'s a Draw!';
                return;
            }

            // Simple AI opponent
            currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
            
            if (currentPlayer.value === 'O') {
                setTimeout(aiMove, 500);
            }
        }

        function aiMove() {
            const emptySpaces = board.value.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);

            if (emptySpaces.length > 0) {
                const randomIndex = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
                board.value[randomIndex] = 'O';

                if (checkWinner()) {
                    gameStatus.value = 'O Wins!';
                    return;
                }

                if (checkDraw()) {
                    gameStatus.value = 'It\'s a Draw!';
                    return;
                }

                currentPlayer.value = 'X';
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0,1,2], [3,4,5], [6,7,8], // Rows
                [0,3,6], [1,4,7], [2,5,8], // Columns
                [0,4,8], [2,4,6] // Diagonals
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board.value[a] && 
                       board.value[a] === board.value[b] && 
                       board.value[a] === board.value[c];
            });
        }

        function checkDraw() {
            return board.value.every(cell => cell !== '');
        }

        function resetGame() {
            board.value = Array(9).fill('');
            currentPlayer.value = 'X';
            gameStatus.value = 'Player X\'s Turn';
        }

        function returnToGameMenu() {
            currentScreen.value = 'game-menu';
        }



        // Hangman Functions
        function startHangman() {
            currentScreen.value = 'hangman';
            hangmanWord.value = words[Math.floor(Math.random() * words.length)];
            usedLetters.value = [];
            hangmanAttempts.value = 6;
            hangmanStatus.value = '';
        }

        function guessLetter(letter) {
            if (usedLetters.value.includes(letter)) return;

            usedLetters.value.push(letter);

            if (!hangmanWord.value.includes(letter)) {
                hangmanAttempts.value--;
            }

            if (hangmanAttempts.value === 0) {
                hangmanStatus.value = `Game Over! The word was ${hangmanWord.value}`;
            }

            if (displayWord.value.join('') === hangmanWord.value) {
                hangmanStatus.value = 'Congratulations! You Won!';
            }
        }


        // Chess Functions
        function startChess() {
            currentScreen.value = 'chess';
            chessGame.value = new ChessGame();
            updateChessState(chessGame.value.getGameState());
        }

        function updateChessState(gameState) {
            chessBoard.value = gameState.board;
            selectedPiece.value = gameState.selectedPiece;
            validMoves.value = gameState.validMoves;
            chessStatus.value = gameState.gameStatus;
            isWhiteTurn.value = gameState.isWhiteTurn;
        }

        function handleChessMove(index) {
            const gameState = chessGame.value.handleMove(index);
            updateChessState(gameState);
        }

        function getSquareColor(index) {
            return chessGame.value ? chessGame.value.getSquareColor(index) : 'white';
        }

        function resetChess() {
            const gameState = chessGame.value.reset();
            updateChessState(gameState);
        }






        return {
             // Tic Tac Toe exports & General exports
            currentScreen,
            board,
            gameStatus,
            startLoading,
            startTicTacToe,
            makeMove,
            resetGame,
            returnToGameMenu,


            // Chess exports
            startChess,
            chessBoard,
            selectedPiece,
            validMoves,
            chessStatus,
            isWhiteTurn,
            handleChessMove,
            getSquareColor,
            resetChess,

             // Hangman Exports
            startHangman,
            words,
            alphabet,
            hangmanWord,
            usedLetters,
            hangmanAttempts,
            hangmanStatus,
            displayWord,
            guessLetter
        };
    }
}).mount('#app');