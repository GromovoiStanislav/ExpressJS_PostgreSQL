const Router = require('express').Router;
const router = Router();
const postController = require('../controllers/post.controler');

router.post('/post', postController.createPost);
router.get('/post', postController.getPostsByUser);

module.exports = router;
