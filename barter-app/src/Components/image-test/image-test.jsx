import React, { useState } from 'react'

export const ImageUploadForm = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "br92w6k8");
    data.append("cloud_name", "dqdojffsu");

    fetch("https://api.cloudinary.com/v1_1/dqdojffsu/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        setUrl(data.url);
        saveImageToDatabase(data.url);
      })
      .catch(err => console.log(err));
  };
  
  const saveImageToDatabase = async (imageUrl) => {
    console.log("### 7 entered save image to db");
    const jbody = {
      "goodId": 1111111,
      "title": "cloudinary test",
      "category": "Electronics",
      "description": "Android",
      "brand": "OnePlus",
      "photo": imageUrl,
      "goodValue": 1000,
      "condition": "New",
      "quantity": 10,
      "type": "need", 
      "userId": "642369bf01221017f7798eac"
    };
    console.log("### stringify : ",JSON.stringify({ jbody }));

    fetch('http://localhost:7777/barterGoods', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jbody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("data from server", data);
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} alt="Uploaded image" />
      </div>
    </div>
  )
};
