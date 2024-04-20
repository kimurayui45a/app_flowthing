import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';

const EditComposite = ({ profileId, itemAllId, spaceAllId, subUserAllId, spaceObject, itemObject, compositeNameLode, compositeTextLode, compositeImage, compositeSpaceId, compositeId }) => {
  
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(true);

  //描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [compositeName, setCompositeName] = useState('');
  const [compositeText, setCompositeText] = useState('');


  useEffect(() => {
    setCompositeName(compositeNameLode);
    setCompositeText(compositeTextLode);
  }, [compositeNameLode, compositeTextLode]);


  //非同期保存
  const [isAsync, setIsAsync] = useState(false);


  //対象のレイヤーが選択されていない時に出るアラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveItemData, saveSpaceData, spaceId } = getData();
    event.preventDefault();

    if (spaceId !== null) {
      const formData = new FormData(event.target);
      formData.append('composite[profile_id]', profileId);
      formData.append('composite[space_id]', spaceId);

      formData.append('composite[composite_name]', compositeName);
      formData.append('composite[composite_text]', compositeText);

      formData.append('composite[composite_image]', dataURL);

      formData.append('composite[composite_item]', JSON.stringify(saveItemData));
      formData.append('composite[composite_space]', JSON.stringify(saveSpaceData));


      try {
        const response = await fetch(`/composites/${compositeId}`, {
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

    // ここで取得したデータを使う（例えば、サーバーに送信するなど）
    // console.log("送信された:");
    } else {
      handleAlertMessage("背景の選択は必須です。");
    }

    console.log("画像データ（送信ボタン）:", dataURL);
    console.log("アイテムデータ（送信ボタン）:", saveItemData);
    console.log("背景データ（送信ボタン）:", saveSpaceData);
    console.log("背景Id（送信ボタン）:", spaceId);
  };


  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleAlertMessage = (text) => {
    // メッセージと表示状態を設定
    setAlertMessage(text);
    setAlertToast(true);
  
    // 一定時間後にメッセージを非表示にする
    // setTimeout(() => setAlertToast(false), 4000);
  };


  // エンターキーでのフォーム送信を防ぐための関数
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  

  return (
    <div style={{ position: 'relative' }}>


      <PixiSet
        itemAllId={itemAllId}
        spaceAllId={spaceAllId}
        subUserAllId={subUserAllId}
        onDataFromGrandchild={handleDataFromGrandchild}
        pixiMode={pixiMode}
        key={compositeId}
        compositeId={compositeId}
        spaceObject={spaceObject}
        itemObject={itemObject}
        compositeName={compositeName}
        compositeText={compositeText}
      />




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
          value={compositeName}
          onChange={(e) => setCompositeName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={compositeText}
          onChange={(e) => setCompositeText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        

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

        { !compositeName.trim() ? (
          <div>ダミーの送信ボタン</div>
        ) : (
          <button type="submit">データ送信</button>
        )}

    </form>
    </div>
  );
};

export default EditComposite;