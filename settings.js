const $ = require('jquery')

$(document).ready(()=>{
    
    //This'll handle the settings
    $('#settings-btn').click(()=>{
        $('.settings').show(200)
    })
    
    $('.settings .cancel-btn').click(()=>{
        $('.settings').hide(200)
    })
    
    $('.settings .save-btn').click(()=>{
        $('.settings').hide(200)
    })
    
    var serverHtml = '<h5>//Server 1</h5><label for=settings-text>Name</label> <input class=settings-text placeholder=.wav> <label for=check-one>Enabled</label><input class=form-checkbox type=checkbox id=check-one><br><label for=settings-text>Host</label> <input class=settings-text placeholder=.mp3> <label for=settings-text>User</label> <input class=settings-text placeholder=.mov> <label for=settings-text>Password</label> <input class=settings-text placeholder=.mp4 type=password> <label for=settings-text>Video Directory</label> <input class=settings-text placeholder=.mp4> <label for=settings-text>Audio Directory</label> <input class=settings-text placeholder=.mp4><div class="btn add-server success"><i class="fas fa-plus"></i></div><div class="btn failure remove-server"><i class="fas fa-minus"></i></div>'
    
    //Add Server Button
    $('.add-server').click(()=>{
        console.log("server clicked")
        $('.servers').append(serverHtml)
    })

})
