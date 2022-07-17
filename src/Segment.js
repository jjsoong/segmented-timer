import './App.css';
import React from 'react';
import {parseTimeString, secondsToMinuteString} from './Functions.js';

// Segment display class.
class Segment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            newName: this.props.name,
            newMax: '',
        };

        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.onChange = this.onChange.bind(this);
        this.select = this.select.bind(this);
    }

    saveChanges (event) {
        event.preventDefault();

        let result = this.props.testName(this.state.newName);

        if (result === -1 || result === this.props.index)  {
            // Translate newMax to seconds value.
            this.props.saveSegment(this.state.newName, parseTimeString(this.state.newMax));
            this.props.stopEditSegment();
            return true;
        } else {
            alert('Names of segments must be unique.');
            return false;
        }
    }

    cancelChanges () {
        // Delete the segment if first instancing.
        if (this.props.name === '' && this.props.max === -1) {
            this.props.deleteSegment();
        } else {
            // Make no changes to the segment, and revert state back to normal.
            this.props.stopEditSegment();
        }
    }

    onChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    select () {
        this.props.selectSegment(this.props.index);
    }

    render () {
        const sel = {
            background: 'pink'
        };

        const nsel = {
            background: 'white'
        };

        if (this.props.edit) {
            return (
                <form className="Segment" onSubmit={this.saveChanges} style={sel}>
                    <div className="LeftGroup">
                        <input name="newName" className="NameInput" type="text" placeholder="Segment name (letters, numbers, spaces, underscores)" required pattern="\w|^\w[\w|\s]*\w$" value={this.state.newName} onChange={this.onChange}/>
                    </div>
                    <div className="RightGroup">
                        <input name="newMax" className="MaxInput" type="text" placeholder="0:00 (non-zero)" required pattern="\d?\d:\d[1-9]|\d?\d:[1-9]\d|\d?[1-9]:\d\d" value={this.state.newMax} onChange={this.onChange}/>
                    </div>

                    <div className="SubmitRow">
                        <input type="submit" value="Save" className="SubmitButton"/>
                        <button className="SubmitButton" onClick={this.cancelChanges}>Cancel</button>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="Segment" onClick={this.select} style={this.props.selected ? sel : nsel}>
                    <div className="LeftGroup">
                        <p className="Text">{this.props.name}</p>
                    </div>
                    <div className="RightGroup">
                        <p className="Text">{secondsToMinuteString(this.props.max - this.props.passed)}</p>
                    </div>
                </div>
            );
        }
        
    }
}

export default Segment;