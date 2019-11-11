'use strict';

(function () {

  var imgUploadInput = window.utils.uploadField.querySelector('.img-upload__input');
  var buttonCloseUploadField = window.utils.uploadField.querySelector('.img-upload__cancel');

  var hashtagsInput = window.utils.uploadField.querySelector('.text__hashtags');
  var commentUploadInput = window.utils.uploadField.querySelector('.text__description');

  var form = window.utils.uploadField.querySelector('.img-upload__form');

  // открывает окно редактирования загруженного фото
  var openUploadField = function () {
    window.utils.uploadField.querySelector('.img-upload__overlay').classList.remove('hidden');

    // window.renderUserPhoto();

    document.addEventListener('keydown', onUploadFieldEscPress);

    hashtagsInput.addEventListener('focus', onInputFocus);
    hashtagsInput.addEventListener('blur', onInputBlur);

    commentUploadInput.addEventListener('focus', onInputFocus);
    commentUploadInput.addEventListener('blur', onInputBlur);

    window.utils.resetUserImgSettings();
    window.renderUserPhoto();
  };

  // закрывает окно редактирования загруженного фото
  var closeUploadField = function () {
    window.utils.uploadField.querySelector('.img-upload__overlay').classList.add('hidden');

    document.removeEventListener('keydown', onUploadFieldEscPress);

    window.utils.resetForm();

    window.utils.resetUserImgSettings();
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

  //
  var onLoad = function () {
    closeUploadField();
    window.openSuccessMessage();
  };

  //
  var onError = function () {
    closeUploadField();
    window.openErrorMessage();
  };

  // обработчик отправки формы
  var onSubmit = function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);

    evt.preventDefault();
  };

  // подписка на событие отправки формы
  form.addEventListener('submit', onSubmit);

  // открытие окна редактирования фото при изменении значения инпута загрузки
  imgUploadInput.addEventListener('change', onInputUploadChange);

  // закрытие окна редактирования фото при клике на кнопку закрытия
  buttonCloseUploadField.addEventListener('click', onButtonCloseUploadFieldClick);

  // закрытие окна редактирования фото при нажатии на кнопку закрытия с клавиатуры
  buttonCloseUploadField.addEventListener('keydown', onButtonCloseUploadFieldEnterPress);

})();
