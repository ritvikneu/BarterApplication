import service from "../models/services-model.js";
import { writeFile, unlink, readFile, appendFile } from 'fs/promises';
import { getUserName } from "./user-service.js";


// export const save = async (newService) => {
//         const createService = new service(newService);
//         return createService.save();
// }

export const save = async (newService) => {
  const createService = new service(newService);  //return createGoods.save();
  const savedService = await createService.save();
  console.log("type : ",newService.type )
  // If it is a have then create a have object 
  if (newService.type == 'have')
  {
    console.log("ID : ",savedService._id.toString())
    const havesData = {
      "userId": newService.userId ,
      "serviceId": savedService._id.toString(), // Extract the _id field from the saved goods document
      "advertFlag" : false,
      "title": savedService.title.toString(),
      "image": savedService.photo.toString(),
      "username": newService.username,
      "estimateValue":newService.estimateValue,
      "date" : newService.date,
      "description" : newService.description
    };

    console.log(havesData);
    fetch('http://localhost:7777/barterHaves/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(havesData)
          })
          .then(response => response.json())
          .then(data => {
              console.log("data from server", data);
          })
          .catch(error => console.error(error));
  }

  // If it is a need then create a need object in database
  if (newService.type == 'need')
  {
    console.log("###1 entered need");
    console.log("###2 ",savedService._id.toString());
    console.log("userID : ",newService.userId )
    const needData = {
      "userId": newService.userId ,
      "serviceId": savedService._id.toString(), // Extract the _id field from the saved goods document
      "advertFlag" : false,
      "title": savedService.title.toString(),
      "image": savedService.photo.toString(),
      "username": newService.username,
      "estimateValue":newService.estimateValue,
      "date" : newService.date,
      "description" : newService.description
    };
    console.log("###3", needData);
    
    //return axios.post(havesEndpoint, havesData);
    fetch('http://localhost:7777/barterNeeds/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(needData)
          })
          .then(response => response.json())
          .then(data => {
              console.log("data from server", data);
              //props.onAdd(data); // pass the new data to the parent component
          })
          .catch(error => console.error(error));
  }
  return savedService;
}

export const getCollection = async function getService(id) {
    try{
        const serviceData = await service.findById(id);
        return serviceData;
    } catch (err) {
        console.error(`Error: ${err}`);
      } 
        return serviceData;
}

export const getAllCollections = async function getUserCollection() {    
    try {
        const data = await service.find()
        const serviceFromDb = { service: data }; 
        return serviceFromDb;
} catch (err) {
  console.error(`Error: ${err}`);
} 
}

export const updateServices = async (id,  { title, category, skill_level }) => {
  const serviceUpdate = service   
          .findByIdAndUpdate(id, { title, category, skill_level }, { new: true })
          .exec();
          return serviceUpdate;
}




export const deleteService = async (id) => {
  const serviceDelete = service   
          .findByIdAndDelete(id)
          .exec();
          return serviceDelete;
}

export const get = async (id) => {
const userGet = service.find();
return userGet;
}

export const remove = async (id) => {
const userRemove = service.findByIdAndDelete(id).exec();
return userRemove;
}

export const search = async (params) => {
const userSearch = service.find(params).exec();
return userSearch;
}

