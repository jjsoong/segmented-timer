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
        let diff = this.props.max - this.props.passed;
        let timeText;

        if (diff < 0) {
            timeText = "-" + secondsToMinuteString(diff * -1);
        } else {
            timeText = secondsToMinuteString(diff);
        }

        const sel = {background: 'lightblue'};
        const nsel = {background: 'white'};
        const overtime = {color: 'red'};
        const finished = {color: 'green'};

        let textStyle;
        switch (this.props.waruovfi) {
            case 2: textStyle = overtime; break;
            case 3: textStyle = finished; break;
            default: break;
        }

        if (this.props.edit) {
            return (
                <form className="Segment" onSubmit={this.saveChanges} style={sel}>
                    <div className="LeftGroup">
                        <input name="newName" className="NameInput" type="text" placeholder={this.props.local.namePH} required pattern="\w|^\w[\w|\s]*\w$" value={this.state.newName} onChange={this.onChange}/>
                    </div>
                    <div className="RightGroup">
                        <input name="newMax" className="MaxInput" type="text" placeholder={this.props.local.timePH} required pattern="\d?\d:\d[1-9]|\d?\d:[1-9]\d|\d?[1-9]:\d\d" value={this.state.newMax} onChange={this.onChange}/>
                    </div>

                    <div className="SubmitRow">
                        <input type="submit" value={this.props.local.save} className="SubmitButton"/>
                        <button className="SubmitButton" onClick={this.cancelChanges}>{this.props.local.cancel}</button>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="Segment" onClick={this.select} style={this.props.selected ? sel : nsel}>
                    <div className="LeftGroup">
                        <p className="Text" style={textStyle}>{this.props.name}</p>
                        {this.props.user && <p className="Text" style={textStyle}>◀</p>}
                    </div>
                    <div className="RightGroup">
                        <p className="Text" style={textStyle}>{timeText}</p>
                    </div>
                </div>
            );
        }
        
    }
}

export default Segment;