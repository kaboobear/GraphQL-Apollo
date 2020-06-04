import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Main from './components/main'

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="wrapper">
                    <Route path='/' exact strict component={Main}/>
                </div>
            </Router>
        );
    }
}

export default App;
