'use strict';

(function () {

  var COMMENTS_LIMIT = 5;

  var commentsContainer = document.querySelector('.social__comments');

  var bigPhoto = document.querySelector('.big-picture');
  var commentsCount = bigPhoto.querySelector('.social__comment-count');
  var commentsLoader = bigPhoto.querySelector('.comments-loader');

  var commentsCopy = [];
  var count = 0;

  // отрисовывает содержимое блока с актуальным количеством загруженных комментариев
  var generateCommentsCountBlock = function (loadedComments) {
    commentsCount.textContent = '';
    var commentsCountBlockContent = loadedComments + ' из <span class="comments-count">' + count +
      '</span> комментариев';
    commentsCount.insertAdjacentHTML('afterbegin', commentsCountBlockContent);
  };

  // генерирует шаблон комментария
  var generateCommentSample = function (comment) {
    return '<li class="social__comment">' +
      '<img class="social__picture" width="35" height="35" src="' + comment.avatar + '" alt="' + comment.name + '">' +
      '<p class="social__text">' + comment.message + '</p>' +
      '</li>';
  };

  // отрисовывает комментарии
  var renderComments = function (comments) {
    comments.forEach(function (comment) {
      var htmlComment = generateCommentSample(comment);
      commentsContainer.insertAdjacentHTML('beforeend', htmlComment);
    });

    generateCommentsCountBlock(commentsContainer.querySelectorAll('.social__comment').length);
  };

  // генерирует и отрисовывает список комментариев
  var renderList = function (photo) {
    commentsCopy = photo.comments.slice();
    count = photo.comments.length;

    var commentsInRange = commentsCopy.length < COMMENTS_LIMIT;
    var commentsToRender = commentsInRange ? commentsCopy : commentsCopy.splice(0, COMMENTS_LIMIT);

    commentsLoader.classList.toggle('visually-hidden', commentsInRange);

    renderComments(commentsToRender);
  };

  // обработчик клика по кнопке загрузки дополнительных комментариев
  var onLoaderClick = function () {
    renderComments(commentsCopy.splice(0, COMMENTS_LIMIT));

    if (!commentsCopy.length) {
      commentsLoader.classList.add('visually-hidden');
    }
  };

  window.comments = {
    onLoaderClick: onLoaderClick,
    renderList: renderList
  };

})();
