import React, { useEffect, useRef, useState } from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectToolComponent } from './SelectToolComponent';
import { useP5Color } from '../P5ColorContext';


const SelectModeDetail = ({selectToolPanelParts, previewClassName, fastPreviewClassName, secondPreviewClassName}) => {

  const {
    handleImage,
    copyLayerActive,
    handleCopyLayerConfirm,
    getLayersInfoData,
    handleConfirmCancel,
    isGraphicsCreated,
    handleConfirm,
    selectedAreaCanvas,
    handleConfirmTransform,
    handleCancelSecondLayer,
    selectSecondLayerInfo,
    selectedLayerInfo,
    selectSecondLayer,
    defaultScaleMode,
    setDefaultScaleMode,
    handleSelectAllArea,
    handleCopyDelete,
    copyLayerCanvas,
    selectLayerBlurValue,
    setSelectLayerBlurValue,
    selectToolBlurBool,
    setSelectToolBlurBool,
    handleSelectLayerBlurDecision,
    handleSelectLayerClear,
    selectDeleteInversion,
    setSelectDeleteInversion,
    handleSelectFillColorChange
  } = useP5CanvasCoreShare();

  const { 
    showSizeAndDetailPanels,
    toggleColorPalettePanelVisible,
    toggleLayersInfoPanelVisible,
    toggleScalePanelVisible,
    layersInfoPanelVisible,
    scalePanelVisible,
    colorPalettePanelVisible,
    mainPanelMode,
  } = useP5PanelGroupContext();

  const { 
    isImageInsertionActive,
    handleToolChange,
    toolMode,
    setToolMode,
    penDetailGroup,
    selectDetailGroup,
    detailGroup,
    setDetailGroup,
    handleAlertMessage,
    favoritePen,
    favoritePenSecond,
    selectArrangeMode,
    setSelectArrangeMode
  } = useP5ToolModeContext();

  const {
    currentColor,
    setCurrentColor,
    currentAlphaColor,
    setCurrentAlphaColor,
    secondAlphaColor,
    setSecondAlphaColor,
    selectAlphaColorPreview,
    setSelectAlphaColorPreview,
    toggleAlphaPreviewMode,
    toggleSecondAlphaPreviewMode,
    toggleAlphaColorPreviewChange
  } = useP5Color();

  //ぼかしフォーム
  const [inputSelectLayerBlurValue, setInputSelectLayerBlurValue] = useState(String(selectLayerBlurValue));

  useEffect(() => {
    setInputSelectLayerBlurValue(String(selectLayerBlurValue));
  }, [selectLayerBlurValue]);

  const updateSelectLayerBlurValue = (newValue) => {
    if (newValue >= 0 && newValue <= 30) {
      setSelectLayerBlurValue(newValue);
      setInputSelectLayerBlurValue(String(newValue));
    }
  };
  
  const handleSelectLayerBlurChange = (e) => {
    const value = e.target.value;
    setInputSelectLayerBlurValue(value);
  };
  
  const handleSelectLayerBlur = () => {
    const inputNewValue = parseFloat(inputSelectLayerBlurValue);
    const newValue = Math.round(inputNewValue * 10) / 10;
    if (newValue >= 0 && newValue <= 30) {
      updateSelectLayerBlurValue(newValue);
    } else {
      setInputSelectLayerBlurValue(String(selectLayerBlurValue));
    }
  };
  
  const handlSelectToolBlurChange = () => {
    setSelectToolBlurBool(!selectToolBlurBool);
  };

  //選択ツールのモード（selectArrangeMode）を決める
  const handleSelectArrangeModeChange = (newSelectMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      setSelectArrangeMode(newSelectMode);
      if (toolMode !== 'selectMode') {
        setToolMode('selectMode');
      }
    }
  };

  //画像を縮小しないチェックボックス
  const handlDefaultScaleModeChange = () => {
    setDefaultScaleMode(!defaultScaleMode);
  };

  switch (selectToolPanelParts) {
    case 'arrangeModeTop':
      return  (
        <>
          {!isImageInsertionActive ? (
            <div className="select-arrange-btn-block">
              {/* 範囲削除 */}
              <div
                className="select-arrange-btn arrange-btn-left tooltip-container"
                onClick={(e) => handleSelectArrangeModeChange('selectAreaDelete', e)}
                onTouchStart={(e) => handleSelectArrangeModeChange('selectAreaDelete', e)}
                style={{ backgroundColor: (toolMode === 'selectMode' && selectArrangeMode === 'selectAreaDelete') ? '#9199AE' : '#c2c1c1' }}
              >
                {!selectDeleteInversion ? (
                  <>
                    <SelectToolComponent selectToolButton="selectAreaDeleteIcon" />
                    <span className="tooltip-text">選択範囲を削除</span>
                  </>
                ) : (
                  <>
                    <SelectToolComponent selectToolButton="selectAreaDeleteInversionIcon" />
                    <span className="tooltip-text">選択範囲外を削除</span>
                  </>
                )}
              </div>

              {/* 移動 */}
              <div
                className="select-arrange-btn arrange-btn-center tooltip-container"
                onClick={(e) => handleSelectArrangeModeChange('selectMove', e)}
                onTouchStart={(e) => handleSelectArrangeModeChange('selectMove', e)}
                style={{ backgroundColor: (toolMode === 'selectMode' && selectArrangeMode === 'selectMove') ? '#9199AE' : '#c2c1c1' }}
              >
                <i className="bi bi-arrows-move"></i>
                <span className="tooltip-text">移動</span>
              </div>

              {/* コピー */}
              <div
                className="select-arrange-btn tooltip-container arrange-btn-center"
                onClick={(e) => handleSelectArrangeModeChange('selectCopy', e)}
                onTouchStart={(e) => handleSelectArrangeModeChange('selectCopy', e)}
                style={{ backgroundColor: (toolMode === 'selectMode' && selectArrangeMode === 'selectCopy') ? '#9199AE' : '#c2c1c1' }}
              >
                <i className="bi bi-clipboard"></i>
                <span className="tooltip-text">コピー</span>
              </div>

              {/* ぼかし */}
              <div
                className="select-arrange-btn tooltip-container arrange-btn-center"
                onClick={(e) => handleSelectArrangeModeChange('selectBlur', e)}
                onTouchStart={(e) => handleSelectArrangeModeChange('selectBlur', e)}
                style={{ backgroundColor: (toolMode === 'selectMode' && selectArrangeMode === 'selectBlur') ? '#9199AE' : '#c2c1c1' }}
              >
                <i className="bi bi-image-alt image-alt-blur"></i>
                <span className="tooltip-text">選択範囲をぼかす</span>
              </div>

              {/* 塗りつぶし */}
              <div
                className="select-arrange-btn arrange-btn-right tooltip-container"
                onClick={(e) => handleSelectArrangeModeChange('selectFillColor', e)}
                onTouchStart={(e) => handleSelectArrangeModeChange('selectFillColor', e)}
                style={{ backgroundColor: (toolMode === 'selectMode' && selectArrangeMode === 'selectFillColor') ? '#9199AE' : '#c2c1c1' }}
              >
                <i className="bi bi-paint-bucket"></i>
                <span className="tooltip-text">選択範囲を塗りつぶす</span>
              </div>
            </div>
          ) : (
            <div className="select-arrange-btn-block select-arrange-btn-border">
              {/* 範囲削除グレーアウト */}
              <div
                className="select-arrange-btn-grayout arrange-btn-left"
                style={{ backgroundColor: (isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectAreaDelete') ? '#9199AE' : '#777777' }}
              >
                {!selectDeleteInversion ? (
                  <>
                    <SelectToolComponent selectToolButton="selectAreaDeleteIcon" />
                  </>
                ) : (
                  <>
                    <SelectToolComponent selectToolButton="selectAreaDeleteInversionIcon" />
                  </>
                )}
              </div>

              {/* 移動グレーアウト */}
              <div
                className="select-arrange-btn-grayout arrange-btn-center"
                style={{ backgroundColor: (isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectMove') ? '#9199AE' : '#777777' }}
              >
                <i className="bi bi-arrows-move"></i>
              </div>

              {/* コピーグレーアウト */}
              <div
                className="select-arrange-btn-grayout arrange-btn-center"
                style={{ backgroundColor: (isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectCopy') ? '#9199AE' : '#777777' }}
              >
                <i className="bi bi-clipboard"></i>
              </div>

              {/* ぼかしグレーアウト */}
              <div
                className="select-arrange-btn-grayout arrange-btn-center"
                style={{ backgroundColor: (isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectBlur') ? '#9199AE' : '#777777' }}
              >
                <i className="bi bi-image-alt image-alt-blur"></i>
              </div>

              {/* 塗りつぶしグレーアウト */}
              <div
                className="select-arrange-btn-grayout arrange-btn-right"
                style={{ backgroundColor: (isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectFillColor') ? '#9199AE' : '#777777' }}
              >
                <i className="bi bi-paint-bucket"></i>
              </div>
            </div>
          )}
        </>
        );
      case 'selectAllAreaBtn':
        return (
          <>
            <div
              className="all-select-button tooltip-container"
              onClick={(e) => handleSelectAllArea(e)}
              onTouchStart={(e) => handleSelectAllArea(e)}
            >
              <svg id="_レイヤー_43" data-name="レイヤー 43" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .all-select-cls-1 {
                        stroke-dasharray: 0 0 1.01 2.02;
                      }

                      .all-select-cls-1, .all-select-cls-2, .all-select-cls-3 {
                        fill: none;
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }

                      .all-select-cls-3 {
                        stroke-width: .5px;
                      }

                      .all-select-cls-4 {
                        font-family: KozGoPr6N-Regular-83pv-RKSJ-H, 'Kozuka Gothic Pr6N';
                        font-size: 8.21px;
                      }
                    `}
                  </style>
                </defs>
                <g>
                  <polyline className="all-select-cls-2" points="26.75 27.14 26.75 27.64 26.25 27.64"/>
                  <line className="all-select-cls-1" x1="24.24" y1="27.64" x2="7.09" y2="27.64"/>
                  <polyline className="all-select-cls-2" points="6.08 27.64 5.58 27.64 5.58 27.14"/>
                  <line className="all-select-cls-1" x1="5.58" y1="25.12" x2="5.58" y2="7.97"/>
                  <polyline className="all-select-cls-2" points="5.58 6.97 5.58 6.47 6.08 6.47"/>
                  <line className="all-select-cls-1" x1="8.1" y1="6.47" x2="25.25" y2="6.47"/>
                  <polyline className="all-select-cls-2" points="26.25 6.47 26.75 6.47 26.75 6.97"/>
                  <line className="all-select-cls-1" x1="26.75" y1="8.98" x2="26.75" y2="26.13"/>
                </g>
                <rect className="all-select-cls-3" x="7.63" y="8.51" width="17.08" height="17.08" rx="1.19" ry="1.19"/>
                <text className="all-select-cls-4" transform="translate(8.85 20.17)"><tspan x="0" y="0">ALL</tspan></text>
              </svg>
              <span className="tooltip-text">全選択</span>
            </div>
          </>
        );
      case 'selectModeIcon':
        return (
            <svg id="_レイヤー_38" data-name="レイヤー 38" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
            <defs>
              <style>
                {`
                  .select-mode-cls-1 {
                    stroke-width: 4px;
                  }
      
                  .select-mode-cls-1, .select-mode-cls-2 {
                    fill: none;
                    stroke: #000;
                    stroke-miterlimit: 10;
                  }
      
                  .select-mode-cls-2 {
                    stroke-dasharray: 0 0 0 0 0 0 1 2;
                    stroke-linecap: round;
                  }
      
                  .select-mode-cls-3 {
                    stroke-width: 0px;
                  }
                `}
              </style>
            </defs>
            <g id="_レイヤー_9" data-name=" レイヤー 9">
              <path className="select-mode-cls-2" d="m9.74,20.55V6.97s.03-.08.08-.08h15.87s.08.03.08.08v15.87s-.03.08-.08.08h-13.5"/>
            </g>
            <g id="_レイヤー_22のコピー" data-name=" レイヤー 22のコピー">
              <g>
                <line className="select-mode-cls-1" x1="4.45" y1="28.22" x2="7.81" y2="24.86"/>
                <polygon className="select-mode-cls-3" points="9.54 28.01 11.32 21.35 4.66 23.13 9.54 28.01"/>
              </g>
            </g>
          </svg>
        );

        case 'selectCopyOption':
          return (
            <>
              {/* コピーモードのオプション */}
              {/* コピーレイヤーのプレビュー */}
              <div>
                <span className="destination-layer" style={{ color: '#ececec' }}>現在コピー中の描画</span>
                <div className="copy-layer-preview-container">
                  <div className="copy-layer-preview-background"></div>
                  <div
                    className="copy-layer-preview"
                    style={{ backgroundImage: copyLayerCanvas ? `url(${copyLayerCanvas})` : 'none' }}
                  ></div>
                </div>
              </div>

              <div className="flex" style={{ margin: '2px' }}>
                {copyLayerActive ? (
                  <>
                    {/* コピーデータ削除ボタン */}
                    <div
                      className="panel-tool-button tooltip-container"
                      onClick={handleCopyDelete}
                      onTouchStart={handleCopyDelete}
                      style={{ margin: '3px' }}
                    >
                      <i className="bi bi-clipboard-x-fill"></i>
                      <span className="tooltip-text">コピーした描画を削除</span>
                    </div>
                    {/* ペーストボタン */}
                    <div style={{ margin: '3px' }}>
                      <SelectToolComponent selectToolButton="copyLayerBtn" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="panel-tool-grayout" style={{ margin: '3px', color: '#4A4A4A' }}>
                      <i className="bi bi-clipboard-x-fill"></i>
                    </div>
                    <div className="panel-tool-grayout" style={{ margin: '3px', color: '#4A4A4A' }}>
                      <i className="bi bi-clipboard"></i>
                    </div>
                  </>
                )}
              </div>
              
            </>
          );
        case 'selectBlurOption':
          return (
            <>
              {/* ぼかしモードのオプション */}
              {/* ぼかし値フォーム */}
              <div className="select-blur-option-container">
                <div className="flex-column-end" style={{ alignItems: 'flex-start', paddingTop: '16px' }}>
                  <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec' }}>サンプル</span>
                  <div className="pen-tool-preview-container" style={{ marginRight: '8px' }}>
                    <div className="pen-tool-preview-background flex">
                      <div className="layer-blur-sample" style={{ filter: `blur(${selectLayerBlurValue}px)` }}></div>
                    </div>
                  </div>
                </div>
      
                <div className="blur-option-container-right">
                  <div className="flex-column-start" style={{ alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ぼかし値</span>
                    <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                      <input
                        className="no-drag form-select-value tooltip-container"
                        type="number"
                        id="selectLayerBlurForm"
                        min="0"
                        max="30"
                        step="0.1"
                        style={{ width: '60px', fontSize: '14px' }}
                        value={inputSelectLayerBlurValue}
                        onChange={handleSelectLayerBlurChange}
                        onBlur={handleSelectLayerBlur}
                      /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                      <span className="tooltip-text">最大値30px</span>
                    </div>
                  </div>

                  <div className="flex">
                    {/* レイヤーぼかし時に原本を残すかどうかのチェックボックス */}
                    <div
                      className={`layers-visibility-checkbox tooltip-container ${selectToolBlurBool ? "checked" : ""}`}
                      onClick={handlSelectToolBlurChange}
                      onTouchStart={handlSelectToolBlurChange}
                      style={{ margin: '4px' }}
                      >
                      {selectToolBlurBool && <i className="bi bi-check-lg"></i>}
                      <span className="tooltip-text">原本を複製してぼかす</span>
                    </div>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>コピー</span>
                  </div>
  
                  {/* ぼかし決定ボタン */}
                  {isGraphicsCreated && isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectBlur' ? (
                    <div
                      className="select-confirm-btn tooltip-container"
                      onClick={handleSelectLayerBlurDecision}
                      onTouchStart={handleSelectLayerBlurDecision}
                      style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '5px' }}
                    >
                      実行
                      <span className="tooltip-text">ぼかしを実行する</span>
                    </div>
                  ) : (
                    <div className="confirm-btn-grayout" style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '4px' }}>実行</div>
                  )}
                </div>
              </div>
            </>
          );
        case 'gradationPreview':
          return (
            <>
              <div>
                <span className="destination-layer" style={{ color: '#ececec' }}>プレビュー</span>
                <div className="gradation-preview-container">
                  <div className="gradation-preview-background"></div>
                  <div
                    className="gradation-preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `linear-gradient(to right, ${currentAlphaColor}, ${secondAlphaColor})`
                    }}
                  ></div>
                </div>
              </div>
            </>
          );
        case 'alphaColorsPreview':
          return (
            <>
              {/* 透明度プレビュー */}
              <div className="flex-justify-end">
                <div className={`${previewClassName}`}>
                  {/* 1つ目カラープレビューボタン */}
                  <div
                    className={`${fastPreviewClassName} ${selectAlphaColorPreview ? "active" : ""}`}
                    onClick={() => {
                      // setColorPreviewButton(firstColorPreview);
                      toggleAlphaPreviewMode();
                    }}
                    onTouchStart={() => {
                      // setColorPreviewButton(firstColorPreview);
                      toggleAlphaPreviewMode();
                    }}
                    style={{
                      backgroundColor: currentAlphaColor,
                      margin: '0px'
                    }}
                  ></div>
                </div>
                {/* カラープレビューチェンジボタン */}
                <div
                    className="preview-change-icon tooltip-container"
                    onClick={toggleAlphaColorPreviewChange}
                    onTouchStart={toggleAlphaColorPreviewChange}
                >
                  <i className="bi bi-arrow-left-right"></i>
                  <span className="tooltip-text">二次色を入れ替える</span>
                </div>

                {/* 2つ目カラープレビューボタン */}
                <div className={`${previewClassName}`}>
                  <div
                    className={`${secondPreviewClassName} ${!selectAlphaColorPreview ? "active" : ""}`}
                    onClick={() => {
                      // setColorPreviewButton(secondColorPreview);
                      toggleSecondAlphaPreviewMode();
                    }}
                    onTouchStart={() => {
                      // setColorPreviewButton(secondColorPreview);
                      toggleSecondAlphaPreviewMode();
                    }}
                    style={{
                      backgroundColor: secondAlphaColor,
                      margin: '0px'
                    }}
                  ></div>
                </div>
              </div>
            </>
          );

        case 'selectFillColorBtn':
          return (
              <>
                {/* 塗りつぶしボタン */}
                <div className="flex-column-end" style={{ marginTop: '2px', marginBottom: '-2px', alignItems: 'flex-end' }}>
                {isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectFillColor' ? (
                  <>
                    <div
                      className="select-confirm-btn tooltip-container"
                      onClick={() => handleSelectFillColorChange(true, 'onecolor')}
                      onTouchStart={() => handleSelectFillColorChange(true, 'onecolor')}
                      style={{ width: 'auto', height: 'auto', margin: '3px', fontSize: '12px', padding: '2px 4px' }}
                    >
                      <i className="bi bi-paint-bucket"></i>1色で塗る
                      <span className="tooltip-text">1色で塗りつぶす</span>
                    </div>

                    <div className="flex-end-end" style={{ margin: '3px' }}>
                      <div
                        className="select-confirm-btn tooltip-container"
                        onClick={() => handleSelectFillColorChange(false, 'vertical')}
                        onTouchStart={() => handleSelectFillColorChange(false, 'vertical')}
                        style={{ width: 'auto', height: 'auto', marginRight: '5px', marginLeft: '5px', fontSize: '12px', padding: '2px 4px' }}
                      >
                        <i className="bi bi-distribute-horizontal"></i>垂直
                        <span className="tooltip-text">縦方向にグラデーション</span>
                      </div>

                      <div
                        className="select-confirm-btn tooltip-container"
                        onClick={() => handleSelectFillColorChange(false, 'beside')}
                        onTouchStart={() => handleSelectFillColorChange(false, 'beside')}
                        style={{ width: 'auto', height: 'auto', fontSize: '12px', padding: '2px 4px' }}
                      >
                        <i className="bi bi-distribute-vertical"></i>水平
                        <span className="tooltip-text">横方向にグラデーション</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="confirm-btn-grayout" style={{ width: 'auto', height: 'auto', margin: '2px', fontSize: '12px', padding: '2px 4px' }}>
                      <i className="bi bi-paint-bucket"></i>1色で塗る
                    </div>
                    <div className="flex-end-end" style={{ margin: '2px' }}>
                      <div className="confirm-btn-grayout" style={{ width: 'auto', height: 'auto', marginRight: '4px', fontSize: '12px', padding: '2px 4px', marginLeft: '4px' }}><i className="bi bi-distribute-horizontal"></i>垂直</div>
                      <div className="confirm-btn-grayout" style={{ width: 'auto', height: 'auto', fontSize: '12px', padding: '2px 4px' }}><i className="bi bi-distribute-vertical"></i>水平</div>
                    </div>
                  </>
                )}
              </div>
            </>
          );

      case 'imageToolOption':
        return (
          <>
            {/* 画像挿入モードの詳細 */}
            <div className="flex">
              <div
                className={`layers-save-checkbox tooltip-container ${defaultScaleMode ? "checked" : ""}`}
                onClick={handlDefaultScaleModeChange}
                onTouchStart={handlDefaultScaleModeChange}
                >
                {defaultScaleMode && <i className="bi bi-check-lg"></i>}
                <span className="tooltip-text">画像を縮小しない</span>
              </div>
              <span className="selection-range-text" style={{ color: '#ececec' }}>画像を実際のサイズで挿入する</span>
            </div>
            <span className="selection-range-text" style={{ marginTop: '5px', color: '#ececec' }}>
              ※挿入画像がcanvasサイズの2倍以上の<br />場合は対象外で自動で縮小されます。
            </span>
          </>
        );

        case 'selectLayerClearIcon':
          return (
            <>
              {/* レイヤーの描画を全てクリアするアイコン */}
              <svg id="_レイヤー_44" data-name="レイヤー 44" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .layer-delete-cls-1 {
                        fill: none;
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }
                    `}
                  </style>
                </defs>
                <line className="layer-delete-cls-1" x1="16.33" y1="7.01" x2="16.33" y2="11.33"/>
                <line className="layer-delete-cls-1" x1="11.42" y1="8.32" x2="13.59" y2="12.06"/>
                <line className="layer-delete-cls-1" x1="7.83" y1="11.91" x2="11.57" y2="14.08"/>
                <line className="layer-delete-cls-1" x1="6.51" y1="16.82" x2="10.83" y2="16.82"/>
                <line className="layer-delete-cls-1" x1="7.83" y1="21.74" x2="11.57" y2="19.58"/>
                <line className="layer-delete-cls-1" x1="11.42" y1="25.33" x2="13.59" y2="21.59"/>
                <line className="layer-delete-cls-1" x1="16.33" y1="26.65" x2="16.33" y2="22.33"/>
                <line className="layer-delete-cls-1" x1="21.24" y1="25.33" x2="19.08" y2="21.59"/>
                <line className="layer-delete-cls-1" x1="24.84" y1="21.74" x2="21.1" y2="19.58"/>
                <line className="layer-delete-cls-1" x1="26.16" y1="16.82" x2="21.84" y2="16.82"/>
                <line className="layer-delete-cls-1" x1="24.84" y1="11.91" x2="21.1" y2="14.08"/>
                <line className="layer-delete-cls-1" x1="21.24" y1="8.32" x2="19.08" y2="12.06"/>
              </svg>
            </>
          );
        case 'selectAreaDeleteBtn':
          return (
            <>
              {/* 「選択範囲」を削除するボタン */}
              <div
                className="panel-tool-button-small tooltip-container"
                onClick={() => setSelectDeleteInversion(false)}
                onTouchStart={() => setSelectDeleteInversion(false)}
                style={{
                  backgroundColor: !selectDeleteInversion ? '#9199AE' : '#c2c1c1',
                  borderRadius: '5px 0px 0px 5px',
                  borderRight: '0.5px solid #4A4A4A'
                }}
              >
                <SelectToolComponent selectToolButton="selectAreaDeleteIcon" />
                <span className="tooltip-text">選択範囲を削除</span>
              </div>
            </>
          );

        case 'selectAreaDeleteInversionBtn':
          return (
            <>
              {/* 「選択範囲外」を削除するボタン */}
              <div
                className="panel-tool-button-small tooltip-container"
                onClick={() => setSelectDeleteInversion(true)}
                onTouchStart={() => setSelectDeleteInversion(true)}
                style={{
                  backgroundColor: selectDeleteInversion ? '#9199AE' : '#c2c1c1',
                  borderRadius: '0px 5px 5px 0px',
                  borderLeft: '0.5px solid #4A4A4A'
                }}
              >
                <SelectToolComponent selectToolButton="selectAreaDeleteInversionIcon" />
                <span className="tooltip-text">選択範囲外を削除</span>
              </div>
            </>
          );
      default:
        return  (
          <>
            <span>詳細設定はありません。</span>
          </>
        );
  }

};


export { SelectModeDetail };