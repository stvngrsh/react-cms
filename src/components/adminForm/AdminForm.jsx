import React, { Component } from 'react';
import './AdminForm.scss';
import ImageUpload from '../imageUpload/ImageUpload';

class AdminForm extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            formData: {},
            images: [],
            selectOptions: {},
            files: []
        }
    }

    componentDidMount() {
        if(this.props.activeCar) {
            this.setState({
                formData: this.props.activeCar.data,
                images: this.props.activeCar.images,
            });
        } else {
            this.setListItems();
        }
        this.setSelectOptions();
    }

    setSelectOptions() {
        let formElements = this.props.formElements;
        for (let key in formElements) {
            if(formElements[key].type === 'dataObject') {
                let dataObject = formElements[key].dataObject;

                const dataObjects = firebase.database().ref('data-objects/' + dataObject);
                dataObjects.on('value', (snapshot) => {
                    let data = snapshot.val();

                    let items = data.items;
                    let dataObjectList = [];
                    for(let item in items) {
                        dataObjectList.push({
                            key: item,
                            data: items[item]
                        });
                    }
                    let selectOptions = this.state.selectOptions;
                    selectOptions[dataObject] = dataObjectList;
                    this.setState({
                        selectOptions: selectOptions
                    });
                });
            }
        }
    }
    
    setListItems(){
        let formData = this.state.formData;
        let formElements = this.props.formElements;
        for(let key in formElements) {
            if(formElements[key].type === "list") {
                let defaults = formElements[key].default;
                formData[key] = {};
                for(let defaultKey in defaults) {
                    formData[key][defaultKey] = {
                        name: defaults[defaultKey],
                        value: ""
                    }
                }
            }
        }
        this.setState({formData: formData});
    }
    
    componentDidUpdate(prevProps, prevState) {

        if(prevProps.formElements !== this.props.formElements) {
            if(!this.props.activeCar) {
                this.setListItems();
            }
            this.setSelectOptions();
        }

    }

    addListItem(e, key) {
        e.preventDefault();
        let currentKeys = Object.keys(this.state.formData[key]);
        let keyNums = [];
        currentKeys.forEach(key => {
            keyNums.push(parseFloat(key));
        });
        keyNums.sort((a, b) => {
            return b - a;
        });
        let newKey = 0;
        if(keyNums.length > 0) {
            newKey = keyNums[0] + 1;
        }

        let formData = this.state.formData;
        formData[key][newKey] = {
            name: "",
            value: ""
        };
        this.setState({formData: formData});
    }

    removeListItem(e, key, itemKey) {
        e.preventDefault();
        let formData = this.state.formData;
        delete formData[key][itemKey];
        this.setState({formData: formData});
    }

    handleFieldChange(e, key) {
        let formData = this.state.formData;
        formData[key] = e.target.value;
        this.setState({formData: formData});
    }

    handleListItemChange(e, key, itemKey, isName) {
        let formData = this.state.formData;
        if(isName) {
            formData[key][itemKey].name = e.target.value;
        } else {
            formData[key][itemKey].value = e.target.value;
        }
        this.setState({formData: formData});
    }

    renderFormElement(key, formElement, i) {
        switch(formElement.type){
            case "number":
                return (
                    <input type="text" name={key} key={i} value={this.state.formData[key] || ""} onChange={e => this.handleFieldChange(e, key)}/>
                );
                break;
            case "shorttext":
                return (
                    <input type="text" name={key} key={i} value={this.state.formData[key] || ""} onChange={e => this.handleFieldChange(e, key)}/>
                );
                break;
            case "longtext":
                return (
                    <textarea name={key} key={i} value={this.state.formData[key] || ""} onChange={e => this.handleFieldChange(e, key)}></textarea>
                );
                break;
            case "list":
                let listObj = this.state.formData[key];
                if(listObj) {
                    let listKeys = Object.keys(listObj);
                    return (
                        <div>
                            <ul>
                                {listKeys.map((itemKey, itemIndex) => {
                                    return(
                                        <li key={itemIndex}>
                                            <input type="text" className="list-item name" name={key + "-" + itemKey + "-name"} value={this.state.formData[key][itemKey].name || ""} onChange={e => this.handleListItemChange(e, key, itemKey, true)}/>
                                            <input type="text" className="list-item value" name={key + "-" + itemKey + "-value"} value={this.state.formData[key][itemKey].value || ""} onChange={e => this.handleListItemChange(e, key, itemKey, false)}/>
                                            <button onClick={e => this.removeListItem(e, key, itemKey)}>Remove</button>
                                        </li>    
                                    );
                                })}
                            </ul>
                            <button onClick={e => this.addListItem(e, key)}>Add Item</button>
                        </div>
                    );
                }
                break;
            case "dataObject":
                let dataObject = formElement.dataObject;
                let dataObjects = this.state.selectOptions[dataObject] || [];
                return (
                    <select name={key} key={i} value={this.state.formData[key] || ""} onChange={e => this.handleFieldChange(e, key)}>
                        <option value="" disabled hidden>Select an option</option>
                        {dataObjects.map((item, i) => {
                            return (
                                <option key={i} value={item.key}>{item.data.title}</option>
                            );
                        })}
                    </select>
                );
                break;
            case "imageSelect":
                return (
                    <div>
                        <div className="thumbnails">
                            <h2>Current Images:</h2>
                            {this.state.images && this.state.images.map((image, i) => {
                                return (
                                    <div className="thumbnail" key={i}>
                                        <button className="delete" onClick={e => this.removeImage(e, i)} >X</button>
                                        <img src={image.url} />
                                    </div>
                                );
                            })}
                        </div>
                        <ImageUpload updateImages={this.updateImages} files={this.state.files}/>
                    </div>
                );
                break;
        }
    }

    removeImage = (e, i) => {
        e.preventDefault();
        let {images} = this.state;
        images.splice(i, 1);
        this.setState({images: images});
    }

    updateImages = (files) => {
        if(!files) {
            files = [];
        }
        this.setState({
            files: files
        });
    }

    handleSubmit = (e, formData) => {
        e.preventDefault();

        let allowSubmit = true;
        for(let file of this.state.files) {
            console.log('file :', file);
            if(file.isUploading) {
                allowSubmit = false;
                alert("Please allow files to finish uploading;");
                break;
            }
        }
        let images = this.state.images;
        for(let file of this.state.files) {
            images.push({url: file.url});
        }
        if(allowSubmit) {
            this.props.submitForm(e, formData, images);
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
                    let Tag = formElements[key].type === 'imageSelect' ? `div` : `label`;
                    return (
                        <Tag key={i}>
                            {formElements[key].title}
                            {this.renderFormElement(key, formElements[key], i)}
                        </Tag>
                    );
                })}
                <button onClick={e => this.handleSubmit(e, this.state.formData)}>{this.props.activeCar ? "Update Car" : "Add New Car"}</button>
                </form>
            </div>
        );
    }
}

export default AdminForm;