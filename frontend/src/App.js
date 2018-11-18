import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Questions from './Questions/Questions';
import Question from "./Questions/Question";
const Path_port = 'http://localhost:7777/api/questions/';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Route exact path="/" component={Questions}/>
                <Route exact path="/question/:questionId" component={Question} />
            </div>
        );
    }
}

export default App;
export {Path_port};
