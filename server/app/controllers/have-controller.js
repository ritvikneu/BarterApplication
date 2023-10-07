import * as have from './../services/haves-service.js';


export const post = async (request,response) => {
    try {
        const newservice = request.body;
        const savedservice = await  have.save(newservice);
      setSuccessfulResponse(savedservice,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const needToHave = async (request,response) => {
  try {
    const newservice = request.body;
    const savedservice = await  have.needToHave(newservice);
  setSuccessfulResponse(savedservice,response);
    
  } catch (error) {
    setErrorResponse(error,response);  
  }
}


export const get = async (request,response) => {
    try {
    if(request.params.id){
     const havesFromDb = await have.getCollection(request.params.id);  
     setSuccessfulResponse(havesFromDb,response);
    }else{
     const havesFromDb = await have.getAllCollections();
     setSuccessfulResponse(havesFromDb,response);
     } 
     } catch (error) {
    setErrorResponse(error,response);  
  }
}

export const getUserHaves = async (request,response) => {
  try {
  if(request.params.userId){
   const havesFromDb = await have.getUserHaves(request.params.userId);  
   setSuccessfulResponse(havesFromDb,response);
  }
   } catch (error) {
  setErrorResponse(error,response);  
}
}

export const deleteHave  = async (request,response) => {
    const id = request.params.id;
    try {
        const deleteHave = await have.deleteHave(id);
        if (!deleteHave) {
          return response.status(404).send("haves not found");
        }
        setSuccessfulResponse(deleteHave,response);
      } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
      }
}

export const getHaveDetails = async (request,response) => {
  const id = request.params.id;
  try {
    const haveWithGoods = await have.getHaveDetails(id);
    if (!haveWithGoods) {
      return response.status(404).send("haves not found");
    }
    setSuccessfulResponse(haveWithGoods,response);
  }catch (err) {
    console.error(err);
    response.status(500).send("Server error");
  }
} 

export const patch  = async (request,response) => {
  const id = request.params.id;
  const { advertFlag, requestId, title,tradeId  } = request.body; // get the updated data from the request body
  try {
      const updateHave = await have.updateHave(id, { advertFlag, requestId, title, tradeId });
      setSuccessfulResponse(updateHave,response);

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



