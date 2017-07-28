$(document).ready(function() {
    "use strict";
    getTwitchData();
});


function getTwitchData() {
    "use strict";
    var streamersArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

    streamersArray.forEach(function(streamer) {
        $.ajax({
            type: "GET",
            url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamer,
            data: {},
            dataType: "jsonp",
            success: function(streamData) {
                console.log(streamData);
                if (!streamData.stream) {
                    //GetTwitch Channel Data
                    $.ajax({
                        type: "GET",
                        url: "https://wind-bow.gomix.me/twitch-api/channels/" + streamer,
                        data: {},
                        dataType: "jsonp",
                        success: function(channelData) {
                            setLists(streamData, channelData);
                        },
                        error: function(error) {}
                    });
                } else {
                    setLists(streamData, streamData.stream.channel);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
}


function setLists(streamData, channelData) {
    "use strict";
    var CHANNEL_NOT_AVAILABLE = 404;
    var html = "";
    var state;
    console.log(streamData);
    console.log(channelData);
    //Check if is online, offline, not available
    if (streamData.stream) {
        state = "online";
        html += "<li class = 'media'><div class = 'media-left media-middle'><a href='" + channelData.url + "'>";
        html += "<img src='" + channelData.logo + "' alt='" + channelData.display_name + " userprofile' class='online media-object img-circle'></a></div>";
        html += "<div class='media-body'><h5 class='online-text'>" + state + "</h5> <h2 class='media-heading'>" + channelData.name + "</h2><h2>" + channelData.game + "</h2><h4>" + channelData.status + "</h4></div></li>";

        $("#allList").append(html);
        $("#onlineList").append(html);
    } else if (streamData.stream === null && channelData.status !== CHANNEL_NOT_AVAILABLE) {
        state = "offline";
        html += "<li class = 'media'><div class = 'media-left media-middle'><a href='" + channelData.url + "'>";
        html += "<img src='" + channelData.logo + "' alt='" + channelData.display_name + " userprofile' class='offline media-object img-circle'></a></div>";
        html += "<div class='media-body'><h5 class='offline-text'>" + state + "</h5> <h2 class='media-heading'>" + channelData.name + "</h2><h2>" + channelData.game + "</h2><h4>" + channelData.status + "</h4></div></li>";
        $("#allList").append(html);
        $("#offlineList").append(html);
    } else {
        state = "unavailable";
        html += "<li class = 'media'><div class = 'media-left media-middle'><a href='#'>";
        html += "<img src='http://wpsites.org/wp-content/uploads/2016/02/404-redirect.png' alt='profile " + channelData.error + "' class='unavailable media-object img-circle'></a></div>";
        html += "<div class='media-body'><h5 class='unavailable-text'>" + state + "</h5> <h2 class='media-heading'>" + channelData.status + "</h2><h2>" + channelData.message + "</h2>";

        $("#allList").append(html);
    }

}