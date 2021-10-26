import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import {Users} from "./features/users/Users";
import User from "./features/users/User";
import Create from "./features/users/Create";
import Container from 'react-bootstrap/Container'
import Edit from "./features/users/Edit";
import {Plan} from "./features/users/Plan"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Login from "./features/Login";

function App() {
    // const [token, setToken] = useState();

    // if(!token) {
    //     return <Login setToken={setToken} />
    // } else {
        return (
            <div>
                <header>header</header>
                <Router>
                    <Container>
                        <Switch>
                        <Route path="/users/plan/:id">
                                <Plan/>
                            </Route>
                            <Route path="/users/edit/:id">
                                <Edit/>
                            </Route>
                            <Route path="/users/:id">
                                <User/>
                            </Route>
                            <Route path="/users/create">
                                <Create/>
                            </Route>
                            <Route path="/">
                                <Users/>
                            </Route>
                        </Switch>
                    </Container>
                </Router>
                <footer>footer</footer>

            </div>
        )
    // }
}

export default App;
