import {Router} from "express";
import postController from '../controller/post.controller.js';

const router = Router();
router.get('/post', postController.getPostsByUser)
    .post('/post', postController.createPost)
export default router;
