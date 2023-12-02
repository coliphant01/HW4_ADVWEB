import './App.css';
import NavBar from "./NavBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home";
import Customers from "./Customers";
import Items from "./Items";
import Sales from "./Sales";
import NotFound from "./NotFound";

function App() {
    return (
        <div className = "App">
            <NavBar />
            <Router>
                <Switch>
                    <Route exact path = "/">
                        <Home />
                    </Route>
                    <Route path="/customers">
                        <Customers />
                    </Route>
                    <Route path="/items">
                        <Items />
                    </Route>
                    <Route path="/sales">
                        <Sales />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
