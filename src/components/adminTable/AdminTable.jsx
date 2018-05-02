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
                                <th>{car.carData.year}</th>
                                <th>{car.carData.make}</th>
                                <th>{car.carData.model}</th>
                                <th>
                                    <button onClick={e => this.props.editCar(e, i)}>Edit</button>
                                    <button onClick={e => this.props.deleteCar(e, i)}>Delete</button>
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