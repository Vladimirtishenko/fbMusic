/*

// Main Class
    
*/
function FbRequestBackground() {

}


/*

// Main Inheritance
    
*/

FbRequestBackground.prototype = Object.create(FbHelpers.prototype);
FbRequestBackground.prototype.constructor = FbRequestBackground;



/*

// Method for send message
    
*/

FbRequestBackground.prototype.trackEvent = function(eventType, eventID) {
    chrome.runtime.sendMessage({
        type: 'trackEvent',
        eventID: eventID,
        eventType: eventType
    });
}

FbRequestBackground.prototype.makeRequest = function(url, method, ObjectOfData, callBack) {
    chrome.runtime.sendMessage({
        type: 'makeRequest',
        method: method,
        objectOfData: ObjectOfData,
        url: url
    }, function(msg) {
        callBack(msg);
    });
}


FbRequestBackground.prototype.getLsParameter = function(paramName, callBack) {
    chrome.runtime.sendMessage({
        type: 'getLsParameter',
        paramName: paramName
    }, function(msg) {
        callBack && callBack(msg.paramValue);
    });
};



FbRequestBackground.prototype.setLsParameter = function(paramName, paramValue) {
    chrome.runtime.sendMessage({
        type: 'setLsParameter',
        paramName: paramName,
        paramValue: paramValue
    });
};


FbRequestBackground.prototype.getUrlImages = function(path) {

    var link = chrome.extension.getURL(path);
    return link;

}


var _FbRequestBackground = new FbRequestBackground();