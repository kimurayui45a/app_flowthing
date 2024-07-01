import React, { createContext, useContext, useState, useEffect } from 'react';


//コントロールパネルのグループを管理するコンテキスト
const P5PanelGroupContext = createContext();
export const useP5PanelGroupContext = () => useContext(P5PanelGroupContext);


export const P5PanelGroupProvider = ({ children, notLayerSave, panelPosition, toolDateParameters, activeSave }) => {

  //レイヤーセーブに関するステート
  const [layerSave, setLayerSave] = useState(true);

  //ペイントツールのセーブボタンの表示
  const [toolSaveActive, setToolSaveActive] = useState(false);

  useEffect(() => {
    setLayerSave(notLayerSave)
    setToolSaveActive(activeSave)
  }, []);

  //描画の有効/無効状態を管理
  const [p5DrawingEnabled, setP5DrawingEnabled] = useState(true);

  //パネルドラッグの有効/無効状態を管理
  const [isDraggablePanel, setIsDraggablePanel] = useState(true);


  //レイヤーのスクロールを記録する
  // useEffect(() => {
  //   console.log('描画の有効/無効状態を管理', p5DrawingEnabled);
  // console.log('パネルドラッグの有効/無効状態', isDraggablePanel);
  // }, [isDraggablePanel, p5DrawingEnabled]);


  //メインパネルの表示切り替え
  const [mainPanelMode, setMainPanelMode] = useState(true);

  //パネルの表示に関するもの
  const [colorPalettePanelVisible, setColorPalettePanelVisible] = useState(false);
  const [layersInfoPanelVisible, setLayersInfoPanelVisible] = useState(false);
  const [scalePanelVisible, setScalePanelVisible] = useState(false);
  const [sizePanelVisible, setSizePanelVisible] = useState(false);
  const [detailPanelVisible, setDetailPanelVisible] = useState(false);

  //自動モードの切り替え
  const [automaticMode, setAutomaticMode] = useState(true);

  //レイヤーパネルのスクロール位置を記録するuseState
  const [scrollPosition, setScrollPosition] = useState(454);

  //パネルの位置を記録する
  const [mainPanelPosition, setMainPanelPosition] = useState({ x: 850, y: 50 });
  const [layersInfoPanelPosition, setLayersInfoPanelPosition] = useState({ x: 1140, y: 300 });
  const [colorPalettePanelPosition, setColorPalettePanelPosition] = useState({ x: 400, y: 350 });
  const [scalePanelPosition, setScalePanelPosition] = useState({ x: 1140, y: 50 });
  const [detailPanelPosition, setDetailPanelPosition] = useState({ x: 100, y: 300 });

  //ツールサイズパネルの位置とサイズを記録する
  const [sizePanelPosition, setSizePanelPosition] = useState({ x: 100, y: 50, width: 250, height: 170 });

  //四角カラーピッカーの変更
  const [boxPickerChange, setBoxPickerChange] = useState(false);

  //メインパネルのカラーピッカーの状態
  const [meinPicker, setMeinPicker] = useState('wheel');

  //「カラーピッカーパネル」のカラーピッカーの形状選択
  const [colorPalettePanelPickerChange, setColorPalettePanelPickerChange] = useState(false);

  //レイヤーの透明度スライダーの更を促すステート
  const [sliderUpdateTrigger, setSliderUpdateTrigger] = useState(false);

  const handleBoxPickerChange = () => {
    setBoxPickerChange(!boxPickerChange);

    //「カラーピッカーパネル」が表示状態の時にsetColorPalettePanelPickerChangeの値も切り替える
    if (colorPalettePanelVisible) {
      setColorPalettePanelPickerChange(!colorPalettePanelPickerChange);
    }
  };

  useEffect(() => {
    if (boxPickerChange) {
      setMeinPicker('box')
    } else {
      setMeinPicker('wheel')
    }
  }, [boxPickerChange]);


  // カラーピッカー操作中はパネルが動かないようにする（一部スライダー要素でも使い回し）
  const colorPaletteDrag = (event) => {
    setIsDraggablePanel(false);
    //setP5DrawingEnabled(false);
    // イベントの伝播を停止
    event.stopPropagation();
  };

  // カラーピッカー操作終了後パネルをアクティブに戻す（一部スライダー要素でも使い回し）
  const colorPaletteDragEnd = (event) => {
    setIsDraggablePanel(true);
    //setP5DrawingEnabled(true);
  };

  // パネルの位置を記録する（パネルのドラッグ停止時に実行される関数）
  const handlePanelDragStop = (setPanelPosition, e, d) => {
    // 描画の有効/無効状態を有効に戻す
    //setP5DrawingEnabled(true);

    // パネルの位置を更新する
    setPanelPosition(prevPosition => ({
      ...prevPosition,
      x: d.x,
      y: d.y
    }));
  };

  //レイヤーのスクロールを記録する
  // useEffect(() => {
  //   console.log('canvasはアクティブ？', p5DrawingEnabled);
  // }, [p5DrawingEnabled]);


//データ読み込み
  useEffect(() => {
    if (toolDateParameters && toolDateParameters !== '' && toolDateParameters !== 'undefined' && toolDateParameters !== 'null') {
      // JSON文字列をオブジェクトに解析
      const toolData = JSON.parse(toolDateParameters);
  
      // toolDataがオブジェクトであることを確認し、'p5PanelGroup'プロパティにアクセス
      if (toolData && typeof toolData === 'object' && toolData.p5PanelGroup) {
        const toolDataPanel = toolData.p5PanelGroup;
  
        //console.log(toolDataPanel);
        setAutomaticMode(toolDataPanel.automaticMode);

      }
    }
  }, [toolDateParameters]);


  // ツールサイズパネルのリサイズ操作終了時にサイズを保存
  const onSizePanelResizeStop = (e, direction, ref, delta, position) => {
    setSizePanelPosition({
      x: position.x,
      y: position.y,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10)
    });
  };

  useEffect(() => {
    if (panelPosition) {
      setMainPanelPosition(panelPosition.main_pane);
      setLayersInfoPanelPosition(panelPosition.layers_info_panel);
      setColorPalettePanelPosition(panelPosition.color_palette_panel);
      setScalePanelPosition(panelPosition.scale_panel_position);
      setDetailPanelPosition(panelPosition.detail_panel_position);
      setSizePanelPosition(panelPosition.size_panel_position);
    }
  }, [panelPosition]);


  //「メインパネル」の状態を切り替える関数
  const toggleMainPanelMode = () => {
    setMainPanelMode(!mainPanelMode);
  };

  // 「自動」でのサイズパネルと詳細パネルを呼び出すかどうかの切り替え関数
  const toggleAutomaticMode = () => {
    setAutomaticMode(!automaticMode);
  };


  //もしパネルを閉じる時に何か誤発火があったらPanelClose関数に「event.stopPropagation();」をつけてみる

  //「サイズパネル」を表示する関数
  const toggleSizePanelVisible = () => {
    setSizePanelVisible(true);
  };

  //「サイズパネル」を閉じる関数
  const toggleSizePanelClose = () => {
    setSizePanelVisible(false);
  };

  //「詳細パネル」を表示する関数
  const toggleDetailPanelVisible = () => {
    setDetailPanelVisible(true);
  };

  //「詳細パネル」を閉じる関数
  const toggleDetailPanelClose = () => {
    setDetailPanelVisible(false);
  };

  //「スケールパネル」を表示する関数
  const toggleScalePanelVisible = () => {
    setScalePanelVisible(true);
  };

  //「スケールパネル」を閉じる関数
  const toggleScalePanelClose = () => {
    setScalePanelVisible(false);
  };

  //「レイヤーパネル」を表示する関数
  const toggleLayersInfoPanelVisible = () => {
    setLayersInfoPanelVisible(true);
  };

  //「レイヤーパネル」を閉じる関数
  const toggleLayersInfoPanelClose = () => {
    setLayersInfoPanelVisible(false);
    //console.log('スクロール位置', scrollPosition);
  };

  //「カラーピッカーパネル」を表示する関数
  const toggleColorPalettePanelVisible = () => {
    setColorPalettePanelVisible(true);

    //表示するときにデフォルトパネルのカラーピッカーの情報を取得
    setColorPalettePanelPickerChange(boxPickerChange);
  };

  //「カラーピッカーパネル」を閉じる関数
  const toggleColorPalettePanelClose = () => {
    setColorPalettePanelVisible(false);

    //閉じるときに内部で競合が起きないようにnullを渡し内部の「カラーピッカーパネル」ではピッカーが表示されないようにする
    setColorPalettePanelPickerChange(null);
  };


  //メインパネルで詳細設定があるツールが押された時に実行する
  const showSizeAndDetailPanels = () => {
    if (automaticMode) {
      if (!sizePanelVisible) {
        setSizePanelVisible(true);
      }
      if (!detailPanelVisible) {
        setDetailPanelVisible(true);
      }
    }
  };

  const handleScroll = (e) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };
  

  const value = {
    p5DrawingEnabled,
    setP5DrawingEnabled,
    mainPanelMode,
    setMainPanelMode,
    automaticMode,
    setAutomaticMode,
    colorPalettePanelVisible,
    setColorPalettePanelVisible,
    layersInfoPanelVisible,
    setLayersInfoPanelVisible,
    scalePanelVisible,
    setScalePanelVisible,
    sizePanelVisible,
    setSizePanelVisible,
    toggleMainPanelMode,
    toggleAutomaticMode,
    toggleSizePanelVisible,
    toggleSizePanelClose,
    toggleScalePanelVisible,
    toggleScalePanelClose,
    toggleLayersInfoPanelVisible,
    toggleLayersInfoPanelClose,
    toggleColorPalettePanelVisible,
    toggleColorPalettePanelClose,
    mainPanelPosition,
    setMainPanelPosition,
    layersInfoPanelPosition,
    setLayersInfoPanelPosition,
    sizePanelPosition,
    setSizePanelPosition,
    onSizePanelResizeStop,
    boxPickerChange,
    setBoxPickerChange,
    handleBoxPickerChange,
    colorPalettePanelPickerChange,
    setColorPalettePanelPickerChange,
    isDraggablePanel,
    setIsDraggablePanel,
    colorPaletteDrag,
    colorPaletteDragEnd,
    handlePanelDragStop,
    colorPalettePanelPosition,
    setColorPalettePanelPosition,
    toggleDetailPanelVisible,
    toggleDetailPanelClose,
    showSizeAndDetailPanels,
    detailPanelVisible,
    setDetailPanelVisible,
    scrollPosition,
    handleScroll,
    scalePanelPosition,
    setScalePanelPosition,
    detailPanelPosition,
    setDetailPanelPosition,
    layerSave,
    meinPicker,
    sliderUpdateTrigger,
    setSliderUpdateTrigger,
    toolSaveActive,
    setToolSaveActive
  };


  return (
    <P5PanelGroupContext.Provider value={value}>
      {children}
    </P5PanelGroupContext.Provider>
  );
};