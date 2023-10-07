import have from "../models/haves-model.js";
import { writeFile, unlink, readFile, appendFile } from 'fs/promises';


export const save = async (newHave) => {
        const createHave = new have(newHave);
        return createHave.save();
}


export const getCollection = async function getHave(id) {
    try{
        const haveData = await have.findById(id);
        return haveData;
    } catch (err) {
        console.error(`Error: ${err}`);
      } 
        return haveData;
}


export const getAllCollections = async function getHavesCollection() {    
    try {
        const data = await have.find()
        const haveFromDb = { have: data }; 
        return haveFromDb;
} catch (err) {
  console.error(`Error: ${err}`);
} 
}

export const getUserHaves = async function getHaves(userId) {
  try {
    const havesData = await have.find({ userId: userId });
  //  const password = userData.password;
    return havesData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const deleteHave = async (id) => {
  const haveDelete = have   
          .findByIdAndDelete(id)
          .exec();
          return haveDelete;
}

export const get = async (id) => {
const haveGet = have.find();
return haveGet;
}

export const remove = async (id) => {
const haveRemove = have.findByIdAndDelete(id).exec();
return haveRemove;
}

export const search = async (params) => {
const haveSearch = have.find(params).exec();
return haveSearch;
}


export const getHaveDetails = async (haveId) => {
  try {
      const have1 = await have.findOne({ haveid: haveId }).populate('serviceID').populate('userId').populate("goodID");
      if (!have1) {
          return null;
      }
      return have1;
  } catch (error) {
      console.error(error);
      return null;
  }
}

export const needToHave = async (need) => {
  const haveData = {
    "userId": need.userId ,
    "goodId": need.goodId,// Extract the _id field from the saved goods document
    "advertFlag" : false
  };
  const createhave = new have(haveData);
  return createhave.save();
}

export const updateHave = async (id,  { advertFlag, requestId, title, tradeId }) => {
  const haveUpdate = have   
          .findByIdAndUpdate(id, { advertFlag, requestId, title, tradeId }, { new: true })
          .exec();
          return haveUpdate;
}

