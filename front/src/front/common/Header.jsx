import React from 'react';
import Navbar from './Navbar';
import {Nav, NavDropdown } from 'react-bootstrap';
import logo from './resources/logo.png';
import { Col } from 'react-bootstrap';

const Header = ({}) => {
    return (
        <Col xs={10}>
            <header className='header'>
            <img src={logo} alt= "logo" className= "logo"/>
            <h1>Books</h1>
            <Navbar/>
        </header>
        </Col>
        
    );
};
export default Header;