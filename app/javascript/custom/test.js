
document.addEventListener("turbo:load", function() {
  if (document.querySelector('.board-item-form')) {
    boardItemSubmit();
    setupBoardItemChecks();
  }
});


function boardItemSubmit() {
  var submitButton = document.getElementById('submit-button');

  // 各項目が存在するかどうかを確認し、存在する場合のみ値を取得、そうでなければデフォルト値を設定
  var boardTitleEl = document.getElementById('board_title');
  var boardTextEl = document.getElementById('board_text');

  var boardtitle = boardTitleEl ? boardTitleEl.value : null;
  var boardtext = boardTextEl ? boardTextEl.value : null;

  // バリデーション条件を調整
  var isboardTitleValid = boardTitleEl ? boardtitle !== '' : true;
  var isboardTextValid = boardTextEl ? boardtext !== '' : true;

  // 全ての条件を統合してisFormValidを評価
  var isFormValid = isboardTextValid && isboardTitleValid;

  // 送信ボタンの状態を切り替え
  submitButton.disabled = !isFormValid;
}


function setupBoardItemChecks() {
  var elements = [
    { id: 'board_title', event: 'input' },
    { id: 'board_text', event: 'input' }
  ];

  elements.forEach(({ id, event }) => {
    var element = document.getElementById(id);
    if (element) {
      element.addEventListener(event, () => boardItemSubmit());
    }
  });
}

