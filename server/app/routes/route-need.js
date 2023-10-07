import express from "express";
import * as needController from "../controllers/need-controller.js";

const needRouter = express.Router();

needRouter.route('/')
        .post(needController.post)
        .get(needController.get);
needRouter.route('/:id')
        .delete(needController.deleteNeed)
        .get(needController.get)
        .patch(needController.patch);
// .get(needController.getNeedDetails);       
needRouter.route('/haveToNeed')
        .post(needController.haveToNeed);
needRouter.route('/userId/:userId')
        .get(needController.getUserNeeds);

export default needRouter;