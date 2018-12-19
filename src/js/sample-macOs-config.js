module.exports = {

    //Debugger Mode
    //Sets FTP verbose to true, logging output to client. 
    debug: true,

    encoder: 'open "/Applications/Adobe Media Encoder CC 2018/Adobe Media Encoder CC 2018.app"',

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
        pre_ptf: "/Users/wolt/Documents/02_audio_capture/",

        //This is where media encoder dumps the finished product
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH        
        post_ptf: "/Users/wolt/Documents/03_audio_encodes/",
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
        pre_ptf: "/Users/wolt/Documents/04_video_capture/",

        //This is where media encoder dumps the finished product
        //REMBER TO PUT A / AT THE END OF THE FOLDER PATH
        post_ptf: "/Users/wolt/Documents/05_video_encodes/"
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