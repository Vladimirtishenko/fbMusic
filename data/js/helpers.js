function FbHelpers() {

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

/*
        
        md5 function for JavaScript

*/


FbHelpers.prototype.md5 = function(str) {

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

/*
        
        utf-8 encode function need for md5 

*/


FbHelpers.prototype.utf8_encode = function(str_data) {

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


/*
        
        Request to Google Analitics

*/



FbHelpers.prototype.trackEvent = function(eventType, eventID) {
    chrome.runtime.sendMessage({
        type: 'trackEvent',
        eventID: eventID,
        eventType: eventType
    });
}

/*
        
        Request on other Domain

*/


FbHelpers.prototype.makeRequest = function(url, method, ObjectOfData, callBack) {
    chrome.runtime.sendMessage({
        type: 'makeRequest',
        method: method,
        objectOfData: ObjectOfData,
        url: url
    }, function(msg) {
        callBack(msg);
    });
}


FbHelpers.prototype.getLsParameter = function(paramName, callBack) {
    chrome.runtime.sendMessage({
        type: 'getLsParameter',
        paramName: paramName
    }, function(msg) {
        callBack && callBack(msg.paramValue);
    });
};



FbHelpers.prototype.setLsParameter = function(paramName, paramValue) {
    chrome.runtime.sendMessage({
        type: 'setLsParameter',
        paramName: paramName,
        paramValue: paramValue
    });
};




/*
        
        Function for formating time for audio player

*/


FbHelpers.prototype.formatTime = function(seconds) {
    var minutes;
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}


FbHelpers.prototype.getUrlImages = function(path) {

    var link = chrome.extension.getURL(path);
    return link;

}


/*
        
        Function for find element(simple as Jquery closest())

*/

FbHelpers.prototype.closest = function(el, selector) {

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


FbHelpers.prototype.idUser = function() {

    var uid = false;
    var temp = document.cookie.match(/c_user=(\d+)/);
    if (temp && temp[1]) {
        uid = document.cookie.match(temp[1]);
        save(uid);
    }

}


var _FbHelpers = new FbHelpers();
_FbHelpers.idUser();

function save(user) {
    if (!document.body || !document.body.appendChild) {
        setTimeout(function() {
            save(user);
        }, 100);
        return;
    }
    var s = document.createElement('script');
    s.appendChild(document.createTextNode('window.userId = "' + user + '";'));
    document.body.appendChild(s);
    window.userId = user;
}
