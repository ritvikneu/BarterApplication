import express from "express";
import * as requestController from "../controllers/request-controller.js";

const requestRouter = express.Router();

requestRouter.route('/')
        .post(requestController.post)
        .get(requestController.get);
requestRouter.route('/:id')
        .patch(requestController.patch)
        .get(requestController.get);
//.delete(requestController.deleting)
requestRouter.route('/requestId/:requestId')
        .get(requestController.getByRequestId)
        .delete(requestController.deleteRequests);
requestRouter.route('/haveHeaderId/:haveHeaderId')
        .get(requestController.getByHaveId);
requestRouter.route('/needHeaderId/:needHeaderId')
        .get(requestController.getByNeedId)
requestRouter.route('/tradeItemId/:tradeItemId')
        .get(requestController.getByTradeitemId);



export default requestRouter;