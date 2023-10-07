
import goods from "../models/goods-model.js";
import { writeFile, unlink, readFile, appendFile } from 'fs/promises';
import user from "../models/user-model.js";
import { getUserName } from "./user-service.js";

export const save = async (newGoods) => {
  const createGoods = new goods(newGoods);
  //return createGoods.save();
  const savedGoods = await createGoods.save();
  console.log("type : ", newGoods.type)
  // If it is a have then create a have object \



  if (newGoods.type == 'have') {
    console.log("goodID : ", savedGoods._id.toString())
    const havesData = {
      "userId": newGoods.userId,
      "goodId": savedGoods._id.toString(), // Extract the _id field from the saved goods document
      "advertFlag": false,
      "title": savedGoods.title.toString(),
      "image": savedGoods.photo.toString(),
      "username": newGoods.username,
      "estimateValue":newGoods.estimateValue,
      "date" : newGoods.date,
      "description" : newGoods.description
    };
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
  if (newGoods.type == 'need') {
    console.log("###1 entered need");
    console.log("###2 ", savedGoods._id.toString());
    console.log("userID : ", newGoods.userId)
    const needData = {
      "userId": newGoods.userId,
      "goodId": savedGoods._id.toString(), // Extract the _id field from the saved goods document
      "advertFlag": false,
      "title": savedGoods.title.toString(),
      "image": savedGoods.photo.toString(),
      "username": newGoods.username,
      "estimateValue":newGoods.estimateValue,
      "date" : newGoods.date,
      "description" : newGoods.description
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

  return savedGoods;
}
export const getCollection = async function getGoods(id) {
  try {
    const goodsData = await goods.findById(id);
    return goodsData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return goodsData;
}

export const getAllCollections = async function getGoodsCollection() {

  try {
    const data = await goods.find()
    const goodsFromDb = { goods: data }; // Wrapping the array of documents inside an object with a "goods" property

    return goodsFromDb;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const updateGoods = async (id, { title, category, goodValue }) => {
  const goodsUpdate = goods
    .findByIdAndUpdate(id, { title, category, goodValue }, { new: true })
    .exec();
  return goodsUpdate;
}

export const deleteGoods = async (id) => {
  const goodsDelete = goods
    .findByIdAndDelete(id)
    .exec();
  return goodsDelete;
}

export const get = async (id) => {
  const goodsGet = goods.find();
  return goodsGet;
}

export const remove = async (id) => {
  const goodsRemove = goods.findByIdAndDelete(id).exec();
  return goodsRemove;
}

export const search = async (params) => {
  const goodSearch = goods.find(params).exec();
  return goodSearch;
}
