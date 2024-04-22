import React, { createContext, useContext, useState, useEffect } from 'react';


//コントロールパネルのグループを管理するコンテキスト
const PixiGroupContext = createContext();
export const usePixiGroup = () => useContext(PixiGroupContext);


export const PixiGroupProvider = ({ children }) => {


  //パネルの位置を記録する
  const [listPanelPosition, setListPanelPosition] = useState({ x: 650, y: 50 });
  const [pixiDetailPanelPosition, setPixiDetailPanelPosition] = useState({ x: 200, y: 150 });
  const [customPanelPosition, setCustomPanelPosition] = useState({ x: 100, y: 100 });

  //パネルの表示に関するステート
  const [customPanelVisible, setCustomPanelVisible] = useState(false);
  const [pixiDetailPanelVisible, setPixiDetailPanelVisible] = useState(false);

  //タブの切り替え
  const [pixiListTabMode, setPixiListTabMode] = useState(true);
  const [pixiItemListTab, setPixiItemListTab] = useState('style');



  //スプライトのスケール
  const [scaleSprite, setScaleSprite] = useState(1);
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



  //背景アニメ初期値、上から下
  const [spaceAnimeDirection, setSpaceAnimeDirection] = useState('topBottom');


  //背景アニメ速さ
  const [spaceAnimeSpeed, setSpaceAnimeSpeed] = useState(1);
  const [inputSpaceAnimeSpeed, setInputSpaceAnimeSpeed] = useState(String(spaceAnimeSpeed));

  //背景アニメの速さ
  useEffect(() => {
    setInputSpaceAnimeSpeed(String(spaceAnimeSpeed));
  }, [spaceAnimeSpeed]);


  //背景アニメを切り替える時間
  const [intervalTime, setIntervalTime] = useState(2000);
  const [inputIntervalTime, setInputIntervalTime] = useState(String(intervalTime));

  //背景アニメを切り替える時間
  useEffect(() => {
    setInputIntervalTime(String(intervalTime));
  }, [intervalTime]);



  //ランダムアニメの速さ
  const [randomEasing, setRandomEasing] = useState(0.05);
  const [inputRandomEasing, setInputRandomEasing] = useState(String(randomEasing));

  //ランダムアニメの速さ
  useEffect(() => {
    setInputRandomEasing(String(randomEasing));
  }, [randomEasing]);


  //ランダムアニメの目標の判定範囲
  const [randomCloseEnough, setRandomCloseEnough] = useState(1);
  const [inputRandomCloseEnough, setInputRandomCloseEnough] = useState(String(randomCloseEnough));

  //ランダムアニメの目標の判定範囲
  useEffect(() => {
    setInputRandomCloseEnough(String(randomCloseEnough));
  }, [randomCloseEnough]);

  //クリックアニメの速さ
  const [moveClickSpeed, setMoveClickSpeed] = useState(0.05);
  const [inputMoveClickSpeed, setInputMoveClickSpeed] = useState(String(moveClickSpeed));

  //クリックアニメの速さ
  useEffect(() => {
    setInputMoveClickSpeed(String(moveClickSpeed));
  }, [moveClickSpeed]);




  //範囲アニメの速さ
  const [boundaryAnimeSpeed, setBoundaryAnimeSpeed] = useState(0.01);
  const [inputBoundaryAnimeSpeed, setInputBoundaryAnimeSpeed] = useState(String(boundaryAnimeSpeed));

  //範囲アニメの速さ
  useEffect(() => {
    setInputBoundaryAnimeSpeed(String(boundaryAnimeSpeed));
  }, [boundaryAnimeSpeed]);


  //範囲アニメのX
  const [boundaryAnimeXValue, setBoundaryAnimeXValue] = useState(50);
  const [inputBoundaryAnimeXValue, setInputBoundaryAnimeXValue] = useState(String(boundaryAnimeXValue));

  //範囲アニメのX
  useEffect(() => {
    setInputBoundaryAnimeXValue(String(boundaryAnimeXValue));
  }, [boundaryAnimeXValue]);

  //範囲アニメのY
  const [boundaryAnimeYValue, setBoundaryAnimeYValue] = useState(50);
  const [inputBoundaryAnimeYValue, setInputBoundaryAnimeYValue] = useState(String(boundaryAnimeYValue));

  //範囲アニメのY
  useEffect(() => {
    setInputBoundaryAnimeYValue(String(boundaryAnimeYValue));
  }, [boundaryAnimeYValue]);

  //範囲アニメの幅
  const [boundaryAnimeWidth, setBoundaryAnimeWidth] = useState(300);
  const [inputBoundaryAnimeWidth, setInputBoundaryAnimeWidth] = useState(String(boundaryAnimeWidth));

  //範囲アニメの幅
  useEffect(() => {
    setInputBoundaryAnimeWidth(String(boundaryAnimeWidth));
  }, [boundaryAnimeWidth]);

  //範囲アニメの高さ
  const [boundaryAnimeHeight, setBoundaryAnimeHeight] = useState(200);
  const [inputBoundaryAnimeHeight, setInputBoundaryAnimeHeight] = useState(String(boundaryAnimeHeight));

  //範囲アニメの高さ
  useEffect(() => {
    setInputBoundaryAnimeHeight(String(boundaryAnimeHeight));
  }, [boundaryAnimeHeight]);


  //円形アニメの速さ
  const [circularAnimeSpeed, setCircularAnimeSpeed] = useState(0.05);
  const [inputCircularAnimeSpeed, setInputCircularAnimeSpeed] = useState(String(circularAnimeSpeed));

  //スプライトのスケール
  useEffect(() => {
    setInputCircularAnimeSpeed(String(circularAnimeSpeed));
  }, [circularAnimeSpeed]);

  //円形アニメのX
  const [circularAnimeXValue, setCircularAnimeXValue] = useState(50);
  const [inputCircularAnimeXValue, setInputCircularAnimeXValue] = useState(String(circularAnimeXValue));

  //円形アニメのX
  useEffect(() => {
    setInputCircularAnimeXValue(String(circularAnimeXValue));
  }, [circularAnimeXValue]);

  //円形アニメのY
  const [circularAnimeYValue, setCircularAnimeYValue] = useState(50);
  const [inputCircularAnimeYValue, setInputCircularAnimeYValue] = useState(String(circularAnimeYValue));

  //円形アニメのY
  useEffect(() => {
    setInputCircularAnimeYValue(String(circularAnimeYValue));
  }, [circularAnimeYValue]);


  //円形アニメの半径
  const [circularAnimeRadius, setCircularAnimeRadius] = useState(100);
  const [inputCircularAnimeRadius, setInputCircularAnimeRadius] = useState(String(circularAnimeRadius));

  //円形アニメのY
  useEffect(() => {
    setInputCircularAnimeRadius(String(circularAnimeRadius));
  }, [circularAnimeRadius]);



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


  const handleMouseClick = (event) => {
    // クリックされた座標を取得
    const x = event.clientX;
    const y = event.clientY;

    // ステートを更新
    setPixiDetailPanelPosition({ x, y });
};

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
  const handleAlertMessageAnime = (text) => {
    // メッセージと表示状態を設定
    setAlertMessageAnime(text);
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
    handleMouseClick,

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
    setInputAngleSprite,

    //ランダムアニメ
    randomEasing,
    setRandomEasing,
    inputRandomEasing,
    setInputRandomEasing,
    randomCloseEnough,
    setRandomCloseEnough,
    inputRandomCloseEnough,
    setInputRandomCloseEnough,
    moveClickSpeed,
    setMoveClickSpeed,
    inputMoveClickSpeed,
    setInputMoveClickSpeed,

    //範囲アニメ
    boundaryAnimeSpeed,
    setBoundaryAnimeSpeed,
    inputBoundaryAnimeSpeed,
    setInputBoundaryAnimeSpeed,
    boundaryAnimeXValue,
    setBoundaryAnimeXValue,
    inputBoundaryAnimeXValue,
    setInputBoundaryAnimeXValue,
    boundaryAnimeYValue,
    setBoundaryAnimeYValue,
    inputBoundaryAnimeYValue,
    setInputBoundaryAnimeYValue,
    boundaryAnimeWidth,
    setBoundaryAnimeWidth,
    inputBoundaryAnimeWidth,
    setInputBoundaryAnimeWidth,
    boundaryAnimeHeight,
    setBoundaryAnimeHeight,
    inputBoundaryAnimeHeight,
    setInputBoundaryAnimeHeight,

    //円形アニメ
    circularAnimeSpeed,
    setCircularAnimeSpeed,
    inputCircularAnimeSpeed,
    setInputCircularAnimeSpeed,
    circularAnimeXValue,
    setCircularAnimeXValue,
    inputCircularAnimeXValue,
    setInputCircularAnimeXValue,
    circularAnimeYValue,
    setCircularAnimeYValue,
    inputCircularAnimeYValue,
    setInputCircularAnimeYValue,
    circularAnimeRadius,
    setCircularAnimeRadius,
    inputCircularAnimeRadius,
    setInputCircularAnimeRadius,

    //背景アニメ
    spaceAnimeDirection,
    setSpaceAnimeDirection,
    spaceAnimeSpeed,
    setSpaceAnimeSpeed,
    inputSpaceAnimeSpeed,
    setInputSpaceAnimeSpeed,
    intervalTime,
    setIntervalTime,
    inputIntervalTime,
    setInputIntervalTime

  }


  return (
    <PixiGroupContext.Provider value={value}>
      {children}
    </PixiGroupContext.Provider>
  );
};
