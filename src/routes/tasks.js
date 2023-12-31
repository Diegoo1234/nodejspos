const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();
 
// Ruta para buscar un cliente
router.post('/buscarCliente', TaskController.buscarcliente);
router.post('/buscarcolaboradores', TaskController.buscarcolaboradores);
router.post('/buscarseries', TaskController.buscarseries);
router.post('/buscarcorrelativo', TaskController.buscarcorrelativo);
router.post('/buscarproducts', TaskController.buscarproducts);
module.exports = router;