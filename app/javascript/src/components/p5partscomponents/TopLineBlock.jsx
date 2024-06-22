import React from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { SelectModeDetail } from './SelectModeDetail';
import { P5ToolSaveBtn } from '../P5ToolSaveBtn';


const TopLineBlock = ({ profileId }) => {

  const {
    handleUndo,
    handleRedo,
    handleSelectLayerClear,
    saveLayersBool,
    toggleLayersSaveCheck,
    savePc
  } = useP5CanvasCoreShare();

  const { 
    toggleAutomaticMode,
    automaticMode,
    mainPanelMode,
    toggleMainPanelMode,
    toggleSizePanelVisible,
    toggleDetailPanelVisible,
    detailPanelVisible,
    sizePanelVisible,
    layerSave,
    toolSaveActive
  } = useP5PanelGroupContext();
  
  return (
    <div className='top-line-block'>

      {/* 固定UI(左) */}
      <div className='flex' style={{ position: 'relative' }}>


        {/* PCに保存する */}
        {mainPanelMode && (
          <>
          <div
            className="panel-tool-button tooltip-container"
            onClick={savePc}
            onTouchStart={savePc}
            style={{ position: 'absolute', top: '40px', left: '0px', zIndex: 77 }}
          >
            <i className="bi bi-download"></i>
            <span className="tooltip-text" style={{ textAlign: 'left' }}>作成された描画をお客様のPCに「png」で保存できます。</span>
          </div>

          {toolSaveActive && <P5ToolSaveBtn profileId={profileId} />}
          </>
        )}

        


        {/* アンドゥ */}
        <div
          className="panel-tool-button tooltip-container"
          onClick={handleUndo}
          onTouchStart={handleUndo}
        >
          <i className="bi bi-reply-fill"></i>
          <span className="tooltip-text">取り消し</span>
        </div>

        {/* リドゥ */}
        <div
          className="bi-reply-fill-right panel-tool-button-right tooltip-container-right"
          onClick={handleRedo}
          onTouchStart={handleRedo}
        >
          <i className="bi bi-reply-fill"></i>
          <span className="tooltip-text-right">やり直し</span>
        </div>

        {/* 選択レイヤークリア */}
        <div
          className="panel-tool-button tooltip-container"
          onClick={handleSelectLayerClear}
          onTouchStart={handleSelectLayerClear}
        >
          <SelectModeDetail selectToolPanelParts="selectLayerClearIcon" />
          <span className="tooltip-text">描画レイヤーの描画を消去</span>
        </div>
      </div>

      {/* 固定UI(右) */}
      <div className='flex'>

      {/* レイヤーセーブを設定するチェックボックス */}

      {layerSave && (
        <div
          type="checkbox"
          className="layers-save-checkbox tooltip-container"
          checked={saveLayersBool}
          onClick={toggleLayersSaveCheck}
          onTouchStart={toggleLayersSaveCheck}
        >
          {saveLayersBool && <i className="bi bi-flag-fill"></i>}
          <span className="tooltip-text">レイヤーの状態を保存</span>
        </div>
      )}


        {/* 「自動表示モード」のアクティブを切り替えるトグルスイッチ */}
        <div className="toggle-switch" onClick={toggleAutomaticMode} onTouchStart={toggleAutomaticMode}>
          <div className={`switch ${automaticMode ? 'checked' : ''}`}>
            <div className="switch-handle"></div> {/* ハンドル部分の要素を追加 */}
          </div>
          <span className="tooltip-text">パネルを自動表示</span>
        </div>

        {/*デフォルトパネルかコンパクトパネルを切り替えるボタン */}
        {mainPanelMode ? 
          //コンパクトパネルに切り替えるボタン
          <div
            className="panel-tool-button tooltip-container"
            onClick={toggleMainPanelMode}
            onTouchStart={toggleMainPanelMode}
          >
            <i className="bi bi-box-arrow-in-up"></i>
            <span className="tooltip-text">パネルを縮小</span>
          </div>
          :
          //デフォルトパネルに切り替えるボタン
          <div
            className="panel-tool-button tooltip-container"
            onClick={toggleMainPanelMode}
            onTouchStart={toggleMainPanelMode}
          >
            <i className="bi bi-window-fullscreen"></i>
            <span className="tooltip-text">パネルを通常サイズに戻す</span>
          </div>
        }
      </div>

      {/*「自動表示モード」でない場合は「サイズパネルボタン」と「詳細パネルボタン」を表示 */}
      {!automaticMode && (
        <div className={mainPanelMode ? "size-detail-btn-position" : "size-detail-btn-position-compact"}>
          {!sizePanelVisible && (
            <div
              className="size-detail-btn tooltip-container"
              onClick={toggleSizePanelVisible}
              onTouchStart={toggleSizePanelVisible}
            >
              <i className="bi bi-border-width"></i>
              <span className="tooltip-text">サイズパネルを表示</span>
            </div> 
          )} 
  
          {!detailPanelVisible && (
            <div
              className="size-detail-btn tooltip-container"
              onClick={toggleDetailPanelVisible}
              onTouchStart={toggleDetailPanelVisible}
            >
              <i className="bi bi-gear-fill"></i>
              <span className="tooltip-text">詳細設定パネルを表示</span>
            </div>
          )} 
        </div>
      )}
      
    </div>
  );
};


export { TopLineBlock };