import React, { useState, useEffect } from 'react';

// import './NewHaveGoodRegistrationForm.css';
// import './NewHaveGoodRegistrationForm.css';
import Navbar from '../Navbar/Navbar';
// import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Button, Typography, Alert, FormControl, Box, InputLabel, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { success } from 'react-bootstrap';



function NewHaveGoodRegistrationForm() {
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
                console.log('url from data',data.url)

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
        "brand": "",
        "photo": "",
        "estimateValue": 0,
        "condition": "",
        "quantity": 0,
        "postalCode": "",
        "type": "have",
        "userId": localStorage.getItem("userId"),
        "username": localStorage.getItem("userName")
    })
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [category, setCategory] = useState('Select Category');
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

    function handleSubmitHaveGood(e) {
        e.preventDefault(); // prevent form from submitting normally

        let newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        newData = { ...data, photo: url1 }; // add a new property called "photo" with the value of "url"

        const url = "http://localhost:7777/barterGoods";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(() => {
            console.log("New Good Added");
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

    function handleHaveGood(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

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

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <Typography variant="h3" sx={{ mt: 3, mb: 2 }} style={{ color: '#50AEB3', fontWeight: 'bold' }}>Add a Have (Good) </Typography>
                <FormControl sx={{
                    width: '50%', margin: 5, padding: 2,
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    padding: '1rem'
                }} onSubmit={handleSubmitHaveGood}>

                    <TextField label="Title" margin='normal' placeholder="Title" style={{ width: 300 }} type="text" onChange={(e) => handleHaveGood(e)} id="title" value={data.title} />

                    {/* <InputLabel id="category-label">Category</InputLabel> */}
                    {/* <Select
                        label="Select Category"
                        labelId="category-label"
                        id="category"
                        value={data.category}
                        onChange={(e) => handleHaveGood(e)}
                        style={{ marginBottom: 10, color: '#000000' }}
                        margin='normal'

                        required
                    >
                        <MenuItem value="sel">Select Category</MenuItem>
                        <MenuItem value={"electronics"}>Electronics</MenuItem>
                         <MenuItem value={"homeandkitchen"}>Home and Kitchen</MenuItem>
                        <MenuItem value={"musicandmusicalinstruments"}>Music and Musical Instruments</MenuItem>
                        <MenuItem value={"sports"}>Sports</MenuItem>
                        <MenuItem value={"automobile"}>Automobile</MenuItem>
                        <MenuItem value={"education"}>Education</MenuItem>
                    </Select> */}
                    <div className='FormElements'>

                    <select className={"NewPostSelect"} onChange={(e) => handleHaveGood(e)} id="category" value={data.category} required>
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

                    <TextField label="Brand" fullWidth style={{ width: 600 }} className={"NewPostInput"} type="text" onChange={(e) => handleHaveGood(e)} id="brand" value={data.brand} />

                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        className={"NewPostTextarea"}
                        onChange={(e) => handleHaveGood(e)}
                        id="description"
                        value={data.description}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <Typography variant="h6" className={"NewPostLabel"}>Upload Photo</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField margin=" normal" type="file" id="photo" onChange={(e) => handlePhoto(e)} />
                        <Button style={{ background: '#50AEB3', fontWeight: 'bold' }} margin=" normal" variant="contained" onClick={uploadImage}>Upload</Button>
                    </Box>


                    <TextField
                        label="Quantity"
                        className={"NewPostInput"}
                        type="number"
                        onChange={(e) => handleHaveGood(e)}
                        id="quantity"
                        value={data.quantity}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Estimated Monetary Value"
                        className={"NewPostInput"}
                        type="number"
                        onChange={(e) => handleHaveGood(e)}
                        id="estimateValue"
                        value={data.estimateValue}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Condition"
                        className={"NewPostInput"}
                        type="text"
                        onChange={(e) => handleHaveGood(e)}
                        id="condition"
                        value={data.condition}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Postal Code"
                        className={"NewPostInput"}
                        type="text"
                        onChange={(e) => handleHaveGood(e)}
                        id="postalCode"
                        value={data.postalCode}
                        required
                        fullWidth
                        margin="normal"
                    />



                     <Button className={"PostNewButton"} style={{ background: '#50AEB3', fontWeight: 'bold' }} type="submit" variant="contained" onClick={handleSubmitHaveGood}>Submit</Button>
                    </FormControl>
                <ToastContainer />
                    </Box>
                    </>
    );
}

export default NewHaveGoodRegistrationForm;