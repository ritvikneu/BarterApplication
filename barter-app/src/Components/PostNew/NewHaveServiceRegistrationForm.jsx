import React, { useState,useEffect } from 'react';
import './NewHaveServiceRegistrationForm.css';
import './NewNeedGoodRegistrationForm.css';
import Navbar from '../Navbar/Navbar';


import { TextField, Button, Typography, Alert, FormControl, Box, InputLabel, Select, MenuItem, TextareaAutosize } from '@mui/material';

import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function NewHaveServiceRegistrationForm() {
    const [image, setImage] = useState("");
    const [url1, setUrl] = useState("");

    function tipsAnimation() {
        const timer = setTimeout(() => {
            toast.info('Ensure to add details and a photo for better trading');
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }

    useEffect(() => {
        tipsAnimation();
    }, []);

    const [data, setData] = useState({
        "title": "",
        "category": "",
        "description": "",
        "skill_level": 0,
        "duration": 0,
        "estimateValue": 0,
        "type": "have",
        "photo": "",
        "userId": localStorage.getItem("userId"),
        "username": localStorage.getItem("userName")
    })



    const categories = [  { id: "tutoring", name: "Tutoring" },  { id: "softwareRepair", name: "Software Repair" },  { id: "medicalConsultation", name: "Medical consultation" },  { id: "marketingService", name: "Marketing Service" },  { id: "taxFilingService", name: "Tax Filing service" },];

    const skillLevels = [  { id: "1", name: "1" },  { id: "2", name: "2" },  { id: "3", name: "3" },  { id: "4", name: "4" },  { id: "5", name: "5" },];


    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [monetaryValue, setValue] = useState('');
    const [condition, setCondition] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [localPickUpOrShip, setLocalPickUpOrShip] = useState(false);
    const [giveAwayFree, setGiveAwayFree] = useState(false);
    const [anyoneOnHaveNeed, setAnyoneOnHaveNeed] = useState(false);
    const [privateGroup, setPrivateGroup] = useState(false);

    function handleSubmitHaveService(e) {
        e.preventDefault(); // prevent form from submitting normally

        let newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        newData = { ...data, photo: url1 }; // add a new property called "photo" with the value of "url"

        const url = "http://localhost:7777/barterServices";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(() => {
            console.log("New Service Added");
            console.log(JSON.stringify(newData));

            toast.success('Submitted successfully!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        })

    }

    function handleHaveService(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    function handlePhoto(e) {
        setImage(e.target.files[0])

    }
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
                console.log('url from data', data.url)

                toast.success('Uploaded successfully!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(err => console.log(err));
    };

    function handlePhoto(e) {
        setImage(e.target.files[0])

    }

    // code for file upload
    // if( e.target.id === 'file') {
    //     newData[e.target.id] = e.target.files[0]
    // }

    return (
        <>
            <Navbar className="NavbarD" fixed="top" />
            <div className='GoodFormDiv'>
            <h1 className='Heading1' >Add a Have(Service)</h1>
            <form className='GoodForm' >
                
            <div className='FormElements'>
                {/* Title:  */}
                <label htmlFor="title">Title</label>
                    
                    <input className={"NewPostInput"} type="text" onChange={(e) => handleHaveService(e)} id="title" value={data.title} />
                    </div>
               
                    <div className='FormElements'> 
                   <label htmlFor="category">Category</label>
                    <select className={"NewPostSelect"} onChange={(e) => handleHaveService(e)} id="category" value={data.category} required>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="homeandkitchen">Home and Kitchen</option>
                        <option value="musicandmusicalinstruments">Music and Musical intestruments</option>
                        <option value="sports">Sports</option>
                        <option value="automobile">Automobile</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                        <option value="health">health</option>

                    </select>
                    </div>

                    <div className='FormElements'>
            
                <label htmlFor="description">Description</label>
                    <textarea className={"NewPostTextarea"} onChange={(e) => handleHaveService(e)} id="description" value={data.description} required></textarea>
                </div>


                {/* <h4 className={"NewPostLabel"}>
                    Upload Photo
                    <div>
                        <div>
                            <input type="file" id="photo" onChange={(e) => handlePhoto(e)}></input>
                            <button onClick={uploadImage}>Upload</button>
                        </div>

                    </div>
                </h4> */}

                <div className='FormElements'>
                
                <label htmlFor="UploadPhoto">Upload Photo</label>
                <div class="upload-box">
                {/* <input type="file" id="photo" onChange={(e) => handlePhoto(e)}></input> */}
                {/* <button className="upload-button" onclick={uploadImage}>Uploading</button> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField margin=" normal" type="file" id="photo" onChange={(e) => handlePhoto(e)} />
                        <Button style={{ background: '#50AEB3', fontWeight: 'bold' }} margin=" normal" variant="contained" onClick={uploadImage}>Upload</Button>
                    </Box>
                </div>  
                </div> 

                <div className='FormElements'>
                <label htmlFor="Skill level">Skill Level</label>
                    <select className={"NewPostSelect"} onChange={(e) => handleHaveService(e)} id="skill_level" value={data.skill_level} required>
                        <option value="">Select Skill Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>


                <div className='FormElements'>
                <label htmlFor="Durations">Duration</label>
                    <input placeholder='In hours' className={"NewPostInput"} type="number" value={data.duration} onChange={(e) => handleHaveService(e)} id="duration" />
                </div>

                <div className='FormElements'>
                    Estimated Monetary Value
                    <input className={"NewPostInput"} type="number" onChange={(e) => handleHaveService(e)} id="estimateValue" value={data.estimateValue} />
                </div>
                <button style={{backgroundColor: '#50AEB3'}} className={"PostNewButton"} type="submit" onClick={handleSubmitHaveService}>Submit</button>
            </form>
            <ToastContainer/>
            </div>

      {/* <form  onSubmit={handleHaveService}>
        <h1 >Add a Have(Service)</h1>
        <FormControl fullWidth margin="normal">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={data.title}
            onChange={(e) => handleHaveService(e)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel >Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={data.category}
            onChange={(e) => handleHaveService(e)}
            label="Category*"
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <TextareaAutosize
            id="description"
            label="Description*"
            placeholder="Description"
            value={data.description}
            onChange={(e) => handleHaveService(e)}
            rowsMin={3}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="skill-level-label">Provider Skill level (1-Beginner to 5-Expert)*</InputLabel>
          <Select
            labelId="skill-level-label"
            id="skill_level"
            value={data.skill_level}
            onChange={(e) => handleHaveService(e)}
            label="Provider Skill level (1-Beginner to 5-Expert)*"
          >
            {skillLevels.map((skillLevel) => (
              <MenuItem key={skillLevel.value} value={skillLevel.value}>
                {skillLevel.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="duration"
            label="Duration (in hours)"
            variant="outlined"
            type="number"
            value={data.duration}
            onChange={(e) => handleHaveService(e)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="value"
            label="Estimated Monetary Value"
            variant="outlined"
            type="number"
            value={data.value}
            onChange={(e) => handleHaveService(e)}
          />
        </FormControl>
            <button className={"PostNewButton"} type="submit" onClick={handleHaveService}>Next</button>
        </form>
*/}
        </> 
    );
}

export default NewHaveServiceRegistrationForm;

// import React, { useState } from 'react';
// // import './NewHaveServiceRegistrationForm.css';
// import './NewHaveServiceRegistrationForm.css';
// import Navbar from '../Navbar/Navbar';
// import { TextField, Button, Typography, Alert, FormControl, Box, InputLabel, Select, MenuItem, TextareaAutosize } from '@mui/material';

// function NewHaveServiceRegistrationForm() {
//     const [image, setImage] = useState("");
//     const [url1, setUrl] = useState("");

//     const [data, setData] = useState({
//         "title": "",
//         "category": "",
//         "description": "",
//         "skill_level": 0,
//         "duration": 0,
//         "value": 0,
//         "type": "have",
//         "photo": "",
//         "userId": localStorage.getItem("userId"),
//         "username": localStorage.getItem("userName")
//     })

//     const categories = [  { id: "tutoring", name: "Tutoring" },  { id: "softwareRepair", name: "Software Repair" },  { id: "medicalConsultation", name: "Medical consultation" },  { id: "marketingService", name: "Marketing Service" },  { id: "taxFilingService", name: "Tax Filing service" },];

//     const skillLevels = [  { id: "1", name: "1" },  { id: "2", name: "2" },  { id: "3", name: "3" },  { id: "4", name: "4" },  { id: "5", name: "5" },];

//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [description, setDescription] = useState('');
//     const [photo, setPhoto] = useState(null);
//     const [quantity, setQuantity] = useState('');
//     const [monetaryValue, setValue] = useState('');
//     const [condition, setCondition] = useState('');
//     const [postalCode, setPostalCode] = useState('');
//     const [localPickUpOrShip, setLocalPickUpOrShip] = useState(false);
//     const [giveAwayFree, setGiveAwayFree] = useState(false);
//     const [anyoneOnHaveNeed, setAnyoneOnHaveNeed] = useState(false);
//     const [privateGroup, setPrivateGroup] = useState(false);

//     function handleSubmitHaveService(e) {
//         e.preventDefault(); // prevent form from submitting normally

//         let newData = { ...data }
//         newData[e.target.id] = e.target.value
//         setData(newData)
//         console.log(newData)
//         newData = { ...data, photo: url1 }; // add a new property called "photo" with the value of "url"

//         const url = "http://localhost:7777/barterServices";
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newData)
//         }).then(() => {
//             console.log("New Service Added");
//             console.log(JSON.stringify(newData));
//         })
//     }

//     function handleHaveService(e) {
//         const newData = { ...data }
//         newData[e.target.id] = e.target.value
//         setData(newData)
//         console.log(newData)
//     }
//     function handlePhoto(e) {
//         setImage(e.target.files[0])

//     }
//     const uploadImage = () => {
//         const data = new FormData();
//         data.append("file", image);
//         data.append("upload_preset", "br92w6k8");
//         data.append("cloud_name", "dqdojffsu");

//         fetch("https://api.cloudinary.com/v1_1/dqdojffsu/image/upload", {
//             method: "post",
//             body: data
//         })
//             .then(resp => resp.json())
//             .then(data => {
//                 setUrl(data.url);
//                 console.log('url from data', data.url)
//                 //saveImageToDatabase(data.url);
//             })
//             .catch(err => console.log(err));
//     };

//     function handlePhoto(e) {
//         setImage(e.target.files[0])

//     }

//     // code for file upload
//     // if( e.target.id === 'file') {
//     //     newData[e.target.id] = e.target.files[0]
//     // }

//     return (
//         <>
//       <form  onSubmit={handleHaveServiceSubmit}>
//         <h1 >Add a Have(Service)</h1>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             id="title"
//             label="Title"
//             variant="outlined"
//             value={data.title}
//             onChange={(e) => handleHaveService(e)}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal" required>
//           <InputLabel >Category</InputLabel>
//           <Select
//             labelId="category-label"
//             id="category"
//             value={data.category}
//             onChange={(e) => handleHaveService(e)}
//             label="Category*"
//           >
//             {categories.map((category) => (
//               <MenuItem key={category.value} value={category.value}>
//                 {category.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth margin="normal" required>
//           <TextareaAutosize
//             id="description"
//             label="Description*"
//             placeholder="Description"
//             value={data.description}
//             onChange={(e) => handleHaveService(e)}
//             rowsMin={3}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal" required>
//           <InputLabel id="skill-level-label">Provider Skill level (1-Beginner to 5-Expert)*</InputLabel>
//           <Select
//             labelId="skill-level-label"
//             id="skill_level"
//             value={data.skill_level}
//             onChange={(e) => handleHaveService(e)}
//             label="Provider Skill level (1-Beginner to 5-Expert)*"
//           >
//             {skillLevels.map((skillLevel) => (
//               <MenuItem key={skillLevel.value} value={skillLevel.value}>
//                 {skillLevel.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             id="duration"
//             label="Duration (in hours)"
//             variant="outlined"
//             type="number"
//             value={data.duration}
//             onChange={(e) => handleHaveService(e)}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             id="value"
//             label="Estimated Monetary Value"
//             variant="outlined"
//             type="number"
//             value={data.value}
//             onChange={(e) => handleHaveService(e)}
//           />
//         </FormControl>
//             <button className={"PostNewButton"} type="submit" onClick={handleHaveServiceSubmit}>Next</button>
//         </form>
//         </>
//     );
// }

// export default NewHaveServiceRegistrationForm;