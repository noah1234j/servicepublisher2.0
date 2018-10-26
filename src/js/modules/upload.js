const ftp = require('basic-ftp')
const config = require('../config')
const fs = require('fs')

//sets up the upload
async function upload(title) {
    log("\n Preparing Upload")

    for (var server in config.upload_ftps) {

        //Credentials
        name = config.upload_ftps[server].name
        host = config.upload_ftps[server].host
        user = config.upload_ftps[server].user
        pass = config.upload_ftps[server].pass
        vid_dir = config.upload_ftps[server].vid_dir
        aud_dir = config.upload_ftps[server].aud_dir
   
    //audio
    var client = new ftp.Client

        try {
            log('\nAudio Upload to ')

            //net client
            var client = new ftp.Client

            client.ftp.verbose = true

            //making the connection
            await client.access ({
                host: host,
                user: user,
                password: pass,
                port: 21,
            })

            //change to the right directory
            await client.cd(aud_dir)

            //sets the local file to dir where the video is stored
            var local_file = config.audio.post_ptf + title + config.audio.post_filter

            //sets the remote file to the remote dir
            var remote_file = title + config.audio.post_filter

            //acutally upload
            await client.upload(fs.createReadStream(local_file), remote_file)

        await client.close() //cleaning up 
        } finally {}

    //video
    var client = new ftp.Client

        try {
            //making the connection
            await client.access ({
                host: host,
                user: user,
                password: pass
            })

            //change to the right directory
            await client.cd(vid_dir)

            //If Debug is on verbose the output of the ftp happenings
            client.ftp.verbose = true

            //sets the local file to dir where the video is stored
            var local_file = config.video.post_ptf + title + config.video.post_filter

            //sets the remote file to the remote dir
            var remote_file = title + config.video.post_filter

            //acutally downloading
            await client.upload(fs.createReadStream(local_file), remote_file)

            await client.close() //cleaning up

        } finally {}


    }   

    log('\nVideo Upload Successful')
    fs.rename(local_file, config.video.post_ptf + "Uploaded/" + title + config.video.post_filter)
    log('\nVideo Move Done')

    log('\nAudio Upload Successful')
    fs.rename(local_file, config.video.post_ptf + "Uploaded/" + title + config.video.post_filter)
    log('\nAudio Move Done')

}