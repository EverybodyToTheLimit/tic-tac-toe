var gameBoard = (function() {

        var fields = [{fieldName: "a1", value: "x"}, {fieldName: "a2", value: ""}, {fieldName: "a3", value: ""}, {fieldName: "b1", value: ""}, {fieldName: "b2", value: ""}, {fieldName: "b3", value: "o"}, {fieldName: "c1", value: ""}, {fieldName: "c2", value: ""}, {fieldName: "c3", value: ""} ];
        var players = [{name: "Jack", symbol: "x"},{name: "Jill", symbol : "o"}];
        var drawBoard = () => {
           console.log("cool") 
        };


        var currentTurn = "Jack"

        var updateField = (field, player) => {
                let tempResult = false;
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
                        post.value = playerSymbol;
                        alert("valid");
                        return true;
                    }
                    else {

                        tempResult = false;
                        alert("not valid");
                        return false;
                        } 
                    
                }})
            return tempResult;
            
        }
        
        return {
            updateField
        }
})();

