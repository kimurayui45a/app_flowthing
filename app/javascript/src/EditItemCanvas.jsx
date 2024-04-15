import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const EditItemCanvas = ({ subUserId, canvasImgId, canvasData, canvasSaveData, canvasItemName, canvasItemText, canvasItemChoice, canvasItemEpisode, canvasItemPlace }) => {

  // subUserIdが取得できているかの確認
  // useEffect(() => {
  //   console.log("Received subUserId:", subUserId);
  // }, [subUserId]); 

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  //canvasの外枠のサイズを決めるもの
  const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1200, height: 1000 });

    //canvasのドラッグ範囲のサイズを決めるもの
    const [canvasDragSpaceSize, setCanvasDragSpaceSize] = useState({ width: 800, height: 600 });

  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [itemName, setItemName] = useState('');
  const [itemText, setItemText] = useState('');
  const [itemEpisode, setItemEpisode] = useState('');
  const [itemPlace, setItemPlace] = useState('');

  useEffect(() => {
    setItemName(canvasItemName);
    setItemText(canvasItemText);
    setItemEpisode(canvasItemEpisode);
    setItemPlace(canvasItemPlace);
  }, [canvasItemName, canvasItemText, canvasItemEpisode, canvasItemPlace]);

  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault(); // フォームのデフォルト送信を防止
    const itemChoice = canvasItemChoice;
    const itemImage = '';

    const formData = new FormData(event.target);
    formData.append('item[sub_user_id]', subUserId);
    formData.append('item[item_canvas]', dataURL);
    formData.append('item[item_name]', itemName);
    formData.append('item[item_text]', itemText);
    formData.append('item[image_choice]', itemChoice);
    formData.append('item[episode]', itemEpisode);
    formData.append('item[item_place]', itemPlace);
    formData.append('item[item_image]', itemImage);

    if (saveLayersData) {
      formData.append('item[item_save_canvas]', JSON.stringify(saveLayersData));
  } else {
      formData.append('item[item_save_canvas]', '');
  }
  

    try {
      const response = await fetch(`/items/${canvasImgId}`, {
        method: 'PATCH',
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
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} canvasDragSpaceSize={canvasDragSpaceSize} key={canvasImgId} canvasImgId={canvasImgId} canvasData={canvasData} canvasSaveData={canvasSaveData} />

      {/* form */}

      <form id="item_create_form" onSubmit={handleTriggerGetData}>
        {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="text"
          value={itemPlace}
          onChange={(e) => setItemPlace(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={itemEpisode}
          onChange={(e) => setItemEpisode(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        
        { !itemEpisode.trim() ? (
          <div>ダミーの送信ボタン</div>
        ) : (
          <button type="submit">データ送信</button>
        )}

    </form>
    </div>
  );
};

export default EditItemCanvas;