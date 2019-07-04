import React from 'react';
import {Switch,Route} from "react-router-dom";

import Home from './home';
import Characters from './characters';
import Locations from './locations';
import Episodes from './episodes';


const Main = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/characters" component={Characters}/>
        <Route exact path="/locations" component={Locations}/>
        <Route exact path="/episodes" component={Episodes}/>
    </Switch>
);

export default Main;