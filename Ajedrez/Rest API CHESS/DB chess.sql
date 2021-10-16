alter table pieces add foreign key FK_idpawn_pieces(idpawn)
references pawn(idpawn);

insert into pawn values
(30,'1,0');

INSERT INTO pawn (pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8) 
values ("0,0", "0,0","0,0","0,0","0,0","0,0","0,0","0,0");

insert into pieces values
(71, '0,0','0,1','0,2','0,3','0,4','0,5','0,6','0,7', 70);

INSERT INTO pieces (towerleft, knightleft, king, bishopright, knightright, 
		towerright, bishopleft, queen, idpawn)
        VALUES ("71", '0,0','0,1','0,2','0,3','0,4','0,5','0,6');

select * from pieces where idpieces = 1;

select *
from pieces pc, pawn pw
where pc.idpawn = pw.idpawn and pc.idpieces = 21;


CREATE PROCEDURE piecesPositionAddOrEdit (
	IN _idpieces INT,
    IN _towerleft CHAR(5),
    IN _knightleft CHAR(5),
	IN _king CHAR(5),
    IN _bishopright CHAR(5),
	IN _knightright CHAR(5),
    IN _towerright CHAR(5),
	IN _bishopleft CHAR(5),
	IN _queen CHAR(5),
	IN _idpawn INT
)
BEGIN
	if _idpieces = 0 THEN
		INSERT INTO pieces (towerleft, knightleft, king, bishopright, knightright, 
		towerright, bishopleft, queen, idpawn)
        VALUES (_towerleft, _knightleft, _king, _bishopright, _knightright, 
		_towerright, _bishopleft, _queen, _idpieces);
        
        SET _idpieces = last_insert_id();
	ELSE
		UPDATE pieces
        SET	
			idpieces = _idpieces, 
			towerleft = _towerleft,
			knightleft = _knightleft,
			king = _king,
			bishopright = _bishopright,
			knightright = _knightright,
			towerright = _towerright,	
			bishopleft = _bishopleft,
			queen = _queen
            WHERE idpieces = _idpieces;
	END IF
	SELECT _idpieces AS idpieces
END
		