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


        this.audio = new Audio();

        this.currentTimes = 0;

        this.md5 = function(str) {

            var RotateLeft = function(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            };

            var AddUnsigned = function(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            };

            var F = function(x, y, z) {
                return (x & y) | ((~x) & z);
            };
            var G = function(x, y, z) {
                return (x & z) | (y & (~z));
            };
            var H = function(x, y, z) {
                return (x ^ y ^ z);
            };
            var I = function(x, y, z) {
                return (y ^ (x | (~z)));
            };

            var FF = function(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            var GG = function(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            var HH = function(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            var II = function(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            var ConvertToWordArray = function(str) {
                var lWordCount;
                var lMessageLength = str.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            var WordToHex = function(lValue) {
                var WordToHexValue = "",
                    WordToHexValue_temp = "",
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
            };

            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;

            str = this.utf8_encode(str);
            x = ConvertToWordArray(str);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;

            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD);
            }

            var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

            return temp.toLowerCase();

        }


        this.utf8_encode = function(str_data) {

            str_data = str_data.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < str_data.length; n++) {
                var c = str_data.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }

            return utftext;
        }

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

    FbCreateMusicSong.prototype.getReplace = function(el) {
        var self = this;

        var childMessage = el.querySelector("._4tdt");


        if (!childMessage) {
            return;
        }


        var allChildDialog = el.querySelectorAll("._5wd4");

        for (var i = 0, l = allChildDialog.length; i < l; i++) {
            var thisOurDialog = allChildDialog[i].querySelector("a[href*='fbmusic']");

            if (thisOurDialog) {
                var urlLink = decodeURIComponent(thisOurDialog.getAttribute("href")),
                    splitLink = urlLink.split("http://l.facebook.com/l.php?u=http://fbmusic.ml/music?")[1],
                    div = self.generateOurPlayerInDialog(allChildDialog[i], splitLink);
                allChildDialog[i].insertAdjacentHTML("afterend", div);
                allChildDialog[i].parentNode.removeChild(allChildDialog[i]);
                self.observer(null, null, el.firstElementChild);
            }
        };

        var events = el.getAttribute("data-event");

        if (!events) {
            el.setAttribute("data-event", "click");
            el.addEventListener("click", function() {
                self.sendMessage(self)
            });
        }

    }

    FbCreateMusicSong.prototype.generateOurPlayerInDialog = function(el, link) {

        var w = window.getComputedStyle(el).getPropertyValue("width");


        var splitLink = link.split("&"),
            trackId = splitLink[0].split("=")[1];
        albumId = splitLink[1].split("=")[1];
        name = splitLink[2].split("=")[1].replace(/\+/ig, " ");
        artist = splitLink[3].split("=")[1].replace(/\+/ig, " ");
        duration = splitLink[4].split("=")[1];


        var player = "<li style='width=" + w + "; margin: 20px 0; display: table; width: 100%; position: relative; list-style:none;'>" + "<div style='float:right; position: relative'>" + "<i style='top: 0; left:-18px' class='-item-play' data-duration='" + duration + "' data-id-song='" + trackId + "' data-album-id='" + albumId + "'></i>" + "<span class='-item-name-of-song-dialog'>" + decodeURI(name) + "</span>" + "<span class='-item-name-of-artist-dialog'>" + decodeURI(artist) + "</span>" + "</li>" + "</div>";

        return player;
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

        this.eventAndAdjacent = function(elem) {
            elem.lastElementChild.insertAdjacentHTML("afterbegin", self.createTemplate());
            elem.querySelector(".-item-search-ico").addEventListener("click", function() {
                self.eventToSearch(self);
            })
            elem.querySelector(".-item-music-search").addEventListener("keydown", function() {
                self.eventToSearch(self);
            })
            elem.querySelector(".-item-fb-music-ico").addEventListener("click", self.openPopUP);
        }

        if (element.children.length > 0) {
            for (var i = 0, l = element.children.length; i < l; i++) {
                var _element_ = element.children[i].querySelector(".fbNubFlyoutFooter");

                var _elementMessage_ = element.children[i].querySelector(".conversation");

                if (_elementMessage_) {
                    self.getReplace(_elementMessage_);
                }

                if (_element_ && !_element_.querySelector(".-item-fb-music-outer")) {
                    self.eventAndAdjacent(_element_);
                }
            };
        }

        self.observer(".fbNubFlyoutFooter", ".-item-fb-music-outer", element);


        document.body.insertAdjacentHTML("afterbegin", self.styleCreate())

    }

    FbCreateMusicSong.prototype.observer = function(classParent, classMusicOuter, element) {
        var self = this;
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type == "childList") {
                    if (classParent) {
                        var panel = mutation.target.querySelector(classParent);
                        if (panel && !panel.querySelector(classMusicOuter)) {
                            self.eventAndAdjacent(panel);
                        }
                    } else {
                        self.getReplace(element.parentNode);
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
    }


    FbCreateMusicSong.prototype.createTemplate = function() {
        var self = this;
        var template = "<div class='-item-fb-music-outer'>" + "<span class='-item-fb-music-ico'><img src='" + chrome.extension.getURL('data/imgs/nota.png') + "'></span>" + "<div class='-item-fb-music-drop-down'>" + "<div class='-item-form-search'>" + "<input type='submit' class='-item-search-ico' />" + "<input type='text' class='-item-music-search' placeholder='Искать музыку...'>" + "</div>" + "<div class='-item-list-music'>" + "<ul class='-item-of-array-list'>" + "<li class='-item-single-try'>Введите название трека</li>" + "</ul>" + "</div>" + "</div>" + "</div>";

        return template;

    }

    FbCreateMusicSong.prototype.styleCreate = function() {
        var style = "<style>" + ".-item-fb-music-outer{cursor: pointer; display: block; position: relative; padding: 6px 6px 3px 3px; float: left}" + ".-item-fb-music-outer:before{position: absolute;content: '';height: 20px;z-index: 1;bottom: 85%;left: -50px;width: 278px; display: none}" + ".-item-fb-music-outer:hover:before{display: block}" + ".-item-fb-music-ico{display: table;}" + ".-item-fb-music-drop-down{display: none; position: absolute; background: #fff; width: 278px; min-height: 100px; border: 0;border-radius: 2px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);outline: 0;padding: 0;right: -210px;bottom: 130%;z-index: 999;}" + ".-item-fb-music-drop-down:before{content: ''; z-index: 1;position: absolute; bottom: -8px; left: 50px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: #fff transparent transparent transparent;}" + ".-item-fb-music-drop-down:after{content: ''; position: absolute; left: 50px; bottom: -9px; width: 0;height: 0;border-style: solid;border-width: 8px 8px 0 8px;border-color: rgba(102, 102, 102, 0.41) transparent transparent transparent;}" + ".-item-music-search{border: none;border-bottom: 2px solid #6d84b4;padding: 20px 10px 20px 28px; font-size: 14px !important; width: 100%;box-sizing: border-box;}" + ".-item-music-search:focus, .-item-music-search:active, .-item-search-ico:focus, .-item-search-ico:active{outline: none}" + ".-item-of-array-list {position: relative;min-height: 100px;box-sizing: border-box;overflow: auto;}" + ".-item-of-array-list li:last-child {border-bottom: none !important}" + ".-item-form-search{position: relative; border-radius: 3px 3px 0 0;overflow: hidden;}" + ".-item-search-ico{text-indent: -999999px; cursor: pointer; border: none; position: absolute; width: 16px; height:21px; background: url(" + chrome.extension.getURL('data/imgs/search-icon.svg') + "); left: 5px; top: 17px}" + ".-item-preloader-img{position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 25px; height: 25px;}" + ".-item-track-single {border-bottom: 1px solid #eee;padding: 10px 10px 10px 30px; position: relative}" + ".-item-name-of-song {display: block; color: #000;}" + ".-item-name-of-artist {font-size: 11px;color: #888;max-width: 80%;display: block;}" + ".-item-send-song{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + chrome.extension.getURL('data/imgs/plus.png') + ") no-repeat 0px 0px} .-item-send-song-done{margin-top: -7.5px; top: 50%; position: absolute; right: 10px; cursor: pointer; width: 15px; height: 15px; background: url(" + chrome.extension.getURL('data/imgs/plus.png') + ") no-repeat -15px 0px}" + ".-item-play{top: 12px; position: absolute; left: 10px; cursor: pointer; width: 10px; height: 13px; background: url(" + chrome.extension.getURL('data/imgs/controls.png') + ") no-repeat 0px 0px}" + ".-active-fb-pop-up{display: block} .-now-plaing-fb-music {background: url(" + chrome.extension.getURL('data/imgs/controls.png') + ") no-repeat -11px 0 !important} #-item-audio-duration{width: 90%;display: inline-block; background: #ddd; height: 5px; position: relative;} .-item-progress-to-play{position: absolute; height: 5px; left: 0; top: 0; background: #6d84b4} .-item-name-of-song-dialog{font-size: 13px; font-weight: 700;width: 100px; color: #000; display: block} .-item-name-of-artist-dialog{width: 100px; color: #666; display: block} .-item-single-try{position: absolute; font-size: 13px;text-align: center;width: 100% ;top: 50% ;margin-top: -10px;}" + " < /style>";
        return style;
    }

    FbCreateMusicSong.prototype.preloaderCreate = function() {
        var preloader = "<img class='-item-preloader-img' src='" + chrome.extension.getURL('data/imgs/preloader.gif') + "' />";
        return preloader;
    }

    FbCreateMusicSong.prototype.eventToSearch = function(self) {

        var target = event.target;

        if (event.keyCode == 13) {
            var url = "https://music.yandex.ua/handlers/music-search.jsx?text=" + target.value + "&type=all";
        } else if (event.type == "click") {
            var url = "https://music.yandex.ua/handlers/music-search.jsx?text=" + target.nextElementSibling.value + "&type=all";
        } else {
            return;
        }


        var elementOfPreload = target.parentNode.nextElementSibling.querySelector(".-item-of-array-list");
        elementOfPreload.innerHTML = "";
        elementOfPreload.insertAdjacentHTML("afterbegin", self.preloaderCreate())

        self.makeRequest(url, function(data) {
            self.generateList(JSON.parse(data), elementOfPreload, self);
        });

    }

    FbCreateMusicSong.prototype.generateList = function(data, el, self) {


        var AllMoreArtists = function(data) {

            var AllArtists = data.map(function(item, i) {

                if (item.name) {
                    return item.name;
                }

            });

            return AllArtists.join(", ");
        }


        var ArrayOfSong = data.tracks.items.map(function(item, i) {
            var coverImage = item.album.coverUri.replace(/%/ig, "");
            return ("<li class='-item-track-single'>" + "<i class='-item-play' data-duration='" + item.durationMillis + "' data-id-song='" + item.id + "' data-album-id='" + item.album.id + "'></i>" + "<span class='-item-name-of-song'>" + item.title + "</span>" + "<span class='-item-name-of-artist'>" + AllMoreArtists(item.artists) + "</span>" + "<i class='-item-send-song' data-name-song='" + item.title + "' data-name-artist='" + AllMoreArtists(item.artists) + "' data-duration='" + item.durationMillis + "' data-album='" + item.album.id + "' data-song='" + item.id + "' data-cover-url-img='" + coverImage + "m1000x1000'></i>" + "</li>");
        });


        el.innerHTML = "";

        if (ArrayOfSong.length > 0) {
            el.insertAdjacentHTML("afterbegin", ArrayOfSong.join(""))
        } else {
            el.insertAdjacentHTML("afterbegin", "<p>Нечего не найдено!</p>")
        }


        el.addEventListener("click", function() {
            self.sendMessage(self);
        })

    }

    FbCreateMusicSong.prototype.sendMessage = function(self) {


        if (event.target.classList.contains("-item-play")) {
            self.playMusic(event.target)
        }


        if (!event.target.classList.contains("-item-send-song")) {
            return;
        }


        var target = event.target,
            songId = target.getAttribute("data-song"),
            songName = target.getAttribute("data-name-song"),
            artistName = target.getAttribute("data-name-artist"),
            duration = target.getAttribute("data-duration"),
            albumId = target.getAttribute("data-album"),
            coverImage = target.getAttribute("data-cover-url-img");


        target.classList.remove("-item-send-song");
        target.classList.add("-item-send-song-done");

        self.stopMusic();

        var closeElement = self.closest(target, ".-item-fb-music-drop-down");



        var link = "http://fbmusic.ml/music?track=" + songId + "&albumId=" + albumId + "&name=" + songName + "&artist=" + artistName + "&duraion=" + duration;


        var elements = self.closest(target, ".fbNubFlyoutInner"),
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


        self.FBSendAttachment(receiverUrl, link, "fbmusic.ml", "", coverImage, songName, artistName);


        closeElement.classList.remove("-active-fb-pop-up");




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
            url = "https://music.yandex.ua/api/v2.0/handlers/track/" + songId + ":" + albumId + "/download";
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
            var audio = this.audio;
            this.currentTimes = audio.currentTime;
            audio.pause();
            return true;

        }

    }

    FbCreateMusicSong.prototype.stopMusic = function(el) {

        var tryClass = document.querySelector(".-now-plaing-fb-music"),
            progressBar = document.getElementById("-item-audio-duration"),
            audio = this.audio;
        audio.pause();
        audio.currentTime = 0;

        if ((progressBar && !el) || (progressBar && !el.classList.contains("-item-paused")) ) {
            progressBar.parentNode.removeChild(progressBar)
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
            this.audio.currentTime = this.currentTimes;
            this.audio.play();
            el.classList.add("-now-plaing-fb-music");
            el.classList.remove(classie);
            return;
        }

        var audio = this.audio;

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


        audio.addEventListener("timeupdate", function() {
            var duration = document.querySelector('.-item-progress-to-play');
            var s = Number((audio.currentTime).toFixed(2));
            if (duration) {
                duration.style.width = (s * 100) / elementFullDuration + "%";
            }
        }, false);


        elementDuration.addEventListener("click", function() {
            var clicked = (event.offsetX * 100) / widthElement;
            var crtTime = elementFullDuration * (clicked / 100);
            self.currentTimes = crtTime;
            audio.currentTime = self.currentTimes;
            audio.play();
        })

    }


    FbCreateMusicSong.prototype.closest = function(el, selector) {

        var matchesFn;
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        while (el !== null) {
            parent = el.parentElement;
            if (parent !== null && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }


    FbCreateMusicSong.prototype.FBSendAttachment = function(receiverUrl, link, domain, msg, imgUrl, imgTitle, imgDesc) {
        var receiver = 0;

        if (typeof receiverUrl == "number") {
            receiver = receiverUrl;
        } else {
            var rc = new XMLHttpRequest();
            rc.open("GET", receiverUrl, false);
            rc.send();
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
                        }
                    }
                }
            }
        }
        var d = new XMLHttpRequest();
        d.open("GET", "/", false);
        d.send();
        if (receiver > 0 && 4 == d.readyState && 200 == d.status) {
            a = d.responseText;
            temp = a.match(/name="fb_dt[prs][abg]" value="([^"]+)"/g)[0];
            var dtsg = temp.match(/name="fb_dtsg" value="([^"]+)"/)[1];
            var fbid = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

            var scr = new XMLHttpRequest();
            var params = "";
            params += "&__user=" + fbid;
            params += "&__a=1";
            params += "&fb_dtsg=" + dtsg;
            params += "&__req=v";

            scr.open("POST", "/sharer/sharer.php?u=" + encodeURIComponent(link), false);
            scr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            scr.send(params);

            var chkh = document.createElement('html');
            chkh.innerHTML = scr.responseText;
            var cinp = chkh.querySelector('input[name="attachment[params][urlInfo][canonical]"]');
            if (!cinp) {
                return false;
            }
            var q = new XMLHttpRequest();
            q.open("POST", "/ajax/mercury/send_messages.php?__a=1", false);
            var r = "";
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
            r += "&message_batch[0][body]=" + msg;
            r += "&message_batch[0][has_attachment]=true";
            r += "&message_batch[0][html_body]=false";
            r += "&message_batch[0][specific_to_list][0]=fbid%3A" + receiver;
            r += "&message_batch[0][specific_to_list][1]=fbid%3A" + fbid;
            r += "&message_batch[0][content_attachment][subject]=IP6%20Short%20URL%20-%20Free%20service";
            r += "&message_batch[0][content_attachment][app_id]=2309869772";
            r += "&message_batch[0][content_attachment][attachment][params][urlInfo][canonical]=" + encodeURIComponent(link);
            r += "&message_batch[0][content_attachment][attachment][params][urlInfo][final]=" + encodeURIComponent(link);
            r += "&message_batch[0][content_attachment][attachment][params][urlInfo][user]=" + encodeURIComponent(link);
            r += "&message_batch[0][content_attachment][attachment][params][favicon]=";
            r += "&message_batch[0][content_attachment][attachment][params][title]=" + encodeURIComponent(imgTitle);
            r += "&message_batch[0][content_attachment][attachment][params][summary]=" + encodeURIComponent(imgDesc);
            r += "&message_batch[0][content_attachment][attachment][params][images][0]=" + encodeURIComponent(imgUrl);
            r += "&message_batch[0][content_attachment][attachment][params][medium]=106";
            r += "&message_batch[0][content_attachment][attachment][params][url]=" + encodeURIComponent(link);
            r += "&message_batch[0][content_attachment][attachment][type]=100";
            r += "&message_batch[0][content_attachment][link_metrics][source]=ShareStageExternal";
            r += "&message_batch[0][content_attachment][link_metrics][domain]=" + domain;
            r += "&message_batch[0][content_attachment][link_metrics][base_domain]=" + domain;
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
            q.send(r);



            r = q.responseText.substr(9);

            rData = false;
            try {
                rData = eval('(' + r + ')');
            } catch (e) {}
            if (!rData) {
                return false;
            }
            if (rData.error) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }


    FbCreateMusicSong.prototype.openPopUP = function() {

        var classiePopUp = "-active-fb-pop-up";

        if (this.nextElementSibling.classList.contains(classiePopUp)) {
            this.nextElementSibling.classList.remove(classiePopUp)
        } else {
            this.nextElementSibling.classList.add(classiePopUp)
        }

    }


    window.addEventListener("load", function() {
        var _fbMusic_ = new FbCreateMusicSong();
        _fbMusic_.getWindow(".videoCallEnabled");
    })


})();
