import React, { createContext, useContext, useState, useEffect } from 'react';


//ツールモードを管理するコンテキスト
const P5ToolModeContext = createContext();
export const useP5ToolModeContext = () => useContext(P5ToolModeContext);

export const P5ToolModeProvider = ({ children, toolDateParameters }) => {

  //初期ツール
  const [toolMode, setToolMode] = useState('betaPen');

  //ツール切り替えを制限するbool値（trueで他のツールへの切り替えを制限）
  const [isImageInsertionActive, setIsImageInsertionActive] = useState(false);

  //ツール切り替えに関するアラートメッセージ
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //対象のレイヤーが選択されていない時に出るアラートメッセージ
  const [layerToast, setLayerToast] = useState(false);
  const [layerMessage, setLayerMessage] = useState("");

  //お気に入りペン
  const [favoritePen, setFavoritePen] = useState('betaPen');

  //お気に入りペン2
  const [favoritePenSecond, setFavoritePenSecond] = useState('inkPen');

  //選択モード内のステータス「selectMove」「selectCopy」「selectBlur」「selectFillColor」「selectAreaDelete」
  const [selectArrangeMode, setSelectArrangeMode] = useState('selectMove');

  //toolModeの分類
  //詳細パネルの分岐処理を簡易的にするために「ペンツール」と「選択ツール」でグループ分けをする
  const [detailGroup, setDetailGroup] = useState('penToolGroup');

  //ペンツール（主にカーソルで使用する）
  const penGroup = new Set(['betaPen', 'eraseTool', 'mmPen', 'inkPen', 'watercolorPen', 'pencilPen', 'oilPen', 'mixTool']);

  //RGBペンと消しゴム「p.mouse系イベント」で発火するペンのグループ
  const mouseModes = new Set(['betaPen', 'mmPen', 'eraseTool']);

  //カスタムペンのグループ（処理を軽くするために作成）
  const customBrushModes = new Set(['mmPen', 'watercolorPen', 'pencilPen', 'oilPen', 'mixTool']);

  //HSVペン「p.pointer系イベント」で発火するペンのグループ、「筆圧」が必要であるもの（「Pointer Events API」を使用している、「mixTool」はHSVではない）
  const pressureModes = new Set(['inkPen', 'watercolorPen', 'pencilPen', 'oilPen', 'mixTool']);

  //詳細パネルが必要なペンツール（betaPenには詳細設定はないが、他のペンと挙動を合わせるためにここに追加）
  const penDetailGroup = new Set(['mmPen', 'inkPen', 'watercolorPen', 'pencilPen', 'oilPen', 'mixTool', 'betaPen']);

  //詳細パネルの必要な選択ツール
  const selectDetailGroup = new Set(['selectMode', 'imageTool', 'rectTool', 'circleTool', 'triangleTool', 'lineTool', 'textTool']);

  //「選択範囲」グループ
  const selectionRangeTool = new Set(['selectMode', 'imageTool']);

  //「図形」グループ
  const shapesTool = new Set(['rectTool', 'circleTool', 'triangleTool', 'lineTool', 'textTool']);

  //フリーパレットのクリック使用を許可するグループ
  const freeGetGroup = new Set(['rectTool', 'circleTool', 'triangleTool', 'lineTool', 'textTool', 'dropperTool', 'betaPen', 'mmPen', 'inkPen', 'watercolorPen', 'pencilPen', 'oilPen']);

  useEffect(() => {
    if (toolDateParameters && toolDateParameters !== '' && toolDateParameters !== 'undefined' && toolDateParameters !== 'null') {
      // JSON文字列をオブジェクトに解析
      const toolData = JSON.parse(toolDateParameters);
  
      // toolDataがオブジェクトであることを確認し、'p5ToolMode'プロパティにアクセス
      if (toolData && typeof toolData === 'object' && toolData.p5ToolMode) {
        const toolDataMode = toolData.p5ToolMode;
  
        //console.log(toolDataMode);
        setFavoritePen(toolDataMode.favoritePen);
        setToolMode(toolDataMode.favoritePen);
        setFavoritePenSecond(toolDataMode.favoritePenSecond);

      }
    }
  }, [toolDateParameters]);
  

  //画像挿入モード中は他のツールへの切り替えを無効にする（詳細パネルのないものに当てはまる関数）
  const handleToolChange = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      setToolMode(newToolMode);
      setDetailGroup('others');
    }
  };

  //ツール切り替えに関するアラートメッセージ
  const handleAlertMessage = (e) => {
    // クリック位置を取得
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x, y });
  
    // メッセージと表示状態を設定
    setMessage("現在の処理を終了させて下さい");
    setToast(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setToast(false), 3000);
  };

  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleAlertLayerMessage = () => {
    // メッセージと表示状態を設定
    setLayerMessage("選択中のレイヤーは現在「非表示」になっています。\n処理を行いたい場合は表示させて下さい。");
    setLayerToast(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setLayerToast(false), 4000);
  };



  const value = {
    toolMode,
    setToolMode,
    isImageInsertionActive,
    setIsImageInsertionActive,
    handleToolChange,
    penGroup,
    penDetailGroup,
    selectDetailGroup,
    detailGroup,
    setDetailGroup,
    toast,
    setToast,
    message,
    setMessage,
    position,
    setPosition,
    handleAlertMessage,
    favoritePen,
    setFavoritePen,
    favoritePenSecond,
    setFavoritePenSecond,
    selectArrangeMode,
    setSelectArrangeMode,
    mouseModes,
    pressureModes,
    customBrushModes,
    shapesTool,
    selectionRangeTool,
    layerToast,
    setLayerToast,
    layerMessage,
    setLayerMessage,
    handleAlertLayerMessage,
    freeGetGroup
  };

  return (
    <P5ToolModeContext.Provider value={value}>
      {children}
    </P5ToolModeContext.Provider>
  );
};



