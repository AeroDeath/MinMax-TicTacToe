function TicTacToe(){
	
	this.turn = 1;
	this.playerMove = 'X';
	this.isGameOver = false;
	this.result = '?';
	this.board = [
	['-', '-', '-'],
	['-', '-', '-'],
	['-', '-', '-']
	];

	this.newGame = function(){
		this.turn = 1;
		this.playerMove = 'X';
		this.isGameOver = false;
		this.result = '?';
		this.board = [
		['-', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-']
		];
	}

	this.makeMove = function(row, col){
		if(row<3 && col<3 && row>=0 && col>=0){
			console.log(this.board);
			console.log(row);
			if(this.board[row][col] == '-'){
				this.board[row][col] = this.playerMove;
				this.turn += 1;
				if(this.playerMove == 'X'){
					this.playerMove = 'O';
				}
				else{
					this.playerMove = 'X';
				}
			}
		}
	}

	this.checkGameOver = function(){
		//check across rows
		for(var row = 0; row<3; row+=1){
			if(this.board[row][0] == this.board[row][1] && this.board[row][1] == this.board[row][2] && this.board[row][1] != '-'){
				this.isGameOver = true;
				this.result = this.board[row][1];
				print(this.result);
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(this.board[0][col] == this.board[1][col] && this.board[1][col] == this.board[2][col] && this.board[1][col] != '-'){
				this.isGameOver = true;
				this.result = this.board[1][col];
			}
		}

		//prime diagonal
		if(this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && this.board[1][1] != '-'){
			this.isGameOver = true;
			this.result = this.board[1][1];
		}

		//anti diagonal
		else if(this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] && this.board[1][1] != '-'){
			this.isGameOver = true;
			this.result = this.board[1][1];
		}

		//out of turns
		else if(this.turn == 10 && this.result == '?'){
			this.isGameOver = true;
			this.result = '-';
		}
	}

	this.show = function(){
		for(var row = 0; row<3; row+= 1){
			for(var col = 0; col<3; col+= 1){
				centre = [WIDTH * col/3 + WIDTH/6, HEIGHT * row/3 + HEIGHT/6];
				if(this.board[row][col] == 'O'){
					fill(0);
					stroke(255);
					strokeWeight(4);
					ellipse(centre[0], centre[1], WIDTH/4.5);
				}
				else if(this.board[row][col] == 'X'){
					fill(0);
					stroke(255);
					strokeWeight(5);
					line(centre[0] + WIDTH/9, centre[1] + HEIGHT/9, centre[0] - WIDTH/9, centre[1] - HEIGHT/9);
					line(centre[0] + WIDTH/9, centre[1] - HEIGHT/9, centre[0] - WIDTH/9, centre[1] + HEIGHT/9);
				}
			}
		}
	}
}