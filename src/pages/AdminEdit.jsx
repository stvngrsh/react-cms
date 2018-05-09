import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import AdminTable from '../components/adminTable/AdminTable';
import AdminForm from '../components/adminForm/AdminForm';

class AdminEdit extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            cars: [],
            formActive: false,
            formElements: {},
            activeCar: false
        }
    }

    closeForm = e => {
        this.setState({formActive: false, activeCar: false});
    }

    addCar = e => {
        this.setState({formActive: true});
    }

    deleteCar(e, car) {
        firebase.database().ref('data-objects/cars/items/' + car.id).update({
            deleted: true
        });
    }
    
    editCar = (e, car) => {
        this.setState({formActive: true, activeCar: car});
    }

    toggleCar(e, car) {
        firebase.database().ref('data-objects/cars/items/' + car.id).update({
            active: !car.active
        });
    }

    submitForm = (e, formData) => {
        console.log(formData);
        e.preventDefault();
        if(this.state.activeCar) {
            firebase.database().ref('data-objects/cars/items/' + this.state.activeCar.id).update({
                data: formData
            }, err => {
                if(err) {
                    console.error(err);
                } else {
                    this.closeForm();
                }
            });
        } else {
            firebase.database().ref('data-objects/cars/items').push({
                active: true,
                data: formData
            }, err => {
                if(err) {
                    console.error(err);
                    //TODO: render error here
                } else {
                    this.closeForm();
                }
            });
        }
    }

    componentDidMount() {
        const carData = firebase.database().ref('data-objects/cars');
        carData.on('value', (snapshot) => {
            let data = snapshot.val();

            let formElements = data.keys;
            let items = data.items;

            let newState = [];
            for(let item in items) {
                if(!items[item].deleted) {
                    newState.push({
                        id: item,
                        active: items[item].active,
                        data: items[item].data
                    });
                }
            }
            this.setState({
                cars: newState,
                formElements: formElements
            });
        });
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

export default AdminEdit;