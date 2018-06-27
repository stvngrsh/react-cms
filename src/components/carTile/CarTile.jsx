import React, { Component } from 'react';
import './style.scss';

class CarTile extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            imageUrl: ""
        }
    }

    getPath(id, filename) {
        return 'cars/' + id + '/' + filename;
    }

    componentDidMount() {
        if(this.props.car) {
            this.getImage();
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.car !== this.props.car) {
            this.getImage();
        }
    }
    
    getImage() {
        // let car = this.props.car;
        // if(car.images && car.images.length) {
        //     let path = this.getPath(car.id, car.images[0]);
        //     let imageRef = firebase.storage().ref().child(path).getDownloadURL();
        //     imageRef.then(url => {
        //         this.setState({ imageUrl: url });
        //     });
        // }
    }

    render() {
        let car = this.props.car;
        return (
            <div className="CarTile">
                <div className="tile-banner">
                    <img className="flag"  />
                    <h3><b>{car.data.make}</b> {car.data.model}</h3>
                </div>
                <div className="outer-image">
                    <img className="inner-image" src={this.state.imageUrl}/>
                </div>
            </div>
        );
    }
}

export default CarTile;