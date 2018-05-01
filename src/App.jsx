import React, { Component } from 'react';
import Page from './pages/Page';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CarPage from './pages/CarPage';
import CarGallery from './pages/CarGallery';
import Admin from './pages/Admin';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Page}/>
          <Route path="/cars/:carId" component={CarPage}/>
          <Route exact path="/cars" component={CarGallery}/>
          <Route exact path="/admin" component={Admin}/>
        </div>
      </Router>
    );
  }
}

export default App;
