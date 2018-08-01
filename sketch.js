var WIDTH = 600;
var HEIGHT = 600;
var AITime = 0;
var game = new TicTacToe();
var AI = new MinMaxAgent('?')

function setup(){
	
	var canvas = createCanvas(WIDTH,HEIGHT);
	canvas.parent('game');
	
}

function draw(){
	background(0);
	var now = new Date();
	document.getElementById("time").innerHTML = "Total Time Taken by AI : " + AITime + " milliseconds";
	displayResult(game);
	drawBoard();
	game.show();
}

function mousePressed(){
	if(game.playerMove != AI.AIplayer){
		var row_col = get_row_col(mouseX, mouseY);
		game.makeMove(row_col[0], row_col[1]);
		game.checkGameOver();
		if(game.playerMove == AI.AIplayer && game.isGameOver == false){
			var start = new Date();
			var best_move = AI.bestMove(game.board, game.playerMove);
			var end = new Date();
			AITime += end - start;
			game.makeMove(best_move[0], best_move[1]);
			game.checkGameOver();
		}
	}
}