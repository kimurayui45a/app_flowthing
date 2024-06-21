import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const NewProfileCanvas = ({ spaceSize, canvasImgId }) => {

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

    //非同期保存
    const [isAsync, setIsAsync] = useState(false);


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









  //レイヤーセーブできないようにする
  const [notLayerSave, setNotLayerSave] = useState(false);

  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);


  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };


  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");



  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL} = getData();
    event.preventDefault();


    const formData = new FormData(event.target);
    formData.append('profile[profile_canvas]', dataURL);

  //   if (saveLayersData) {
  //     formData.append('space[space_save_canvas]', JSON.stringify(saveLayersData));
  // } else {
  //     formData.append('space[space_save_canvas]', '');
  // }
  

    try {
      const response = await fetch(`/profiles/${canvasImgId}/update_icon`, {
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
          // console.log('非同期更新成功:', data);
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
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} notLayerSave={notLayerSave} panelPosition={panelPosition} key={canvasImgId} canvasImgId={canvasImgId} />

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


          <button type="submit" className="btn btn-primary" style={{ marginTop: '60px' }}>データ送信</button>


        </form>
    </div>
  );
};

export default NewProfileCanvas;