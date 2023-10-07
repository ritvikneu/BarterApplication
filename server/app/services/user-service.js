
import user from "../models/user-model.js";
// import { connection } from '.././app.js';
// import users from "../../user.json";

export const save = async (newUser) => {
  // for(let i =0; i<newuser.length; i++){
  const createUser = new user(newUser);
  return createUser.save();
  // }
}

export const getCollection = async function getUser(id) {
  try {
    const userData = await user.findById(id).exec();
    return userData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserName = async function getUser(id) {
  try {
    const userData = await user.findById(id).exec();
    return userData.userName;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserByEmail = async function getUser(emailId) {
  try {
    const userData = await user.findOne({ email: emailId });
  //  const password = userData.password;
    return userData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getAllCollections = async function getUserCollection() {

  try {

    const data = await user.find()
    const usersFromDb = { users: data }; // Wrapping the array of documents inside an object with a "users" property

    return usersFromDb;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const updateUsers = async (id, { userName, email, mobile, password }) => {
  console.log("user-service patch");
  const userUpdate = user
    .findByIdAndUpdate(id, {userName, email, mobile, password }, { new: true })
    .exec();
  return userUpdate;
}

export const deleteUsers = async (id) => {
  const userDelete = user
    .findByIdAndDelete(id)
    .exec();
  return userDelete;
}

export const get = async (id) => {
  const userGet = user.find();
  return userGet;
}

export const remove = async (id) => {
  const userRemove = user.findByIdAndDelete(id).exec();
  return userRemove;
}

export const search = async (params) => {
  const userSearch = user.find(params).exec();
  return userSearch;
}
