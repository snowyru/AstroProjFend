import React from "react";
import { Link } from "react-router-dom";
// import RegistrationScreen from "../RegistrationScreen";
import '../style.css';


function MainScreen() {
  return (
    <>
    <div className="header">
      <header className="p-3 bg-dark text-white ">
        <div className="container" >
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div className="text-end col-8">
              <a href="login.html">
              <Link type="button" to='/LoginScreen' className="btn btn-warning col-3 ${linkState['/LoginScreen']}">
                Login
                </Link>
              </a>
              <a href="signup.html">
                <Link type="button" to='/RegistrationScreen' className="btn btn-primary col-3 ${linkState['/RegistrationScreen']}">
                RegistrationScreen
                </Link>
                {/* <Link to="/UploadScreen" className={`nav-link px-2 ${linkState['/UploadScreen']}`}>UploadScreen</Link> */}
              </a>
              
            
            </div>
          </div>
        </div>
        
      </header>
      <h1 className="text-center">Welcome to Capture Beauty <br /> We hope that this website helps <br /> you to solve your problems</h1>
        
</div>
      
    </>
  );
}




export default MainScreen;