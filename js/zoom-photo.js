'use strict';

(function () {

  var SCALE_STEP = 25;

  var userUploadImg = window.utils.uploadField.querySelector('.img-upload__preview img');
  var scaleIndicator = window.utils.uploadField.querySelector('.scale__control--value');
  var buttonDecreaseImgScale = window.utils.uploadField.querySelector('.scale__control--smaller');
  var buttonIncreaseImgScale = window.utils.uploadField.querySelector('.scale__control--bigger');

  // увеличивает изображение
  var increaseImg = function () {
    var valueScaleIndicator = Number(scaleIndicator.value.slice(0, scaleIndicator.value.length - 1));

    if (valueScaleIndicator < window.utils.maxEffectValue) {
      valueScaleIndicator += SCALE_STEP;
    }

    scaleIndicator.value = valueScaleIndicator + '%';
    userUploadImg.style.transform = 'scale(' + valueScaleIndicator / window.utils.maxEffectValue + ')';
  };

  // уменьшает изображение
  var decreaseImg = function () {
    var valueScaleIndicator = Number(scaleIndicator.value.slice(0, scaleIndicator.value.length - 1));

    if (valueScaleIndicator > SCALE_STEP) {
      valueScaleIndicator -= SCALE_STEP;
    }

    scaleIndicator.value = valueScaleIndicator + '%';
    userUploadImg.style.transform = 'scale(' + valueScaleIndicator / window.utils.maxEffectValue + ')';
  };

  // обработчик события клика на кнопку уменьшения изображения
  var onButtonDecreaseImgClick = function () {
    decreaseImg();
  };

  // обработчик события клика на кнопку увеличения изображения
  var onButtonIncreaseImgClick = function () {
    increaseImg();
  };

  // уменьшение изображения при клике на кнопку "-"
  buttonDecreaseImgScale.addEventListener('click', onButtonDecreaseImgClick);

  // увеличение изображения при клике на кнопку "+"
  buttonIncreaseImgScale.addEventListener('click', onButtonIncreaseImgClick);

})();
