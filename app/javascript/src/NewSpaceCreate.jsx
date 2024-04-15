import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const NewSpaceCreate = ({ profileId }) => {

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 750 });

  //canvasの外枠のサイズを決めるもの
  const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1400, height: 1050 });

    //canvasのドラッグ範囲のサイズを決めるもの
    const [canvasDragSpaceSize, setCanvasDragSpaceSize] = useState({ width: 800, height: 600 });

  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [spaceName, setSpaceName] = useState('');
  const [spaceText, setSpaceText] = useState('');


  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('space[profile_id]', profileId);
    formData.append('space[space_canvas]', dataURL);
    formData.append('space[space_name]', spaceName);
    formData.append('space[space_text]', spaceText);

    if (saveLayersData) {
      formData.append('space[space_save_canvas]', JSON.stringify(saveLayersData));
  } else {
      formData.append('space[space_save_canvas]', '');
  }
  

    try {
      const response = await fetch('/spaces', {
        method: 'POST',
        body: formData,
        headers: {
          'X-React-App': 'true',//カスタムヘッダー
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirect_url;
      } else {
        console.error('送信失敗');
      }
    } catch (error) {
      console.error('エラーが発生しました', error);
    }
    console.log("DataURL:", dataURL);
    console.log("Saved Layers Data:", saveLayersData);
    // ここで取得したデータを使う（例えば、サーバーに送信するなど）
  };


  // エンターキーでのフォーム送信を防ぐための関数
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div>
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} canvasDragSpaceSize={canvasDragSpaceSize}/>

      {/* form */}

      <form onSubmit={handleTriggerGetData}>
        {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}
        <input
          type="text"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={spaceText}
          onChange={(e) => setSpaceText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        
        { !spaceName.trim() ? (
          <div>ダミーの送信ボタン</div>
        ) : (
          <button type="submit">データ送信</button>
        )}

    </form>
    </div>
  );
};

export default NewSpaceCreate;