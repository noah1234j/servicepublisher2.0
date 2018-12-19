var startHours, startMins, endHours, endMins

module.exports = {
    startTime: () => {var date = new Date();
        startHours = date.getHours()
        startMins = date.getMinutes()
        log('Start Time ' + startHours + ":" + startMins) 
    },
    endTime: () => {
        var date = new Date();
        endHours = date.getHours()
        endMins = date.getMinutes()
        log("Ended at " + endHours + ":" + endMins)
    },
    elapsedTime: () => {
        log('Total time used ' + (endHours-startHours).toString() + ":" + (endMins-startMins).toString())
    }
}
