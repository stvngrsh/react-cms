import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CarTile from '../carTile/CarTile';
import './style.scss';

class CarList extends Component {
    render() {
        return (
            <div className="CarList">
                <ul>
                    {this.props.cars.map((car, i) => {
                        let link = '/cars/' + car.id;
                        return (
                            <li key={i}>
                                <Link to={link}>                          
                                    <CarTile car={car}></CarTile>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CarList;