import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminTable from '../components/adminTable/AdminTable';
import AdminForm from '../components/adminForm/AdminForm';
import { carsData } from '../firebase';
import { arrayPush } from '../Utils';

class CarAdmin extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            cars: [],
            formActive: false,
            formElements: {},
            activeCar: false
        }
    }

    componentDidMount() {
        let keyPromise = carsData.onSnapshot(doc => {
            console.log('doc.data() :', doc.data());
            let formElements = doc.data().keys;
            this.setState({
                formElements: formElements
            }, () => {
                console.log('newState :', this.state);
            });
        });
        let itemsPromise = carsData.collection('items').onSnapshot(querySnapshot => {
            let cars = [];
            console.log('New Snapshot :', querySnapshot);
            querySnapshot.forEach(doc => {
                arrayPush(doc, cars);
                console.log(doc.id, " => ", doc.data());
            });
            this.setState({
                cars: cars
            }, () => {
                console.log('newState :', this.state);
            });
        });
    }

    closeForm = e => {
        this.setState({formActive: false, activeCar: false});
    }

    addCar = e => {
        this.setState({formActive: true});
    }

    deleteCar(e, car) {
        carsData.collection('items').doc(car.id).update({
            deleted: true
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    
    editCar = (e, car) => {
        this.setState({formActive: true, activeCar: car});
    }

    toggleCar(e, car) {
        carsData.collection('items').doc(car.id).update({
            active: !car.active
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    submitForm = (e, formData, images) => {
        e.preventDefault();
        if(this.state.activeCar) {
            carsData.collection('items').doc(this.state.activeCar.id).update({
                data: formData
            }).then(() => {
                console.log("Document successfully updated!");
                this.closeForm();
            }).catch(error => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        } else {
            carsData.collection('items').add({
                active: true,
                data: formData
            }).then(() => {
                console.log("Document successfully updated!");
                this.closeForm();
            }).catch(error => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }
    
    ActiveForm(props) {
        if(this.state.formActive) {
            return <AdminForm />
        }
    }  

    render() {
        return (
            <div>
                {!this.state.formActive && <AdminTable addCar={this.addCar} toggleCar={this.toggleCar} deleteCar={this.deleteCar} editCar={this.editCar} cars={this.state.cars}/>}
                {this.state.formActive && <AdminForm closeForm={this.closeForm} formElements={this.state.formElements} submitForm={this.submitForm} activeCar={this.state.activeCar}/>}
            </div>
        );
    }
}

export default CarAdmin;