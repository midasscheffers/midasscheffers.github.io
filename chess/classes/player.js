class Player{
    constructor(color, side){
        this.color = color;
        this.side = side;
        this.pieces = [];
        this.capuredPieces = [];
        this.enem_move_squeres = [];
    }

    CheckIfKingInEnemMoves(){
        this.pieces.forEach(pie => {
            if (pie.piece == "king"){
                
            }
        });
    }
}