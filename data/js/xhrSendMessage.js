function FbXhrSendMessage() {}


FbXhrSendMessage.prototype = Object.create(FbHtmlGenerate.prototype);
FbXhrSendMessage.prototype.constructor = FbXhrSendMessage;


FbXhrSendMessage.prototype.postAdd = function(receiverUrl, url, imgUrl, msg, title, desc, target) {


    var self = this,
        receiver = 0,
        arg = arguments;

    if (typeof receiverUrl == "number") {
        receiver = receiverUrl;
        self.preSendMessage("post", receiver, arg, self);
    } else {
        self.fbPreloadIdUsers("post", receiver, arg, self);
    }

}
FbXhrSendMessage.prototype.FBSendAttachment = function(receiverUrl, link, domain, msg, imgUrl, imgTitle, imgDesc, target, closeElement) {

    var self = this,
        receiver = 0,
        arg = arguments;

    if (typeof receiverUrl == "number") {
        receiver = receiverUrl;
        self.preSendMessage("message", receiver, arg, self);
    } else {
        self.fbPreloadIdUsers("message", receiver, arg, self);
    }
}


FbXhrSendMessage.prototype.groupPreSend = function(thread_fbid, link, domain, msg, imgUrl, imgTitle, imgDesc, target, closeElement, relocate) {

    var self = this,
        arg = arguments;

    self.preSendMessage("group", thread_fbid, arg, self, relocate);

}


FbXhrSendMessage.prototype.fbPreloadIdUsers = function(statusPost, receiver, arg, self) {

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
                        receiver = parseInt(ex[1]);
                        self.preSendMessage(statusPost, receiver, arg, self);
                    } else {
                        if (statusPost != "post") {
                            self.preSendMessage("group", null, arg, self);
                        }
                    }
                }
            }
        }
    }

    rc.open("GET", url, true);
    rc.send();

}


FbXhrSendMessage.prototype.preSendMessage = function(evt, receiver, arg, self, relocate) {


    var link;

    if (evt == "post") {
        var elseUser = (receiver != window.userId) ? '&usersIdFacebook='+receiver : null;
        if(elseUser){
            var d = new XMLHttpRequest();
            d.onreadystatechange = function() {
                if (4 == d.readyState && 200 == d.status) {
                    var tmph = document.createElement('html');
                    tmph.innerHTML = d.responseText;
                    var mt = tmph.querySelector('#pageTitle').innerHTML;
                    if(mt){
                        elseUser = '&usersIdFacebook='+encodeURIComponent(mt);
                        toPreSend();
                    }
                }
            }
            d.open("GET", "https://www.facebook.com/"+receiver, true);
            d.send(); 
        } else {
            toPreSend();
        }

        function toPreSend(){
            var link = encodeURIComponent(arg[1]+"&cover="+arg[2]+"&title="+arg[4]+"&caption="+arg[5]);
            var url = 'https://www.facebook.com/dialog/share?app_id=1486924624946319&display=popup&href=' + encodeURIComponent(arg[1]) + '&redirect_uri=http://fbmusic.ml/aftersend.php&picture=' + encodeURIComponent(arg[2]) + '&title=' + encodeURIComponent(arg[4]) + '&caption=fbmusic.ml&description='+encodeURIComponent(arg[5])+elseUser;
            sendTo(url, arg[6], arg[7], "post", elseUser);
        }
        
    } else if (evt == "message") {
        link = encodeURIComponent(arg[1]+"&cover="+arg[4]+"&title="+arg[5]+"&caption="+arg[6]);
        var url = 'https://www.facebook.com/dialog/send?app_id=1486924624946319&link=' + link + '&redirect_uri=http://fbmusic.ml/aftersend.php&to=' + receiver + '&display=popup';
        sendTo(url, arg[7], arg[8]);
    } else if (evt == "group") {
        link = encodeURIComponent(arg[1]+"&cover="+arg[4]+"&title="+arg[5]+"&caption="+arg[6]);
        var relocate = relocate ? relocate : null;
        var url = 'https://www.facebook.com/dialog/send?app_id=1486924624946319&link=' + link + '&redirect_uri=http://fbmusic.ml/aftersend.php&display=popup&tryToNewChat&relocate='+relocate;
        sendTo(url, arg[7], arg[8], evt, relocate);
    }

    function sendTo(url, target, closest, action, relocate) {
        var lefto = screen.availWidth / 2 - 250;
        var righto = screen.availHeight / 2 - 125;
        var newWin = window.open(url, '', 'width=500,height=250,left=' + lefto + ',top=' + righto);
        newWin.focus();

        TryClosed(newWin, target, closest, action, relocate);
    }


    function TryClosed(newWin, target, closest, action, relocate) {
        try{
            if (newWin == null || newWin.closed) {
                target.classList.remove("-item-loader-song");
                target.classList.add("-item-send-song-done");
                closest.classList.remove("-active-fb-pop-up");
                if(relocate){
                    alert("Вы будите перенаправлены на страницу с диалогом.");
                    location.href = "https://www.facebook.com/messages/"+relocate;
                }
                if(action == "post"){
                    location.reload();
                }
                if(evt == "group" && !relocate){
                    alert("The song has been sent. To continue the conversation, please, open it from your inbox in the top menu.");
                }
                return true;
            } 
        }catch(e){}
        setTimeout(function() {
                TryClosed(newWin, target, closest, action, relocate);
        }, 100)
    }


}

var _FbXhrSendMessage = new FbXhrSendMessage();
