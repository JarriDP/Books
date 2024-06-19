import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {NavLink as RouterNavLink} from 'react-router-dom';

const NavLink = ({to, children}) =>{
    return (
        
            <RouterNavLink to={to} activeclassname="active" className="navLinkP">
            {children}
        </RouterNavLink>

        
    );
};
export default NavLink;