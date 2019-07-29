const config = require('../../../settings.json')
const fs = require('fs')
var cp = require('child_process')
var $ = require('jquery')

//Sets up the encode
module.exports = encode

async function encode(title) {

    //Starts the encoder
    cp.exec(config.encoder)
    
    //Now we check when it's started
    var started = false

    var done = new Promise((resolve, err) => {

        //Executes to see if media encoder is done ever 10 secs
        var interval = setInterval(() => {

            //THis block tells us when it's started
            //Reads the directory where the video file is
            fs.readdir(config.video.post_ptf, (err, files) => {
                if (err) {
                    throw err;
                }
            
                //Loops the the files in the video dir every 10 sec
                for (n=0; n < files.length; n++) {

                    //When we get a .tmp file set started to true
                    if ((!started) && files[n].endsWith(".tmp")) {
                        started = true
                        log("\nEncoding")
                    }
                }
            })

            //If it's started and not stopped
            if (started && (!fs.existsSync(config.video.pre_ptf + title + config.video.pre_filter))) {

                setTimeout(() => {
                //Look for the source file being moved
                log ('Success')

                //Alows the promise to be fulfilled
                resolve("done")
                }, 1000)

                //Stops this interval
                clearInterval(interval)
            }
        }, 100)
    })
    
    //Allows the main to move on to the next function only after we are done
    return( await done )
}