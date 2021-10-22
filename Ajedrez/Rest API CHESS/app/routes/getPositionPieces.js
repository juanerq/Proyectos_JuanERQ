const express = require('express');
const getPositionPiecesController = require('../controllers/getPositionPieces-controller');
const router = express.Router();

router.get('/:idgame', getPositionPiecesController.getPositionPieces);

module.exports = router;