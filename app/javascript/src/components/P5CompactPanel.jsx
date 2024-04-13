import React from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { Rnd } from 'react-rnd';
import { TopLineBlock } from './p5partscomponents/TopLineBlock';
import { CenterLineBlock } from './p5partscomponents/CenterLineBlock';
import { useP5Color } from './P5ColorContext';

const P5CompactPanel = () => {
  const { 
    toggleLayersInfoPanelVisible,
    layersInfoPanelVisible,
    toggleMainPanelMode,
    mainPanelPosition,
    setP5DrawingEnabled,
    handlePanelDragStop,
    setMainPanelPosition,
    showSizeAndDetailPenPanels,
    showSizeAndDetailPanels,
    toggleColorPalettePanelVisible,
    toggleScalePanelVisible,
    scalePanelVisible,
    colorPalettePanelVisible
  } = useP5PanelGroupContext();


  const {
    currentColor,
    setCurrentColor,
    paletteColors9,
    setPaletteColors9,
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

  const { toolMode, handleToolChange, selectArrangeMode } = useP5ToolModeContext();

  //フリーパレット(9色)の色を更新または削除する関数
  const updatePaletteColor9 = (index, color) => {
    const newPaletteColors = [...paletteColors9];
    if (toolMode === 'selectcolorTool') {
      newPaletteColors[index] = color;
    } else if (toolMode === 'deletecolorTool') {
      newPaletteColors[index] = ''; // 色を削除
    }
    setPaletteColors9(newPaletteColors);
  };

  const handlePaletteClick9 = (clickedColor) => {
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
    bounds="parent"
    className="control-panel"
    position={{ x: mainPanelPosition.x, y: mainPanelPosition.y }}
    onMouseDown={() => setP5DrawingEnabled(false)}
    onTouchStart={() => setP5DrawingEnabled(false)}
    onDragStop={(e, d) => handlePanelDragStop(setMainPanelPosition, e, d)}
    size={{ width: 250, height: 250 }}
    style={{ position: 'absolute', zIndex: 31 }}
    cancel=".no-drag"
  >

    <div className="panel-title"><span>ツール</span></div>
    <div className="panel-tool-group">
      <div>
        <TopLineBlock />
      </div>

      <div className="center-line-block-compact">
        {/* centerブロック */}
        <CenterLineBlock />
      </div>


      {/* 下部ブロック */}
      <div className='under-line-block-compact'>
        <div className='flex'>
          {/* 1つ目カラープレビューボタン */}
          <div
            className={`color-preview-fast ${selectColorPreview ? "active" : ""}`}
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
            className={`color-preview-second ${!selectColorPreview ? "active" : ""}`}
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

          {/* 白黒ボタン */}
          <div className="black-white-btn-compact">
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
        </div>



        <div className="panel-visible-block">
          {/* カラーパレットパネル */}
          {!colorPalettePanelVisible && (
            <div
              className="panel-visible-button tooltip-container"
              onClick={toggleColorPalettePanelVisible}
              onTouchStart={toggleColorPalettePanelVisible}
            >
              <i className="bi bi-palette"></i>
              <span className="tooltip-text">カラーパレットパネルを表示</span>
            </div>
          )}

          {/* レイヤーパネル */}
          {!layersInfoPanelVisible && (
            <div
              className="panel-visible-button tooltip-container"
              onClick={toggleLayersInfoPanelVisible}
              onTouchStart={toggleLayersInfoPanelVisible}
            >
              <i className="bi bi-layers"></i>
              <span className="tooltip-text">レイヤーパネルを表示</span>
            </div>
          )}

          {/* スケールパネル */}
          {!scalePanelVisible && (
            <div
              className="panel-visible-button tooltip-container"
              onClick={toggleScalePanelVisible}
              onTouchStart={toggleScalePanelVisible}
            >
              <i className="bi bi-search"></i>
              <span className="tooltip-text">スケールパネルを表示</span>
            </div>
          )}
        </div>
      </div>

      {/* フリーパレット */}
      <div className="palette-colors-box">
        {paletteColors9.map((color, index) => (
          <div
            key={index}
            className="palette-colors-freepalletBox"
            onClick={() => {
              if ((toolMode === 'dropperTool') || ((toolMode === 'selectMode') && (selectArrangeMode === 'selectFillColor'))) {
                handlePaletteClick9(color);
              } else {
                updatePaletteColor9(index, currentColor);
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


export { P5CompactPanel };