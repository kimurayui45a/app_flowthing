import React, { useRef, useState } from 'react';
import { PenToolComponent } from './PenToolComponent';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { DetailMixPenBlock } from './DetailMixPenBlock';
import { DetailDotPenBlock } from './DetailDotPenBlock';
import { DetailSmoothPenBlock } from './DetailSmoothPenBlock';
import { PenToolShareValueComponent } from './PenToolShareValueComponent';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';

const PenToolAllDetail = () => {

  const { 
    showSizeAndDetailPanels,
    toggleColorPalettePanelVisible,
    toggleLayersInfoPanelVisible,
    toggleScalePanelVisible,
    layersInfoPanelVisible,
    scalePanelVisible,
    colorPalettePanelVisible,
    mainPanelMode,
    toggleDetailPanelVisible
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
    setFavoritePen,
    setSavoritePenSecond,
  } = useP5ToolModeContext();

  const { 
    //概要説明
    setbetaDescription,
    handlePenToolDescription
  } = useP5PenToolParametersContext();

  // const {
  //   // updateBrushChange,
  //   updateMixBrushChange,
  //   updateHsvBrushChange
  // } = useP5CanvasCoreShare();

  //「詳細パネル」があるツールボタンで、isImageInsertionActiveと挙動を合わせるための関数
  const penToolChangeBtn = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      setToolMode(newToolMode);
      // if (newToolMode === 'mmPen') {
      //   updateBrushChange();
      // } else if (newToolMode === 'mixTool') {
      //   updateMixBrushChange();
      // } else if ((newToolMode === 'watercolorPen') || (newToolMode === 'pencilPen') || (newToolMode === 'oilPen')) {
      //   updateHsvBrushChange();
      // }
    }
  };

  const handleFavoritePenChange = () => {
    if ((toolMode !== favoritePen) && (toolMode !== favoritePenSecond)) {
      setFavoritePen(toolMode);
    } else {
      return;
    }
  };
  
  const handleFavoritePenSecondChange = () => {
    if ((toolMode !== favoritePen) && (toolMode !== favoritePenSecond)) {
      setSavoritePenSecond(toolMode);
    } else {
      return;
    }
  };

  //選択されたモードに応じてオプション内の内容を切り替える
  const renderPenDetailComponent = (toolMode) => {
    if (toolMode === 'mixTool') {
      //「色混ぜペン」のオプション
      return <DetailMixPenBlock />;

    } else if ((toolMode === 'pencilPen') || (toolMode === 'oilPen')) {
      //「エアブラシ」「厚塗りペン」のオプション
      return <DetailDotPenBlock />;

    } else if ((toolMode === 'mmPen') || (toolMode === 'inkPen') || (toolMode === 'watercolorPen')) {
      //「ミリペン」「インクペン」「水彩ペン」のオプション
      return <DetailSmoothPenBlock />;
    }
    // 該当する条件がない場合のデフォルトのレンダリング「betaPen」
    return (
      <>
        <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>

          {/* べた塗りペンプレビュー */}
          <div
            className="flex-column-start"
            style={{ alignItems: 'flex-start' }}
            onMouseEnter={() => handlePenToolDescription(setbetaDescription, 'ベタ塗りペン', '一番シンプルなペンです。\nこのペンには「ぼかし」「筆圧」機能はついていません。\n一定の太さで描画できます。')}
            onTouchStart={() => handlePenToolDescription(setbetaDescription, 'ベタ塗りペン', '一番シンプルなペンです。\nこのペンには「ぼかし」「筆圧」機能はついていません。\n一定の太さで描画できます。')}
          >
            <span className="destination-layer" style={{ color: '#ececec' }}>ベタ塗りペンのプレビュー</span>
            <PenToolShareValueComponent penToolShareParts="toolPreview" blurBool={false} />
          </div>
  
          <div style={{ width: '100px' }} className="flex-end-start">
            <div className="flex-column-start">
            <div style={{ lineHeight: '0.7', textAlign: 'left' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>このペンには<br />「ぼかし・筆圧」機能<br />はついていません。</span></div>

              <div style={{ height: '36px', width: '100px' }}></div>

            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex">
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="betaPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="mmPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="inkPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="watercolorPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="pencilPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="oilPen" penClassName="pen-panel-button" />
        <PenToolComponent handleChangeButton={penToolChangeBtn} selectPenButton="mixTool" penClassName="pen-panel-button" />
      </div>

      {toolMode !== 'mixTool' && (
        <div className="flex" style={{ position: 'absolute', right: '16px', top: '45px' }}>
          <div
            className={`layers-visibility-checkbox tooltip-container ${toolMode === favoritePen ? "checked" : ""}`}
            onClick={handleFavoritePenChange}
            onTouchStart={handleFavoritePenChange}
          >
            {toolMode === favoritePen && <i className="bi bi-star-fill"></i>}
            <span className="tooltip-text">お気に入り1のペンの切り替え</span>
          </div>

          <div
            className={`layers-visibility-checkbox tooltip-container ${toolMode === favoritePenSecond ? "checked" : ""}`}
            onClick={handleFavoritePenSecondChange}
            onTouchStart={handleFavoritePenSecondChange}
          >
            {toolMode === favoritePenSecond && <i className="bi bi-sun-fill"></i>}
            <span className="tooltip-text">お気に入り2のペンの切り替え</span>
          </div>
        </div>
      )}

      {/* ペンツールのオプション画面 */}
      {renderPenDetailComponent(toolMode)}

    </>
  );
};


export { PenToolAllDetail };