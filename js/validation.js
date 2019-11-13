'use strict';

(function () {

  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var hashtagsInput = window.utils.uploadField.querySelector('.text__hashtags');

  // определяет наличие повторяющихся хэш-тегов вне зависимости от регистра
  var detectDuplicateHashtag = function (tag, index, hashes) {
    var tags = hashes.slice(0);

    tags.splice(index, 1);

    return tags
      .map(function (hashtag) {
        return hashtag.toLowerCase();
      })
      .includes(tag.toLowerCase());
  };

  // проверяет на валидность введенные хэш-теги
  var validateHashtags = function (evt) {
    var hashes = evt.target.value
      .split(' ')
      .filter(function (tag) {
        return tag;
      });

    evt.target.removeAttribute('style');

    var errorMessage = '';

    hashes.forEach(function (tag, index) {
      if (tag[0] !== '#') {
        errorMessage = 'Хэш-тег должен начинаться с символа "#"';
      } else if (tag === '#') {
        errorMessage = 'Хеш-тег не может состоять только из символа "#"';
      } else if (detectDuplicateHashtag(tag, index, hashes)) {
        errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
      } else if (hashes.length > HASHTAGS_MAX_COUNT) {
        errorMessage = 'Нельзя указать больше пяти хэш-тегов';
      } else if (tag.length > HASHTAG_MAX_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая символ "#"';
      }

      if (errorMessage) {
        evt.target.style = 'outline: 2px solid red';
      }
    });

    evt.target.setCustomValidity(errorMessage);
  };

  // обрабатывает изменения значения инпута для хэш-тегов
  var onHashtagsInputChange = function (evt) {
    validateHashtags(evt);
  };

  // событие изменения значения инпута для хэш-тегов
  hashtagsInput.addEventListener('change', onHashtagsInputChange);

})();
