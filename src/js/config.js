const os = require('os')

var settings = {

    //Debugger Mode
    //Sets FTP verbose to true, logging output to client. 
    debug: true,

    encoder: "refer to bottom",

    //audio file option
    audio: {

        //This is the media type before being encoded
        pre_filter: ".wav",

        //This is the media type after being encoded
        post_filter: ".mp3",

        //PTF stands for path to file
        //This is where our video sits before running through media encoder
        //Media encoder watch folder needs to be pointed here
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH

        //If windows use %HOMEPATH%/docuemnts if macos use ~
        pre_ptf: "refer to bottom, set dynamically based on os",

        //This is where media encoder dumps the finished product
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH        
        post_ptf: "refer to bottom, set dynamically based on os",

        upload: "refer to bottom"
    },

    //Video option
    video: {

        //This is the media type before it's encded
        pre_filter: ".mov",

        //This is the media type after its encoded
        post_filter: ".mp4",

        //PTF stands for path to file
        //This is where our video sits before running through media encoder
        //Media encoder watch folder needs to be pointed here
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH
        pre_ptf: "refer to bottom, set dynamically based on os",

        //This is where media encoder dumps the finished product
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH
        post_ptf: "refer to bottom, set dynamically based on os",

        upload_ptf: "refer to bottom"
    },

    //Download Options
    download_enabled: true,
    download_ftp: {
        host: "192.168.10.55",
        dir: "2",
        filter: ".mov"
    },

    upload_ftps: {
        /*1: {
            name: "Canada FTP",
            host: "216.251.155.90",
            user: "shawn",
            pass: "wolt777",
            vid_dir: "/FTP-Share/2-Video/1-Services",
            aud_dir: "/"
        },*/
        2: {
            name: "Texas FTP",
            host: "12.247.246.50",
            user: "william",
            pass: "Amaz0nFr%",
            vid_dir: "/02_Video/01_services/",
            aud_dir: "/01_Audio/"
        }
    }
}

//Handles windows vs mac
let homeDir, slash, encoder

    if (os.platform() == 'win32') {

        //If windows
        console.log("\r\n You're on a windows!!!")
        homeDir = os.homedir()
        slash = "\\"

        //encoder command
        encoder = 'start C:/"Program Files"/Adobe/"Adobe Media Encoder CC 2018"/"Adobe Media Encoder.exe"'

    } else if (os.platform() == 'darwin'){
        
        //If MacOS
        console.log("Ok, we'll go with macOS, as its our only other supported platform")
        homeDir = os.homedir()
        slash = "/"

        //encoder command
        encoder = 'open "/Applications/Adobe Media Encoder CC 2018/Adobe Media Encoder CC 2018.app"'

     } else {

        //No other platform currently supported
         console.log('not a supported platform')
     }

settings.audio.post_ptf = homeDir + slash + 'Documents' + slash + '03_audio_encodes' + slash
settings.audio.pre_ptf = homeDir + slash + 'Documents' + slash + '02_audio_capture' + slash
settings.video.pre_ptf = homeDir + slash + 'Documents' + slash + '04_video_capture' + slash
settings.video.post_ptf = homeDir + slash + 'Documents' + slash + '05_video_encodes' + slash
settings.audio.upload_ptf = homeDir + slash + 'Documents' + slash + '03_audio_encodes' + slash + "Uploaded"
settings.video.upload_ptf = homeDir + slash + 'Documents' + slash + '05_video_encodes' + slash + "Uploaded"

//Handles windows vs mac Media encoder Open
settings.encoder = encoder

module.exports = settings