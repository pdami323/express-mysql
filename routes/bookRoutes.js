const bookController = require('../controller/BookController');

const router = require('express').Router();
router.route('/').post(bookController.insertBook);
router.route('/:id').get(bookController.selectBook);

module.exports = router;