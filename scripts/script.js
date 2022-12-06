var gameBoard = (function(player1Name, player2Name, gameMode) {

        var fields = [{fieldName: "a1", value: "", wincheck: 0}, {fieldName: "a2", value: "", wincheck: 0}, {fieldName: "a3", value: "", wincheck: 0}, {fieldName: "b1", value: "", wincheck: 0}, {fieldName: "b2", value: "", wincheck: 0}, {fieldName: "b3", value: "", wincheck: 0}, {fieldName: "c1", value: "", wincheck: 0}, {fieldName: "c2", value: "", wincheck: 0}, {fieldName: "c3", value: "", wincheck: 0} ];
        var players = [{name: "Jack", symbol: "x"},{name: "Jill", symbol : "o"}];
        let gameOver = false;

        var renderBoard = () => {       //Destroy and draw objects
           let rootElement = document.getElementById("tictaccontainer")
           while (rootElement.firstChild) {
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


        var currentTurn = players[0].name;      //Current round counter

        function fadeOutEffect(divName) {              //Function to fade out Div
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
                if(post.fieldName == field) {
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
                        checkResult();

                        return true;
                    }
                    else {

                        tempResult = false;
                        document.getElementById("low-level").textContent = "This field has already been filled"
                        fadeOutEffect("low-level");
                        document.getElementById("low-level").style.opacity = "1"
                        return false;
                        } 
                    
                }})
                if (tempResult == undefined) {
                    alert("not in scope")
                }
                return tempResult;
            
        }
        var checkResult = () => {
            if ((fields[0].wincheck + fields[1].wincheck + fields[2].wincheck == 3) || (fields[3].wincheck + fields[4].wincheck + fields[5].wincheck == 3) || (fields[6].wincheck + fields[7].wincheck + fields[8].wincheck == 3) 
            || (fields[0].wincheck + fields[3].wincheck + fields[6].wincheck == 3) || (fields[1].wincheck + fields[4].wincheck + fields[7].wincheck == 3) || (fields[2].wincheck + fields[5].wincheck + fields[8].wincheck == 3) 
            || (fields[0].wincheck + fields[4].wincheck + fields[8].wincheck == 3) || (fields[2].wincheck + fields[4].wincheck + fields[6].wincheck == 3)
            )
            
            {
                alert(players[0].name + " is the winner");
                gameOver = true;
                return true;
            }
            else if ((fields[0].wincheck + fields[1].wincheck + fields[2].wincheck == 15) || (fields[3].wincheck + fields[4].wincheck + fields[5].wincheck == 15) || (fields[6].wincheck + fields[7].wincheck + fields[8].wincheck == 15) 
            || (fields[0].wincheck + fields[3].wincheck + fields[6].wincheck == 15) || (fields[1].wincheck + fields[4].wincheck + fields[7].wincheck == 15) || (fields[2].wincheck + fields[5].wincheck + fields[8].wincheck == 15) 
            || (fields[0].wincheck + fields[4].wincheck + fields[8].wincheck == 15) || (fields[2].wincheck + fields[4].wincheck + fields[6].wincheck == 15)

            )
            {
                alert(players[0].name + " is the winner")
                gameOver = true;
                return true;
            }
            else {
                return false;
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
    })
    document.getElementById("right").addEventListener("click", () => {
        gameMode = "pvc"
        document.getElementById("navigation").style.visibility = "visible"
        document.getElementById("player2-name").style.visibility = "hidden"
    })

    document.getElementById("start-game").addEventListener("click", () => {
        player1Name = document.getElementById("player1-name-label")
        player2Name = document.getElementById("player2-name-label")
        document.getElementById("take-over").style.display = "none"
        document.getElementById("navigation").style.visibility = "visible"
        document.getElementById("top-level").style.display = "flex"
        document.getElementById("low-level").style.display = "flex"
        gameBoard(player1Name, player2Name, gameMode)

    })

    return {
        gameMode,
        player1Name,
        player2Name
    }

})();
