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
        this.loadPieceImages();
        this.loadFEN();
    }
    
    rotateTurn(){
        this.playersTurn += 1;
        if (this.playersTurn >= this.players.length()){
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
        cutFEN = FEN.split(" ");
        console.log(cutFEN)
        nextMove = cutFEN[1];
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
        cutCord = cord.split("");
        var y = 8-Math.round(cutCord[1]);
        var x = indexOf(cutCord[0]);
        return [x, y]
    }
}