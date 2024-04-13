import React, { useEffect, useState, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { PenToolShareValueComponent } from './PenToolShareValueComponent';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5ToolModeContext } from '../P5ModeContext';



const DetailSmoothPenBlock = () => {

  //「ツールモードコンテキスト」から受け取るもの
  const {
    toolMode
  } = useP5ToolModeContext();

  const {
    //概要説明
    description,
    setDescription,
    handleDescriptionMouseEnter,

    //詳細パネル（ペンツール...筆圧とSとVのMAX）
    pressureAdjustment,
    setPressureAdjustment,
    userCustomS,
    setUserCustomS,
    sMin,
    setSMin,
    userCustomV,
    setUserCustomV,
    vMax,
    setVMax,

    //詳細パネル（ペンツール...各設定のbool値）
    blur,
    setBlur,
    pressurePen,
    setPressurePen,
    sizeCustomBool,
    setSizeCustomBool,
    activeS,
    setActiveS,
    maxChangeSBool,
    setMaxChangeSBool,
    maxChangeVBool,
    setMaxChangeVBool,
    activeV,
    setActiveV,
    alphaDecayBool,
    setAlphaDecayBool,

    //詳細パネル（ペンツール...ぼかし）
    blurValue,
    setBlurValue,
    inputBlurValue,
    setInputBlurValue,
    blurValueMax,
    setBlurValueMax,

    //詳細パネル（ペンツール...インクペン滑らかさ）
    densityValue,
    setDensityValue,
    inputDensityValue,
    setInputDensityValue,

    //詳細パネル（ペンツール...筆圧変動に関する補間率）
    lerpRateMin,
    setLerpRateMin,
    lerpRateMax,
    setLerpRateMax,
    inputLerpRateMin,
    setInputLerpRateMin,
    inputLerpRateMax,
    setInputLerpRateMax,

    //詳細パネル（ペンツール...サイズに関する補間率）
    rateSize,
    setRateSize,
    inputRateSize,
    setInputRateSize,

    //詳細パネル（ペンツール...S値に関する補間率）
    maxChangeS,
    setMaxChangeS,
    rateS,
    setRateS,
    inputRateS,
    setInputRateS,

    //詳細パネル（ペンツール...V値に関する補間率）
    maxChangeV,
    setMaxChangeV,
    rateV,
    setRateV,
    inputRateV,
    setInputRateV,

    //詳細パネル（ペンツール...指先・色混ぜツール）
    alphaRate,
    setAlphaRate,
    inputAlphaRate,
    setInputAlphaRate,
    alphaDecayRate,
    setAlphaDecayRate,
    inputAlphaDecayRate,
    setInputAlphaDecayRate,

    //詳細パネル（ペンツール...エアブラシツール）
    pencilLerpStep,
    setPencilLerpStep,
    inputPencilLerpStep,
    setInputPencilLerpStep,
    pencilNumPoints,
    setPencilNumPoints,
    inputPencilNumPoints,
    setInputPencilNumPoints,
    pencilHeightDot,
    setPencilHeightDot,
    inputPencilHeightDot,
    setInputPencilHeightDot,
    pencilWidthDot,
    setPencilWidthDot,
    inputPencilWidthDot,
    setInputPencilWidthDot,
    pencilAlpha,
    setPencilAlpha,
    inputPencilAlpha,
    setInputPencilAlpha,

    //詳細パネル（ペンツール...厚塗りペンツール）
    oilLerpStep,
    setOilLerpStep,
    inputOilLerpStep,
    setInputOilLerpStep,
    oilNumPoints,
    setOilNumPoints,
    inputOilNumPoints,
    setInputOilNumPoints,
    oilHeightDot,
    setOilHeightDot,
    inputOilHeightDot,
    setInputOilHeightDot,
    oilWidthDot,
    setOilWidthDot,
    inputOilWidthDot,
    setInputOilWidthDot,
    oilAlpha,
    setOilAlpha,
    inputOilAlpha,setInputOilAlpha,

    //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
    mmDensityValue,
    setMmDensityValue,
    inputMmDensityValue,
    setInputMmDensityValue,
    waterDensityValue,
    setWaterDensityValue,
    inputWaterDensityValue,
    setInputWaterDensityValue,
    oilDensityValue,
    setOilDensityValue,
    inputOilDensityValue,
    setInputOilDensityValue,
    mixDensityValue,
    setMixDensityValue,
    inputMixDensityValue,
    setInputMixDensityValue,
    inputMmBlurValue,
    mmBlurValueMax,
    mmBlur,
    setMmBlur,
    inputWatercolorBlurValue,
    watercolorBlurValueMax,
    watercolorBlur,
    setWatercolorBlur,
    mmBlurValue,
    watercolorBlurValue,
    setMmPenDescription,
    handlePenToolDescription,
    setWatercolorDescription,
    setInkPenDescription
  } = useP5PenToolParametersContext();


  //選択されたツールに応じてオプション内の内容を切り替える
  const renderPenToolComponent = (toolMode) => {
    if (toolMode === 'mmPen') {
      return (
        <>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>
            {/* 「ミリペン」オプション */}
            <div
              className="flex-column-start"
              style={{ alignItems: 'flex-start' }}
              onMouseEnter={() => handlePenToolDescription(setMmPenDescription, 'ミリペン', '「ぼかし」機能がついたペンです。\nこのペンには「筆圧」機能はついていません。\n一定の太さで描画できます。')}
              onTouchStart={() => handlePenToolDescription(setMmPenDescription, 'ミリペン', '「ぼかし」機能がついたペンです。\nこのペンには「筆圧」機能はついていません。\n一定の太さで描画できます。')}
            >
              <span className="destination-layer" style={{ color: '#ececec' }}>ミリペンのプレビュー</span>
              {/* ミリペンプレビュー */}
              <PenToolShareValueComponent penToolShareParts="toolPreview" blurBool={mmBlur} />
            </div>
              
            <div style={{ width: '100px' }} className="flex-end-start">
              <div className="flex-column-start">
                <div
                  onMouseEnter={() => handlePenToolDescription(setMmPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                  onTouchStart={() => handlePenToolDescription(setMmPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                >
                  {/* ぼかし調整UI（ミリペン） */}
                  <PenToolShareValueComponent penToolShareParts="blurValuePen" tool="mmPen" blurBool={mmBlur} setBlurBool={setMmBlur} />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div
                    onMouseEnter={() => handlePenToolDescription(setMmPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                    onTouchStart={() => handlePenToolDescription(setMmPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                  >
                    {/* ミリペン滑らかさフォーム */}
                    <PenToolShareValueComponent penToolShareParts="densityValueParts" tool="mmPen" inputValue={inputMmDensityValue} minValue={0.01} maxValue={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    } else if (toolMode === 'inkPen') {
      return (
        <>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>
            {/* 「インクペン」オプション */}
            <div
              className="flex-column-start"
              style={{ alignItems: 'flex-start' }}
              onMouseEnter={() => handlePenToolDescription(setInkPenDescription, 'インクペン', '「筆圧」を感知するペンです。\nこのペンには「ぼかし」機能はついていません。\n筆圧の強弱に応じてペンの太さが変わります。')}
              onTouchStart={() => handlePenToolDescription(setInkPenDescription, 'インクペン', '「筆圧」を感知するペンです。\nこのペンには「ぼかし」機能はついていません。\n筆圧の強弱に応じてペンの太さが変わります。')}
            >
              <span className="destination-layer" style={{ color: '#ececec' }}>インクペンのプレビュー</span>
                {/* インクペンプレビュー */}
                <PenToolShareValueComponent penToolShareParts="toolPreview" blurBool={false} />
            </div>
            
            <div style={{ width: '100px' }} className="flex-end-start">
              <div className="flex-column-start">
              <div style={{ lineHeight: '0.7', textAlign: 'left' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>このペンには<br />「ぼかし」機能はついていません。</span></div>

                <div style={{ width: '100px', marginTop: '15px' }}>
                  <div
                    onMouseEnter={() => handlePenToolDescription(setInkPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を低くすると線が密になり、より滑らかな描画が可能になります。\n値を高く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                    onTouchStart={() => handlePenToolDescription(setInkPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を低くすると線が密になり、より滑らかな描画が可能になります。\n値を高く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                  >
                    {/* インクペン滑らかさフォーム */}
                    <PenToolShareValueComponent penToolShareParts="inkPenParts" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    } else if (toolMode === 'watercolorPen') {
      return (
        <>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>
            {/* 「水彩ペン」オプション */}
            <div
              className="flex-column-start"
              style={{ alignItems: 'flex-start' }}
              onMouseEnter={() => handlePenToolDescription(setWatercolorDescription, '水彩ペン', '「筆圧」と「ぼかし」機能がついたペンです。\n筆圧の強弱に応じてペンの太さが変わります。')}
              onTouchStart={() => handlePenToolDescription(setWatercolorDescription, '水彩ペン', '「筆圧」と「ぼかし」機能がついたペンです。\n筆圧の強弱に応じてペンの太さが変わります。')}
            >
              <span className="destination-layer" style={{ color: '#ececec' }}>水彩ペンのプレビュー</span>
                {/* 水彩ペンプレビュー */}
                <PenToolShareValueComponent penToolShareParts="toolPreview" blurBool={watercolorBlur} />
            </div>
            
            <div style={{ width: '100px' }} className="flex-end-start">
              <div className="flex-column-start">
                <div
                  onMouseEnter={() => handlePenToolDescription(setWatercolorDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                  onTouchStart={() => handlePenToolDescription(setWatercolorDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                >
                  {/* ぼかし調整UI（水彩ペン） */}
                  <PenToolShareValueComponent penToolShareParts="blurValuePen" tool="watercolorPen" blurBool={watercolorBlur} setBlurBool={setWatercolorBlur} />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div
                    onMouseEnter={() => handlePenToolDescription(setWatercolorDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                    onTouchStart={() => handlePenToolDescription(setWatercolorDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                  >
                    {/* 水彩ペン滑らかさフォーム */}
                    <PenToolShareValueComponent penToolShareParts="densityValueParts" tool="watercolorPen" inputValue={inputWaterDensityValue} minValue={0.01} maxValue={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    // 該当する条件がない場合のデフォルトのレンダリング「selectAreaDelete」「selectMove」
    return <span className="text-Rounded" style={{ fontSize: '14px', color: '#ececec' }}>設定はありません。</span>;
  }





  return (
    <div>

      {/* ツール・モード別分岐要素 */}
      {renderPenToolComponent(toolMode)}


    </div>
  );
};


export { DetailSmoothPenBlock };