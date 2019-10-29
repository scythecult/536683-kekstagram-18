'use strict';

(function () {
  var CHROME_COEFFICIENT = 0.01;
  var SEPIA_COEFFICIENT = 0.01;
  var PHOBOS_COEFFICIENT = 0.03;
  var HEAT_COEFFICIENT = 0.02;

  var MAX_EFFECT_VALUE = 100;

  var uploadField = document.querySelector('.img-upload');
  var userUploadImg = uploadField.querySelector('.img-upload__preview img');
  var effectSlider = uploadField.querySelector('.effect-level');
  var pin = uploadField.querySelector('.effect-level__pin');
  var effectScale = uploadField.querySelector('.effect-level__line');
  var effectValueInput = uploadField.querySelector('.effect-level__value');
  var effects = uploadField.querySelector('.effects');

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
    var effectValue = Math.round(
      (pin.offsetLeft * MAX_EFFECT_VALUE) / effectScale.offsetWidth
    );

    effectValueInput.value = effectValue;

    switch (effects.querySelector('input:checked').value) {
      case 'chrome':
        userUploadImg.style.filter =
          'grayscale(' + effectValueInput.value * CHROME_COEFFICIENT + ')';
        break;
      case 'sepia':
        userUploadImg.style.filter =
          'sepia(' + effectValueInput.value * SEPIA_COEFFICIENT + ')';
        break;
      case 'marvin':
        userUploadImg.style.filter = 'invert(' + effectValueInput.value + '%)';
        break;
      case 'phobos':
        userUploadImg.style.filter =
          'blur(' + effectValueInput.value * PHOBOS_COEFFICIENT + 'px)';
        break;
      case 'heat':
        userUploadImg.style.filter =
          'brightness(' + (effectValueInput.value * HEAT_COEFFICIENT + 1) + ')';
        break;
    }
  };

  // вычисление уровня насыщенности эффекта
  var onPinMouseUp = function () {
    changeEffectsPin();
  };

  // смена эффекта по клику
  var onEffectsItemClick = function () {
    window.upload.resetUserImgSettings();

    changeEffectsButton();
  };

  // изменение уровня насыщенности эффекта при отжатии ЛКМ
  pin.addEventListener('mouseup', onPinMouseUp);

  // изменение эффекта фото при клике
  effects.addEventListener('click', onEffectsItemClick);
})();
