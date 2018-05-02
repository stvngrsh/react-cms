import React, { Component } from 'react';
import './style.scss';

class AdminForm extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            formData: {}
        }
    }
    

    handleMessageChange(e, key) {
        let formData = this.state.formData;
        formData[key] = e.target.value;
        this.setState({formData: formData});
    }

    renderFormElement(key, formElement, i) {
        switch(formElement.type){
            case "number":
                return (
                    <input type="text" name={key} value={this.state.formData.key} onChange={e => this.handleMessageChange(e, key)}/>
                );
                break;
            case "shorttext":
                return (
                    <input type="text" name={key} value={this.state.formData.key} onChange={e => this.handleMessageChange(e, key)}/>
                );
                break;
            case "longtext":
                return (
                    <textarea name={key} value={this.state.formData.key} onChange={e => this.handleMessageChange(e, key)}></textarea>
                );
                break;
            case "list":
                let 
                break;
        }
    }
    
    render() {
        let formElements = this.props.formElements;
        let formKeys = Object.keys(formElements);
        return (
            <div className="AdminForm">
                <button onClick={this.props.closeForm}>Cancel</button>
                <form>
                {formKeys.map((key, i) => {
                    return (
                        <label key={i}>
                            {formElements[key].title}
                            {this.renderFormElement(key, formElements[key], i)}
                        </label>
                    );
                })}
                </form>
            </div>
        );
    }
}

export default AdminForm;