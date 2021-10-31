const putPositionPieces = async (positionPieces, idgame) => {
    try {
        const resPieces = await fetch(`/${idgame}`,{
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(positionPieces),
            
        })
        const data = await resPieces.json(); 
        console.log('actualizado');

    }catch(error) {
        console.log(error);
    }
}

export { putPositionPieces };