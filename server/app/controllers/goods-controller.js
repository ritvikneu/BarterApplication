import * as goodService from './../services/goods-service.js';
import { response } from 'express';

//const cloudinary = require("cloudinary").v2;


export const post = async (request,response) => {

    try {
        const newGoods = request.body;
        const savedGoods = await  goodService.save(newGoods);
      setSuccessfulResponse(savedGoods,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const get = async (request,response) => {
    // let goodssFromDb = "";
    try {
    if(request.params.id){
     const goodsFromDb = await goodService.getCollection(request.params.id);  
     setSuccessfulResponse(goodsFromDb,response);
    }else{
     const goodsFromDb = await goodService.getAllCollections();
     setSuccessfulResponse(goodsFromDb,response);
     } 
    //  setSuccessfulResponse(goodssFromDb,response);
     
     } catch (error) {
    setErrorResponse(error,response);  
  }

}


export const patch  = async (request,response) => {
    const id = request.params.id;
    const { title, category, goodValue  } = request.body; // get the updated data from the request body
    try {
        const updateGoods = await goodService.updateGoods(id, { title, category, goodValue });
        setSuccessfulResponse(updateGoods,response);

      } catch (err) {
        console.error(`Error: ${err}`);
        response.status(500).send('Internal Server Error');
      }
}

export const deleting  = async (request,response) => {
    const id = request.params.id;
    try {
        const deleteGoods = await goodService.deleteGoods(id);
        if (!deleteGoods) {
          return response.status(404).send("goods not found");
        }
        setSuccessfulResponse(deleteGoods,response);
      } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
      }
}


const setSuccessfulResponse = (obj,response) => {
    response.status(200); 
    response.json(obj);
}

const setErrorResponse = (err,response) => {
    response.status(500); 
    response.json({
        error: {
            message: err
        }
    });
}

// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "dqdojffsu",
//   api_key: "263532742727124",
//   api_secret: "F-eivej0pqiVPcAefu8BcCqXmSc",
// });

// const result = await cloudinary.uploader.upload(file.path);




// export default goodssFromDb;