const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get('/new', postsController.getNewPost);
postsRouter.post('/new', postsController.createPost);

postsRouter.delete('/:id', postsController.deletePost);

module.exports = postsRouter;