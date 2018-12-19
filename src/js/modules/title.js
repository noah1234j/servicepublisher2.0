const date = require('date-and-time')
const $ = require('jquery')

//when user clicks submit button calculates sermon title and stores in "title"
module.exports = () => {
    try {
        //Grabs the info
        var amPm = $("input[name='demo']:checked").val();
        var speakerInitials = $('#speakerInitials').val()
        var sermonTitle = $('#sermonTitle').val()

        //Grabs the Date
        let now = new Date();
        let thisDate = date.format(now, 'YYYY-MM-DD')

        if (amPm == undefined || speakerInitials == undefined || sermonTitle == undefined) {
            throw "Please Enter Valid Parameters"
        } else {
            let title = thisDate + "-" + amPm.toUpperCase() + "-" + speakerInitials.toUpperCase() + "-" + sermonTitle + "-Texas"
            log(title)
            return title
        }
    } catch (err) {
        log(err)
        alert(err)
        return false
    }
    
    
    
}
