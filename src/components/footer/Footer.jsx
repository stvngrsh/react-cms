import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

class Footer extends Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            logoImage: ""
        }
    }
    
     
    componentDidMount() {
        // let imageRef = firebase.storage().ref().child('logo-black.png').getDownloadURL();
        // imageRef.then(url => {
        //     this.setState({logoImage: url});
        // })
    }

    render() {
        return (
            <div className="Footer">
                <div className="container">
                    <img className="logo" src={this.state.logoImage} />
                    <p>
                        <span><a href="mailto:kelly@classictag.net">kelly@classictag.net</a></span>
                        <span> | </span>
                        <span>(412) 737-5593</span>
                    </p>
                    <div className="social-icons">
                        <i className="fa fa-facebook-square" />
                        <i className="fa fa-twitter-square" />
                        <i className="fa fa-linkedin-square" />
                        <i className="fa fa-instagram" />
                    </div>
                    <p>
                        <span>@ 2018 Kelly Dietrick Broker Ltd.</span>
                        <span> | </span>
                        <span><Link to="contact-us">Contact Us</Link></span>
                        <span> | </span>
                        <span><Link to="terms-and-conditions">Terms & Conditions</Link></span>
                        <span> | </span>
                        <span><Link to="privacy-policy">Privacy Policy</Link></span>
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;