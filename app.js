const ftp = require('basic-ftp')
const config = require('./src/js/config')
const fs = require('fs')
var cp = require('child_process')
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

//MODULES
const get_title = require('./src/js/modules/title')
const download = require('./src/js/modules/download')
const rename = require('./src/js/modules/rename')
const encode = require('./src/js/modules/encode')

//Starts the program when the button is clicked
document.getElementById('begin').addEventListener('click', main)

//Main function
async function main() { 
    var date = new Date();
    log("\nStarted at " + date.getHours() + ":" + date.getMinutes()) 
    
    //Gets the sermon title
    let title = get_title()
    console.log(title)
    
    //Attempts to Download and returns the result
    let results = await download()

    //If the download was successful go on, else log the error
    //if (results == "Download Successful" || "Download has been disabled in config.js  \n\r  No files will be downloaded  \n\r\n\r") {

        //Logs the results
        log(results)

        //Start Doing more cool stuff here
        rename.audio(title)
        rename.video(title)

        //wait till encoding is done
        await encode(title)

        //upload audio and video to the ftps
        upload(title)

        var date = new Date();
        log("\nAll done at " + date.getHours() + ":" + date.getMinutes()) 

    //}
}




//Function Definitions


//logging to log file
log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
  if (config.debug) {console.log(d)}
};