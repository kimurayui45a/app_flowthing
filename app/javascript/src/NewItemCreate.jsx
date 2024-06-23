import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const NewItemCreate = ({ subUserId, spaceSize, toolDateParameters, profileId }) => {


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


  // useEffect(() => {
  //   console.log('サイズ作業', spaceSize)
  // }, []);
  
  

  // Canvasのサイズを状態として保持
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });


  const [canvasSizeWidth, setCanvasSizeWidth] = useState(400);
  const [canvasSizeHeight, setCanvasSizeHeight] = useState(400);
  const [inputCanvasSizeWidth, setInputCanvasSizeWidth] = useState(String(canvasSizeWidth));
  const [inputCanvasSizeHeight, setInputCanvasSizeHeight] = useState(String(canvasSizeHeight));

  useEffect(() => {
    setInputCanvasSizeWidth(String(canvasSizeWidth));
    setInputCanvasSizeHeight(String(canvasSizeHeight));
    setCanvasSize({ width: canvasSizeWidth, height: canvasSizeHeight });
  }, [canvasSizeWidth, canvasSizeHeight]);
  
  
  const [canvasToolSet, setCanvasToolSet] = useState(false);


  //canvasの外枠のサイズを決めるもの（更新）
  //const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1408, height: 792 });
  //const [canvasSizeSelect, setCanvasSizeSelect] = useState('pc');

  //コントロールパネルの初期位置（更新）
  // const [panelPosition, setPanelPosition] = useState({
  //   main_pane: { x: 850, y: 50 },
  //   layers_info_panel: { x: 1140, y: 300 },
  //   color_palette_panel: { x: 400, y: 350 },
  //   scale_panel_position: { x: 1140, y: 50 },
  //   detail_panel_position: { x: 100, y: 300 },
  //   size_panel_position: { x: 100, y: 50, width: 250, height: 170 }
  // });


  //レイヤーとツールをセーブできるようにする
  const [notLayerSave, setNotLayerSave] = useState(true);
  const [activeSave, setActiveSave] = useState(true);



//ここでcanvasSizeを指定する処理
const updateAlphaRate = (newSize, direction) => {
  if (newSize >= 50 && newSize <= 700) {
    if (direction === 'width') {
      setCanvasSizeWidth(newSize);
      setInputCanvasSizeWidth(String(newSize));
    } else {
      setCanvasSizeHeight(newSize);
      setInputCanvasSizeHeight(String(newSize));
    }
  }
};

const handleCanvasSizeChange = (e, direction) => {
  const value = e.target.value;
  if (direction === 'width') {
    setInputCanvasSizeWidth(String(value));
  } else {
    setInputCanvasSizeHeight(String(value));
  }
};

const handleCanvasSize = (inputSize, direction) => {
  const newSize = parseInt(inputSize, 10);
  if (newSize >= 50 && newSize <= 700) {
    updateAlphaRate(newSize, direction);
  } else {
    if (direction === 'width') {
      setInputCanvasSizeWidth(String(canvasSizeWidth));
    } else {
      setInputCanvasSizeHeight(String(canvasSizeHeight));
    }
  }
};

//作業範囲のサイズを選択（更新）
// const handleCanvasSizeSelect = (selectSize) => {
//   setCanvasSizeSelect(selectSize)

//   if (selectSize === 'pc') {
//     setCanvasSpaceSize({ width: 1408, height: 770 });
//     setPanelPosition({
//       main_pane: { x: 850, y: 50 },
//       layers_info_panel: { x: 1140, y: 300 },
//       color_palette_panel: { x: 400, y: 350 },
//       scale_panel_position: { x: 1140, y: 50 },
//       detail_panel_position: { x: 100, y: 300 },
//       size_panel_position: { x: 100, y: 50, width: 250, height: 170 }
//     })

//   } else if (selectSize === 'miniPc') {
//     setCanvasSpaceSize({ width: 1150, height: 750 });
//     setPanelPosition({
//       main_pane: { x: 600, y: 40 },
//       layers_info_panel: { x: 890, y: 290 },
//       color_palette_panel: { x: 330, y: 340 },
//       scale_panel_position: { x: 890, y: 40 },
//       detail_panel_position: { x: 50, y: 290 },
//       size_panel_position: { x: 50, y: 40, width: 250, height: 170 }
//     })
    
//   } else if (selectSize === 'ipad') {
//     setCanvasSpaceSize({ width: 1000, height: 1200 });
//     setPanelPosition({
//       main_pane: { x: 720, y: 310 },
//       layers_info_panel: { x: 720, y: 740 },
//       color_palette_panel: { x: 330, y: 40 },
//       scale_panel_position: { x: 650, y: 50 },
//       detail_panel_position: { x: 30, y: 450 },
//       size_panel_position: { x: 30, y: 200, width: 250, height: 170 }
//     })

//   } else {
//     setCanvasSpaceSize({ width: 700, height: 933 });
//     setPanelPosition({
//       main_pane: { x: 440, y: 250 },
//       layers_info_panel: { x: 240, y: 500 },
//       color_palette_panel: { x: 330, y: 40 },
//       scale_panel_position: { x: 330, y: 10 },
//       detail_panel_position: { x: 30, y: 330 },
//       size_panel_position: { x: 30, y: 80, width: 250, height: 170 }
//     })
//   }
// };


//決定ボタンでcanvasSizeが決定し、canvasToolSetをtrueにする
const handleCanvasSizeButton = () => {
  setCanvasToolSet(true);
};



  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //文字数バリデーション
  const [isValid, setIsValid] = useState(true);



  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [itemName, setItemName] = useState('');
  const [itemText, setItemText] = useState('');
  const [itemEpisode, setItemEpisode] = useState('');
  const [itemPlace, setItemPlace] = useState('');


  useEffect(() => {
    const isValidItemName = itemName.length <= 20;
    const isValidItemText = itemText.length <= 10000;
    const isValidItemEpisode = itemEpisode.length <= 50;
    const isValidItemPlace = itemPlace.length <= 50000;

    if (!isValidItemName || !isValidItemText  || !isValidItemEpisode  || !isValidItemPlace) {
      handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は最大10000文字、「場所」は最大50文字、「エピソード」は最大50000文字でお願い致します。")
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [itemName, itemText, itemEpisode, itemPlace]);



  // 孫コンポーネントからデータを受け取るための関数
  const handleDataFromGrandchild = (getDataFunc) => {
    setGetData(() => getDataFunc);
  };

  //送信処理
  const handleTriggerGetData = async (event) => {
    const { dataURL, saveLayersData } = getData();
    event.preventDefault(); // フォームのデフォルト送信を防止
    const itemChoice = 'item_canvas';
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
    formData.append('item[canvas_size]', JSON.stringify(canvasSize));

    
    if (saveLayersData) {
      formData.append('item[item_save_canvas]', JSON.stringify(saveLayersData));
  } else {
      formData.append('item[item_save_canvas]', '');
  }
  

    try {
      const response = await fetch('/items', {
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
        handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は最大10000文字、「場所」は最大50文字、「エピソード」は最大50000文字でお願い致します。")
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
      {/* <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} notLayerSave={notLayerSave} /> */}


      {canvasToolSet ? ( 
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} notLayerSave={notLayerSave} panelPosition={panelPosition} toolDateParameters={toolDateParameters} profileId={profileId} activeSave={activeSave} />
    ) : (
      <>
        <div className="canvas-select flex-column">
          <div className="canvas-select-title"><span>canvasサイズ選択</span></div>

          <div className="flex-between"  style={{ width: '200px', margin: '20px' }}>
            <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <span className="text-Rounded" style={{ fontSize: '16px', color: '#7f7f7f' }}>横幅</span>
              <input
                className="no-drag form-select-value"
                type="number"
                min="50"
                max="700"
                step="1"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputCanvasSizeWidth}
                onChange={(e) => handleCanvasSizeChange(e, 'width')}
                onBlur={() => handleCanvasSize(inputCanvasSizeWidth, 'width')}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>調整範囲：50〜700</span>
            </div>

            <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <span className="text-Rounded" style={{ fontSize: '16px', color: '#7f7f7f' }}>縦幅</span>
              <input
                className="no-drag form-select-value"
                type="number"
                min="50"
                max="700"
                step="1"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputCanvasSizeHeight}
                onChange={(e) => handleCanvasSizeChange(e, 'height')}
                onBlur={() => handleCanvasSize(inputCanvasSizeHeight, 'height')}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>調整範囲：50〜700</span>
            </div>
          </div>

          {/* 決定ボタン */}
          <div
            className="select-confirm-btn"
            onClick={handleCanvasSizeButton}
            onTouchStart={handleCanvasSizeButton}
            style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '10px' }}
          >
            決定
          </div>
        </div>
      </>
    )}






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
              marginTop: '20px',
              width: '500px'
            }}
          >
            {alertMessage}
          </div>
        )}



      {/* form */}
      <form id="item_create_form" onSubmit={handleTriggerGetData}>
        {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}

        <div className="form-card" style={{ marginTop: '60px' }}>
            <div className="board-card-background flex-column" style={{ height: "600px" }}>
              <div className="flex-column" style={{ width: '80%' }}>

          <div  style={{ width: '500px', textAlign: 'left', marginTop: '60px' }}>
            <div><span className="midasi-t-five">命名(最大20文字) ※任意</span></div>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={handleKeyDown}
                className='form-control board-item-form'
              />
          </div>
          

          <div  style={{ width: '500px', textAlign: 'left' }}>
            <div><span className="midasi-t-five">コメント(最大10000文字) ※任意</span></div>
            <textarea
              value={itemText}
              onChange={(e) => setItemText(e.target.value)}
              // onKeyDown={handleKeyDown}
              className='form-control board-item-form'
              style={{ height: '100px', resize: 'none', marginBottom: '20px' }}
            />
          </div>

          <div  style={{ width: '500px', textAlign: 'left' }}>
            <div><span className="midasi-t-five">場所(最大50文字) ※任意</span></div>
            <input
              value={itemPlace}
              onChange={(e) => setItemPlace(e.target.value)}
              onKeyDown={handleKeyDown}
              className='form-control board-item-form'
              style={{ resize: 'none', marginBottom: '20px' }}
            />
          </div>


          <div style={{ marginBottom: '20px', width: '500px', textAlign: 'left' }}>
            <div style={{ fontWeight: "500" }}><span className="midasi-t-five">エピソード(最大50000文字)</span> <span className="red-text">※必須</span></div>
            <textarea
              value={itemEpisode}
              onChange={(e) => setItemEpisode(e.target.value)}
              //onKeyDown={handleKeyDown}
              className='form-control board-item-form'
              style={{ height: '230px', resize: 'none', marginBottom: '20px' }}
            />
          </div>
        </div>
      </div>
    </div>


        {itemEpisode.trim() ? (
            <button type="submit" className="btn btn-primary" style={{ marginTop: '60px' }}>データ送信</button>
          ) : (
            <button className="btn btn-primary" style={{ marginTop: '60px' }} disabled>送信不可</button>
          )}


      </form>
    </div>
  );
};

export default NewItemCreate;