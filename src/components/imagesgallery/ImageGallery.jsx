import React, { Component } from 'react';
import firebase from '../../firebase';

const storageRef = firebase.storage().ref();
class ImageGallery extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let carId = this.props.carId;
        let carData = this.props.carData;

        if(carId && prevProps.carId !== this.props.carId && carData && carData.images) {
            let imagesRef = storageRef.child(carId);
            for(let image in carData.images) {
                let image = imagesRef.child(carData.images[image]).getDownloadURL();
                image.then(url => {
                    let images = this.state.images;
                    images.push(url);
                    this.setState({images: images});
                });
            }            
        }
    }

    render() {
        console.log('this.state.images :', this.state.images);
        let images = this.state.images.sort();
        return (
            <div className="ImageGallery">
                {images.map((image, i) => {
                    return (
                        <img key={i} src={image} />
                    );
                })};
            </div>
        );
    }
}

export default ImageGallery;