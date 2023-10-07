import * as need from './../services/needs-service.js';


export const post = async (request,response) => {

    try {
        const newService = request.body;
        const savedService = await  need.save(newService);
      setSuccessfulResponse(savedService,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const haveToNeed = async (request,response) => {

  try {
      const newService = request.body;
      const savedService = await  need.haveToNeed(newService);
      console.log("in need Controller : ", newService);
      console.log("in need Controller : ", savedService);
    setSuccessfulResponse(savedService,response);
      
  } catch (error) {
    setErrorResponse(error,response);  
  }
}
export const getUserNeeds = async (request,response) => {
  try {
  if(request.params.userId){
   const needsFromDb = await need.getUserNeeds(request.params.userId);  
   setSuccessfulResponse(needsFromDb,response);
  }
   } catch (error) {
  setErrorResponse(error,response);  
}
}



export const get = async (request,response) => {
    try {
    if(request.params.id){
     const servicesFromDb = await need.getCollection(request.params.id);  
     setSuccessfulResponse(servicesFromDb,response);
    }else{
     const servicesFromDb = await need.getAllCollections();
     setSuccessfulResponse(servicesFromDb,response);
     } 
     
     } catch (error) {
    setErrorResponse(error,response);  
  }

}


export const deleteNeed  = async (request,response) => {
    const id = request.params.id;
    try {
        const deleteService = await need.deleteNeed(id);
        if (!deleteService) {
          return response.status(404).send("needs not found");
        }
        setSuccessfulResponse(deleteService,response);
      } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
      }
}

export const getNeedDetails = async (request,response) => {
  const id = request.params.id;
  try {
    const needWithGoods = await need.getNeedDetails(id);

    // if (!needWithGoods) {
    //   return response.status(404).send("needs not found");
    // }
    setSuccessfulResponse(needWithGoods,response);
  }catch (err) {
    console.error(err);
    response.status(500).send("Server error");
  }
} 



export const patch  = async (request,response) => {
  const id = request.params.id;
  const { advertFlag, requestId, title, tradeId  } = request.body; // get the updated data from the request body
  try {
      const updateNeed = await need.updateNeed(id, { advertFlag, requestId, title, tradeId });
      setSuccessfulResponse(updateNeed,response);

    } catch (err) {
      console.error(`Error: ${err}`);
      response.status(500).send('Internal Server Error');
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



