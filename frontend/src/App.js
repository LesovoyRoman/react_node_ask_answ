import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Questions from './components/Questions/Questions';
import Question from "./components/Questions/Question";
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login";
const Path_port = 'http://localhost:7777/api/questions/';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Route exact path="/" component={Questions}/>
                <Route exact path="/question/:questionId" component={Question} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </div>
        );
    }
}

export default App;
export {Path_port};
