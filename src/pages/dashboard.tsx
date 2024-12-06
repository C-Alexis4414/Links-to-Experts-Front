import React from 'react'
import UserCard from '../components/userCard/userCard'
import Login from './login';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import Register from './register';

function DashboardPage() {
    return (
    <>

        <UserCard name="toto" role="Dev" avatarSrc="Links-to-Experts-Front\src\app\pages\page.tsx" />
       
        
    </>
    )
}

export default DashboardPage