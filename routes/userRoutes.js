const userController = require('../controller/UserController');

const router = require('express').Router();

router.route('/').post(userController.insertUser).get(userController.selectUserList);
router.route('/:id').get(userController.selectUser).put(userController.updateUser).delete(userController.deleteUser);

module.exports = router;