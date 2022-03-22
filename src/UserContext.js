// Import functions to create and provision a Context Component
import React, { useReducer, createContext, useCallback } from 'react';

// Create the Context componet
export const Context = createContext();


// Create an initial state
const initialState = {
    "firstName": localStorage.getItem('firstName') || "",
    "lastName": localStorage.getItem('lastName') || "",
    "email": localStorage.getItem('email') || "",
    "avatar":  localStorage.getItem('avatar') || null,
    "jsonwebtoken": localStorage.getItem('jsonwebtoken') || undefined,
    "loginStatus": localStorage.getItem('jsonwebtoken') ? true : false,
}

// Declare the actions
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';


function reducer(state=false, action) {
    if (action.type === UPDATE_USER) {
        return {
            ...state,
            ...action.payload
        }
    }
    if (action.type === LOGOUT) {
        return {
            "firstName": "",
            "lastName": "",
            "email": "",
            "avatar": null,
            "jsonwebtoken": undefined,
            "loginStatus": false
        }
    }
};


export function UserContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);

    // Functions to change user state
    const setUserState = useCallback(
        function(payload) {



            // If user logs in
            if (payload.loginStatus === true) {
                // Put the details of user in localStorage
                localStorage.setItem('firstName', payload.firstName);
                localStorage.setItem('lastName', payload.lastName);
                localStorage.setItem('email', payload.email);
                localStorage.setItem('avatar', payload.avatar);
                localStorage.setItem('jsonwebtoken', payload.jsonwebtoken);

                const theAction = {
                    type: UPDATE_USER,
                    payload: payload
                }

                dispatch(
                    theAction
                );
          
            } 
            // If user logs out
            else {

                // Clear the session storage
                localStorage.clear();

                // Dispatch an empty object for the state
                const theAction = {
                    type: LOGOUT,
                }

                dispatch(
                    theAction
                ); 
            }

            

        },
        [ dispatch ]
    );

    return (
        <Context.Provider 
        value={
            {
                state,       // Provide consumers with current state
                setUserState // Provide consumers with function to change the current state
            }
        }>
            {props.children}
        </Context.Provider>
    )
};




















// // Import functions to create and provision a Context Component
// import React, { useReducer, createContext, useCallback } from 'react';

// // Create the Context componet
// export const Context = createContext();


// // Create an initial state
// const initialState = {
//     "firstName": localStorage.getItem('firstName') || "",
//     "lastName": localStorage.getItem('lastName') || "",
//     "email": localStorage.getItem('email') || "",
//     "avatar":  localStorage.getItem('avatar') || null,
//     "jsonwebtoken": localStorage.getItem('jsonwebtoken') || undefined,
//     "loginStatus": localStorage.getItem('jsonwebtoken') ? true : false,
// }

// // Declare the actions
// const UPDATE_USER = 'UPDATE_USER';
// const LOGOUT = 'LOGOUT';


// function reducer(state=false, action) {
//     if (action.type === UPDATE_USER) {
//         return {
//             ...state,
//             ...action.payload
//         }
//     }
//     if (action.type === LOGOUT) {
//         return {
//             "firstName": "",
//             "lastName": "",
//             "email": "",
//             "avatar": null,
//             "jsonwebtoken": undefined,
//             "loginStatus": false
//         }
//     }
// };


// export function UserContextProvider(props) {

//     const [state, dispatch] = useReducer(reducer, initialState);

//     // Functions to change user state
//     const setUserState = useCallback(
//         function(payload) {



//             // If user logs in
//             if (payload.loginStatus === true) {
//                 // Put the details of user in localStorage
//                 localStorage.setItem('firstName', payload.firstName);
//                 localStorage.setItem('lastName', payload.lastName);
//                 localStorage.setItem('email', payload.email);
//                 localStorage.setItem('avatar', payload.avatar);
//                 localStorage.setItem('jsonwebtoken', payload.jsonwebtoken);

//                 const theAction = {
//                     type: UPDATE_USER,
//                     payload: payload
//                 }

//                 dispatch(
//                     theAction
//                 );
          
//             } 
//             // If user logs out
//             else {

//                 // Clear the session storage
//                 localStorage.clear();

//                 // Dispatch an empty object for the state
//                 const theAction = {
//                     type: LOGOUT,
//                 }

//                 dispatch(
//                     theAction
//                 ); 
//             }

//         },
//         [ dispatch ]
//     );

//     return (
//         <Context.Provider 
//         value={
//             {
//                 state,       // Provide consumers with current state
//                 setUserState // Provide consumers with function to change the current state
//             }
//         }>
//             {props.children}
//         </Context.Provider>
//     )
// };