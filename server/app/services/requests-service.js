import request from "../models/requests-model.js";


export const save = async (newRequest) => {
  const createRequest = new request(newRequest);
  return createRequest.save();
}


export const getCollection = async function getRequest(haveHeaderId) {
  try {
    const requestData = await request.findById({ haveHeaderId: haveHeaderId });
    return requestData;
  } catch (err) {
    if (err instanceof NotFoundError) {
      console.error(`Data not found for haveHeaderId: ${haveHeaderId}`);
      return null;
    }
    console.error(`Error: ${err}`);
    throw err;
  }
}



export const getAllCollections = async function getRequestsCollection() {
  try {
    const data = await request.find()
    const requestFromDb = { request: data };
    return requestFromDb;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserByRequestHeader = async function getRequestId(requestId) {
  try {
    const reqData = await request.findOne({ requestId: requestId });
    //  const password = haveData.password;
    return reqData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserByHaveHeader = async function getRequest(haveHeaderId) {
  try {
    const haveData = await request.findOne({ haveHeaderId: haveHeaderId });
    //  const password = haveData.password;
    return haveData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserByNeedHeader = async function getRequest(needHeaderId) {
  try {
    const needData = await request.findOne({ needHeaderId: needHeaderId });
    return needData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export const getUserByTradeItem = async function getRequest(tradeItemId) {
  try {
    const tradeData = await request.findOne({ tradeItemId: tradeItemId });
    return tradeData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}



export const deleteRequest = async (id) => {
  const requestDelete = request
    .findByIdAndDelete(id)
    .exec();
  return requestDelete;
}

export const get = async (id) => {
  const requestGet = request.find();
  return requestGet;
}

export const getById = async (id) => {
  const requestGet = request.findById(id).exec();
  return requestGet;
}


export const remove = async (id) => {
  const requestRemove = request.findByIdAndDelete(id).exec();
  return requestRemove;
}

export const search = async (params) => {
  const requestSearch = request.find(params).exec();
  return requestSearch;
}


export const getRequestDetails = async (requestId) => {
  try {
    const request1 = await request.findOne({ requestid: requestId }).populate('serviceID').populate('userId').populate("goodID");
    if (!request1) {
      return null;
    }
    return request1;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateRequest = async (id, { count, item1Id, item2Id, item3Id, tradedItemId }) => {
  const haveRequests = request
    .findByIdAndUpdate(id, { count, item1Id, item2Id, item3Id, tradedItemId }, { new: true })
    .exec();
  return haveRequests;
}
