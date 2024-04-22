import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const EditSpaceCanvas = ({ profileId, canvasImgId, canvasData, canvasSaveData, canvasSpaceName, canvasSpaceText }) => {

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });

  //canvasの外枠のサイズを決めるもの
  const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1408, height: 792 });


  //レイヤーセーブできるようにする
  const [notLayerSave, setNotLayerSave] = useState(true);

  //非同期保存
  const [isAsync, setIsAsync] = useState(false);


  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [spaceName, setSpaceName] = useState('');
  const [spaceText, setSpaceText] = useState('');

  useEffect(() => {
    setSpaceName(canvasSpaceName);
    setSpaceText(canvasSpaceText);
  }, [canvasSpaceName, canvasSpaceText]);

  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault(); // フォームのデフォルト送信を防止

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
      const response = await fetch(`/spaces/${canvasImgId}`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        //window.location.href = data.redirect_url;

        if (isAsync) {
          console.log('非同期更新成功:', data);
          // ここで必要な状態更新やUI反映を行う
          handleAlertMessage("途中保存されました");
        } else {
          window.location.href = data.redirect_url; // 同期的なリダイレクト処理
        }
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


  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleAlertMessage = (text) => {
    // メッセージと表示状態を設定
    setAlertMessage(text);
    setAlertToast(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setAlertToast(false), 4000);
  };

  return (
    <div>
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} key={canvasImgId} canvasImgId={canvasImgId} canvasData={canvasData} canvasSaveData={canvasSaveData} notLayerSave={notLayerSave} />



            {/* 選択背景がない場合のアラートメッセージ */}
            {alertToast && (
              <div
              className="alert-message"
                style={{
                  // position: 'absolute',
                  // left: '50%',
                  // top: '50%',
                  // transform: 'translate(-60%, 40%)',
                  textAlign: 'left',
                  lineHeight: '1.3',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {alertMessage}
              </div>
            )}



<button onClick={() => setIsAsync(true)}>非同期</button>
      <button onClick={() => setIsAsync(false)}>同期</button>


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

export default EditSpaceCanvas;