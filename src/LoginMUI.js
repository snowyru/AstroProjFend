import * as React from 'react';
import {useRef, useContext, useState} from 'react';
import { Redirect } from 'react-router';
import Footer from './Footer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormHelperText } from '@mui/material';
import { Context as UserContext } from './UserContext.js';

function LoginMUI() {

    // ThemeProvider for later
    const theme = createTheme();
        //currently primary is blue, secondary is purple

    // start validation code for email 
    const [valid, setValid] = React.useState(true);
    function ValidateEmail(inputText){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputText.match(mailformat))
        {
        console.log("Valid email address!");
        setValid(true);
        }
        else
        {
        console.log("You have entered an invalid email address!");
        setValid(false);
        }
    }

    const passRef = useRef(''); //create ref for password
    const emailRef = useRef(''); //create ref for email
    const handleChange = () => {
        ValidateEmail(emailRef.current.value);
    }
    //end of validation code for email

    //password incorect or not boolean for wrong email or password message to user
    const [pass, setPass] = React.useState(true);

    // initial, sending, unsuccessful, successful, validation failed
    const [state, setState] = useState("initial")
    //Subscribe to provider 
    const { setUserState } = useContext(UserContext);

    //extract email and password, replace with backend code----------------------------------------------------------------
    const handleLogin = (event) => {
            //if email is valid it will run the fetch and set to sending state
        if (valid) {
            setState("sending"); //sending state

            event.preventDefault(); //extraction the data from textfields
            const data = new FormData(event.currentTarget);
                
            data.append('email', emailRef.current.value );     //Not too sure if this is correct supposed to send user input to check db
            data.append('password',passRef.current.value );

            fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
                method: 'POST',
                // headers: {"Content-Type": "application/json"},
                body: data  //users input data
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
                    setPass(true); //removes the wrong email or password message
                    setState("successful"); //set state to successful
                } 
                else if (theJson.message === "Wrong email or password") {
                    setPass(false); //triggers wrong email or password message to user
                    setState("validation error"); //set state to validation error for wrong email or password
                } 
                else {
                    setState("unsuccessful");   //if backend doesn't respond set to unsuccessful
                }

            })
            // 2.2 If the submission is unsuccessful, set the state "unsuccessful"
            .catch((error)=>{
                console.log(error);
                setState("unsuccessful");  //if backend doesn't respond set to unsuccessful
            });
       
        } else {
            setState("validation error")
            console.log('Input valid email') //also triggered a message for an invalid email earlier
        }
      }

    if ( state === "successful" ) {
        return (
            <Redirect to="/HomeScreen" />
        )
    }

    return(
        <>
      
            {/* Start of login page */}
                {/* Empty theme provider for later  */}
               <ThemeProvider theme={theme}> 
                <Container component="main" maxWidth="xs">
                    {/* Box of whole log in component */}
                    <Box
                    sx={{
                        marginTop: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {/* Circled lock icon */}
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                            {/* Log in title */}
                            <Typography component="h1" variant="h5">
                                Log in
                            </Typography>
                                {/* Text box for email input */}
                                    {/* onSubmit handleLogin will retrieve the email and password to check with backend */}
                                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                    inputRef={emailRef} //gets user inputted email through ref
                                    onChange={handleChange} //checks for validity on change
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    />  
                                        {/* alert for user if email is valid */}                           
                                       {valid === false &&
                                        <FormHelperText error variant="standard" id="component-error-text">
                                            Please enter a valid email address!
                                        </FormHelperText>
                                        }    

                                    {/* Text box for password input */}
                                    <TextField
                                    inputRef={passRef} //gets user inputted password through ref
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    />
                                        {/* alert for user if email or password is incorrect */}                           
                                       {pass === false &&
                                        <FormHelperText error variant="standard" id="component-error-text">
                                            Incorrect email or password!
                                        </FormHelperText>
                                        }
                                        {/* Remembers jwt token */}
                                        <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                        />
                                            {/* Log in button */}
                                            <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}>
                                            Log In
                                            </Button>
                                                {/* Forgot password or register links */}
                                                <Grid container>
                                                    <Grid item xs>
                                                        <Link to="/forgot" variant="body2">
                                                        Forgot password?
                                                        </Link>
                                                    </Grid>
                                                        <Grid item>
                                                            <Link to="/Resgister" variant="body2">
                                                            {"Don't have an account? Register now!"}
                                                            </Link>
                                                        </Grid>
                                                </Grid>
                                </Box>
                    </Box>
                </Container>
            </ThemeProvider>
   
            {/* End of login page */}
       
        </>
    )

};

export default LoginMUI;