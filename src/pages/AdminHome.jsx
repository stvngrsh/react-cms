import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { arrayPush } from '../Utils';

class AdminHome extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            dataObjects: []
        }
    }

    componentDidMount() {
        firestore.collection('data-objects').get().then(querySnapshot => {
            let dataObjects = [];
            querySnapshot.forEach(doc => {
                arrayPush(doc, dataObjects);
            });
            this.setState({
                dataObjects: dataObjects
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