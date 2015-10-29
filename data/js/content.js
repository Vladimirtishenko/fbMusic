/*

// Main Class
    
*/
function FbCreateMusicSong() {
    this.hash = "56ae54378aaef07ef689675611007df4e0";
    this.xhrStatus = true;
    this.statusPlay = true;
    this.domains = "fbmusic.xyz";
    this.asynkLocalStorage = true;
    this.asynkLocalStorageMessagePage = true;
}


/*

// Main Inheritance
    
*/

FbCreateMusicSong.prototype = Object.create(FbSendMusic.prototype);
FbCreateMusicSong.prototype.constructor = FbCreateMusicSong;

/*

// Generate Block for Top Music
    
*/

FbCreateMusicSong.prototype.generateTopMusic = function(el) {

    if (!el || el.parentNode.querySelector(".-outer-list-of-top") || !this.xhrStatus) {
        return;
    }

    var url = 'http://' + this.domains + '/top/get.php',
        self = this;

    self.xhrStatus = false;

    self.makeRequest(url, "GET", null, function(data) {

        var datas = JSON.parse(data),
            element = self.generateToTop(datas, self);

        el.parentNode.insertAdjacentHTML("afterbegin", element);

        var ulList = el.parentNode.querySelector(".-outer-list-of-top").children;

        for (var i = ulList.length - 1; i >= 0; i--) {
            ulList[i].addEventListener("click", function() {
                self.sendMessage(self);
            });
        };

        window.scroll(0, 10);
        window.scroll(0, 0);

        self.xhrStatus = true;

    });


}


/*

// Constract Icon To Wall and General Page
    
*/

FbCreateMusicSong.prototype.genarateIconInWall = function(el) {

    if (!el || el.querySelector(".-readys-to-closer")) {
        return;
    }

    var self = this;

    if (!document.querySelector("style[data-style]")) {
        document.body.insertAdjacentHTML("afterbegin", self.styleCreate());
    }

    var child = (el.querySelector("._ohe.lfloat") && el.id != "pagelet_composer") ? el.querySelector("._ohe.lfloat").firstElementChild : el.querySelector("ul");

    if (child && self.asynkLocalStorage) {
        self.asynkLocalStorage = false
        self.getLsParameter('favorites', function(res) {
            if (res) {
                template = helperTogenertate(res, child)
            } else {
                template = helperTogenertate(null, child)
            }
            child.insertAdjacentHTML("beforeend", template);
            self.eventAndAdjacent(child.lastElementChild, "alreadyCreate");

            self.helperToAddEventToFavorites(el, self)


            self.asynkLocalStorage = true;
        })

    } else {
        return;
    }


    function helperTogenertate(res, child) {
        if (child.nodeName == "UL") {
            template = self.templateForIco("li", JSON.parse(res));
        } else {
            template = self.templateForIco(null, JSON.parse(res));
        }
        return template;
    }


}


/*

// Constract Player into send dialog or share post window
    
*/


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

    if (document.querySelector("button[name='__CONFIRM__']")) {
        document.querySelector("button[name='__CONFIRM__']").addEventListener("mousedown", function() {
            window.opener.postMessage({
                action: "POST"
            }, '*');
        })
    }
    if (document.querySelector("input[name='publish']")) {
        document.querySelector("input[name='publish']").addEventListener("mousedown", function() {
            var users = document.querySelector(".tokenarea").children;
            if (users.length > 1) {
                setTimeout(function() {
                    window.opener.postMessage({
                        action: "GROUP"
                    }, '*');
                }, 1000)
            } else {
                window.opener.postMessage({
                    action: "DIALOG"
                }, '*');
            }
        })
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

            var splitLink = arrtLink ? arrtLink.split("/index.php?")[1] : null;

            if (splitLink) {

                var parentToLink = self.closest(item, ".unclickable");
                if (parentToLink && !parentToLink.getAttribute("data-replacment")) {


                    for (var i = parentToLink.firstElementChild.children.length - 1; i >= 0; i--) {
                        parentToLink.firstElementChild.children[i].style.display = "none";
                    };

                    var div = self.generateOurPlayerInDialog(item, splitLink),
                        plEl = document.createElement('div');
                    plEl.innerHTML = div;
                    parentToLink.firstElementChild.appendChild(plEl);
                    parentToLink.setAttribute('data-replacment', 1);
                }

            }

        }
    }
}


/*

// Constract Player in Message Page
    
*/


FbCreateMusicSong.prototype.genarateReplaceMessage = function(el) {

    var self = this;

    if (!el) {
        return;
    }

    var allChildDialog = el.querySelectorAll("a[href*='" + this.hash + "']");

    if (allChildDialog) {

        [].forEach.call(allChildDialog, createElement);

    }

    function createElement(item, i) {


        if (item && !item.getAttribute("data-replacment")) {


            var parent = item.parentNode,
                plEl = self.toInspectedLinkAndGeneratePlayer(item, parent, self, "messagesToPage");


            item.style.display = "none";
            parent.appendChild(plEl);

            item.setAttribute('data-replacment', 1);

            self.createActionToPlay(parent, self);

        }

    }

}


/*

// Constract Player in Dialogs window
    
*/


FbCreateMusicSong.prototype.getReplace = function(el) {

    var self = this,
        allChildDialog = el.querySelectorAll("a[href*='" + this.hash + "']");

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


/*

// Helpers for Generate All Player, Link Splitter
    
*/


FbCreateMusicSong.prototype.toInspectedLinkAndGeneratePlayer = function(item, parent, self, state) {


    var urlLink = decodeURIComponent(item.getAttribute("href")),
        splitLink = urlLink.split("/index.php?")[1],
        trueSplitLink;

    if (splitLink) {
        trueSplitLink = splitLink;
    } else {
        trueSplitLink = urlLink.split("/index.php?")[1];
    }

    var div = self.generateOurPlayerInDialog(item, trueSplitLink),
        plEl = document.createElement('div');

    if (state == "message") {
        plEl.setAttribute('style', 'width:100%; margin: 20px 0; display: table; width: 100%; position: relative; list-style:none');
    } else {
        plEl.setAttribute('style', 'margin: 10px 0;display: table;width: 300px;');
    }

    plEl.innerHTML = div;


    return plEl;

}


/*

// Helpers for Add Listener in Playing button
    
*/


FbCreateMusicSong.prototype.createActionToPlay = function(parent, self) {
    var play = parent.querySelector(".-item-play");

    if (play && !play.getAttribute("data-click")) {
        play.setAttribute("data-click", "click");
        play.addEventListener("click", function() {
            self.sendMessage(self);
        });
    }

}


/*

// Constract ico for messenge page
    
*/


FbCreateMusicSong.prototype.icoForDialog = function(el) {

    if (!el || el.querySelector(".-readys-to-closer") || !this.asynkLocalStorageMessagePage) {
        return;
    }

    this.asynkLocalStorageMessagePage = false;

    var self = this,
        textarea = el.querySelector("textarea"),
        style = "style='position: absolute; top: 35px; right: 22px;'";


    self.getLsParameter('favorites', function(res) {
        if (res) {
            template = self.createTemplate(style, JSON.parse(res));
        } else {
            template = self.createTemplate(style, null);
        }

        el.insertAdjacentHTML("beforeend", template);
        self.eventAndAdjacent(el.lastElementChild, "alreadyCreate");


        self.helperToAddEventToFavorites(el, self);


        self.asynkLocalStorageMessagePage = false;
    })

}


/*

// Method for add event on favorite list of song
    
*/


FbCreateMusicSong.prototype.helperToAddEventToFavorites = function(el, self) {

    var parentUlToAddEvent = el.lastElementChild.querySelector(".-item-of-array-list"),
        childrenToAddEvent = parentUlToAddEvent.children;

    if (childrenToAddEvent) {
        for (var i = childrenToAddEvent.length - 1; i >= 0; i--) {
            childrenToAddEvent[i].addEventListener("click", function() {
                self.sendMessage(self);
            });
        };
    }

}


/*

// Constract ico in new dialog window
    
*/

FbCreateMusicSong.prototype.getWindow = function(classie, clasieList) {

    var element = document.querySelector(classie),
        elementList = document.querySelector(clasieList),
        self = this;

    if (element && element.children && element.children.length > 0) {
        for (var i = 0, l = element.children.length; i < l; i++) {
            var _element_ = element.children[i].querySelector(".fbNubFlyoutFooter"),
                _elementMessage_ = element.children[i].querySelector(clasieList);

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


/*

// Constract player for wall
    
*/

FbCreateMusicSong.prototype.genarateReplaceWall = function(el) {

    if (!el) {
        return;
    }
    var self = this,
        children = el.children,
        elem = el.querySelectorAll("a[href*='" + this.hash + "']");

    [].forEach.call(elem, firstLavel);

    function firstLavel(item, i) {

        if (!item && item.getAttribute("data-mark")) {
            return;
        }

        if (self.closest(item, "._2r3x")) {
            item.setAttribute("data-mark", 1);
            var thisOurDialog = item.getAttribute('href'),
                parent = self.closest(item, "._2r3x");

            if (thisOurDialog && thisOurDialog != '' && !parent.getAttribute("data-inserting")) {
                parent.setAttribute("data-inserting", 1);
                listenerForPlayeng(parent, thisOurDialog);
            }
        }
    }

    function listenerForPlayeng(elementReplace, thisOurDialog) {

        var urlLink = decodeURIComponent(thisOurDialog),
            splitLink = urlLink.split("/index.php?")[1],
            options = "float: none !important; margin: 20px auto; width: 95% !important;";

        if (urlLink && urlLink != '' && elementReplace) {
            notMoreUndefinded(thisOurDialog, splitLink, options);
        }

        function notMoreUndefinded(thisOurDialog, splitLink, options) {
            var elementToCreate = self.generateOurPlayerInDialog(thisOurDialog, splitLink, options);
            if (elementToCreate) {
                elementReplace.innerHTML = "";
                elementReplace.insertAdjacentHTML("afterbegin", elementToCreate);

                self.createActionToPlay(elementReplace, self);

            } else {
                setTimeout(function() {
                    notMoreUndefinded(thisOurDialog, splitLink, options)
                }, 100);
            }
        }
    }
}


/*

// Add event to search(to click), search(to keydown)
    
*/


FbCreateMusicSong.prototype.eventAndAdjacent = function(elem, status) {
    var self = this;

    if (!status) {
        self.getLsParameter('favorites', function(res) {
            if (res) {
                elem.lastElementChild.insertAdjacentHTML("afterbegin", self.createTemplate(null, JSON.parse(res)));
            } else {
                elem.lastElementChild.insertAdjacentHTML("afterbegin", self.createTemplate());
            }


            self.helperToAddEventToFavorites(elem, self)

            elem.querySelector(".-item-search-ico").addEventListener("click", function() {
                self.eventToSearch(self);
            })
            elem.querySelector(".-item-music-search").addEventListener("keydown", function() {
                self.eventToSearch(self);
            })
        })

    } else {
        elem.querySelector(".-item-search-ico").addEventListener("click", function() {
            self.eventToSearch(self);
        })
        elem.querySelector(".-item-music-search").addEventListener("keydown", function() {
            self.eventToSearch(self);
        })
    }

}

/*

// Main Observer Object
    
*/

FbCreateMusicSong.prototype.observer = function() {

    var self = this,
        observer = new MutationObserver(function(mutations) {

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
                        var topMusic = document.getElementById("rightCol") ? document.getElementById("rightCol").querySelector("._5rzs._5v6d") : null;
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
                        if (topMusic) {
                            self.generateTopMusic(topMusic);
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


/*

// Event to klick on Search
    
*/


FbCreateMusicSong.prototype.eventToSearch = function(self) {

    self.trackEvent('song', 'search');

    var target = event.target,
        input;

    if (event.keyCode == 13) {
        input = target;
    } else if (event.type == "click") {
        input = target.nextElementSibling;
    } else {
        return;
    }

    if (input.value.length < 1 || input.value == " " || input.value == "") {
        var inputDisibled = input.parentNode.querySelectorAll('input');
        setTimeout(inputDisadledRemoveAttribute, 1);
        return;
    }

    var url = "http://pleer.com/search?q=" + input.value + "&rand=" + (new Date).getTime() + "&referrer=",
        inputDisibled = input.parentNode.querySelectorAll('input'),
        elementOfPreload = target.parentNode.nextElementSibling.querySelector(".-item-of-array-list");

    elementOfPreload.innerHTML = "";
    elementOfPreload.insertAdjacentHTML("afterbegin", self.preloaderCreate())

    input.setAttribute("disabled", "disabled");

    self.makeRequest(url, "GET", null, function(data) {

        

        var html = document.createElement('html');
        html.insertAdjacentHTML("afterbegin", data);

        if(!html.querySelector(".scrolledPagination")){
            var elementForListener = self.generateList([], elementOfPreload, self);
            console.log(elementForListener)
            inputDisadledRemoveAttribute();
            return; 
        }

        var ArrayOfMusic = html.querySelector(".scrolledPagination").children,
            elementForListener = self.generateList(ArrayOfMusic, elementOfPreload, self),
            children = elementForListener.children;

        for (var i = children.length - 1; i >= 0; i--) {
            children[i].addEventListener("click", function() {
                self.sendMessage(self);
            });
        };
        inputDisadledRemoveAttribute();

    });


    function inputDisadledRemoveAttribute() {
        for (var i = inputDisibled.length - 1; i >= 0; i--) {
            inputDisibled[i].removeAttribute("disabled");
        };
    }

}

/*

// Close popup search, at click outside the area
    
*/


FbCreateMusicSong.prototype.closePopUP = function(event, self) {

    var target = event.target,
        targetToClick = (target.parentNode && target.parentNode.nextElementSibling) ? target.parentNode.nextElementSibling : null,
        closestEl = self.closest(target, ".-readys-to-closer"),
        classiePopUp = "-active-fb-pop-up";

    if (closestEl && closestEl.classList && closestEl.classList.contains("-readys-to-closer") && closestEl.querySelector(".-active-fb-pop-up") && !target.parentNode.classList.contains("-item-for-ico-no-style")) {
        return;
    } else if (targetToClick && targetToClick.classList && targetToClick.classList.contains(classiePopUp)) {
        targetToClick.classList.remove(classiePopUp)
    } else if (targetToClick && targetToClick.classList && !targetToClick.classList.contains(classiePopUp) && target.parentNode.classList.contains("-item-for-ico-no-style")) {
        if (document.querySelector(".-active-fb-pop-up")) {
            document.querySelector(".-active-fb-pop-up").classList.remove("-active-fb-pop-up");
        }
        targetToClick.classList.add(classiePopUp);
        self.generateScrollBar(targetToClick.querySelector("ul"));
    } else {
        if (document.querySelector(".-active-fb-pop-up")) {
            document.querySelector(".-active-fb-pop-up").classList.remove("-active-fb-pop-up");
        }
    }

}


/*

// Document state is complete and start function generate
    
*/



if (window.self === window.top) {
    document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
            tryElement();
        }
    }
}


/*

// Main generate function on load page
    
*/


function tryElement() {

    var topMusic = document.getElementById("rightCol") ? document.getElementById("rightCol").querySelector("._5rzs._5v6d") : null,
        element = document.querySelector(".videoCallEnabled"),
        elementList = document.querySelector(".conversation"),
        elmentWallIco = document.getElementById("timeline_composer_container") ? document.getElementById("timeline_composer_container") : document.getElementById("pagelet_composer"),
        elmentWall = (document.querySelector("._2t4u")) ? document.querySelector("._2t4u") : document.querySelector("._5pcb") ? document.querySelector("._5pcb") : document.querySelector(".userContentWrapper") ? document.querySelector(".userContentWrapper") : "",
        elmentToMessages = document.querySelector(".uiList._2ne._4kg"),
        icoForDialog = document.querySelector("._2pt"),
        sendMessageWindow = document.getElementById("targeted_privacy_data_container") ? document.getElementById("targeted_privacy_data_container") : document.getElementById("platformDialogForm");


    if ((element && elementList) || (elmentWallIco && elmentWall) || elmentWall || elmentToMessages || icoForDialog || sendMessageWindow || topMusic) {
        var _fbMusic_ = new FbCreateMusicSong();
        _fbMusic_.getWindow(".videoCallEnabled", ".conversation");
        _fbMusic_.genarateIconInWall(elmentWallIco);
        _fbMusic_.genarateReplaceWall(elmentWall);
        _fbMusic_.genarateReplaceMessage(elmentToMessages);
        _fbMusic_.icoForDialog(icoForDialog);
        _fbMusic_.generateTopMusic(topMusic);
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
};