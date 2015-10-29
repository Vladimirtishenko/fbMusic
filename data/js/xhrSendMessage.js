/*

// Main Class
    
*/
function FbXhrSendMessage() {}

/*

// Main Inheritance
    
*/
FbXhrSendMessage.prototype = Object.create(FbHtmlGenerate.prototype);
FbXhrSendMessage.prototype.constructor = FbXhrSendMessage;


/*

// Send post into wall
    
*/

FbXhrSendMessage.prototype.postAdd = function(receiverUrl, url, imgUrl, msg, title, desc, target, closestWall, newWin) {

    var self = this,
        receiver = 0,
        arg = arguments;

    if (typeof receiverUrl == "number") {
        receiver = receiverUrl;
        self.preSendMessage("post", receiver, arg, self, null, newWin);
    } else {
        if (!localStorage.getItem(receiverUrl)) {
            self.fbPreloadIdUsers("post", receiver, arg, self, receiverUrl, newWin);
        } else {
            self.preSendMessage("post", localStorage.getItem(receiverUrl), arg, self, null, newWin);
        }
    }
}

/*

// Send message in single user
    
*/

FbXhrSendMessage.prototype.FBSendAttachment = function(receiverUrl, link, domain, msg, imgUrl, imgTitle, imgDesc, target, closeElement, relocate, newWin) {

    var self = this,
        receiver = 0,
        arg = arguments;

    if (typeof receiverUrl == "number") {
        receiver = receiverUrl;
        self.preSendMessage("message", receiver, arg, self, null, newWin);
    } else {
        if (!localStorage.getItem(receiverUrl)) {
            self.fbPreloadIdUsers("message", receiver, arg, self, receiverUrl, newWin);
        } else {
            self.preSendMessage("message", localStorage.getItem(receiverUrl), arg, self, null, newWin);
        }

    }
}

/*

// Send message in group
    
*/

FbXhrSendMessage.prototype.groupPreSend = function(thread_fbid, link, domain, msg, imgUrl, imgTitle, imgDesc, target, closeElement, relocate, newWin) {

    var self = this,
        arg = arguments;

    self.preSendMessage("group", thread_fbid, arg, self, relocate, newWin);

}


/*

// Method for get user ID, if user ID is string name.
    
*/


FbXhrSendMessage.prototype.fbPreloadIdUsers = function(statusPost, receiver, arg, self, receiverUrl, newWin) {

    var rc = new XMLHttpRequest(),
        url = arg[0].indexOf("https://") > -1 ? arg[0] : "https://www.facebook.com/" + arg[0];

    rc.onreadystatechange = function() {
        if (4 == rc.readyState && 200 == rc.status) {
            var tmph = document.createElement('html');
            tmph.innerHTML = rc.responseText;
            var mt = tmph.querySelector('meta[property="al:android:url"]');
            if (mt) {
                var cn = mt.getAttribute('content');
                if (cn && cn != '') {
                    var ex = cn.split('fb://profile/');
                    if (ex[1]) {
                        localStorage.setItem(receiverUrl, parseInt(ex[1]));
                        receiver = parseInt(ex[1]);
                        self.preSendMessage(statusPost, receiver, arg, self, null, newWin);
                    } else {
                        if (statusPost != "post") {
                            self.preSendMessage("group", null, arg, self, null, newWin);
                        }
                    }
                }
            }
        }
    }

    rc.open("GET", url, true);
    rc.send();

}


/*

// General Method to send all attachments.
    
*/

FbXhrSendMessage.prototype.preSendMessage = function(evt, receiver, arg, self, relocate, newWin) {

    var link, url, _timer;

    if (evt == "post") {
        var elseUser = (receiver != window.userId) ? '&usersIdFacebook=' + receiver : '';
        if (elseUser) {
            if (!localStorage.getItem(receiver)) {
                var d = new XMLHttpRequest();
                d.onreadystatechange = function() {
                    if (4 == d.readyState && 200 == d.status) {
                        var tmph = document.createElement('html');
                        tmph.innerHTML = d.responseText;
                        var mt = tmph.querySelector('#pageTitle').innerHTML;
                        if (mt) {
                            localStorage.setItem(receiver, mt);
                            elseUser = '&usersIdFacebook=' + encodeURIComponent(mt);
                            toPreSend();
                        }
                    }
                }
                d.open("GET", "https://www.facebook.com/" + receiver, true);
                d.send();
            } else {
                elseUser = '&usersIdFacebook=' + encodeURIComponent(localStorage.getItem(receiver));
                toPreSend();
            }
        } else {
            toPreSend();
        }

        function toPreSend() {

            var link = encodeURIComponent(arg[1] + "&cover=" + arg[2] + "&title=" + arg[4] + "&caption=" + arg[5]),
                url = 'https://www.facebook.com/dialog/share?app_id=1486924624946319&display=popup&href=' + encodeURIComponent(arg[1]) + '&redirect_uri=' + encodeURIComponent('http://' + self.domains + '/aftersend.php') + '&picture=' + encodeURIComponent(arg[2]) + '&title=' + encodeURIComponent(arg[4]) + '&description=' + encodeURIComponent(arg[5]) + elseUser;

            sendTo(url, arg[6], arg[7], "post", elseUser);
        }

    } else if (evt == "message") {

        link = encodeURIComponent(arg[1] + "&cover=" + arg[4] + "&title=" + arg[5] + "&caption=" + arg[6]),
        url = 'https://www.facebook.com/dialog/send?app_id=1486924624946319&link=' + link + '&redirect_uri=' + encodeURIComponent('http://' + self.domains + '/aftersend.php') + '&to=' + receiver + '&display=popup';
        sendTo(url, arg[7], arg[8]);

    } else if (evt == "group") {

        link = encodeURIComponent(arg[1] + "&cover=" + arg[4] + "&title=" + arg[5] + "&caption=" + arg[6]),
        relocate = relocate ? relocate : '',
        url = 'https://www.facebook.com/dialog/send?app_id=1486924624946319&link=' + link + '&redirect_uri=' + encodeURIComponent('http://' + self.domains + '/aftersend.php') + '&display=popup&tryToNewChat&relocate=' + relocate;

        sendTo(url, arg[7], arg[8], evt, relocate);
    }

    function sendTo(url, target, closest, action, relocate) {
        newWin.location = url;
        newWin.focus();

        TryClosed(newWin, target, closest, action, relocate);
    }


    function TryClosed(newWin, target, closest, action, relocate) {
        try {
            if (newWin == null || newWin.closed) {
                if (relocate && action.toLowerCase() != "post") {
                    alert(self[self.language()].rediretToPageInDialog);
                    location.href = "https://www.facebook.com/messages/" + relocate;
                }
                target.classList.remove("-item-loader-song");
                target.classList.add("-item-send-song-done");
                setTimeout(function(){
                    target.classList.remove("-item-send-song-done");
                    target.classList.add("-item-send-song");
                 }, 4000);
                closest.classList.remove("-active-fb-pop-up");
                return true;
            }
        } catch (e) {
            clearInterval(_timer);
            return;
        }
        _timer = setTimeout(function() {
            TryClosed(newWin, target, closest, action, relocate);
        }, 100)
    }


    window.addEventListener("message", function(e) {
        if (e.data.action && e.data.action == "POST") {
            self.trackEvent('song to post', 'wall');
            location.reload();
        };
        if (e.data.action && e.data.action == "DIALOG") {
            self.trackEvent('song to', 'friend');
        };
        if (e.data.action && e.data.action == "GROUP") {
            self.trackEvent('song to', 'group chat');
            var button = document.querySelector("a[name='mercurymessages']");
            button.click();
            button.click();
            setTimeout(function() {
                var locations = document.querySelector(".jewelContent");
                var hrefs = locations.querySelector(".messagesContent").href;
                if (confirm(self[self.language()].rediretToPageInDialogGroup)) {
                    window.location = hrefs;
                }
            }, 2000);
        };
    })

}



var _FbXhrSendMessage = new FbXhrSendMessage();