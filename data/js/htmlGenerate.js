function FbHtmlGenerate() {}


FbHtmlGenerate.prototype = Object.create(FbHelpers.prototype);
FbHtmlGenerate.prototype.constructor = FbHtmlGenerate;


FbHtmlGenerate.prototype.styleCreate = function() {
    var style = "<style data-style='fb-music-inline'>" + ".-item-fb-music-outer{cursor: pointer; display: block; position: relative; padding: 8px 6px 2px 3px; float: left}" + ".-item-fb-music-outer:before{position: absolute;content: '';height: 20px;z-index: 1;bottom: 85%;left: -50px;width: 278px; display: none}" + ".-item-fb-music-outer:hover:before{display: block}" + ".-item-fb-music-ico{display: table;}" + ".-item-fb-music-drop-down{display: none; position: absolute; background: #fff; width: 278px; min-height: 100px; border: 0;border-radius: 2px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);outline: 0;padding: 0;right: -210px;bottom: 130%;z-index: 999;}" + ".-item-fb-music-drop-down:before{content: ''; z-index: 1;position: absolute; bottom: -8px; left: 50px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: #fff transparent transparent transparent;}" + ".-item-fb-music-drop-down:after{content: ''; position: absolute; left: 50px; bottom: -9px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: rgba(102, 102, 102, 0.41) transparent transparent transparent;}" + ".-item-music-search{border: none;border-bottom: 2px solid #6d84b4;padding: 20px 10px 20px 28px; font-size: 14px !important; width: 100%;box-sizing: border-box;}" + ".-item-music-search:focus, .-item-music-search:active, .-item-search-ico:focus, .-item-search-ico:active{outline: none}" + ".-item-of-array-list {position: relative;min-height: 100px;box-sizing: border-box;overflow: hidden;}" + ".-item-of-array-list li:last-child {border-bottom: none !important}" + ".-item-form-search{position: relative; border-radius: 3px 3px 0 0;overflow: hidden;}" + ".-item-search-ico{text-indent: -999999px; cursor: pointer; border: none; position: absolute; width: 16px; height:21px; background: url(" + this.getUrlImages('data/imgs/search-icon.svg') + "); left: 5px; top: 17px}" + ".-item-preloader-img{position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 25px; height: 25px;}" + ".-item-track-single {border-bottom: 1px solid #eee;padding: 10px 10px 10px 30px; position: relative}" + ".-item-name-of-song {display: block; color: #000; padding-right: 70px}" + ".-item-name-of-artist {font-size: 11px;color: #888;max-width: 80%;display: block;}" + ".-item-send-song{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + this.getUrlImages('data/imgs/plus.png') + ") no-repeat 0px 0px} .-item-send-song-done{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + this.getUrlImages('data/imgs/plus.png') + ") no-repeat -15px 0px}" + ".-item-play{top: 12px; position: absolute; left: 10px; cursor: pointer; width: 10px; height: 13px; background: url(" + this.getUrlImages('data/imgs/controls.png') + ") no-repeat 0px 0px}" + ".-active-fb-pop-up{display: block !important} .-now-plaing-fb-music {background: url(" + this.getUrlImages('data/imgs/controls.png') + ") no-repeat -11px 0 !important} #-item-audio-duration{width: 90%;display: inline-block; background: #ddd; height: 5px; position: relative;} .-item-progress-to-play{position: absolute; height: 5px; left: 0; top: 0; background: #6d84b4} .-item-name-of-song-dialog{font-size: 13px; font-weight: 700; color: #000;} .-item-name-of-artist-dialog{color: #666; font-size: 11px;} .-item-single-try{position: absolute !important; font-size: 12px;text-align: center;width: 100% ;top: 50% ;margin-top: -10px;} .-item-duration-to-play{position: absolute; right: 2px; top: 7px} .-in-list{position: absolute;right: 36px;top: 50%; margin-top: -7px;} .-item-fb-music-wall{display: inline-block;padding: 0px 7px;position: relative;top: 1px;} .-item-fb-music-drop-down-wall {display: none;position: absolute;background: #fff;width: 278px;min-height: 100px;border: 0;border-radius: 2px;box-shadow: 0 0px 2px 0px rgba(0, 0, 0, .4);outline: 0;padding: 0;right: -158px;top: 145%;z-index: 999;} " + ".-item-fb-music-drop-down-wall:before {content: '';z-index: 1;position: absolute;top: -8px;left: 98px;width: 0;height: 0;border-style: solid;border-width: 0px 8px 8px 8px;border-color: transparent transparent #fff transparent;}" + ".-item-fb-music-drop-down-wall:after {content: '';position: absolute;left: 98px;top: -9px;width: 0;height: 0;border-style: solid;border-width: 0px 8px 8px 8px;border-color: transparent transparent rgba(102, 102, 102, 0.41) transparent;} .-item-loader-song{background: url(" + this.getUrlImages('data/imgs/preloader.gif') + ") no-repeat; background-size: 100%;margin-top: -7.5px;top: 50%;position: absolute;right: 10px;cursor: pointer;width: 15px;height: 15px;} .-item-no-send-message{position: absolute; width: 100%; height: 100%; z-index: 9999; background: rgba(255,255,255,.85); left: 0; top: 0} .-item-send-no-message-text{position: absolute; top: 50%; padding: 0 20px; font-size: 13px; font-weight: 700; color: #333; margin-top: -16px; text-align: center} .-item-in-not-found{text-align: center;margin-top: 35px;font-weight: 700;} .-in-yandex-capcha{text-align: center} .form__audio, .form__arrow, .input__hint{display: none} .form__inner{text-align: center; padding: 10px 0 50px 0} .-fb-item-instraction{width: 100%; height: 100%; position: fixed; display:table; background: rgba(0,0,0,.5); z-index: 99999;} .-fb-inner-item-instaracion{display: table-cell; vertical-align: middle;} .-fb-item-static-container{width: 600px;margin: 0 auto;background-color: #fff;} .-item-for-instaraction{padding: 15px;} .-item-for-instaraction > *{display: inline-block; vertical-align: middle} .-fb-item-static-container h1{padding: 15px 10px; border-bottom: 1px solid #ddd} .-image-of-fb-instaracion{width: 250px;padding-right: 20px; } .-fb-item-closers{padding: 15px 10px;display: table;border-top: 1px solid #ddd;width: 100%;box-sizing: border-box;} .-fb-close-button{color: #fff; font-size: 12px; background-color: #4e69a2; padding: 0 16px; line-height: 22px; text-shadow: 0 -1px 0 rgba(0, 0, 0, .2); border: 1px; border-radius: 2px;box-shadow: 0 1px 1px rgba(0, 0, 0, .05);box-sizing: content-box;font-family: helvetica, arial, sans-serif;-webkit-font-smoothing: antialiased;font-weight: bold;position: relative;text-align: center;vertical-align: middle; float: right; cursor: pointer} .-fb-item-table-cell-text{width: 270px} ._552h._11d6, ._552h._n4k, ._552h._35li{padding-right:100px !important} #status-plaing{position: fixed; bottom: 55px; left: 20px; z-index: 9999; width: 250px;} #status-plaing > *{margin:0!important} .-close-to-action-player{width: 14px;height: 14px;right: -6px;top: -6px;position: absolute;display: inline-block; cursor: pointer; background: url(" + this.getUrlImages('data/imgs/close.png') + ") no-repeat; z-index: 9999} #pagelet_composer{position:relative; z-index:99} i.-item-play.-item-loader-song {left: 2px !important;top: 15px !important;} ._4-u2>._4-u3:first-child{position: relative; z-index: 99;} .-item-track-single i.-item-play.-item-loader-song{left: 7px !important;top: 18px !important;} .aftering-warning:before{top: 100%;left: 81px;z-index: 1;position:absolute; content: ''; width: 0;height: 0;border-style: solid;border-width: 10px 7.5px 0 7.5px;border-color: #fff9d7 transparent transparent transparent;} .aftering-warning:after{position: absolute; content:''; width: 0;height: 0;border-style: solid;border-width: 11px 8px 0 8px;border-color: #e2c822 transparent transparent transparent;top: 100%;left: 80px;}" + " < /style>";
    return style;
}

FbHtmlGenerate.prototype.inShareSecurity = function(name) {
    var text = "<p class='aftering-warning' style='font-size: 13px; position: relative; background-color: #fff9d7; border: 1px solid #e2c822; padding: 10px'>Facebook cares about your security and prevents automatic posting to your friends walls. <span>You want to post on the wall of <b style='font-size: 14px'>" + decodeURIComponent(name) + "</b>. Please, enter his name in the field below.</span></p>";
    return text;
}

FbHtmlGenerate.prototype.inDialogSecurity = function() {
    var text = "<p class='aftering-warning' style='font-size: 13px; position:relative; background-color: #fff9d7; border: 1px solid #e2c822; padding: 10px'>Facebook cares about your security and prevents automatic posting to group chats. Please, add all the recipients of the song in the field below. </p>";
    return text;
}


FbHtmlGenerate.prototype.createPopUp = function() {

    var self = this;


    var getLsParameter = function(paramName, callBack) {
        chrome.runtime.sendMessage({
            type: 'getLsParameter',
            paramName: paramName
        }, function(msg) {
            callBack && callBack(msg.paramValue);
        });
    };

    var setLsParameter = function(paramName, paramValue) {
        chrome.runtime.sendMessage({
            type: 'setLsParameter',
            paramName: paramName,
            paramValue: paramValue
        });
    };

    getLsParameter('isShowed', function(res) {
        if (res) return;
        var popUp = "<div class='-fb-item-instraction'>" + "<div class='-fb-inner-item-instaracion'>" + "<div class='-fb-item-static-container'>" + "<h1>New Facebook feature - Music (Beta) - share your favourite music with your friends!</h1>" + "<div class='-item-for-instaraction'><img class='-image-of-fb-instaracion' src=" + self.getUrlImages('data/imgs/f.png') + " /><div class='-fb-item-table-cell-text'><p>We would like to present our new feature, that we have been working on for some time.</p><p>It adds the ability to share and listen to your favourite songs on facebook.</p><p>You can search for the music in one of the biggest world music libraries, which is constantly growing and share the music in personal messages and on your or your friends walls.</p><p>To start using it, just press the 'music note' icon, enter song/artist name and share it with your friend.</p><p>The feature is still in development, so you can face small bugs and issues working with it. Please, be patient, we will make this tool perfect.</p><p>Enjoy!</p></div></div>" + "<p class='-fb-item-closers'><button class='-fb-close-button'>Close</button></p>" + "</div>" + "</div>" + "</div>";

        document.body.insertAdjacentHTML("afterbegin", popUp);
        var close = document.querySelector(".-fb-item-closers");
        close.addEventListener("click", closePopUp);

        function closePopUp() {
            var popup = document.querySelector(".-fb-item-instraction");
            popup.parentNode.removeChild(popup);
        }
        setLsParameter('isShowed', 1);
    });

}

FbHtmlGenerate.prototype.createTemplate = function(style) {
    var self = this;
    var styles = style ? style : '';
    var template = "<div " + styles + " class='-readys-to-closer -item-fb-music-outer'>" + "<span class='-item-for-ico-no-style -item-fb-music-ico'><img src='" + self.getUrlImages('data/imgs/nota.svg') + "'></span>" + "<div class='-item-fb-music-drop-down'>" + "<div class='-item-form-search'>" + "<input type='submit' class='-item-search-ico' />" + "<input type='text' class='-item-music-search' placeholder='Enter the track/artist name...'>" + "</div>" + "<div class='-item-list-music'>" + "<ul class='-item-of-array-list'>" + "<li class='-item-single-try'>Fill the search term and press 'Enter'</li>" + "</ul>" + "</div>" + "</div>" + "</div>";

    return template;

}

FbHtmlGenerate.prototype.generateOurPlayerInDialog = function(el, link, options) {
    if (!link) {
        return;
    }


    var splitLink = link.split("&"),
        trackId = splitLink[0].split("=")[1],
        albumId = splitLink[1].split("=")[1],
        name = (splitLink[2].split("=")[1]) ? splitLink[2].split("=")[1].replace(/\+/ig, " ") : 'No title',
        artist = (splitLink[3].split("=")[1]) ? splitLink[3].split("=")[1].replace(/\+/ig, " ") : 'No title',
        duration = splitLink[4].split("=")[1];

    var addStyle = options ? options : "float: left;";


    var player = "<div style='background-color: #e0edff;border: 1px solid #bcc7d6;border-radius: 3px; " + addStyle + " position: relative;padding: 8px 37px 8px 20px;width: 100%;box-sizing: border-box;'>" + "<i style='top: 9px; left:3px' class='-item-play' data-full-link=" + link + " data-id=" + Math.random() + " data-duration-time-true='" + this.formatTime(duration / 1000) + "' data-duration='" + duration + "' data-id-song='" + trackId + "' data-album-id='" + albumId + "'></i>" + "<span class='-item-name-of-song-dialog'>" + decodeURIComponent(name) + "</span>" + "<span class='-item-name-of-artist-dialog'> - " + decodeURIComponent(artist) + "</span> <span class='-item-duration-to-play'>" + this.formatTime(duration / 1000) + "</span>" + "</div>";

    return player;
}

FbHtmlGenerate.prototype.preloaderCreate = function() {
    var preloader = "<img class='-item-preloader-img' src='" + this.getUrlImages('data/imgs/preloader.gif') + "' />";
    return preloader;
}


FbHtmlGenerate.prototype.capchaTry = function() {
    var div = "<div class='-item-no-send-message'><p class='-item-send-no-message-text'>You can`t send a message in group chat! Sorry:(</p></div>";
    return div;
}

FbHtmlGenerate.prototype.templateForIco = function(elemToList) {

    var li, liend;

    if (elemToList) {
        li = "<li style='margin-top: 5px; position: absolute;z-index: 9999999;'>";
        liend = "</li>";
    } else {
        li = '';
        liend = '';
    }

    var template = li + "<a class='-readys-to-closer -item-fb-music-wall'>" + "<span class='-item-for-ico-no-style'><img src='" + this.getUrlImages('data/imgs/nota.svg') + "'></span>" + "<div class='-item-fb-music-drop-down-wall'>" + "<div class='-item-form-search'>" + "<input type='submit' class='-item-search-ico' />" + "<input type='text' class='-item-music-search' placeholder='Enter the track/artist name...'>" + "</div>" + "<div class='-item-list-music'>" + "<ul class='-item-of-array-list -wall-ul'>" + "<li class='-item-single-try'>Fill the search term and press 'Enter'</li>" + "</ul>" + "</div>" + "</div>" + "</a>" + liend;

    return template;

}


FbHtmlGenerate.prototype.generateList = function(data, el, self) {
    var self = this;

    var AllMoreArtists = function(data) {

        var AllArtists = data.map(function(item, i) {

            if (item.name) {
                return item.name;
            }

        });

        return AllArtists.join(", ");
    }


    var ArrayOfSong = data.tracks.items.map(function(item, i) {
        var coverImage = (item.album.coverUri) ? item.album.coverUri.replace(/%/ig, "") : '',
            link = "http://fbmusic.ml/index.php?track=" + item.id + "&albumId=" + item.album.id + "&name=" + encodeURIComponent(item.title.replace("&", "")) + "&artist=" + encodeURIComponent(AllMoreArtists(item.artists).replace("&", "")) + "&duraion=" + item.durationMillis;
        return ("<li class='-item-track-single'>" + "<i class='-item-play' data-full-link=" + link + " data-id=" + Math.random() + " data-duration='" + item.durationMillis + "' data-duration-time-true='" + self.formatTime(item.durationMillis / 1000) + "' data-id-song='" + item.id + "' data-album-id='" + item.album.id + "'></i>" + "<span class='-item-name-of-song'>" + item.title + "</span>" + "<span class='-item-name-of-artist'>" + AllMoreArtists(item.artists) + "</span>" + "<i class='-item-send-song' data-name-song='" + item.title + "' data-name-artist='" + AllMoreArtists(item.artists) + "' data-duration='" + item.durationMillis + "' data-album='" + item.album.id + "' data-song='" + item.id + "' data-cover-url-img='" + coverImage + "m1000x1000'></i> <span class='-item-duration-to-play -in-list'>" + self.formatTime(item.durationMillis / 1000) + "</span>" + "</li>");
    });


    el.innerHTML = "";

    if (ArrayOfSong.length > 0) {
        el.insertAdjacentHTML("afterbegin", ArrayOfSong.join(""))
    } else {
        el.insertAdjacentHTML("afterbegin", "<p class='-item-in-not-found'>No matches found...:(</p>")
    }

    return el;

}

var _FbHtmlGenerate = new FbHtmlGenerate();
