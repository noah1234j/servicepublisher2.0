const date = require('date-and-time')
const ftp = require('basic-ftp')
const config = require('./config')

let title, file

//get_title()
download()

function get_title() {
    //On the "start transfer" button click
    document.getElementById('data').onclick = () => {
        console.log(title)
        //Grabs the info
        amPm = document.getElementById('amPm').value,
        speakerInitials = document.getElementById('speakerInitials').value,
        sermonTitle = document.getElementById('sermonTitle').value

        //Grabs the Date
        let now = new Date();
        let thisDate = date.format(now, 'YYYY-MM-DD')
        
        title = thisDate + "-" + amPm.toUpperCase() + "-" + speakerInitials.toUpperCase() + "-" + sermonTitle + "-Texas"
    }
}

async function download() {

    //If download is enabled download, if not enabled don't
    if (config.download_enabled) {
        
        // makes a new client object
        var client = new ftp.Client()

        //Makes the connection
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
            (files[n].name.endsWith(".mov")) ? file_list.push(files[n].name) : null
            n++
        }

        //This grabs the most recent .mov slices of the extension and sets it to a global var
        file = file_list.slice(-1)[0].slice(0, -4)



    } else {
        //If download is not enabled code here
    }
}