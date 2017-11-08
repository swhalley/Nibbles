class Snake {
    constructor( snakePieceSize ){
        this.portionSize = snakePieceSize;
        this.reset(0, 0);

        this.snakeColor = "green";
    }

    reset( xPos, yPos ){
        this.tail = [];
        this.tail.push({x: xPos, y: yPos});

        this.maxLength = 5;
        this.stop();
    }

    grow(){
        this.maxLength++;
    }

    stop(){
        this._xMovement = 0;
        this._yMovement = 0;
    }

    get size(){
        return this.portionSize;
    }

    //This seems like 4x duplication. How can I fix this?
    //changeDirection( 1, 0)? if check could check existing velocity *-1 if they are equal, dont change it

    changeDirection( x, y ){
        if( x !== 0 && this._xMovement * -1 === x ) return;
        if( y !== 0 && this._yMovement * -1 === y ) return;

        this._xMovement = x;
        this._yMovement = y;
    }

    directionLeft(){
        if( this._xMovement === 1 )
            return;

        this._xMovement = -1;
        this._yMovement = 0;
    }

    directionRight(){
        if( this._xMovement === -1 )
            return;

        this._xMovement = 1;
        this._yMovement = 0;
    }

    directionUp(){
        if( this._yMovement === 1 )
            return; 

        this._xMovement = 0;
        this._yMovement = -1;
    }

    directionDown(){
        if( this._yMovement === -1)
            return;

        this._xMovement = 0;
        this._yMovement = 1;
    }

    move(){
        if( this._xMovement === 0 && this._yMovement === 0 ){
            return;
        }

        let xPos = this.tail[ this.tail.length - 1 ].x + (this._xMovement * this.size );
        let yPos = this.tail[ this.tail.length - 1 ].y + (this._yMovement * this.size );

        this.tail.push({x: xPos, y: yPos});

        if( this.tail.length > this.maxLength){
            this.tail.shift();
        }
    }

    get getHead(){
        return this.tail[ this.tail.length -1 ];
    }

    //TODO this makes sure the x,y are exact. if it was smarter it would take
    //into consideration that this should be a range based on the size of the block
    //If we change the size of the board to a non-integer of 10, it may not ever work
    isTangled(){
        let head = this.getHead;
        let rest = this.tail.slice( 0, this.tail.length -1);

        return rest.some( snakeBit => {
            return( head.x === snakeBit.x && head.y === snakeBit.y);
        });
    }
}