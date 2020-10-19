//### search for music ###//

var UI = {};

UI.submetClick = document.querySelector(".search").addEventListener('click', function() {

    var serachInput = document.querySelector("input").value;
    soundcloudAPI.getTrack(serachInput);

    // clear the previous search resulats

    var SearchResults = document.querySelector(".js-search-results")

    SearchResults.innerHTML = " ";

})
UI.EnterPress = document.querySelector(".search").addEventListener('keyup', function(e) {

    var serachInput = document.querySelector("input").value;
    if (e.which == 13) {
        soundcloudAPI.getTrack(serachInput);

        var SearchResults = document.querySelector(".js-search-results")

        SearchResults.innerHTML = " ";
    }


    // clear the previous search resulats


})



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

soundcloudAPI.getTrack = function(te) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: te,
        license: 'cc-by-sa'
    }).then(function(tracks) {
        console.log(tracks);
        soundcloudAPI.renderTracks(tracks);
    });

}

// call the object get track 

soundcloudAPI.getTrack("eminem");

//### Display the  cards ###// 

//Dynamically Generate Our HTML Cards

soundcloudAPI.renderTracks = function(tracks) {

    tracks.forEach(function(track) {

        var card = document.createElement('div');
        card.classList.add('card');

        // image 
        var image = document.createElement('div');
        image.classList.add('image');

        var imgurl = document.createElement('img');
        imgurl.classList.add('image_img');
        imgurl.src = track.artwork_url || ' https://source.unsplash.com/random/200x200?sig=1';
        image.appendChild(imgurl);


        // content & header

        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');



        header.classList.add('header');
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

        // botton 

        var botton = document.createElement('div');
        botton.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('icon', 'add');

        var bottontexte = document.createElement('span');
        bottontexte.innerHTML = 'add to play list';


        // append child 
        content.appendChild(header);
        botton.appendChild(icon);
        botton.appendChild(bottontexte);

        botton.addEventListener('click', function() {


                // call the object " getembed to play the music " // 
                soundcloudAPI.getEmbed(track.permalink_url);

            }

        );


        card.appendChild(image);
        card.appendChild(content);
        card.appendChild(botton);

        var serachresults = document.querySelector(".js-search-results");


        serachresults.appendChild(card);


    });

}


soundcloudAPI.getEmbed = function(TrackUrl) {

    //### add to playlist and play ###//
    //Embedding
    SC.oEmbed(TrackUrl, {
        auto_play: false
    }).then(function(embed) {
        console.log('oEmbed response: ', embed);
        var SideBar = document.querySelector('.js-playlist');


        var box = document.createElement('div');
        box.innerHTML = embed.html;
        SideBar.insertBefore(box, SideBar.firstChild);
        localStorage.setItem("key", SideBar.innerHTML);
    });

}

var SideBar = document.querySelector('.js-playlist');

SideBar.innerHTML = localStorage.getItem("key");
UI.ClearPlaylist = document.querySelector(".btn-reset").addEventListener('click', function() {

    localStorage.clear();
    location.reload();
});













// }