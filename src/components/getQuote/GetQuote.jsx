import React, { Component } from 'react';

class GetQuote extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            name: "",
            email: "",
            message: "",
            subject: "",
            url: "",
            formOpen: false
        }

    }

    handleNameChange = e => {
        this.setState({name: e.target.value});
    }

    handleEmailChange = e => {
        this.setState({email: e.target.value});
    }

    handleMessageChange = e => {
        this.setState({message: e.target.value});
    }

    handleSubmit = e => {
        alert('Form Submitted');
        this.setState({
            name: "",
            eamil: "",
            message: "",
            formOpen: false
        });
        e.preventDefault();
    }

    openForm = e => {
        if(this.props.carData) {
            let subject = "Car Inquiry: " + this.props.carData.year + " " + this.props.carData.make + " " + this.props.carData.model;
            this.setState({
                subject: subject,
                url: this.props.url,
                formOpen: true
            });
        }
    }
    
    renderForm() {
        return(
            <div>
                <h2>Contact Form</h2>
                <form>
                    <label>
                        Subject:
                        <input type="text" name="subject" disabled value={this.state.subject}/>
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <label>
                        Message:
                        <input type="text" value="message" value={this.state.message} onChange={this.handleMessageChange}/>
                    </label>
                    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="GetQuote">
                <button onClick={this.openForm} >Contact Us</button>
                <div>Or Call 1-800-555-5555</div>
                {this.state.formOpen ? this.renderForm() : ""}
            </div>
        );
    }
}

GetQuote.defaultProps = {
    carData: {}
};

export default GetQuote;