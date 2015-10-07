(function() { 

    function FbCreateMusicSong() {

    	this.makeRequest = function(url, callBack) {
	        chrome.runtime.sendMessage({
	            type: 'makeRequest',
	            url: url
	        }, function(msg) {
	            callBack(msg);
	        });
	    };

        window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || function(r) {
            function w(a) {
                this.g = [];
                this.k = a
            }

            function H(a) {
                (function c() {
                    var d = a.takeRecords();
                    d.length && a.k(d, a);
                    a.f = setTimeout(c, w._period)
                })()
            }

            function t(a) {
                var b = {
                        type: null,
                        target: null,
                        addedNodes: [],
                        removedNodes: [],
                        previousSibling: null,
                        nextSibling: null,
                        attributeName: null,
                        attributeNamespace: null,
                        oldValue: null
                    },
                    c;
                for (c in a) b[c] !== r && a[c] !== r && (b[c] = a[c]);
                return b
            }

            function I(a, b) {
                var c = B(a, b);
                return function(d) {
                    var g =
                        d.length,
                        n;
                    b.a && c.a && A(d, a, c.a, b.d);
                    if (b.b || b.e) n = J(d, a, c, b);
                    if (n || d.length !== g) c = B(a, b)
                }
            }

            function A(a, b, c, d) {
                for (var g = {}, n = b.attributes, h, m, C = n.length; C--;) h = n[C], m = h.name, d && d[m] === r || (h.value !== c[m] && a.push(t({
                    type: "attributes",
                    target: b,
                    attributeName: m,
                    oldValue: c[m],
                    attributeNamespace: h.namespaceURI
                })), g[m] = !0);
                for (m in c) g[m] || a.push(t({
                    target: b,
                    type: "attributes",
                    attributeName: m,
                    oldValue: c[m]
                }))
            }

            function J(a, b, c, d) {
                function g(b, c, g, h, y) {
                    var r = b.length - 1;
                    y = -~((r - y) / 2);
                    for (var f, k, e; e = b.pop();) f =
                        g[e.h], k = h[e.i], d.b && y && Math.abs(e.h - e.i) >= r && (a.push(t({
                            type: "childList",
                            target: c,
                            addedNodes: [f],
                            removedNodes: [f],
                            nextSibling: f.nextSibling,
                            previousSibling: f.previousSibling
                        })), y--), d.a && k.a && A(a, f, k.a, d.d), d.c && 3 === f.nodeType && f.nodeValue !== k.c && a.push(t({
                            type: "characterData",
                            target: f
                        })), d.e && n(f, k)
                }

                function n(b, c) {
                    for (var x = b.childNodes, p = c.b, y = x.length, w = p ? p.length : 0, f, k, e, l, u, z = 0, v = 0, q = 0; v < y || q < w;) l = x[v], u = (e = p[q]) && e.j, l === u ? (d.a && e.a && A(a, l, e.a, d.d), d.c && e.c !== r && l.nodeValue !== e.c && a.push(t({
                        type: "characterData",
                        target: l
                    })), k && g(k, b, x, p, z), d.e && (l.childNodes.length || e.b && e.b.length) && n(l, e), v++, q++) : (h = !0, f || (f = {}, k = []), l && (f[e = D(l)] || (f[e] = !0, -1 === (e = E(p, l, q, "j")) ? d.b && (a.push(t({
                        type: "childList",
                        target: b,
                        addedNodes: [l],
                        nextSibling: l.nextSibling,
                        previousSibling: l.previousSibling
                    })), z++) : k.push({
                        h: v,
                        i: e
                    })), v++), u && u !== x[v] && (f[e = D(u)] || (f[e] = !0, -1 === (e = E(x, u, v)) ? d.b && (a.push(t({
                        type: "childList",
                        target: c.j,
                        removedNodes: [u],
                        nextSibling: p[q + 1],
                        previousSibling: p[q - 1]
                    })), z--) : k.push({
                        h: e,
                        i: q
                    })), q++));
                    k && g(k, b,
                        x, p, z)
                }
                var h;
                n(b, c);
                return h
            }

            function B(a, b) {
                var c = !0;
                return function g(a) {
                    var h = {
                        j: a
                    };
                    !b.c || 3 !== a.nodeType && 8 !== a.nodeType ? (b.a && c && 1 === a.nodeType && (h.a = F(a.attributes, function(a, c) {
                        if (!b.d || b.d[c.name]) a[c.name] = c.value;
                        return a
                    })), c && (b.b || b.c || b.a && b.e) && (h.b = K(a.childNodes, g)), c = b.e) : h.c = a.nodeValue;
                    return h
                }(a)
            }

            function D(a) {
                try {
                    return a.id || (a.mo_id = a.mo_id || G++)
                } catch (b) {
                    try {
                        return a.nodeValue
                    } catch (c) {
                        return G++
                    }
                }
            }

            function K(a, b) {
                for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d, a);
                return c
            }

            function F(a, b) {
                for (var c = {}, d = 0; d < a.length; d++) c = b(c, a[d], d, a);
                return c
            }

            function E(a, b, c, d) {
                for (; c < a.length; c++)
                    if ((d ? a[c][d] : a[c]) === b) return c;
                return -1
            }
            w._period = 30;
            w.prototype = {
                observe: function(a, b) {
                    for (var c = {
                            a: !!(b.attributes || b.attributeFilter || b.attributeOldValue),
                            b: !!b.childList,
                            e: !!b.subtree,
                            c: !(!b.characterData && !b.characterDataOldValue)
                        }, d = this.g, g = 0; g < d.length; g++) d[g].m === a && d.splice(g, 1);
                    b.attributeFilter && (c.d = F(b.attributeFilter, function(a, b) {
                        a[b] = !0;
                        return a
                    }));
                    d.push({
                        m: a,
                        l: I(a,
                            c)
                    });
                    this.f || H(this)
                },
                takeRecords: function() {
                    for (var a = [], b = this.g, c = 0; c < b.length; c++) b[c].l(a);
                    return a
                },
                disconnect: function() {
                    this.g = [];
                    clearTimeout(this.f);
                    this.f = null
                }
            };
            var G = 1;
            return w
        }(void 0);


    }

    FbCreateMusicSong.prototype.getWindow = function(classie) {

        var element = document.querySelector(classie);
        var self = this;
        if (!element) {
            setTimeout(function() {
                self.getWindow(".videoCallEnabled")
            }, 10);
            return;
        }

        var eventAndAdjacent = function(elem){
        	elem.lastElementChild.insertAdjacentHTML("afterbegin", self.createTemplate());
            elem.querySelector(".-item-search-ico").addEventListener("click", function(){self.eventToSearch(self)})
            elem.querySelector(".-item-fb-music-ico").addEventListener("click", self.openPopUP);
        } 

        if(element.children.length > 0){
        	for (var i = 0, l = element.children.length; i < l; i++) {
        		var _element_ = element.children[i].querySelector(".fbNubFlyoutFooter");
        		if(_element_ && !_element_.querySelector(".-item-fb-music-outer")){
        			eventAndAdjacent(_element_);
        		}
        	};
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type == "childList" ) {
                    var panel = mutation.target.querySelector(".fbNubFlyoutFooter");
                    if(panel && !panel.querySelector(".-item-fb-music-outer")){
                    	eventAndAdjacent(panel);
	                }
                }
            });
        });


        var config = {
            attributes: true,
            childList: true,
            characterData: true
        }

        observer.observe(element, config);

        document.body.insertAdjacentHTML("afterbegin", self.styleCreate())

    }

    FbCreateMusicSong.prototype.createTemplate = function(){
    	var self = this;
    	var template = "<div class='-item-fb-music-outer'>"
							+ "<span class='-item-fb-music-ico'><img src='"+chrome.extension.getURL('data/imgs/nota.png')+"'></span>"
							+ "<div class='-item-fb-music-drop-down'>"
								+ "<div class='-item-form-search'>"
									+ "<input type='submit' class='-item-search-ico' />"
									+ "<input type='search' class='-item-music-search' placeholder='Искать музыку...'>"
								+ "</div>"
								+ "<div class='-item-list-music'>"
									+"<ul class='-item-of-array-list'>"

									+"</ul>"
								+ "</div>"
							+ "</div>"	
    				  +"</div>";

    	return template;

    }

    FbCreateMusicSong.prototype.styleCreate = function(){
    	  var style = "<style>"
    	  				+".-item-fb-music-outer{cursor: pointer; display: block; position: relative; padding: 6px 6px 3px 3px; float: left}"
    	  				+".-item-fb-music-outer:before{position: absolute;content: '';height: 20px;z-index: 1;bottom: 85%;left: -50px;width: 278px; display: none}"
    	  				+".-item-fb-music-outer:hover:before{display: block}"
    	  				+".-item-fb-music-ico{display: table;}"
    	  				+".-item-fb-music-drop-down{display: none; position: absolute; background: #fff; width: 278px; height: 365px; border: 0;border-radius: 2px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);outline: 0;padding: 0;right: -210px;bottom: 130%;z-index: 999;}"
    	  				+".-item-fb-music-drop-down:before{content: ''; z-index: 1;position: absolute; bottom: -8px; left: 50px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: #fff transparent transparent transparent;}"
    	  				+".-item-fb-music-drop-down:after{content: ''; position: absolute; left: 50px; bottom: -9px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: rgba(102, 102, 102, 0.41) transparent transparent transparent;}"
    	  				+".-item-music-search{border: none;border-bottom: 2px solid #6d84b4;padding: 20px 10px 20px 28px; font-size: 14px !important; width: 100%;box-sizing: border-box;}"
    	  				+".-item-music-search:focus, .-item-music-search:active, .-item-search-ico:focus, .-item-search-ico:active{outline: none}"
    	  				+".-item-of-array-list {position: relative;height: 305px;box-sizing: border-box;overflow: auto;}"
    	  				+".-item-of-array-list li:last-child {border-bottom: none !important}"
    	  				+".-item-form-search{position: relative; border-radius: 3px 3px 0 0;overflow: hidden;}"
    	  				+".-item-search-ico{text-indent: -999999px; cursor: pointer; border: none; position: absolute; width: 16px; height:21px; background: url("+chrome.extension.getURL('data/imgs/search-icon.svg')+"); left: 5px; top: 17px}"
    	  				+".-item-preloader-img{position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 25px; height: 25px;}"
    	  				+".-item-track-single {border-bottom: 1px solid #eee;padding: 10px 10px 10px 30px; position: relative}"
    	  				+".-item-name-of-song {display: block; color: #000;}"
    	  				+".-item-name-of-artist {font-size: 11px;color: #888;max-width: 80%;display: block;}"
    	  				+".-item-send-song{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url("+chrome.extension.getURL('data/imgs/plus.png')+")}"
    	  				+".-item-play{top: 12px; position: absolute; left: 10px; cursor: pointer; width: 10px; height: 11px; background: url("+chrome.extension.getURL('data/imgs/media-play.png')+")}"
    	  				+".-active-fb-pop-up{display: block}"
    	  			  +"</style>";
    	  return style;
    }

    FbCreateMusicSong.prototype.preloaderCreate = function(){
    	var preloader = "<img class='-item-preloader-img' src='"+chrome.extension.getURL('data/imgs/preloader.gif')+"' />";
    	return preloader;
    }

    FbCreateMusicSong.prototype.eventToSearch = function(self){
    	event.preventDefault();
    	var target = event.target;
    	var elementOfPreload = target.parentNode.nextElementSibling.querySelector(".-item-of-array-list");
    	elementOfPreload.insertAdjacentHTML("afterbegin", self.preloaderCreate())


    	var url = "https://music.yandex.ua/handlers/music-search.jsx?text="+target.nextElementSibling.value+"&type=all";

    	self.makeRequest(url, function(data) {
        	self.generateList(JSON.parse(data), elementOfPreload, self);
    	});

    }

    FbCreateMusicSong.prototype.generateList = function(data, el, self){


    	var AllMoreArtists = function(data){

    		var AllArtists = data.map(function(item, i){

    			if(item.name){
    				return item.name;
    			}

    		});

    		return AllArtists.join(", ");
    	}
    		

    	var ArrayOfSong = data.tracks.items.map(function(item, i){
    		console.log(item);
    		return ("<li class='-item-track-single'>"
    					+"<i class='-item-play'></i>"
						+"<span class='-item-name-of-song'>"+item.title+"</span>"
						+"<span class='-item-name-of-artist'>"
						+ AllMoreArtists(item.artists)
						+"</span>"
						+"<i class='-item-send-song' data-name-song='"+item.title+"' data-name-artist='"+AllMoreArtists(item.artists)+"' data-duration='"+item.durationMillis+"' data-album='"+item.album.id+"' data-song='"+item.id+"'></i>"	
    			  +"</li>");
    	});


    	el.innerHTML = "";
    	el.insertAdjacentHTML("afterbegin", ArrayOfSong.join(""))

    	el.addEventListener("click", self.sendMessage)

    }

    FbCreateMusicSong.prototype.sendMessage = function(){

    	var target = event.target,
    		songId = target.getAttribute("data-song"),
    		songName = target.getAttribute("data-name-song"),
    		artistName = target.getAttribute("data-name-artist"),
    		duration = target.getAttribute("data-duration");
	

    }

    FbCreateMusicSong.prototype.openPopUP = function(){

    		var classiePopUp = "-active-fb-pop-up";

    	if(this.nextElementSibling.classList.contains(classiePopUp)){
    		this.nextElementSibling.classList.remove(classiePopUp)
    	} else  {
    		this.nextElementSibling.classList.add(classiePopUp)
    	}

    }


    window.addEventListener("DOMContentLoaded", function() {
        var _fbMusic_ = new FbCreateMusicSong();
        _fbMusic_.getWindow(".videoCallEnabled");
    })


})();