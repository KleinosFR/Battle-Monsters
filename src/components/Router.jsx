import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from "../LoginPage/LoginPage"
import SelectPage from "../SelectPage/SelectPage"
import CreatePage from "../pages/CreatePage"
import Battle from "../pages/Battle"


function MyRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/select" component={SelectPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/battle" component={Battle} />
      </Switch>
    </BrowserRouter>
  );
}

export default MyRouter;