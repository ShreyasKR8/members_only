const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get('/new', postsController.getNewPost);
postsRouter.post('/new', postsController.createPost);

module.exports = postsRouter;