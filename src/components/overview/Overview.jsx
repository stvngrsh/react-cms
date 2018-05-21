import React, { Component } from 'react';
import firebase from '../../firebase';

const storageRef = firebase.storage().ref().child('logos');

class Overview extends Component {
    constructor() {

        super();
        this.state = {
            logo: ""
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        let car = this.props.car;
        let logos = this.props.logos;

        if(Object.keys(car).length && Object.keys(logos).length && this.state.logo === prevState.logo) {
            let logoImg = this.props.logos[this.props.car.data.make];
            let image = storageRef.child(logoImg).getDownloadURL();
            image.then(url => {
                this.setState({
                    logo: url
                })
            })
        }
    }
        
    
    render() {
        let logo = this.state.logo;
        if(this.props.car.data) {
            let carData = this.props.car;
            return (
                <div className="Overview">
                    <img src={ logo } />
                    <div>{ carData.year }<span> { carData.make }</span></div>
                    <div>{ carData.model }</div>
                    <div>{ carData.detail }</div>
                </div>
            );
        }
    }
    
}

Overview.defaultProps = {
    car: {},
    logos: {}
}

export default Overview;