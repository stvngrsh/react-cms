import React, { Component } from 'react';
import Page from './pages/Page';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CarPage from './pages/CarPage';
import CarGallery from './pages/CarGallery';
import AdminHome from './pages/AdminHome';
import AdminEdit from './pages/AdminEdit';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import 'font-awesome/scss/font-awesome.scss';    

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <Route exact path="/" component={Page}/>
          <Route path="/cars/:carId" component={CarPage}/>
          <Route exact path="/cars" component={CarGallery}/>
          <Route exact path="/admin" component={AdminHome}/>
          <Route path="/admin/:dataObject" component={AdminEdit}/>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
