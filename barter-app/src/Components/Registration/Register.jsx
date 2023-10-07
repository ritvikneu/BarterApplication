import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Dashboard from "../Dashboard/Dashboard";
import './Register.css';
import { TextField, Button, Typography, Alert, FormControl, Box } from '@mui/material';
import { border, shadows } from '@mui/system';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useHistory } from "react-router-dom";


// import { createUserWithEmailAndPassword } from "firebase/auth";
export const Register = (props) => {
    const [email, setEmail] = useState('');     /* Creating a state for email and a setEmail hook which modifies the state and useState hook has initial empty string value*/
    const [pass, setPass] = useState('');       /* Creating a state for password and a setPass hook which modifies the state and useState hook has initial empty string value*/
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');



    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false); // state to show or hide the error message
    const { createUser } = UserAuth();
    const navigate = useNavigate();
    // const history = useHistory();
    const handleButtonClick = () => {
        navigate('/');
        // history.push('/login');
    };



    const handleSubmit = async (e) => {            /* To capture the values when use submits the form */
        e.preventDefault();   /* The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. */
        console.log(email);
        // console.log(!name || !email || !pass || !mobile);

        setError('');

        setShowError(false);


        const response = await fetch(`http://localhost:7777/barterUser/email/${email}`);
        const data = await response.json();

        if (data !== null) {
            if (data.hasOwnProperty('email') && data.email === email) {
                setError('This email is already registered. Please login instead.');
                setShowError(true);
                return;

            }
        }


        if (!name) {
            setError('Please enter your name.');
            setShowError(true);
            return;
        }

        // Validate email
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email');
            setShowError(true);
            return;
        }

        // Validate password
        if (!pass || pass.length < 6) {
            setError('Password must be at least 6 characters');
            setShowError(true);
            return;
        }

        // Validate mobile number
        if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            setShowError(true);
            return;
        }

        try {
            console.log("registering user");
             createUser(email, pass);
            navigate('/dashboard');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }


        const newUser = {
            "userName": name,
            "email": email,
            "mobile": mobile,
            "password": pass
        };
        console.log("entered details", newUser);
        fetch('http://localhost:7777/barterUser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                console.log("data from server", data);
                //props.onAdd(data); // pass the new data to the parent component
                // setname("");
                // setdetails("");
                // setStatus("");
                // setDeadline("");
            })
            .catch(error => console.error(error));

    }


    {/* Creating a registration form */ }
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',

            }}>

                {showError && <Alert variant="danger">{error}</Alert>} {/* Show error message if there is any */}
                <FormControl
                    sx={{
                        // border: '1px solid black', // Add border
                        padding: '2rem',
                        borderRadius: '8px', // Add border radius
                        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // Add box shadow
                    }}
                    onSubmit={handleSubmit}>       { /* Used onSubmit to connect handle submit to the form  */}


                    <TextField required id="outlined-required"

                        margin="normal" defaultValue={name} name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />



                    <TextField margin="normal" defaultValue={email} type="email" placeholder="Email" id="email" name="email"
                        onChange={(e) => setEmail(e.target.value)} />




                    <TextField style={{ width: 300 }} margin="normal" defaultValue={pass} type="password" placeholder="Password" id="password" name="password"
                        onChange={(e) => setPass(e.target.value)} />    {/*  Setting html attributes for password and email*/}




                    <TextField margin="normal" defaultValue={mobile} type="text" placeholder="Mobile" id="mobile" name="mobile"
                        onChange={(e) => setMobile(e.target.value)} />

                    <Button onClick={handleSubmit}
                    fullWidth
                        sx={{ mt: 3, mb: 2, mr: 1 }} variant="contained" type="submit"> Register </Button>
                </FormControl>
                <Button sx={{ mr: 1 }} onClick={handleButtonClick}>Already have an account? Login here</Button>
            </Box>

        </>
    )
}