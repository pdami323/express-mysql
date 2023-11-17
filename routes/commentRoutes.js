const commentController = require('../controller/CommentController');
const router = require('express').Router();

router.route('/').post(commentController.insertComment);
router.get('/:id', commentController.selectComment);
module.exports = router;