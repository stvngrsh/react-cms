import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import AdminTable from '../components/adminTable/AdminTable';
import AdminForm from '../components/adminForm/AdminForm';

class Admin extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            cars: [],
            formActive: false,
            formElements: {}
        }
    }

    closeForm = e => {
        this.setState({formActive: false});
    }

    addCar = e => {
        this.setState({formActive: true});
    }

    deleteCar(e, i) {

    }
    
    editCar(e, i) {

    }

    componentDidMount() {
        const carData = firebase.database().ref('data-objects/cars');
        carData.on('value', (snapshot) => {
            let data = snapshot.val();

            let formElements = data.keys;
            let items = data.items;

            let newState = [];
            for(let item in items) {
                newState.push({
                    id: item,
                    carData: items[item]
                });
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
                {!this.state.formActive && <AdminTable addCar={this.addCar} deleteCar={this.deleteCar} editCar={this.editCar} cars={this.state.cars}/>}
                {this.state.formActive && <AdminForm closeForm={this.closeForm} formElements={this.state.formElements} />}
            </div>
        );
    }
}

export default Admin;