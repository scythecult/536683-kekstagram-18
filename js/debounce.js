'use strict';

(function () {

  var TIMEOUT_INTERVAL = 500;

  var lastTimeout = null;

  window.debounce = function (action) {

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(action, TIMEOUT_INTERVAL);

  };

})();
