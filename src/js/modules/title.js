const date = require('date-and-time')

//when user clicks submit button calculates sermon title and stores in "title"
module.exports = () => {

    //Grabs the info
    amPm = document.getElementById('amPm').value,
    speakerInitials = document.getElementById('speakerInitials').value,
    sermonTitle = document.getElementById('sermonTitle').value

    //Grabs the Date
    let now = new Date();
    let thisDate = date.format(now, 'YYYY-MM-DD')
    
    return thisDate + "-" + amPm.toUpperCase() + "-" + speakerInitials.toUpperCase() + "-" + sermonTitle + "-Texas"
}
