import React, { useEffect, useRef, useState } from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { Rnd } from 'react-rnd';
import { WheelColorPicker } from './p5partscomponents/WheelColorPicker';
import { BoxColorPicker } from './p5partscomponents/BoxColorPicker';
import { useP5Color } from './P5ColorContext';
import { TopLineBlock } from './p5partscomponents/TopLineBlock';
import { CenterLineBlock } from './p5partscomponents/CenterLineBlock';

const P5DefaultPanel = () => {
  const { 
    toggleLayersInfoPanelVisible,
    layersInfoPanelVisible,
    toggleMainPanelMode,
    mainPanelPosition,
    setP5DrawingEnabled,
    showSizeAndDetailPenPanels,
    toggleColorPalettePanelVisible,
    boxPickerChange,
    handleBoxPickerChange,
    isDraggablePanel,
    handlePanelDragStop,
    setMainPanelPosition,
    showSizeAndDetailPanels
  } = useP5PanelGroupContext();

  const {
    currentColor,
    setCurrentColor,
    paletteColors18,
    setPaletteColors18,
    setWhiteButton,
    setBlackButton,
    selectColorPreview,
    setSelectColorPreview,
    firstColorPreview,
    setFirstColorPreview,
    secondColorPreview,
    setSecondColorPreview,
    toggleFirstPreviewMode,
    toggleSecondPreviewMode,
    setColorPreviewButton,
    toggleColorPreviewChange
  } = useP5Color();

  const { toolMode, selectArrangeMode } = useP5ToolModeContext();



  //フリーパレット(18色)の色を更新または削除する関数
  const updatePaletteColor18 = (index, color) => {
    const newPaletteColors = [...paletteColors18];
    if (toolMode === 'selectcolorTool') {
      newPaletteColors[index] = color;
    } else if (toolMode === 'deletecolorTool') {
      newPaletteColors[index] = ''; // 色を削除
    }
    setPaletteColors18(newPaletteColors);
  };

  const handlePaletteClick18 = (clickedColor) => {
    if (!clickedColor || clickedColor === 'transparent') {
      return;
    } else {
    setCurrentColor(clickedColor);
    }
  };



  return (
    <Rnd
    enableResizing={{
      top: false,
      right: false,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    }}
    cancel=".no-drag"
    bounds="parent"
    className="control-panel"
    position={{ x: mainPanelPosition.x, y: mainPanelPosition.y }}
    // onDragStart={() => setP5DrawingEnabled(false)} // ドラッグ開始時に描画を無効
    onMouseDown={() => setP5DrawingEnabled(false)} // マウスでクリックされた時に描画を無効
    onTouchStart={() => setP5DrawingEnabled(false)} // タッチされた時に描画を無効
    onDragStop={(e, d) => handlePanelDragStop(setMainPanelPosition, e, d)}
    size={{ width: 250, height: 400 }}
    style={{ position: 'absolute', zIndex: 30 }}
    disableDragging={!isDraggablePanel}
  >

    <div className="panel-title"><span>ツール</span></div>

    <div className="panel-tool-group">
      {/* トップブロック */}
      <TopLineBlock />

      {/* カラーピッカブロック */}
      <div className="color-picker-container">
        {/* カラーピッカー */}
        {boxPickerChange ? (
          <BoxColorPicker />
        ) : (
          <WheelColorPicker />
        )}

          {/* カラーピッカーチェンジボタン */}
          <div
            className="picker-change-btn tooltip-container"
            onClick={handleBoxPickerChange}
            onTouchStart={handleBoxPickerChange}
          >
            {boxPickerChange ? (
              <i className="bi bi-record-circle-fill"></i>
            ) : (
              <i className="bi bi-dice-1-fill"></i>
            )}
            <span className="tooltip-text">カラーピッカーの形状を変更</span>
          </div>


        <div className="preview-set">
          <div className="color-preview-box">
            {/* カラープレビューボタン */}
            <div className="color-preview-container">
              {/* 1つ目カラープレビューボタン */}
              <div
                className={`color-preview ${selectColorPreview ? "active" : ""}`}
                onClick={() => {
                  setColorPreviewButton(firstColorPreview);
                  toggleFirstPreviewMode();
                }}
                onTouchStart={() => {
                  setColorPreviewButton(firstColorPreview);
                  toggleFirstPreviewMode();
                }}
                style={{
                  backgroundColor: firstColorPreview
                }}
              >
              </div>

              {/* 2つ目カラープレビューボタン */}
              <div
                className={`color-preview-button ${!selectColorPreview ? "active" : ""}`}
                onClick={() => {
                  setColorPreviewButton(secondColorPreview);
                  toggleSecondPreviewMode();
                }}
                onTouchStart={() => {
                  setColorPreviewButton(secondColorPreview);
                  toggleSecondPreviewMode();
                }}
                style={{
                  backgroundColor: secondColorPreview
                }}
              >
              </div>
            </div>

            {/* 白黒ボタン */}
            <div className="black-white-btn-container">
              <div className="black-white-btn-box">
                <div
                  onClick={setBlackButton}
                  onTouchStart={setBlackButton}
                  className="black-half-circle-btn"
                  style={{ backgroundColor: '#000' }}
                >
                </div>
                <div
                  onClick={setWhiteButton}
                  onTouchStart={setWhiteButton}
                  className="white-half-circle-btn"
                  style={{ backgroundColor: '#fff' }}
                >
                </div>
              </div>
            </div>

            {/* カラープレビューチェンジボタン */}
            <div
                className="preview-change-button tooltip-container"
                onClick={toggleColorPreviewChange}
                onTouchStart={toggleColorPreviewChange}
            >
              <svg id="_レイヤー_12" data-name="レイヤー 12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                <defs>
                  <style>
                    {`
                      .change-cls-1 {
                        fill: none;
                        stroke: #000;
                        stroke-miterlimit: 10;
                      }

                      .change-cls-2 {
                        stroke-width: 0px;
                      }
                    `}
                  </style>
                </defs>
                <path className="change-cls-1" d="m20.62,19.82c-1.48-3.88-4.57-6.96-8.45-8.44"/>
                <polygon className="change-cls-2" points="21.99 18.33 21.58 25.05 18.58 19.03 21.99 18.33"/>
                <polygon className="change-cls-2" points="13.67 10.01 6.95 10.42 12.97 13.43 13.67 10.01"/>
              </svg>
              <span className="tooltip-text">二次色を入れ替える</span>
            </div>
          </div>
        </div>

      </div>


      {/* centerブロック */}
      <CenterLineBlock />

      {/* フリーパレット */}
      <div className="palette-colors-box">
        {paletteColors18.map((color, index) => (
          <div
            key={index}
            className="palette-colors-freepalletBox"
            onClick={() => {
              if ((toolMode === 'dropperTool') || ((toolMode === 'selectMode') && (selectArrangeMode === 'selectFillColor'))) {
                handlePaletteClick18(color);
              } else {
                updatePaletteColor18(index, currentColor);
              }
            }}
          >
            <div className="palette-colors-palletBox" style={{ backgroundColor: color || 'transparent' }}></div>
          </div>
        ))}
      </div>
    </div>
  </Rnd>
  );
};


export { P5DefaultPanel };