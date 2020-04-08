import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Room from "./pages/Room";
import SingleRoom from "./pages/SingleRoom";
import Navbar from "./components/Navbar"

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Room} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
