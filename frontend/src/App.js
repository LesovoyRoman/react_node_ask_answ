import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authentication";
/*import { getQuestions } from "./actions/questions";*/

import NavBar from './components/NavBar/NavBar'
import Questions from './components/Questions/Questions';
import Question from "./components/Questions/Question";
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login";
import CreateQuestion from "./components/Questions/CreateQuestion"

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {
    /*componentDidMount() {
        store.dispatch(getQuestions());
    }*/

    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div>
                        <NavBar/>
                        <div className="container">
                            <Route exact path="/" component={Questions}/>
                            <Route exact path="/question/:questionId" component={Question} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/createQuestion" component={CreateQuestion} />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

const Path_port = 'http://localhost:7777';

export {Path_port};

export default App
