const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/pos', TaskController.index_renew);
router.get('/tasks', TaskController.index);
router.get('/crear', TaskController.create);
router.post('/crear', TaskController.store);
router.post('/tasks/delete', TaskController.destroy);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/edit/:id', TaskController.update);

module.exports = router;