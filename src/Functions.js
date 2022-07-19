

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
    let segKeys = ['name', 'max', 'passed', 'waruovfi', 'edit'];

    if (objKeys.length === segKeys.length) {
        for (let i = 0; i < segKeys.length; i++) {
            if (objKeys[i] !== segKeys[i]) return false;
        }
        return true;

    } else {
        return false;
    }
}

export {parseTimeString, secondsToHourString, secondsToMinuteString, isSegment};