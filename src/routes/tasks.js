const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();
 
// Ruta para buscar un cliente
router.post('/buscarCliente', TaskController.buscarcliente);
router.post('/buscarcolaboradores', TaskController.buscarcolaboradores);
router.post('/buscarseries', TaskController.buscarseries);
 
module.exports = router;