/**
 * core script for chrome
 */

// normalize chrome.runtime object
if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if (!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
    chrome.runtime.onConnect = chrome.extension.onConnect;
    chrome.runtime.connect = chrome.extension.connect;
}


(function() {

    window.locFbPath = window.location;

    var Ajax = new function() {
        var Request = function(data) {
            data.method = data.method || 'get';
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (data.success) data.success(xhr.responseText);
                    } else {
                        if (data.error) data.error(xhr.statusText);
                    }
                }
            };
            xhr.open(data.method, data.url, true);
            if (data.beforeSend) {
                data.beforeSend(xhr);
            }
            xhr.send();
        };

        this.send = function(data) {
            new Request(data);
        }
    };


    var BackGroundApp = function() {

        /**
         * works with external messages and performs appropriate commands
         */
        var initMessageListeners = function() {
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    switch (request.type) {
                        case 'makeRequest':
                            return makeRequest(request.url, sendResponse);
                            break;
                        default:
                            break;
                    }
                }
            );
        };

        /**
         * make api request
         * @url - request url
         * @sendResponse - callback object of chrome.runtime.onMessage.addListener
         */
        var makeRequest = function(url, sendResponse) {
            // url = url.replace('https:','http:'); // todo remove!!!!!
            Ajax.send({
                url: url,
                success: function(data) {
                    sendResponse(data);
                },
                error: function(data){
                    sendResponse(data); 
                }
            });
            return true;
        };

        /**
         * main initializer
         */
        this.init = function() {
            initMessageListeners();
        }

    };

    var app = new BackGroundApp();
    app.init();

})();
