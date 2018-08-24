import React, { Component } from 'react';
import './style.scss';

class CarTile extends Component {

    render() {
        let car = this.props.car;
        console.log('car :', car);
        return (
            <div className="CarTile">
                <div className="tile-banner">
                    <img className="flag"  />
                    <h3><b>{car.data.make}</b> {car.data.model}</h3>
                </div>
                <div className="outer-image">
                    {car.images.length && <img className="inner-image" src={car.images[0].url}/>}
                </div>
            </div>
        );
    }
}

export default CarTile;