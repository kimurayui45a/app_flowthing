import React, { useEffect, useState, useRef } from 'react';
import { PenToolShareValueComponent } from './PenToolShareValueComponent';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
//import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
// import { useP5Color } from '../P5ColorContext';
// import { useP5PanelGroupContext } from '../P5PanelGroupContext';


const DetailMixPenBlock = () => {

  // const { 
  //   //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
  //   toolSize
  //   } = useP5CanvasCoreShare();

  const {
    //詳細パネル（ペンツール...ぼかし、ミリペン、水彩ペン、エアブラシ、厚塗りペン、色混ぜ）
    inputMixBlurValue, 

    //詳細パネル（ペンツール...指先・色混ぜツール）
    alphaRate,
    setAlphaRate,
    inputAlphaRate,
    setInputAlphaRate,
    setAlphaDecayRate,
    inputMixDensityValue,
    setMixPenDescription,
    handlePenToolDescription,
    setMixDensityValue,
    activeMixAlpha,
    setActiveMixAlpha,

    //「ペンツール」のbool値判定（ぼかし）
    mixBlur,
    setMixBlur,
    setInputMixBlurValue,
    setMixBlurValue,
    mixBlurValue
  } = useP5PenToolParametersContext();



  //指先・色混ぜツール
  //色混ぜに透明度をつける
  const updateAlphaRate = (newSize) => {
    if (newSize >= 0 && newSize <= 100) {
      setAlphaRate(newSize);
      setInputAlphaRate(String(newSize));
    }
  };

  const handleLerpAlphaRateChange = (e) => {
    const value = e.target.value;
    setInputAlphaRate(value);
  };

  const handleLerpAlphaRateBlur = () => {
    const newSize = parseInt(inputAlphaRate, 10);
    if (newSize >= 0 && newSize <= 100) {
      updateAlphaRate(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputAlphaRate(String(alphaRate));
    }
  };


  //徐々に透明度を下げる
  // const updateAlphaDecayRate = (newSize) => {
  //   if (newSize >= 0 && newSize <= 10) {
  //     setAlphaDecayRate(newSize);
  //     setInputAlphaDecayRate(String(newSize));
  //   }
  // };

  // const handleLerpAlphaDecayRateChange = (e) => {
  //   const value = e.target.value;
  //   setInputAlphaDecayRate(value);
  // };

  // const handleLerpAlphaDecayRateBlur = () => {
  //   let newSize = parseFloat(inputAlphaDecayRate);
  //   // 0.5の倍数に変換
  //   newSize = Math.round(newSize * 2) / 2;
    
  //   // 範囲の確認と更新
  //   if (newSize >= 0 && newSize <= 10) {
  //     updateAlphaDecayRate(newSize);
  //   } else {
  //     // 無効な値または空の場合、最後の有効な値にリセット
  //     setInputAlphaDecayRate(String(alphaDecayRate));
  //   }
  // };


  //「全ての値」を初期値に戻す
  const resetAlphaDecayValue = () => {
    setAlphaRate(255);
    setAlphaDecayRate(5);
    setMixDensityValue(20);
    setMixBlurValue(1);
  }


  //透明度を徐々に下げる
  // const handlAlphaDecayBoolChange = () => {
  //   setAlphaDecayBool(!alphaDecayBool);
  // }

  //透明度に筆圧をつける
  const handlActiveMixAlphaChange = () => {
    setActiveMixAlpha(!activeMixAlpha);
  }


  //ぼかしフォーム処理
  const updateBlurValue = (newValue) => {
    if (newValue >= 0 && newValue <= 5) {
      setMixBlurValue(newValue);
      setInputMixBlurValue(String(newValue));
    }
  };

  const handleLerpBlurValueChange = (e) => {
    const value = e.target.value;
    setInputMixBlurValue(value);
  };


  const handleLerpBlurValueBlur = () => {
    const inputNewValue = parseFloat(inputMixBlurValue);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0 && newValue <= 5) {
      updateBlurValue(newValue);
      
    } else {
      setInputMixBlurValue(String(mixBlurValue));
    }
  };


  return (
    <>
      <div
        style={{ lineHeight: '0.7', textAlign: 'left', marginTop: '15px' }}
        onMouseEnter={() => handlePenToolDescription(setMixPenDescription, '色混ぜ', 'canvas内で触れたピクセルの色を感知しその色で描けるペンです。このペン自体には色はありません。\n「筆圧」と「ぼかし」機能がついています。\n筆圧の強弱に応じてペンの太さが変わります。')}
        onTouchStart={() => handlePenToolDescription(setMixPenDescription, '色混ぜ', 'canvas内で触れたピクセルの色を感知しその色で描けるペンです。このペン自体には色はありません。\n「筆圧」と「ぼかし」機能がついています。\n筆圧の強弱に応じてペンの太さが変わります。')}
      >
        <span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>このペン自体には色はありません。</span>
      </div>

      <div  className="flex-between" style={{ alignItems: 'flex-end', width: '185px', marginTop: '15px' }}>
        
        <div
          className="flex-column"
          onMouseEnter={() => handlePenToolDescription(setMixPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n0~5pxの範囲で値を調整できます。小さいペンに大きなぼかしを適応するとブラシのサイズが極端に大きくなる可能性があります。')}
          onTouchStart={() => handlePenToolDescription(setMixPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n0~5pxの範囲で値を調整できます。小さいペンに大きなぼかしを適応するとブラシのサイズが極端に大きくなる可能性があります。')}
        >
          {/* ぼかし調整UI */}
          <PenToolShareValueComponent penToolShareParts="blurValuePen" tool="mixTool" blurBool={mixBlur} setBlurBool={setMixBlur} />
          {/* 「ぼかし値」フォーム */}
          { mixBlur ? (
            <>
              <div className="flex-column-start" style={{ alignItems: 'flex-start' }}>
                <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                  <input
                    className="no-drag form-select-value"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    style={{ width: '60px', fontSize: '14px' }}
                    value={inputMixBlurValue}
                    onChange={handleLerpBlurValueChange}
                    onBlur={handleLerpBlurValueBlur}
                  /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                  <span className="tooltip-text" style={{ textAlign: 'left' }}>調整範囲：0〜5</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-column-start" style={{ alignItems: 'flex-start' }}>
                {/* <div style={{ marginBottom: '-8px' }}><span style={{ fontSize: '10px', color: '#4A4A4A' }}>最大ぼかし値：{maxValue}</span></div> */}
                {/* <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>ぼかし値</span></div> */}
                <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                  <div
                    className="form-select-value"
                    style={{ width: '60px', height: '27px' }}
                  /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ペンの密度 */}
        <div className="flex-end-end" style={{marginTop: '6px' }}>
          <div
            onMouseEnter={() => handlePenToolDescription(setMixPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
            onTouchStart={() => handlePenToolDescription(setMixPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
          >
            {/* 密度を調整するフォーム（厚塗りペン） */}
            <PenToolShareValueComponent penToolShareParts="densityValueParts" tool="mixTool" inputValue={inputMixDensityValue} minValue={0.01} maxValue={100} />
          </div>
        </div>
      </div>

      {/* 色混ぜに透明度をつける */}
      <div className="flex-between" style={{ marginTop: '15px', width: '185px' }}>
        <div
          onMouseEnter={() => handlePenToolDescription(setMixPenDescription, '透明度に筆圧をつける', '有効にすると筆圧に応じて透明度を調整できます。強く押すほど設定した透明度に近づきます。')}
          onTouchStart={() => handlePenToolDescription(setMixPenDescription, '透明度に筆圧をつける', '有効にすると筆圧に応じて透明度を調整できます。強く押すほど設定した透明度に近づきます。')}
        >
          {/* 「透明度を徐々に下げる」チェックボックス */}
          <div className="flex">
            <div
              className={`layers-visibility-checkbox tooltip-container ${activeMixAlpha ? "checked" : ""}`}
              onClick={handlActiveMixAlphaChange}
              onTouchStart={handlActiveMixAlphaChange}
              >
              {activeMixAlpha && <i className="bi bi-check-lg"></i>}
              <span className="tooltip-text" style={{ textAlign: 'left' }}>透明度を筆圧で調整する</span>
            </div>
            <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>透明度に筆圧をつける</span>
          </div>
        </div>

        <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
          <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>透明度</span>
          <input
            className="no-drag form-select-value"
            type="number"
            min="0"
            max="100"
            step="1"
            style={{ width: '60px', fontSize: '14px' }}
            value={inputAlphaRate}
            onChange={handleLerpAlphaRateChange}
            onBlur={handleLerpAlphaRateBlur}
            onMouseEnter={() => handlePenToolDescription(setMixPenDescription, '透明度をつける', '取得した色に透明度を付与します。値を低く設定すると取得した色から透明度を下げた薄い色で描画します。')}
            onTouchStart={() => handlePenToolDescription(setMixPenDescription, '透明度をつける', '取得した色に透明度を付与します。値を低く設定すると取得した色から透明度を下げた薄い色で描画します。')}
          />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>調整範囲：0〜100</span>
        </div>
      </div>


      {/* <div className="flex-between" style={{ marginTop: '15px', width: '185px' }}>
        <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>透明度をつける</span></div>
        <div className="tooltip-container">
        <input
          className="no-drag form-select-value"
          type="number"
          min="0"
          max="100"
          step="1"
          style={{ width: '60px', fontSize: '14px' }}
          value={inputAlphaRate}
          onChange={handleLerpAlphaRateChange}
          onBlur={handleLerpAlphaRateBlur}
          onMouseEnter={() => handlePenToolDescription(setMixPenDescription, '透明度をつける', '取得した色に透明度を付与します。値を低く設定すると取得した色から透明度を下げた薄い色で描画します。')}
          onTouchStart={() => handlePenToolDescription(setMixPenDescription, '透明度をつける', '取得した色に透明度を付与します。値を低く設定すると取得した色から透明度を下げた薄い色で描画します。')}
        />
        <span className="tooltip-text" style={{ textAlign: 'left' }}>調整範囲：0〜100</span>
        </div>
      </div> */}
{/* 
      <div
        className="flex-between"
        style={{ marginTop: '15px', width: '185px' }}
        onMouseEnter={() => handlePenToolDescription(setMixPenDescription, '透明度を徐々に下げる', 'ペンの透明度に減衰率を設定します。値を高くするとペンの透明度が迅速に減少し、値を低くすると透明度の減少が緩やかになります。この機能はペンを走らせる速度によって伸び率が変化します。')}
        onTouchStart={() => handlePenToolDescription(setMixPenDescription, '透明度を徐々に下げる', 'ペンの透明度に減衰率を設定します。値を高くするとペンの透明度が迅速に減少し、値を低くすると透明度の減少が緩やかになります。この機能はペンを走らせる速度によって伸び率が変化します。')}
      > */}
        {/* 「透明度を徐々に下げる」チェックボックス */}
        {/* <div className="flex">
          <div
            className={`layers-visibility-checkbox tooltip-container ${alphaDecayBool ? "checked" : ""}`}
            onClick={handlAlphaDecayBoolChange}
            onTouchStart={handlAlphaDecayBoolChange}
            >
            {alphaDecayBool && <i className="bi bi-check-lg"></i>}
            <span className="tooltip-text" style={{ textAlign: 'left' }}>ペンの透明度に減衰率を設定する</span>
          </div>
          <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>透明度を徐々に下げる</span>
        </div> */}

        {/* 徐々に透明度を下げる */}
        {/* {alphaDecayBool ? (
          <div className="tooltip-container">
            <input
              className="no-drag form-select-value tooltip-container"
              type="number"
              min="0"
              max="10"
              step="0.5"
              style={{ width: '60px', fontSize: '14px' }}
              value={inputAlphaDecayRate}
              onChange={handleLerpAlphaDecayRateChange}
              onBlur={handleLerpAlphaDecayRateBlur}
            />
            <span className="tooltip-text" style={{ textAlign: 'left' }}>最大値10</span>
          </div>
        ) : (
            <div
              className="form-select-value"
              style={{ width: '60px', height: '27px' }}
            />
        )} */}
      {/* </div> */}

      <div className="flex-end-end" style={{ marginTop: '15px', width: '185px' }}>
        {/* 「全ての値」を初期値に戻す */}
        <div
          className="pen-panel-button tooltip-container"
          onClick={resetAlphaDecayValue}
          onTouchStart={resetAlphaDecayValue}
          style={{ margin: '0px', width: '18px', height: '18px', marginLeft: '8px', marginBottom: '2px' }}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          <span className="tooltip-text">「全ての値」を初期値に戻す</span>
        </div>
      </div>
    </>
  );
};


export { DetailMixPenBlock };