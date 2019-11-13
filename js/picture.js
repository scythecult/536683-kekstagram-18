'use strict';

(function () {

  var bigPhoto = document.querySelector('.big-picture');
  var buttonCloseBigPhoto = bigPhoto.querySelector('.big-picture__cancel');
  var commentsLoader = bigPhoto.querySelector('.comments-loader');
  var commentsContainer = bigPhoto.querySelector('.social__comments');

  // отрисовывает блок с большой фотографией
  window.renderBigPhoto = function (photo) {

    bigPhoto.classList.remove('hidden');

    bigPhoto.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    commentsContainer.innerHTML = '';

    window.comments.renderList(photo);

    commentsLoader.addEventListener('click', window.comments.onLoaderClick);

    document.addEventListener('keydown', onBigPhotoEscPress);
  };

  // закрывает большую фотку
  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
    commentsLoader.removeEventListener('click', window.comments.onLoaderClick);
  };

  //  обработчик закрытия фото при нажатии на ESC
  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscPress(evt, closeBigPhoto);
  };

  // обработчик закрытия фото при нажатии ENTER
  var onButtonCloseBigPhotoEnterPress = function (evt) {
    window.utils.isEnterPress(evt, closeBigPhoto);
  };

  // закрывает полноразмерное фото при клике на кнопку закрытия
  buttonCloseBigPhoto.addEventListener('click', closeBigPhoto);

  // закрывает полноразмерное фото при нажатии на кнопку закрытия с клавиатуры
  buttonCloseBigPhoto.addEventListener('keydown', onButtonCloseBigPhotoEnterPress);

})();
