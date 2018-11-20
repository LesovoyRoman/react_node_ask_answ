import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom'
import logo from '../../logo.svg'

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render(){
        const {isAuthenticated} = this.props.auth;

        const authenticatedNavbar = (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className="App-logo" style={{ width: '40px' }} alt=""/>
                    Home
                </Link>
                <Link className="navbar-brand" to="#" onClick={this.onLogout.bind(this)}>Logout</Link>
            </nav>
        )

        const guestNavbar = (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className="App-logo" style={{ width: '40px' }} alt=""/>
                    Home
                </Link>
                <Link className="navbar-brand" to="/register">Sign Up</Link>
                <Link className="navbar-brand" to="/login">Sign In</Link>
            </nav>
        )

        return (
            isAuthenticated ? authenticatedNavbar : guestNavbar
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));