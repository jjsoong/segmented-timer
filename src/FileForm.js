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
            <form className="Inner" onSubmit={this.onSubmit}>
                <h3>{this.props.local.fileio}</h3>
                <p className="Text" style={{margin: "0em 0em 0.5em 0em"}}>{this.props.local.fileioSub}</p>
                <div className="FileInput">
                    <div className="LeftGroup">
                        <label htmlFor="inputFile">{this.props.local.selectFile}</label>
                    </div>
                    <input id="inputFile" type="file" accept=".json" onChange={this.onChange}/>
                </div>

                <div className="SubmitRow">
                    {this.props.children}
                    <input className="IOButton" type="submit" value={this.props.local.import}/>
                </div>

            </form>
        );
    }
}

export default FileForm;