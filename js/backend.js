'use strict';

(function () {

  var TIMEOUT = 10000;

  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';

  var request = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request('GET', URL_GET, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    request('POST', URL_POST, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
