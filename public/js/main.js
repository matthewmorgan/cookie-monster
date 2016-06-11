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
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', 'http://cookie-mapper.apps.dulcetsoftware.com/update');
  httpRequest.setRequestHeader('Content-Type', 'application/json');

  httpRequest.send(
      JSON.stringify(
          {
            cookie_count: newCookies.length
          }
      )
  );
  updateCookieCountInView(newCookies.length);
}

function hasTheProperties(cookie) {
  return cookie.hasOwnProperty('domain') &&
      cookie.hasOwnProperty('name') &&
      cookie['name'].startsWith('Access');
}

function updateCookieCountInView(deltaCookies) {
  var cookieCountDisplay = document.getElementById('mapped-cookie-count');
  var oldCookieTokens = cookieCountDisplay.innerHTML.split(' ');
  oldCookieTokens[1] = Number(oldCookieTokens[1]) + deltaCookies;
  cookieCountDisplay.innerHTML = oldCookieTokens.join(' ');
  sendToServer(deltaCookies);
}