import React, { useEffect, useState } from 'react';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { Rnd } from 'react-rnd';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { useP5ToolModeContext } from './P5ModeContext';

const P5SizePanel = () => {
  const {
    toggleSizePanelClose,
    sizePanelVisible,
    sizePanelPosition,
    setP5DrawingEnabled,
    handlePanelDragStop,
    setSizePanelPosition,
    onSizePanelResizeStop
  } = useP5PanelGroupContext();

  const {
    toolSize,
    setToolSize,
    updatetReductionDetail,
    getPencilParameters,
    getOilPenParameters,
    inputValue,
    setInputValue
  } = useP5CanvasCoreShare();

  //「ツールモードコンテキスト」から受け取るもの
  const {
    toolMode,
    customBrushModes
  } = useP5ToolModeContext();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };

  //const [inputValue, setInputValue] = useState(String(toolSize));
  const [selectedSize, setSelectedSize] = useState(toolSize);

  // サイズボタンの選択をハンドルする関数
  const handleSizeSelect = (size) => {
    const newSize = parseFloat(size);
    setToolSize(newSize);
    setSelectedSize(newSize);

    if (!customBrushModes.has(toolMode)) {
      return;
    } else {
      //updatetToolDetail();
      updatetReductionDetail(size);
      if (toolMode === 'pencilPen') {
        //エアブラシプレビューの更新
        getPencilParameters();
      }
      if (toolMode === 'oilPen') {
        //厚塗りペンプレビューの更新
        getOilPenParameters();
      }
    }
  };

  // ツールサイズの更新処理を関数として定義
  const updatetToolSize = (newSize) => {
    if (newSize >= 0.3 && newSize <= 100) {
      setToolSize(newSize);
      setSelectedSize(newSize);
      setInputValue(String(newSize));

      if (!customBrushModes.has(toolMode)) {
        return;
      } else {
        //updatetToolDetail();
        updatetReductionDetail(newSize);
      }
    }
  };

  // フォームの変更をハンドルする関数
  const handleToolSizeChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // フォーカスが外れた時の処理
  const handleBlur = () => {
    const inputNewSize = parseFloat(inputValue);
    const newSize = Math.round(inputNewSize * 10) / 10;
    if (newSize >= 0.3 && newSize <= 100) {
      updatetToolSize(newSize);
    } else {
      setInputValue(String(toolSize));
    }
  };
  
  // useEffect(() => {
  //   setInputValue(String(toolSize));
  // }, [toolSize]);
  
  useEffect(() => {
    const sizeButtons = document.querySelectorAll('.sizeBtn');
    const clickListener = (e) => {
      const size = e.currentTarget.getAttribute('data-size');
      updatetToolSize(parseFloat(size));
    };

    sizeButtons.forEach(div => {
      div.addEventListener('click', clickListener);
    });

    // return () => {
    //   sizeButtons.forEach(div => {
    //     div.removeEventListener('click', clickListener);
    //   });
    // };
  }, []);

  return (
    <Rnd
    bounds="parent"
    className="control-panel"
    size={{ width: sizePanelPosition.width, height: sizePanelPosition.height }}
    position={{ x: sizePanelPosition.x, y: sizePanelPosition.y }}
    minWidth="150"
    minHeight="150"
    maxWidth="300"
    maxHeight="300"
    onMouseDown={() => setP5DrawingEnabled(false)}
    // onTouchStart={() => setP5DrawingEnabled(false)}
    onTouchStart={(e) => {
      setP5DrawingEnabled(false);
      handleBackgroundTouch(e); // イベントオブジェクトを渡す
    }}
    onDragStop={(e, d) => handlePanelDragStop(setSizePanelPosition, e, d)}
    onResizeStop={onSizePanelResizeStop}
    style={{ position: 'absolute', zIndex: 32 }}
    cancel=".no-drag"
  >

    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-title">
        <span>サイズ</span>
        {/* 閉じる */}
        <div className="close-btn-position">
          {sizePanelVisible && (
            <div
              className="close-btn tooltip-container"
              onClick={toggleSizePanelClose}
              onTouchStart={toggleSizePanelClose}
            >
              <i className="bi bi-x-lg"></i>
              <span className="tooltip-text">閉じる</span>
            </div>
          )}
        </div>
      </div>

      <div className="tool-size-selectform tooltip-container">
        <input
          className="no-drag form-select-value"
          type="number"
          id="toolSizeForm"
          min="0.3"
          max="100"
          step="0.1"
          value={inputValue}
          onChange={handleToolSizeChange}
          onBlur={handleBlur}
          style={{ width: '60px' }}
        /><span>px</span>
        <div className="guide-icon">
          <i className="bi bi-arrows-fullscreen"></i>
          <i className="bi bi-arrow-down-up"></i>
        </div>
        <span className="tooltip-text">選択可能範囲：0.3〜100</span>
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }} className="size-btn-block-container">
        <div className="size-btn-block" style={{ height: '200px' }}>
          {["0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "1", "1.2", "1.5", "1.7", "2", "2.5", "3", "4", "5", "6", "7", "8", "10", "12", "15", "20", "25", "30", "40", "50", "60", "70", "80", "100"].map((size) => (
            <div
              key={size}
              className={`sizeBtn ${selectedSize === parseFloat(size) ? "selected-size-btn" : ""}`}
              data-size={size}
              onClick={() => handleSizeSelect(size)}
              onTouchStart={() => handleSizeSelect(size)} // タッチ操作をサポート
            >
              <div>
                <i className="bi bi-circle-fill" style={{ fontSize: `${parseFloat(size) > 15 ? 15 : size}px` }}></i>
              </div>
              <div>{size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </Rnd>
  );
};


export { P5SizePanel };