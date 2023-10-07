const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Define the API endpoints
const serviceEndpoint = 'http://localhost:7777/barterServices';
const havesEndpoint = 'http://localhost:7777/barterHaves';

// Define the request data for the service endpoint
const serviceData = {
    "serviceID": "123123123123",
    "title": "String",
    "category": "String",
    "description" : "String", 
    "skill_level" : 1,
    "duration": 2,
    "value": 3
};

// Make the first POST request to the service endpoint
axios.post(serviceEndpoint, serviceData)
  .then((response) => {
    const _id = response.data._id; // retrieve the _id value from the response
    console.log(`Retrieved _id: ${_id}`);

    // Define the request data for the haves endpoint
    const havesData = {
        "serviceID": _id, // add the _id value to the request body
        "haveid" :  "7",
        "userId" : "6427ac00a2e3fab218496c9d",  
    };

    // Make the second POST request to the haves endpoint
    return axios.post(havesEndpoint, havesData);
  })
  .then((response) => {
    console.log(`Successfully posted to haves endpoint with response: ${response.data}`);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

// Start the Express app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
