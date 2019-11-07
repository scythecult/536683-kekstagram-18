'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';

  var request = function (method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open(method, URL);

    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request('GET', onLoad, onError);
  };

  window.backend = {
    load: load
  };

})();
