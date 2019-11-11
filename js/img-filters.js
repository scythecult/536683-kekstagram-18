'use strict';

(function () {

  var RANDOM_IMG_COUNT = 10;

  var filterButtons = document.querySelectorAll('.img-filters__button');
  var photosList = document.querySelector('.pictures');


  // удалаяет класс активной кнопки
  var removeActiveClass = function () {
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  // очищает галлерею
  var clearGallery = function () {
    var photos = photosList.querySelectorAll('.picture');

    photos.forEach(function (photo) {
      photosList.removeChild(photo);
    });
  };

  // получает массив случайных и уникальных фото в определенном количестве из родительского массива фото
  var getUniquePhotos = function (photos, count) {
    return window.utils.shufflePhotos(photos.slice()).slice(0, count);
  };

  // фильтр "по популярности"
  var filterPopular = function () {
    clearGallery();
    window.renderPhotosList(window.photos);
  };

  // фильтр "случайные"
  var filterRandom = function () {
    clearGallery();
    var photosData = window.photos.slice();
    window.renderPhotosList(getUniquePhotos(photosData, RANDOM_IMG_COUNT));
  };

  // фильтр "обсуждаемые"
  var filterDiscussed = function () {
    clearGallery();
    var photosData = window.photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    window.renderPhotosList(photosData);
  };

  // словарь для фильтров: id кнопки --- функция-обработчик
  var filterButtonMap = {
    'filter-popular': filterPopular,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed
  };

  // обработчик клика по кнопке фильтра
  var onFilterButtonClick = window.debounce(function (evt) {
    removeActiveClass();
    evt.target.classList.add('img-filters__button--active');
    filterButtonMap[evt.target.id]();
  });

  // подписка на событие клика по кнопке фильтра
  filterButtons.forEach(function (button) {
    button.addEventListener('click', onFilterButtonClick);
  });

})();
