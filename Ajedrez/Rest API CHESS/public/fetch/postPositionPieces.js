import { GAME_PROGRESS, socket } from '../chess.js';


const postPositionPieces = async (positionPieces) => {
    try {
        const resPieces = await fetch("/",{
            method: 'POST',
            body: JSON.stringify(positionPieces),
            headers: { "Content-type": "application/json" }
        })
        const data = await resPieces.json(); 
        GAME_PROGRESS.idgame = data.idgame;

        socket.emit( 'enviar-pospiezas',data.results || 'Buscando idgame...', () => {
            console.log('Tablero creado correctamente');
        });

    } catch(error) {
        console.log(error);
    }
}

export { postPositionPieces };