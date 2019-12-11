import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import UserList from "./UserList";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Dynamic from "./components/pages/Dynamic";
import AppDragDropDemo from "./components/pages/AppDragDropDemo";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container root-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dynamic" component={Dynamic} />
              <Route exact path="/drag-drop-demo" component={AppDragDropDemo} />
            </Switch>
          </div>
          <Footer />
          {/* <UserList /> */}
        </div>
      </Router>
    );
  }
}

export default App;
