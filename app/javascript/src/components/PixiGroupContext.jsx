import React, { createContext, useContext, useState, useEffect } from 'react';


//コントロールパネルのグループを管理するコンテキスト
const PixiGroupContext = createContext();
export const usePixiGroup = () => useContext(PixiGroupContext);


export const PixiGroupProvider = ({ children }) => {


  //パネルの位置を記録する
  const [listPanelPosition, setListPanelPosition] = useState({ x: 650, y: 50 });
  const [pixiDetailPanelPosition, setPixiDetailPanelPosition] = useState({ x: 940, y: 300 });
  const [customPanelPosition, setCustomPanelPosition] = useState({ x: 650, y: 500 });

  //パネルの表示に関するステート
  const [customPanelVisible, setCustomPanelVisible] = useState(false);
  const [pixiDetailPanelVisible, setPixiDetailPanelVisible] = useState(false);


  // パネルの位置を記録する（パネルのドラッグ停止時に実行される関数）
  const handlePixiPanelDragStop = (setPanelPosition, e, d) => {
    // 描画の有効/無効状態を有効に戻す
    //setP5DrawingEnabled(true);

    // パネルの位置を更新する
    setPanelPosition(prevPosition => ({
      ...prevPosition,
      x: d.x,
      y: d.y
    }));
  };


  //「調整パネル」を表示する関数
  const toggleCustomPanelVisible = () => {
    setCustomPanelVisible(true);
  };

  //「調整パネル」を閉じる関数
  const toggleCustomPanelClose = () => {
    setCustomPanelVisible(false);
  };
  
  //「詳細パネル」を表示する関数
  const togglePixiDetailPanelVisible = () => {
    setPixiDetailPanelVisible(true);
  };

  //「詳細パネル」を閉じる関数
  const togglePixiDetailPanelClose = () => {
    setPixiDetailPanelVisible(false);
  };


  const value = {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop,
    pixiDetailPanelPosition,
    setPixiDetailPanelPosition,
    customPanelPosition,
    setCustomPanelPosition,
    customPanelVisible,
    setCustomPanelVisible,
    pixiDetailPanelVisible,
    setPixiDetailPanelVisible,
    toggleCustomPanelVisible,
    toggleCustomPanelClose,
    togglePixiDetailPanelVisible,
    togglePixiDetailPanelClose
  }


  return (
    <PixiGroupContext.Provider value={value}>
      {children}
    </PixiGroupContext.Provider>
  );
};
