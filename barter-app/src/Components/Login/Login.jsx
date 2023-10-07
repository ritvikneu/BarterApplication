// import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"            /* Imported React and useState() hook which is used to capture the values of input provided by the user */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckButton from "react-validation/build/button";
// import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import '../Login/Login.css';
import { getAllUsers, login } from "../../Services/api";
// import { alignProperty } from "@mui/material/styles/cssUtils";
import { TextField, Button, Typography, Alert, FormControl, Box } from '@mui/material';

// import { auth } from "../firebase/firebase";

export const Login = (props) => {               /* Props are a type of object where the value of attributes of a tag is stored. It is a way in which parent components send values or functions to their child components */
    const [email, setEmail] = useState('');     /* Creating a state for email and a setEmail hook which modifies the state and useState hook has initial empty string value*/
    const [pass, setPass] = useState('');       /* Creating a state for password and a setPass hook which modifies the state and useState hook has initial empty string value*/

    const [userId, setUserId] = useState('');
    const [userdetails, setUserDetails] = useState([]);
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userReducer);

    // const [error, setError] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false); // state to show or hide the error message
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/register');
        // history.push('/login');
    };
    const { signIn } = UserAuth();


    const handleSubmit = async (e) => {            /* To capture the values when use submits the form */
        e.preventDefault();   /* The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. */



        setError('')
        setShowError(false);

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



        try {
            await signIn(email, pass);
            navigate('/dashboard');
        } catch (e) {
            setError("Login failed! Please check your username and password");
            setShowError(true);

            console.log(e.message)
        }
    }

    {/* Creating a login form */ }
    return (
        <>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    // backgroundImage: 'url("./Background.png")', // Add background image URL
                    // backgroundSize: 'cover', // Make the image cover the entire box
                }}
                >
                    
            
            <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {showError && <Alert variant="danger">{error}</Alert>} {/* Show error message if there is any */}
                <FormControl 
                sx={{
                    // border: '1px solid black', // Add border
                    padding: '2rem',
                    borderRadius: '8px', // Add border radius
                    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // Add box shadow
                    }}
                onSubmit={handleSubmit}>       { /* Used onSubmit to connect handle submit to the form  */}
                    {/* <div className="formParameters">
            <label htmlFor="UserId" >User Name</label>
            <input defaultValue={userId} name="userId" ></input>
            </div> */}

                   
                       
                        <TextField defaultValue={email} type="email"
                            placeholder="Email or Username" id="email" name="email"
                            onChange={(e) => setEmail(e.target.value)}/>
                   

                   
                       
                        <TextField margin="normal" defaultValue={pass} type="password" placeholder="Password" id="password" name="password"
                            onChange={(e) => setPass(e.target.value)}/>     {/*  Setting html attributes for password and email*/}
                    
                    <Button   fullWidth 
                        sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}  variant="contained"  type="submit"> Login </Button>


                    {/* <CheckButton style={{display: "none"}} ref={checkBtn}/> */}


                    <Button  onClick={handleButtonClick}>Don't have an account? Register here</Button>

                </FormControl>
            

            </Box>
        </>
    )
}