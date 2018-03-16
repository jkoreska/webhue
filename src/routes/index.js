import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "components/page/home";
import ErrorPage from "components/page/error";

import RouteHandler from "./handler";

export default (
  <div>
    <Route component={RouteHandler} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/error" component={ErrorPage} />
      <Route component={ErrorPage} />
    </Switch>
  </div>
);
