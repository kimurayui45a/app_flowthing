import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';


const EditItemCanvas = ({ subUserId, canvasImgId, canvasData, canvasSaveData, canvasItemName, canvasItemText, canvasItemChoice, canvasItemEpisode, canvasItemPlace, canvasSizeData }) => {

  const defaultSize = { width: 400, height: 400 };

  // Canvasのサイズを状態として保持
  //const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  // const defaultSize = { width: 400, height: 400 };
  // const [canvasSize, setCanvasSize] = useState(defaultSize);

  // useEffect(() => {
  //   if (!canvasSizeData) {
  //     setCanvasSize(defaultSize);
  //   } else {
  //     try {
  //       let sizeData = JSON.parse(canvasSizeData);
  //       setCanvasSize({
  //         width: sizeData.width || defaultSize.width,
  //         height: sizeData.height || defaultSize.height
  //       });
  //     } catch (error) {
  //       console.error("Failed to parse canvas size data:", error);
  //       setCanvasSize(defaultSize);
  //     }
  //   }
  // }, [canvasSizeData]);

    // canvasSizeDataがnullまたはundefinedならdefaultSizeを、そうでない場合はパースした値を初期値として使用
    const initialCanvasSize = canvasSizeData
    ? JSON.parse(canvasSizeData)
    : defaultSize;

  const [canvasSize, setCanvasSize] = useState(() => {
    const { width, height } = initialCanvasSize;
    return {
      width: width || defaultSize.width,
      height: height || defaultSize.height,
    };
  });

  //canvasの外枠のサイズを決めるもの
  const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1408, height: 792 });


  // 描画データを受け取るための状態
  const [getData, setGetData] = useState(null);

  const [itemName, setItemName] = useState('');
  const [itemText, setItemText] = useState('');
  const [itemEpisode, setItemEpisode] = useState('');
  const [itemPlace, setItemPlace] = useState('');

  //非同期保存
  const [isAsync, setIsAsync] = useState(false);


  //レイヤーセーブできるようにする
  const [notLayerSave, setNotLayerSave] = useState(true);


  //アラートメッセージ
  const [alertToast, setAlertToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //文字数バリデーション
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setItemName(canvasItemName);
    setItemText(canvasItemText);
    setItemEpisode(canvasItemEpisode);
    setItemPlace(canvasItemPlace);
  }, [canvasItemName, canvasItemText, canvasItemEpisode, canvasItemPlace]);


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
    formData.append('item[canvas_size]', JSON.stringify(canvasSize));

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

        // window.location.href = data.redirect_url;
        if (isAsync) {
          //console.log('非同期更新成功:', data);
          // ここで必要な状態更新やUI反映を行う
          handleAlertMessage("途中保存されました");
        } else {
          window.location.href = data.redirect_url; // 同期的なリダイレクト処理
        }

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
            <div className="board-card-background flex-column" style={{ height: "640px" }}>
              <div className="flex-column" style={{ width: '80%' }}>

              <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', marginTop: '60px' }}>
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



              <div  style={{ width: '500px', textAlign: 'left', marginTop: '20px' }}>
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
              // onKeyDown={handleKeyDown}
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

export default EditItemCanvas;