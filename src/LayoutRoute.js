import { Route } from 'react-router-dom';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import React from 'react';
import MainScreen from './screens/MainScreen.js';

function LayoutRoute(props) {
    return (
        <>
            {/* <Route path='/' exact={true} component={MainScreen} /> */}
            <NavBar {...props} />
            <Route path={props.path} exact={props.exact} component={props.component} />
            <Footer {...props} />
        </>
    )
};

export default LayoutRoute;