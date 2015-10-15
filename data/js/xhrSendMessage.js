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
        self.preSendMessage(null, receiver, arg, self);
    } else {
        self.fbPreloadIdUsers(null, receiver, arg, self);
    }
}


FbXhrSendMessage.prototype.fbPreloadIdUsers = function(statusPost, receiver, arg, self) {


    var rc = new XMLHttpRequest();

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
                    }
                }
            }
        }
    }

    rc.open("GET", arg[0], true);
    rc.send();

}


FbXhrSendMessage.prototype.preSendMessage = function(evt, receiver, arg, self) {

    if (evt == "post") {
        var uid = false;
        var temp = document.cookie.match(/c_user=(\d+)/);
        if (temp && temp[1]) {
            uid = document.cookie.match(temp[1]);
        }
        if (!uid || uid < 1) {
            return false;
        }
    }

    var d = new XMLHttpRequest();

    d.onreadystatechange = function() {
        if (4 == d.readyState && 200 == d.status) {
            var a = d.responseText;
            var temp = a.match(/name="fb_dt[prs][abg]" value="([^"]+)"/g)[0];
            var dtsg = temp.match(/name="fb_dtsg" value="([^"]+)"/)[1];
            if (evt == "post") {
                self.sharerStart(uid, dtsg, receiver, "post", arg, self);
            } else {
                var fbid = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
                self.sharerStart(fbid, dtsg, receiver, null, arg, self);
            }


        }
    }
    d.open("GET", "/", true);
    d.send();

}


FbXhrSendMessage.prototype.sharerStart = function(fbid, dtsg, receiver, statusMessage, args, self) {

    var scr = new XMLHttpRequest();
    var params = "";
    params += "&__user=" + fbid;
    params += "&__a=1";
    params += "&fb_dtsg=" + dtsg;
    params += "&__req=v";


    scr.onreadystatechange = function() {
        if (receiver > 0 && 4 == scr.readyState && 200 == scr.status) {
            var chkh = document.createElement('html');
            chkh.innerHTML = scr.responseText;
            var cinp = chkh.querySelector('input[name="attachment[params][urlInfo][canonical]"]');
            if (!cinp) {
                return false;
            }
            self.allSendMessage(fbid, dtsg, receiver, statusMessage, args, self);
        }

    }

    scr.open("POST", "/sharer/sharer.php?u=" + encodeURIComponent(args[1]), true);
    scr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    scr.send(params);

}


FbXhrSendMessage.prototype.allSendMessage = function(fbid, dtsg, receiver, statusMessage, args, self) {
    var q = new XMLHttpRequest(),
        r = "",
        urlToSend;

    if (statusMessage == "post") {
        urlToSend = "/ajax/updatestatus.php?av=" + fbid;

        r += "&fb_dtsg=" + dtsg;
        r += "&xhpc_context=profile";
        r += "&xhpc_ismeta=1";
        r += "&xhpc_timeline=1";
        r += "&xhpc_publish_type=1";
        r += "&xhpc_composerid=u_0_1l";
        r += "&xhpc_targetid=" + receiver;
        r += "&xhpc_message_text=" + encodeURIComponent(args[3]);
        r += "&xhpc_message=" + encodeURIComponent(args[3]);
        r += "&aktion=post";
        r += "&app_id=2309869772";
        r += "&is_react=true";
        r += "&privacyx=300645083384735";
        r += "&ref=timeline";
        r += "&target_type=feed";
        r += "&attachment[params][urlInfo][canonical]=" + encodeURIComponent(args[1]);
        r += "&attachment[params][urlInfo][final]=" + encodeURIComponent(args[1]);
        r += "&attachment[params][urlInfo][user]=" + encodeURIComponent(args[1]);
        r += "&attachment[params][favicon]=";
        r += "&attachment[params][title]=" + encodeURIComponent(args[4]);
        r += "&attachment[params][summary]=" + encodeURIComponent(args[5]);
        r += "&attachment[params][images][0]=" + encodeURIComponent(args[2]);
        r += "&attachment[params][medium]=106";
        r += "&attachment[params][url]=" + encodeURIComponent(args[1]);
        r += "&attachment[type]=100";
        r += "&__user=" + fbid;
        r += "&__a=1";
        r += "&__req=v";

    } else {

        urlToSend = "/ajax/mercury/send_messages.php?__a=1";
        r += "message_batch[0][action_type]=ma-type%3Auser-generated-message";
        r += "&message_batch[0][author]=fbid%3A" + fbid;
        r += "&message_batch[0][author_email]";
        r += "&message_batch[0][coordinates]";
        r += "&message_batch[0][timestamp_time_passed]=0";
        r += "&message_batch[0][is_unread]=false";
        r += "&message_batch[0][is_cleared]=false";
        r += "&message_batch[0][is_forward]=false";
        r += "&message_batch[0][is_filtered_content]=false";
        r += "&message_batch[0][is_spoof_warning]=false";
        r += "&message_batch[0][source]=source%3Achat%3Aweb";
        r += "&message_batch[0][source_tags][0]=source%3Achat";
        r += "&message_batch[0][body]=" + args[3];
        r += "&message_batch[0][has_attachment]=true";
        r += "&message_batch[0][html_body]=false";
        r += "&message_batch[0][specific_to_list][0]=fbid%3A" + receiver;
        r += "&message_batch[0][specific_to_list][1]=fbid%3A" + fbid;
        r += "&message_batch[0][content_attachment][subject]=IP6%20Short%20URL%20-%20Free%20service";
        r += "&message_batch[0][content_attachment][app_id]=2309869772";
        r += "&message_batch[0][content_attachment][attachment][params][urlInfo][canonical]=" + encodeURIComponent(args[1]);
        r += "&message_batch[0][content_attachment][attachment][params][urlInfo][final]=" + encodeURIComponent(args[1]);
        r += "&message_batch[0][content_attachment][attachment][params][urlInfo][user]=" + encodeURIComponent(args[1]);
        r += "&message_batch[0][content_attachment][attachment][params][favicon]=";
        r += "&message_batch[0][content_attachment][attachment][params][title]=" + encodeURIComponent(args[5]);
        r += "&message_batch[0][content_attachment][attachment][params][summary]=" + encodeURIComponent(args[6]);
        r += "&message_batch[0][content_attachment][attachment][params][images][0]=" + encodeURIComponent(args[4]);
        r += "&message_batch[0][content_attachment][attachment][params][medium]=106";
        r += "&message_batch[0][content_attachment][attachment][params][url]=" + encodeURIComponent(args[1]);
        r += "&message_batch[0][content_attachment][attachment][type]=100";
        r += "&message_batch[0][content_attachment][link_metrics][source]=ShareStageExternal";
        r += "&message_batch[0][content_attachment][link_metrics][domain]=" + args[2];
        r += "&message_batch[0][content_attachment][link_metrics][base_domain]=" + args[2];
        r += "&message_batch[0][content_attachment][link_metrics][title_len]=28";
        r += "&message_batch[0][content_attachment][link_metrics][summary_len]=36";
        r += "&message_batch[0][content_attachment][link_metrics][min_dimensions][0]=70";
        r += "&message_batch[0][content_attachment][link_metrics][min_dimensions][1]=70";
        r += "&message_batch[0][content_attachment][link_metrics][images_with_dimensions]=1";
        r += "&message_batch[0][content_attachment][link_metrics][images_pending]=0";
        r += "&message_batch[0][content_attachment][link_metrics][images_fetched]=0";
        r += "&message_batch[0][content_attachment][link_metrics][image_dimensions][0]=626";
        r += "&message_batch[0][content_attachment][link_metrics][image_dimensions][1]=293";
        r += "&message_batch[0][content_attachment][link_metrics][images_selected]=1";
        r += "&message_batch[0][content_attachment][link_metrics][images_considered]=1";
        r += "&message_batch[0][content_attachment][link_metrics][images_cap]=3";
        r += "&message_batch[0][content_attachment][link_metrics][images_type]=ranked";
        r += "&message_batch[0][content_attachment][composer_metrics][best_image_w]=100";
        r += "&message_batch[0][content_attachment][composer_metrics][best_image_h]=100";
        r += "&message_batch[0][content_attachment][composer_metrics][image_selected]=0";
        r += "&message_batch[0][content_attachment][composer_metrics][images_provided]=1";
        r += "&message_batch[0][content_attachment][composer_metrics][images_loaded]=1";
        r += "&message_batch[0][content_attachment][composer_metrics][images_shown]=1";
        r += "&message_batch[0][content_attachment][composer_metrics][load_duration]=4";
        r += "&message_batch[0][content_attachment][composer_metrics][timed_out]=0";
        r += "&message_batch[0][content_attachment][composer_metrics][sort_order]=";
        r += "&message_batch[0][content_attachment][composer_metrics][selector_type]=UIThumbPager_6";
        r += "&message_batch[0][ui_push_phase]=V3";
        r += "&message_batch[0][status]=0";
        r += "&client=mercury";
        r += "&__user=" + fbid;
        r += "&__a=1";
        r += "&__req=f";
        r += "&fb_dtsg=" + dtsg;
    }


    function fireEvent(element,event){
	    if (document.createEventObject){
	    var evt = document.createEventObject();
	    return element.fireEvent('on'+event,evt)
	    }
	    else{
	    var evt = document.createEvent("KeyboardEvent");
	    evt.initEvent(event, true, true, null, false, false, false, false, 13, 0);
	    return element.dispatchEvent(evt);
	    }
	}

  

    q.onreadystatechange = function() {
        if (4 == q.readyState && 200 == q.status) {
            var target,
                closeElement;
            if (statusMessage == "post") {
                target = args[6];
                closeElement = self.closest(target, ".-item-fb-music-drop-down-wall");
            } else {
                target = args[7];
                closeElement = args[8];
            }
            r = q.responseText.substr(9);

            rData = false;
            try {
                rData = eval('(' + r + ')');
            } catch (e) {}
            if (!rData) {
                return false;
            }

            if (closeElement) {
                closeElement.classList.remove("-active-fb-pop-up");
            }

            if (rData.error) {
            	if(statusMessage == "post"){
            		var topOfWall = self.closest(closeElement, ".timelineUnitContainer");
            			if(topOfWall){
            				var textarea = topOfWall.querySelector("textarea");
            				if(!textarea){
            					textarea = topOfWall.querySelector("div[contenteditable='true']");
            					textarea.innerHTML = args[1];
            				} else {
            					textarea.value = args[1];
            				}
            			}

            	} else {
            		var textarea = closeElement.parentNode.parentNode.previousElementSibling.firstElementChild;
            		textarea.value = args[1];
            	}

                
                textarea.focus();
                fireEvent(textarea, 'keydown');
                target.classList.remove("-item-loader-song");
                target.classList.add("-item-send-song");
                return false;
            }


            if (statusMessage == "post") {
                if (confirm("Для отображения записи на стене, страница будет перезагружена..")) {
                    location.reload();
                } else {
                    target.classList.remove("-item-loader-song");
                    target.classList.add("-item-send-song-done");
                    return true;
                }
            } else {
                target.classList.remove("-item-loader-song");
                target.classList.add("-item-send-song-done");
                return true;
            }

        }
    }


    q.open("POST", urlToSend, true);
    q.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    q.send(r);

}



var _FbXhrSendMessage = new FbXhrSendMessage();
