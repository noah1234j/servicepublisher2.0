const config = require('./src/js/config')
const fs = require('fs')
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

//MODULES
const get_title = require('./src/js/modules/title')
const download = require('./src/js/modules/download')
const rename = require('./src/js/modules/rename')
const encode = require('./src/js/modules/encode')
const upload = require('./src/js/modules/upload')
const assureDirs = require('./src/js/modules/createFolders')

//Starts the program when the button is clicked
document.getElementById('begin').addEventListener('click', main)

//Main function
async function main() { 
    var date = new Date();
    var startHours = date.getHours()
    var startMins = date.getMinutes()
    log('Start Time ' + startHours + ":" + startMins) 
    
    //Makes sure all the neccessary directories are in place
    assureDirs()

    //Gets the sermon title
    let title = get_title()

    if (title) {

        //If the download was successful go on, else log the error
        if (await download()) {

            //Start Doing more cool stuff here
            rename.audio(title)
            rename.video(title)

            //wait till encoding is done
            await encode(title)

            //upload audio and video to the ftps
            await upload(title)

            var date = new Date();
            var endHours = date.getHours()
            var endMins = date.getMinutes()
            log("Ended at " + endHours + ":" + endMins)

            log('Total time used ' + endHours-startHours + ":" + endMins-startMins)
            
        }
    }
    
}

//Function Definitions

//logging to log file
log = function(a) { //
  log_file.write(util.format(a) + '\n');
  log_stdout.write(util.format(a) + '\n');
  if (config.debug) {console.log(a)}
};