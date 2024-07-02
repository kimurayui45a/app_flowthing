import React, { useEffect, useState, useRef } from 'react';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
// import { useP5ToolModeContext } from '../P5ModeContext';
// import { useP5Color } from '../P5ColorContext';
// import { useP5PanelGroupContext } from '../P5PanelGroupContext';
// import { PenToolShareValueComponent } from './PenToolShareValueComponent';


//エアブラシ・厚塗りペン専門のパーツ提供コンポーネント
const DotPenPartsComponent = ({dotPenFormParts, tool, inputValue, widthInputValue, heightInputValue}) => {


  // const { 
  //   toolMode
  // } = useP5ToolModeContext();

  const { 
  //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
  toolSize,
  pencilPreviewCanvas,
  oilPenPreviewCanvas
  } = useP5CanvasCoreShare();

  //「カラーコンテキスト」から受け取るもの
  // const {
  //   currentColor,
  //   setCurrentColor,
  //   currentAlphaColor,
  //   secondAlphaColor,
  //   selectAlphaColorPreview,
  //   h,
  //   s,
  //   v,
  //   inputS,
  //   inputV
  // } = useP5Color();

  const {
    //詳細パネル（ペンツール...エアブラシツール）
    pencilLerpStep,
    setPencilLerpStep,
    setInputPencilLerpStep,
    pencilNumPoints,
    setPencilNumPoints,
    setInputPencilNumPoints,
    pencilHeightDot,
    setPencilHeightDot,
    setInputPencilHeightDot,
    pencilWidthDot,
    setPencilWidthDot,
    setInputPencilWidthDot,
    pencilAlpha,
    setPencilAlpha,
    setInputPencilAlpha,

    //詳細パネル（ペンツール...厚塗りペンツール）
    oilLerpStep,
    setOilLerpStep,
    setInputOilLerpStep,
    oilNumPoints,
    setOilNumPoints,
    setInputOilNumPoints,
    oilHeightDot,
    setOilHeightDot,
    setInputOilHeightDot,
    oilWidthDot,
    setOilWidthDot,
    setInputOilWidthDot,
    oilAlpha,
    setOilAlpha,
    setInputOilAlpha,

    //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
    setOilDensityValue
  } = useP5PenToolParametersContext();


  //補間の細かさや速度を調整する値のフォーム処理
  const updateLerpStep = (newSize, tool) => {
    if (newSize >= 0.01 && newSize <= 1) {
      if (tool === 'pencilPen') {
        setPencilLerpStep(newSize);
        setInputPencilLerpStep(String(newSize));
      } else {
        setOilLerpStep(newSize);
        setInputOilLerpStep(String(newSize));
      }
    }
  };

  const handleLerpStepChange = (e, tool) => {
    const value = e.target.value;
    if (tool === 'pencilPen') {
      setInputPencilLerpStep(value);
    } else {
      setInputOilLerpStep(value);
    }
  };

  const handleLerpStepBlur = (inputValue, tool) => {
    const inputLerpStepValue = parseFloat(inputValue);
    const newSize = Math.round(inputLerpStepValue * 1000) / 1000;
    if (newSize >= 0.01 && newSize <= 1) {
      updateLerpStep(newSize, tool);
      } else {
        if (tool === 'pencilPen') {
        setInputPencilLerpStep(String(pencilLerpStep));
      } else {
        setInputOilLerpStep(String(oilLerpStep));
      }
    }
  };



  //描画される点の数を制御する値
  const updateNumPoints = (newSize, tool) => {
    if (newSize >= 1 && newSize <= 999) {
      if (tool === 'pencilPen') {
        setPencilNumPoints(newSize);
        setInputPencilNumPoints(String(newSize));
      } else {
        setOilNumPoints(newSize);
        setInputOilNumPoints(String(newSize));
      }
    }
  };

  const handleLerpNumPointsChange = (e, tool) => {
    const value = e.target.value;
    if (tool === 'pencilPen') {
      setInputPencilNumPoints(value);
    } else {
      setInputOilNumPoints(value);
    }
  };

  const handleLerpNumPointsBlur = (inputValue, tool) => {
    const newSize = parseInt(inputValue, 10);
    if (newSize >= 1 && newSize <= 999) {
      updateNumPoints(newSize, tool);
    } else {
      if (tool === 'pencilPen') {
        setInputPencilNumPoints(String(pencilNumPoints));
      } else {
        setInputOilNumPoints(String(oilNumPoints));
      }
    }
  };



  //透明度を調整
  const updateAlpha = (newSize, tool) => {
    if (newSize >= 0 && newSize <= 100) {
      if (tool === 'pencilPen') {
        setPencilAlpha(newSize);
        setInputPencilAlpha(String(newSize));
      } else {
        setOilAlpha(newSize);
        setInputOilAlpha(String(newSize));
      }
    }
  };

  const handleLerpAlphaChange = (e, tool) => {
    const value = e.target.value;
    if (tool === 'pencilPen') {
      setInputPencilAlpha(value);
    } else {
      setInputOilAlpha(value);
    }
  };

  const handleLerpAlphaBlur = (inputValue, tool) => {
    const newSize = parseInt(inputValue, 10);
    if (newSize >= 0 && newSize <= 100) {
      updateAlpha(newSize, tool);
    } else {
      if (tool === 'pencilPen') {
        setInputPencilAlpha(String(pencilAlpha));
      } else {
        setInputOilAlpha(String(oilAlpha));
      }
    }
  };


  //ドットのサイズ調整
  const updateDot = (newSize, tool, direction) => {
    if (newSize >= 0.5 && newSize <= toolSize / 2) {
      if (tool === 'pencilPen') {
        if (direction === 'width') {
          setPencilWidthDot(newSize);
          setInputPencilWidthDot(String(newSize));

        } else {
          setPencilHeightDot(newSize);
          setInputPencilHeightDot(String(newSize));
        }
      } else if (tool === 'oilPen') {
        if (direction === 'width') {
          setOilWidthDot(newSize);
          setInputOilWidthDot(String(newSize));
        } else {
          setOilHeightDot(newSize);
          setInputOilHeightDot(String(newSize));
        }
      }
    }
  };

  const handleLerpDotChange = (e, tool, direction) => {
    const value = e.target.value;
    if (tool === 'pencilPen') {
      if (direction === 'width') {
        setInputPencilWidthDot(value);
      } else {
        setInputPencilHeightDot(value);
      }
    } else if (tool === 'oilPen') {
      if (direction === 'width') {
        setInputOilWidthDot(value);
      } else {
        setInputOilHeightDot(value);
      }
    }
  };

  const handleLerpDotBlur = (inputValue, tool, direction) => {
    const inputDotValue = parseFloat(inputValue);
    const newSize = Math.round(inputDotValue * 10) / 10;
    if (newSize >= 0.5 && newSize <= toolSize / 2) {
      updateDot(newSize, tool, direction);
    } else {
      if (tool === 'pencilPen') {
        if (direction === 'width') {
          setInputPencilWidthDot(String(pencilWidthDot));
        } else {
          setInputPencilHeightDot(String(pencilHeightDot));
        }
      } else if (tool === 'oilPen') {
        if (direction === 'width') {
          setInputOilWidthDot(String(oilWidthDot));
        } else {
          setInputOilHeightDot(String(oilHeightDot));
        }
      }
    }
  };



  //「全ての値」をデフォルトに戻すボタン
  const resetValue = (tool) => {
    if (tool === 'pencilPen') {
      setPencilAlpha(0);
      setPencilWidthDot(1);
      setPencilHeightDot(1);
      setPencilNumPoints(10);
      setPencilLerpStep(0.05);
    } else {
      setOilAlpha(0);
      setOilWidthDot(1);
      setOilHeightDot(1);
      setOilNumPoints(5);
      setOilLerpStep(0.05);
      setOilDensityValue(20);
    }
  }


  switch (dotPenFormParts) {
    case 'lerpStepForm':
      return  (
        <>
          <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', width: '70px' }}>
            <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>補間調整値</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0.01"
              max="1"
              step="0.01"
              style={{ width: '60px', fontSize: '14px' }}
              value={inputValue}
              onChange={(e) => handleLerpStepChange(e, tool)}
              onBlur={() => handleLerpStepBlur(inputValue, tool)}
            />
            <span className="tooltip-text" style={{ textAlign: 'left' }}>線を引く際の点の配置間隔を調整する<br />(調整範囲：0.01〜1)</span>
          </div>
        </>
      );
    case 'lerpNumPointsForm':
      return (
        <>
          <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', width: '70px' }}>
            <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ドットの数</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="1"
              max="999"
              step="1"
              style={{ width: '60px', fontSize: '14px' }}
              value={inputValue}
              onChange={(e) => handleLerpNumPointsChange(e, tool)}
              onBlur={() => handleLerpNumPointsBlur(inputValue, tool)}
            />
            <span className="tooltip-text" style={{ textAlign: 'left' }}>ドットの数を調整する<br />(調整範囲：1〜999)</span>
          </div>
        </>
      );
    case 'lerpAlphaBlurForm':
      return  (
        <>
          <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', width: '70px' }}>
            <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>透明度の調整</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="100"
              step="1"
              style={{ width: '60px', fontSize: '14px' }}
              value={inputValue}
              onChange={(e) => handleLerpAlphaChange(e, tool)}
              onBlur={() => handleLerpAlphaBlur(inputValue, tool)}
            />
            <span className="tooltip-text" style={{ textAlign: 'left' }}>ペンの外側の透明度を調整する<br />(調整範囲：0〜100)</span>
          </div>
        </>
      );
    case 'lerpDotForm':
      return  (
        <>
          <div className="flex">
            <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', width: '70px' }}>
              <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec', textAlign: 'left', lineHeight: '1.3' }}>ドットの横幅<br />(0.5〜{toolSize / 2})</span>
              <input
                className="no-drag form-select-value"
                type="number"
                min="0.5"
                max={toolSize / 2}
                step="0.5"
                style={{ width: '60px', fontSize: '14px' }}
                value={widthInputValue}
                onChange={(e) => handleLerpDotChange(e, tool, 'width')}
                onBlur={() => handleLerpDotBlur(widthInputValue, tool, 'width')}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>ドットの横幅を調整する<br />(調整範囲：ペンサイズ依存)</span>
            </div>
            <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', width: '70px' }}>
              <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec', textAlign: 'left', lineHeight: '1.3' }}>ドットの縦幅<br />(0.5〜{toolSize / 2})</span>
              <input
                className="no-drag form-select-value"
                type="number"
                min="0.5"
                max={toolSize / 2}
                step="0.5"
                style={{ width: '60px', fontSize: '14px' }}
                value={heightInputValue}
                onChange={(e) => handleLerpDotChange(e, tool, 'height')}
                onBlur={() => handleLerpDotBlur(heightInputValue, tool, 'height')}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>ドットの縦幅を調整する<br />(調整範囲：ペンサイズ依存)</span>
            </div>
          </div>
        </>
      );
    case 'resetValueBtn':
      return  (
        <>
          <div
            className="pen-panel-button tooltip-container"
            onClick={() => resetValue(tool)}
            onTouchStart={() => resetValue(tool)}
            style={{ margin: '0px 0px 0px 8px', width: '18px', height: '18px' }}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            <span className="tooltip-text">「全ての値」を初期値に戻す</span>
          </div>
        </>
      );

    case 'pencilPreviewParts':
      return  (
        <>
          {/* エアブラシのプレビュー */}
            <div className="pen-tool-preview-container">
              <div className="pen-tool-preview-background"></div>
              <div
                className="copy-layer-preview"
                style={{ backgroundImage: pencilPreviewCanvas ? `url(${pencilPreviewCanvas})` : 'none' }}
              ></div>
            </div>
        </>
      );

    case 'oilPenPreviewParts':
      return  (
        <>
          {/* 厚塗りペンのプレビュー */}
          <div className="pen-tool-preview-container">
            <div className="pen-tool-preview-background"></div>
            <div
              className="copy-layer-preview"
              style={{ backgroundImage: oilPenPreviewCanvas ? `url(${oilPenPreviewCanvas})` : 'none' }}
            ></div>
          </div>
        </>
      );

    default:
      return (
        <>
          <span>設定はありません</span>
        </>
      );
  }
};


export { DotPenPartsComponent };