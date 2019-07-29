const PromiseFtp = require('promise-ftp');
let progress = require('progress-stream');
const settings = require('../../../settings.json');
let ftp = new PromiseFtp();
const fs = require('fs');
const $ = require('jquery');

/////////////////////USER OPTIONS///////////////////
let remoteDir = '/2/';
let localDir = settings.video.pre_ptf
let options = { host: '192.168.10.55' };

//Conneciton
module.exports = async () => {
    try {
        //Connecting and Getting File info
        console.log(await ftp.connect(options))
        let list = (await ftp.list(remoteDir));
        let file = (list [ list.length - 1 ])
        let stream = await ftp.get(`${remoteDir}${file.name}`)

        //Progress Registration
        let str = progress({ 
            length: file.size, 
            time: 1000 /* ms */ 
        });
        str.on('progress', function(progress) {
            $('#name').text('Downloading...')
            $('#percent').text(`${Number((progress.eta/60).toFixed(0))} Minutes Remaining`)
            $('#progress').css('width', `${progress.percentage}%`)
            console.log(progress);
        });

        //Downlod Stream
        await new Promise((resolve, reject) =>{
            stream.once('close', resolve);
            stream.once('error', reject);
            stream.pipe(str).pipe(fs.createWriteStream(localDir + file.name));
        }) 

        $('#progress').css('width', `0%`) 
        $('#progress p').text.hide()
        return true

    } catch (err) {
        return err
    } finally {
        ftp.end()
    }
}