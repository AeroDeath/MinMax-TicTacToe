function MinMaxAgent(AIplayer){

	//Basic MinMax Agent

	this.AIplayer = AIplayer;

	this.bestMove = function(state, player){

		var allActions = this.availableActions(state);
		var allValues = [];

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			allValues.push(this.minValue(resulting_state[0], resulting_state[1]));
		}

		var best_value = -Infinity;
		var best_action = allActions[0];

		for(var i = 0; i<allActions.length; i+=1){
			if(allValues[i] > best_value){
				best_value = allValues[i]
				best_action = allActions[i]
			}
		}

		return best_action
	}

	this.maxValue = function(state, player){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = -Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = max(value, this.minValue(resulting_state[0], resulting_state[1]));
		}

		return value

	}

	this.minValue = function(state, player){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = min(value, this.maxValue(resulting_state[0], resulting_state[1]));
		}

		return value

	}

	this.checkGameOver = function(state){
		//returns the if the game has ended and the result of the game

		//check across rows
		for(var row = 0; row<3; row+=1){
			if(state[row][0] == state[row][1] && state[row][1] == state[row][2] && state[row][1] != '-'){
				return [true, state[row][1]];
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(state[0][col] == state[1][col] && state[1][col] == state[2][col] && state[1][col] != '-'){
				return [true, state[1][col]];
			}
		}

		//prime diagonal
		if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//anti diagonal
		if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//out of turns
		var numEmptySpaces = 0
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col+= 1){
				if(state[row][col] == '-'){
					numEmptySpaces += 1
				}
			}
		}
		if(numEmptySpaces == 0){
			return [true, '-']
		}

		return [false, '?']
	}

	this.availableActions = function(state){

		//get all the possible moves for the given state

		var actions = []
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col += 1){
				if(state[row][col] == '-'){
					actions.push([row, col])
				}
			}
		}
		return actions
	}

	this.transition = function(state, action, player){

		//returns the new state after player makes the action in given state

		var new_state = deepCopyBoard(state);
		var row = action[0];
		var col = action[1];
		if(new_state[row][col] == '-'){
			new_state[row][col] = player;
			if(player == 'X'){
				var new_player = 'O';
			}
			else{
				var new_player = 'X';
			}
		}

		return [new_state, new_player]
	}
}

//#####################################################################################################

function AlphaBetaAgent(AIplayer){

	// MinMax with Alpha Beta Pruning

	this.AIplayer = AIplayer;

	this.bestMove = function(state, player){

		var allActions = this.availableActions(state);
		var allValues = [];

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			allValues.push(this.minValue(resulting_state[0], resulting_state[1], -Infinity, Infinity));
		}

		var best_value = -Infinity;
		var best_action = allActions[0];

		for(var i = 0; i<allActions.length; i+=1){
			if(allValues[i] > best_value){
				best_value = allValues[i]
				best_action = allActions[i]
			}
		}

		return best_action
	}

	this.maxValue = function(state, player, alpha, beta){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = -Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = max(value, this.minValue(resulting_state[0], resulting_state[1], alpha, beta));
			if(value>=beta){
				return value;
			}
			alpha = max(alpha, value);
		}

		return value

	}

	this.minValue = function(state, player, alpha, beta){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = min(value, this.maxValue(resulting_state[0], resulting_state[1], alpha, beta));
			if(value<=alpha){
				return value;
			}
			beta = min(beta, value);
		}

		return value

	}

	this.checkGameOver = function(state){
		//returns the if the game has ended and the result of the game

		//check across rows
		for(var row = 0; row<3; row+=1){
			if(state[row][0] == state[row][1] && state[row][1] == state[row][2] && state[row][1] != '-'){
				return [true, state[row][1]];
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(state[0][col] == state[1][col] && state[1][col] == state[2][col] && state[1][col] != '-'){
				return [true, state[1][col]];
			}
		}

		//prime diagonal
		if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//anti diagonal
		if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//out of turns
		var numEmptySpaces = 0
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col+= 1){
				if(state[row][col] == '-'){
					numEmptySpaces += 1
				}
			}
		}
		if(numEmptySpaces == 0){
			return [true, '-']
		}

		return [false, '?']
	}

	this.availableActions = function(state){

		//get all the possible moves for the given state

		var actions = []
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col += 1){
				if(state[row][col] == '-'){
					actions.push([row, col])
				}
			}
		}
		return actions
	}

	this.transition = function(state, action, player){

		//returns the new state after player makes the action in given state

		var new_state = deepCopyBoard(state);
		var row = action[0];
		var col = action[1];
		if(new_state[row][col] == '-'){
			new_state[row][col] = player;
			if(player == 'X'){
				var new_player = 'O';
			}
			else{
				var new_player = 'X';
			}
		}

		return [new_state, new_player]
	}
}

//#####################################################################################################

function AlphaBetaLookupAgent(AIplayer){

	//Alpha Beta Pruning with State Lookup

	this.AIplayer = AIplayer;
	this.lookupTable = {};

	this.bestMove = function(state, player){

		var allActions = this.availableActions(state);
		var allValues = [];

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			allValues.push(this.minValue(resulting_state[0], resulting_state[1], -Infinity, Infinity));
		}

		var best_value = -Infinity;
		var best_action = allActions[0];

		for(var i = 0; i<allActions.length; i+=1){
			if(allValues[i] > best_value){
				best_value = allValues[i]
				best_action = allActions[i]
			}
		}

		return best_action
	}

	this.maxValue = function(state, player, alpha, beta){

		//checks if game has ended and if it has return the corresponding utility value
		if(state in this.lookupTable){
			return this.lookupTable[state];
		}
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = -Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = max(value, this.minValue(resulting_state[0], resulting_state[1], alpha, beta));
			if(value>=beta){
				return value;
			}
			alpha = max(alpha, value);
		}

		this.lookupTable[state] = value;

		return value

	}

	this.minValue = function(state, player, alpha, beta){

		//checks if game has ended and if it has return the corresponding utility value
		if(state in this.lookupTable){
			return this.lookupTable[state];
		}
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10;
			}
		}

		//recursion part
		var value = Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = min(value, this.maxValue(resulting_state[0], resulting_state[1], alpha, beta));
			if(value<=alpha){
				return value;
			}
			beta = min(beta, value);
		}

		this.lookupTable[state] = value;

		return value

	}

	this.checkGameOver = function(state){
		//returns the if the game has ended and the result of the game

		//check across rows
		for(var row = 0; row<3; row+=1){
			if(state[row][0] == state[row][1] && state[row][1] == state[row][2] && state[row][1] != '-'){
				return [true, state[row][1]];
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(state[0][col] == state[1][col] && state[1][col] == state[2][col] && state[1][col] != '-'){
				return [true, state[1][col]];
			}
		}

		//prime diagonal
		if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//anti diagonal
		if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//out of turns
		var numEmptySpaces = 0
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col+= 1){
				if(state[row][col] == '-'){
					numEmptySpaces += 1
				}
			}
		}
		if(numEmptySpaces == 0){
			return [true, '-']
		}

		return [false, '?']
	}

	this.availableActions = function(state){

		//get all the possible moves for the given state

		var actions = []
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col += 1){
				if(state[row][col] == '-'){
					actions.push([row, col])
				}
			}
		}
		return actions
	}

	this.transition = function(state, action, player){

		//returns the new state after player makes the action in given state

		var new_state = deepCopyBoard(state);
		var row = action[0];
		var col = action[1];
		if(new_state[row][col] == '-'){
			new_state[row][col] = player;
			if(player == 'X'){
				var new_player = 'O';
			}
			else{
				var new_player = 'X';
			}
		}

		return [new_state, new_player]
	}
}

//#####################################################################################################

function SmartAlphaBetaAgent(AIplayer){

	// Alpha Beta Agent with modified utility. Win Quick, Delay Loss.

	this.AIplayer = AIplayer;

	this.bestMove = function(state, player){

		var allActions = this.availableActions(state);
		var allValues = [];

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			allValues.push(this.minValue(resulting_state[0], resulting_state[1], -Infinity, Infinity, 0));
		}

		var best_value = -Infinity;
		var best_action = allActions[0];

		for(var i = 0; i<allActions.length; i+=1){
			if(allValues[i] > best_value){
				best_value = allValues[i]
				best_action = allActions[i]
			}
		}

		return best_action
	}

	this.maxValue = function(state, player, alpha, beta, depth){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10 - depth;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10 + depth;
			}
		}

		//recursion part
		var value = -Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = max(value, this.minValue(resulting_state[0], resulting_state[1], alpha, beta, depth + 1));
			if(value>=beta){
				return value;
			}
			alpha = max(alpha, value);
		}

		return value

	}

	this.minValue = function(state, player, alpha, beta, depth){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10 - depth;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10 + depth;
			}
		}

		//recursion part
		var value = Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = min(value, this.maxValue(resulting_state[0], resulting_state[1], alpha, beta, depth + 1));
			if(value<=alpha){
				return value;
			}
			beta = min(beta, value);
		}

		return value

	}

	this.checkGameOver = function(state){
		//returns the if the game has ended and the result of the game

		//check across rows
		for(var row = 0; row<3; row+=1){
			if(state[row][0] == state[row][1] && state[row][1] == state[row][2] && state[row][1] != '-'){
				return [true, state[row][1]];
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(state[0][col] == state[1][col] && state[1][col] == state[2][col] && state[1][col] != '-'){
				return [true, state[1][col]];
			}
		}

		//prime diagonal
		if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//anti diagonal
		if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//out of turns
		var numEmptySpaces = 0
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col+= 1){
				if(state[row][col] == '-'){
					numEmptySpaces += 1
				}
			}
		}
		if(numEmptySpaces == 0){
			return [true, '-']
		}

		return [false, '?']
	}

	this.availableActions = function(state){

		//get all the possible moves for the given state

		var actions = []
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col += 1){
				if(state[row][col] == '-'){
					actions.push([row, col])
				}
			}
		}
		return actions
	}

	this.transition = function(state, action, player){

		//returns the new state after player makes the action in given state

		var new_state = deepCopyBoard(state);
		var row = action[0];
		var col = action[1];
		if(new_state[row][col] == '-'){
			new_state[row][col] = player;
			if(player == 'X'){
				var new_player = 'O';
			}
			else{
				var new_player = 'X';
			}
		}

		return [new_state, new_player]
	}
}

//#####################################################################################################

function DiverseAlphaBetaAgent(AIplayer){

	//Alpha Beta Agent that doesn't stick to a single move

	this.AIplayer = AIplayer;

	this.bestMove = function(state, player){

		var allActions = this.availableActions(state);
		var allValues = [];
		var feasibleActions = [];

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			allValues.push(this.minValue(resulting_state[0], resulting_state[1], -Infinity, Infinity, 0));
		}

		var best_value = max(allValues)

		for(var i = 0; i<allActions.length; i+=1){
			if(allValues[i] == best_value){
				feasibleActions.push(allActions[i])
			}
		}

		return feasibleActions[Math.floor(Math.random() * feasibleActions.length)]
	}

	this.maxValue = function(state, player, alpha, beta, depth){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10 - depth;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10 + depth;
			}
		}

		//recursion part
		var value = -Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = max(value, this.minValue(resulting_state[0], resulting_state[1], alpha, beta, depth + 1));
			if(value>=beta){
				return value;
			}
			alpha = max(alpha, value);
		}

		return value

	}

	this.minValue = function(state, player, alpha, beta, depth){

		//checks if game has ended and if it has return the corresponding utility value
		var results = this.checkGameOver(state);
		if(results[0] == true){
			if(results[1] == this.AIplayer){
				return 10 - depth;
			}
			else if(results[1] == '-'){
				return 0;
			}
			else{
				return -10 + depth;
			}
		}

		//recursion part
		var value = Infinity;
		var allActions = this.availableActions(state);

		for(var i = 0; i<allActions.length; i+=1){
			var resulting_state = this.transition(state, allActions[i], player);
			value = min(value, this.maxValue(resulting_state[0], resulting_state[1], alpha, beta, depth + 1));
			if(value<=alpha){
				return value;
			}
			beta = min(beta, value);
		}

		return value

	}

	this.checkGameOver = function(state){
		//returns the if the game has ended and the result of the game

		//check across rows
		for(var row = 0; row<3; row+=1){
			if(state[row][0] == state[row][1] && state[row][1] == state[row][2] && state[row][1] != '-'){
				return [true, state[row][1]];
			}
		}

		//check across columns
		for(var col = 0; col<3; col+=1){
			if(state[0][col] == state[1][col] && state[1][col] == state[2][col] && state[1][col] != '-'){
				return [true, state[1][col]];
			}
		}

		//prime diagonal
		if(state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//anti diagonal
		if(state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[1][1] != '-'){
			return [true, state[1][1]];
		}

		//out of turns
		var numEmptySpaces = 0
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col+= 1){
				if(state[row][col] == '-'){
					numEmptySpaces += 1
				}
			}
		}
		if(numEmptySpaces == 0){
			return [true, '-']
		}

		return [false, '?']
	}

	this.availableActions = function(state){

		//get all the possible moves for the given state

		var actions = []
		for (var row = 0; row<3; row += 1){
			for(var col = 0; col<3; col += 1){
				if(state[row][col] == '-'){
					actions.push([row, col])
				}
			}
		}
		return actions
	}

	this.transition = function(state, action, player){

		//returns the new state after player makes the action in given state

		var new_state = deepCopyBoard(state);
		var row = action[0];
		var col = action[1];
		if(new_state[row][col] == '-'){
			new_state[row][col] = player;
			if(player == 'X'){
				var new_player = 'O';
			}
			else{
				var new_player = 'X';
			}
		}

		return [new_state, new_player]
	}
}