import express from "express";
import * as haveController from "../controllers/have-controller.js";

const haveRouter = express.Router();

haveRouter.route('/')
        .post(haveController.post)
        .get(haveController.get);
haveRouter.route('/:id')
        .delete(haveController.deleteHave)
        .get(haveController.get)
        .patch(haveController.patch);
haveRouter.route('/needToHave')
        .post(haveController.needToHave);
haveRouter.route('/userId/:userId')
        .get(haveController.getUserHaves);
haveRouter.route('/haveGoods/:userId')
        .get(haveController.getUserHaves);

export default haveRouter;