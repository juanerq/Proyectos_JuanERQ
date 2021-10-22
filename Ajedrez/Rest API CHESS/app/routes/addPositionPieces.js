const express = require('express');
const addPositionPiecesController = require('../controllers/addPositionPieces-controller');
const router = express.Router();

router.post('/', addPositionPiecesController.addPositionPieces);

module.exports = router;