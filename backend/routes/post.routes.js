import {Router} from "express";
import postController from '../controller/post.controller.js';

const router = Router();
router.get('/post', postController.getPosts)
    .get('/post/:id', postController.getOnePost)
    .post('/post', postController.createPost)
    .post('/post/like', postController.likeAPost)
export default router;
