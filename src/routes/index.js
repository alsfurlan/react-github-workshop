import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Repositories from "../pages/Repositories";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} ></Route>
            <Route path="/repositories" component={Repositories} ></Route>
        </Switch>
    )

}