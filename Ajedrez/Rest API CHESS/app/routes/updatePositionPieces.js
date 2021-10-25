const express = require('express');
const updatePositionPiecesController = require('../controllers/updatePositionPieces-controller');
const router = express.Router();

router.put('/:idgame', updatePositionPiecesController.updatePositionPieces);

module.exports = router;