class GameController {

    constructor( board, snake ){
        this._board = board;
        this._snake = snake;

        this._snake.reset( board.getCenterX, board.getCenterY );
        this._board.generateMarker( snake.size );

        this._setupKeyPressMappings();
        this._setupTouchSupport();

        this.refreshRate = 50;
    }

    run(){
        if( !this.running )
        {
            setInterval( () => {
                this._board.clear();

                if(!this._gameStopped ){
                    this._snake.move();
                }

                if(this._snake.isTangled() || this._board.isOutOfBounds( this._snake )){
                    this._snake.stop();
                    this._board.displayLoss();
                    this._gameStopped = true;
                }

                if( this._board.hasHitMarker( this._snake )){
                    this._snake.grow();
                    this._board.generateMarker( this._snake.size );
                }
                
                this._board.drawMarker();
                this._board.drawSnake( this._snake );
            }, this.refreshRate);
        }

        this.running = true;
    }

    _setupKeyPressMappings(){
        const keymapping = {
            38 : () => this._snake.changeDirection(0, -1),
            87 : () => this._snake.changeDirection(0, -1),
            37 : () => this._snake.changeDirection(-1, 0),
            65 : () => this._snake.changeDirection(-1, 0),
            40 : () => this._snake.changeDirection(0, 1),
            83 : () => this._snake.changeDirection(0, 1),
            39 : () => this._snake.changeDirection(1, 0),
            68 : () => this._snake.changeDirection(1, 0),
            27 : () => {
                this._snake.reset( board.getCenterX, board.getCenterY  );
                this._board.reset();
                this._board.generateMarker( this._snake.size );
                this._gameStopped = false;
            },
        };

        document.addEventListener( "keydown", (event) =>{
            if( keymapping[event.keyCode] ){
                keymapping[event.keyCode]();
            }
        });
    }

    _setupTouchSupport(){

    }
}