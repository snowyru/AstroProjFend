import { useState, useEffect, useContext } from 'react';
import { Context as UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import RegistrationScreen from './RegistrationScreen';

function NavBar(props) {


    const initialState = {
        '/HomeScreen': 'text-secondary',
        // '/about': 'text-secondary',
        '/RegistrationScreen': 'text-secondary',
        '/AboutScreen': 'text-secondary',
        '/UploadScreen': 'text-secondary',
    }

    let [ linkState, setLinkState ] = useState(initialState);
    let { state, setUserState } = useContext(UserContext);
    let { LoginScreenStatus } = state;

    useEffect(
        function() {
            setLinkState(
                {
                    ...initialState,
                    [props.path]: 'text-white'
                }
            )
        },
        [ props.path ]
    );

    function logout() {
        setUserState(
            {
                ...state,
                LoginScreenStatus: false
            }
        );
    };

    

    return (
        <header className="p-1 text-white " style={{"backgroundColor":"#003a69", "fontSize":"25px", }}>
            
            <div className="container d-flex justify-content-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/HomeScreen" className={`nav-link px-2 ${linkState['/HomeScreen']}`}>Home</Link></li>
                    <li><Link to="/AboutScreen" className={`nav-link px-2 ${linkState['/AboutScreen']}`}>About</Link></li>
                    {/* <li><Link to="/RegistrationScreen" className={`nav-link px-2 ${linkState['/RegistrationScreen']}`}>RegistrationScreen</Link></li> */}
                    <li><Link to="/UploadScreen" className={`nav-link px-2 ${linkState['/UploadScreen']}`}>UploadScreen</Link></li>
                    {/* <li><Link to="/Profile" className={`nav-link px-2 ${linkState['/Profile']}`}>Profile</Link></li> */}
                    {/* { LoginScreenStatus === false && <li><Link to="/RegistrationScreen" className={`nav-link px-2 ${linkState['/RegistrationScreen']}`}>Register</Link></li> } */}
                </ul>
                <div className="text-end pe-5">
                    {/* { LoginScreenStatus === true && <Link to="/profile-settings" className="btn btn-outline-light me-2">Profile Settings</Link>}
                    { LoginScreenStatus === false && <Link to="/LoginScreen" className="btn btn-warning">Log in</Link>} */}
                    {/* <Link to="/Login" className="btn btn-warning">Log in</Link> */}
                    {/* { LoginScreenStatus === true && <button onClick={logout} className='btn btn-danger'>Log out</button> } */}
              
                    
                
                </div>
            </div>
            
            </div>
            
        </header>
    )
};

export default NavBar;