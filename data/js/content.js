function FbCreateMusicSong() {}

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


FbCreateMusicSong.prototype.getReplace = function(el) {
    var self = this;

    var allChildDialog = el.querySelectorAll("a[href*='fbmusic']");

    //console.log(allChildDialog);

    if (allChildDialog) {

        [].forEach.call(allChildDialog, createElement);

    }

    function createElement(item, i) {

        if (item && !item.getAttribute('data-processed-fbm')) {
            var parent = self.closest(item, "._5wd4");

            //console.log(parent);

            if (parent) {
                var urlLink = decodeURIComponent(item.getAttribute("href")),
                    splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/index.php?")[1],
                    trueSplitLink;

                if (splitLink) {
                    trueSplitLink = splitLink;
                } else {
                    trueSplitLink = urlLink.split("http://fbmusic.ml/index.php?")[1];
                }

                var div = self.generateOurPlayerInDialog(allChildDialog[i], trueSplitLink);

                var plEl = document.createElement('div');
                plEl.setAttribute('style', 'width:100%; margin: 20px 0; display: table; width: 100%; position: relative; list-style:none');
                plEl.innerHTML = div;


                for (var c = 0; c < parent.children.length; c++) {
                    parent.children[c].style.display = 'none';
                }
                parent.appendChild(plEl);
                item.setAttribute('data-processed-fbm', 1);

                var play = parent.querySelector(".-item-play");

                if (play && !play.getAttribute("data-click")) {
                    play.setAttribute("data-click", "click");
                    play.addEventListener("click", function() {
                        self.sendMessage(self);
                    });
                }

            }


        }

    }




    // for (var i = 0, l = allChildDialog.length; i < l; i++) {
    //     var thisOurDialog = allChildDialog[i].querySelector("a[href*='fbmusic']");

    //     if (thisOurDialog && !allChildDialog[i].getAttribute('data-processed-fbm')) {

    //         var urlLink = decodeURIComponent(thisOurDialog.getAttribute("href")),
    //             splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/index.php?")[1],
    //             trueSplitLink;

    //         if (splitLink) {
    //             trueSplitLink = splitLink;
    //         } else {
    //             trueSplitLink = urlLink.split("http://fbmusic.ml/index.php?")[1];
    //         }


    //         var div = self.generateOurPlayerInDialog(allChildDialog[i], trueSplitLink);

    //         var plEl = document.createElement('div');
    //         plEl.setAttribute('style', 'width:100%; margin: 20px 0; display: table; width: 100%; position: relative; list-style:none');
    //         plEl.innerHTML = div;

    //         for (var c = 0; c < allChildDialog[i].children.length; c++) {
    //             allChildDialog[i].children[c].style.display = 'none';
    //         }
    //         allChildDialog[i].appendChild(plEl);
    //         allChildDialog[i].setAttribute('data-processed-fbm', 1);

    //         var play = allChildDialog[i].querySelector(".-item-play");

    //         if (play && !play.getAttribute("data-click")) {
    //             play.setAttribute("data-click", "click");
    //             play.addEventListener("click", function() {
    //                 self.sendMessage(self);
    //             });
    //         }
    //     }
    // };

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
        document.body.addEventListener("mousedown", function(event) {
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


    [].forEach.call(children, firstLavel);


    function firstLavel(item, i) {
        if (item.children.length > 0) {
            var childPost = item.children;
            [].forEach.call(childPost, twoLewel);
        }
    }


    function twoLewel(item, i) {

        if (item.querySelector("._5jmm")) {

            var parent = item.querySelector("._5jmm").parentNode,
                childrens = parent.children;

            [].forEach.call(childrens, thirdLewel);

        }

        var elemOnOuter = item.querySelector("._3x-2");

        if (elemOnOuter) {

            var thisOurDialog = elemOnOuter.querySelector("a[href*='fbmusic']");
            if (thisOurDialog && !elemOnOuter.getAttribute("data-pasted")) {
                elemOnOuter.setAttribute("data-pasted", 1);
                listenerForPlayeng(elemOnOuter, thisOurDialog)
            }
        }

    }


    function thirdLewel(item, i) {

        var thisOurDialog = item.querySelector("a[href*='fbmusic']");
        if (thisOurDialog && !item.getAttribute("data-inserting")) {
            item.setAttribute("data-inserting", 1);
            var elementReplace = item.querySelector("._3x-2");
            if (elementReplace) {
                listenerForPlayeng(elementReplace, thisOurDialog)
            }

        }
    }


    function listenerForPlayeng(elementReplace, thisOurDialog) {

        elementReplace.firstElementChild.style.display = "none";
        var urlLink = decodeURIComponent(thisOurDialog.getAttribute("href")),
            splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/index.php?")[1],
            options = "float: none !important; margin: 20px 0;"
        elementReplace.insertAdjacentHTML("afterbegin", self.generateOurPlayerInDialog(thisOurDialog, splitLink, options));

        var play = elementReplace.querySelector(".-item-play");

        if (play && !play.getAttribute("data-click")) {
            play.setAttribute("data-click", "click");
            play.addEventListener("click", function() {
                self.sendMessage(self);
            });
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
    elem.querySelector(".-item-for-ico-no-style").addEventListener("click", self.openPopUP);
}


FbCreateMusicSong.prototype.observer = function() {
    var self = this;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "childList") {
                //console.log(mutation.addedNodes[0])
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains("fbNub")) {
                    var panel = mutation.addedNodes[0].querySelector(".fbNubFlyoutFooter");
                    if (panel && !panel.querySelector(".-item-fb-music-outer")) {
                        self.eventAndAdjacent(panel);
                        self.getReplace(mutation.addedNodes[0].querySelector(".conversation"));
                    }
                }
                if (mutation.addedNodes[0]) {
                    //console.log("this___________");
                    var element = self.closest(mutation.addedNodes[0], ".conversation");
                    if (element) {
                        self.getReplace(element);
                    }
                }
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains("_4tdt")) {
                    self.getReplace(mutation.addedNodes[0].parentNode);
                }
                if (!document.querySelector(".-item-fb-music-wall")) {
                    var element = document.getElementById("timeline_composer_container");
                    self.genarateIconInWall(element);
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

    self.stopMusic();

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
            elementForListener.addEventListener("click", function() {
                self.sendMessage(self);
            })
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
        linkChat = outerDialogs.querySelector(".titlebarText"),
        hrefs = linkChat.href ? linkChat.href : null,
        link = "http://fbmusic.ml/index.php?track=" + songId + "&albumId=" + albumId + "&name=" + encodeURIComponent(songName) + "&artist=" + encodeURIComponent(artistName) + "&duraion=" + duration;


    target.classList.remove("-item-send-song");
    target.classList.add("-item-loader-song");

    self.stopMusic();


    if (targetParent.parentNode.classList.contains("-wall-ul")) {

        var a = location.pathname + location.search,
            id;
        if (a.indexOf("profile") > -1) {
            id = parseInt(a.split("/profile.php?id=")[1]);
        } else {
            id = a.split("?")[0].slice(1);
        }

        toSendMessageAndName("post");

        return;
    }


    var closeElement = self.closest(target, ".-item-fb-music-drop-down"),
        elements = self.closest(target, ".fbNubFlyoutInner"),
        hrefs = elements.querySelector(".titlebarText").href,
        receiverUrl;

    if (hrefs.indexOf("?") == -1) {
        receiverUrl = hrefs;
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
                if (statusWhere == "post") {
                    self.postAdd(id, link, "https://" + coverImage, "", title.innerHTML + " has posted a song", "Listen to it now!", target);
                } else {
                    if (hrefs.indexOf("conversation") > -1) {
                        var thread_fbid = hrefs.split('-')[1];
                        self.groupPreSend(thread_fbid, link, "fbmusic.ml", "", "https://" + coverImage, title.innerHTML + " has sent you a song", "Listen to it now!", target, closeElement)
                    } else {
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

    var musicPause = this.pauseMusic(el);

    if (musicPause) {
        return;
    }

    var musicStop = this.stopMusic(el);

    if (musicStop) {
        return;
    }

    if (el.classList.contains("-item-paused")) {
        this.playAudio(null, el, "paused", "-item-paused");
        return;
    }

    var self = this,
        albumId = el.getAttribute("data-album-id"),
        songId = el.getAttribute("data-id-song"),
        url = "https://music.yandex.ru/api/v2.0/handlers/track/" + songId + ":" + albumId + "/download";
    el.classList.add("-now-plaing-fb-music");


    self.makeRequest(url, function(data) {
        var getMp3 = JSON.parse(data).src + "&format=json";
        self.makeRequest(getMp3, function(data) {
            var links = JSON.parse(data);
            var key = self.md5("XGRlBW9FXlekgbPrRHuSiA" + links.path.slice(1) + links.s);
            responseLink = "https://" + links.host + "/get-mp3/" + key + "/" + links.ts + links.path + "?track-id=" + songId + "&play=false";
            self.playAudio(responseLink, el);
        });
    });
}

FbCreateMusicSong.prototype.pauseMusic = function(el) {

    if (el.classList.contains("-now-plaing-fb-music")) {
        el.classList.remove("-now-plaing-fb-music");
        el.classList.add("-item-paused");
        var audio = this.audios();
        this.currentTimes(audio.currentTime);
        audio.pause();
        return true;

    }

}

FbCreateMusicSong.prototype.stopMusic = function(el) {

    var tryClass = document.querySelector(".-now-plaing-fb-music"),
        durationTime = document.querySelector(".-to-playeng-now"),
        playngIco = (durationTime) ? durationTime.parentNode.firstElementChild.getAttribute("data-duration-time-true") : null,
        progressBar = document.getElementById("-item-audio-duration"),
        audio = this.audios();
    audio.pause();
    audio.currentTime = 0;

    if ((progressBar && !el) || (progressBar && !el.classList.contains("-item-paused"))) {
        progressBar.parentNode.removeChild(progressBar);

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

    var self = this;

    if (playing) {
        this.audios().currentTime = this.currentTimes();
        this.audios().play();
        el.classList.add("-now-plaing-fb-music");
        el.classList.remove(classie);
        return;
    }

    var audio = this.audios();

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

    audio.addEventListener("timeupdate", timeUpdate.bind(this, el, self), false);


    function timeUpdate(event) {
        var duration = document.querySelector('.-item-progress-to-play'),
            s = Number((audio.currentTime).toFixed(2)),
            currents = parseFloat(arguments[0].getAttribute("data-duration") / 1000) - parseFloat(audio.currentTime),
            playingTime = arguments[1].formatTime(currents);
        if (duration) {
            if (timePrograss.classList.contains("-to-playeng-now")) {
                if (playingTime == "00:00") {
                    self.stopMusic();
                    return;
                }
                timePrograss.innerHTML = playingTime;
            }
            duration.style.width = (s * 100) / elementFullDuration + "%";
        }
    }


    elementDuration.addEventListener("click", function() {
        var clicked = (event.offsetX * 100) / widthElement;
        var crtTime = elementFullDuration * (clicked / 100);
        self.currentTimes(crtTime);
        audio.currentTime = self.currentTimes();

    })

}


FbCreateMusicSong.prototype.openPopUP = function() {

    var classiePopUp = "-active-fb-pop-up";

    if (this.nextElementSibling.classList.contains(classiePopUp)) {
        this.nextElementSibling.classList.remove(classiePopUp)
    } else {
        this.nextElementSibling.classList.add(classiePopUp)
    }

}



FbCreateMusicSong.prototype.closePopUP = function(event, self) {
    var target = event.target;
    var closestEl = self.closest(target, ".-readys-to-closer");

    if (target.classList.contains("close")) {
        var closeEl = self.closest(target, ".fbNubFlyoutOuter");
        if (closeEl && closeEl.querySelector(".-now-plaing-fb-music")) {
            self.stopMusic();
        }
    }


    if (!closestEl) {
        var activeEl = document.querySelector(".-active-fb-pop-up");
        if (activeEl) {
            activeEl.classList.remove("-active-fb-pop-up");
            self.stopMusic();
        }
    }

}


FbCreateMusicSong.prototype.genarateIconInWall = function(el) {

    var self = this;

    if (!document.querySelector("style[data-style]")) {
        document.body.insertAdjacentHTML("afterbegin", self.styleCreate());
    }

    if (!el) {
        return;
    }

    var child = el.querySelector("._ohe.lfloat");

    if (child && child.firstElementChild) {
        template = this.templateForIco();
    } else {
        return;
    }

    child.firstElementChild.insertAdjacentHTML("beforeend", template);

    self.eventAndAdjacent(child.firstElementChild.lastElementChild, "alreadyCreate");

}


if (window.self === window.top) {
    document.onreadystatechange = function() {
        if (document.readyState == 'complete')
            tryElement();
    }
}



function tryElement() {




    var element = document.querySelector(".videoCallEnabled");
    var elementList = document.querySelector(".conversation");
    var elmentWallIco = document.getElementById("timeline_composer_container") ? document.getElementById("timeline_composer_container") : document.getElementById("pagelet_composer");
    var elmentWall = (document.querySelector("._2t4u")) ? document.querySelector("._2t4u") : document.querySelector("._5pcb") ? document.querySelector("._5pcb") : document.querySelector(".userContentWrapper") ? document.querySelector(".userContentWrapper") : "";

    if ((element && elementList) || (elmentWallIco && elmentWall) || elmentWall) {
        var _fbMusic_ = new FbCreateMusicSong();
        _fbMusic_.getWindow(".videoCallEnabled", ".conversation");
        _fbMusic_.genarateIconInWall(elmentWallIco);
        _fbMusic_.genarateReplaceWall(elmentWall);
        _fbMusic_.observer();
        _fbMusic_.createPopUp();
    } else {
        setTimeout(tryElement, 100);
    }
}
