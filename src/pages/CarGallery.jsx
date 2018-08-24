import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CarTile from '../components/carTile/CarTile';
import CarList from '../components/carList/CarList';
import {carsData} from '../firebase';
import { arrayPush } from '../Utils';

class CarGallery extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            cars: []
        }
    }
    
    componentDidMount() {
        console.log('carsData :', carsData);
        carsData.collection('items').get().then(querySnapshot => {
            let cars = [];
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                arrayPush(doc, cars);
            });
        }).catch(error => {
            console.log("Error getting document:", error);
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