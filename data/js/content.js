function FbCreateMusicSong() {
    this.statusPlay = true;
}

FbCreateMusicSong.prototype = Object.create(FbXhrSendMessage.prototype);
FbCreateMusicSong.prototype.constructor = FbCreateMusicSong;


FbCreateMusicSong.prototype.audios = function() {
    if (!this.audioFbplayer) {
        this.audioFbplayer = new Audio();
    }
    return this.audioFbplayer;
}

FbCreateMusicSong.prototype.currentTimes = function(time) {

    if (time) {
        this.currentTimese = time;
    } else {
        return ((this.currentTimese) ? this.currentTimese : 0);
    }
}


FbCreateMusicSong.prototype.createMessagePopUpDialog = function(users, locations, newChat) {

    if (users) {
        var a = document.querySelector(".uiPopover._6a._6b");
        a.firstElementChild.click();
        var b = document.querySelector("._54ni._42ym._42yp.__MenuItem");
        b.click();

        var name;
        if (locations) {
            for (var i = locations.length - 1; i >= 0; i--) {
                if (locations[i].indexOf('usersIdFacebook') > -1) {
                    name = locations[i].split("=")[1];
                }
            };
        }

        a.parentNode.insertAdjacentHTML("beforeend", this.inShareSecurity(name));
    }

    if (newChat) {
        var a = document.getElementById("platform_dialog_content");
        a.insertAdjacentHTML("afterbegin", this.inDialogSecurity())
    }


    var sentTo = document.querySelectorAll("a[onmouseover]"),
        self = this;

    [].forEach.call(sentTo, replaceLinkToPlayerInDialogPopUp);


    function replaceLinkToPlayerInDialogPopUp(item, i) {


        if (item && item.getAttribute("onmouseover") && item.getAttribute("onmouseover").indexOf("fbmusic") > -1) {

            var arrtLink;

            if (document.getElementById('input_link')) {
                arrtLink = document.getElementById('input_link').value ? decodeURIComponent(document.getElementById('input_link').value) : null;
            } else {
                arrtLink = item.href ? decodeURIComponent(item.href) : null;
            }

            var splitLink = arrtLink ? arrtLink.split("http://fbmusic.ml/index.php?")[1] : null;

            if (splitLink) {

                var parentToLink = self.closest(item, ".unclickable");
                if (parentToLink && !parentToLink.getAttribute("data-replacment")) {
                    

                    for (var i = parentToLink.firstElementChild.children.length - 1; i >= 0; i--) {
                        parentToLink.firstElementChild.children[i].style.display = "none";
                    };

                    var div = self.generateOurPlayerInDialog(item, splitLink);
                    var plEl = document.createElement('div');
                    plEl.innerHTML = div;
                    parentToLink.firstElementChild.appendChild(plEl);
                    parentToLink.setAttribute('data-replacment', 1);
                }

            }

        }
    }
}



FbCreateMusicSong.prototype.genarateReplaceMessage = function(el) {

    var self = this;

    if (!el) {
        return;
    }

    var allChildDialog = el.querySelectorAll("a[href*='56ae578aaef07ef689675611007df4e0']");

    if (allChildDialog) {

        [].forEach.call(allChildDialog, createElement);

    }

    function createElement(item, i) {


        if (item && !item.getAttribute("data-replacment")) {


            var parent = item.parentNode;

            var plEl = self.toInspectedLinkAndGeneratePlayer(item, parent, self, "messagesToPage");


            item.style.display = "none";
            parent.appendChild(plEl);

            item.setAttribute('data-replacment', 1);

            self.createActionToPlay(parent, self);

        }

    }

}

FbCreateMusicSong.prototype.getReplace = function(el) {
    var self = this;

    var allChildDialog = el.querySelectorAll("a[href*='56ae578aaef07ef689675611007df4e0']");

    if (allChildDialog) {

        [].forEach.call(allChildDialog, createElement);

    }

    function createElement(item, i) {

        if (item && !item.getAttribute('data-processed-fbm')) {
            var parent = self.closest(item, "._5wd4");

            if (parent) {

                var plEl = self.toInspectedLinkAndGeneratePlayer(item, parent, self, "message");

                for (var c = 0; c < parent.children.length; c++) {
                    parent.children[c].style.display = 'none';
                }
                parent.appendChild(plEl);
                item.setAttribute('data-processed-fbm', 1);

                self.createActionToPlay(parent, self);

            }


        }

    }

}

FbCreateMusicSong.prototype.toInspectedLinkAndGeneratePlayer = function(item, parent, self, state) {


    var urlLink = decodeURIComponent(item.getAttribute("href")),
        splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/index.php?")[1],
        trueSplitLink;

    if (splitLink) {
        trueSplitLink = splitLink;
    } else {
        trueSplitLink = urlLink.split("http://fbmusic.ml/index.php?")[1];
    }

    var div = self.generateOurPlayerInDialog(item, trueSplitLink);

    var plEl = document.createElement('div');
    if (state == "message") {
        plEl.setAttribute('style', 'width:100%; margin: 20px 0; display: table; width: 100%; position: relative; list-style:none');
    } else {
        plEl.setAttribute('style', 'margin: 10px 0;display: table;width: 300px;');
    }

    plEl.innerHTML = div;


    return plEl;

}


FbCreateMusicSong.prototype.createActionToPlay = function(parent, self) {
    var play = parent.querySelector(".-item-play");

    if (play && !play.getAttribute("data-click")) {
        play.setAttribute("data-click", "click");
        play.addEventListener("click", function() {
            self.sendMessage(self);
        });
    }
}


FbCreateMusicSong.prototype.icoForDialog = function(el) {


    if (!el || el.querySelector(".-readys-to-closer")) {
        return;
    }


    var self = this;

    var textarea = el.querySelector("textarea"),
        style = "style='position: absolute; top: 35px; right: 22px;'";

    var template = self.createTemplate(style);


    el.insertAdjacentHTML("beforeend", template);


    self.eventAndAdjacent(el.lastElementChild, "alreadyCreate");





}

FbCreateMusicSong.prototype.getWindow = function(classie, clasieList) {

    var element = document.querySelector(classie);
    var elementList = document.querySelector(clasieList);
    var self = this;

    if (element && element.children && element.children.length > 0) {
        for (var i = 0, l = element.children.length; i < l; i++) {
            var _element_ = element.children[i].querySelector(".fbNubFlyoutFooter");

            var _elementMessage_ = element.children[i].querySelector(clasieList);

            if (_elementMessage_) {
                self.getReplace(_elementMessage_);
            }

            if (_element_ && !_element_.querySelector(".-item-fb-music-outer")) {
                self.eventAndAdjacent(_element_);
            }
        };
    }

    if (!document.querySelector("style[data-style]")) {
        document.body.insertAdjacentHTML("afterbegin", self.styleCreate());
    }

    if (!document.body.getAttribute("data-mousedown")) {
        document.body.addEventListener("click", function(event) {
            self.closePopUP(event, self)
        });
        document.body.setAttribute("data-mousedown", 1);
    }

}

FbCreateMusicSong.prototype.genarateReplaceWall = function(el) {

    if (!el) {
        return;
    }
    var self = this;
    var children = el.children;


    var elem = el.querySelectorAll("a[href*='56ae578aaef07ef689675611007df4e0']");

    [].forEach.call(elem, firstLavel);

    function firstLavel(item, i) {

        if (!item && item.getAttribute("data-mark")) {
            return;
        }

        if (self.closest(item, "._3m6-")) {
            item.setAttribute("data-mark", 1);
            var thisOurDialog = item.getAttribute('href');
            var parent = self.closest(item, "._3m6-");

            if (thisOurDialog && thisOurDialog != '' && !parent.getAttribute("data-inserting")) {
                parent.setAttribute("data-inserting", 1);
                listenerForPlayeng(parent, thisOurDialog);
            }
        }
    }

    function listenerForPlayeng(elementReplace, thisOurDialog) {
        var urlLink = decodeURIComponent(thisOurDialog),
            splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/index.php?")[1],
            options = "float: none !important; margin: 20px auto; width: 95% !important;";
        if (urlLink && urlLink != '' && elementReplace) {

            notMoreUndefinded(thisOurDialog, splitLink, options);

        }


        function notMoreUndefinded(thisOurDialog, splitLink, options) {
            var elementToCreate = self.generateOurPlayerInDialog(thisOurDialog, splitLink, options);
            if (elementToCreate) {
                elementReplace.innerHTML = "";
                elementReplace.insertAdjacentHTML("afterbegin", elementToCreate);

                var play = elementReplace.querySelector(".-item-play");

                if (play && !play.getAttribute("data-click")) {
                    play.setAttribute("data-click", "click");
                    play.addEventListener("click", function() {
                        self.sendMessage(self);
                    });
                }
            } else {
                setTimeout(function(){notMoreUndefinded(thisOurDialog, splitLink, options)},100);
            }
        }

    }


}


FbCreateMusicSong.prototype.eventAndAdjacent = function(elem, status) {
    var self = this;

    if (!status) {
        elem.lastElementChild.insertAdjacentHTML("afterbegin", self.createTemplate());
    }
    elem.querySelector(".-item-search-ico").addEventListener("click", function() {
        self.eventToSearch(self);
    })
    elem.querySelector(".-item-music-search").addEventListener("keydown", function() {
        self.eventToSearch(self);
    })
}


FbCreateMusicSong.prototype.observer = function() {
    var self = this;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            if (mutation.type == "childList") {
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains("fbNub")) {
                    var panel = mutation.addedNodes[0].querySelector(".fbNubFlyoutFooter");
                    if (panel && !panel.querySelector(".-item-fb-music-outer")) {
                        self.eventAndAdjacent(panel);
                    }
                }
                if (mutation.addedNodes[0]) {
                    var element = self.closest(mutation.addedNodes[0], ".conversation");
                    var elmentToMessages = document.querySelector(".uiList._2ne._4kg");
                    var elmentWallIco = document.getElementById("timeline_composer_container") ? document.getElementById("timeline_composer_container") : document.getElementById("pagelet_composer");
                    var icoForDialog = document.querySelector("._2pt");
                    if (element) {
                        self.getReplace(element);
                    }
                    if (elmentToMessages) {
                        self.genarateReplaceMessage(elmentToMessages);
                    }
                    if (elmentWallIco) {
                        self.genarateIconInWall(elmentWallIco);
                    }
                    if (icoForDialog) {
                        self.icoForDialog(icoForDialog);
                    }
                }
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains("_5pcb")) {
                    var elmentWall;
                    if (mutation.addedNodes[0].parentNode.id == "stream_pagelet") {
                        elmentWall = document.querySelector("._5pcb");
                    } else {
                        elmentWall = document.querySelector("._2t4u");
                    }
                    self.genarateReplaceWall(elmentWall);
                }
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains("_4-u2")) {
                    var elmentWall = document.querySelector("._5pcb");
                    self.genarateReplaceWall(elmentWall);
                }


            }
        });
    });


    var config = {
        childList: true,
        subtree: true
    }

    observer.observe(document.body, config);
}


FbCreateMusicSong.prototype.eventToSearch = function(self) {

    self.trackEvent('song', 'search');

    // if (event.target.parentNode.nextElementSibling.querySelector(".-now-plaing-fb-music")) {
    //     self.stopMusic();
    // }

    var target = event.target,
        input;

    if (event.keyCode == 13) {
        var url = "https://music.yandex.ru/handlers/music-search.jsx?text=" + target.value + "&type=all";
        input = target;
    } else if (event.type == "click") {
        var url = "https://music.yandex.ru/handlers/music-search.jsx?text=" + target.nextElementSibling.value + "&type=all";
        input = target.nextElementSibling;
    } else {
        return;
    }

    input.setAttribute("disabled", "disabled");

    var elementOfPreload = target.parentNode.nextElementSibling.querySelector(".-item-of-array-list");
    elementOfPreload.innerHTML = "";
    elementOfPreload.insertAdjacentHTML("afterbegin", self.preloaderCreate())

    self.makeRequest(url, function(data) {

        try {
            JSON.parse(data);
            var elementForListener = self.generateList(JSON.parse(data), elementOfPreload, self);
            input.removeAttribute("disabled");
            var children = elementForListener.children;
            for (var i = children.length - 1; i >= 0; i--) {
                children[i].addEventListener("click", function() {
                    self.sendMessage(self);
                });
            };
        } catch (e) {
            self.parseCapcha(data, elementOfPreload);
        }

    });

}

FbCreateMusicSong.prototype.createYandexCapcha = function(elementOfPreload, form) {

    elementOfPreload.insertAdjacentHTML("afterbegin", "<p class='-in-yandex-capcha'>Нам очень жаль, но запросы, поступившие с вашего IP-адреса, похожи на автоматические. По этой причине мы вынуждены временно заблокировать доступ к поиску. <br /> Чтобы продолжить поиск, пожалуйста, введите символы с картинки в поле ввода и нажмите 'Отправить'.</p>")
    elementOfPreload.appendChild(form);
}



FbCreateMusicSong.prototype.parseCapcha = function(data, elementOfPreload) {
    var self = this;
    captcha = data.indexOf("captcha") > -1 ? true : false,
        hidden = document.createElement("div");
    hidden.insertAdjacentHTML("afterbegin", data);
    var form = hidden.querySelector(".form__inner");
    form.querySelector("button[type='submit']").addEventListener("click", function(event) {
        self.checkCaptcha(event, this, self, elementOfPreload)
    }, false);
    if (captcha) {
        elementOfPreload.innerHTML = "";
        self.createYandexCapcha(elementOfPreload, form);
    }
}

FbCreateMusicSong.prototype.checkCaptcha = function(event, button, self, elementOfPreload) {
    event.preventDefault();

    var urls = button.parentNode.retpath.value,
        urlDomain;

    if (urls.indexOf("yandex.ru") > -1) {
        urlDomain = "yandex.ru";
    } else {
        urlDomain = "yandex.ua";
    }



    var url = "https://music." + urlDomain + "/checkcaptcha?key=" + encodeURIComponent(button.parentNode.key.value) + "&retpath=" + encodeURIComponent(button.parentNode.retpath.value) + "&rep=" + encodeURIComponent(button.parentNode.rep.value);


    self.makeRequest(url, function(data) {

        try {
            JSON.parse(data);
            elementOfPreload.parentNode.previousElementSibling.firstElementChild.click();
        } catch (e) {
            self.parseCapcha(data, elementOfPreload);
        }

    });

}


FbCreateMusicSong.prototype.sendMessage = function(self) {


    if (event.target.classList.contains("-item-play")) {
        self.playMusic(event.target)
    }


    if (!event.target.classList.contains("-item-send-song")) {
        return;
    }

    var target = event.target,
        targetParent = target.parentNode,
        songId = target.getAttribute("data-song"),
        songName = target.getAttribute("data-name-song"),
        artistName = target.getAttribute("data-name-artist"),
        duration = target.getAttribute("data-duration"),
        albumId = target.getAttribute("data-album"),
        coverImage = target.getAttribute("data-cover-url-img"),
        outerDialogs = self.closest(target, ".fbNubFlyoutInner"),
        linkChat = outerDialogs ? outerDialogs.querySelector(".titlebarText") : null,
        hrefs = linkChat ? linkChat.href : null,
        link = "http://fbmusic.ml/index.php?track=" + songId + "&albumId=" + albumId + "&name=" + encodeURIComponent(songName.replace("&", "")) + "&artist=" + encodeURIComponent(artistName.replace("&", "")) + "&duraion=" + duration + "&hash=56ae578aaef07ef689675611007df4e0";


    target.classList.remove("-item-send-song");
    target.classList.add("-item-loader-song");

    self.stopMusic();


    if (targetParent.parentNode.classList.contains("-wall-ul")) {

        var a = location.pathname + location.search,
            id;
        if (a.indexOf("profile") > -1) {
            id = parseInt(a.split("/profile.php?id=")[1]);
        } else if (a !== "/") {
            id = a.split("?")[0].slice(1);
        } else {
            id = null;
        }

        var closestWall = self.closest(target, ".-item-fb-music-drop-down-wall");

        toSendMessageAndName("post");

        return;
    }


    var closeElement = self.closest(target, ".-item-fb-music-drop-down"),
        elements = self.closest(target, ".fbNubFlyoutInner"),
        hrefs = elements ? elements.querySelector(".titlebarText").href : document.getElementById("webMessengerHeaderName") ? location.pathname + location.search : null,
        receiverUrl;


    if (hrefs.indexOf("?") == -1) {
        receiverUrl = hrefs;
        if (hrefs.indexOf("messages") > -1) {
            receiverUrl = isNaN(parseInt(hrefs.replace("/messages/", ""))) ? hrefs.replace("/messages/", "") : parseInt(hrefs.replace("/messages/", ""));
        }
    } else {
        var id = hrefs.split('?id=')[1];
        if (id) {
            receiverUrl = parseInt(id);
        }
    }

    toSendMessageAndName();


    function toSendMessageAndName(statusWhere) {

        var rc = new XMLHttpRequest();

        rc.onreadystatechange = function() {
            if (4 == rc.readyState && 200 == rc.status) {

                var div = document.createElement("div");


                div.insertAdjacentHTML("afterbegin", rc.responseText);
                var title = div.querySelector("#pageTitle");
                if (!id) {
                    id = div.querySelector("meta[property='al:android:url']").getAttribute("content");
                    id = id.replace("fb://profile/", "")
                }

                if (statusWhere == "post") {
                    self.postAdd(id, link, "https://" + coverImage, "", title.innerHTML + " has posted a song", "Listen to it now!", target, closestWall);
                } else {
                    if (hrefs.indexOf("conversation") > -1 || hrefs.indexOf("new") > -1) {
                        var s = document.querySelector(".tokenarea"),
                            val;
                        if(s && s.children.length == 1 && hrefs.indexOf("new") > -1){
                           var name = s.firstElementChild.querySelector("input[name='participants[]']");
                           var val = name.getAttribute("value"); 
                        }
                        var thread_fbid = hrefs.split('-')[1] ? hrefs.split('-')[1] : null;
                        self.groupPreSend(thread_fbid, link, "fbmusic.ml", "", "https://" + coverImage, title.innerHTML + " has sent you a song", "Listen to it now!", target, closeElement, val)
                    } else {
                        if (linkChat && linkChat.classList && linkChat.classList.contains("noLink")) {
                            receiverUrl = "/"
                        }
                        self.FBSendAttachment(receiverUrl, link, "fbmusic.ml", "", "https://" + coverImage, title.innerHTML + " has sent you a song", "Listen to it now!", target, closeElement);
                    }
                }

            }
        }

        rc.open("GET", "/profile.php", true);
        rc.send(null);

    }

}

FbCreateMusicSong.prototype.playMusic = function(el) {

    var musicPause = this.pauseMusic(el),
        plays;

    if (musicPause) {
        this.trackEvent('song', 'pause');
        return;
    }

    var musicStop = this.stopMusic(el);

    if (musicStop) {
        this.trackEvent('song', 'stop');
        return;
    }

    if (el.classList.contains("-item-paused")) {
        this.trackEvent('song', 'unpause');
        this.playAudio(null, el, "paused", "-item-paused");
        return;
    }

    if (!this.statusPlay) {
        return;
    }

    this.statusPlay = false;

    event.target.classList.add("-item-loader-song");

    this.trackEvent('song', 'play');

    var self = this,
        albumId = el.getAttribute("data-album-id"),
        songId = el.getAttribute("data-id-song"),
        url = "https://music.yandex.ru/api/v2.0/handlers/track/" + songId + ":" + albumId + "/download";



    self.makeRequest(url, function(data) {
        var getMp3 = JSON.parse(data).src + "&format=json";
        self.makeRequest(getMp3, function(data) {
            var links = JSON.parse(data);
            var key = self.md5("XGRlBW9FXlekgbPrRHuSiA" + links.path.slice(1) + links.s);
            responseLink = "https://" + links.host + "/get-mp3/" + key + "/" + links.ts + links.path + "?track-id=" + songId + "&play=false";
            el.classList.add("-now-plaing-fb-music");
            el.classList.remove("-item-loader-song");
            self.playAudio(responseLink, el);
            self.statusPlay = true;
        });
    });
}

FbCreateMusicSong.prototype.pauseMusic = function(el) {


    if (document.querySelectorAll(".-now-plaing-fb-music").length < 1 && document.querySelectorAll(".-item-paused").length < 1 && el.parentNode.parentNode.id == "status-plaing") {
        el.classList.add("-now-plaing-fb-music");
    }


    if (el.classList.contains("-now-plaing-fb-music")) {

        el.classList.remove("-now-plaing-fb-music");
        el.classList.add("-item-paused");

        var backPlayer = el.getAttribute("data-id"),
            elementBack = document.getElementById(backPlayer) ? document.getElementById(backPlayer) : null;

        if (elementBack) {
            elementBack.classList.remove("-now-plaing-fb-music");
            elementBack.classList.add("-item-paused");
        }


        var audio = this.audios();
        this.currentTimes(audio.currentTime);
        audio.pause();
        return true;

    }

}

FbCreateMusicSong.prototype.stopMusic = function(el) {

    if (document.querySelector("#status-plaing")) {
        document.querySelector("#status-plaing").innerHTML = "";
    }

    var tryClass = document.querySelector(".-now-plaing-fb-music"),
        durationTime = document.querySelector(".-to-playeng-now"),
        playngIco = (durationTime) ? durationTime.parentNode.firstElementChild.getAttribute("data-duration-time-true") : null,
        progressBar = document.querySelectorAll("#-item-audio-duration"),
        audio = this.audios();
    audio.pause();
    audio.currentTime = 0;


    if ((progressBar && !el) || (progressBar && !el.classList.contains("-item-paused"))) {
        console.log("this stop")
        for (var i = progressBar.length - 1; i >= 0; i--) {
            progressBar[i].parentNode.removeChild(progressBar[i]);
        };

        if (playngIco) {
            durationTime.classList.remove("-to-playeng-now");
            durationTime.innerHTML = playngIco;
        }
    }

    if (tryClass && el) {
        tryClass.classList.remove("-now-plaing-fb-music");
        return false;
    } else if (tryClass && !el) {
        tryClass.classList.remove("-now-plaing-fb-music");
        return true;
    } else if (!tryClass && el) {
        return false;
    } else {
        return true;
    }



}

FbCreateMusicSong.prototype.playAudio = function(src, el, playing, classie) {

    var self = this,
        audio = this.audios();


    if (playing) {
        this.audios().currentTime = this.currentTimes();
        this.audios().play();
        el.classList.add("-now-plaing-fb-music");
        el.classList.remove(classie);
        playindPrivate();
        return;
    }

    playindPrivate();

    audio.src = src;
    audio.play();

    var elementDuration = document.createElement("span"),
        progress = document.createElement("mark"),
        elementFullDuration = ((parseFloat(el.getAttribute("data-duration")) / 1000)).toFixed(2);
    elementDuration.id = "-item-audio-duration";
    progress.classList.add("-item-progress-to-play");
    elementDuration.appendChild(progress);

    el.parentNode.appendChild(elementDuration);

    var widthElement = parseInt(window.getComputedStyle(elementDuration).getPropertyValue("width"));


    var timePrograss = el.parentNode.querySelector(".-item-duration-to-play");
    timePrograss.classList.add("-to-playeng-now");



    function playindPrivate() {

        if (!document.querySelector("#status-plaing")) {
            document.body.insertAdjacentHTML('afterbegin', "<div id='status-plaing'></div>");
        } else {
            document.querySelector("#status-plaing").innerHTML = "";
        }

        var playengBackground = document.querySelector("#status-plaing");

        var parentAttr = el.getAttribute("data-full-link"),
            parent = document.createElement("div");
        playerBack = self.generateOurPlayerInDialog(el, parentAttr);
        closeBackgroundPlayer = document.createElement("span");
        parent.insertAdjacentHTML("afterbegin", playerBack);
        parentDuration = parent.querySelector("#-item-audio-duration");
        closeBackgroundPlayer.classList.add("-close-to-action-player");
        parent.appendChild(closeBackgroundPlayer);
        (parentDuration) ? parentDuration.parentNode.removeChild(parentDuration): "";

        playengBackground.appendChild(parent);
        closeBackgroundPlayer.addEventListener("click", function() {
            self.stopMusic(el)
        });



        var playToBack = parent.querySelector(".-item-play");
        var dataId = el.getAttribute("data-id");
        playToBack.id = dataId;


        playToBack.classList.add("-now-plaing-fb-music");

        playengBackground.querySelector('.-item-play').addEventListener("click", function() {

            var elGeneral = document.querySelector("i[data-id='" + playToBack.id + "']");

            if (!elGeneral) {
                elGeneral = playengBackground.querySelector('.-item-play');
            }

            self.playMusic(elGeneral);
        });


        audio.addEventListener("timeupdate", timeUpdate.bind(this, el, self), false);

    }

    function timeUpdate(event) {
        var duration = el.parentNode.querySelector('.-item-progress-to-play'),
            dataElement = document.getElementById(el.getAttribute("data-id")),
            durationBackground = (dataElement) ? dataElement.parentNode.querySelector(".-item-duration-to-play") : "",
            s = Number((audio.currentTime).toFixed(2)),
            currents = parseFloat(arguments[0].getAttribute("data-duration") / 1000) - parseFloat(audio.currentTime),
            playingTime = arguments[1].formatTime(currents);
        if (duration) {
            if (timePrograss && timePrograss.classList && timePrograss.classList.contains("-to-playeng-now")) {
                if (playingTime == "00:00") {
                    self.stopMusic();
                    return;
                }
                timePrograss.innerHTML = playingTime;
                durationBackground.innerHTML = playingTime;
            }
            duration.style.width = (s * 100) / elementFullDuration + "%";
        } else {
            durationBackground.innerHTML = playingTime;
        }
    }


    elementDuration.addEventListener("click", function() {
        var clicked = (event.offsetX * 100) / widthElement;
        var crtTime = elementFullDuration * (clicked / 100);
        self.currentTimes(crtTime);
        audio.currentTime = self.currentTimes();

    })

}


FbCreateMusicSong.prototype.closePopUP = function(event, self) {

    var target = event.target;
    var targetToClick = (target.parentNode && target.parentNode.nextElementSibling) ? target.parentNode.nextElementSibling : null;
    var closestEl = self.closest(target, ".-readys-to-closer");
    var classiePopUp = "-active-fb-pop-up";


    if (closestEl && closestEl.classList && closestEl.classList.contains("-readys-to-closer") && closestEl.querySelector(".-active-fb-pop-up") && !target.parentNode.classList.contains("-item-for-ico-no-style")) {
        return;
    } else if (targetToClick && targetToClick.classList && targetToClick.classList.contains(classiePopUp)) {
        targetToClick.classList.remove(classiePopUp)
    } else if (targetToClick && targetToClick.classList && !targetToClick.classList.contains(classiePopUp) && target.parentNode.classList.contains("-item-for-ico-no-style")) {
        if (document.querySelector(".-active-fb-pop-up")) {
            document.querySelector(".-active-fb-pop-up").classList.remove("-active-fb-pop-up");
        }
        targetToClick.classList.add(classiePopUp);
    } else {
        if (document.querySelector(".-active-fb-pop-up")) {
            document.querySelector(".-active-fb-pop-up").classList.remove("-active-fb-pop-up");
        }
    }

}


FbCreateMusicSong.prototype.genarateIconInWall = function(el) {
    if (!el || el.querySelector(".-readys-to-closer")) {
        return;
    }

    var self = this;

    if (!document.querySelector("style[data-style]")) {
        document.body.insertAdjacentHTML("afterbegin", self.styleCreate());
    }

    var child = (el.querySelector("._ohe.lfloat") && el.id != "pagelet_composer") ? el.querySelector("._ohe.lfloat").firstElementChild : el.querySelector("ul");

    if (child) {
        if (child.nodeName == "UL") {
            template = this.templateForIco("li");
        } else {
            template = this.templateForIco();
        }
    } else {
        return;
    }


    child.insertAdjacentHTML("beforeend", template);

    self.eventAndAdjacent(child.lastElementChild, "alreadyCreate");

}


if (window.self === window.top) {
    document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
            tryElement();
        }
    }
}



function tryElement() {

    var element = document.querySelector(".videoCallEnabled");
    var elementList = document.querySelector(".conversation");
    var elmentWallIco = document.getElementById("timeline_composer_container") ? document.getElementById("timeline_composer_container") : document.getElementById("pagelet_composer");
    var elmentWall = (document.querySelector("._2t4u")) ? document.querySelector("._2t4u") : document.querySelector("._5pcb") ? document.querySelector("._5pcb") : document.querySelector(".userContentWrapper") ? document.querySelector(".userContentWrapper") : "";
    var elmentToMessages = document.querySelector(".uiList._2ne._4kg");
    var icoForDialog = document.querySelector("._2pt");
    var sendMessageWindow = document.getElementById("targeted_privacy_data_container") ? document.getElementById("targeted_privacy_data_container") : document.getElementById("platformDialogForm");


    if ((element && elementList) || (elmentWallIco && elmentWall) || elmentWall || elmentToMessages || icoForDialog || sendMessageWindow) {
        var _fbMusic_ = new FbCreateMusicSong();
        _fbMusic_.getWindow(".videoCallEnabled", ".conversation");
        _fbMusic_.genarateIconInWall(elmentWallIco);
        _fbMusic_.genarateReplaceWall(elmentWall);
        _fbMusic_.genarateReplaceMessage(elmentToMessages);
        _fbMusic_.icoForDialog(icoForDialog);
        _fbMusic_.observer();
        _fbMusic_.createPopUp();

        if (location.href.indexOf("facebook.com/dialog/send") > -1) {
            var newChat = false;
            if (location.href.indexOf("tryToNewChat") > -1) {
                newChat = true;
            }
            _fbMusic_.createMessagePopUpDialog(null, null, newChat);
        }

        if (location.href.indexOf("facebook.com/dialog/share") > -1) {
            var users = false,
                locations;
            if (location.href.indexOf("usersIdFacebook") > -1) {
                locations = location.search.split("&");
                users = true;
            }
            _fbMusic_.createMessagePopUpDialog(users, locations, null);
        }

    } else {
        setTimeout(tryElement, 100);
    }
}
