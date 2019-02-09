const $ = require('jquery')
const os = require('os')
const serverSettingsInit = require('./src/js/modules/settingsHandler')

//CLASSES
class Settings {
    openHandler() {
        // Opens settings when I click the settings button
        $('#settings-btn').click(()=>{
            $('.settings').show(200)
            this.ServerSettings = new serverSettingsInit() //Opens the settings from the json
            this.serverSettings = this.ServerSettings.settings() //exposes them as an object
            this.populateSettingsList()
            this.platformHandler()
            this.fillform()
        })
    }

    closeHandler() {
        //Closes the settings
        $('.settings .cancel-btn').click(()=>{
            $('.settings').hide(200)
            this.serverSettings = null //Flushes all changes
        }) 
    }

    saveHandler() {
        //Saves the settings
        $('.settings .save-btn').click(()=>{
            //Reopens the json file and compares the object to the json object
            this.ServerSettings = new serverSettingsInit() //Opens the settings from the json
            this.serverSettings = this.ServerSettings.settings() //exposes them as an object

            //If the value of the field has been changed, move the change to the object
            Object.keys(this.settingsMapping).forEach((current) => {
                
                this.key = current
                this.value = this.settingsMapping[this.key]

                // handles one level down of parent/child based on location of period
                if (this.value.indexOf('.') !== -1) {
                    this.parent = this.value.slice(0, this.value.indexOf('.'))
                    this.child = this.value.slice(this.value.indexOf('.') + 1)

                    //If the content is unchanged...
                    if ($("#" + this.key).val() !== this.serverSettings[this.parent][this.child].toString()) {
                        this.serverSettings[this.parent][this.child] = $("#" + this.key).val()
                    }
                } else {
                    if ($('#' + this.key).val() !== this.serverSettings[this.settingsMapping[this.key]].toString()) {
                        this.serverSettings[this.settingsMapping[this.key]] = $('#' + this.key).val()
                    }
                }
                $('.settings').hide(200) //closes the ui
            })
            this.ServerSettings.save(this.serverSettings) //saves all changes persistently
        })
    }

    addServerHandler() {
        this.serverHtml = ' <h5>//Server 1</h5> <div class="server1"> <label for="settings-text">Name</label> <input type="text" class="settings-text serverName" placeholder=".wav"> <label for="check-one">Enabled</label> <input type="checkbox" class="form-checkbox serverEnabled" id="check-one"><br><br><label for="settings-text">Host</label> <input type="text" class="settings-text serverHost" placeholder=".mp3"> <label for="settings-text">User</label> <input type="text" class="settings-text serverUser" placeholder=".mov"> <label for="settings-text">Password</label> <input type="password" class="settings-text serverPass" placeholder=".mp4"> <label for="settings-text">Video Directory</label> <input type="text" class="settings-text serverVidDir" placeholder=".mp4"> <label for="settings-text">Audio Directory</label> <input type="text" class="settings-text serverAudDir" placeholder=".mp4"> <div class="btn add-server success"><i class="fas fa-plus"></i></div><div class="btn remove-server failure"><i class="fas fa-minus"></i></div></div>'
        //Add Server Button
        $('.add-server').click(()=>{
            console.log("server clicked")
            $('.servers').append(this.serverHtml)
        })

        //FINISH ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    populateSettingsList () {
        this.settingsMapping = {
            setDynamic: "osDynamic",
            mediaEncoderLocation: "encoder",
            audioPreEncodeLocation: "audio.pre_ptf",
            audioPostEncodeLocation: "audio.post_ptf",
            videoPreEncodeLocation: "video.pre_ptf",
            videoPostEncodeLocation: "video.post_ptf",
            audioPreEncodeFilter: "audio.pre_filter",
            audioPostEncodeFilter: "audio.post_filter",
            videoPreEncodeFilter: "video.pre_filter",
            videoPostEncodeFilter: "video.post_filter",
            debug: "debug",
            hyperdeckHost: "download_ftp.host",
            hyperdeckHomeDir: "download_ftp.dir",
            hyperdeckDownloadFilter: "download_ftp.filter"
        }
        
        //adds upload servers to the settings Mapping based on the number of upload servers
        Object.keys(this.serverSettings.upload_ftps).forEach((current) => {
        })
    }

    fillform() {
        //loops through settings mapping and fills out the form based on that
        Object.keys(this.settingsMapping).forEach((current) => {
            this.key = current
            this.value = this.settingsMapping[this.key]
            this.id = "#" + current
            
            //handles one level down of parent/child based on location of period
            if (this.value.indexOf('.') !== -1) {
                this.parent = this.value.slice(0, this.value.indexOf('.'))
                this.child = this.value.slice(this.value.indexOf('.') + 1)
                $(this.id).val(this.serverSettings[this.parent][this.child])
            } else {
                $(this.id).val(this.serverSettings[this.value])
            }

            //Checkbox Handler
            if ($(this.id).is("input[type='checkbox']") || ($(this.id).is(":checked"))) { 
                //Checkbox and checked
                console.log(this.id + ' checked')

            } else if ($(this.id).is("input[type='checkbox']")) {
                //checkbox unchecked
                console.log(this.id + ' unchecked')
            }


            //DO ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })
    }

    //Handles windows vs mac
    platformHandler() {

        if (os.platform() == 'win32') { //If windows
            console.log("\r\n You're on a windows!!!")
            this.homeDir = os.homedir()
            this.slash = "\\"
            this.encoder = 'start C:/"Program Files"/Adobe/"Adobe Media Encoder CC 2018"/"Adobe Media Encoder.exe"'

        } else if (os.platform() == 'darwin'){ //If Mac
            console.log("You're on a macOS")
            this.homeDir = os.homedir()
            this.slash = "/"
            this.encoder = 'open "/Applications/Adobe Media Encoder CC 2018/Adobe Media Encoder CC 2018.app"'
        } else {
            console.log('not a supported platform') //If Other
        }

        if (this.serverSettings.osDynamic){
            //Sending the locations to the settings
            this.serverSettings.audio.post_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '03_audio_encodes' + this.slash;
            this.serverSettings.audio.pre_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '02_audio_capture' + this.slash;
            this.serverSettings.video.pre_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '04_video_capture' + this.slash;
            this.serverSettings.video.post_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '05_video_encodes' + this.slash;
            this.serverSettings.audio.upload_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '03_audio_encodes' + this.slash + "Uploaded";
            this.serverSettings.video.upload_ptf = this.homeDir + this.slash + 'Documents' + this.slash + '05_video_encodes' + this.slash + "Uploaded";

            //Handles windows vs mac Media encoder Open
            this.serverSettings.encoder = this.encoder
            console.log('dynamic enabled')
            console.log(this.serverSettings)
        }
    }
}


// Shows and hides the settings by the buttons
$(document).ready(()=>{
    let settings = new Settings()

    settings.openHandler()

    settings.saveHandler()

    settings.addServerHandler()

    settings.closeHandler()

})


