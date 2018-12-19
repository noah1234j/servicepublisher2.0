const ftp = require('basic-ftp')
const config = require('../config')
const fs = require('fs')

module.exports = upload

//sets up the upload
async function upload(title) {
    log("\n Preparing Upload")

    for (var server in config.upload_ftps) {

        //Connection info
        var connection = {
            host: config.upload_ftps[server].host,
            user: config.upload_ftps[server].user,
            password: config.upload_ftps[server].pass,
            port: 21,

        }

        //Server info
        var name = config.upload_ftps[server].name
        var vid_dir = config.upload_ftps[server].vid_dir
        var aud_dir = config.upload_ftps[server].aud_dir

        //files
        var audio_file = title + config.audio.post_filter
        var audio_dir = config.audio.post_ptf + audio_file

        var video_file = title + config.video.post_filter
        var video_dir = config.video.post_ptf + video_file
   
    //audio
    //If there is an audio file to upload... 
    if (!fs.existsSync(audio_file)) {

        //Open the session
        var client = new ftp.Client

            try {
                log('\nAudio Upload to ' + name)
                var client = new ftp.Client
                client.ftp.verbose = true

                //making the connection
                await client.access (connection)

                //change to the right directory
                await client.cd(aud_dir)

                //acutally upload
                await client.upload(fs.createReadStream(video_dir), video_file)

            } catch(err) {

                //tell us if there is an error
                log('Audio Upload Error ' + JSON.stringify(err))
            } finally {
                await client.close() //cleaning up 
            }
        } else {
            // If the file doesn't exist
            log("Error No Audio File to Upload")
        }

    if (!fs.existsSync(video_file)) {

        //video
        var client = new ftp.Client

            try {
                log('\nVideo Upload to ' + name)

                //making the connection
                await client.access (connection)

                //change to the right directory
                await client.cd(vid_dir)

                //If Debug is on verbose the output of the ftp happenings
                client.ftp.verbose = true

                //acutally downloading
                await client.upload(fs.createReadStream(video_dir), video_file)

                

            } catch(err) {

                //tell us if there is an error
                log('Video Upload Error ' + err)
            } finally {
                await client.close() //cleaning up
            }
        } else {

            //If there is no video file....
            log('Error No Video File To Upload')
        }


    }   

    fs.rename(video_dir, config.video.post_ptf + "Uploaded/" + title + config.video.post_filter, err => log(err))
    log('\nVideo Move Done')

    fs.rename(audio_dir, config.video.post_ptf + "Uploaded/" + title + config.video.post_filter, err => log(err))
    log('\nAudio Move Done')

}