'use strict';

(function () {

  var TIMEOUT_INTERVAL = 500;

  window.debounce = function (action) {

    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        action.apply(null, parameters);
      }, TIMEOUT_INTERVAL);
    };
  };

})();
