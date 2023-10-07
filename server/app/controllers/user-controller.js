import * as userService from './../services/user-service.js';
import { response } from 'express';


export const post = async (request,response) => {

    try {
        const newUser = request.body;
        const saveduser = await  userService.save(newUser);
      setSuccessfulResponse(saveduser,response);
        
    } catch (error) {
      setErrorResponse(error,response);  
    }
}

export const get = async (request,response) => {
    try {
    if(request.params.id){
     const usersFromDb = await userService.getCollection(request.params.id);  
     setSuccessfulResponse(usersFromDb,response);
    }else if(request.params.email){
      const usersFromDb = await userService.getUserByEmail(request.params.email);  
      setSuccessfulResponse(usersFromDb,response);
    }
    else{
     const usersFromDb = await userService.getAllCollections();
     setSuccessfulResponse(usersFromDb,response);
     } 
    //  setSuccessfulResponse(usersFromDb,response);
     
     } catch (error) {
    setErrorResponse(error,response);  
  }

}

export const getUsername = async (request,response) => {
  try {
  if(request.params.userName){
   const usersFromDb = await userService.getUserName(request.params.userName);  
   setSuccessfulResponse(usersFromDb,response);
  }
  //  setSuccessfulResponse(usersFromDb,response);
   
   } catch (error) {
  setErrorResponse(error,response);  
}

}

export const patch  = async (request,response) => {
    const id = request.params.id;

    const { userName, email, mobile, password } = request.body; // get the updated data from the request body
    try {
        console.log("user-controller patch");
        const updatedUser = await userService.updateUsers(id, { userName, email, mobile, password });
        setSuccessfulResponse(updatedUser,response);

      } catch (err) {
        console.error(`Error: ${err}`);
        response.status(500).send('Internal Server Error');
      }
}

export const deleting  = async (request,response) => {
    const id = request.params.id;
    try {
        const deletedUser = await userService.deleteUsers(id);
        if (!deletedUser) {
          return response.status(404).send("user not found");
        }
        setSuccessfulResponse(deletedUser,response);
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

// export default usersFromDb;