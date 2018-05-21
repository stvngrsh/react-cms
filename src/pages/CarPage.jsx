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
            car: {},
            logos: {}
        }
    }

    componentDidMount() {
        let carId = this.props.match.params.carId;
        const carData = firebase.database().ref('data-objects/cars/items/' + carId);
        carData.on('value', (snapshot) => {
            let data = snapshot.val();
            if(data) {
                console.log('data :', data);
                this.setState({
                    carId: carId,
                    car: data
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
                <Overview car={this.state.car} logos={this.state.logos}/>
                <GetQuote car={this.state.car} url={this.props.match.url}/>
                <ImageGallery car={this.state.car} carId={this.state.carId} />
            </div>
        );
    }
}

export default CarPage;