import axios from "axios";
import * as haves from '../Actions/HaveAction';
import * as needs from '../Actions/NeedAction';
import * as user from '../Actions/UserAction';


const API_URL = "http://localhost:7777/";
const headers = {
  'Content-Type': 'application/json',
}

/////=------ HAVES
export const GetAllHaves = () => async dispatch => {
    console.log("getAllHaves: api.js 1");
    const headers = {
      'Content-Type': 'application/json',
    }
    const url = "http://localhost:7777/barterHaves";
    try {
      console.log("getAllHaves: api.js 2");
  
      const response = await axios.get(url, { headers });
      dispatch(haves.getAllHaves(response.data));
      console.log("getAllHaves: api.js 3");
      console.log("getAllHaves: api.js 4: ", response.data)
  
      return response.data;
  
    } catch (error) {
      dispatch(haves.havesError(error));
    }

  };

  export const getSingleHave = (haveID) => async dispatch => {
    const urlLogin = `http://localhost:7777/barterHaves/${haveID}`;
    console.log("api.js GetSingleHave");
  
    try {
    const responseLogin = await axios.get(urlLogin, { headers });
    dispatch(haves.getSingleHave(responseLogin.data));
    console.log("api.js reducer call to GetSingleHave  responseLogin");
    console.log(responseLogin.data);
    } catch (error) {
      dispatch(haves.havesError(error));
    }
  };

  export const resetHave = (haveID) => async dispatch => {
    const urlLogin = `http://localhost:7777/barterHaves/${haveID}`;
    console.log("api.js GetSingleHave");
  
    try {
    const responseLogin = await axios.get(urlLogin, { headers });
    dispatch(haves.getSingleHave(responseLogin.data));
    console.log("api.js reducer call to GetSingleHave  responseLogin");
    console.log(responseLogin.data);
    } catch (error) {
      dispatch(haves.havesError(error));
    }
  };

  ////---HAVES

  export const resetHaveNeed = () => async dispatch => {
    dispatch(haves.resetHave());
    dispatch(needs.resetNeed());
    console.log("have and need reset")
  };


  ///User Reducer 
//Barter Login API
export const login = (emailID) => async dispatch => {
  const urlLogin = `http://localhost:7777/barterUser/email/${emailID}`;
  console.log("api.js BarterUser");

  try {
  const responseLogin = await axios.get(urlLogin, { headers });
  dispatch(user.getSingleUser(responseLogin.data));
  console.log("api.js reducer call to getSingleUser details responseLogin");
  console.log(responseLogin.data);
  } catch (error) {
    console.log('Unable to login');
    dispatch(user.userError(error));
  }
};

export const getAllUsers = () => async dispatch => {
  const urlLogin = `http://localhost:7777/barterUser/`;
  // console.log("api.js BarterUsers ");

  try {
  const responseLogin = await axios.get(urlLogin, { headers });
  dispatch(user.getAllUser(responseLogin.data));
  // console.log("api.js reducer call to getAllUsers details responseLogin");
  // console.log(responseLogin.data);
  // console.log(responseLogin.data.users[0]);
  } catch (error) {
    dispatch(user.userError(error));
  }
};
  ////
  

// };

///Need Reducer
export const GetAllNeeds = () => async dispatch => {
    console.log("getAllNeeds: api.js 2.1");
    const headers = {
      'Content-Type': 'application/json',
    }
    const url = "http://localhost:7777/barterNeeds";
    try {
      console.log("getAllNeeds: api.js 2.2");
  
      const response = await axios.get(url, { headers });
      dispatch(needs.getAllNeeds(response.data));
      console.log("getAllNeeds: api.js 2.3");
      console.log(response.data);
  
      return response.data;
  
    } catch (error) {
      dispatch(needs.NEEDSError(error));
    }
};

export const getSingleNeed = (needID) => async dispatch => {
  const urlLogin = `http://localhost:7777/barterNeeds/${needID}`;
  console.log("api.js GetSingleNeed");

  try {
  const responseLogin = await axios.get(urlLogin, { headers });
  dispatch(needs.getSingleNeed(responseLogin.data));
  console.log("api.js reducer call to GetSingleNeed  responseLogin");
  console.log(responseLogin.data);
  } catch (error) {
    dispatch(needs.NEEDSError(error));
  }
};

/////////
