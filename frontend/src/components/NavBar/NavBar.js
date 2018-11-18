import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg'

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                <img src={logo} className="App-logo" style={{ width: '40px' }} alt=""/>
                Home
            </Link>
            <Link className="navbar-brand" to="/register">
                Register
            </Link>
            <Link className="navbar-brand" to="/login">
                Login
            </Link>
        </nav>
    );
}

export default NavBar;