'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAX_EFFECT_VALUE = 100;

  var uploadField = document.querySelector('.img-upload');
  var userUploadImg = uploadField.querySelector('.img-upload__preview img');
  var effectSlider = uploadField.querySelector('.effect-level');
  var scaleIndicator = uploadField.querySelector('.scale__control--value');
  var effectValueInput = uploadField.querySelector('.effect-level__value');
  var pin = uploadField.querySelector('.effect-level__pin');
  var effectDepth = uploadField.querySelector('.effect-level__depth');

  var imgUploadInput = uploadField.querySelector('.img-upload__input');
  var hashtagsInput = uploadField.querySelector('.text__hashtags');
  var commentUploadInput = uploadField.querySelector('.text__description');

  var effectOriginalInput = uploadField.querySelector('#effect-none');

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

  // перемешивает массив с фотографиями
  var shufflePhotos = function (photos) {
    var index = 0;
    for (var i = photos.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      index = photos[i];
      photos[i] = photos[j];
      photos[j] = index;
    }

    return photos;
  };

  // сбрасывает все настройки изображения
  var resetUserImgSettings = function () {
    effectSlider.classList.add('hidden');
    userUploadImg.removeAttribute('class');
    userUploadImg.removeAttribute('style');
    userUploadImg.style.transform = 'scale(' + MAX_EFFECT_VALUE / MAX_EFFECT_VALUE + ')';
    scaleIndicator.value = MAX_EFFECT_VALUE + '%';
    effectValueInput.value = MAX_EFFECT_VALUE;
    pin.style.left = MAX_EFFECT_VALUE + '%';
    effectDepth.style.width = MAX_EFFECT_VALUE + '%';
  };

  // приводит инпуты в форме редактирования изображения в первоначальное состояние
  var resetForm = function () {
    imgUploadInput.value = '';
    hashtagsInput.value = '';
    hashtagsInput.removeAttribute('style');
    hashtagsInput.setCustomValidity('');

    commentUploadInput.value = '';

    effectOriginalInput.checked = true;
  };

  window.utils = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    generateRandomNumber: generateRandomNumber,
    shufflePhotos: shufflePhotos,
    resetUserImgSettings: resetUserImgSettings,
    resetForm: resetForm,
    uploadField: uploadField,
    maxEffectValue: MAX_EFFECT_VALUE
  };

})();
