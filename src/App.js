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

// Checks if an object is a segment object.
function isSegment (object) {
    let objKeys = Object.keys(object);
    let segKeys = ['name', 'max', 'passed', 'edit'];

    if (objKeys.length === segKeys.length) {
        for (let i = 0; i < segKeys.length; i++) {
            if (objKeys[i] !== segKeys[i]) return false;
        }
        return true;

    } else {
        return false;
    }
}

// Webpage class.
class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            indexCount: 0,
            current: 0,
            intervalID: 0,  // As intervalIDs are non-zero, 0 means no interval is running.
            segments: [],
            selection: -1,
            running: false,
            editing: false,
            help: false,
            settings: false
        };

        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);

        this.addSegment = this.addSegment.bind(this);
        this.startEditSegment = this.startEditSegment.bind(this);
        this.testName = this.testName.bind(this);
        this.saveSegment = this.saveSegment.bind(this);
        this.stopEditSegment = this.stopEditSegment.bind(this);
        this.deleteSegment = this.deleteSegment.bind(this);
        this.resetSegments = this.resetSegments.bind(this);
        this.selectSegment = this.selectSegment.bind(this);
        
        this.toggleHelp = this.toggleHelp.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);

        this.importFile = this.importFile.bind(this);
    }

    // 'tick' of the timer.
    tick () {
        if (this.state.segments[this.state.current].max === this.state.segments[this.state.current].passed) {
            if (this.state.current >= this.state.segments.length - 1) {
                this.pauseTimer();
                return;
            } else {
                this.setState((state) => {
                    return {current: state.current + 1};
                });
            }
        }

        this.setState((state) => {
            let newSegments = JSON.parse(JSON.stringify(state.segments));
            newSegments[state.current].passed++;
            return {
                segments: newSegments
            };
        });
    }

    // Set an interval that runs the tick() function every second.
    startTimer () {
        if (!this.state.editing && this.state.intervalID === 0 && this.state.segments.length > 0) {
            let id = setInterval(this.tick, 1000);
            this.setState({
                intervalID: id,
                selection: -1,
                running: true
            });
        } else if (this.state.segments.length <= 0) {
            alert('Please create at least one segment.');
        } else {
            alert('Please finish editing the segment before starting the timer.');
        }
    }

    // Clear the interval. Do not reset the timer. Does nothing if timer is not running.
    pauseTimer () {
        if (this.state.intervalID !== 0) {
            clearInterval(this.state.intervalID);
            this.setState({
                intervalID: 0
            });
        }
    }

    // Clear the interval (if one is active) and reset the timer (regardless of if timer is running).
    stopTimer () {
        if (this.state.intervalID !== 0) {
            clearInterval(this.state.intervalID);
        }

        this.setState((state) => {
            let newSegments = JSON.parse(JSON.stringify(state.segments));
            
            for (let i = 0; i < newSegments.length; i++) {
                newSegments[i].passed = 0;
            }

            return {
                current: 0,
                intervalID: 0,  // Won't do anything if no interval is active.
                segments: newSegments,
                running: false
            };
        });
    }

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
            if (this.state.segments[i].name === name) return i;
        }
        return -1;    // Passed test.
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

    // Delete the selected segment.
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

    // Reset the segments list.
    resetSegments () {
        this.setState({
            indexCount: 0,
            segments: [],
            selection: -1,
            editing: false
        });
    }

    // Selects the segment at the given index.
    selectSegment (index) {
        if (!this.state.editing) {
            this.setState({selection: index});
        } else {
            alert('Please finish editing before selecting another.');
        }
    }

    // Toggles help page.
    toggleHelp () {
        this.setState((state) => {
            return {
                help: !state.help,
                settings: false
            };
        });
    }

    // Toggles setting mode, if not editing a segment.
    toggleSettings () {
        if (!this.state.editing) {
            this.setState((state) => {
                return {
                    help: false,
                    settings: !state.settings
                };
            });
        } else {
            alert('Please finish editing before accessing the settings.')
        }
    }

    // Taken from my own, jjsoong-github-page, project.
    importFile (file) {
        let reader = new FileReader();
        let dataString;
        let thisArg = this;

        reader.onload = function() {
            dataString = reader.result;

            try {
                let newSegments = JSON.parse(dataString);

                for (let i = 0; i < newSegments; i++) {
                    if (!isSegment(newSegments[i])) throw new Error('Not a segment!');
                }

                thisArg.setState({
                    indexCount: newSegments.length,
                    segments: newSegments
                });

                alert('File successfully read!');
            } catch (exception) {
                alert('Error: File import error.\nFile not a .json file of an array of segments.');
                console.log(exception);
            }
        }

        reader.readAsText(file);
    }

    // Render the entire web app.
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

        let on = {border: "green solid 2px"};

        // Line taken & adapted from a personal project.
        let link = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.segments));

        return (
            <div className="App">
                <div className="ButtonRow Top">
                    <div className="LeftGroup">
                        <button id="settingsButton" className="IconButton" style={this.state.settings ? on : null} disabled={this.state.running} onClick={this.toggleSettings}></button>
                    </div>
                    <div className="RightGroup">
                        <button id="helpButton" className="IconButton" style={this.state.help ? on : null} onClick={this.toggleHelp}></button>
                    </div>
                </div>

                {this.state.help && !this.state.settings && <div>
                    <h1>Hello! Welcome to the Segmented Timer Page!</h1>
                    <p className="Text Help">
                        1. Get started by clicking the '+' (add) button to add a new segment.
                        <br/>
                        2. Give the segment a non-blank name and a non-zero time (minutes:seconds).
                        <br/>
                        3. Click 'Save' to save the segment.
                        <br/>
                        4. Repeat as many times to add more segments to your liking.
                        <br/><br/>
                        *. You can edit and delete existing segments by, first clicking on the segment, then clicking the pencil (edit) button or trash can (delete) button, respectively.
                        <br/><br/>
                        5. Press the play button to start the timer! You can watch the segments time as well.
                        <br/>
                        6. Press the pause button to pause the timer.
                        <br/>
                        7. Press the stop button to stop and reset the timer.
                    </p>
                </div>}

                {this.state.settings && !this.state.help && <div>
                    <h1>Settings</h1>
                    <FileForm importFile={this.importFile}>
                        <a className="SubmitButton" href={link} download="segments.json">Export as .json</a>
                    </FileForm>
                </div>}

                {!this.state.help && !this.state.settings && <div>
                    <p className="Large">{secondsToHourString(totalMax - totalPassed)}</p>
                    {/* <meter max="100" value="0">0%</meter> */}

                    <div className="ButtonRow">
                        <button id="pauseButton" className="IconButton" onClick={this.pauseTimer}></button>
                        <button id="playButton" className="IconButton" disabled={this.state.intervalID !== 0} onClick={this.startTimer}></button>
                        <button id="stopButton" className="IconButton" onClick={this.stopTimer}></button>
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
                </div>}
                
                <footer>
                    <p className="Text">
                        Notes:
                        <br/>
                        Currently, not all functions and design of original mockup were implemented (due to time constraints).
                        Notable absences include tracking finish times (analyse results), and tooltips.
                    </p>
                </footer>
            </div>
        );
    }
}

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

export default App;