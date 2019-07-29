const fs = require('fs')
const config = require('../../../settings.json')

//Rename service audio and video
exports.video = (title) => {

    log("\nRenaming Video")

    //Video... Grabs any mov files in the dir
    fs.readdir(config.video.pre_ptf, (err, files) => {

        //err handling
        if (err) {
            log(err)
        } else {

            //Loops through them
            files.forEach(file => {

                //Filters out everything but video
                if (file.endsWith(config.video.pre_filter)) {

                    console.log("\nRenaming Video File " + file)

                    //Renames to sermon title
                    fs.rename(config.video.pre_ptf + file, config.video.pre_ptf + title + config.video.pre_filter, (err) => {if (err) {throw err}})

                    log("Success")
                }
            })
        }
    })

    return true
}

exports.audio = (title) => {

    log("\nRenaming Audio")
try {
    //Audio... Grabs any wavs files in the dir
    fs.readdir(config.audio.pre_ptf, (err, files) => {

        //err handling
        if (err) {
            log(err)
        } else {

            //Loops through them
            files.forEach(file => {

                //Filters out everything but wavs
                if (file.endsWith(config.audio.pre_filter)) {

                    //console.log("\nRenaming Audio File " + file)

                    //Renames to sermon title
                    fs.rename(config.audio.pre_ptf + file, config.audio.pre_ptf + title + config.audio.pre_filter, (err) => {if (err) {log("Error: " + err )}})

                    log("Success")
                }
            })
            

        }

    })
    return true

} catch (err) {
    log("Error: " + err)
}
}