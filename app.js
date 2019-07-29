const config = require('./settings.json')
const fs = require('fs')
var util = require('util');
var $ = require('jquery')
var log_file = fs.createWriteStream(__dirname + '/logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
const get_title = require('./src/js/modules/title')
const download = require('./src/js/modules/download-new')
const rename = require('./src/js/modules/rename')
const encode = require('./src/js/modules/encode')
const upload = require('./src/js/modules/upload')
const assureDirs = require('./src/js/modules/assureDirs')
const timeHandler = require('./src/js/modules/timeHandler')

//logging to log file
log = function(a) { //
    log_file.write(util.format(a) + '\n');
    log_stdout.write(util.format(a) + '\n');
    if (config.debug) {console.log(a)}
  };

//Starts the program when the button is clicked
$('#begin').click(main)

//Main function
async function main() { 

    //sets the start time
    timeHandler.startTime()
    //Makes sure all the neccessary directories are in place
    assureDirs()

    //Gets the sermon title
    let title = get_title()

    if (title) {
        
        //If the download was successful go on, else log the error
        if (await download()) {
            console.log("Rename")

            //Start Doing more cool stuff here
            rename.audio(title)
            rename.video(title)

            //wait till encoding is done
            await encode(title)

            //upload audio and video to the ftps
            await upload(title)

            timeHandler.endTime()
            timeHandler.elapsedTime()
        }
    }
}


//Function Definitions

