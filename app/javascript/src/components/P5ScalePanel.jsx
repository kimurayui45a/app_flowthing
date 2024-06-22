import React, { useEffect } from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { Rnd } from 'react-rnd';

const P5ScalePanel = () => {
  const { 
    toggleScalePanelClose,
    scalePanelVisible,
    setP5DrawingEnabled,
    handlePanelDragStop,
    scalePanelPosition,
    setScalePanelPosition,
    colorPaletteDrag,
    colorPaletteDragEnd,
  } = useP5PanelGroupContext();

  const { toolMode, handleToolChange } = useP5ToolModeContext();

  const { scaleFactor, handleScaleChange, getLayersInfoData, dateAllCanvas, handleScaleChangeSlider } = useP5CanvasCoreShare();

  const updateScaleBtn = (change) => {
    let updatedValue = Math.min(5, Math.max(0.5, scaleFactor + change));

    handleScaleChange(updatedValue);
    handleScaleChangeSlider(updatedValue);
  };

  // // スライダーを更新するハンドラ
  // const handleScaleChangeSlider = (newScale) => {
  //   const scaleSlider = document.getElementById('scaleSlider');
  //   const percentage = (newScale - 0.5) / (5 - 0.5) * 100;
  //   scaleSlider.style.background = `linear-gradient(to right, rgba(127, 168, 235, 0.5) ${percentage}%, transparent ${percentage}%)`;
  // };

  useEffect(() => {
    handleScaleChangeSlider(scaleFactor);
  }, []);

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
    position={{ x: scalePanelPosition.x, y: scalePanelPosition.y }}
    onMouseDown={() => setP5DrawingEnabled(false)}
    onTouchStart={() => setP5DrawingEnabled(false)}
    onDragStop={(e, d) => handlePanelDragStop(setScalePanelPosition, e, d)}
    size={{ width: 200, height: 228 }}
    style={{ position: 'absolute', zIndex: 35 }}
    cancel=".no-drag"
    >

      <div className="panel-title">
        <span>スケール</span>
        {/* 閉じる */}
        <div className="close-btn-position">
          {scalePanelVisible && (
            <div
              className="close-btn tooltip-container"
              onClick={toggleScalePanelClose}
              onTouchStart={toggleScalePanelClose}
            >
              <i className="bi bi-x-lg"></i>
              <span className="tooltip-text">閉じる</span>
            </div>
          )}
        </div>
      </div>

      <div className="panel-tool-group-scale">

        {/* 全体プレビュー */}
        <div style={{
          width: '160px',
          height: '120px',
          backgroundImage: dateAllCanvas ? `url(${dateAllCanvas})` : 'none',
          backgroundColor: dateAllCanvas ? `transparent` : '#f0f0f0',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #4A4A4A',
          borderRadius: '5px'
        }}></div>

        {/* スケール調整スライダー */}
        <div className="scale-panel-custom-container">
          <div className="scale-panel-slider-container">
            <div className="scale-panel-slider-background"></div>
            <label>
              <input
                id="scaleSlider"
                type="range"
                min="0.5"
                max="5"
                step="0.01"
                value={Math.round(scaleFactor * 10) / 10}
                // onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                onChange={(e) => {
                  handleScaleChange(parseFloat(e.target.value))
                  handleScaleChangeSlider(parseFloat(e.target.value))
                }}
                onMouseDown={colorPaletteDrag}
                onTouchStart={colorPaletteDrag}
                onMouseUp={colorPaletteDragEnd}
                onTouchEnd={colorPaletteDragEnd}
                className="no-drag scale-panel-slider"
              />
            </label>
            <span className="scale-panel-slider-value">{Math.round(scaleFactor * 10) / 10}</span>
          </div>

          {/* スケールパネルボタングループ */}
          <div className="layers-panel-upper-btn">
            {/* 縮小 */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={() => updateScaleBtn(-0.5)}
              onTouchStart={() => updateScaleBtn(-0.5)}
            >
              <i className="bi bi-zoom-out"></i>
              <span className="tooltip-text">縮小</span>
            </div>

            {/* 拡大 */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={() => updateScaleBtn(0.5)}
              onTouchStart={() => updateScaleBtn(0.5)}
            >
              <i className="bi bi-zoom-in"></i>
              <span className="tooltip-text">拡大</span>
            </div>

            {/* スケールリセット */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={() => {
                handleScaleChange(1.0);
                handleScaleChangeSlider(1.0);
              }}
              onTouchStart={() => {
                handleScaleChange(1.0);
                handleScaleChangeSlider(1.0);
              }}
            >
              <i className="bi bi-square-fill"></i>
              <span className="tooltip-text">拡大・縮小をリセット</span>
            </div>

            {/* canvas移動ツール */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={() => handleToolChange('handMode')}
              onTouchStart={() => handleToolChange('handMode')}
              style={{ backgroundColor: toolMode === 'handMode' ? '#9199AE' : '#c2c1c1' }}
            >
              <svg id="_レイヤー_32" data-name="レイヤー 32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .hand-icon-cls-1 {
                        fill: none;
                        stroke: #000;
                        stroke-miterlimit: 10;
                        stroke-width: .75px;
                      }
                    `}
                  </style>
                </defs>
                <path className="hand-icon-cls-1" d="m20.8,25.24c.26-.28.45-.53.56-.68,0,0,1.17-1.53,1.44-4.34.07-.75.05-.75.05-1.21,0-.21,0-.35,0-.49.01-.39.05-.69.09-.94.03-.23.06-.39.12-.65.1-.49.18-.86.2-.93.19-.83.36-1.59.66-3,.41-1.89.46-2.34.16-2.68-.2-.23-.54-.41-.85-.34-.48.11-.67.8-.97,1.89,0,0-1.27,4.55-1.75,4.55,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.2-.35-.1-1.84.05-.68.11-.89.25-1.84.13-.92.18-1.53.26-2.55.15-1.92.07-2.28-.2-2.51-.3-.26-.82-.32-1.15-.13-.5.29-.59,1.21-.72,2.51,0,.02,0-.03,0,0,0,.01-.11,1.06-.26,2.26-.18,1.44-.62,3.26-.89,3.24-.14,0-.18-.44-.51-3.2-.87-7.25-.27-1.8-.38-2.81-.2-1.71-.21-2.42-.73-2.69-.32-.17-.77-.12-1.07.09-.43.31-.49.93-.37,2.94.08,1.3.18,2.32.23,2.82.23,2.33.34,3.49.17,3.54-.27.07-1.1-1.59-1.58-3.2-.13-.42-.41-1.25-.96-2.9-.2-.59-.41-1.2-.85-1.28-.22-.04-.7.02-.95.33,0,0,0,.01-.02.02-.36.48-.22,1.15-.14,1.52.51,2.29.98,3.66.98,3.66.67,1.95.78,2.39.85,2.72.26,1.18.43,2.68.21,2.74-.18.05-.45-1.04-1.49-2.51-.64-.9-1.27-1.77-2.05-1.7-.37.03-.78.28-.94.64-.21.5.2,1,1.08,2.39,1.98,3.09,2.06,3.01,2.45,3.86.2.45.31.92.77,1.41.48.51,1.22.78,1.53,1.4.46-.06.86-.11,1.19-.16,0,0,2.82-.34,5.66.06.2.03.58.09.75.38.18.3-.05.86-.05.86,0,0-.04.34-.21.62-.18.29-.79.24-.9.23,0,0-1.33-.1-2.98-.1-.47,0-2.13.04-3.03.13,0,0-.72.07-.94-.23,0,0-.03-.04-.05-.08-.05-.09-.13-.23-.18-.41-.05-.18-.18-.67.1-.98.17-.19.42-.23.55-.23"/>
              </svg>
              <span className="tooltip-text">canvasの移動</span>
            </div>

            {/* プレビュー更新ボタン */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={getLayersInfoData}
              onTouchStart={getLayersInfoData}
            >
              <svg id="_レイヤー_20" data-name="レイヤー 20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                <defs>
                  <style>
                    {`
                      .preview-reload-cls-1, .preview-reload-cls-2 {
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }

                      .preview-reload-cls-1, .preview-reload-cls-2, .preview-reload-cls-3 {
                        fill: none;
                        stroke: #000;
                      }

                      .preview-reload-cls-1, .preview-reload-cls-3 {
                        stroke-width: .5px;
                      }

                      .preview-reload-cls-4 {
                        stroke-width: 0px;
                      }

                      .preview-reload-cls-2 {
                        stroke-width: .75px;
                      }

                      .preview-reload-cls-3 {
                        stroke-linejoin: round;
                      }
                    `}
                  </style>
                </defs>
                <path className="preview-reload-cls-2" d="m17.07,13.97h7.61c.61,0,1.11.5,1.11,1.11v11.56c0,.61-.5,1.11-1.11,1.11H8.53c-.61,0-1.11-.5-1.11-1.11v-7.45"/>
                <g>
                  <path className="preview-reload-cls-4" d="m15.37,8.93c1.33,2.07,1.2,5.04-.44,7.04-.8.99-1.92,1.75-3.18,2.09-1.25.36-2.61.31-3.86-.13-2.5-.85-4.4-3.41-4.33-6.17,0-2.76,2.1-5.29,4.66-5.88h0c.24-.06.48.09.53.34.05.22-.07.43-.26.52-2.1.87-3.44,2.94-3.49,5.07-.05,1.07.22,2.15.79,3.07.58.92,1.44,1.68,2.47,2.09,1.01.43,2.18.53,3.28.28,1.11-.22,2.12-.85,2.9-1.69,1.59-1.67,1.97-4.43.82-6.55-.02-.04,0-.07.03-.09s.07,0,.09.03v-.02Z"/>
                  <polygon className="preview-reload-cls-4" points="6.94 8.64 7.67 6.5 6.64 4.49 11.71 6.2 6.94 8.64"/>
                </g>
                <g id="_レイヤー_14" data-name=" レイヤー 14">
                  <path className="preview-reload-cls-3" d="m15.56,17.83c-.67,0-1.13.38-1.28.51-.1.07-.5.42-.72,1.02-.22.62-.13,1.16,0,1.87.08.45.17.89.44,1.42.16.28.53.99,1.33,1.44,1.41.81,2.91.22,3.2.1.72-.28,1.16-.69,1.41-.91.89-.83,1.26-1.78,1.41-2.28-.31-.06-.72-.14-1.19-.31-.72-.25-1.42-.5-2-1.09-.24-.25-.37-.47-.82-.91-.41-.39-.62-.52-.69-.55-.19-.1-.56-.31-1.09-.3l.03-.02h0Z"/>
                  <circle className="preview-reload-cls-4" cx="14.9" cy="20.01" r=".47"/>
                  <path className="preview-reload-cls-1" d="m14.97,25.36c.16-.33.31-.65.47-.97"/>
                  <path className="preview-reload-cls-1" d="m19.56,25.41l-.72-1.36"/>
                  <line className="preview-reload-cls-1" x1="13.15" y1="20.48" x2="12.68" y2="20.48"/>
                </g>
              </svg>
              <span className="tooltip-text">レイヤーのプレビューを更新</span>
            </div>
          </div>
        </div>

      </div>
    </Rnd>
  );
};


export { P5ScalePanel };
