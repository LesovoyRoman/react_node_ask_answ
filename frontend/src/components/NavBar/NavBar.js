import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
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