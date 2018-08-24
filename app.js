const date = require('date-and-time')
const ftp = require('basic-ftp')
const config = require('./config')
const fs = require('fs')

//Starts the program when the button is clicked
//document.getElementById('amPm').attachEvent('onclick', main()) 


document.getElementById('begin').addEventListener('click', main)

//Main function
async function main() {  
    
    //Gets the sermon title
    let title = get_title() 
        
    //Attempts to Download and returns the result
    let results = await download()

    //Logs Results
    console.log(results)

    //Error Handing
    if (results === "Download Successful" || config.download_enabled) {
        console.log('time to move on william')
    } else {
        console.log('Shutting Down Due to Critical Error')
    }
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
                await client.cd(config.video.pre_ptf)
    
                console.log('before')

                //Gets a list of all files in the dir
                var files = await client.list()
    
                console.log('after')

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
                //await client.download(fs.createWriteStream(local_file), remote_file)
    
                //If we have issues, tell us what they are...
            } catch (error) {
                
                //returns the error
                return JSON.stringify(error)
    
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

    console.log("renaming")
    console.log(title)
    //This renames the Video
    //fs.rename(config.video.pre_pft + file + config.video.pre_filter, config.video.pre_pft + title + config.video.pre_filter)

    /*This renames the audio
    fs.readdir(config.audio.pre_ptf, (err, files) => {

        //For all the files in the audio location do...
        files.forEach(file => {

            //Filters out everything but wavs
            if (file.endsWith(config.audio.pre_filter)) {
                
                console.log(config.audio.pre_ptf + file)
                console.log(config.audio.pre_ptf + title + config.audio.pre_filter)
                //fs.rename(config.audio.pre_ptf + file)

            }

        });
    })*/
}

