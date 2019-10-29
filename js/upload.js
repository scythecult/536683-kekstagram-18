'use strict';

(function () {
  var MAX_EFFECT_VALUE = 100;

  var uploadField = document.querySelector('.img-upload');
  var imgUploadInput = uploadField.querySelector('.img-upload__input');
  var buttonCloseUploadField = uploadField.querySelector('.img-upload__cancel');

  var userUploadImg = uploadField.querySelector('.img-upload__preview img');
  var effectSlider = uploadField.querySelector('.effect-level');
  var scaleIndicator = uploadField.querySelector('.scale__control--value');
  var effectValueInput = uploadField.querySelector('.effect-level__value');

  var hashtagsInput = uploadField.querySelector('.text__hashtags');
  var commentUploadInput = uploadField.querySelector('.text__description');

  // сбрасывает все настройки изображения
  var resetUserImgSettings = function () {
    effectSlider.classList.add('hidden');
    userUploadImg.removeAttribute('class');
    userUploadImg.removeAttribute('style');
    userUploadImg.style.transform =
      'scale(' + MAX_EFFECT_VALUE / MAX_EFFECT_VALUE + ')';
    scaleIndicator.value = MAX_EFFECT_VALUE + '%';
    effectValueInput.value = MAX_EFFECT_VALUE;
  };

  // открывает окно редактирования загруженного фото
  var openUploadField = function () {
    uploadField
      .querySelector('.img-upload__overlay')
      .classList.remove('hidden');

    document.addEventListener('keydown', onUploadFieldEscPress);

    hashtagsInput.addEventListener('focus', onInputFocus);
    hashtagsInput.addEventListener('blur', onInputBlur);

    commentUploadInput.addEventListener('focus', onInputFocus);
    commentUploadInput.addEventListener('blur', onInputBlur);

    resetUserImgSettings();
  };

  // закрывает окно редактирования загруженного фото
  var closeUploadField = function () {
    uploadField.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', onUploadFieldEscPress);

    imgUploadInput.value = '';

    resetUserImgSettings();
  };

  // обработчик события нажатия на клавишу ESC
  var onUploadFieldEscPress = function (evt) {
    window.utils.isEscPress(evt, closeUploadField);
  };

  // обработчик события focus на поле ввода
  var onInputFocus = function () {
    document.removeEventListener('keydown', onUploadFieldEscPress);
  };

  // обработчик события blur на поле ввода
  var onInputBlur = function () {
    document.addEventListener('keydown', onUploadFieldEscPress);
  };

  // открывает окно редактирования
  var onInputUploadChange = function () {
    openUploadField();
  };

  // закрывает окно редактирования при клике на кнопку закрытия
  var onButtonCloseUploadFieldClick = function () {
    closeUploadField();
  };

  // закрывает окно редактирования при нажатии на кнопку закрытия с клавиатуры
  var onButtonCloseUploadFieldEnterPress = function (evt) {
    window.utils.isEnterPress(evt, closeUploadField);
  };

  // открытие окна редактирования фото при изменении значения инпута загрузки
  imgUploadInput.addEventListener('change', onInputUploadChange);

  // закрытие окна редактирования фото при клике на кнопку закрытия
  buttonCloseUploadField.addEventListener(
      'click',
      onButtonCloseUploadFieldClick
  );

  // закрытие окна редактирования фото при нажатии на кнопку закрытия с клавиатуры
  buttonCloseUploadField.addEventListener(
      'keydown',
      onButtonCloseUploadFieldEnterPress
  );

  window.upload = {
    resetUserImgSettings: resetUserImgSettings
  };
})();
