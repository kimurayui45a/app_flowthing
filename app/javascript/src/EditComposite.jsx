import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';

const EditComposite = ({ profileId, itemAllId, spaceAllId, subUserAllId, spaceObject, itemObject, compositeNameLode, compositeTextLode, compositeImage, compositeSpaceId, compositeId, spaceSize }) => {
  
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(true);

  //描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [compositeName, setCompositeName] = useState('');
  const [compositeText, setCompositeText] = useState('');

  const [canvasSpaceSize, setCanvasSpaceSize] = useState(() => {
    switch (spaceSize) {
      case 1400:
        return { width: 1408, height: 770 };
      case 1200:
        return { width: 1150, height: 750 };
      case 1000:
        return { width: 1000, height: 1200 };
      case 700:
        return { width: 850, height: 933 };
      default:
        return { width: 1150, height: 750 }; 
    }
  });



  const [panelPosition, setPanelPosition] = useState(() => {
    switch (spaceSize) {
      case 1400:
        return { 
          list_panel: { x: 850, y: 50 },
          guide_panel: { x: 220, y: 50 },
          custom_panel: { x: 100, y: 100 },
          details_panel: { x: 1120, y: 100 }
        };
      case 1200:
        return {
          list_panel: { x: 850, y: 50 },
          guide_panel: { x: 220, y: 50 },
          custom_panel: { x: 100, y: 100 },
          details_panel: { x: 355, y: 200 }
        };
      case 1000:
        return {
          list_panel: { x: 650, y: 50 },
          guide_panel: { x: 100, y: 100 },
          custom_panel: { x: 200, y: 150 },
          details_panel: { x: 650, y: 480 }
        };
      case 700:
        return {
          list_panel: { x: 450, y: 50 },
          guide_panel: { x: 100, y: 100 },
          custom_panel: { x: 150, y: 150 },
          details_panel: { x:450, y: 470 }
        };
      default:
        return {
          list_panel: { x: 850, y: 50 },
          guide_panel: { x: 220, y: 50 },
          custom_panel: { x: 100, y: 100 },
          details_panel: { x: 355, y: 200 }
        };
    }
  });



  useEffect(() => {
    setCompositeName(compositeNameLode);
    setCompositeText(compositeTextLode);
  }, [compositeNameLode, compositeTextLode]);


  //非同期保存
  const [isAsync, setIsAsync] = useState(false);


  //対象のレイヤーが選択されていない時に出るアラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //文字数バリデーション
  const [isValid, setIsValid] = useState(true);

  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  useEffect(() => {
    const isValidCompositeName = compositeName.length <= 20;
    const isValidCompositeText = compositeText.length <= 2000;

    if (!isValidCompositeName || !isValidCompositeText) {
      handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は2000文字でお願い致します。")
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [compositeName, compositeText]);

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
            //console.log('非同期更新成功:', data);
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

    // console.log("画像データ（送信ボタン）:", dataURL);
    // console.log("アイテムデータ（送信ボタン）:", saveItemData);
    // console.log("背景データ（送信ボタン）:", saveSpaceData);
    // console.log("背景Id（送信ボタン）:", spaceId);
  };


  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleAlertMessage = (text) => {
    // メッセージと表示状態を設定
    setAlertMessage(text);
    setAlertToast(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setAlertToast(false), 5000);
  };


  // エンターキーでのフォーム送信を防ぐための関数
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  

  return (
    <div className="flex-column">


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
        canvasSpaceSize={canvasSpaceSize}
        panelPosition={panelPosition}
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
                  whiteSpace: 'pre-wrap',
                  marginTop: '20px'
                }}
              >
                {alertMessage}
              </div>
            )}


      {/* form */}
      <form onSubmit={handleTriggerGetData}>
      <div className="form-card" style={{ marginTop: '60px' }}>
          <div className="board-card-background flex-column" style={{ height: '500px' }}>
            <div className="flex-column" style={{ width: '80%' }}>

          <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', marginBottom: '20px', marginTop: '70px' }}>
            <div
              className= "panel-tool-button-small tooltip-container midasi-t-five"
              onClick={() => setIsAsync(true)}
              onTouchStart={() => setIsAsync(true)}
              style={{
                backgroundColor: isAsync ? '#9199AE' : '#c2c1c1',
                borderRadius: '5px 0px 0px 5px',
                borderRight: '0.5px solid #4A4A4A',
                width: '80px',
                height: '40px',
                
              }}
            >
              <span style={{ color: '#3e3e3e' }}>途中保存</span>
              <span className="tooltip-text" style={{ textAlign: 'left' }}>送信後のリダイレクトが発生せず、送信後引き続き作業できます。</span>
            </div>

            <div
              className= "panel-tool-button-small tooltip-container midasi-t-five"
              onClick={() => setIsAsync(false)}
              onTouchStart={() => setIsAsync(false)}
              style={{
                backgroundColor: !isAsync ? '#9199AE' : '#c2c1c1',
                borderRadius: '0px 5px 5px 0px',
                borderLeft: '0.5px solid #4A4A4A',
                width: '80px',
                height: '40px'
              }}
            >

              <span style={{ color: '#3e3e3e' }}>通常保存</span>
              
              <span className="tooltip-text" style={{ textAlign: 'left' }}>送信後のリダイレクトが発生するため作業終了となります。</span>
            </div>
          </div>

          <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left', marginTop: '20px' }}>
            <div style={{ fontWeight: "500" }}><span className="midasi-t-five">命名(最大20文字)</span> <span className="red-text">※必須</span></div>
              <input
                type="text"
                value={compositeName}
                onChange={(e) => setCompositeName(e.target.value)}
                onKeyDown={handleKeyDown}
                className='form-control board-item-form'
              />
          </div>

          <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left' }}>
            <div><span className="midasi-t-five">コメント(最大2000文字) ※任意</span></div>
            <textarea
              value={compositeText}
              onChange={(e) => setCompositeText(e.target.value)}
              //onKeyDown={handleKeyDown}
              className='form-control board-item-form'
              style={{ height: '270px', resize: 'none', marginBottom: '20px' }}
            />
          </div>
          </div>
          </div>
        </div>


        {compositeName.trim() ? (
          <button type="submit" className="btn btn-primary" style={{ marginTop: '60px' }}>データ送信</button>
        ) : (
          <button className="btn btn-primary" style={{ marginTop: '60px' }} disabled>送信不可</button>
        )}

    </form>
    </div>
  );
};

export default EditComposite;