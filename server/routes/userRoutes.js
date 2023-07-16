const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;
