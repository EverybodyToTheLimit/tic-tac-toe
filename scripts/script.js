var gameBoard = (function(player1Name, player2Name, gameMode) {
        var fields = [{fieldName: "a1", value: "", wincheck: 0}, {fieldName: "a2", value: "", wincheck: 0}, {fieldName: "a3", value: "", wincheck: 0}, {fieldName: "b1", value: "", wincheck: 0}, {fieldName: "b2", value: "", wincheck: 0}, {fieldName: "b3", value: "", wincheck: 0}, {fieldName: "c1", value: "", wincheck: 0}, {fieldName: "c2", value: "", wincheck: 0}, {fieldName: "c3", value: "", wincheck: 0} ];
        var players = [{name: "", symbol: "x"},{name: "", symbol : "o"}];
        let gameOver = false;

        
        if (gameMode == "pvc") {
            var random = Math.floor(Math.random() * fields.length)
            fields[random].value = "x";
            fields[random].wincheck = "1";
            players[0].name = "Computer";
            players[1].name = player1Name;
            document.getElementById("player1").textContent = "Player 1\n" + "Computer";
            document.getElementById("player2").textContent = "Player 2\n" + player1Name;
        }
        else if (gameMode == "pvp") {
            players[0].name = player1Name;
            players[1].name = player2Name;
            document.getElementById("player1").textContent = "Player 1\n" + player1Name;
            document.getElementById("player2").textContent = "Player 2\n" + player2Name;
        }

        var renderBoard = () => {       //Destroy and draw objects
           let rootElement = document.getElementById("tictaccontainer")
           while (rootElement.firstChild) {
            rootElement.firstChild.removeEventListener("click", () => {});
            rootElement.removeChild(rootElement.firstChild)
           }
           fields.forEach(object => {
            let newDiv = document.createElement('div');
            newDiv.id = object.fieldName;
            newDiv.className = "tictacField";
            newDiv.textContent = object.value;
            if (newDiv.textContent == "x") {
                newDiv.style.backgroundImage = "url(./img/cross.png)"
            }
            else if (newDiv.textContent == "o") {
                newDiv.style.backgroundImage = "url(./img/circle.png)"
            }
            rootElement.append(newDiv);
            document.getElementById(newDiv.id).addEventListener('click', () => {updateField(newDiv.id, currentTurn)})
           })
           console.log("cool") 
        };

        // AI THINGY


        
        function bestSpot() {
            array2 = generateOrig()
            return minimax(array2, aiPlayer).index;

        }

        function generateOrig() {
            var origBoard = [];
            fields.forEach(element => {
            if (element.value == "x" || element.value == "o") {
                origBoard.push(element.value)
            }
            else {
                origBoard.push(fields.findIndex(x => x.fieldName === element.fieldName))
            }
        })
        return origBoard;
        }
        const huPlayer = 'o';
        const aiPlayer = 'x';

        function emptyIndexies(board){
            return  board.filter(s => s != "o" && s != "x");
          }

        function winning(board, player){
        if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
        } else {
        return false;
        }
        }

        // the main minimax function
        function minimax(newBoard, player){
        
                //available spots
                var availSpots = emptyIndexies(newBoard);

                // checks for the terminal states such as win, lose, and tie 
                //and returning a value accordingly
                if (winning(newBoard, huPlayer)){
                    return {score:-10};
                }
                else if (winning(newBoard, aiPlayer)){
                return {score:10};
                }
                else if (availSpots.length === 0){
                    return {score:0};
                }

                // an array to collect all the objects
                var moves = [];

                // loop through available spots
                for (var i = 0; i < availSpots.length; i++){
                //create an object for each and store the index of that spot 
                var move = {};
                move.index = newBoard[availSpots[i]];

                // set the empty spot to the current player
                newBoard[availSpots[i]] = player;

                /*collect the score resulted from calling minimax 
                on the opponent of the current player*/
                if (player == aiPlayer){
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
                }
                else{
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
                }

                // reset the spot to empty
                newBoard[availSpots[i]] = move.index;

                // push the object to the array
                moves.push(move);
                }
                    // if it is the computer's turn loop over the moves and choose the move with the highest score
                var bestMove;
                if(player === aiPlayer){
                    var bestScore = -10000;
                    for(var i = 0; i < moves.length; i++){
                    if(moves[i].score > bestScore){
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                    }
                }else{

                // else loop over the moves and choose the move with the lowest score
                    var bestScore = 10000;
                    for(var i = 0; i < moves.length; i++){
                    if(moves[i].score < bestScore){
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                    }
                }

                // return the chosen move (object) from the moves array
                return moves[bestMove];
        }






        var currentTurn = players[1].name;      //Current round counter

        function fadeOutEffect(divName) {              //Function to fade out information Div
            var fadeTarget = document.getElementById(divName);
            var fadeEffect = setInterval(function () {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                }
            }, 100);
        }

        var updateField = (field, player) => {      //Function to update field
                let tempResult = undefined;
                let playerSymbol = "";

                players.find(function(user, index2){
                    if(user.name == player) {
                        playerSymbol = user.symbol;
                    }
                })

                fields.find(function(post, index) {
                
                
                if(post.fieldName == field && gameMode == "pvp") {
                    if(post.value != "o" && post.value != "x") {
                        tempResult = true;
                        if (currentTurn == players[0].name) {
                            post.wincheck = 1;
                        }
                        else {
                            post.wincheck = 5;
                        }
                        post.value = playerSymbol
                        if (currentTurn == players[0].name) {
                            currentTurn = players[1].name
                        }
                        else {
                            currentTurn = players[0].name
                        }
                        renderBoard();
                        checkResult(fields);

                        return true;
                    }
                    else {
                        tempResult = false;
                        document.getElementById("low-level").textContent = "This field has already been filled"
                        fadeOutEffect("low-level");
                        document.getElementById("low-level").style.opacity = "1"
                        return false;
                    }
                    
                }
                else if (post.fieldName == field && gameMode == "pvc") {
                    if(post.value != "o" && post.value != "x") {
                    
                    if (currentTurn == players[0].name) {
                        post.wincheck = 1;
                    }
                    else {
                        post.wincheck = 5;
                    }
                    post.value = playerSymbol
                    if (currentTurn == players[0].name) {
                        currentTurn = players[1].name
                    }
                    else {
                        //currentTurn = players[0].name
                    }
                    renderBoard();
                    checkResult(fields);
                        
                        var bestMove = bestSpot();
                        fields[bestMove].value = "x";
                        fields[bestMove].wincheck = 1;
                        renderBoard();
                        checkResult(fields);
                        
                    return true;
                }
                    else {
                        tempResult = false;
                        document.getElementById("low-level").textContent = "This field has already been filled"
                        fadeOutEffect("low-level");
                        document.getElementById("low-level").style.opacity = "1"
                        checkResult(fields);
                        return false;
                    }
            }
                })
            
        }
        var checkResult = (board) => {
            let winImage = "";
            if ((board[0].wincheck + board[1].wincheck + board[2].wincheck == 3) || (board[3].wincheck + board[4].wincheck + board[5].wincheck == 3) || (board[6].wincheck + board[7].wincheck + board[8].wincheck == 3) 
            || (board[0].wincheck + board[3].wincheck + board[6].wincheck == 3) || (board[1].wincheck + board[4].wincheck + board[7].wincheck == 3) || (board[2].wincheck + board[5].wincheck + board[8].wincheck == 3) 
            || (board[0].wincheck + board[4].wincheck + board[8].wincheck == 3) || (board[2].wincheck + board[4].wincheck + board[6].wincheck == 3)
            )
            
            {   
                if (board[0].wincheck + board[1].wincheck + board[2].wincheck == 3) {winImage = "./img/r2top.png"}
                else if (board[3].wincheck + board[4].wincheck + board[5].wincheck == 3) {winImage = "./img/r2mid.png"}
                else if (board[6].wincheck + board[7].wincheck + board[8].wincheck == 3) {winImage = "./img/r2bottom.png"}
                else if (board[0].wincheck + board[3].wincheck + board[6].wincheck == 3) {winImage = "./img/r1left.png"}
                else if (board[1].wincheck + board[4].wincheck + board[7].wincheck == 3) {winImage = "./img/r1mid.png"}
                else if (board[2].wincheck + board[5].wincheck + board[8].wincheck == 3) {winImage = "./img/r1right.png"}
                else if (board[0].wincheck + board[4].wincheck + board[8].wincheck == 3) {winImage = "./img/rcrosstop.png"}
                else if (board[2].wincheck + board[4].wincheck + board[6].wincheck == 3) {winImage = "./img/rcrossbottom.png"}

                let rootElement = document.getElementById("tictaccontainer")
                let newImg = document.createElement("img");
                newImg.src = winImage;
                newImg.id = "winning-line"
                rootElement.append(newImg);
                let rootElement1 = document.getElementById("game-container")
                let newImg1 = document.createElement("img");
                newImg1.src = "./img/player1winmsg.png";
                newImg1.id = "winning-message"
                rootElement1.append(newImg1);
                document.getElementById("winning-message").addEventListener('click', () => {location.reload()});
                gameOver = true;
                playerwin = "human"
                return {
                    gameOver,
                    playerwin
                }

            }
            else if ((board[0].wincheck + board[1].wincheck + board[2].wincheck == 15) || (board[3].wincheck + board[4].wincheck + board[5].wincheck == 15) || (board[6].wincheck + board[7].wincheck + board[8].wincheck == 15) 
            || (board[0].wincheck + board[3].wincheck + board[6].wincheck == 15) || (board[1].wincheck + board[4].wincheck + board[7].wincheck == 15) || (board[2].wincheck + board[5].wincheck + board[8].wincheck == 15) 
            || (board[0].wincheck + board[4].wincheck + board[8].wincheck == 15) || (board[2].wincheck + board[4].wincheck + board[6].wincheck == 15)

            )
            {
                if (board[0].wincheck + board[1].wincheck + board[2].wincheck == 15) {winImage = "./img/y2top.png"}
                else if (board[3].wincheck + board[4].wincheck + board[5].wincheck == 15) {winImage = "./img/y2mid.png"}
                else if (board[6].wincheck + board[7].wincheck + board[8].wincheck == 15) {winImage = "./img/y2bottom.png"}
                else if (board[0].wincheck + board[3].wincheck + board[6].wincheck == 15) {winImage = "./img/y1left.png"}
                else if (board[1].wincheck + board[4].wincheck + board[7].wincheck == 15) {winImage = "./img/y1mid.png"}
                else if (board[2].wincheck + board[5].wincheck + board[8].wincheck == 15) {winImage = "./img/y1right.png"}
                else if (board[0].wincheck + board[4].wincheck + board[8].wincheck == 15) {winImage = "./img/ycrosstop.png"}
                else if (board[2].wincheck + board[4].wincheck + board[6].wincheck == 15) {winImage = "./img/ycrossbottom.png"}

                let rootElement = document.getElementById("tictaccontainer")
                let newImg = document.createElement("img");
                newImg.src = winImage;
                newImg.id = "winning-line"
                rootElement.append(newImg);
                let rootElement1 = document.getElementById("game-container")
                let newImg1 = document.createElement("img");
                newImg1.src = "./img/player2winmsg.png";
                newImg1.id = "winning-message"
                rootElement1.append(newImg1);
                document.getElementById("winning-message").addEventListener('click', () => {location.reload()});
                gameOver = true;
                playerwin = "cpu"
                return {
                    gameOver,
                    playerwin
                }
            }
            else if ((board[0].wincheck != 0 && board[1].wincheck != 0 && board[2].wincheck != 0
                     && board[3].wincheck != 0 && board[4].wincheck != 0 && board[5].wincheck != 0
                     && board[6].wincheck != 0 && board[7].wincheck != 0 && board[8].wincheck != 0) && gameOver != true) 
            {
                let rootElement1 = document.getElementById("game-container")
                let newImg1 = document.createElement("img");
                newImg1.src = "./img/tiemsg.png";
                newImg1.id = "winning-message"
                rootElement1.append(newImg1);
                document.getElementById("winning-message").addEventListener('click', () => {location.reload()});
                gameOver = true;
                return true;
            }
            else {
                gameOver = false;
                playerwin = "noplayer"
                return {
                    gameOver,
                    playerwin
                }
            }
        }
        if (gameOver == true) {
            initalScreen();
            return


        }
        else {
            renderBoard();
        }
        
        return {
            gameOver,
            checkResult,
            bestSpot,
        }
});


var initalScreen =(function() {
    let player1Name = "";
    let player2Name = "";
    let gameMode = "";
    document.getElementById("take-over").style.display = "flex"
    document.getElementById("navigation").style.visibility = "hidden"
    document.getElementById("left").addEventListener("click", () => {
        gameMode = "pvp"
        document.getElementById("navigation").style.visibility = "visible"
        document.getElementById("player2-name").style.visibility = "visible"
        document.getElementById("pl1label").textContent = "Player 1 Name"
    })
    document.getElementById("right").addEventListener("click", () => {
        gameMode = "pvc"
        document.getElementById("pl1label").textContent = "Player Name"
        document.getElementById("navigation").style.visibility = "visible"
        document.getElementById("player2-name").style.visibility = "hidden"
    })

    document.getElementById("start-game").addEventListener("click", () => {
        if (document.getElementById("player1-name-label").value == document.getElementById("player2-name-label").value) {
            alert("Player Names cannot be the same")
        }
        else {
        player1Name = document.getElementById("player1-name-label").value;
        player2Name = document.getElementById("player2-name-label").value;
        document.getElementById("take-over").style.display = "none"
        document.getElementById("navigation").style.visibility = "visible"
        document.getElementById("top-level").style.display = "flex"
        document.getElementById("low-level").style.display = "flex"
        gameBoard(player1Name, player2Name, gameMode)
    }
    })

    return {
        gameMode,
        player1Name,
        player2Name
    }

})();

