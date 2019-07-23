var utils = {}

/*
    Init #test block for CSS tests
*/
utils.initTestBlock = function () {
    var div = document.createElement('div')
    div.id = 'test'
    document.querySelector('body').appendChild(div)
}

/*
    Abstract CSS property getter
*/
utils.getCss = function (style) {
    return getComputedStyle(document.querySelector('#test')).getPropertyValue(style)
}

/*
    link.onerror feature detection
*/
utils.linkOnErrorFeature = false
function detectLinkOnErrorSupport() {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'notfound'
    link.onerror = function () {
        utils.linkOnErrorFeature = true
    }
    document.querySelector('head').appendChild(link)
}
detectLinkOnErrorSupport()

/*
    Add a node to HEAD block
*/
utils.addToHead = function (node) {
    document.querySelector('head').appendChild(node)
}

/*
    LINK node creation helper
*/
utils.createLink = function (url) {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    return link
}

/*
    SCRIPT node creation helper
*/
utils.createScript = function (url) {
    var script = document.createElement('script')
    script.src = url
    return script
}

/*
    Watch for a state and trigger a callback
*/
utils.watchAndTrigger = function (state) {
    return new Promise(function (resolve) {
        var interval = setInterval(function () {
            if (state()) {
                clearInterval(interval)
                resolve()
            }
        }, 100)
    })
}
