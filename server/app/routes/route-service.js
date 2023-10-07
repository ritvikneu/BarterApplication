import express from "express";
import * as serviceController from "../controllers/service-controller.js";

const serviceRouter = express.Router();

serviceRouter.route('/')
        .post(serviceController.post)
        .get(serviceController.get);
serviceRouter.route('/:id')
        .get(serviceController.get)
        .delete(serviceController.deleteService)
        .patch(serviceController.patch);


export default serviceRouter;