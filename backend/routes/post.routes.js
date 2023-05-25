import {Router} from "express";
import postController from '../controller/post.controller.js';

const router = Router();
router.get('/post', postController.getPosts)
    .get('/post/:id', postController.getOnePost)
    .put('/post/:id', postController.updatePost)
    .post('/post', postController.createPost)
    .post('/post/like', postController.likeAPost)
    .delete('/post/like', postController.removeLike)
export default router;
