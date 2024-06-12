document.addEventListener("turbo:load", function() {
  if (document.querySelector('.profile')) {
    setupProfile();
  }
});

function setupProfile() {
  //const selectImage = document.getElementById('selectImage');
  //const selectColorCode = document.getElementById('selectColorCode');
  //const imageInputDiv = document.getElementById('imageInput');
  //const colorInputDiv = document.getElementById('colorInput');
  var selectedOptionField = document.getElementById('selected_option');

  // function updateInputVisibility() {
  //   //var imagePreview = document.getElementById('imagePreview');
  //   var colorPreview = document.getElementById('colorPreview');
  //   // var beforePreview = document.getElementById('beforePreview');
    
  //   if (selectImage.checked) {
  //     //imageInputDiv.classList.remove('disabled-input');
  //     colorInputDiv.classList.add('disabled-input');
  //     //imageInputDiv.querySelector('input[type=file]').disabled = false;
  //     colorInputDiv.querySelector('input[type=color]').disabled = true;
  //     //imageInputDiv.classList.add('active-style');
  //     colorInputDiv.classList.remove('active-style');
  //     imagePreview.style.display = 'block';
  //     colorPreview.style.display = 'none';
  //     // beforePreview.style.display = 'none';
  //   } else {
  //     colorInputDiv.classList.remove('disabled-input');
  //     //imageInputDiv.classList.add('disabled-input');
  //     colorInputDiv.querySelector('input[type=color]').disabled = false;
  //     //imageInputDiv.querySelector('input[type=file]').disabled = true;
  //     colorInputDiv.classList.add('active-style');
  //     //imageInputDiv.classList.remove('active-style');
  //     imagePreview.style.display = 'none';
  //     // beforePreview.style.display = 'none';
  //     colorPreview.style.display = 'block';
  //   }
  // }

  document.querySelectorAll('.usericonColor').forEach(function(colorElement) {
    colorElement.addEventListener('click', function() {
      var color = this.getAttribute('data-color');
      document.getElementById('color_code').value = color;
      //document.getElementById('selectColorCode').checked = true; // ラジオボタンを選択状態にする
      selectedOptionField.value = 'color'; // 隠しフィールドの値を更新
      //updateInputVisibility(); // 必要に応じて入力フィールドの表示を更新
      var colorPreview = document.getElementById('colorPreview');
      colorPreview.style.backgroundColor = color;
    });
  });
  

  // selectColorCode.addEventListener('change', function() {
  //   if (this.checked) {
  //     selectedOptionField.value = 'color';
  //   }
  // });


  // selectImage.addEventListener('change', function() {
  //   if (this.checked) {
  //     selectedOptionField.value = 'image';
  //   }
  // });

  var colorPicker = document.getElementById('color_code');
  colorPicker.addEventListener('change', function() {
    var color = this.value;
    var colorPreview = document.getElementById('colorPreview');
    colorPreview.style.backgroundColor = color;
  });

  //var imageInput = document.getElementById('image_icon');
  // imageInput.addEventListener('change', function() {
  //   if (this.files && this.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function(e) {
  //       var imagePreview = document.getElementById('imagePreview');
  //       imagePreview.style.backgroundImage = 'url(' + e.target.result + ')';
  //       imagePreview.style.backgroundSize = 'cover';
  //     };
  //     reader.readAsDataURL(this.files[0]);
  //   }
  // });

  // imageInputDiv.addEventListener('click', function(event) {
  //   // クリックされた要素がファイル入力フィールドでない場合にのみラジオボタンを選択
  //   if (event.target.id !== 'image_icon') {
  //     selectImage.checked = true;
  //     updateInputVisibility(); // 入力の可視性を更新
  //   }
  // });
  

  // colorInputDiv.addEventListener('click', function() {
  //   //selectColorCode.checked = true;
  //   updateInputVisibility(); // 入力の可視性を更新
  // });
  

  // ラジオボタンの変更を監視
  //selectImage.addEventListener('change', updateInputVisibility);
  //selectColorCode.addEventListener('change', updateInputVisibility);

  // 初期状態を設定
  //updateInputVisibility();
};
