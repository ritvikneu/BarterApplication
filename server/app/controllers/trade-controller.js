import * as trades from './../services/trades-service.js';

export const post = async (request,response) => {
    try {
        const newTrade = request.body;
        const saveTrade= await  trades.save(newTrade);
      setSuccessfulResponse(saveTrade,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const get = async (request,response) => {
    try {
    if(request.params.id){
     const tradesFromDb = await trades.getCollection(request.params.id);  
     setSuccessfulResponse(tradesFromDb,response);
    }else{
     const tradesFromDb = await trades.getAllCollections();
     setSuccessfulResponse(tradesFromDb,response);
     } 
     ``
     } catch (error) {
    setErrorResponse(error,response);  
  }
}

export const deleteTrades  = async (request,response) => {
    const id = request.params.id;
    try {
        const deleteTrades = await trades.deleteService(id);
        if (!deleteTrades) {
          return response.status(404).send("haves not found");
        }
        setSuccessfulResponse(deleteTrades,response);
      } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
      }
}

// export const getTradeDetails = async (request,response) => {
//   const id = request.params.id;
//   try {
//     const haveWithGoods = await have.getHaveDetails(id);
//     if (!haveWithGoods) {
//       return response.status(404).send("haves not found");
//     }
//     setSuccessfulResponse(haveWithGoods,response);
//   }catch (err) {
//     console.error(err);
//     response.status(500).send("Server error");
//   }
// } 


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



