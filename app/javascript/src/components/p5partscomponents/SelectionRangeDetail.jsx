import React, { useRef } from 'react';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectToolComponent } from './SelectToolComponent';
import { SelectModeDetail } from './SelectModeDetail';
import { AlphaColorPicker } from './AlphaColorPicker';
import { ShapesPartsComponent } from './ShapesPartsComponent';
//import { useP5PanelGroupContext } from '../P5PanelGroupContext';

const SelectionRangeDetail = () => {

  const {
    handleImage,
    handleConfirmCancel,
    isGraphicsCreated,
    handleConfirm,
    selectedAreaCanvas,
    handleConfirmTransform,
    selectSecondLayerInfo,
    selectedLayerInfo,
    selectSecondLayer,
    handleSelectLayerClear,
    selectedAreaShow,
    setSelectedAreaShow
  } = useP5CanvasCoreShare();

  // const { 
  //   showSizeAndDetailPanels,
  //   toggleColorPalettePanelVisible,
  //   toggleLayersInfoPanelVisible,
  //   toggleScalePanelVisible,
  //   layersInfoPanelVisible,
  //   scalePanelVisible,
  //   colorPalettePanelVisible,
  //   mainPanelMode,
  // } = useP5PanelGroupContext();

  const { 
    isImageInsertionActive,
    toolMode,
    setToolMode,
    handleAlertMessage,
    selectArrangeMode
  } = useP5ToolModeContext();


  //選択ツールグループの詳細パネルでのボタン切り替えの関数
  const selectToolModeChange = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      setToolMode(newToolMode);
    }
  };

  //画像挿入ボタン
  const fileInputRef = useRef(null);
  const handleDivClick = (e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      // 隠されたinput要素のclickイベントをトリガー
      fileInputRef.current.click();
    }
  };

  //選択範囲の描画の表示切り替え
  const handleSelectedAreaShow = () => {
    setSelectedAreaShow(!selectedAreaShow);
  };

  //選択されたモードに応じてオプション内の内容を切り替える
  //「selectMove」「selectCopy」「selectBlur」「selectFillColor」「selectAreaDelete」
  const renderDetailComponent = (toolMode, selectArrangeMode) => {
    if (toolMode === 'selectMode') {
      if (selectArrangeMode === 'selectCopy') {
        //「コピーモード」オプション
        return <SelectModeDetail selectToolPanelParts="selectCopyOption" />;
  
      } else if (selectArrangeMode === 'selectBlur') {
        //「ぼかし」オプション
        return <SelectModeDetail selectToolPanelParts="selectBlurOption" />;
        
      } else if (selectArrangeMode === 'selectFillColor') {
        //「塗りつぶし」オプション
        return (
          <>
            <div className="flex-column-end" style={{ alignItems: 'flex-start', marginTop: '4px' }}>
              <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec' }}>透明度スライダー</span>
              <AlphaColorPicker />
            </div>
            
            <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: '-5px' }}>
              <SelectModeDetail selectToolPanelParts="gradationPreview" />
              <div>
              <SelectModeDetail selectToolPanelParts="alphaColorsPreview" previewClassName="alpha-colors-preview" fastPreviewClassName="color-preview-fast" secondPreviewClassName="color-preview-second" />
                <SelectModeDetail selectToolPanelParts="selectFillColorBtn" />
              </div>
            </div>
          </>
        );
      }
    } else if (toolMode === 'imageTool') {
      //「画像挿入」オプション
      return <SelectModeDetail selectToolPanelParts="imageToolOption" />;
    }
    // 該当する条件がない場合のデフォルトのレンダリング「selectAreaDelete」「selectMove」
    return <span className="text-Rounded" style={{ fontSize: '14px', color: '#ececec' }}>設定はありません。</span>;
  }


  return (
    <>
      {/* 「選択範囲」グループパネル・上部 */}
      <div className="selection-range-topline">
        {/* 選択ツールのモードボタン */}
        <div className="selection-range-topline-left">
          <SelectModeDetail selectToolPanelParts="arrangeModeTop" />
        </div>
        {/* 画像ツール */}
        <div className="selection-range-topline-right">
          <SelectToolComponent handleChangeButton={selectToolModeChange} selectToolButton="imageTool" />
        </div>
      </div>

      {/* 「選択範囲」グループパネル・中部 */}
      <div className="selection-range-centerline">
        
        {/* 一時レイヤーのプレビュー */}
        <div className="selection-range-preview-left">
          <span className="destination-layer" style={{ color: '#ececec' }}>選択範囲のプレビュー</span>
          <div className="selected-area-preview-container">
            <div className="selected-area-preview-background"></div>
            <div
              className="selected-area-preview"
              style={{ backgroundImage: selectedAreaCanvas ? `url(${selectedAreaCanvas})` : 'none' }}
            ></div>
          </div>

          {toolMode === 'imageTool' ? (
            <div className="selected-area-preview-layername">
              <div style={{ color: '#ececec' }}>
                <span>描画先：</span>
                <span style={{ fontWeight: '500' }}>
                描画レイヤー
                </span>
              </div>
              <span style={{ color: '#7FA8EB' }}>{selectedLayerInfo?.name || '未選択'}</span>
            </div>
          ): (
            <div className="selected-area-preview-layername">
              <div style={{ color: '#ececec' }}>
                <span>{selectArrangeMode === 'selectMove' ? '移動先：' : '描画先：'}</span>
                <span style={{ fontWeight: '500' }}>
                  {selectSecondLayer ? '選択レイヤー' : '描画レイヤー'}
                </span>
              </div>
              {selectSecondLayer ? (
                <div>
                  <span style={{ color: '#E0ECC9' }}>{selectSecondLayerInfo ? selectSecondLayerInfo.name : '未選択'}</span>
                </div>
              ) : 
              <span style={{ color: '#7FA8EB' }}>{selectedLayerInfo?.name || '未選択'}</span>
              }
            </div>
          )}
        </div>

        {/* 「選択範囲」削除ボタン */}
        {toolMode === 'selectMode' && selectArrangeMode === 'selectAreaDelete' && (
          <div className="area-delete-button">
            <div className="select-area-inversion-box">
              {/* 「選択範囲」を削除するボタン */}
              <SelectModeDetail selectToolPanelParts="selectAreaDeleteBtn" />

              {/* 「選択範囲外」を削除するボタン */}
              <SelectModeDetail selectToolPanelParts="selectAreaDeleteInversionBtn" />
            </div>
            
            <div
              className="panel-tool-button tooltip-container"
              onClick={handleSelectLayerClear}
              onTouchStart={handleSelectLayerClear}
              style={{ borderRadius: '50%' }}
            >
              <SelectModeDetail selectToolPanelParts="selectLayerClearIcon" />
              <span className="tooltip-text">描画レイヤーの描画を消去</span>
            </div>
          </div>
        )}

        {/* 全選択ボタン */}
        {toolMode === 'selectMode' && selectArrangeMode !== 'selectAreaDelete' && (
          <div className="flex all-select-button-box" style={{ alignItems: 'flex-end' }}>
            {/* 選択範囲の描画の表示切り替え */}
            <div
              className={`layers-visibility-checkbox tooltip-container ${selectedAreaShow ? "checked" : ""}`}
              onClick={handleSelectedAreaShow}
              onTouchStart={handleSelectedAreaShow}
              >
              {selectedAreaShow && <i className="bi bi-camera-video-fill"></i>}
              <span className="tooltip-text">選択範囲の描画の表示切り替え</span>
            </div>
            <SelectModeDetail selectToolPanelParts="selectAllAreaBtn" />
          </div>
        )}
        

        <div className="flex-column-end" style={{ alignItems: 'flex-end' }}>
          {isGraphicsCreated && isImageInsertionActive && toolMode === 'selectMode' ? (
            // 一時レイヤーが作成されており、画像挿入がアクティブで、選択モードの場合は「変形の決定」ボタンを表示
            <>
              {/* 「選択範囲」確定ボタン */}
              <div
                className="select-confirm-btn tooltip-container"
                onClick={handleConfirmTransform}
                onTouchStart={handleConfirmTransform}
                style={{ marginBottom: '5px' }}
              >
                <span className="select-confirm-icon"><SelectModeDetail selectToolPanelParts="selectModeIcon" /></span>
                <span className="select-confirm-btn-text">確定</span>
                <span className="tooltip-text">変形の決定</span>
              </div>
            </>
          ) : isGraphicsCreated && !isImageInsertionActive && toolMode === 'selectMode' && selectArrangeMode === 'selectAreaDelete' ? (
            <>
              {/* 「範囲削除」ボタン */}
              <div
                className="select-confirm-btn tooltip-container"
                onClick={handleConfirm}
                onTouchStart={handleConfirm}
                style={{ marginBottom: '5px' }}
              >
                <span className="select-confirm-icon"><SelectModeDetail selectToolPanelParts="selectModeIcon" /></span>
                <span className="select-confirm-btn-text">削除</span>
                <span className="tooltip-text">選択範囲を削除</span>
              </div>
            </>
          ) : isGraphicsCreated && !isImageInsertionActive && toolMode === 'selectMode' ? (
            <>
              {/* 「選択範囲」決定ボタン */}
              <div
                className="select-confirm-btn tooltip-container"
                onClick={handleConfirm}
                onTouchStart={handleConfirm}
                style={{ marginBottom: '5px' }}
              >
                <span className="select-confirm-icon"><SelectModeDetail selectToolPanelParts="selectModeIcon" /></span>
                <span className="select-confirm-btn-text">決定</span>
                <span className="tooltip-text">選択範囲を決定</span>
              </div>
            </>
          ) : isGraphicsCreated && isImageInsertionActive && toolMode === 'imageTool' ? (
            <>
              {/* 「画像挿入」確定ボタン */}
              <div
                className="select-confirm-btn tooltip-container"
                onClick={handleConfirm}
                onTouchStart={handleConfirm}
                style={{ marginBottom: '5px' }}
              >
                <span className="select-confirm-icon-img"><i className="bi bi-image"></i></span>
                <span className="select-confirm-btn-text">確定</span>
                <span className="tooltip-text">画像をcanvasに描画</span>
              </div>
            </>
          ) : !isImageInsertionActive && toolMode === 'imageTool' ? (
            <>
              {/* 「画像挿入」ボタン */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                onChange={handleImage}
              />
              <div
                className="select-confirm-btn tooltip-container"
                onClick={(e) => handleDivClick(e)}
                onTouchStart={(e) => handleDivClick(e)}
                style={{ marginBottom: '5px' }}
              >
                <span className="select-confirm-icon-img"><i className="bi bi-image"></i></span>
                <span className="select-confirm-btn-text">挿入</span>
                <span className="tooltip-text">画像を挿入する</span>
              </div>
            </>
          ) : (
            <>
              {/* 決定ボタン・グレーアウト */}
              <div className="confirm-btn-grayout" style={{ marginBottom: '4px' }}>決定</div>
            </>
          )}

          {isGraphicsCreated ? (
            <>              
              {/* キャンセルボタン */}
              <div
                className="select-confirm-btn tooltip-container"
                onClick={handleConfirmCancel}
                onTouchStart={handleConfirmCancel}
              >
                キャンセル
                <span className="tooltip-text">選択範囲・操作のキャンセル</span>
              </div>
            </>
          ) : (
            <>
              {/* キャンセルボタン・グレーアウト */}
              <div className="confirm-btn-grayout">キャンセル</div>
            </>
          )}

          <div className="inversion-btn-block">
            {/* 選択範囲の描画の表示切り替え */}
            {/* <div
              className={`layers-visibility-checkbox tooltip-container ${selectedAreaShow ? "checked" : ""}`}
              onClick={handleSelectedAreaShow}
              onTouchStart={handleSelectedAreaShow}
              >
              {selectedAreaShow && <i className="bi bi-camera-video-fill"></i>}
              <span className="tooltip-text">選択範囲の描画の表示切り替え</span>
            </div> */}

            {/* 左に90度回転ボタン */}
            <ShapesPartsComponent ShapesFormParts="rotateVerticalOppositionBtn" />
            {/* 右に90度反転ボタン */}
            <ShapesPartsComponent ShapesFormParts="rotateVerticalBtn" />
            
            {/* 左右反転ボタン */}
            <ShapesPartsComponent ShapesFormParts="leftAndRightBtn" />
            {/* 上下反転ボタン */}
            <ShapesPartsComponent ShapesFormParts="topAndBottomBtn" />

          </div>
        </div>
      </div>

      {/* 「選択範囲」グループパネル・下部 */}
      <div className="selection-range-bottomline">
        <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
          オプション
          {toolMode === 'selectMode' && selectArrangeMode === 'selectAreaDelete' && '[範囲削除]'}
          {toolMode === 'selectMode' && selectArrangeMode === 'selectMove' && '[移動]'}
          {toolMode === 'selectMode' && selectArrangeMode === 'selectCopy' && '[コピー]'}
          {toolMode === 'selectMode' && selectArrangeMode === 'selectBlur' && '[ぼかし]'}
          {toolMode === 'selectMode' && selectArrangeMode === 'selectFillColor' && '[塗りつぶし]'}
          {toolMode === 'imageTool' && '[画像挿入]'}
        </span>

        {/* ツール・モード別分岐要素 */}
        {renderDetailComponent(toolMode, selectArrangeMode)}
      </div>

    </>
  );
};


export { SelectionRangeDetail };