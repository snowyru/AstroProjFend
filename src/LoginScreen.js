import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
// Connect to the context (i.e, global state)
import { Context as UserContext } from './UserContext';


// RegEx (Regular Expressions)
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
    return re.test(password);
}

function LoginScreen() {

    // "initial", "sending", "successful", "unsuccessful", "validation failed"
    const [state, setState] = useState("initial");
    const { setUserState } = useContext(UserContext);
    
    // Declare undefined variables for later assignment (ref props)
    let emailField;
    let passwordField;

    // To instantiate a FormData object
    const formData = new FormData();

    const login = () => {

        const errors = [];

        // 1. Validate the fields
        if(emailField.value.length === 0) {
            errors.push("Please enter a valid email address");
        }
        if(passwordField.value.length === 0) {
            errors.push("Please enter a valid password");
        }

        // 1.1 If there are errors, set the state to "validation error"
        if(errors.length > 0) {
            setState("validation error");
        }
        // 1.2 If there are no errors, set the state to "sending"
        else {
            setState("sending");

            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);

            fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
                method: 'POST',
                // headers: {"Content-Type": "application/json"},
                body: formData
            })
            // 2.1 If the submission is successful, set the state "successful"
            .then(
                function (backendResponse) {
                    return backendResponse.json();
                }
            )
            .then((theJson)=>{

                if(theJson.message.email) {
                    setUserState(
                        {
                            jsonwebtoken: theJson.message.jsonwebtoken,
                            firstName: theJson.message.firstName,
                            lastName: theJson.message.lastName,
                            email: theJson.message.email,
                            avatar: theJson.message.avatar,
                            loginStatus: true
                        }
                    )
                    setState("successful");
                } 
                else if (theJson.message === "Wrong email or password") {
                    setState("validation error");
                } 
                else {
                    setState("unsuccessful");
                }


            })
            // 2.2 If the submission is unsuccessful, set the state "unsuccessful"
            .catch((error)=>{
                console.log(error);
                setState("unsuccessful");
            });
        }
    }

    if ( state === "successful" ) {
        return (
            <Redirect to="/HomeScreen" />
        )
    } else {
        return (
            <div className="container" style={{maxWidth: 600 }}>

                <h1 className="py-5">Login</h1>

                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input ref={ (elem)=>emailField = elem } type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input ref={ (elem)=>passwordField = elem } type="password" className="form-control" id="password" aria-describedby="password" />
                </div>

                {
                    state !== "sending" && state !== "successful" &&
                    <button 
                    onClick={login}
                    className="btn btn-primary mb-3" type="button">Submit</button>
                }

                { 
                    state === "validation error" &&
                    <div className="alert alert-danger" role="alert">
                        Incorrect email or password.
                    </div>
                }

                {
                    state === "unsuccessful" &&
                    <div className="alert alert-danger" role="alert">
                        Internal error. Please try again later.
                    </div>
                }

                {
                    state === "sending" &&
                    <p>Loading...</p>
                }
            </div>
        )
    }
}

export default LoginScreen;








// import * as React from "react";
// import { useRef, useContext, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { FormHelperText } from "@mui/material";
// import { Context as UserContext } from "./UserContext.js";
// import HomeScreen from "./screens/HomeScreen.js";

// function Login({history}) {
//   // ThemeProvider for later
//   const theme = createTheme();
//   //currently primary is blue, secondary is purple

//   // start validation code for email
//   // const [valid, setValid] = React.useState(true);
//   // function ValidateEmail(inputText) {
//   //   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   //   if (inputText.match(mailformat)) {
//   //     console.log("Valid email address!");
//   //     setValid(true);
//   //   } else {
//   //     console.log("You have entered an invalid email address!");
//   //     setValid(false);
//   //   }
//   // }

//   const passRef = useRef(""); //create ref for password
//   const emailRef = useRef(""); //create ref for email
//   // const handleChange = () => {
//   //   ValidateEmail(emailRef.current.value);
//   // };
//   //end of validation code for email

//   //password incorect or not boolean for wrong email or password message to user
//   const [pass, setPass] = React.useState(true);

//   // initial, sending, unsuccessful, successful, validation failed
//   const [state, setState] = useState("initial");
//   //Subscribe to provider
//   const { setUserState } = useContext(UserContext);

//   //extract email and password, replace with backend code----------------------------------------------------------------
//   const handleLogin = (event) => {
//     //if email is valid it will run the fetch and set to sending state
//     if (valid) {
//       setState("sending"); //sending state

//       event.preventDefault(); //extraction the data from textfields
//       const data = new FormData(event.currentTarget);

//       data.append("email", emailRef.current.value); //Not too sure if this is correct supposed to send user input to check db
//       data.append("password", passRef.current.value);

//       fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
//         method: "POST",
//         // headers: {"Content-Type": "application/json"},
//         body: data, //users input data
//       })
//         // 2.1 If the submission is successful, set the state "successful"
//         .then(function (backendResponse) {
//           return backendResponse.json();
//         })
//         .then((theJson) => {
//           if (theJson.message.email) {
//             setUserState({
//               jsonwebtoken: theJson.message.jsonwebtoken,
//               firstName: theJson.message.firstName,
//               lastName: theJson.message.lastName,
//               email: theJson.message.email,
//               avatar: theJson.message.avatar,
//               loginStatus: true,
//             });
//             setPass(true); //removes the wrong email or password message
//             setState("successful"); //set state to successful
//             history.replace('/')
//           } else if (theJson.message === "Wrong email or password") {
//             setPass(false); //triggers wrong email or password message to user
//             setState("validation error"); //set state to validation error for wrong email or password
//           } else {
//             setState("unsuccessful"); //if backend doesn't respond set to unsuccessful
//           }
//         })
//         // 2.2 If the submission is unsuccessful, set the state "unsuccessful"
//         .catch((error) => {
//           console.log(error);
//           setState("unsuccessful"); //if backend doesn't respond set to unsuccessful
//         });
//     } else {
//       setState("validation error");
//       console.log("Input valid email"); //also triggered a message for an invalid email earlier
//     }
//   };

//   return (
//     <>
//       {/* Start of login page */}
//       {/* Empty theme provider for later  */}
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           {/* Box of whole log in component */}
//           <Box
//             sx={{
//               marginTop: 7,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             {/* Circled lock icon */}
//             <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             {/* Log in title */}
//             <Typography component="h1" variant="h5">
//               Log in
//             </Typography>
//             {/* Text box for email input */}
//             {/* onSubmit handleLogin will retrieve the email and password to check with backend */}
//             <Box
//               component="form"
//               onSubmit={handleLogin}
//               noValidate
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 inputRef={emailRef} //gets user inputted email through ref
//                 onChange={handleChange} //checks for validity on change
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               />
//               {/* alert for user if email is valid */}
//               {valid === false && (
//                 <FormHelperText
//                   error
//                   variant="standard"
//                   id="component-error-text"
//                 >
//                   Please enter a valid email address!
//                 </FormHelperText>
//               )}

//               {/* Text box for password input */}
//               <TextField
//                 inputRef={passRef} //gets user inputted password through ref
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               {/* alert for user if email or password is incorrect */}
//               {pass === false && (
//                 <FormHelperText
//                   error
//                   variant="standard"
//                   id="component-error-text"
//                 >
//                   Incorrect email or password!
//                 </FormHelperText>
//               )}
//               {/* Remembers jwt token */}
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               {/* Log in button */}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 // onClick={HomeScreen}
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Log In
//               </Button>
//               {/* Forgot password or register links */}
//               <Grid container>
//                 <Grid item xs>
//                   <Link to="/forgot" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link to="/Resgister" variant="body2">
//                     {"Don't have an account? Register now!"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//       {/* End of login page */}
//     </>
//   );
// }

// export default Login;
