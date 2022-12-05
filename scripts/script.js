var gameBoard = (function() {

        var fields = [{fieldName: "a1", value: "", wincheck: 0}, {fieldName: "a2", value: "", wincheck: 0}, {fieldName: "a3", value: "", wincheck: 0}, {fieldName: "b1", value: "", wincheck: 0}, {fieldName: "b2", value: "", wincheck: 0}, {fieldName: "b3", value: "", wincheck: 0}, {fieldName: "c1", value: "", wincheck: 0}, {fieldName: "c2", value: "", wincheck: 0}, {fieldName: "c3", value: "", wincheck: 0} ];
        var players = [{name: "Jack", symbol: "x"},{name: "Jill", symbol : "o"}];
        
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
            rootElement.append(newDiv);
            document.getElementById(newDiv.id).addEventListener('click', () => {updateField(newDiv.id, currentTurn)})
           })
           console.log("cool") 
        };


        var currentTurn = players[0].name;      //Current round counter

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
                        alert("valid");
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
                        alert("not valid");
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
                alert(players[0].name + " is the winner")
                return true;
            }
            else if ((fields[0].wincheck + fields[1].wincheck + fields[2].wincheck == 15) || (fields[3].wincheck + fields[4].wincheck + fields[5].wincheck == 15) || (fields[6].wincheck + fields[7].wincheck + fields[8].wincheck == 15) 
            || (fields[0].wincheck + fields[3].wincheck + fields[6].wincheck == 15) || (fields[1].wincheck + fields[4].wincheck + fields[7].wincheck == 15) || (fields[2].wincheck + fields[5].wincheck + fields[8].wincheck == 15) 
            || (fields[0].wincheck + fields[4].wincheck + fields[8].wincheck == 15) || (fields[2].wincheck + fields[4].wincheck + fields[6].wincheck == 15)

            )
            {
                alert(players[0].name + " is the winner")
                return true;
            }
            else {
                return false;
            }
        }
        renderBoard();
        
        return {
            updateField,
            renderBoard,
            currentTurn,
            fields
        }
})();



