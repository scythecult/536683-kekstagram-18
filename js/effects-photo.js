'use strict';

(function () {

  var CHROME_COEFFICIENT = 0.01;
  var SEPIA_COEFFICIENT = 0.01;
  var PHOBOS_COEFFICIENT = 0.03;
  var HEAT_COEFFICIENT = 0.02;

  var userUploadImg = window.utils.uploadField.querySelector('.img-upload__preview img');
  var effectSlider = window.utils.uploadField.querySelector('.effect-level');
  var effectValueInput = window.utils.uploadField.querySelector('.effect-level__value');
  var effects = window.utils.uploadField.querySelector('.effects');

  // меняет эффект на фото при нажатии на кнопку эффекта
  var changeEffectsButton = function () {
    if (effects.querySelector('input:checked').value !== 'none') {
      effectSlider.classList.remove('hidden');
    }

    switch (effects.querySelector('input:checked').value) {
      case 'chrome':
        userUploadImg.classList.add('effects__preview--chrome');
        break;
      case 'sepia':
        userUploadImg.classList.add('effects__preview--sepia');
        break;
      case 'marvin':
        userUploadImg.classList.add('effects__preview--marvin');
        break;
      case 'phobos':
        userUploadImg.classList.add('effects__preview--phobos');
        break;
      case 'heat':
        userUploadImg.classList.add('effects__preview--heat');
        break;
    }
  };

  // меняет эффект на фото в зависимости от положения пина
  var changeEffectsPin = function () {

    switch (effects.querySelector('input:checked').value) {
      case 'chrome':
        userUploadImg.style.filter = 'grayscale(' + (effectValueInput.value * CHROME_COEFFICIENT) + ')';
        break;
      case 'sepia':
        userUploadImg.style.filter = 'sepia(' + (effectValueInput.value * SEPIA_COEFFICIENT) + ')';
        break;
      case 'marvin':
        userUploadImg.style.filter = 'invert(' + effectValueInput.value + '%)';
        break;
      case 'phobos':
        userUploadImg.style.filter = 'blur(' + (effectValueInput.value * PHOBOS_COEFFICIENT) + 'px)';
        break;
      case 'heat':
        userUploadImg.style.filter = 'brightness(' + (effectValueInput.value * HEAT_COEFFICIENT + 1) + ')';
        break;
    }
  };

  // вычисление уровня насыщенности эффекта
  var onPinMouseMove = function () {
    changeEffectsPin();
  };

  var onPinMouseUp = function () {
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  // смена эффекта по клику
  var onEffectsItemClick = function () {
    window.utils.resetUserImgSettings();

    changeEffectsButton();
  };

  // изменение уровня насыщенности эффекта при
  document.addEventListener('mousemove', onPinMouseMove);

  //
  document.addEventListener('mousemup', onPinMouseUp);

  // изменение эффекта фото при клике
  effects.addEventListener('click', onEffectsItemClick);

})();
