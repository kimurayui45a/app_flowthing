import React, { useEffect, useState } from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { Rnd } from 'react-rnd';

const P5LayersInfoPanel = () => {

  const {
    toggleLayersInfoPanelClose,
    layersInfoPanelVisible,
    layersInfoPanelPosition,
    setP5DrawingEnabled,
    setLayersInfoPanelPosition,
    handlePanelDragStop,
    colorPaletteDrag,
    colorPaletteDragEnd,
    isDraggablePanel,
    scrollPosition,
    handleScroll,
    sliderUpdateTrigger,
    setSliderUpdateTrigger
  } = useP5PanelGroupContext();

  const {
    isImageInsertionActive
  } = useP5ToolModeContext();

  const {
    layersInfo,
    setLayersInfo,
    layersInfoCanvas,
    selectLayer,
    setSelectLayer,
    selectSecondLayer,
    setSelectSecondLayer,
    secondLayerSelectMode,
    setSecondLayerSelectMode,
    selectedLayerInfo,
    handleSwapLayers,
    handleMoveLayers,
    getLayersInfoData,
    selectSecondLayerInfo,
    handleCancelSecondLayer,
    backgroundLayerVisible,
    setBackgroundLayerVisible
  } = useP5CanvasCoreShare();

  const handleBackgroundLayerVisible = () => {
    setBackgroundLayerVisible(!backgroundLayerVisible);
  };
  
  const [inputLayerName, setInputLayerName] = useState('');

  useEffect(() => {
    if (layersInfoPanelVisible) {
      const container = document.getElementById('layersContainer');
      if (container) {
        container.scrollTop = scrollPosition;
      }
    }
  }, []);

  //1度だけスライダーを更新する
  useEffect(() => {
    layersInfo.forEach((layer, index) => {
      const slider = document.getElementById(`slider-${index}`);
      if (slider) {
        const percentage = (layer.alphas - 0) / (255 - 0) * 100;
        slider.style.background = `linear-gradient(to right, transparent ${percentage}%, #ddd ${percentage}%)`;
      }
    });
  }, []);

    //スライダーを更新する
    useEffect(() => {
      if (sliderUpdateTrigger) {
        layersInfo.forEach((layer, index) => {
          const slider = document.getElementById(`slider-${index}`);
          if (slider) {
            const percentage = (layer.alphas - 0) / (255 - 0) * 100;
            slider.style.background = `linear-gradient(to right, transparent ${percentage}%, #ddd ${percentage}%)`;
          }
        });
        setSliderUpdateTrigger(false);
      }
    }, [sliderUpdateTrigger]);  

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };

  //レイヤーの選択モードを発火させる関数
  const handleLayerSelectModeChange = () => {
    setSecondLayerSelectMode(!secondLayerSelectMode); // 現在の値を反転させる
    //console.log('secondLayerSelectMode',secondLayerSelectMode);

    if (secondLayerSelectMode) {
      setSelectSecondLayer(null);
    }
  };

  // レイヤーの表示/非表示を切り替える関数
  const handleVisibilityChange = (index) => {
    const updatedLayersInfo = layersInfo.map((layer, layerIndex) => 
      layerIndex === index ? { ...layer, isVisible: !layer.isVisible } : layer
    );
    setLayersInfo(updatedLayersInfo);
  };

  const handleLayerSelect = (layerId) => {
    if (secondLayerSelectMode) {
      // レイヤー入れ替えモードがアクティブな場合、入れ替え対象としてレイヤーを設定
      if (layerId !== selectLayer) {
        // すでに選択されているレイヤー(selectLayer)と異なるレイヤーが選択された場合のみ、入れ替え対象として設定
        setSelectSecondLayer(layerId);
      }
    } else {
      // レイヤー入れ替えモードが非アクティブな場合、通常のレイヤー選択を行う
      setSelectLayer(layerId);
    }
  };


  // 透明度を更新するハンドラ
  const handleAlphaChange = (index, newAlpha, e) => {
    const updatedLayersInfo = layersInfo.map((layer, layerIndex) => 
      layerIndex === index ? { ...layer, alphas: newAlpha } : layer
    );
    setLayersInfo(updatedLayersInfo);

    const percentage = (newAlpha - 0) / (255 - 0) * 100;
    e.target.style.background = `linear-gradient(to right, transparent ${percentage}%, #ddd ${percentage}%)`;
  };


  // ブレンドモードを更新するハンドラ
  const handleBlendModeChange = (index, newBlendMode) => {
    const updatedLayersInfo = layersInfo.map((layer, layerIndex) => 
      layerIndex === index ? { ...layer, blendMode: newBlendMode } : layer
    );
    setLayersInfo(updatedLayersInfo);
  };


  // レイヤー名を更新する関数
  useEffect(() => {
    if (selectedLayerInfo) {
      setInputLayerName(selectedLayerInfo.name);
    }
  }, [selectedLayerInfo]);
  
  // テキストフィールドでの変更をハンドル
  const handleLayerNameChange = (e) => {
    const newValue = e.target.value;
    // 入力値が10文字以内の場合のみ更新を許可
    if (newValue.length <= 10) {
      setInputLayerName(newValue);
    }
  };
  
  // レイヤー名を更新する関数
  const updateLayerName = (layerId, newName) => {
    const updatedLayersInfo = layersInfo.map((layer) => 
      layer.layer_id === layerId ? { ...layer, name: newName } : layer
    );
    setLayersInfo(updatedLayersInfo);
  };
  
  // フォーカスが外れたときにレイヤー名を更新する
  const handleLayerNameBlur = () => {
    if (inputLayerName.trim() === '') {
      // 空白または空の入力の場合、前の名前に戻す
      setInputLayerName(selectedLayerInfo.name);
    } else {
      // それ以外の場合は、レイヤー名を更新する
      updateLayerName(selectedLayerInfo.layer_id, inputLayerName);
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
    cancel=".no-drag"
    className="control-panel"
    position={{ x: layersInfoPanelPosition.x, y: layersInfoPanelPosition.y }}
    onMouseDown={() => setP5DrawingEnabled(false)}
    // onTouchStart={() => setP5DrawingEnabled(false)}
    onTouchStart={(e) => {
      setP5DrawingEnabled(false);
      handleBackgroundTouch(e); // イベントオブジェクトを渡す
    }}
    onDragStop={(e, d) => handlePanelDragStop(setLayersInfoPanelPosition, e, d)}
    size={{ width: 250, height: 400 }}
    style={{ position: 'absolute', zIndex: 33 }}
    disableDragging={!isDraggablePanel}
  >

    {/* パネルタイトル */}
    <div className="panel-title">
      <span>レイヤー</span>

      {/* 閉じる */}
      <div className="close-btn-position">
        {layersInfoPanelVisible && (
          <div
            className="close-btn tooltip-container"
            onClick={toggleLayersInfoPanelClose}
            onTouchStart={toggleLayersInfoPanelClose}
          >
            <i className="bi bi-x-lg"></i>
            <span className="tooltip-text">閉じる</span>
          </div>
        )}
      </div>
    </div>

    {/* パネル内容 */}
    <div className="panel-tool-group">

      <div className="layers-panel-upper">
        {/* 選択されているレイヤー */}
        <div className="layername-input-box">
          <div className="layername-input-title">
            <i className="bi bi-pencil-square layername-input-icon"></i>
            <span className="layername-input-text" style={{ color: '#ececec' }}>描画レイヤー</span>
          </div>
          <div>
            <input
              type="text"
              className="no-drag form-select-value"
              value={inputLayerName}
              onChange={handleLayerNameChange}
              onBlur={handleLayerNameBlur}
              style={{ width: '160px' }}
            />
          </div>
        </div>

        {/* 2つ目に選択されているレイヤー */}
        <div className="layername-input-box">
          <div className="layername-input-title">
            <i className="bi bi-stickies" style={{ color: selectSecondLayer != null ? '#E0ECC9' : '#4A4A4A' }}></i>
            <span className="layername-input-text" style={{ color: selectSecondLayer != null ? '#ececec' : 'black' }}>選択レイヤー</span>
          </div>
          <span style={{ color: selectSecondLayer != null ? '#E0ECC9' : '#4A4A4A' }}>{selectSecondLayerInfo ? selectSecondLayerInfo.name : '未選択'}</span>

          {selectSecondLayer && 
            <div
              onClick={handleCancelSecondLayer}
              onTouchStart={handleCancelSecondLayer}
              className="select-secondlayer-cancel"
            >
              レイヤー選択解除
            </div>
          }
        </div>

        <div className="layers-panel-upper-btn">
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

          {/* レイヤー選択ボタン */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={handleLayerSelectModeChange}
            onTouchStart={handleLayerSelectModeChange}
            style={{ backgroundColor: secondLayerSelectMode ? '#9199AE' : '#c2c1c1' }}
          >

            <svg id="_レイヤー_27" data-name="レイヤー 27" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .secondlayer-selecticon-cls-1 {
                      stroke-width: 6px;
                    }

                    .secondlayer-selecticon-cls-1, .secondlayer-selecticon-cls-2, .secondlayer-selecticon-cls-3, .secondlayer-selecticon-cls-4 {
                      fill: none;
                      stroke: #000;
                    }

                    .secondlayer-selecticon-cls-1, .secondlayer-selecticon-cls-2, .secondlayer-selecticon-cls-4 {
                      stroke-miterlimit: 10;
                    }

                    .secondlayer-selecticon-cls-2, .secondlayer-selecticon-cls-3 {
                      stroke-width: .5px;
                    }

                    .secondlayer-selecticon-cls-2, .secondlayer-selecticon-cls-3, .secondlayer-selecticon-cls-4 {
                      stroke-linecap: round;
                    }

                    .secondlayer-selecticon-cls-3 {
                      stroke-linejoin: round;
                    }

                    .secondlayer-selecticon-cls-5 {
                      stroke-width: 0px;
                    }

                    .secondlayer-selecticon-cls-4 {
                      stroke-width: .75px;
                    }
                  `}
                </style>
              </defs>
              <g>
                <g id="_レイヤー_18のコピー_3" data-name=" レイヤー 18のコピー 3">
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="secondlayer-selecticon-cls-3" d="m15.47,15.38c.34-.07.59-.17.68-.21.68-.26,1.09-.65,1.32-.85.84-.79,1.19-1.67,1.32-2.14-.29-.06-.68-.13-1.11-.29-.68-.24-1.33-.47-1.88-1.03-.22-.24-.35-.44-.77-.85-.38-.37-.59-.5-.65-.51-.17-.09-.53-.29-1.03-.28h.03c-.63,0-1.07.35-1.21.47-.09.07-.47.4-.68.95-.22.59-.12,1.09,0,1.76.08.43.16.84.41,1.33.15.26.51.94,1.25,1.36"/>
                    <circle className="secondlayer-selecticon-cls-5" cx="12.75" cy="11.25" r=".44"/>
                    <path className="secondlayer-selecticon-cls-2" d="m17.13,16.32l-.68-1.28"/>
                    <line className="secondlayer-selecticon-cls-2" x1="11.11" y1="11.69" x2="10.65" y2="11.69"/>
                  </g>
                  <path className="secondlayer-selecticon-cls-4" d="m5.86,16.78V7.05c0-.59.48-1.07,1.07-1.07h15.13c.59,0,1.07.48,1.07,1.07v10.82c0,.59-.48,1.07-1.07,1.07h-7"/>
                </g>
                <g id="_レイヤー_22" data-name=" レイヤー 22">
                  <g>
                    <line className="secondlayer-selecticon-cls-1" x1="4.33" y1="25.86" x2="9.09" y2="21.1"/>
                    <polygon className="secondlayer-selecticon-cls-5" points="11.9 26.22 14.79 15.4 3.97 18.3 11.9 26.22"/>
                  </g>
                </g>
              </g>
              <path className="secondlayer-selecticon-cls-4" d="m23.13,10.34h2.64c.63,0,1.14.51,1.14,1.14v10.68c0,.63-.51,1.14-1.14,1.14h-11.38"/>
            </svg>
            <span className="tooltip-text">2つ目のレイヤーを選択する</span>
          </div>

          {!isImageInsertionActive && secondLayerSelectMode && (selectSecondLayer != null) ? (
            <>
              {/* 入れ替え */}
              <div
                className="panel-tool-button tooltip-container"
                onClick={handleSwapLayers}
                onTouchStart={handleSwapLayers}
              >

                <svg id="_レイヤー_28" data-name="レイヤー 28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .swapLayers-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .swapLayers-icon-cls-1, .swapLayers-icon-cls-2, .swapLayers-icon-cls-3, .swapLayers-icon-cls-4 {
                          fill: none;
                          stroke: #000;
                        }

                        .swapLayers-icon-cls-1, .swapLayers-icon-cls-2, .swapLayers-icon-cls-4 {
                          stroke-miterlimit: 10;
                        }

                        .swapLayers-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .swapLayers-icon-cls-2, .swapLayers-icon-cls-3, .swapLayers-icon-cls-4 {
                          stroke-width: .5px;
                        }

                        .swapLayers-icon-cls-5 {
                          stroke-width: 0px;
                        }

                        .swapLayers-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="swapLayers-icon-cls-1" x1="18.45" y1="13.39" x2="18.45" y2="25.71"/>
                    <polygon className="swapLayers-icon-cls-5" points="15.68 15.49 18.45 14.31 21.23 15.49 18.45 8.91 15.68 15.49"/>
                  </g>
                  <g>
                    <line className="swapLayers-icon-cls-1" x1="11.45" y1="8.91" x2="11.45" y2="21.23"/>
                    <polygon className="swapLayers-icon-cls-5" points="8.67 19.13 11.45 20.31 14.22 19.13 11.45 25.71 8.67 19.13"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="swapLayers-icon-cls-3" d="m4.64,19.81c-.49,0-.83.28-.95.37-.07.05-.36.31-.53.75-.17.46-.09.85,0,1.37.06.33.12.66.32,1.04.11.21.4.73.98,1.06,1.03.59,2.14.16,2.35.07.53-.21.85-.51,1.03-.67.66-.61.93-1.31,1.03-1.68-.23-.04-.53-.1-.87-.23-.53-.19-1.04-.36-1.47-.8-.18-.19-.27-.34-.6-.67-.3-.29-.46-.39-.51-.41-.14-.07-.42-.23-.8-.22h.02Z"/>
                    <circle className="swapLayers-icon-cls-5" cx="4.15" cy="21.41" r=".34"/>
                    <path className="swapLayers-icon-cls-2" d="m4.2,25.35c.11-.24.23-.48.34-.72"/>
                    <path className="swapLayers-icon-cls-2" d="m7.57,25.38l-.53-1"/>
                    <line className="swapLayers-icon-cls-2" x1="2.87" y1="21.76" x2="2.52" y2="21.76"/>
                  </g>
                  <g>
                    <g>
                      <path className="swapLayers-icon-cls-5" d="m26.4,12.91c-.15.14-.4.37-.8.56-.07.04-.15.08-.23.11-.21.08-1.32.52-2.36-.07.7-1.1,1.39-2.2,2.08-3.3.42.43.93.61,1.46.8.35.12.65.19.88.23-.11.36-.38,1.06-1.03,1.67Z"/>
                      <path className="swapLayers-icon-cls-5" d="m22.7,10.16c.19,0,.35.16.35.35s-.16.34-.35.34-.34-.15-.34-.34.15-.35.34-.35Z"/>
                      <path className="swapLayers-icon-cls-5" d="m23.32,7.9c.17-.31.52-.48.87-.42.35.07.63.35.68.7.45.34.61.86.43,1.21-.12.25-.36.35-.47.39l-.06.06c-.07-.08-.16-.18-.29-.3-.3-.29-.46-.38-.51-.41-.13-.07-.41-.22-.8-.21h.02c-.49-.01-.83.27-.95.36-.19-.29-.22-.65-.07-.94.2-.38.68-.58,1.15-.44Z"/>
                    </g>
                    <g>
                      <path className="swapLayers-icon-cls-3" d="m24.77,9.84c-.07-.08-.16-.18-.29-.3-.3-.29-.46-.38-.51-.41-.13-.07-.41-.22-.8-.21h.02c-.49-.01-.83.27-.95.36-.07.05-.36.31-.53.75-.16.46-.09.85,0,1.37.07.34.13.66.33,1.04.11.21.39.73.97,1.07,1.04.59,2.15.15,2.36.07.08-.03.16-.07.23-.11.4-.19.65-.42.8-.56.65-.61.92-1.31,1.03-1.67-.23-.04-.53-.11-.88-.23-.53-.19-1.04-.37-1.46-.8-.11-.12-.19-.23-.32-.37Z"/>
                      <path className="swapLayers-icon-cls-2" d="m22.75,14.44c.12-.24.23-.48.35-.72"/>
                      <path className="swapLayers-icon-cls-2" d="m26.13,14.47c-.18-.33-.36-.66-.53-1"/>
                      <line className="swapLayers-icon-cls-2" x1="21.42" y1="10.85" x2="21.07" y2="10.85"/>
                      <path className="swapLayers-icon-cls-4" d="m22.24,9.28c-.19-.29-.22-.65-.07-.94.2-.38.68-.58,1.15-.44.17-.31.52-.48.87-.42.35.07.63.35.68.7.45.34.61.86.43,1.21-.12.25-.36.35-.47.39"/>
                      <path className="swapLayers-icon-cls-4" d="m25.09,10.21c-.69,1.1-1.38,2.2-2.08,3.3"/>
                    </g>
                  </g>
                </svg>
                <span className="tooltip-text">選択レイヤーと内容を入れ替える</span>
              </div>

              {/* 転写 */}
              <div
                className="panel-tool-button tooltip-container"
                onClick={() => handleMoveLayers('move')}
                onTouchStart={() => handleMoveLayers('move')}
              >

                <svg id="_レイヤー_28のコピー" data-name="レイヤー 28のコピー" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .movelayers-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .movelayers-icon-cls-1, .movelayers-icon-cls-2 {
                          stroke-miterlimit: 10;
                        }

                        .movelayers-icon-cls-1, .movelayers-icon-cls-2, .movelayers-icon-cls-3 {
                          fill: none;
                          stroke: #000;
                        }

                        .movelayers-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .movelayers-icon-cls-2, .movelayers-icon-cls-3 {
                          stroke-width: .5px;
                        }

                        .movelayers-icon-cls-4 {
                          stroke-width: 0px;
                        }

                        .movelayers-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="movelayers-icon-cls-1" x1="8.27" y1="5.45" x2="8.27" y2="24.18"/>
                    <polygon className="movelayers-icon-cls-4" points="5.49 22.07 8.27 23.25 11.05 22.07 8.27 28.66 5.49 22.07"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="movelayers-icon-cls-3" d="m16.31,15.27c-.87,0-1.48.5-1.69.67-.13.09-.65.56-.95,1.33-.3.82-.17,1.52,0,2.45.11.59.22,1.17.57,1.85.2.37.7,1.3,1.74,1.89,1.84,1.06,3.82.28,4.19.13.95-.37,1.52-.91,1.84-1.19,1.17-1.09,1.65-2.34,1.84-2.98-.41-.07-.95-.19-1.56-.41-.95-.33-1.85-.65-2.61-1.43-.32-.33-.48-.61-1.08-1.19-.54-.52-.82-.69-.91-.72-.24-.13-.74-.41-1.43-.39l.04-.02Z"/>
                    <circle className="movelayers-icon-cls-4" cx="15.44" cy="18.13" r=".61"/>
                    <path className="movelayers-icon-cls-2" d="m15.53,25.14c.2-.43.41-.85.61-1.28"/>
                    <path className="movelayers-icon-cls-2" d="m21.54,25.19l-.95-1.78"/>
                    <line className="movelayers-icon-cls-2" x1="13.16" y1="18.74" x2="12.53" y2="18.74"/>
                  </g>
                </svg>
                <span className="tooltip-text">選択レイヤーに転写</span>
              </div>

              {/* 複製 */}
              <div
                className="panel-tool-button tooltip-container"
                onClick={() => handleMoveLayers('copy')}
                onTouchStart={() => handleMoveLayers('copy')}
              >

                <svg id="_レイヤー_28のコピー_2" data-name="レイヤー 28のコピー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .moveLayers-copy-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .moveLayers-copy-icon-cls-1, .moveLayers-copy-icon-cls-2 {
                          stroke-miterlimit: 10;
                        }

                        .moveLayers-copy-icon-cls-1, .moveLayers-copy-icon-cls-2, .moveLayers-copy-icon-cls-3 {
                          fill: none;
                          stroke: #000;
                        }

                        .moveLayers-copy-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .moveLayers-copy-icon-cls-2, .moveLayers-copy-icon-cls-3 {
                          stroke-width: .5px;
                        }

                        .moveLayers-copy-icon-cls-4 {
                          stroke-width: 0px;
                        }

                        .moveLayers-copy-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="moveLayers-copy-icon-cls-1" x1="8.27" y1="5.45" x2="8.27" y2="24.18"/>
                    <polygon className="moveLayers-copy-icon-cls-4" points="5.49 22.07 8.27 23.25 11.05 22.07 8.27 28.66 5.49 22.07"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="moveLayers-copy-icon-cls-3" d="m17.61,19.03c-.8,0-1.36.46-1.55.61-.12.08-.59.51-.87,1.22-.27.75-.15,1.39,0,2.24.1.54.2,1.07.53,1.7.19.34.65,1.19,1.6,1.73,1.68.97,3.5.25,3.84.12.87-.34,1.39-.83,1.68-1.09,1.07-1,1.51-2.14,1.68-2.73-.37-.07-.87-.17-1.43-.37-.87-.31-1.7-.59-2.39-1.31-.29-.31-.44-.56-.98-1.09-.49-.48-.75-.63-.83-.66-.22-.12-.68-.37-1.31-.36l.03-.02Z"/>
                    <circle className="moveLayers-copy-icon-cls-4" cx="16.81" cy="21.65" r=".56"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m16.89,28.06c.19-.39.37-.78.56-1.17"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m22.4,28.12l-.87-1.63"/>
                    <line className="moveLayers-copy-icon-cls-2" x1="14.72" y1="22.21" x2="14.14" y2="22.21"/>
                  </g>
                  <g id="_レイヤー_14-2" data-name=" レイヤー 14">
                    <path className="moveLayers-copy-icon-cls-3" d="m17.61,5.45c-.8,0-1.36.46-1.55.61-.12.08-.59.51-.87,1.22-.27.75-.15,1.39,0,2.24.1.54.2,1.07.53,1.7.19.34.65,1.19,1.6,1.73,1.68.97,3.5.25,3.84.12.87-.34,1.39-.83,1.68-1.09,1.07-1,1.51-2.14,1.68-2.73-.37-.07-.87-.17-1.43-.37-.87-.31-1.7-.59-2.39-1.31-.29-.31-.44-.56-.98-1.09-.49-.48-.75-.63-.83-.66-.22-.12-.68-.37-1.31-.36l.03-.02Z"/>
                    <circle className="moveLayers-copy-icon-cls-4" cx="16.81" cy="8.07" r=".56"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m16.89,14.48c.19-.39.37-.78.56-1.17"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m22.4,14.54l-.87-1.63"/>
                    <line className="moveLayers-copy-icon-cls-2" x1="14.72" y1="8.63" x2="14.14" y2="8.63"/>
                  </g>
                </svg>
                <span className="tooltip-text">選択レイヤーに複製</span>
              </div>
            </>
          ) : (
            <>
              {/* 入れ替え・グレーアウト */}
              <div className="panel-tool-grayout">
                <svg id="_レイヤー_28" data-name="レイヤー 28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .swapLayers-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .swapLayers-icon-cls-1, .swapLayers-icon-cls-2, .swapLayers-icon-cls-3, .swapLayers-icon-cls-4 {
                          fill: none;
                          stroke: #000;
                        }

                        .swapLayers-icon-cls-1, .swapLayers-icon-cls-2, .swapLayers-icon-cls-4 {
                          stroke-miterlimit: 10;
                        }

                        .swapLayers-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .swapLayers-icon-cls-2, .swapLayers-icon-cls-3, .swapLayers-icon-cls-4 {
                          stroke-width: .5px;
                        }

                        .swapLayers-icon-cls-5 {
                          stroke-width: 0px;
                        }

                        .swapLayers-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="swapLayers-icon-cls-1" x1="18.45" y1="13.39" x2="18.45" y2="25.71"/>
                    <polygon className="swapLayers-icon-cls-5" points="15.68 15.49 18.45 14.31 21.23 15.49 18.45 8.91 15.68 15.49"/>
                  </g>
                  <g>
                    <line className="swapLayers-icon-cls-1" x1="11.45" y1="8.91" x2="11.45" y2="21.23"/>
                    <polygon className="swapLayers-icon-cls-5" points="8.67 19.13 11.45 20.31 14.22 19.13 11.45 25.71 8.67 19.13"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="swapLayers-icon-cls-3" d="m4.64,19.81c-.49,0-.83.28-.95.37-.07.05-.36.31-.53.75-.17.46-.09.85,0,1.37.06.33.12.66.32,1.04.11.21.4.73.98,1.06,1.03.59,2.14.16,2.35.07.53-.21.85-.51,1.03-.67.66-.61.93-1.31,1.03-1.68-.23-.04-.53-.1-.87-.23-.53-.19-1.04-.36-1.47-.8-.18-.19-.27-.34-.6-.67-.3-.29-.46-.39-.51-.41-.14-.07-.42-.23-.8-.22h.02Z"/>
                    <circle className="swapLayers-icon-cls-5" cx="4.15" cy="21.41" r=".34"/>
                    <path className="swapLayers-icon-cls-2" d="m4.2,25.35c.11-.24.23-.48.34-.72"/>
                    <path className="swapLayers-icon-cls-2" d="m7.57,25.38l-.53-1"/>
                    <line className="swapLayers-icon-cls-2" x1="2.87" y1="21.76" x2="2.52" y2="21.76"/>
                  </g>
                  <g>
                    <g>
                      <path className="swapLayers-icon-cls-5" d="m26.4,12.91c-.15.14-.4.37-.8.56-.07.04-.15.08-.23.11-.21.08-1.32.52-2.36-.07.7-1.1,1.39-2.2,2.08-3.3.42.43.93.61,1.46.8.35.12.65.19.88.23-.11.36-.38,1.06-1.03,1.67Z"/>
                      <path className="swapLayers-icon-cls-5" d="m22.7,10.16c.19,0,.35.16.35.35s-.16.34-.35.34-.34-.15-.34-.34.15-.35.34-.35Z"/>
                      <path className="swapLayers-icon-cls-5" d="m23.32,7.9c.17-.31.52-.48.87-.42.35.07.63.35.68.7.45.34.61.86.43,1.21-.12.25-.36.35-.47.39l-.06.06c-.07-.08-.16-.18-.29-.3-.3-.29-.46-.38-.51-.41-.13-.07-.41-.22-.8-.21h.02c-.49-.01-.83.27-.95.36-.19-.29-.22-.65-.07-.94.2-.38.68-.58,1.15-.44Z"/>
                    </g>
                    <g>
                      <path className="swapLayers-icon-cls-3" d="m24.77,9.84c-.07-.08-.16-.18-.29-.3-.3-.29-.46-.38-.51-.41-.13-.07-.41-.22-.8-.21h.02c-.49-.01-.83.27-.95.36-.07.05-.36.31-.53.75-.16.46-.09.85,0,1.37.07.34.13.66.33,1.04.11.21.39.73.97,1.07,1.04.59,2.15.15,2.36.07.08-.03.16-.07.23-.11.4-.19.65-.42.8-.56.65-.61.92-1.31,1.03-1.67-.23-.04-.53-.11-.88-.23-.53-.19-1.04-.37-1.46-.8-.11-.12-.19-.23-.32-.37Z"/>
                      <path className="swapLayers-icon-cls-2" d="m22.75,14.44c.12-.24.23-.48.35-.72"/>
                      <path className="swapLayers-icon-cls-2" d="m26.13,14.47c-.18-.33-.36-.66-.53-1"/>
                      <line className="swapLayers-icon-cls-2" x1="21.42" y1="10.85" x2="21.07" y2="10.85"/>
                      <path className="swapLayers-icon-cls-4" d="m22.24,9.28c-.19-.29-.22-.65-.07-.94.2-.38.68-.58,1.15-.44.17-.31.52-.48.87-.42.35.07.63.35.68.7.45.34.61.86.43,1.21-.12.25-.36.35-.47.39"/>
                      <path className="swapLayers-icon-cls-4" d="m25.09,10.21c-.69,1.1-1.38,2.2-2.08,3.3"/>
                    </g>
                  </g>
                </svg>
              </div>

              {/* 転写・グレーアウト */}
              <div className="panel-tool-grayout">
                <svg id="_レイヤー_28のコピー" data-name="レイヤー 28のコピー" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .movelayers-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .movelayers-icon-cls-1, .movelayers-icon-cls-2 {
                          stroke-miterlimit: 10;
                        }

                        .movelayers-icon-cls-1, .movelayers-icon-cls-2, .movelayers-icon-cls-3 {
                          fill: none;
                          stroke: #000;
                        }

                        .movelayers-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .movelayers-icon-cls-2, .movelayers-icon-cls-3 {
                          stroke-width: .5px;
                        }

                        .movelayers-icon-cls-4 {
                          stroke-width: 0px;
                        }

                        .movelayers-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="movelayers-icon-cls-1" x1="8.27" y1="5.45" x2="8.27" y2="24.18"/>
                    <polygon className="movelayers-icon-cls-4" points="5.49 22.07 8.27 23.25 11.05 22.07 8.27 28.66 5.49 22.07"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="movelayers-icon-cls-3" d="m16.31,15.27c-.87,0-1.48.5-1.69.67-.13.09-.65.56-.95,1.33-.3.82-.17,1.52,0,2.45.11.59.22,1.17.57,1.85.2.37.7,1.3,1.74,1.89,1.84,1.06,3.82.28,4.19.13.95-.37,1.52-.91,1.84-1.19,1.17-1.09,1.65-2.34,1.84-2.98-.41-.07-.95-.19-1.56-.41-.95-.33-1.85-.65-2.61-1.43-.32-.33-.48-.61-1.08-1.19-.54-.52-.82-.69-.91-.72-.24-.13-.74-.41-1.43-.39l.04-.02Z"/>
                    <circle className="movelayers-icon-cls-4" cx="15.44" cy="18.13" r=".61"/>
                    <path className="movelayers-icon-cls-2" d="m15.53,25.14c.2-.43.41-.85.61-1.28"/>
                    <path className="movelayers-icon-cls-2" d="m21.54,25.19l-.95-1.78"/>
                    <line className="movelayers-icon-cls-2" x1="13.16" y1="18.74" x2="12.53" y2="18.74"/>
                  </g>
                </svg>
              </div>

              {/* 複製・グレーアウト */}
              <div className="panel-tool-grayout">
                <svg id="_レイヤー_28のコピー_2" data-name="レイヤー 28のコピー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
                  <defs>
                    <style>
                      {`
                        .moveLayers-copy-icon-cls-1 {
                          stroke-width: 1.5px;
                        }

                        .moveLayers-copy-icon-cls-1, .moveLayers-copy-icon-cls-2 {
                          stroke-miterlimit: 10;
                        }

                        .moveLayers-copy-icon-cls-1, .moveLayers-copy-icon-cls-2, .moveLayers-copy-icon-cls-3 {
                          fill: none;
                          stroke: #000;
                        }

                        .moveLayers-copy-icon-cls-2 {
                          stroke-linecap: round;
                        }

                        .moveLayers-copy-icon-cls-2, .moveLayers-copy-icon-cls-3 {
                          stroke-width: .5px;
                        }

                        .moveLayers-copy-icon-cls-4 {
                          stroke-width: 0px;
                        }

                        .moveLayers-copy-icon-cls-3 {
                          stroke-linejoin: round;
                        }
                      `}
                    </style>
                  </defs>
                  <g>
                    <line className="moveLayers-copy-icon-cls-1" x1="8.27" y1="5.45" x2="8.27" y2="24.18"/>
                    <polygon className="moveLayers-copy-icon-cls-4" points="5.49 22.07 8.27 23.25 11.05 22.07 8.27 28.66 5.49 22.07"/>
                  </g>
                  <g id="_レイヤー_14" data-name=" レイヤー 14">
                    <path className="moveLayers-copy-icon-cls-3" d="m17.61,19.03c-.8,0-1.36.46-1.55.61-.12.08-.59.51-.87,1.22-.27.75-.15,1.39,0,2.24.1.54.2,1.07.53,1.7.19.34.65,1.19,1.6,1.73,1.68.97,3.5.25,3.84.12.87-.34,1.39-.83,1.68-1.09,1.07-1,1.51-2.14,1.68-2.73-.37-.07-.87-.17-1.43-.37-.87-.31-1.7-.59-2.39-1.31-.29-.31-.44-.56-.98-1.09-.49-.48-.75-.63-.83-.66-.22-.12-.68-.37-1.31-.36l.03-.02Z"/>
                    <circle className="moveLayers-copy-icon-cls-4" cx="16.81" cy="21.65" r=".56"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m16.89,28.06c.19-.39.37-.78.56-1.17"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m22.4,28.12l-.87-1.63"/>
                    <line className="moveLayers-copy-icon-cls-2" x1="14.72" y1="22.21" x2="14.14" y2="22.21"/>
                  </g>
                  <g id="_レイヤー_14-2" data-name=" レイヤー 14">
                    <path className="moveLayers-copy-icon-cls-3" d="m17.61,5.45c-.8,0-1.36.46-1.55.61-.12.08-.59.51-.87,1.22-.27.75-.15,1.39,0,2.24.1.54.2,1.07.53,1.7.19.34.65,1.19,1.6,1.73,1.68.97,3.5.25,3.84.12.87-.34,1.39-.83,1.68-1.09,1.07-1,1.51-2.14,1.68-2.73-.37-.07-.87-.17-1.43-.37-.87-.31-1.7-.59-2.39-1.31-.29-.31-.44-.56-.98-1.09-.49-.48-.75-.63-.83-.66-.22-.12-.68-.37-1.31-.36l.03-.02Z"/>
                    <circle className="moveLayers-copy-icon-cls-4" cx="16.81" cy="8.07" r=".56"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m16.89,14.48c.19-.39.37-.78.56-1.17"/>
                    <path className="moveLayers-copy-icon-cls-2" d="m22.4,14.54l-.87-1.63"/>
                    <line className="moveLayers-copy-icon-cls-2" x1="14.72" y1="8.63" x2="14.14" y2="8.63"/>
                  </g>
                </svg>
              </div>
            </>
          )}
          <i className="bi bi-arrow-down-up"></i>
        </div>
      </div>




      {/* レイヤーUI */}
      <div
        id="layersContainer"
        style={{ overflowY: 'auto', height: '222px', display: 'flex', flexDirection: 'column' }}
        onScroll={handleScroll}
      >

        {layersInfo.map((layer, index) => (
          <div
            key={layer.layer_id}
            style={{
              order: -index
            }}
          >
            {/* 背景 */}
            <div
              className="layers-info-background"
              style={{
                backgroundColor: selectLayer === layer.layer_id ? '#9199AE' 
                : selectSecondLayer === layer.layer_id ? '#E0ECC9' : '#c2c1c1',                  
              }}
            >
              {/* {layer.name} */}
              
              <div className="flex">
                {/* 表示・非表示 */}  
                <div
                  className={`layers-visibility-checkbox ${layer.isVisible ? "checked" : ""}`}
                  onClick={() => handleVisibilityChange(index)}
                  onTouchStart={() => handleVisibilityChange(index)}
                >
                  {layer.isVisible && <i className="bi bi-vector-pen"></i>}
                </div>

                {/* レイヤープレビュー */}
                <div className="layers-info-preview-container">
                  <div className="layers-info-preview-background"></div>
                  <div
                    className="layers-info-preview"
                    style={{ backgroundImage: layersInfoCanvas[index] ? `url(${layersInfoCanvas[index]})` : 'none' }}
                  ></div>
                </div>
              </div>


              <div className="layers-status-box">
                {/* ブレンドモード選択 */}
                <div className="layers-status-box-blend">
                  <select
                    value={layer.blendMode}
                    onChange={e => handleBlendModeChange(index, e.target.value)}
                    className="no-drag layers-dropdown dropbox-select-value"
                  >
                    <option value="BLEND">通常</option>
                    <option value="DARKEST">比較(暗)</option>
                    <option value="LIGHTEST">比較(明)</option>
                    <option value="DIFFERENCE">色彩対比</option>
                    <option value="MULTIPLY">乗算</option>
                    <option value="EXCLUSION">除外</option>
                    <option value="SCREEN">スクリーン</option>
                    <option value="OVERLAY">オーバーレイ</option>
                    <option value="HARD_LIGHT">ハードライト</option>
                    <option value="SOFT_LIGHT">ソフトライト</option>
                    <option value="DODGE">覆い焼き</option>
                    <option value="BURN">焼き込み</option>
                    <option value="ADD">発光</option>
                  </select>
                </div>

                {/* レイヤー選択ボタン */}
                <div
                  onClick={() => handleLayerSelect(layer.layer_id)}
                  onTouchStart={() => handleLayerSelect(layer.layer_id)}
                  className="layers-namespace"
                >
                  {layer.name}
                  
                </div>
                {/* 透明度スライダー */}
                <div className="layer-alphas-container">
                  <div className="alphas-slider-container">
                    <div className="alphas-slider-background"></div>
                      <label>
                        <input
                          type="range"
                          min="0"
                          max="255"
                          value={layer.alphas}
                          onChange={(e) => handleAlphaChange(index, parseInt(e.target.value, 10), e)}
                          onMouseDown={colorPaletteDrag}
                          onTouchStart={colorPaletteDrag}
                          onMouseUp={colorPaletteDragEnd}
                          onTouchEnd={colorPaletteDragEnd}
                          className="no-drag layers-alphas-slider"
                          id={`slider-${index}`}
                        />
                      </label>
                  </div>
                  <span className="layer-alphas-value">{Math.round((layer.alphas / 255) * 100)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 背景レイヤー */}
        <div style={{ order: 1000 }}>
          <div className="layers-info-background" style={{ backgroundColor: '#c2c1c1' }}>

            <div className="flex">
              {/* 背景レイヤーの表示切り替え */}
              <div
                className={`layers-visibility-checkbox tooltip-container ${backgroundLayerVisible ? "checked" : ""}`}
                onClick={handleBackgroundLayerVisible}
                onTouchStart={handleBackgroundLayerVisible}
                >
                {backgroundLayerVisible && <i className="bi bi-camera-video-fill"></i>}
                <span className="tooltip-text">背景レイヤーの表示切り替え</span>
              </div>

              {/* 背景プレビュー */}
              <div style={{
                width: '56px',
                height: '42px',
                backgroundColor: '#FFFFFF',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '1px solid #000',
                borderRadius: '5px'
              }}></div>
            </div>

            <div className="backgroundlayer-status-box">
              <span>背景</span>
              <i className="bi bi-lock-fill"></i>
            </div>
          </div>
        </div>

      </div>
    </div>

  </Rnd>
  );
};


export { P5LayersInfoPanel };