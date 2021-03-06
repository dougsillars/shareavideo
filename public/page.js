
//onloadstuff


window.onload = function(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var movie = urlParams.get('movie');
        console.log(movie);

        if(document.getElementsByClassName('image')[0]){
            console.log("theres an image");
            //add the event listener fpr clicking the image
            document.getElementsByClassName('image')[0]
            .addEventListener('click', function (event) {
                // do something
                console.log("movie click");
                startStream(movie, 0);
            });
    

        }else{
            console.log("theres no image");

                    //in the image is hidden - video has started
                //when you click on the video
                    //make a sync button
                   
                        //connect to the player
                        window.player = new PlayerSdk("#imageDiv");
                        console.log("player connected");
                      //  liveSync();
                   

        }



}

function liveSync(){
    //we can add a "sync button"
    document.getElementById("video-title").innerHTML = "Click to sync";
    document.getElementById("video-title").addEventListener('click', function (event) {
        // sync player to newest bit of live available....
        player.mute();
        player.setCurrentTime(99999); 
        console.log("sync click");
    });

}

function startStream(movie, counter){
    console.log(movie);

    var movieUpload = {"movie" :movie};
    var oReq = new XMLHttpRequest();
    
    oReq.open("POST", "/start");
    oReq.setRequestHeader("Content-type", "application/json");
    oReq.onload = function (oEvent) {
            console.log("video started: ",movieUpload );
            var livestreamid  = document.getElementById("videoDiv").innerHTML;
            document.getElementById("videoDiv").innerHTML="";
            console.log("liveid", livestreamid);
            var videos = ['vi74TmfoJyPmVJVnIl4jzMLA', livestreamid];

            //now we create the player
            //since the livestream can take some time to start - we'll kick off with the 10 second countdown video
            var counter = 0;
            createVideo(counter);
            document.getElementsByClassName('image')[0].style.display= 'none';
            document.getElementById('thumb-live-indicator').className = "active";

            //code lifted from playlist demo
            function createVideo(counter) {
                console.log("video", counter +videos[counter]);

                var vodOptions = { 
                    id: videos[counter], 
                     autoplay: true
                     // ... other optional options s
                 };
                 var liveOptions = { 
                    id: videos[counter], 
                     autoplay: true,
                     live: true
                     // ... other optional options s
                 };
                 videoOptions = vodOptions;
                 if(counter >0){
                     //live video
                     videoOptions= liveOptions;
                     //add teh sync button
                 //   liveSync();

                 }
                console.log("player options", videoOptions);

                window.player = new PlayerSdk("#imageDiv", videoOptions);
                player.addEventListener('play', function() { 
                    //console.log("playing");
                    onPlay(counter);
                });
                player.addEventListener('ended',function() { 
                    console.log("ended");
                    counter ++;
                    //if we hit the end of the array - start over again
                   
                    onEnd(counter);
                });
            
            }
            
            
            function onPlay(counter) {
               // console.log("onPlay");
                console.log("counter" ,counter);
            
                console.log("video playing");
            }
            function onEnd(counter){
                //console.log("onEnd");
     
                //console.log("video over");
                player.destroy();
                //video is over - so start another one...
                createVideo(counter);
            }
            //end code lifted from playlist demo


    }
    oReq.send(JSON.stringify(movieUpload));

}

