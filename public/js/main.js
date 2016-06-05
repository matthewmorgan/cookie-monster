function mapCookie(targetUrl) {
    var oldCookies = JSON.parse(inputText = document.getElementById('input-cookie').value);

    var newCookies = oldCookies
        .filter(function (cookie) {
            return hasTheProperties(cookie)
        })
        .map(function (cookie) {
            cookie['domain'] = targetUrl;
            return cookie;
        });

    document.getElementById('output-cookie').innerHTML = JSON.stringify(newCookies);
}

function hasTheProperties(cookie) {
    return cookie.hasOwnProperty('domain') &&
           cookie.hasOwnProperty('name') &&
           cookie['name'].startsWith('Access');
}