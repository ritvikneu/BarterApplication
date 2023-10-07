import userRouter from './route-barter.js';
import goodsRouter from './route-goods.js';
import serviceRouter from './route-service.js';
import haveRoute from './route-have.js';
import needRoute from './route-need.js';
import tradeRoute from './route-trade.js';
import request from './route-request.js';
import email from './route-email.js';
import finalEmail from './route-finalEmail.js';
const route = (app) => {
    app.use('/barterUser',userRouter);
    app.use('/barterGoods',goodsRouter);
    app.use('/barterServices', serviceRouter);
    app.use('/barterHaves',haveRoute);
    app.use('/barterNeeds',needRoute);
    app.use('/barterTrades',tradeRoute);
    app.use('/barterRequests',request );
    app.use('/send-email', email);
    app.use('/final-email', finalEmail);
}

export default route;