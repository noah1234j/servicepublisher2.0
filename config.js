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
        pre_ptf: "/Users/noahwilliamjorgensen/Desktop/Test Location/Audio/",

        //This is where media encoder dumps the finished product
        post_ptf: "/Users/noahwilliamjorgensen/Desktop/Test Location/Audio/Output",
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
        pre_ptf: "/Users/noahwilliamjorgensen/Desktop/Test Location/Video/",

        //This is where media encoder dumps the finished product
        post_ptf: "/Users/noahwilliamjorgensen/Desktop/Test Location/Video/Output/"
    },

    //Download Options
    download_enabled: true,
    download_ftp: {
        host: "192.168.10.55",
        dir: "2",
        filter: ".mov"
    },

}