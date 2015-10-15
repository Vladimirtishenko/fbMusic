function FbHtmlGenerate() {}


FbHtmlGenerate.prototype = Object.create(FbHelpers.prototype);
FbHtmlGenerate.prototype.constructor = FbHtmlGenerate;

FbHtmlGenerate.prototype.styleCreate = function() {
    var style = "<style data-style='fb-music-inline'>" + ".-item-fb-music-outer{cursor: pointer; display: block; position: relative; padding: 8px 6px 2px 3px; float: left}" + ".-item-fb-music-outer:before{position: absolute;content: '';height: 20px;z-index: 1;bottom: 85%;left: -50px;width: 278px; display: none}" + ".-item-fb-music-outer:hover:before{display: block}" + ".-item-fb-music-ico{display: table;}" + ".-item-fb-music-drop-down{display: none; position: absolute; background: #fff; width: 278px; min-height: 100px; border: 0;border-radius: 2px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);outline: 0;padding: 0;right: -210px;bottom: 130%;z-index: 999;}" + ".-item-fb-music-drop-down:before{content: ''; z-index: 1;position: absolute; bottom: -8px; left: 50px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: #fff transparent transparent transparent;}" + ".-item-fb-music-drop-down:after{content: ''; position: absolute; left: 50px; bottom: -9px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: rgba(102, 102, 102, 0.41) transparent transparent transparent;}" + ".-item-music-search{border: none;border-bottom: 2px solid #6d84b4;padding: 20px 10px 20px 28px; font-size: 14px !important; width: 100%;box-sizing: border-box;}" + ".-item-music-search:focus, .-item-music-search:active, .-item-search-ico:focus, .-item-search-ico:active{outline: none}" + ".-item-of-array-list {position: relative;min-height: 100px;box-sizing: border-box;overflow: auto;}" + ".-item-of-array-list li:last-child {border-bottom: none !important}" + ".-item-form-search{position: relative; border-radius: 3px 3px 0 0;overflow: hidden;}" + ".-item-search-ico{text-indent: -999999px; cursor: pointer; border: none; position: absolute; width: 16px; height:21px; background: url(" + chrome.extension.getURL('data/imgs/search-icon.svg') + "); left: 5px; top: 17px}" + ".-item-preloader-img{position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 25px; height: 25px;}" + ".-item-track-single {border-bottom: 1px solid #eee;padding: 10px 10px 10px 30px; position: relative}" + ".-item-name-of-song {display: block; color: #000;}" + ".-item-name-of-artist {font-size: 11px;color: #888;max-width: 80%;display: block;}" + ".-item-send-song{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + chrome.extension.getURL('data/imgs/plus.png') + ") no-repeat 0px 0px} .-item-send-song-done{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + chrome.extension.getURL('data/imgs/plus.png') + ") no-repeat -15px 0px}" + ".-item-play{top: 12px; position: absolute; left: 10px; cursor: pointer; width: 10px; height: 13px; background: url(" + chrome.extension.getURL('data/imgs/controls.png') + ") no-repeat 0px 0px}" + ".-active-fb-pop-up{display: block !important} .-now-plaing-fb-music {background: url(" + chrome.extension.getURL('data/imgs/controls.png') + ") no-repeat -11px 0 !important} #-item-audio-duration{width: 90%;display: inline-block; background: #ddd; height: 5px; position: relative;} .-item-progress-to-play{position: absolute; height: 5px; left: 0; top: 0; background: #6d84b4} .-item-name-of-song-dialog{font-size: 13px; font-weight: 700; color: #000;} .-item-name-of-artist-dialog{color: #666; font-size: 11px;} .-item-single-try{position: absolute; font-size: 12px;text-align: center;width: 100% ;top: 50% ;margin-top: -10px;} .-item-duration-to-play{position: absolute; right: 2px; top: 7px} .-in-list{position: absolute;right: 36px;top: 50%; margin-top: -7px;} .-item-fb-music-wall{display: inline-block;padding: 0px 7px;position: relative;top: 1px;} .-item-fb-music-drop-down-wall {display: none;position: absolute;background: #fff;width: 278px;min-height: 100px;border: 0;border-radius: 2px;box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .4);outline: 0;padding: 0;right: -158px;top: 145%;z-index: 999;} " + ".-item-fb-music-drop-down-wall:before {content: '';z-index: 1;position: absolute;top: -8px;left: 98px;width: 0;height: 0;border-style: solid;border-width: 0px 8px 8px 8px;border-color: transparent transparent #fff transparent;}" + ".-item-fb-music-drop-down-wall:after {content: '';position: absolute;left: 98px;top: -9px;width: 0;height: 0;border-style: solid;border-width: 0px 8px 8px 8px;border-color: transparent transparent rgba(102, 102, 102, 0.41) transparent;} .-item-loader-song{background: url(" + chrome.extension.getURL('data/imgs/preloader.gif') + ") no-repeat; background-size: 100%;margin-top: -7.5px;top: 50%;position: absolute;right: 10px;cursor: pointer;width: 15px;height: 15px;} .-item-no-send-message{position: absolute; width: 100%; height: 100%; z-index: 9999; background: rgba(255,255,255,.85); left: 0; top: 0} .-item-send-no-message-text{position: absolute; top: 50%; padding: 0 20px; font-size: 13px; font-weight: 700; color: #333; margin-top: -16px; text-align: center} .-item-in-not-found{text-align: center;margin-top: 35px;font-weight: 700;} .-in-yandex-capcha{text-align: center} .form__audio, .form__arrow, .input__hint{display: none} .form__inner{text-align: center; padding: 10px 0 50px 0}" + " < /style>";
    return style;
}

FbHtmlGenerate.prototype.createTemplate = function() {
    var self = this;
    var template = "<div class='-readys-to-closer -item-fb-music-outer'>" + "<span class='-item-for-ico-no-style -item-fb-music-ico'><img src='" + chrome.extension.getURL('data/imgs/nota.svg') + "'></span>" + "<div class='-item-fb-music-drop-down'>" + "<div class='-item-form-search'>" + "<input type='submit' class='-item-search-ico' />" + "<input type='text' class='-item-music-search' placeholder='Искать музыку...'>" + "</div>" + "<div class='-item-list-music'>" + "<ul class='-item-of-array-list'>" + "<li class='-item-single-try'>Введите название трека</li>" + "</ul>" + "</div>" + "</div>" + "</div>";

    return template;

}

FbHtmlGenerate.prototype.generateOurPlayerInDialog = function(el, link, options) {

    if (!link) {
        return;
    }

    var splitLink = link.split("&"),
        trackId = splitLink[0].split("=")[1],
        albumId = splitLink[1].split("=")[1],
        name = splitLink[2].split("=")[1].replace(/\+/ig, " "),
        artist = splitLink[3].split("=")[1].replace(/\+/ig, " "),
        duration = splitLink[4].split("=")[1];

    var addStyle = options ? options : "float: left;";

    var player = "<div style='background-color: #e0edff;border: 1px solid #bcc7d6;border-radius: 3px; " + addStyle + " position: relative;padding: 8px 37px 8px 20px;width: 100%;box-sizing: border-box;'>" + "<i style='top: 9px; left:3px' class='-item-play' data-duration-time-true='" + this.formatTime(duration / 1000) + "' data-duration='" + duration + "' data-id-song='" + trackId + "' data-album-id='" + albumId + "'></i>" + "<span class='-item-name-of-song-dialog'>" + decodeURIComponent(name) + "</span>" + "<span class='-item-name-of-artist-dialog'> - " + decodeURIComponent(artist) + "</span> <span class='-item-duration-to-play'>" + this.formatTime(duration / 1000) + "</span>" + "</div>";

    return player;
}

FbHtmlGenerate.prototype.preloaderCreate = function() {
    var preloader = "<img class='-item-preloader-img' src='" + chrome.extension.getURL('data/imgs/preloader.gif') + "' />";
    return preloader;
}


FbHtmlGenerate.prototype.capchaTry = function() {
    var div = "<div class='-item-no-send-message'><p class='-item-send-no-message-text'>Отправка сообщений временно недоступна!</p></div>";
    return div;
}

FbHtmlGenerate.prototype.templateForIco = function() {


    var template = "<a class='-readys-to-closer -item-fb-music-wall'>" + "<span class='-item-for-ico-no-style'><img src='" + chrome.extension.getURL('data/imgs/nota.svg') + "'></span>" + "<div class='-item-fb-music-drop-down-wall'>" + "<div class='-item-form-search'>" + "<input type='submit' class='-item-search-ico' />" + "<input type='text' class='-item-music-search' placeholder='Искать музыку...'>" + "</div>" + "<div class='-item-list-music'>" + "<ul class='-item-of-array-list -wall-ul'>" + "<li class='-item-single-try'>Введите название трека</li>" + "</ul>" + "</div>" + "</div>" + "</a>";

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
        var coverImage = (item.album.coverUri) ? item.album.coverUri.replace(/%/ig, "") : '';
        return ("<li class='-item-track-single'>" + "<i class='-item-play' data-duration='" + item.durationMillis + "' data-duration-time-true='" + self.formatTime(item.durationMillis / 1000) + "' data-id-song='" + item.id + "' data-album-id='" + item.album.id + "'></i>" + "<span class='-item-name-of-song'>" + item.title + "</span>" + "<span class='-item-name-of-artist'>" + AllMoreArtists(item.artists) + "</span>" + "<i class='-item-send-song' data-name-song='" + item.title + "' data-name-artist='" + AllMoreArtists(item.artists) + "' data-duration='" + item.durationMillis + "' data-album='" + item.album.id + "' data-song='" + item.id + "' data-cover-url-img='" + coverImage + "m1000x1000'></i> <span class='-item-duration-to-play -in-list'>" + self.formatTime(item.durationMillis / 1000) + "</span>" + "</li>");
    });


    el.innerHTML = "";

    if (ArrayOfSong.length > 0) {
        el.insertAdjacentHTML("afterbegin", ArrayOfSong.join(""))
    } else {
        el.insertAdjacentHTML("afterbegin", "<p class='-item-in-not-found'>Нечего не найдено!</p>")
    }

    return el;

}

var _FbHtmlGenerate = new FbHtmlGenerate();
