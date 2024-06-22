import React, { useEffect, useState } from 'react';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5Color } from './P5ColorContext';
import { useP5PenToolParametersContext } from './P5PenToolParametersContext';

const P5ToolSaveBtn = ({ profileId }) => {

  const { 
    automaticMode
  } = useP5PanelGroupContext();

  const { 
    favoritePen,
    favoritePenSecond
  } = useP5ToolModeContext();

  const {
    currentColor,
    secondColorPreview,
    paletteColors9,
    paletteColors18,
    paletteColors27
  } = useP5Color();


  //「詳細設定パラメータコンテキスト」から受け取るもの
  const {
    pressureAdjustment,
    userCustomS,
    userCustomV,
    mmBlur,
    watercolorBlur,
    pencilBlur,
    oilBlur,
    mixBlur,
    pressurePen,
    sizeCustomBool,
    activeS,
    maxChangeSBool,
    maxChangeVBool,
    activeV,
    densityValue,
    waterDensityValue,
    mmDensityValue,
    oilDensityValue,
    mixDensityValue,
    lerpRateMin,
    lerpRateMax,
    rateSize,
    maxChangeS,
    rateS,
    maxChangeV,
    rateV,
    alphaRate,
    alphaDecayRate,
    activeMixAlpha,
    pencilLerpStep,
    pencilNumPoints,
    pencilHeightDot,
    pencilWidthDot,
    pencilAlpha,
    oilLerpStep,
    oilNumPoints,
    oilHeightDot,
    oilWidthDot,
    oilAlpha,
    shapesWidthSize,
    shapesHeightSize,
    alphaDecayBool,
    sMin,
    vMax,
    mixBlurValue
  } = useP5PenToolParametersContext();

  const {
    toolSize,
    minSize
  } = useP5CanvasCoreShare();


  let saveToolData = [];
  //送信時に保存
  const getDataParameters = () => {
    // ツールの設定データをオブジェクトとして構築
    
    saveToolData = {
      
      //パレットグループに送るもの(useP5PanelGroupContext)
      p5PanelGroup: {
        //自動モード
        automaticMode: automaticMode
      },
      
      //ツールモードに送るもの(useP5ToolModeContext)
      p5ToolMode: {
        //お気に入りペン
        favoritePen: favoritePen,
        //お気に入りペン2
        favoritePenSecond: favoritePenSecond
      },
  
      //p5コアに送るもの(useP5CanvasCoreShare)
      p5Core: {
      //ツールサイズ
      toolSize: toolSize,
      minSize: minSize
      },
  
      //カラーに送るもの(useP5Color)
      p5Color: {
      //メインカラー
      currentColor: currentColor,
      secondColorPreview: secondColorPreview,
      //フリーパレット
      paletteColors9: paletteColors9,
      paletteColors18: paletteColors18,
      paletteColors27: paletteColors27
      },

      //パラメータに送るもの(useP5PenToolParametersContext)
      p5ToolParameters: {
      //筆圧関係
      pressureAdjustment: pressureAdjustment,
  
      //s値
      userCustomS: userCustomS,
      maxChangeS: maxChangeS,
      rateS: rateS,
      sMin: sMin,
  
      //V値
      userCustomV: userCustomV,
      maxChangeV: maxChangeV,
      rateV: rateV,
      vMax: vMax,
  
      //「ペンツール」のぼかしbool値
      mmBlur: mmBlur,
      watercolorBlur: watercolorBlur,
      pencilBlur: pencilBlur,
      oilBlur: oilBlur,
      mixBlur: mixBlur,
  
      //「ペンツール」のbool値判定筆圧
      pressurePen: pressurePen,
      sizeCustomBool: sizeCustomBool,
      activeS: activeS,
      maxChangeSBool: maxChangeSBool,
      maxChangeVBool: maxChangeVBool,
      activeV: activeV,
      alphaDecayBool: alphaDecayBool,
  
      //ペンの密度/滑らかさ
      densityValue: densityValue,
      mmDensityValue: mmDensityValue,
      waterDensityValue: waterDensityValue,
      oilDensityValue: oilDensityValue,
      mixDensityValue: mixDensityValue,
  
      //ペンの補間率(筆圧)
      lerpRateMin: lerpRateMin,
      lerpRateMax: lerpRateMax,
      rateSize: rateSize,

      //色混ぜ
      activeMixAlpha: activeMixAlpha,
      alphaRate: alphaRate,
      alphaDecayRate: alphaDecayRate,
      mixBlurValue: mixBlurValue,
  
      //エアブラシ
      pencilLerpStep: pencilLerpStep,
      pencilNumPoints: pencilNumPoints,
      pencilHeightDot: pencilHeightDot,
      pencilWidthDot: pencilWidthDot,
      pencilAlpha: pencilAlpha,
  
      //厚塗りペン
      oilLerpStep: oilLerpStep,
      oilNumPoints: oilNumPoints,
      oilHeightDot: oilHeightDot,
      oilWidthDot: oilWidthDot,
      oilAlpha: oilAlpha,
  
      //図形ツール(縦横)
      shapesWidthSize: shapesWidthSize,
      shapesHeightSize: shapesHeightSize
      }

    };
    return { saveToolData };
  }


// 送信ボタンのイベントハンドラ
// const handleToolBtn = () => {
//   const saveToolData = getDataParameters(); // データ取得と処理を実行
//   console.log('セーブツール', saveToolData); // 送信ロジックなど、必要に応じてデータを使用
// };



  //アラートメッセージ
  const [saveToast, setSaveToast] = useState(false);
  const [saveToastMessage, setSaveToastMessage] = useState("");

  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleToolSavetMessage = (text) => {
    // メッセージと表示状態を設定
    setSaveToastMessage(text);
    setSaveToast(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setSaveToast(false), 3000);
  };



const handleToolBtn = async () => {
  const { saveToolData } = getDataParameters();

  const formData = new FormData();
  formData.append('profile[tool_data]', JSON.stringify(saveToolData));

  try {
    const response = await fetch(`/profiles/${profileId}/update_tool`, {
      method: 'PATCH',
      body: formData,
      headers: {
        'X-React-App': 'true',  // カスタムヘッダー
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'include',
    });

    if (response.ok) {
      handleToolSavetMessage("ツール情報が保存されました。");
      // console.log('保存完了');  // console.errorからconsole.logへの修正
      // console.log('内容', saveToolData);
    } else {
      console.error('送信失敗');
    }
  } catch (error) {
    console.error('エラーが発生しました', error);
  }
};




  
  return (
    <>

{saveToast && (
    <div
    className="alert-message"
      style={{
        position: 'absolute',
        right: '-130px',
        top: '185px',
        // transform: 'translate(-60%, 40%)',
        textAlign: 'left',
        lineHeight: '1.3',
        whiteSpace: 'pre-wrap',
        // marginTop: '20px',
        width: '120px',
        fontSize: '12px'
      }}
    >
      {saveToastMessage}
    </div>
  )}

      <div
        className="panel-tool-button tooltip-container"
        onClick={handleToolBtn}
        onTouchStart={handleToolBtn}
        style={{ position: 'absolute', top: '150px', right: '-130px', zIndex: 78 }}
      >
        <i className="bi bi-hdd-fill"></i>
        <span className="tooltip-text" style={{ textAlign: 'left' }}>ペイントツールの設定状況を保存します。</span>
      </div>
    </>
  );
};


export { P5ToolSaveBtn };