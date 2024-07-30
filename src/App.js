import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

class App extends Component {


  render() {

    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home}>
            </Route>
            <Route path='*' component={NotFound}>
            </Route>
          </Switch>
          <Footer />

        </Router>
      </>
    );
  }
}



export default App;
