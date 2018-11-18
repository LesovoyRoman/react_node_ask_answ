import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/NavBar/NavBar'
import Questions from './components/Questions/Questions';
import Question from "./components/Questions/Question";
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login";


class App extends Component {
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
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

const Path_port = 'http://localhost:7777/api/';

export default App;
export {Path_port};
