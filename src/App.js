import './App.css';
import React from 'react';
import Segment from './Segment.js';
import FileForm from './FileForm.js';
import {secondsToHourString, isSegment} from './Functions.js';

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
                        <button id="settingsButton" className="IconButton" title="Settings" style={this.state.settings ? on : null} disabled={this.state.running} onClick={this.toggleSettings}></button>
                    </div>
                    <div className="RightGroup">
                        <button id="helpButton" className="IconButton" title="Help" style={this.state.help ? on : null} onClick={this.toggleHelp}></button>
                    </div>
                </div>

                {/* Help page */}
                {this.state.help && !this.state.settings && <div>
                    <h1>Hello! Welcome to the Segmented Timer Page!</h1>
                    <div className="Body">
                        <ol className="Text Help">
                            <li>Get started by clicking the '+' (add) button to add a new segment.</li>
                            <li>Give the segment a non-blank name and a non-zero time (minutes:seconds).</li>
                            <li>Click 'Save' to save the segment.</li>
                            <li>Repeat (1-3) as many times to add more segments to your liking.</li>
                            <li>Press the play button to start the timer! You can watch the segments time as well.</li>
                            <li>Press the pause button to pause the timer.</li>
                            <li>Press the stop button to stop and reset the timer.</li>
                        </ol>
                        <br/>
                        <p className="Text Help">
                            *You can edit and delete existing segments by, first clicking on the segment, then clicking the pencil (edit) button or trash can (delete) button, respectively.
                        </p>
                    </div>
                </div>}

                {/* Settings page */}
                {this.state.settings && !this.state.help && <div>
                    <h1>Settings</h1>
                    <div className="Body">
                        <FileForm importFile={this.importFile}>
                            <a className="SubmitButton" href={link} download="segments.json">Export as .json</a>
                        </FileForm>
                    </div>
                </div>}

                {/* Segments, Main page */}
                {!this.state.help && !this.state.settings && <div>
                    <h1>Segmented Timer Page</h1>
                    <p className="Large">{secondsToHourString(totalMax - totalPassed)}</p>

                    <div className="ButtonRow">
                        <button id="pauseButton" className="IconButton" title="Pause timer" onClick={this.pauseTimer}></button>
                        <button id="playButton" className="IconButton" title="Start/Play timer" disabled={this.state.intervalID !== 0} onClick={this.startTimer}></button>
                        <button id="stopButton" className="IconButton" title="Stop and Reset timer" onClick={this.stopTimer}></button>
                    </div>
                    
                    <div className="SegmentList">
                        <div className="SegmentHeader">
                            <div className="LeftGroup">
                                <button id="addButton" className="IconButton" title="Add segment" disabled={this.state.running} onClick={this.addSegment}></button>
                                <button id="editButton" className="IconButton" title="Edit selected segment" disabled={this.state.running} onClick={this.startEditSegment}></button>
                                <button id="deleteButton" className="IconButton" title="Delete selected segment" disabled={this.state.running} onClick={this.deleteSegment}></button>
                            </div>

                            <div className="RightGroup">
                                <button id="resetButton" className="IconButton" title="Clear segment table" disabled={this.state.running}  onClick={this.resetSegments}></button>
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

export default App;