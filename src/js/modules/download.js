const ftp = require('basic-ftp')
const config = require('../config')
const fs = require('fs')
const $ = require('jquery')

//Downloads the most recent .mov from bm Hyperdeck
module.exports = () => {

    //If download is enabled download, if not enabled don't
    if (config.download_enabled) {

        // makes a new client object
        var client = new ftp.Client()

        //If debug is on, enable ftp verbose (logs all ftp communicaiton)
        client.ftp.verbose = true 

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

                var file_size

                //Finds the size of the file
                files.forEach((item) => {  
                    if (item.name == file + config.video.pre_filter) {
                        file_size = item.size
                    }
                })


                //Full file names and dirs of where its going and coming from
                var local_file = config.video.pre_ptf + file + config.video.pre_filter
                var remote_file = file + config.video.pre_filter
    
                //Telling the client what we are downloading
                log("\n\r\n\r" + remote_file + " found to be downlaoded. Starting download now.\n\r\n\r")

                //This is the progress tracker and progress bar updater see basic ftp docs for more info
                client.trackProgress((info) => {
                    //Gives the downloading message
                    $('#name').text('Downloading...')

                    //Gets the percent complete
                    var percent = (Math.round(info.bytesOverall/file_size * 10000)/100).toString() + "%" // Gets the percent
                    log(percent)
                    $('#percent').text(percent)
                    $('#progress').css('width', percent)

                })

                //Actually downloading it.
                await client.download(fs.createWriteStream(local_file), remote_file)

                //Get rid of the downloading message
                $('#progress p').text.hide()
                $('#progress').css('width', '0%')

                return true


                //If we have issues, tell us what they are...
            } catch (error) {
                
                //returns the error
                return JSON.stringify(error.message)
    
            } finally {
                await client.close()
            }
        }
    
    //Error reporting
    } else {

        //If download is not enabled code here
        return "Download has been disabled in config.js  \n\r  No files will be downloaded  \n\r\n\r"
    }
}

