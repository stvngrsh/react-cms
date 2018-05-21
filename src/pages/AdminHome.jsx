import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class AdminHome extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            dataObjects: []
        }
    }

    componentDidMount() {
        const dataObjects = firebase.database().ref('data-objects');
        dataObjects.on('value', (snapshot) => {
            let data = snapshot.val();
            let newDataObjects = [];
            for(let item in data) {
                newDataObjects.push({
                    id: item,
                    title: data[item].title
                });
            }
            this.setState({
                dataObjects: newDataObjects
            });
        });
    }


    render() {
        let dataObjects = this.state.dataObjects || [];
        return (
            <div>
                <ul>
                    {dataObjects.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={'/admin/' + item.id}>{item.title}</Link>
                            </li>
                        );                            
                    })}
                </ul>
            </div>
        );
    }
}

export default AdminHome;