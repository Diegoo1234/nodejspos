const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

// Ruta para buscar un cliente
 
router.post('/buscarCliente', TaskController.buscarcliente);
 
 
module.exports = router;