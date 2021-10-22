const express = require('express');
const updatePositionPiecesController = require('../controllers/updatePositionPieces-controller');
const router = express.Router();

router.put('/', updatePositionPiecesController.updatePositionPieces);

module.exports = router;