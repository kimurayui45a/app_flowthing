import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';

const NewCompositeCreate = ({ profileId, itemAllId, spaceAllId }) => {
  
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(true);

  //描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [compositeName, setCompositeName] = useState('');
  const [compositeText, setCompositeText] = useState('');


  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('composite[profile_id]', profileId);

    formData.append('composite[composite_name]', compositeName);
    formData.append('composite[composite_text]', compositeText);

    //保留
    formData.append('composite[space_canvas]', dataURL);

    if (saveLayersData) {
      formData.append('composite[space_save_canvas]', JSON.stringify(saveLayersData));
  } else {
      formData.append('composite[space_save_canvas]', '');
  }
  

    try {
      const response = await fetch('/composites', {
        method: 'POST',
        body: formData,
        headers: {
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
      <PixiSet itemAllId={itemAllId} spaceAllId={spaceAllId} onDataFromGrandchild={handleDataFromGrandchild} pixiMode={pixiMode} />

      {/* form */}

      <form onSubmit={handleTriggerGetData}>
        {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}
        <input
          type="text"
          value={compositeName}
          onChange={(e) => setCompositeName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={compositeText}
          onChange={(e) => setCompositeText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        
        { !compositeName.trim() ? (
          <div>ダミーの送信ボタン</div>
        ) : (
          <button type="submit">データ送信</button>
        )}

    </form>
    </div>
  );
};

export default NewCompositeCreate;