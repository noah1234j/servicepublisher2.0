var startHours, startMins, endHours, endMins

module.exports = {
    startTime: () => {var date = new Date();
        startHours = pad(date.getHours(),2)
        startMins = pad(date.getMinutes(),2)
        log('Start Time ' + startHours + ":" + startMins) 
    },
    endTime: () => {
        var date = new Date();
        endHours = pad(date.getHours(),2)
        endMins = pad(date.getMinutes(),2)
        log("Ended at " + endHours + ":" + endMins)
    },
    elapsedTime: () => {
        let elapsedHours = () => {
            if ((endHours - startHours) < 0) {
                return pad((24-startHours + endHours),2)
            } else if ((endHours - startHours) >= 0 ) {
                return pad((endHours - startHours), 2)
            } else { 
                return "Unknown Time Error"
            }
        }
        let elapsedMins = () => {
            if ((endMins - startMins) >= 0) {
                return pad((endMins - startMins), 2)
            } else if ((endMins - startMins) < 0) {
                return pad((60 - startMins + endMins), 2)
            } else { 
                return "Unknown Time Error"
            }
        }
        
        log('Time used ' + elapsedHours() + ":" + elapsedMins())
    }
}

function pad(num, size) { 
    if ((num.toString().length) == size ) {
        return num
    } else {
        return "0" + num
    }
}