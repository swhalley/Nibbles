class Board {
    constructor( cssSelector ){
        this._canvas = document.querySelector(cssSelector); 
        this._ctx = canvas.getContext("2d");

        this.backgroundColor = "lightgrey";
    }

    get getCenterX() {
        return Math.floor( this._canvas.width/2 );
    }

    get getCenterY() { 
        return Math.floor( this._canvas.height/2 );
    }

    clear() {
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height );
    }

    reset(){
        this.clear();
    }

    drawSnake( snake ){
        this._ctx.fillStyle = snake.snakeColor;
        snake.tail.forEach(( pos ) => {
            this._ctx.fillRect( pos.x, pos.y, snake.size, snake.size );
        });
    }

    isOutOfBounds( snake ){
        let head = snake.getHead;
        return (head.x >= this._canvas.width || head.x < 0 || head.y >= this._canvas.height || head.y < 0 );
    }

    displayLoss(){
        let text = "You Lose";
        
        this._ctx.font = "120px Comic Sans, Comic Sans MS, cursive";
        this._ctx.fillStyle = "#FF2222";
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";
        
        this._ctx.fillText(text, this._canvas.width/2, this._canvas.height/2);
    }

    generateMarker( diameter ){
        this._markerX = Math.floor( Math.random() * (this._canvas.width/diameter))*diameter;
        this._markerY = Math.floor( Math.random() * (this._canvas.height/diameter))*diameter;

        this._radius = Math.floor( diameter / 2 );
    }

    drawMarker(){
        this._ctx.beginPath();
        this._ctx.arc(this._markerX + this._radius, this._markerY + this._radius, this._radius, 0, 2 * Math.PI, false);
        this._ctx.fillStyle = '#FF00FF';
        this._ctx.fill();
        this._ctx.lineWidth = 0;
        this._ctx.strokeStyle = '#FF00FF';
        this._ctx.stroke();
    }

    hasHitMarker( snake ){
        let head = snake.getHead;
        return ( head.x === this._markerX && head.y === this._markerY);
    }
}