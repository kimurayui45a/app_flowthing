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

  //タブの切り替え
  const [pixiListTabMode, setPixiListTabMode] = useState(true);
  const [pixiItemListTab, setPixiItemListTab] = useState('style');



  //スプライトのスケール
  const [scaleSprite, setScaleSprite] = useState(0.1);
  const [inputScaleSprite, setInputScaleSprite] = useState(String(scaleSprite));

  //スプライトのスケール
  useEffect(() => {
    setInputScaleSprite(String(scaleSprite));
  }, [scaleSprite]);


  //スプライトの透明度
  const [alphaSprite, setAlphaSprite] = useState(1);
  const [inputAlphaSprite, setInputAlphaSprite] = useState(String(alphaSprite));

  //スプライトの透明度
  useEffect(() => {
    setInputAlphaSprite(String(alphaSprite));
  }, [alphaSprite]);


  //スプライトの角度
  const [angleSprite, setAngleSprite] = useState(0);
  const [inputAngleSprite, setInputAngleSprite] = useState(String(angleSprite));

  //スプライトの角度
  useEffect(() => {
    setInputAngleSprite(String(angleSprite));
  }, [angleSprite]);








  //回転方向
  const [clockwiseType, setClockwiseType] = useState(true);

  //回転アニメパネル切り替え
  const [rotationTypeTab, setRotationTypeTab] = useState(true);

  //回転アニメーションの速さ
  const [rotationSpeed, setRotationSpeed] = useState(2);
  const [inputRotationSpeed, setInputRotationSpeed] = useState(String(rotationSpeed));

  //回転アニメーションの速さ
  useEffect(() => {
    setInputRotationSpeed(String(rotationSpeed));
  }, [rotationSpeed]);


  //振り子アニメーションの速さ
  const [pendulumPeriod, setPendulumPeriod] = useState(2000);
  const [inputPendulumPeriod, setInputPendulumPeriod] = useState(String(pendulumPeriod));

  //振り子アニメーションの速さ
  useEffect(() => {
    setInputPendulumPeriod(String(pendulumPeriod));
  }, [pendulumPeriod]);

  //振り子アニメーションの最大回転角度
  const [pendulumMaxRotation, setPendulumMaxRotation] = useState(2);
  const [inputPendulumMaxRotation, setInputPendulumMaxRotation] = useState(String(pendulumMaxRotation));

  //振り子アニメーションの最大回転角度
  useEffect(() => {
    setInputPendulumMaxRotation(String(pendulumMaxRotation));
  }, [pendulumMaxRotation]);




  //スケールアニメーションの速さ
  const [scaleAnimationPeriod, setScaleAnimationPeriod] = useState(1000);
  const [inputScaleAnimationPeriod, setInputScaleAnimationPeriod] = useState(String(scaleAnimationPeriod));

  //スケールアニメーションの速さ
  useEffect(() => {
    setInputScaleAnimationPeriod(String(scaleAnimationPeriod));
  }, [scaleAnimationPeriod]);

  
  //スケールアニメーションの最大
  const [scaleAnimationMaxScale, setScaleAnimationMaxScale] = useState(1);
  const [inputScaleAnimationMaxScale, setInputScaleAnimationMaxScale] = useState(String(scaleAnimationMaxScale));

  //スケールアニメーションの最大
  useEffect(() => {
    setInputScaleAnimationMaxScale(String(scaleAnimationMaxScale));
  }, [scaleAnimationMaxScale]);

  
  //スケールアニメーションの最小
  const [scaleAnimationMinScale, setScaleAnimationMinScale] = useState(0.5);
  const [inputScaleAnimationMinScale, setInputScaleAnimationMinScale] = useState(String(scaleAnimationMinScale));

  //スケールアニメーションの最小
  useEffect(() => {
    setInputScaleAnimationMinScale(String(scaleAnimationMinScale));
  }, [scaleAnimationMinScale]);


  //左右アニメーションの距離
  const [leftRightAmplitude, setLeftRightAmplitude] = useState(10);
  const [inputLeftRightAmplitude, setInputLeftRightAmplitude] = useState(String(leftRightAmplitude));

  //左右アニメーションの距離
  useEffect(() => {
    setInputLeftRightAmplitude(String(leftRightAmplitude));
  }, [leftRightAmplitude]);

  //左右アニメーションの速さ
  const [leftRightPeriod, setLeftRightPeriod] = useState(1000);
  const [inputLeftRightPeriod, setInputLeftRightPeriod] = useState(String(leftRightPeriod));

  //左右アニメーションの速さ
  useEffect(() => {
    setInputLeftRightPeriod(String(leftRightPeriod));
  }, [leftRightPeriod]);


  //上下アニメーションの距離
  const [topBottomAmplitude, setTopBottomAmplitude] = useState(10);
  const [inputTopBottomAmplitude, setInputTopBottomAmplitude] = useState(String(topBottomAmplitude));

  //上下アニメーションの距離
  useEffect(() => {
    setInputTopBottomAmplitude(String(topBottomAmplitude));
  }, [topBottomAmplitude]);

  //上下アニメーションの速さ
  const [topBottomPeriod, setTopBottomPeriod] = useState(1000);
  const [inputTopBottomPeriod, setInputTopBottomPeriod] = useState(String(topBottomPeriod));

  //上下アニメーションの速さ
  useEffect(() => {
    setInputTopBottomPeriod(String(topBottomPeriod));
  }, [topBottomPeriod]);



  //共存できないアニメの時に出るアラートメッセージ
  const [alertToastAnime, setAlertToastAnime] = useState(false);
  const [alertMessageAnime, setAlertMessageAnime] = useState("");


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


  //「カスタムパネル」を表示する関数
  const toggleCustomPanelVisible = () => {
    setCustomPanelVisible(true);
  };

  //「カスタムパネル」を閉じる関数
  const toggleCustomPanelClose = () => {
    setCustomPanelVisible(false);
  };
  
  //「詳細パネル」を表示する関数
  const togglePixiDetailPanelVisible = () => {
    if (!pixiDetailPanelVisible) {
      setPixiDetailPanelVisible(true);
    }
  };

  //「詳細パネル」を閉じる関数
  const togglePixiDetailPanelClose = () => {
    setPixiDetailPanelVisible(false);
  };


  //対象のレイヤーが選択されていない時に出るアラートメッセージ（位置は中央固定）
  const handleAlertMessageAnime = () => {
    // メッセージと表示状態を設定
    setAlertMessageAnime("現在実行中のアニメーションを停止させてから再度お願い致します。");
    setAlertToastAnime(true);
  
    // 一定時間後にメッセージを非表示にする
    setTimeout(() => setAlertToastAnime(false), 4000);
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
    togglePixiDetailPanelClose,
    pixiListTabMode,
    setPixiListTabMode,
    pixiItemListTab,
    setPixiItemListTab,
    handleAlertMessageAnime,
    alertToastAnime,
    setAlertToastAnime,
    alertMessageAnime,
    setAlertMessageAnime,

    //上下左右アニメーション
    leftRightAmplitude,
    setLeftRightAmplitude,
    inputLeftRightAmplitude,
    setInputLeftRightAmplitude,
    leftRightPeriod,
    setLeftRightPeriod,
    inputLeftRightPeriod,
    setInputLeftRightPeriod,
    topBottomAmplitude,
    setTopBottomAmplitude,
    inputTopBottomAmplitude,
    setInputTopBottomAmplitude,
    topBottomPeriod,
    setTopBottomPeriod,
    inputTopBottomPeriod,
    setInputTopBottomPeriod,

    //回転アニメーション
    clockwiseType,
    setClockwiseType,
    rotationTypeTab,
    setRotationTypeTab,
    rotationSpeed,
    setRotationSpeed,
    inputRotationSpeed,
    setInputRotationSpeed,
    pendulumPeriod,
    setPendulumPeriod,
    inputPendulumPeriod,
    setInputPendulumPeriod,
    pendulumMaxRotation,
    setPendulumMaxRotation,
    inputPendulumMaxRotation,
    setInputPendulumMaxRotation,

    //スケールアニメーション
    scaleAnimationPeriod,
    setScaleAnimationPeriod,
    inputScaleAnimationPeriod,
    setInputScaleAnimationPeriod,
    scaleAnimationMaxScale,
    setScaleAnimationMaxScale,
    inputScaleAnimationMaxScale,
    setInputScaleAnimationMaxScale,
    scaleAnimationMinScale,
    setScaleAnimationMinScale,
    inputScaleAnimationMinScale,
    setInputScaleAnimationMinScale,

    //スプライトのパラメータ
    scaleSprite,
    setScaleSprite,
    inputScaleSprite,
    setInputScaleSprite,
    alphaSprite,
    setAlphaSprite,
    inputAlphaSprite,
    setInputAlphaSprite,
    angleSprite,
    setAngleSprite,
    inputAngleSprite,
    setInputAngleSprite
  }


  return (
    <PixiGroupContext.Provider value={value}>
      {children}
    </PixiGroupContext.Provider>
  );
};
