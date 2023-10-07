import  express  from "express";
import * as userController from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route('/')
        .post(userController.post)
        .get(userController.get);
userRouter.route('/:id')
        .patch(userController.patch)
        .get(userController.get)
        .delete(userController.deleting)
userRouter.route('/email/:email')
        .get(userController.get)
        .get(userController.patch)
userRouter.route('/userName/:userName')
                .get(userController.getUsername)
        
export default userRouter;