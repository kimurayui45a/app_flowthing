import React, { useState, useEffect } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const PeintSubUserCanvas = ({ profileId, canvasImgId, canvasSubUserName, canvasSubUserText, canvasData }) => {



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

  //文字数バリデーション
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setSubUserName(canvasSubUserName);
    setSubUserText(canvasSubUserText);
  }, [canvasSubUserName, canvasSubUserText]);


  useEffect(() => {
    const isValidUserName = subUserName.length <= 20;
    const isValidUserText = subUserText.length <= 2000;

    if (!isValidUserName || !isValidUserText) {
      handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は2000文字でお願い致します。")
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [subUserName, subUserText]);


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
        handleAlertMessage("文字数が上限を超えています。\n「命名」は最大20文字、「コメント」は2000文字でお願い致します。")
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
    setTimeout(() => setAlertToast(false), 5000);
  };

  return (
    <div className="flex-column">
      <P5CanvasSet canvasSize={canvasSize} onDataFromGrandchild={handleDataFromGrandchild} canvasSpaceSize={canvasSpaceSize} key={canvasImgId} canvasImgId={canvasImgId} notLayerSave={notLayerSave} canvasData={canvasData} />

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

              {/* エンターキーでの送信を防ぐためにonKeyPressイベントを追加 */}
              <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left' }}>
                <div><span className="midasi-t-five">命名(最大20文字) ※任意</span></div>
                  <input
                    type="text"
                    value={subUserName}
                    onChange={(e) => setSubUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='form-control board-item-form'
                  />
              </div>

              <div  style={{ marginBottom: '20px', width: '500px', textAlign: 'left' }}>
                <div><span className="midasi-t-five">コメント(最大2000文字) ※任意</span></div>
                <textarea
                  value={subUserText}
                  onChange={(e) => setSubUserText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='form-control board-item-form'
                  style={{ height: '270px', resize: 'none', marginBottom: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>


        {isValid ? (
          <button type="submit" className="btn btn-primary" style={{ marginTop: '60px' }}>データ送信</button>
        ) : (
          <button className="btn btn-primary" style={{ marginTop: '60px' }} disabled>送信不可</button>
        )}

      </form>
    </div>
  );
};

export default PeintSubUserCanvas;