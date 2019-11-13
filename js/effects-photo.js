'use strict';

(function () {

  var CHROME_COEFFICIENT = 0.01;
  var SEPIA_COEFFICIENT = 0.01;
  var PHOBOS_COEFFICIENT = 0.03;
  var HEAT_COEFFICIENT = 0.02;
  var CORRECTION = 1;

  var userUploadImg = window.utils.uploadField.querySelector('.img-upload__preview img');
  var effectSlider = window.utils.uploadField.querySelector('.effect-level');
  var effectValueInput = window.utils.uploadField.querySelector('.effect-level__value');
  var effects = window.utils.uploadField.querySelector('.effects');

  // меняет эффект на фото при нажатии на кнопку эффекта
  var changeEffectsButton = function () {
    var filterValue = effects.querySelector('input:checked').value;

    if (filterValue !== 'none') {
      effectSlider.classList.remove('hidden');
    }

    userUploadImg.classList.add('effects__preview--' + filterValue);
  };

  // меняет эффект на фото в зависимости от положения пина
  window.changeEffectsPin = function () {

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
        userUploadImg.style.filter = 'brightness(' + (effectValueInput.value * HEAT_COEFFICIENT + CORRECTION) + ')';
        break;
    }
  };

  // смена эффекта по клику
  var onEffectsItemClick = function () {
    window.utils.resetUserImgSettings();

    changeEffectsButton();
  };

  // добавление обработчиков клика на радио-кнопки смены эффекта
  effects.querySelectorAll('.effects__item').forEach(function (button) {
    button.addEventListener('click', onEffectsItemClick);
  });

})();
