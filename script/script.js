$(document).ready(function() {

    getTwitchData();

});

function getTwitchData() {
    $.ajax({
        type: "GET",
        url: "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp",
        data: {},
        dataType: "jsonp",
        success: function(response) {
            console.log(response);
            setList(response);
        },
        error: function(error) {
            console.log(error);
        }
    });

    // $.ajax({
    //     type: "GET",
    //     url: "https://wind-bow.gomix.me/twitch-api/channels/freecodecamp",
    //     data: {},
    //     dataType: "jsonp",
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     error: function(error) {
    //         console.log(error);
    //     }
    // });
}

function setList(streamData) {
    if (!streamData) {

    }
}