import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import CarTile from '../components/carTile/CarTile';
import CarList from '../components/carList/CarList';

class CarGallery extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            cars: []
        }
    }
    
    componentDidMount() {
        const carData = firebase.database().ref('data-objects/cars/items');
        carData.on('value', (snapshot) => {
            let data = snapshot.val();
            let newState = [];
            for(let item in data) {
                let newCar = data[item];
                newCar.id = item;
                newState.push(newCar);
            }
            this.setState({
                cars: newState
            });
        });
    }

    render() {
        return (
            <div>
                <CarList cars={this.state.cars}></CarList>
            </div>
        );
    }
}

export default CarGallery;