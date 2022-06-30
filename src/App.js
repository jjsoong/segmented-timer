import './App.css';
import React from 'react';

// Parse 00:00 or 00:00:00 formatted string, returning seconds int.
function parseTimeString (string) {
    const regex = /\d?\d/g;
    let digits = string.match(regex);

    if (digits.length === 3) {
        return parseInt(digits[0]) * 60 * 60 + parseInt(digits[1]) * 60 + parseInt(digits[2]);
    } else if (digits.length === 2) {
        return parseInt(digits[0]) * 60 + parseInt(digits[1]);
    } else {
        alert('Unexpected parse error.');
    }
}

// Translate seconds int to 00:00:00 string.
function secondsToHourString (seconds) {
    let min = Math.floor(seconds/60);
    let sec = seconds - (min * 60);

    let h = Math.floor(min/60);
    min = min - (h * 60);
    
    return `${h < 10 ? 0 : ""}${h}:${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`;
}

// Translate seconds int to 00:00 string.
function secondsToMinuteString (seconds) {
    let min = Math.floor(seconds/60);
    let sec = seconds - (min * 60);
    
    return `${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`;
}

// Webpage class.
class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            indexCount: 0,
            current: 0,
            segments: [],
            selection: -1,
            running: false,    /* Disable buttons on render? */
            editing: false
        };

        // this.tick = this.tick.bind(this);
        // this.startTimer = this.startTimer.bind(this);
        // this.pauseTimer = this.pauseTimer.bind(this);
        // this.stopTimer = this.stopTimer.bind(this);

        this.addSegment = this.addSegment.bind(this);
        this.startEditSegment = this.startEditSegment.bind(this);
        this.testName = this.testName.bind(this);
        this.saveSegment = this.saveSegment.bind(this);
        this.stopEditSegment = this.stopEditSegment.bind(this);
        this.deleteSegment = this.deleteSegment.bind(this);
        this.resetSegments = this.resetSegments.bind(this);
        this.selectSegment = this.selectSegment.bind(this);
    }

    // tick () {
    //     if (this.state.segments[this.state.current].max === this.state.segments[this.state.current].passed) {
    //         if (this.state.current === this.state.segments.length) {
    //             this.stopTimer();
    //         } else {

    //         }
    //     }
    // }

    // startTimer () {

    // }

    // pauseTimer () {

    // }

    // stopTimer () {

    // }

    // Add a segment and start editing it.
    addSegment () {
        if (!this.state.editing) {
            let segment = {
                name: '',
                max: -1,
                passed: 0,
                edit: true
            }

            // Sync array access.
            this.setState((state) => {
                let newSegments = JSON.parse(JSON.stringify(state.segments));
                newSegments.push(segment);
                return {
                    indexCount: newSegments.length,
                    segments: newSegments,
                    selection: state.indexCount,
                    editing: true
                };
            });
        } else {
            alert('Please finish editing the segment before adding another.');
        }
    }

    // Set state to 'editing', set segment state to 'editing'.
    startEditSegment () {
        if (!this.state.editing && this.state.selection > -1) {

            // Sync array access.
            this.setState((state) => {
                let newSegments = JSON.parse(JSON.stringify(state.segments));

                newSegments[state.selection].edit = true;

                return {
                    segments: newSegments,
                    editing: true
                };
            });
        } else if (this.state.editing) {
            alert('Please finish editing the segment before editing another.');
        } else {
            alert('Please select a segment.');
        }
    }

    // Tests a 'name'. Returns true if unique, false otherwise.
    testName (name) {
        for (let i = 0; i < this.state.segments.length; i++) {
            if (this.state.segments[i].name === name) return false;
        }
        return true;    // Passed test.
    }

    // Save segment edits.
    saveSegment (newName, newMax) {
        // Sync array access.
        this.setState((state) => {
            let newSegments = JSON.parse(JSON.stringify(state.segments));

            newSegments[state.selection].name = newName;
            newSegments[state.selection].max = newMax;

            return {
                segments: newSegments
            };
        });
    }

    // Reset state from 'editing', reset segment state as well.
    stopEditSegment () {
        // Should always be in editing mode come this function. Otherwise, an error would have occurred.
        if (this.state.editing) {
            // Sync array access.
            this.setState((state) => {
                let newSegments = JSON.parse(JSON.stringify(state.segments));

                newSegments[state.selection].edit = false;

                return {
                    segments: newSegments,
                    selection: -1,
                    editing: false    
                };
            });
        } else {
            alert('Error: incorrect state.');
        }
    }

    deleteSegment () {
        if (this.state.selection > -1 && this.state.selection < this.state.segments.length) {

            // Sync array access.
            this.setState((state) => {
                let newSegments = JSON.parse(JSON.stringify(state.segments));
                // Remove the segment.
                newSegments.splice(state.selection, 1);

                return {
                    indexCount: newSegments.length,
                    segments: newSegments,
                    selection: -1,
                    editing: false
                };
            });
        } else {
            alert('Please select a segment.');
        }
    }

    resetSegments () {
        this.setState({
            indexCount: 0,
            segments: [],
            selection: -1,
            editing: false
        });
    }

    selectSegment (index) {
        if (!this.state.editing) {
            this.setState({selection: index});
        } else {
            alert('Please finish editing before selecting another.');
        }
    }

    render () {
        let segArray = this.state.segments.map((segment, index) =>
            <Segment
                key={segment.name}
                index={index}
                name={segment.name}
                max={segment.max}
                passed={segment.passed}
                edit={segment.edit}
                selected={index === this.state.selection}

                testName={this.testName}
                saveSegment={this.saveSegment}
                stopEditSegment={this.stopEditSegment}
                deleteSegment={this.deleteSegment}
                selectSegment={this.selectSegment}
            />);

        let totalMax = 0, totalPassed = 0;

        for (let i = 0; i < this.state.segments.length; i++) {
            totalMax += this.state.segments[i].max > 0 ? this.state.segments[i].max : 0;
            totalPassed += this.state.segments[i].passed;
        }

        return (
            <div className="App">
                <div className="ButtonRow">
                    <div className="LeftGroup">
                        <button id="settingsButton" className="IconButton" disabled={this.state.running} ></button>
                    </div>
                    <div className="RightGroup">
                        <button id="helpButton" className="IconButton" disabled={this.state.running} ></button>
                    </div>
                </div>

                <p className="Large">{secondsToHourString(totalMax - totalPassed)}</p>
                <meter max="100" value="0">0%</meter>

                <div className="ButtonRow">
                    <button id="pauseButton" className="IconButton"></button>
                    <button id="playButton" className="IconButton"></button>
                    <button id="stopButton" className="IconButton"></button>
                </div>
                
                <div className="SegmentList">
                    <div className="SegmentHeader">
                        <div className="LeftGroup">
                            <button id="addButton" className="IconButton" disabled={this.state.running} onClick={this.addSegment}></button>
                            <button id="editButton" className="IconButton" disabled={this.state.running} onClick={this.startEditSegment}></button>
                            <button id="deleteButton" className="IconButton" disabled={this.state.running} onClick={this.deleteSegment}></button>
                        </div>

                        <div className="RightGroup">
                            <button id="resetButton" className="IconButton" disabled={this.state.running}  onClick={this.resetSegments}></button>
                        </div>
                    </div>

                    {segArray}
                </div>
            </div>
        );
    }
}

// Segment display class.
class Segment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            newName: '',
            newMax: '',
        };

        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.onChange = this.onChange.bind(this);
        this.select = this.select.bind(this);
    }

    saveChanges (event) {
        event.preventDefault();

        if (this.props.testName(this.state.newName))  {
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
                        <input name="newMax" className="MaxInput" type="text" placeholder="00:00" required pattern="\d?\d:\d\d" value={this.state.newMax} onChange={this.onChange}/>
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

export default App;