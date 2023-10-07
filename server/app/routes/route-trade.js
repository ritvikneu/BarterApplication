import express from "express";
import * as tradeController from "../controllers/trade-controller.js";

const tradeRouter = express.Router();

tradeRouter.route('/')
    .post(tradeController.post)
    .get(tradeController.get);
tradeRouter.route('/:id')
    .delete(tradeController.deleteTrades)
    .get(tradeController.get);
// .get(haveController.getHaveDetails);

export default tradeRouter;