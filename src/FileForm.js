import './App.css';
import React from 'react';

// Taken and adapted from my own, jjsoong-github-page, project (ImportFile.js).
class FileForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            file: null
        };

        this.onChange = this.onChange.bind(this);   
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (event) {
        if (event.target.files.length > 0) {
            this.setState({
                file: event.target.files[0]
            });
        } else {
            this.setState({
                file: null
            });
        }
    }

    onSubmit (event) {
        event.preventDefault();

        if (this.state.file) {
            this.props.importFile(this.state.file);
        } else {
            alert('No file selected. Nothing imported.');
        }
    }

    render () {
        return (
            <form className="ImportForm" onSubmit={this.onSubmit}>
                <div className="Text">
                    <label htmlFor="inputFile">Select File:</label><br/>
                    <input id="inputFile" type="file" accept=".json" onChange={this.onChange}/>
                </div>

                <div className="SubmitRow">
                    <input className="SubmitButton" type="submit" value="Import"/>
                    {this.props.children}
                </div>

            </form>
        );
    }
}

export default FileForm;