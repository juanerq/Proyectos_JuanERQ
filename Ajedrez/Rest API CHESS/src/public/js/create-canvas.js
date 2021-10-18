import { canvas, ctx, CONFIG_CHESS } from '../chess.js'

function sizeChessCanvas(){
    
    let width = CONFIG_CHESS.size_square * CONFIG_CHESS.num_colums;
    let height = CONFIG_CHESS.size_square * CONFIG_CHESS.num_rows;
    
    canvas.width = width;
    canvas.height = height;
    
    //--------> DIBUJAR CUADRADOS <--------//
    
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        for(let j = 0; j < CONFIG_CHESS.num_colums; j++){
            if((i + j) % 2 == 0){
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square1);
            }else{
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square2);
            }
        
        }
    }
}
    

function drawSquare(ix,iy,fx,fy, color){
    ctx.beginPath();
    ctx.rect(ix, iy, fx, fy);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
     
export { sizeChessCanvas };