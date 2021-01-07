class Board{
    constructor(){
        this.size = 8;
        this.players = [];
        this.playersTurn = 0;
        this.boardSize = height/1.5;
        this.spacing = this.boardSize/8;
        this.halfBoard = this.boardSize/2;
        this.halfSpace = this.spacing/2;
        this.brown = [109,60,52];
        this.light = [205,158,116];
        this.boardColors = [this.light, this.brown]
        this.selection_color = [240, 229, 144, 130];
        this.strokeSize = 3;
        this.charList = ["a", "b", "c", "d", "e", "f", "g", "h"]
        this.fullMoves = 0;
        this.halfMoves = 0;
        this.moves = [];
        this.boardStateArray = []
        this.selectedPiece = "";
    }

    setUpBoard(){
        this.players = []
        this.players.push(new Player("white", "bottom"));
        this.players.push(new Player("black", "top"));
        this.loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        this.loadPieceImages();
    }
    
    rotateTurn(){
        this.playersTurn += 1;
        if (this.playersTurn >= this.players.length){
            this.playersTurn = 0;
        }
        this.deSelectAllPieces();
    }

    blit(){
        fill(this.light);
        noStroke();
        rect(-this.halfBoard, -this.halfBoard, this.boardSize, this.boardSize);
        
        for (var y = 0; y < 8; y++){
            for (var x = 0; x < 8; x++){
                fill(this.boardColors[((x+y)%2)])
                rect(x*this.spacing-this.halfBoard, y*this.spacing-this.halfBoard, this.spacing, this.spacing)
            }
        }
        this.blitPieces();
    }

    blitPieces(){
        this.players.forEach(player => {
            player.pieces.forEach(p => {
                p.blit(this.spacing, this.halfBoard, this.halfSpace, this.selection_color);
            });
        });
    }

    loadPieceImages(){
        this.players.forEach(player => {
            player.pieces.forEach(p => {
                console.log("Images/" + p.color + "_" + p.piece + ".png");
                p.image = loadImage("Images/" + p.color + "_" + p.piece + ".png");
            });
        });
    }

    //checks for checks and mates and pats
    loadFEN(FEN){
        this.players[0].pieces = [];
        this.players[1].pieces = [];
        var cutFEN = FEN.split(" ");
        var nextMove = cutFEN[1];
        if (nextMove == "b"){
            this.playersTurn = 1;
        }
        else {
            this.playersTurn = 0;
        }
        var caslingOpertunities = cutFEN[2];
        var enpassantOppertunities = cutFEN[3];
        this.halfMoves = Math.round(cutFEN[3]);
        this.fullMoves = Math.round(cutFEN[4]);
        var boardState = cutFEN[0].split("/");
        this.boardStateArray = [];
        for (var y = 0; y < boardState.length; y++){
            var line = boardState[y].split("");
            var xIncrement = 0;
            var arrayLine = [];
            for (var i = 0; i < line.length; i++){
                if (Number.isInteger(parseInt(line[i]))){
                    xIncrement += Math.round(line[i]);
                    for (var j = 0; j < Math.round(line[i]); j ++){
                        arrayLine.push("-");
                    }
                }
                else{
                    this.placePiece(xIncrement, y, line[i])
                    arrayLine.push(line[i]);
                    xIncrement ++;
                }
            }
            this.boardStateArray.push(arrayLine);

        }
        this.loadPieceImages();
    }

    getFEN(){
        var FEN = ""
        return FEN
    }

    xyToChessCord(x, y){
        var rank = (8-y).toString();
        var file = this.charList[x];
        return (file+rank);
    }
    cordToXY(cord){
        var cutCord = cord.split("");
        var y = 8-Math.round(cutCord[1]);
        var x = this.charList.indexOf(cutCord[0]);
        return [x, y]
    }

    placePiece(x, y, pieceChar){
        //blacks pieces
        if (pieceChar == 'P'){
            this.players[0].pieces.push(new Pon(x, y, this.players[0].color, this.players[0].side));
        }
        else if (pieceChar == 'K'){
            this.players[0].pieces.push(new King(x, y, this.players[0].color));
        }
        else if (pieceChar == 'Q'){
            this.players[0].pieces.push(new Queen(x, y, this.players[0].color));
        }
        else if (pieceChar == 'B'){
            this.players[0].pieces.push(new Bishop(x, y, this.players[0].color));
        }
        else if (pieceChar == 'N'){
            this.players[0].pieces.push(new Knight(x, y, this.players[0].color));
        }
        else if (pieceChar == 'R'){
            this.players[0].pieces.push(new Rook(x, y, this.players[0].color));
        }
        //white pieces
        else if (pieceChar == 'p'){
            this.players[1].pieces.push(new Pon(x, y, this.players[1].color, this.players[1].side));
        }
        else if (pieceChar == 'k'){
            this.players[1].pieces.push(new King(x, y, this.players[1].color));
        }
        else if (pieceChar == 'q'){
            this.players[1].pieces.push(new Queen(x, y, this.players[1].color));
        }
        else if (pieceChar == 'b'){
            this.players[1].pieces.push(new Bishop(x, y, this.players[1].color));
        }
        else if (pieceChar == 'n'){
            this.players[1].pieces.push(new Knight(x, y, this.players[1].color));
        }
        else if (pieceChar == 'r'){
            this.players[1].pieces.push(new Rook(x, y, this.players[1].color));
        }
    }

    CheckForSelected(){
        this.players[this.playersTurn].pieces.forEach(piece =>{
            var mouseTransPosX = mouseX-(width/2 - this.halfBoard + this.halfSpace);
            var mouseTransPosY = mouseY-(height/2-this.halfBoard + this.halfSpace);
            if (mouseTransPosX > piece.x*this.spacing-this.halfSpace && mouseTransPosY > piece.y*this.spacing-this.halfSpace && mouseTransPosX < piece.x*this.spacing+this.halfSpace && mouseTransPosY < piece.y*this.spacing+this.halfSpace){
                if (mouseIsPressed){
                    this.deSelectAllPieces();
                    piece.CheckMoveSqueres(this.boardStateArray);
                    piece.isSelected = true;
                    this.selectedPiece = piece;
                }
            }
        });
    }

    CheckForMove(){
        if (this.selectedPiece != ""){
            var mouseTransPosX = mouseX-(width/2 - this.halfBoard + this.halfSpace);
            var mouseTransPosY = mouseY-(height/2-this.halfBoard + this.halfSpace);
            this.selectedPiece.moveSqueres.forEach(spot => {
                if (mouseTransPosX > spot[0]*this.spacing-this.halfSpace && mouseTransPosY > spot[1]*this.spacing-this.halfSpace && mouseTransPosX < spot[0]*this.spacing+this.halfSpace && mouseTransPosY < spot[1]*this.spacing+this.halfSpace){
                    if (mouseIsPressed){
                        var temp_char = this.boardStateArray[this.selectedPiece.y][this.selectedPiece.x];
                        var kill_piece = this.getPieceByXY(spot[0], spot[1]);
                        if (this.boardStateArray[spot[1]][spot[0]] != "-"){
                            this.removePiece(kill_piece);
                        }
                        this.boardStateArray[spot[1]][spot[0]] = temp_char;
                        this.boardStateArray[this.selectedPiece.y][this.selectedPiece.x] = "-";
                        this.selectedPiece.x = spot[0];
                        this.selectedPiece.y = spot[1];
                        if (this.selectedPiece.piece == "pon"){
                            this.selectedPiece.firstMove = false;
                        }
                        this.rotateTurn();
                    }
                }
            });
        }
    }

    deSelectAllPieces(){
        this.players.forEach(pl => {
            pl.pieces.forEach(pie =>{
                pie.isSelected = false;
            })
        });
        this.selectedPiece = "";
    }

    getPieceByXY(x, y){
        var temp_piece = '';
        this.players.forEach(pl => {
            pl.pieces.forEach(pie =>{
                if (pie.x == x && pie.y == y){
                    temp_piece = pie;
                }
            });
        });
        return temp_piece;
    }

    removePiece(p){
        this.players.forEach(pl => {
            if (pl.pieces.includes(p)){
                pl.pieces.splice(pl.pieces.indexOf(p), 1);
            }
        });
    }
}