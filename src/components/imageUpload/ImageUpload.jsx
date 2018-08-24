import React, { Component } from 'react';
import FileUploader from "react-firebase-file-uploader";
import { images } from '../../firebase';
import './ImageUpload.scss';
import Dropzone from 'react-dropzone'

class ImageUpload extends Component {

    constructor(props, context) {
        super(props, context);
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log('Drop:', acceptedFiles, rejectedFiles);

        this.startUpload(acceptedFiles);
    }
    
    handleImageSelect = (e) => {
        const {target: {files}} = e;
        const filesToStore = [];
        Array.from(files).forEach(file => filesToStore.push(file));
        
        this.startUpload(filesToStore);
    }
    
    startUpload = (filesToStore) => {
        filesToStore.forEach((file, index) => {
            this.fileUploader.startUpload(file);
        });
    }

    handleUploadStart = (file, task) => {
        console.log('UPLOAD START :', file, task);
        let {files} = this.props;
        let fileObj = {
            file: file,
            isUploading: true,
            progress: 0,
            url: null,
            uploadError: false,
            taskId: task.snapshot.ref.fullPath
        }
        files.push(fileObj);
        this.props.updateImages(files);
    }

    handleProgress = (progress, task) => {
        console.log('ON PROGRESS :', progress, task);
        let {files} = this.props || [];
        files.forEach((fileObj, index, arr) => {
            if(fileObj.taskId === task.snapshot.ref.fullPath) {
                arr[index].progress = progress;
            }
        });
        this.props.updateImages(files);
    }

    handleUploadError = (error, task) => {
        console.log('ON ERROR :', error, task);

        let {files} = this.props || [];
        files.forEach((fileObj, index, arr) => {
            if(fileObj.taskId === task.snapshot.ref.fullPath) {
                arr[index].uploadError = true;
                arr[index].isUploading = false;
            }
        });
        this.props.updateImages(files);
        console.error(error);
    }

    handleUploadSuccess = (filename, task) => {
        console.log('ON SUCCESS :', filename, task);

        let {files} = this.props;
        files.forEach((fileObj, index, arr) => {
            if(fileObj.taskId === task.snapshot.ref.fullPath) {
                arr[index].progress = 100;
                arr[index].isUploading = false;
                images.child(filename).getDownloadURL().then(url => {
                    arr[index].url = url;
                    this.props.updateImages(files);
                });
            }
        });
    };

    render() {
        return (
            <div className="ImageUpload">
                <Dropzone className="drop-target" onDrop={this.onDrop} accept="image/*" activeClassName="active" rejectClassName="reject">
                    <h4>Drag an image file here to upload</h4>
                </Dropzone>
                <div className="thumbnails">
                    {this.props.files.map((image, i) => {
                        return (
                            <div className="thumbnail" key={i}>
                                <h3>{image.file.name}</h3>
                                <h5>{image.isUploading}</h5>
                                <h5>{image.progress}</h5>
                                <a href={image.url} target="_blank">
                                    <img src={image.url} />
                                </a>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <FileUploader
                        onChange={this.handleImageSelect}
                        ref={instance => {this.fileUploader = instance; }}
                        accept="image/*"
                        name="image"
                        randomizeFilename
                        multiple
                        storageRef={images}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </div>
            </div>
        );
    }
}

ImageUpload.defaultProps = {
    files: []
}

export default ImageUpload;
