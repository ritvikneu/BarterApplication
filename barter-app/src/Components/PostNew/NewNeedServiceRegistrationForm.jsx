import React, { useState, useEffect } from 'react';
import './NewNeedServiceRegistrationForm.css';
import Navbar from '../Navbar/Navbar';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Typography, Alert, FormControl, Box, InputLabel, Select, MenuItem, TextareaAutosize } from '@mui/material';

function NewNeedServiceRegistrationForm() {
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

    const [data, setData] = useState({
        "title": "",
        "category": "",
        "description": "",
        "skill_level": 0,
        "duration": 0,
        "estimateValue": 0,
        "type": "need",
        "photo": "",
        "userId": localStorage.getItem("userId"),
        "username": localStorage.getItem("userName")
    })
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
    const [anyoneOnNeedNeed, setAnyoneOnNeedNeed] = useState(false);
    const [privateGroup, setPrivateGroup] = useState(false);


    function handleSubmitNeedService(e) {
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

    function handleNeedService(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    function handlePhoto(e) {
        setImage(e.target.files[0])

    }


    return (
        <>
            <Navbar className="NavbarD" fixed="top" />
            <div className='GoodFormDiv'>
                <h1 className='Heading2' >Add a Need(Service)</h1>
                <form className='GoodForm' onSubmit={handleSubmitNeedService}>

                    <div className='FormElements'>
                        <label htmlFor="title">Title</label>
                        <input className={"NewPostInput"} type="text" onChange={(e) => handleNeedService(e)} id="title" value={data.title} />
                    </div>


                    <div className='FormElements'>
                        <label htmlFor="category">Category</label>
                        <select className={"NewPostSelect"} onChange={(e) => handleNeedService(e)} id="category" value={data.category} required>
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
                        <label htmlFor="Brand">Brand</label>
                        <input className={"NewPostInput"} type="text" onChange={(e) => handleNeedService(e)} id="brand" value={data.brand} />
                    </div>


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
                        <label htmlFor="ProvideSkill">Provide Skill Level</label>
                        <select className={"NewPostSelect"} onChange={(e) => handleNeedService(e)} id="skill_level" value={data.skill_level} required>
                            <option value="">Select Skill Level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>


                    <div className='FormElements'>
                        <label htmlFor="Duration">Duration(in hours)</label>
                        <input className={"NewPostInput"} type="number" value={data.duration} onChange={(e) => handleNeedService(e)} id="duration" />
                    </div>


                    <div className='FormElements'>
                        <label htmlFor="Monetory">Valuation</label>
                        <input className={"NewPostInput"} type="number" onChange={(e) => handleNeedService(e)} id="estimateValue" value={data.estimateValue} />
                    </div>
                    <button style={{backgroundColor: '#50AEB3'}} className={"NeedButton"} type="submit" onClick={handleSubmitNeedService}>Submit</button>
                </form>
            </div>
        </>
    );
}

export default NewNeedServiceRegistrationForm;