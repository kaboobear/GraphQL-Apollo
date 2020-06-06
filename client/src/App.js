import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import Item from './components/item'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";

const client = new ApolloClient({uri: '/graphql'})

class App extends React.Component {

    render() {
        return (
                <Router>
                    <ApolloProvider client={client}>
                        <div className="wrapper">
                            <Route path='/' exact component={Main}/>
                            <Route path='/item/:id' exact component={Item}/>
                        </div>
                    </ApolloProvider>
                </Router>
        );
    }
}

export default App;
