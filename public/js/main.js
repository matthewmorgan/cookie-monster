var socket = io('http://cookie-mapper.apps.dulcetsoftware.com');

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
  httpRequest.onreadystatechange = function () {
    sendToServer();
  };
  httpRequest.send(
      JSON.stringify(
          {
            cookie_count: newCookies.length
          }
      )
  );
}

function hasTheProperties(cookie) {
  return cookie.hasOwnProperty('domain') &&
      cookie.hasOwnProperty('name') &&
      cookie['name'].startsWith('Access');
}

function updateCookieCountInView(newCookieCount) {
  var cookieCountDisplay = document.getElementById('mapped-cookie-count');
  var oldCookieTokens = cookieCountDisplay.innerHTML.split(' ');
  oldCookieTokens[1] = Number(newCookieCount);
  cookieCountDisplay.innerHTML = oldCookieTokens.join(' ');
}

socket.on('welcome', function (message) {
  console.log(message);
});

socket.on('update-cookie-count', function(count){
  updateCookieCountInView(count);
});

function sendToServer(){
  socket.emit('cookies-parsed');
}