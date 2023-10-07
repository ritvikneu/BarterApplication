import need from "../models/needs-model.js";
import { writeFile, unlink, readFile, appendFile } from 'fs/promises';


export const save = async (newNeed) => {
        const createNeed = new need(newNeed);
        return createNeed.save();
}


export const getCollection = async function getneed(id) {
    try{
        const needData = await need.findById(id);
        return needData;
    } catch (err) {
        console.error(`Error: ${err}`);
      } 
        return needData;
}


export const getAllCollections = async function getUserCollection() {    
    try {
        const data = await need.find()
        const needFromDb = { need: data }; 
        return needFromDb;
} catch (err) {
  console.error(`Error: ${err}`);
} 
}

export const deleteNeed = async (id) => {
  const needDelete = need   
          .findByIdAndDelete(id)
          .exec();
          return needDelete;
}

export const get = async (id) => {
const needGet = need.find();
return needGet;
}

export const remove = async (id) => {
const needRemove = need.findByIdAndDelete(id).exec();
return needRemove;
}

export const search = async (params) => {
const needSearch = need.find(params).exec();
return needSearch;
}

export const getNeedDetails = async (needId) => {
  try {
    const { ObjectId } = require('mongoose');
      const need1 = await need.findOne({_id: ObjectId(needId)}).populate('userId goodId');
      return need1;
  } catch (error) {
      console.error(error);
  }
}

// export const getNeedDetails = async (needId) => {
//   try {
//       const need1 = await need.findOne({_id: ObjectId(needId)}).populate('userId goodId');
//       // if (!need1) {
//       //     return null;
//       // }
//       return need1;
//   } catch (error) {
//       console.error(error);
//       // return null;
//   }
// }


export const haveToNeed = async (have) => {
  const needData = {
    "userId": have.userId ,
    "goodId": have.goodId,// Extract the _id field from the saved goods document
    "advertFlag" : true
  };
  const createhave = new need(needData);
  return createhave.save();
}

export const getUserNeeds = async function getNeeds(userId) {
  try {
    const needsData = await need.find({ userId: userId });
  //  const password = userData.password;
    return needsData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const updateNeed = async (id,  { advertFlag, requestId, title, tradeId }) => {
  const needUpdate = need   
          .findByIdAndUpdate(id, { advertFlag, requestId, title, tradeId }, { new: true })
          .exec();
          return needUpdate;
}
