import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Admin extends Component {

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
                    carData: data[item]
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
                <h1>Car Database:</h1>
                <table><tbody>
                    <tr>
                        <th>Year</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Actions</th>
                    </tr>
                    {this.state.cars.map((car, i) => {
                        let link = '/cars/' + car.id;
                        return (
                            <tr key={i}>
                                <th>{car.carData.year}</th>
                                <th>{car.carData.make}</th>
                                <th>{car.carData.model}</th>
                                <th>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody></table>
                <button>Add New Car</button>
            </div>
        );
    }
}

export default Admin;