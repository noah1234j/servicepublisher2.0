const ftp = require('basic-ftp')
const config = require('../config')
const fs = require('fs')



//Downloads the most recent .mov from bm Hyperdeck
module.exports = () => {

    //If download is enabled download, if not enabled don't
    if (config.download_enabled) {

        // makes a new client object
        var client = new ftp.Client()

        // Log progress for any transfer from now on.
        client.trackProgress(info => {
            log({
                "File": info.name,
                "Type": info.type,
                "Transferred": info.bytes,
                "Transferred Overall": info.bytesOverall
            })
        })

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

                //Finds the size of the file
                var file_size = files.forEach((item) => {                      
                    if (item.name == file + config.video.pre_filter) {
                        return file_size = item.size
                    }
                })
    
                log(file_size)
                //Full file names and dirs of where its going and coming from
                var local_file = config.video.pre_ptf + file + config.video.pre_filter
                var remote_file = file + config.video.pre_filter
    
                //Telling the client what we are downloading
                log("\n\r\n\r" + remote_file + " found to be downlaoded. Starting download now.\n\r\n\r")
    
                //Actually downloading it.
                await client.download(fs.createWriteStream(local_file), remote_file)

                // You guessed it trackProgress tracks the progress. I bet your friends call you Captain Obvious
                client.trackProgress(info => log(info.bytesOverall))
    
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

