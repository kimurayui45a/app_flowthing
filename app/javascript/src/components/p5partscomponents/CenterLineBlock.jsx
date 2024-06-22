import React, { useRef } from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { PenToolComponent } from './PenToolComponent';
import { SelectToolComponent } from './SelectToolComponent';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';


const CenterLineBlock = () => {

  const {
    copyLayerActive,
    getLayersInfoData
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
    toggleDetailPanelVisible
  } = useP5PanelGroupContext();

  const { 
    isImageInsertionActive,
    handleToolChange,
    toolMode,
    setToolMode,
    penDetailGroup,
    selectDetailGroup,
    setDetailGroup,
    handleAlertMessage,
    favoritePen,
    favoritePenSecond
  } = useP5ToolModeContext();

  const { 
    setShapesInstallation
  } = useP5PenToolParametersContext();


  //「詳細パネル」があるツールボタンで、isImageInsertionActiveと挙動を合わせるための関数
  const toolChangeAndPanels = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      if (penDetailGroup.has(newToolMode)) {
        //詳細パネルの管理ステートを「ペンツール」にする
        setDetailGroup('penToolGroup');

        // if (newToolMode === 'mmPen') {
        //   updateBrushChange();
        // } else if (newToolMode === 'mixTool') {
        //   updateMixBrushChange();
        // } else if ((newToolMode === 'watercolorPen') || (newToolMode === 'pencilPen') || (newToolMode === 'oilPen')) {
        //   updateHsvBrushChange();
        // }
      } else if (selectDetailGroup.has(newToolMode)) {
        //詳細パネルの管理ステートを「選択ツール」にする
        setDetailGroup('selectToolGroup');
        if (newToolMode === 'textTool') {
          setShapesInstallation(true);
        }
  
      } else if (!penDetailGroup.has(newToolMode) && !selectDetailGroup.has(newToolMode)) {
        //詳細パネルの管理ステートを「その他」にする
        setDetailGroup('others');
      }
      setToolMode(newToolMode);
      showSizeAndDetailPanels();
    }
  };

  //「レイヤーパネル」の呼び出し時にプレビューを更新する
  const layersPanelAndPreview = () => {
    toggleLayersInfoPanelVisible();
    getLayersInfoData();
  };

  //「スケールパネル」の呼び出し時にプレビューを更新する
  const scalePanelAndPreview = () => {
    toggleScalePanelVisible();
    getLayersInfoData();
  };

  // //画像挿入ボタン
  // const fileInputRef = useRef(null);
  // const handleDivClick = (e) => {
  //   if (isImageInsertionActive) {
  //     handleAlertMessage(e);
  //     return;
  //   } else {
  //     // 隠されたinput要素のclickイベントをトリガー
  //     fileInputRef.current.click();
  //     toggleDetailPanelVisible();
  //   }
  // };

  //画像挿入ボタンの場合の関数
  const handleImageAndPanels = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      //詳細パネルの管理ステートを「選択ツール」にする
      setDetailGroup('selectToolGroup');
      setToolMode(newToolMode);
      toggleDetailPanelVisible();
    }
  };

  return (
    <div className='center-line-block'>

      {/* 上部 */}
      {/* ベタペン */}
      <PenToolComponent handleChangeButton={toolChangeAndPanels} selectPenButton={favoritePen} penClassName="panel-tool-button" />

      {/* インクペン */}
      <PenToolComponent handleChangeButton={toolChangeAndPanels} selectPenButton={favoritePenSecond} penClassName="panel-tool-button" />

      {/* 消しゴム */}
      <PenToolComponent handleChangeButton={toolChangeAndPanels} selectPenButton="eraseTool" />

      {/* 選択ツール */}
      <SelectToolComponent handleChangeButton={toolChangeAndPanels} selectToolButton="selectMode" />

      {/* テキストツール */}
      <SelectToolComponent handleChangeButton={toolChangeAndPanels} selectToolButton="textTool" />

      {/* 画像ツール */}
      <SelectToolComponent handleChangeButton={handleImageAndPanels} selectToolButton="imageTool" />
      {/* タッチ対応させた場合 */}
      {/* <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
        onChange={handleImage}
      />
      <div
        className="panel-tool-button tooltip-container"
        onClick={(e) => handleDivClick(e)}
        onTouchStart={(e) => handleDivClick(e)}
      >
        <i className="bi bi-image"></i>
        <span className="tooltip-text">画像</span>
      </div> */}

      {/* 下部 */}
      {/* スポイト */}
      <div
        className="panel-tool-button tooltip-container"
        onClick={(e) => handleToolChange('dropperTool', e)}
        onTouchStart={(e) => handleToolChange('dropperTool', e)}
        style={{ backgroundColor: toolMode === 'dropperTool' ? '#9199AE' : '#c2c1c1' }}
      >
        <i className="bi bi-eyedropper"></i>
        <span className="tooltip-text">スポイト</span>
      </div>

      {/* 色登録 */}
      <div
        className="panel-tool-button tooltip-container"
        onClick={(e) => handleToolChange('selectcolorTool', e)}
        onTouchStart={(e) => handleToolChange('selectcolorTool', e)}
        style={{ backgroundColor: toolMode === 'selectcolorTool' ? '#9199AE' : '#c2c1c1' }}
      >
        <svg id="_レイヤー_8" data-name="レイヤー 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
          <defs>
            <style>
              {`
                .mix-cls-1 {
                  fill: #231815;
                  stroke-width: 0px;
                }

                .mix-cls-2 {
                  fill: none;
                  stroke: #000;
                  stroke-miterlimit: 10;
                  stroke-width: .5px;
                }
              `}
            </style>
          </defs>
          <g>
            <path className="mix-cls-1" d="m12.65,9.65c.05.14,0,.28-.04.35-.76-.03-1.26.16-1.57.34-.17.1-.46.35-1.02.87-.63.57-.73.68-1.04.93-.43.35-.8.59-1.04.73v.02c-.49-.03-.63-.12-.65-.21-.04-.18.4-.35,1.17-.95.17-.13.07-.07,1.03-.89.85-.73,1.01-.85,1.22-.99.86-.57,1.24-.54,1.43-.5.11.02.42.08.5.3Z"/>
            <path className="mix-cls-1" d="m21.94,22.21c.4.23.77.73.65,1.15-.04.16-.14.26-.25.37-.26.26-.57.4-.96.5-.69.18-1.27.21-1.44.21-.45,0-1.03.02-1.74-.18-.49-.15-.92-.27-1.29-.67-.1-.12-.33-.38-.42-.79-.1-.45.02-.82.07-.96v-.02c.38-.19.76-.37,1.14-.55.24.06.41.16.53.22.35.18.49.33.66.45.32.21.53.12,1.88.14.86,0,1.01.05,1.17.14Z"/>
            <path className="mix-cls-1" d="m17.66,17.64h-.04c-.11.09-.29.22-.51.38-1.05.7-1.99,1.01-2.4,1.14-.19.06-.47.14-.82.21h-.02c-.64-1.23-1.44-2.38-2.37-3.43l.05-.04c1.15-.19,2.18-.82,3.17-1.43.4-.25.8-.49,1.2-.74.17.27.34.56.49.86.59,1.08.97,2.13,1.23,3.06Z"/>
          </g>
          <g>
            <path className="mix-cls-2" d="m15.84,21.21c.03.09.1.22.23.35.17.18.37.25.46.27,0,0,.02,0,.03-.02.39-.19.77-.37,1.15-.55,0,0,.02-.02.02-.02-.07-.21-.13-.44-.2-.66"/>
            <path className="mix-cls-2" d="m16.57,21.84c-.06.15-.17.51-.07.96.09.41.32.68.42.79.36.4.79.52,1.29.67.71.2,1.29.19,1.74.18.17,0,.75-.02,1.44-.21.4-.11.71-.24.96-.5.11-.12.21-.21.25-.37.12-.43-.26-.92-.65-1.15-.16-.09-.31-.13-1.17-.14-1.35-.02-1.56.07-1.88-.14-.17-.12-.3-.26-.66-.45-.12-.07-.29-.16-.53-.22"/>
            <path className="mix-cls-2" d="m7.95,12.87c.24-.15.61-.39,1.04-.73.31-.25.41-.36,1.04-.93.56-.51.85-.77,1.02-.87.26-.15.68-.32,1.28-.34.18,0,.36.06.51.18.86.71,2.05,1.85,3.1,3.54.17.27.34.56.49.86.59,1.08.97,2.13,1.23,3.06.2.73.32,1.38.4,1.93.04.32-.11.64-.39.8-.34.2-.73.4-1.19.58-.37.15-.71.25-1.03.33-.38.1-.76-.12-.91-.49-.2-.48-.42-.96-.66-1.43-.64-1.24-1.44-2.39-2.37-3.44-1.02-1.16-2.2-2.19-3.5-3.03-.02,0-.04,0-.06,0-.49-.03-.63-.12-.65-.21-.04-.18.4-.35,1.17-.95.17-.13.07-.07,1.03-.89.85-.73,1.01-.85,1.22-.99.86-.57,1.85-.42,1.94-.2.05.14,0,.28-.04.35"/>
            <path className="mix-cls-2" d="m15.94,13.72h0c-.4.25-.8.49-1.2.74-1,.61-2.02,1.24-3.17,1.43"/>
            <path className="mix-cls-2" d="m17.62,17.65c-.11.08-.29.21-.51.37-1.05.7-1.99,1.01-2.4,1.14-.19.06-.47.14-.82.21"/>
          </g>
        </svg>
        <span className="tooltip-text">色登録</span>
      </div>

      {/* 色削除 */}
      <div
        className="panel-tool-button tooltip-container"
        onClick={(e) => handleToolChange('deletecolorTool', e)}
        onTouchStart={(e) => handleToolChange('deletecolorTool', e)}
        style={{ backgroundColor: toolMode === 'deletecolorTool' ? '#9199AE' : '#c2c1c1' }}
      >
        <i className="bi bi-trash3-fill"></i>
        <span className="tooltip-text">色削除</span>
      </div>

      {mainPanelMode ? (
        <>
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
              onClick={layersPanelAndPreview}
              onTouchStart={layersPanelAndPreview}
            >
              <i className="bi bi-layers"></i>
              <span className="tooltip-text">レイヤーパネルを表示</span>
            </div>
          )}

          {/* スケールパネル */}
          {!scalePanelVisible && (
            <div
              className="panel-visible-button tooltip-container"
              onClick={scalePanelAndPreview}
              onTouchStart={scalePanelAndPreview}
            >
              <i className="bi bi-search"></i>
              <span className="tooltip-text">スケールパネルを表示</span>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 指先ツール */}
          <PenToolComponent handleChangeButton={toolChangeAndPanels} selectPenButton="mixTool" penClassName="panel-tool-button" />

          {/* 四角形 */}
          <SelectToolComponent handleChangeButton={toolChangeAndPanels} selectToolButton="rectTool" />

          {/* ペースト */}
          {copyLayerActive && (
            <SelectToolComponent selectToolButton="copyLayerBtn" />
          )}
        </>
      )}
    </div>
  );
};


export { CenterLineBlock };