'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // действие при нажатии на ESC
  var isEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // действие при нажатии на ENTER
  var isEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // генерирует случайное число
  var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));

    return randomNumber;
  };

  window.utils = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    generateRandomNumber: generateRandomNumber
  };
})();
