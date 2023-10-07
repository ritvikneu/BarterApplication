import * as requests from './../services/requests-service.js';


export const post = async (request, response) => {

  try {
    const newRequest = request.body;
    const saveRequest = await requests.save(newRequest);
    setSuccessfulResponse(saveRequest, response);

  } catch (error) {
    setErrorResponse(error, response);
  }
}

export const get = async (request, response) => {
  try {
    console.log("request controller");
    if (request.params.id) {
      console.log("request controller : by id ");
      const requestsFromDb = await requests.getById(request.params.id);
      setSuccessfulResponse(requestsFromDb, response);
    }
    else {
      const requestsFromDb = await requests.getAllCollections();
      setSuccessfulResponse(requestsFromDb, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }

}

export const getByRequestId = async (request, response) => {
  try {
    console.log("request controller : getBy requestId");
    if (request.params.requestId) {
      const requestsFromDb = await requests.getUserByRequestHeader(request.params.requestId);
      setSuccessfulResponse(requestsFromDb, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }

}

export const getByHaveId = async (request, response) => {
  try {
    console.log("request controller : getBy haveID");
    if (request.params.haveHeaderId) {
      const requestsFromDb = await requests.getUserByHaveHeader(request.params.haveHeaderId);
      setSuccessfulResponse(requestsFromDb, response);
    }
    else {
      const requestsFromDb = await requests.getAllCollections();
      setSuccessfulResponse(requestsFromDb, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }

}

export const getByNeedId = async (request, response) => {
  try {
    console.log("request controller : getBy needID");
    if (request.params.needHeaderId) {
      const requestsFromDb = await requests.getUserByNeedHeader(request.params.needHeaderId);
      setSuccessfulResponse(requestsFromDb, response);
    }
    else {
      const requestsFromDb = await requests.getAllCollections();
      setSuccessfulResponse(requestsFromDb, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }

}

export const getByTradeitemId = async (request, response) => {
  try {
    console.log("request controller : getBy needID");
    if (request.params.tradeItemId) {
      const requestsFromDb = await requests.getUserByTradeItem(request.params.tradeItemId);
      setSuccessfulResponse(requestsFromDb, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }

}




export const deleteRequests = async (request, response) => {
  const id = request.params.id;
  try {
    const deleteRequests = await requests.deleteRequest(id);
    if (!deleteRequests) {
      return response.status(404).send("request not found");
    }
    setSuccessfulResponse(deleteRequests, response);
  } catch (err) {
    console.error(err);
    response.status(500).send("Server error");
  }
}


export const patch = async (request, response) => {
  const id = request.params.id;
  const { count, item1Id, item2Id, item3Id, tradedItemId } = request.body; // get the updated data from the request body
  try {
    const updateRequest = await requests.updateRequest(id, { count, item1Id, item2Id, item3Id, tradedItemId });
    setSuccessfulResponse(updateRequest, response);

  } catch (err) {
    console.error(`Error: ${err}`);
    response.status(500).send('Internal Server Error');
  }
}


const setSuccessfulResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
}

const setErrorResponse = (err, response) => {
  response.status(500);
  response.json({
    error: {
      message: err
    }
  });
}



