import { useThemeProps } from '@mui/material';
import * as React from 'react';
// import Card from './Card';
import ProfileHeader from './ProfileHeader'
import ProfileImages from './ProfileImages';

let props = {firstName: 'John', lastName: 'Smith', bio: 'John Smith'};

function Profile(props) {
    
    let firstName ="john";
    let lastName ="Smith";

    return(
        <>
            <div style={{"backgroundColor":"aquamarine"}} className="bg">
            <ProfileHeader/>
            <ProfileImages/>
            </div>
        </>
    )
}

export default Profile;