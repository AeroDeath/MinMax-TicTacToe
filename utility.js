function drawBoard(){
	for(var i = 1; i<3; i+=1){
		stroke(255);
		strokeWeight(1);
		line(0, HEIGHT*i/3, WIDTH, HEIGHT*i/3)
		line(WIDTH*i/3, 0, WIDTH*i/3, HEIGHT)
	}
}

function displayResult(game){
	switch(game.result){
		case 'X':
			document.getElementById("result").innerHTML = 'X Wins!';
			break;
		case 'O':
			document.getElementById("result").innerHTML = 'O Wins!';
			break;
		case '-':
			document.getElementById("result").innerHTML = 'Tie!';
			break;
		default:
			document.getElementById("result").innerHTML = " ";

	}
}

function newGame(){
	game.newGame();
	AITime = 0;
	var gameMode = document.getElementById('gameMode')
	var playerCharacter = document.getElementById('playerCharacter')

	if(gameMode.selectedIndex == 0){
		AI = new MinMaxAgent('?');
	}

	else if(gameMode.selectedIndex == 1){
		if(playerCharacter.selectedIndex == 0){
			AI = new MinMaxAgent('O');
		}
		else{
			AI = new MinMaxAgent('X');
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
		}
	}

	else if(gameMode.selectedIndex == 2){
		if(playerCharacter.selectedIndex == 0){
			AI = new AlphaBetaAgent('O');
		}
		else{
			AI = new AlphaBetaAgent('X');
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
		}
	}

	else if(gameMode.selectedIndex == 3){
		if(playerCharacter.selectedIndex == 0){
			AI = new AlphaBetaLookupAgent('O');
		}
		else{
			AI = new AlphaBetaLookupAgent('X');
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
		}
	}

	else if(gameMode.selectedIndex == 4){
		if(playerCharacter.selectedIndex == 0){
			AI = new SmartAlphaBetaAgent('O');
		}
		else{
			AI = new SmartAlphaBetaAgent('X');
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
		}
	}
	
	else if(gameMode.selectedIndex == 5){
		if(playerCharacter.selectedIndex == 0){
			AI = new DiverseAlphaBetaAgent('O');
		}
		else{
			AI = new DiverseAlphaBetaAgent('X');
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
		}
	}
}

function get_row_col(x, y){
	//gets row and column index from mouse location
	var row = floor(y/(HEIGHT/3));
	var col = floor(x/(WIDTH/3));
	return [row, col]
}

function deepCopyBoard(board){
	// create a deep copy of the game state

	var new_board = [
	['-', '-', '-'],
	['-', '-', '-'],
	['-', '-', '-']
	]
	for (var row = 0; row<3; row += 1){
		for(var col = 0; col<3; col+= 1){
			new_board[row][col] = board[row][col]
		}
	}
	return new_board
}