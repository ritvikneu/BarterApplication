import  express  from "express";
import * as goodsController from "../controllers/goods-controller.js";

//const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const goodsRouter = express.Router();


// goodsRouter.post("/upload", upload.single("file"), async (req, res) => {
//   const file = req.file;
//   // call the function to upload the image to Cloudinary
// });

goodsRouter.route('/')
        .post(goodsController.post)
        .get(goodsController.get);
goodsRouter.route('/:id')
        .patch(goodsController.patch)
        .get(goodsController.get)
        .delete(goodsController.deleting);
        
export default goodsRouter;