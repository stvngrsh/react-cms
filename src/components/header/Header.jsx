import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            logoImage: ""
        }
    }
    
    componentDidMount() {
        let imageRef = firebase.storage().ref().child('logo-white.png').getDownloadURL();
        imageRef.then(url => {
            this.setState({logoImage: url});
        })
    }
    
    render() {
        return (
            <div className="Header">
                <div className="top-nav">
                    <div className="container space-between">
                        <div className="left">
                            <img className="logo" src={this.state.logoImage} />
                            <h2>Exceptional Car Broker</h2>
                        </div>
                        <button className="btn btn-primary">Contact Us</button>
                    </div>
                </div>
                <div className="bottom-nav">
                    <div className="container">
                        <ul className="space-between">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Browse Cars</Link></li>
                            <li><Link to="/sell-cars">Sell Your Car</Link></li>
                            <li><Link to="/about">About Our Services</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;