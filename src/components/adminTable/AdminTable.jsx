import React, { PureComponent } from 'react';

class AdminTable extends PureComponent {
    render() {
        return (
            <div className="AdminTable">
                <h1>Car Database:</h1>
                <table><tbody>
                    <tr>
                        <th>Year</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Actions</th>
                    </tr>
                    {this.props.cars.map((car, i) => {
                        let link = '/cars/' + car.id;
                        return (
                            <tr key={i}>
                                <th>{car.data.year}</th>
                                <th>{car.data.make}</th>
                                <th>{car.data.model}</th>
                                <th>
                                    <button onClick={e => this.props.editCar(e, car)}>Edit</button>
                                    <button onClick={e => this.props.toggleCar(e, car)}>{car.active ? "Deactivate" : "Activate"}</button>
                                    <button onClick={e => this.props.deleteCar(e, car)}>Delete</button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody></table>
                <button onClick={e => this.props.addCar(e)}>Add New Car</button>
            </div>
        );
    }
}

export default AdminTable;