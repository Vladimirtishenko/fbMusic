/*

// Main Class
    
*/
function FbSendMusic() {

}


/*

// Main Inheritance
    
*/

FbSendMusic.prototype = Object.create(FbPlayingMusic.prototype);
FbSendMusic.prototype.constructor = FbPlayingMusic;



/*

// Method for send message
    
*/


FbSendMusic.prototype.sendMessage = function(self) {


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
        outerDialogs = self.closest(target, ".fbNubFlyoutInner"),
        linkChat = outerDialogs ? outerDialogs.querySelector(".titlebarText") : null,
        hrefs = linkChat ? linkChat.href : null,
        link = "http://"+self.domains+"/index.php?track=" + songId + "&name=" + encodeURIComponent(songName.replace("&", "")) + "&artist=" + encodeURIComponent(artistName.replace("&", "")) + "&duraion=" + duration + "&hash=" + self.hash;


    target.classList.remove("-item-send-song");
    target.classList.add("-item-loader-song");

    self.stopMusic();

    var lefto = screen.availWidth / 2 - 250,
        righto = screen.availHeight / 2 - 150,
        newWin = window.open('about:blank', '', 'width=500,height=300,left=' + lefto + ',top=' + righto);

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


    if (hrefs && hrefs.indexOf("?") == -1) {
        receiverUrl = hrefs;
        if (hrefs.indexOf("messages") > -1) {
            receiverUrl = isNaN(parseInt(hrefs.replace("/messages/", ""))) ? hrefs.replace("/messages/", "") : parseInt(hrefs.replace("/messages/", ""));
        }
    } else if (hrefs) {
        var id = hrefs.split('?id=')[1];
        if (id) {
            receiverUrl = parseInt(id);
        }
    }

    toSendMessageAndName();


    function toSendMessageAndName(statusWhere) {

        if (localStorage.getItem('titleToNameUserAuthorizedFb') && (localStorage.getItem('idToUserAuthorizedFb') || id)) {
            if (!id) {
                id = localStorage.getItem('idToUserAuthorizedFb')
            }
            sendAttachment(statusWhere, localStorage.getItem('titleToNameUserAuthorizedFb'), id);
        } else {
            var rc = new XMLHttpRequest();

            rc.onreadystatechange = function() {
                if (4 == rc.readyState && 200 == rc.status) {
                    var div = document.createElement("div");
                    div.insertAdjacentHTML("afterbegin", rc.responseText);
                    var title = div.querySelector("#pageTitle");
                    if (!id) {
                        id = div.querySelector("meta[property='al:android:url']").getAttribute("content");
                        id = id.replace("fb://profile/", "");
                        localStorage.setItem("idToUserAuthorizedFb", id);
                    }
                    localStorage.setItem('titleToNameUserAuthorizedFb', title.innerHTML);
                    sendAttachment(statusWhere, title.innerHTML, id);

                }
            }

            rc.open("GET", "/profile.php", true);
            rc.send(null);
        }

    }

    function sendAttachment(statusWhere, title, id) {


        var badSymbols = /[\"\<\>\(\)\*\&\^\%\$\#\@\!\[\]\{\}\|\`\~\:\;\\]+/g,
            track = (songName + ' ' + artistName).replace(badSymbols, ''),
            url = "http://www.shazam.com/fragment/search/" + encodeURIComponent(track) + ".json?size=large",
            coverImage;

        self.makeRequest(url, "GET", null, function(data) {

            var datas = JSON.parse(data);

            for (var i = datas['tracks'].length - 1; i >= 0; i--) {
                if (datas['tracks'][i]['image400'].indexOf('nocoverart') == -1) {
                    coverImage = datas['tracks'][i]['image400'];
                    break;
                } else {
                    coverImage = datas['tracks'][i]['image400'];
                }
            };

            if (!coverImage) {
                coverImage = '';
            }

            if (statusWhere == "post") {
                self.postAdd(id, link, coverImage, "", title + self[self.language()].songPosted, self[self.language()].listen, target, closestWall, newWin);
            } else {
                if (hrefs.indexOf("conversation") > -1 || hrefs.indexOf("new") > -1) {
                    var s = document.querySelector(".tokenarea"),
                        val;
                    if (s && s.children.length == 1 && hrefs.indexOf("new") > -1) {
                        var name = s.firstElementChild.querySelector("input[name='participants[]']"),
                        val = name.getAttribute("value");
                    }
                    var thread_fbid = hrefs.split('-')[1] ? hrefs.split('-')[1] : null;
                    self.groupPreSend(thread_fbid, link, self.domains, "", coverImage, title + self[self.language()].songSend, self[self.language()].listen, target, closeElement, val, newWin)
                } else {
                    if (linkChat && linkChat.classList && linkChat.classList.contains("noLink")) {
                        receiverUrl = "/"
                    }
                    self.FBSendAttachment(receiverUrl, link, self.domains, "", coverImage, title + self[self.language()].songSend, self[self.language()].listen, target, closeElement, null, newWin);
                }
            }

        });

    }

}


var _FbSendMusic = new FbSendMusic();