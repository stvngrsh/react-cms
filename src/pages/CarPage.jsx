import React, { Component } from 'react';
import firebase from '../firebase';
import Overview from '../components/overview/Overview';
import GetQuote from '../components/getQuote/GetQuote';
import ImageGallery from '../components/imagesgallery/ImageGallery';

class CarPage extends Component {

    constructor() {
        super();
        this.state = {
            carId: "",
            carData: {},
            logos: {}
        }
    }

    componentDidMount() {
        let carId = this.props.match.params.carId;
        const carData = firebase.database().ref('data-objects/cars/items/' + carId);
        carData.on('value', (snapshot) => {
            let data = snapshot.val();
            if(data) {
                this.setState({
                    carId: carId,
                    carData: data
                })
            }
        });

        let logos = firebase.database().ref('logos');
        logos.on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({
                logos: data
            })
        })
    }
    
    render() {
        return (
            <div>
                <Overview carData={this.state.carData} logos={this.state.logos}/>
                <GetQuote carData={this.state.carData} url={this.props.match.url}/>
                <ImageGallery carData={this.state.carData} carId={this.state.carId} />
            </div>
        );
    }
}

export default CarPage;