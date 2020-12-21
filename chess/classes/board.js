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
        this.selection_color = [240, 229, 144, 130];
        this.strokeSize = 3;
        this.charList = ["a", "b", "c", "d", "e", "f", "g", "h"]
        this.fullMoves = 0;
        this.halfMoves = 0;
        this.moves = [];
    }

    setUpBoard(){
        this.players.push(new Player("white", "bottom"));
        this.players.push(new Player("black", "top"));
        for (var i = 0; i < 8; i ++){
            this.players[0].pieces.push(new Pon(i, 6, this.players[0].color, this.players[0].side))
        }
        for (var i = 0; i < 8; i ++){
            this.players[1].pieces.push(new Pon(i, 1, this.players[1].color, this.players[0].side))
        }
        // pieces for white
        this.players[0].pieces.push(new King(4, 7, this.players[0].color))
        this.players[0].pieces.push(new Queen(3, 7, this.players[0].color))
        this.players[0].pieces.push(new Rook(0, 7, this.players[0].color))
        this.players[0].pieces.push(new Rook(7, 7, this.players[0].color))
        this.players[0].pieces.push(new Knight(1, 7, this.players[0].color))
        this.players[0].pieces.push(new Knight(6, 7, this.players[0].color))
        this.players[0].pieces.push(new Bishop(2, 7, this.players[0].color))
        this.players[0].pieces.push(new Bishop(5, 7, this.players[0].color))
        // pieces for black
        this.players[1].pieces.push(new King(4, 0, this.players[1].color))
        this.players[1].pieces.push(new Queen(3, 0, this.players[1].color))
        this.players[1].pieces.push(new Rook(0, 0, this.players[1].color))
        this.players[1].pieces.push(new Rook(7, 0, this.players[1].color))
        this.players[1].pieces.push(new Knight(1, 0, this.players[1].color))
        this.players[1].pieces.push(new Knight(6, 0, this.players[1].color))
        this.players[1].pieces.push(new Bishop(2, 0, this.players[1].color))
        this.players[1].pieces.push(new Bishop(5, 0, this.players[1].color))
        // this.loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        this.loadPieceImages();
    }
    
    rotateTurn(){
        this.playersTurn += 1;
        if (this.playersTurn >= this.players.length){
            this.playersTurn = 0;
        }
    }

    blit(){
        fill(this.light);
        noStroke();
        rect(-this.halfBoard, -this.halfBoard, this.boardSize, this.boardSize);
        for (var y = 0; y < 8; y++){
            for (var x = 0; x < 8; x++){
                if (y % 2 == 0){
                    if (x%2 == 1){
                    fill(this.brown)
                    rect(x*this.spacing-this.halfBoard, y*this.spacing-this.halfBoard, this.spacing, this.spacing)
                    }
                }
                else{
                    if(x%2 != 1){
                    fill(this.brown)
                    rect(x*this.spacing-this.halfBoard, y*this.spacing-this.halfBoard, this.spacing, this.spacing)
                    }
                }
            }
        }
        this.blitPieces();
    }

    blitPieces(){
        this.players.forEach(player => {
            player.pieces.forEach(p => {
                p.blit(this.spacing, this.halfBoard, this.halfSpace);
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
        var caslingOpertunities = cutFEN[2];
        var enpassantOppertunities = cutFEN[3];
        var halfMoves = cutFEN[3];
        var fullMoves = cutFEN[4];
        var boardState = cutFEN[0].split("/");
        for (var y = 0; y < boardState.length; y++){
            var line = boardState[y].split("");
            var xIncrement = 0;
            for (var i = 0; i < line.length; i++){
                if (Number.isInteger(parseInt(line[i]))){
                    xIncrement += Math.round(line[i]);
                }
                else{
                    this.placePiece(xIncrement, y, line[i])
                    xIncrement ++;
                }
            }

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
}