import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const NewSpaceCreate = ({ profileId, spaceSize, toolDateParameters }) => {

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });

  //canvasの外枠のサイズを決めるもの
  //const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1408, height: 792 });


  const [canvasSpaceSize, setCanvasSpaceSize] = useState(() => {
    switch (spaceSize) {
      case 1400:
        return { width: 1408, height: 770 };
      case 1200:
        return { width: 1150, height: 750 };
      case 1000:
        return { width: 1000, height: 1200 };
      case 700:
        return { width: 700, height: 933 };
      default:
        return { width: 1150, height: 750 }; 
    }
  });


const [panelPosition, setPanelPosition] = useState(() => {
  switch (spaceSize) {
    case 1400:
      return { 
        main_pane: { x: 850, y: 50 },
        layers_info_panel: { x: 1140, y: 300 },
        color_palette_panel: { x: 400, y: 350 },
        scale_panel_position: { x: 1140, y: 50 },
        detail_panel_position: { x: 100, y: 300 },
        size_panel_position: { x: 100, y: 50, width: 250, height: 170 }
      };
    case 1200:
      return {
        main_pane: { x: 600, y: 40 },
        layers_info_panel: { x: 890, y: 290 },
        color_palette_panel: { x: 330, y: 340 },
        scale_panel_position: { x: 890, y: 40 },
        detail_panel_position: { x: 50, y: 290 },
        size_panel_position: { x: 50, y: 40, width: 250, height: 170 }
      };
    case 1000:
      return {
        main_pane: { x: 720, y: 310 },
        layers_info_panel: { x: 720, y: 740 },
        color_palette_panel: { x: 330, y: 40 },
        scale_panel_position: { x: 650, y: 50 },
        detail_panel_position: { x: 30, y: 450 },
        size_panel_position: { x: 30, y: 200, width: 250, height: 170 }
      };
    case 700:
      return {
        main_pane: { x: 440, y: 250 },
        layers_info_panel: { x: 240, y: 500 },
        color_palette_panel: { x: 330, y: 40 },
        scale_panel_position: { x: 330, y: 10 },
        detail_panel_position: { x: 30, y: 330 },
        size_panel_position: { x: 30, y: 80, width: 250, height: 170 }
      };
    default:
      return {
        main_pane: { x: 600, y: 40 },
        layers_info_panel: { x: 890, y: 290 },
        color_palette_panel: { x: 330, y: 340 },
        scale_panel_position: { x: 890, y: 40 },
        detail_panel_position: { x: 50, y: 290 },
        size_panel_position: { x: 50, y: 40, width: 250, height: 170 }
      };
  }
});


  //レイヤーセーブできるようにする
  const [notLayerSave, setNotLayerSave] = useState(true);


  //ツールをセーブできるようにする
  const [activeSave, setActiveSave] = useState(true);

  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [spaceName, setSpaceName] = useState('');
  const [spaceText, setSpaceText] = useState('');


  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };


  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //文字数バリデーション
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const isValidSpaceName = spaceName.length <= 20;
    const isValidSpaceText = spaceText.length <= 2000;

    if (!isValidSpaceName || !isValidSpaceText) {
      handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は2000文字でお願い致します。")
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [spaceName, spaceText]);

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
        console.error('保存失敗');
        handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は2000文字でお願い致します。")
      }
    } catch (error) {
      console.error('エラーが発生しました', error);
    }
    // console.log("DataURL:", dataURL);
    // console.log("Saved Layers Data:", saveLayersData);
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
    setTimeout(() => setAlertToast(false), 5000);
  };

  return (
    <div className="flex-column">
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} notLayerSave={notLayerSave} panelPosition={panelPosition} toolDateParameters={toolDateParameters} profileId={profileId} activeSave={activeSave} />

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
            <div className="board-card-background flex-column">
              <div className="flex-column" style={{ width: '80%' }}>


                {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}
                <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left', marginTop: '65px' }}>
                  <div style={{ fontWeight: "500" }}><span className="midasi-t-five">命名(最大20文字)</span> <span className="red-text">※必須</span></div>
                    <input
                      type="text"
                      value={spaceName}
                      onChange={(e) => setSpaceName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className='form-control board-item-form'
                    />
                </div>

                <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left' }}>
                  <div><span className="midasi-t-five">コメント(最大2000文字) ※任意</span></div>
                  <textarea
                    value={spaceText}
                    onChange={(e) => setSpaceText(e.target.value)}
                    // onKeyDown={handleKeyDown}
                    className='form-control board-item-form'
                    style={{ height: '270px', resize: 'none', marginBottom: '20px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {spaceName.trim() ? (
            <button type="submit" className="btn btn-primary" style={{ marginTop: '60px', marginBottom: '60px' }}>保存</button>
          ) : (
            <button className="btn btn-primary" style={{ marginTop: '60px', marginBottom: '60px' }} disabled>保存不可</button>
          )}

        </form>
    </div>
  );
};

export default NewSpaceCreate;