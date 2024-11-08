import React from 'react'
import { MenuItem as MuiMenuItem, MenuItemProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

interface MenuItemLinkProps extends MenuItemProps {
    to: LinkProps['to'];
    label: string;
};

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ to, label, ...props }) => {
    return (
        <MuiMenuItem 
            component={Link}
            to={to}
            {...props}
        >
            {label}
        </MuiMenuItem>
    );
};

export default MenuItemLink;
