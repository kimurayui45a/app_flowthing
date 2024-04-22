import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const EditSubUserCanvas = ({ profileId, canvasImgId, canvasSubUserName, canvasSubUserText }) => {



  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  //canvasの外枠のサイズを決めるもの
  const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1408, height: 792 });


  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [subUserName, setSubUserName] = useState('');
  const [subUserText, setSubUserText] = useState('');

  //レイヤーセーブできないようにする
  const [notLayerSave, setNotLayerSave] = useState(false);

  //非同期保存
  const [isAsync, setIsAsync] = useState(false);


  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setSubUserName(canvasSubUserName);
    setSubUserText(canvasSubUserText);
  }, [canvasSubUserName, canvasSubUserText]);

  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault(); // フォームのデフォルト送信を防止
    const subUserChoice = 'sub_canvas';
    const subUserImage = '';
    const subUserColor = '';

    const formData = new FormData(event.target);
    formData.append('sub_user[profile_id]', profileId);
    formData.append('sub_user[sub_canvas]', dataURL);
    formData.append('sub_user[sub_name]', subUserName);
    formData.append('sub_user[sub_text]', subUserText);
    formData.append('sub_user[icon_choice]', subUserChoice);
    formData.append('sub_user[sub_color]', subUserColor);
    formData.append('sub_user[sub_image]', subUserImage);

    try {
      const response = await fetch(`/sub_users/${canvasImgId}`, {
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

        // window.location.href = data.redirect_url;
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
    console.log("Saved Layers Data:", saveLayersData);
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
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} key={canvasImgId} canvasImgId={canvasImgId} notLayerSave={notLayerSave} />


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
          value={subUserName}
          onChange={(e) => setSubUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={subUserText}
          onChange={(e) => setSubUserText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button type="submit">データ送信</button>

    </form>
    </div>
  );
};

export default EditSubUserCanvas;