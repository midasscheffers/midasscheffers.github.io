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
    }

    setUpBoard(){
        this.players.push(new Player("white", "bottom"));
        this.players.push(new Player("black", "top"));
        for (var i = 0; i < 8; i ++){
            this.players[0].pieces.push(new Pon(i, 6, this.players[0].color))
        }
        this.loadPieceImages()
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
}