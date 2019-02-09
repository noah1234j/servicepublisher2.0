const fs = require('fs');

module.exports =
 
class settingsInit {
    
    settings() {
        this.settings = require("../../../settings.json");
        return this.settings
    }

    save(Settings) {
        this.file = "settings.json"; //settings location
        this.settings = JSON.stringify(Settings, null, 2) //Makes it human readable and encodes to json
        fs.writeFileSync(this.file, this.settings, (err) => {if (err) console.log(err)}); //saves the settings to the file
        console.log('Settings Saved')
    }
}


