const date = require('date-and-time')
const ftp = require('basic-ftp')
const config = require('./config')
const fs = require('fs')
var cp = require('child_process')


//Starts the program when the button is clicked
document.getElementById('begin').addEventListener('click', main)

//Main function
async function main() { 
    
    //Gets the sermon title
    let title = get_title()

    let results = await encode(title)

        
    //Attempts to Download and returns the result
    //let results = await download()

    /*If the download was successful go on, else log the error
    if (results == "Download Successful" || "Download has been disabled in config.js  \n\r  No files will be downloaded  \n\r\n\r") {

        //Logs the results
        console.log(results)

        //Start Doing more cool stuff here
        rename(title)
        
        encode()


        
    } else {

        //If download threw an error, log it to the client
        console.log("A critical error was found... \n\r\n\r" + results)
    }
    */
}


//Function Definitions

//when user clicks submit button calculates sermon title and stores in "title"
function get_title() {

    //Grabs the info
    amPm = document.getElementById('amPm').value,
    speakerInitials = document.getElementById('speakerInitials').value,
    sermonTitle = document.getElementById('sermonTitle').value

    //Grabs the Date
    let now = new Date();
    let thisDate = date.format(now, 'YYYY-MM-DD')
    
    return thisDate + "-" + amPm.toUpperCase() + "-" + speakerInitials.toUpperCase() + "-" + sermonTitle + "-Texas"
}

//Downloads the most recent .mov from bm Hyperdeck
function download() {

    //If download is enabled download, if not enabled don't
    if (config.download_enabled) {

        // makes a new client object
        var client = new ftp.Client()

        //If debug is on, enable ftp verbose (logs all ftp communicaiton)
        if (config.debug) {  client.ftp.verbose = true  }

        return file_download()

        //Defining the file download this needs to be async
        async function file_download () {
            try {

                //Makes the connections
                await client.access({  host: config.download_ftp.host  })

                //Moves to the correct dir
                await client.cd(config.download_ftp.dir)

                //Gets a list of all files in the dir
                var files = await client.list()

                //Defining some vars for the loop
                let file_list = []
                let n = 0
    
                //Loops through the files
                for (file in files) {
                    
                    //sorts out to only .mov
                    (files[n].name.endsWith(config.video.pre_filter)) ? file_list.push(files[n].name) : null
                    n++
                }
    
                //This grabs the most recent .mov slices of the extension and sets it to a global var
                file = file_list.slice(-1)[0].slice(0, -4)
    
                //Full file names and dirs of where its going and coming from
                var local_file = config.video.pre_ptf + file + config.video.pre_filter
                var remote_file = file + config.video.pre_filter
    
                //Telling the client what we are downloading
                console.log("\n\r\n\r" + remote_file + " found to be downlaoded. Starting download now.\n\r\n\r")
    
                //Actually downloading it.
                await client.download(fs.createWriteStream(local_file), remote_file)
    
                //If we have issues, tell us what they are...
            } catch (error) {
                
                //returns the error
                return JSON.stringify(error.message)
    
            }
    
            await client.close()
            return "Download Successful"
        }
    
    //Error reporting
    } else {

        //If download is not enabled code here
        return "Download has been disabled in config.js  \n\r  No files will be downloaded  \n\r\n\r"
    }
}

//Rename service audio and video
function rename(title) {

    //Video... Grabs any mov files in the dir
    fs.readdir(config.video.pre_ptf, (err, files) => {

        //Loops through them
        files.forEach(file => {

            //Filters out everything but video
            if (file.endsWith(config.video.pre_filter)) {

                //Renames to sermon title
                fs.rename(config.video.pre_ptf + file, config.video.pre_ptf + title + config.video.pre_filter)

            }
        })
    })

    //Audio... Grabs any wavs files in the dir
    fs.readdir(config.audio.pre_ptf, (err, files) => {

        //Loops through them
        files.forEach(file => {

            //Filters out everything but wavs
            if (file.endsWith(config.audio.pre_filter)) {

                //Renames to sermon title
                fs.rename(config.audio.pre_ptf + file, config.audio.pre_ptf + title + config.audio.pre_filter)

            }
        })
    })

    return true
}

async function encode(title) {

    //Starts the encoder
    cp.exec(config.encoder)
    
    //Now we check when it's started
    var started = false

    var done = new Promise((resolve) => {

        //Executes to see if media encoder is done ever 10 secs
        var interval = setInterval(() => {

            //THis block tells us when it's started
            //Reads the directory where the video file is
            fs.readdir(config.video.post_ptf, (err, files) => {

                //Loops the the files in the video dir every 10 sec
                for (n=0; n < files.length; n++) {

                    //When we get a .tmp file set started to true
                    if ((!started) && files[n].endsWith(".tmp")) {
                        started = true
                        console.log("started")
                    }
                }
            })

            //If it's started and not stopped
            if (started && (!fs.existsSync(config.video.pre_ptf + title + config.video.pre_filter))) {

                //Look for the source file being moved
                console.log ('stopped')

                //Stops this interval
                clearInterval(interval)

                //Alows the promise to be fulfilled
                resolve("done")
            }
        }, 100)
    })
    
    //Allows the main to move on to the next function only after we are done
    return(await done)
}

function upload(title) {
    //Ready to start upload
}