'use strict';

(function () {

  var commentsContainer = document.querySelector('.social__comments');

  // генерирует шаблон комментария
  var generateCommentSample = function (comment) {
    return '<li class="social__comment">' +
      '<img class="social__picture" width="35" height="35" src="' + comment.avatar + '" alt="' + comment.name + '">' +
      '<p class="social__text">' + comment.message + '</p>' +
      '</li>';
  };

  // генерирует список комментариев
  var generateCommentsList = function (photo) {
    var comments = photo.comments;

    comments.forEach(function (comment) {
      var htmlComment = generateCommentSample(comment);
      commentsContainer.insertAdjacentHTML('afterbegin', htmlComment);
    });
  };

  // удаляет комментарии
  var removeComments = function () {
    var commentsPlugs = commentsContainer.querySelectorAll('.social__comment');

    commentsPlugs.forEach(function (commentPlug) {
      commentsContainer.removeChild(commentPlug);
    });
  };

  window.comments = {
    generateCommentsList: generateCommentsList,
    removeComments: removeComments
  };

})();
