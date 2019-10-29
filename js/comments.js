'use strict';

(function () {

  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MAX_COMMENTS_COUNT = 5;

  var commentsContainer = document.querySelector('.social__comments');

  // генерирует объект-комментарий
  var generateComment = function () {
    var comment = {};

    var messageIndex = window.utils.generateRandomNumber(0, window.data.commentsMessage.length - 1);
    var autorIndex = window.utils.generateRandomNumber(0, window.data.commentAutorName.length - 1);

    comment.avatar = 'img/avatar-' + window.utils.generateRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
    comment.message = window.data.commentsMessage[messageIndex];
    comment.autor = window.data.commentAutorName[autorIndex];

    return comment;
  };

  // генерирует массив объектов-комментариев
  var generateComments = function () {
    var comments = [];
    comments.length = window.utils.generateRandomNumber(0, MAX_COMMENTS_COUNT);

    for (var i = 0; i < comments.length; i++) {
      comments[i] = generateComment();
    }

    return comments;
  };

  // генерирует шаблон комментария
  var generateCommentSample = function (container) {
    container.insertAdjacentHTML('afterbegin',
        '<li class="social__comment">' +
        '<img class="social__picture" width="35" height="35">' +
        '<p class="social__text"></p>' +
        '</li>'
    );
  };

  // генерирует список комментариев
  var generateCommentsList = function (photo) {
    var comments = photo.comments;

    for (var i = 0; i < comments.length; i++) {
      generateCommentSample(commentsContainer);

      commentsContainer.querySelector('.social__comment').querySelector('img').src = comments[i].avatar;
      commentsContainer.querySelector('.social__comment').querySelector('img').alt = comments[i].autor;
      commentsContainer.querySelector('.social__text').textContent = comments[i].message;
    }
  };

  // удаляет комментарии
  var removeComments = function () {
    var commentsPlugs = commentsContainer.querySelectorAll('.social__comment');

    commentsPlugs.forEach(function (commentPlug) {
      commentsContainer.removeChild(commentPlug);
    });
  };

  window.comments = {
    generateComments: generateComments,
    generateCommentsList: generateCommentsList,
    removeComments: removeComments
  };

})();
