import React from "react";
import Previous from "./Previous";
import Translate from "./Translate";
import Compile from "./Compile";
import Header from "./Header";

import TestYuuvis from "../Components/testYuuvis";

import { BrowserRouter, Switch, Route } from "react-router-dom";
export default props => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/" exact component={Translate} />
        <Route path="/previous" exact component={Previous} />
        <Route path="/compile" exact component={Compile} />
        <Route path="/test" exact component={TestYuuvis} />
      </Switch>
    </BrowserRouter>
  );
};
