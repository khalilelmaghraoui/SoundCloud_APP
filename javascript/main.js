//### search for music ###//





//### query soundcloud  API  ###//


// function getTrack(inputvalue){ // if we want to use function methode else we are going to use POO


// OBJECT DECLARATION //

var soundcloudAPI = {};

// creat
soundcloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}
soundcloudAPI.init();

soundcloudAPI.getTrack = function(inputvalue) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: inputvalue,
        license: 'cc-by-sa'
    }).then(function(tracks) {
        console.log(tracks);
    });

}

// call the object get track 

soundcloudAPI.getTrack("post malone");






// }





//### Display the  cards ###// 







//### add to playlist and play ###//