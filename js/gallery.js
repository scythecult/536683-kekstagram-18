'use strict';

(function () {

  var photoSample = document.querySelector('#picture').content.querySelector('.picture');
  var photosList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');

  // обработчик события click по миниатюре фото
  var onPhotoClick = function (photo) {
    window.renderBigPhoto(photo);
  };

  // обработчик события enter по миниатюре фото
  var onPhotoEnterPress = function (evt, photo) {
    window.utils.isEnterPress(evt, function () {
      window.renderBigPhoto(photo);
    });
  };

  // отрисовывает фотографию по шаблону
  var renderPhoto = function (photo) {
    var photoElement = photoSample.cloneNode(true);

    photoElement.addEventListener('click', function () {
      onPhotoClick(photo);
    });

    photoElement.addEventListener('keydown', function (evt) {
      onPhotoEnterPress(evt, photo);
    });

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // отрисовывает фотографии в блок .picture
  window.renderPhotosList = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });

    photosList.appendChild(fragment);

    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.load(window.renderPhotosList, window.openErrorMessage);


})();
