'use strict';

(function () {

  var getData = function (data) {
    window.photos = data;
  };

  window.backend.load(getData, window.openErrorMessage);

})();
