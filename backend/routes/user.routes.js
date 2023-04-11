import {Router} from "express";
import userController from '../controller/user.controller.js';

const router = Router();
router.get('/users', userController.getUsers)
    .get('/user/:id', userController.getOneUser)
    .post('/user', userController.createUser)
    .post('/user/login', userController.logIn)
    .put('/user', userController.updateUser)
    .delete('/user/:id', userController.deleteUser)
export default router;
