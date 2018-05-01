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
        let carData = this.props.carData;
        let logos = this.props.logos;

        if(Object.keys(carData).length && Object.keys(logos).length && this.state.logo === prevState.logo) {
            let logoImg = this.props.logos[this.props.carData.make];
            let image = storageRef.child(logoImg).getDownloadURL();
            image.then(url => {
                this.setState({
                    logo: url
                })
            })
        }
    }
        
    
    render() {
        console.log('this.props.carData :', this.props.carData);
        let logo = this.state.logo;
        let carData = this.props.carData;
        return (
            <div>
                <img src={ logo } />
                <div>{ carData.year }<span> { carData.make }</span></div>
                <div>{ carData.model }</div>
                <div>{ carData.detail }</div>
            </div>
        );
    }
    
}

Overview.defaultProps = {
    carData: {},
    logos: {}
}

export default Overview;