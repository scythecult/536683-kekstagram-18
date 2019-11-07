'use strict';

(function () {

  var pin = window.utils.uploadField.querySelector('.effect-level__pin');
  var effectScale = window.utils.uploadField.querySelector('.effect-level__line');
  var effectValueInput = window.utils.uploadField.querySelector('.effect-level__value');
  var effectDepth = window.utils.uploadField.querySelector('.effect-level__depth');

  var onMouseDown = function (downEvt, action) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords.x = moveEvt.clientX;

      var pinPosition = pin.offsetLeft - shift.x;

      if (pinPosition > effectScale.offsetWidth) {
        pinPosition = effectScale.offsetWidth;
      } else if (pinPosition <= 0) {
        pinPosition = 0;
      }

      pin.style.left = pinPosition + 'px';

      effectValueInput.value = Math.round((pin.offsetLeft * window.utils.maxEffectValue) / effectScale.offsetWidth);

      effectDepth.style.width = effectValueInput.value + '%';

      action();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pin.addEventListener('mousedown', function (downEvt) {
    onMouseDown(downEvt, window.changeEffectsPin);
  });

})();
