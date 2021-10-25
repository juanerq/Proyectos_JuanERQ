import { HTML_TAGS, CONFIG_CHESS } from '../chess.js'

function sizeChessCanvas(){
    
    let width = CONFIG_CHESS.size_square * CONFIG_CHESS.num_columns;
    let height = CONFIG_CHESS.size_square * CONFIG_CHESS.num_rows;
    
    HTML_TAGS.canvas.width = width;
    HTML_TAGS.canvas.height = height;
    
    //--------> DIBUJAR CUADRADOS <--------//
    
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        for(let j = 0; j < CONFIG_CHESS.num_columns; j++){
            if((i + j) % 2 == 0){
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square1);
            }else{
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square2);
            }
        
        }
    }
}
    

function drawSquare(ix,iy,fx,fy, color){
    HTML_TAGS.ctx.beginPath();
    HTML_TAGS.ctx.rect(ix, iy, fx, fy);
    HTML_TAGS.ctx.fillStyle = color;
    HTML_TAGS.ctx.fill();
    HTML_TAGS.ctx.closePath();
}
     
export { sizeChessCanvas };