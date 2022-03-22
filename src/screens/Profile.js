import { useThemeProps } from '@mui/material';
import * as React from 'react';
// import Card from './Card';
import ProfileHeader from './ProfileHeader'
import ProfileImages from './ProfileImages';

function Profile() {
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