import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

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
                newState.push({
                    id: item,
                    year: data[item].year,
                    make: data[item].make,
                    model: data[item].model
                });
            }
            this.setState({
                cars: newState
            });
        });
    }


    render() {
        return (
            <div>
                <ul>
                {this.state.cars.map((car, i) => {
                    let link = '/cars/' + car.id;
                    return (
                        <li key={i}>
                            <Link to={link}>Car {car.id}: {car.year} {car.make}</Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default CarGallery;