'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgUploadInput = window.utils.uploadField.querySelector('.img-upload__input');
  var uploadImage = window.utils.uploadField.querySelector('.img-upload__preview img');

  // отрисовывает пользовательское фото
  window.renderUserPhoto = function () {
    var file = imgUploadInput.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          uploadImage.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

})();
