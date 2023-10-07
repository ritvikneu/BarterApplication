import * as serviceService from './../services/service-service.js';
import { response } from 'express';


export const post = async (request,response) => {

    try {
        const newService = request.body;
        const savedService = await  serviceService.save(newService);
      setSuccessfulResponse(savedService,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const get = async (request,response) => {
    try {
    if(request.params.id){
     const servicesFromDb = await serviceService.getCollection(request.params.id);  
     setSuccessfulResponse(servicesFromDb,response);
    }else{
     const servicesFromDb = await serviceService.getAllCollections();
     setSuccessfulResponse(servicesFromDb,response);
     } 
     
     } catch (error) {
    setErrorResponse(error,response);  
  }

}


export const deleteService  = async (request,response) => {
    const id = request.params.id;
    try {
        const deleteService = await serviceService.deleteService(id);
        if (!deleteService) {
          return response.status(404).send("service not found");
        }
        setSuccessfulResponse(deleteService,response);
      } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
      }
}


export const patch  = async (request,response) => {
  const id = request.params.id;
  const { title, category, skill_level  } = request.body; // get the updated data from the request body
  try {
      const updateServices = await serviceService.updateServices(id, { title, category, skill_level });
      setSuccessfulResponse(updateServices,response);

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

