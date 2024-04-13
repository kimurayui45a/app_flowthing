import React, { createContext, useContext, useState, useEffect } from 'react';


//ペンツールの詳細設定のパラメータを管理するコンテキスト
const P5PenToolParametersContext = createContext();
export const useP5PenToolParametersContext = () => useContext(P5PenToolParametersContext);

export const P5PenToolParametersProvider = ({ children }) => {

  //概要説明
  const [description, setDescription] = useState({ title: '概要欄', desc: '' });

  //各ぺんの説明
  const [betaDescription, setbetaDescription] = useState({ title: 'ベタ塗りペン', description: '一番シンプルなペンです。\nこのペンには「ぼかし」「筆圧」機能はついていません。\n一定の太さで描画できます。'});
  const [mmPenDescription, setMmPenDescription] = useState({ title: 'ミリペン', description: 'ぼかし」機能がついたペンです。\nこのペンには「筆圧」機能はついていません。\n一定の太さで描画できます。'});

  const [inkPenDescription, setInkPenDescription] = useState({ title: 'インクペン', description: '「筆圧」を感知するペンです。\nこのペンには「ぼかし」機能はついていません。\n筆圧の強弱に応じてペンの太さが変わります。'});
  const [watercolorDescription, setWatercolorDescription] = useState({ title: '水彩ペン', description: '「筆圧」と「ぼかし」機能がついたペンです。\n筆圧の強弱に応じてペンの太さが変わります。'});

  const [pencilDescription, setPencilDescription] = useState({ title: 'エアブラシ', description: '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。また描く速度によって線の繋がり具合が大きく変動します。'});
  const [oilPenDescription, setOilPenDescription] = useState({ title: '厚塗りペン', description: '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。一貫した厚みのある表現ができます。'});
  const [mixPenDescription, setMixPenDescription] = useState({ title: '色混ぜ', description: 'canvas内で触れたピクセルの色を感知しその色で描けるペンです。このペン自体には色はありません。\n「筆圧」と「ぼかし」機能がついています。\n筆圧の強弱に応じてペンの太さが変わります。'});

  // 筆圧加算値
  const [pressureAdjustment, setPressureAdjustment] = useState(0);

  //S値のユーザーカスタム値
  const [userCustomS, setUserCustomS] = useState(0);
  const [sMin, setSMin] = useState(0);

  //V値のユーザーカスタム値
  const [userCustomV, setUserCustomV] = useState(0);
  const [vMax, setVMax] = useState(0);

  //「ペンツール」のbool値判定（ぼかし）
  //「ペンツール」のbool値判定（ミリペン）
  const [mmBlur, setMmBlur] = useState(true);
  //「ペンツール」のbool値判定（水彩ペン）
  const [watercolorBlur, setWatercolorBlur] = useState(true);
  //「ペンツール」のbool値判定（エアブラシ）
  const [pencilBlur, setPencilBlur] = useState(true);
  //「ペンツール」のbool値判定（厚塗りペン）
  const [oilBlur, setOilBlur] = useState(true);
  //「ペンツール」のbool値判定（色混ぜ）
  const [mixBlur, setMixBlur] = useState(true);

  //「ペンツール」のbool値判定（その他）
  const [pressurePen, setPressurePen] = useState(true);
  const [sizeCustomBool, setSizeCustomBool] = useState(true);
  const [activeS, setActiveS] = useState(true);
  const [maxChangeSBool, setMaxChangeSBool] = useState(true);
  const [maxChangeVBool, setMaxChangeVBool] = useState(true);
  const [activeV, setActiveV] = useState(false);
  const [alphaDecayBool, setAlphaDecayBool] = useState(true);

  //ぼかし（「カスタムブラシ」）
  // const [blurValue, setBlurValue] = useState(1);
  // const [inputBlurValue, setInputBlurValue] = useState(String(blurValue));
  // const [blurValueMax, setBlurValueMax] = useState(0.3);

  //ぼかし（「ミリペン」）
  const [mmBlurValue, setMmBlurValue] = useState(1);
  const [inputMmBlurValue, setInputMmBlurValue] = useState(String(mmBlurValue));
  const [mmBlurValueMax, setMmBlurValueMax] = useState(0.3);

  //ぼかし（「水彩ペン」）
  const [watercolorBlurValue, setWatercolorBlurValue] = useState(1);
  const [inputWatercolorBlurValue, setInputWatercolorBlurValue] = useState(String(watercolorBlurValue));
  const [watercolorBlurValueMax, setWatercolorBlurValueMax] = useState(0.3);

  //ぼかし（「エアブラシ」）
  const [pencilBlurValue, setPencilBlurValue] = useState(1);
  const [inputPencilBlurValue, setInputPencilBlurValue] = useState(String(pencilBlurValue));
  const [pencilBlurValueMax, setPencilBlurValueMax] = useState(0.3);

  //ぼかし（「厚塗りペン」）
  const [oilBlurValue, setOilBlurValue] = useState(1);
  const [inputOilBlurValue, setInputOilBlurValue] = useState(String(oilBlurValue));
  const [oilBlurValueMax, setOilBlurValueMax] = useState(0.3);

  //ぼかし（「色混ぜ」）
  const [mixBlurValue, setMixBlurValue] = useState(1);
  const [inputMixBlurValue, setInputMixBlurValue] = useState(String(mixBlurValue));
  const [mixBlurValueMax, setMixBlurValueMax] = useState(0.3);


  //滑らかさ調整（インクペン）
  const [densityValue, setDensityValue] = useState(0.01);
  const [inputDensityValue, setInputDensityValue] = useState(String(densityValue));


  //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
  //滑らかさ調整（ミリペン）
  const [mmDensityValue, setMmDensityValue] = useState(20);
  const [inputMmDensityValue, setInputMmDensityValue] = useState(String(mmDensityValue));

  //滑らかさ調整（水彩ペン）
  const [waterDensityValue, setWaterDensityValue] = useState(20);
  const [inputWaterDensityValue, setInputWaterDensityValue] = useState(String(waterDensityValue));

  //滑らかさ調整（厚塗りペン）
  const [oilDensityValue, setOilDensityValue] = useState(20);
  const [inputOilDensityValue, setInputOilDensityValue] = useState(String(oilDensityValue));

  //滑らかさ調整（色混ぜペン）
  const [mixDensityValue, setMixDensityValue] = useState(20);
  const [inputMixDensityValue, setInputMixDensityValue] = useState(String(mixDensityValue));


  //補間率の調整
  const [lerpRateMin, setLerpRateMin] = useState(0.1);
  const [lerpRateMax, setLerpRateMax] = useState(0.5);
  const [inputLerpRateMin, setInputLerpRateMin] = useState(String(lerpRateMin));
  const [inputLerpRateMax, setInputLerpRateMax] = useState(String(lerpRateMax));

  //サイズ補間率
  const [rateSize, setRateSize] = useState(0.1);
  const [inputRateSize, setInputRateSize] = useState(String(rateSize));

  //S値の補間率の調整
  const [maxChangeS, setMaxChangeS] = useState(0);
  const [rateS, setRateS] = useState(0.1);
  const [inputRateS, setInputRateS] = useState(String(rateS));

  // V値の補間率の調整
  const [maxChangeV, setMaxChangeV] = useState(0);
  const [rateV, setRateV] = useState(0.1);
  const [inputRateV, setInputRateV] = useState(String(rateV));

  //指先・色混ぜツール
  const [alphaRate, setAlphaRate] = useState(255);
  const [inputAlphaRate, setInputAlphaRate] = useState(String(alphaRate));
  const [alphaDecayRate, setAlphaDecayRate] = useState(5);
  const [inputAlphaDecayRate, setInputAlphaDecayRate] = useState(String(alphaDecayRate));

  //エアブラシツール
  const [pencilLerpStep, setPencilLerpStep] = useState(0.05);
  const [inputPencilLerpStep, setInputPencilLerpStep] = useState(String(pencilLerpStep));
  const [pencilNumPoints, setPencilNumPoints] = useState(10);
  const [inputPencilNumPoints, setInputPencilNumPoints] = useState(String(pencilNumPoints));
  const [pencilHeightDot, setPencilHeightDot] = useState(1);
  const [inputPencilHeightDot, setInputPencilHeightDot] = useState(String(pencilHeightDot));
  const [pencilWidthDot, setPencilWidthDot] = useState(1);
  const [inputPencilWidthDot, setInputPencilWidthDot] = useState(String(pencilWidthDot));
  const [pencilAlpha, setPencilAlpha] = useState(0);
  const [inputPencilAlpha, setInputPencilAlpha] = useState(String(pencilAlpha));

  //油絵の具ツール
  const [oilLerpStep, setOilLerpStep] = useState(0.05);
  const [inputOilLerpStep, setInputOilLerpStep] = useState(String(oilLerpStep));
  const [oilNumPoints, setOilNumPoints] = useState(5);
  const [inputOilNumPoints, setInputOilNumPoints] = useState(String(oilNumPoints));
  const [oilHeightDot, setOilHeightDot] = useState(1);
  const [inputOilHeightDot, setInputOilHeightDot] = useState(String(oilHeightDot));
  const [oilWidthDot, setOilWidthDot] = useState(1);
  const [inputOilWidthDot, setInputOilWidthDot] = useState(String(oilWidthDot));
  const [oilAlpha, setOilAlpha] = useState(0);
  const [inputOilAlpha, setInputOilAlpha] = useState(String(oilAlpha));

  //図形ツールのパラメータ
  //図形ツール中にを描画するか配置のステート
  const [shapesInstallation, setShapesInstallation] = useState(false);

  //図形にグラデーションをするステート
  const [shapesGradation, setShapesGradation] = useState(false);

  //中を塗りつぶすかのステート
  const [shapesFillChange, setShapesFillChange] = useState('nofill');

  //横のサイズ
  const [shapesWidthSize, setShapesWidthSize] = useState(10);
  const [inputShapesWidthSize, setInputShapesWidthSize] = useState(String(shapesWidthSize));

  //縦のサイズ
  const [shapesHeightSize, setShapesHeightSize] = useState(10);
  const [inputShapesHeightSize, setInputShapesHeightSize] = useState(String(shapesHeightSize));

  //図形の角を丸めるかどうかのステート
  const [cornerChange, setCornerChange] = useState(false);

  //「図形」角(左上)
  const [upperLeft, setUpperLeft] = useState(1);
  const [inputUpperLeft, setInputUpperLeft] = useState(String(upperLeft));

  //「図形」角(右上)
  const [upperRight, setUpperRight] = useState(1);
  const [inputUpperRight, setInputUpperRight] = useState(String(upperRight));
  
  //「図形」角(右下)
  const [lowerRight, setLowerRight] = useState(1);
  const [inputLowerRight, setInputLowerRight] = useState(String(lowerRight));

  //「図形」角(左下)
  const [lowerLeft, setLowerLeft] = useState(1);
  const [inputLowerLeft, setInputLowerLeft] = useState(String(lowerLeft));

  //線を引く方向を変える
  const [lineDirection, setLineDirection] = useState(true);


  //テキスト関係
  //テキストの内容を保持（上限50文字）
  const [shapesText, setShapesText] = useState('');
  const [inputShapesText, setInputShapesText] = useState(String(shapesText));

  //行間
  const [shapesTextLeading, setShapesTextLeading] = useState(10);
  const [inputShapesTextLeading, setInputShapesTextLeading] = useState(String(shapesTextLeading));

  //テキストのフォント
  const [shapesTextFont, setShapesTextFont] = useState('Arial');

  //フォントのスタイル「NORMAL」「ITALIC」「BOLD」「BOLDITALIC」
  const [shapesTextStyle, setShapesTextStyle] = useState('NORMAL');

  //水平方向のテキストの揃え位置「RIGHT」「CENTER」「LEFT」
  const [shapesTextAlign, setShapesTextAlign] = useState('CENTER');

  //垂直方向のテキストの揃え位置「TOP」「CENTER」「BASELINE」「BOTTOM」
  const [shapesTextAlignVertical, setShapesTextAlignVertical] = useState('TOP');

  //テキストに輪郭をつける場合のステート「textFill」「textStroke」「textAllType」
  const [shapesTextFill, setShapesTextFill] = useState('textFill');

  //テキストの枠線の太さ
  const [shapesTextStroke, setShapesTextStroke] = useState(2);
  const [inputShapesTextStroke, setInputShapesTextStroke] = useState(String(shapesTextStroke));


  //フォームの仮入力と実際の値との同期(Input関係)
  //指先・色混ぜツール（指先に透明度をつける）
  useEffect(() => {
    setInputAlphaRate(String(alphaRate));
  }, [alphaRate]);

  //指先・色混ぜツール（徐々に透明度を下げる）
  useEffect(() => {
    setInputAlphaDecayRate(String(alphaDecayRate));
  }, [alphaDecayRate]);

  //ぼかし
  // useEffect(() => {
  //   setInputBlurValue(String(blurValue));
  // }, [blurValue]);

  //ぼかし（「ミリペン」）
  useEffect(() => {
    setInputMmBlurValue(String(mmBlurValue));
  }, [mmBlurValue]);

  //ぼかし（「水彩ペン」）
  useEffect(() => {
    setInputWatercolorBlurValue(String(watercolorBlurValue));
  }, [watercolorBlurValue]);

  //ぼかし（「エアブラシ」）
  useEffect(() => {
    setInputPencilBlurValue(String(pencilBlurValue));
  }, [pencilBlurValue]);

  //ぼかし（「厚塗りペン」）
  useEffect(() => {
    setInputOilBlurValue(String(oilBlurValue));
  }, [oilBlurValue]);

  //ぼかし（「色混ぜ」）
  useEffect(() => {
    setInputMixBlurValue(String(mixBlurValue));
  }, [mixBlurValue]);


  //滑らかさ調整（インクペン）
  useEffect(() => {
    setInputDensityValue(String(densityValue));
  }, [densityValue]);

  //滑らかさ調整（ミリペン）
  useEffect(() => {
    setInputMmDensityValue(String(mmDensityValue));
  }, [mmDensityValue]);

  //滑らかさ調整（水彩ペン）
  useEffect(() => {
    setInputWaterDensityValue(String(waterDensityValue));
  }, [waterDensityValue]);

  //滑らかさ調整（厚塗りペン）
  useEffect(() => {
    setInputOilDensityValue(String(oilDensityValue));
  }, [oilDensityValue]);

  //滑らかさ調整（色混ぜペン）
  useEffect(() => {
    setInputMixDensityValue(String(mixDensityValue));
  }, [mixDensityValue]);

  //補間率の調整
  useEffect(() => {
    setInputLerpRateMin(String(lerpRateMin));
  }, [lerpRateMin]);

  //補間率の調整
  useEffect(() => {
    setInputLerpRateMax(String(lerpRateMax));
  }, [lerpRateMax]);

  //サイズ補間率
  useEffect(() => {
    setInputRateSize(String(rateSize));
  }, [rateSize]);

  //S値の変動具合
  useEffect(() => {
    setInputRateS(String(rateS));
  }, [rateS]);

  //V値の変動具合
  useEffect(() => {
    setInputRateV(String(rateV));
  }, [rateV]);

  //エアブラシの透明度
  useEffect(() => {
    setInputPencilAlpha(String(pencilAlpha));
  }, [pencilAlpha]);

  //エアブラシドットの縦幅
  useEffect(() => {
    setInputPencilHeightDot(String(pencilHeightDot));
  }, [pencilHeightDot]);

  //エアブラシドットの横幅
  useEffect(() => {
    setInputPencilWidthDot(String(pencilWidthDot));
  }, [pencilWidthDot]);

  //エアブラシの描画される点の数を制御する値
  useEffect(() => {
    setInputPencilNumPoints(String(pencilNumPoints));
  }, [pencilNumPoints]);

  //エアブラシの補間の細かさや速度を調整する値
  useEffect(() => {
    setInputPencilLerpStep(String(pencilLerpStep));
  }, [pencilLerpStep]);

  //厚塗りペンの補間の細かさや速度を調整する値
  useEffect(() => {
    setInputOilLerpStep(String(oilLerpStep));
  }, [oilLerpStep]);

  //厚塗りペンの描画される点の数を制御する値
  useEffect(() => {
    setInputOilNumPoints(String(oilNumPoints));
  }, [oilNumPoints]);

  //厚塗りペンドットの縦幅
  useEffect(() => {
    setInputOilHeightDot(String(oilHeightDot));
  }, [oilHeightDot]);

  //厚塗りペンドットの横幅
  useEffect(() => {
    setInputOilWidthDot(String(oilWidthDot));
  }, [oilWidthDot]);

  //厚塗りペンの透明度
  useEffect(() => {
    setInputOilAlpha(String(oilAlpha));
  }, [oilAlpha]);


  //図形ツールのパラメータ
  //横のサイズ
  useEffect(() => {
    setInputShapesWidthSize(String(shapesWidthSize));
  }, [shapesWidthSize]);

  //縦のサイズ
  useEffect(() => {
    setInputShapesHeightSize(String(shapesHeightSize));
  }, [shapesHeightSize]);

  //「図形」角(左上)
  useEffect(() => {
    setInputUpperLeft(String(upperLeft));
  }, [upperLeft]);

  //「図形」角(右上)
  useEffect(() => {
    setInputUpperRight(String(upperRight));
  }, [upperRight]);

  //「図形」角(右下)
  useEffect(() => {
    setInputLowerRight(String(lowerRight));
  }, [lowerRight]);

  //「図形」角(左下)
  useEffect(() => {
    setInputLowerLeft(String(lowerLeft));
  }, [lowerLeft]);

  //テキストの内容を保持
  useEffect(() => {
    setInputShapesText(String(shapesText));
  }, [shapesText]);

  //行間
  useEffect(() => {
    setInputShapesTextLeading(String(shapesTextLeading));
  }, [shapesTextLeading]);

  //テキストの枠線の太さ
  useEffect(() => {
    setInputShapesTextStroke(String(shapesTextStroke));
  }, [shapesTextStroke]);
  

  //項目にカーソルが当たったら「概要説明」を表示する関数
  const handleDescriptionMouseEnter = (newtitle, newdesc) => {
    setDescription({ title: newtitle, desc: newdesc });
  };


  //各ぺんの説明を表示する関数
  const handlePenToolDescription = (setPenDescription, newtitle, newdesc) => {
    setPenDescription({ title: newtitle, description: newdesc });
  };


  const value = {
    //概要説明
    description,
    setDescription,
    handleDescriptionMouseEnter,

    //詳細パネル（ペンツール...筆圧とSとVのMAX）
    pressureAdjustment,
    setPressureAdjustment,
    userCustomS,
    setUserCustomS,
    sMin,
    setSMin,
    userCustomV,
    setUserCustomV,
    vMax,
    setVMax,

    //詳細パネル（ペンツール...各設定のbool値）
    pressurePen,
    setPressurePen,
    sizeCustomBool,
    setSizeCustomBool,
    activeS,
    setActiveS,
    maxChangeSBool,
    setMaxChangeSBool,
    maxChangeVBool,
    setMaxChangeVBool,
    activeV,
    setActiveV,
    alphaDecayBool,
    setAlphaDecayBool,

    //詳細パネル（ペンツール...ぼかし、ミリペン、水彩ペン、エアブラシ、厚塗りペン、色混ぜ）
    mmBlurValue,
    setMmBlurValue,
    inputMmBlurValue,
    setInputMmBlurValue,
    mmBlurValueMax,
    setMmBlurValueMax,
    watercolorBlurValue,
    setWatercolorBlurValue,
    inputWatercolorBlurValue,
    setInputWatercolorBlurValue,
    watercolorBlurValueMax,
    setWatercolorBlurValueMax,
    pencilBlurValue,
    setPencilBlurValue,
    inputPencilBlurValue,
    setInputPencilBlurValue,
    pencilBlurValueMax,
    setPencilBlurValueMax,
    oilBlurValue,
    setOilBlurValue,
    inputOilBlurValue,
    setInputOilBlurValue,
    oilBlurValueMax,
    setOilBlurValueMax,
    mixBlurValue,
    setMixBlurValue,
    inputMixBlurValue, 
    setInputMixBlurValue,
    mixBlurValueMax,
    setMixBlurValueMax,
  
    //詳細パネル（ペンツール...インクペンの滑らかさ）
    densityValue,
    setDensityValue,
    inputDensityValue,
    setInputDensityValue,

    //詳細パネル（ペンツール...筆圧変動に関する補間率）
    lerpRateMin,
    setLerpRateMin,
    lerpRateMax,
    setLerpRateMax,
    inputLerpRateMin,
    setInputLerpRateMin,
    inputLerpRateMax,
    setInputLerpRateMax,

    //詳細パネル（ペンツール...サイズに関する補間率）
    rateSize,
    setRateSize,
    inputRateSize,
    setInputRateSize,

    //詳細パネル（ペンツール...S値に関する補間率）
    maxChangeS,
    setMaxChangeS,
    rateS,
    setRateS,
    inputRateS,
    setInputRateS,

    //詳細パネル（ペンツール...V値に関する補間率）
    maxChangeV,
    setMaxChangeV,
    rateV,
    setRateV,
    inputRateV,
    setInputRateV,

    //詳細パネル（ペンツール...指先・色混ぜツール）
    alphaRate,
    setAlphaRate,
    inputAlphaRate,
    setInputAlphaRate,
    alphaDecayRate,
    setAlphaDecayRate,
    inputAlphaDecayRate,
    setInputAlphaDecayRate,

    //詳細パネル（ペンツール...エアブラシツール）
    pencilLerpStep,
    setPencilLerpStep,
    inputPencilLerpStep,
    setInputPencilLerpStep,
    pencilNumPoints,
    setPencilNumPoints,
    inputPencilNumPoints,
    setInputPencilNumPoints,
    pencilHeightDot,
    setPencilHeightDot,
    inputPencilHeightDot,
    setInputPencilHeightDot,
    pencilWidthDot,
    setPencilWidthDot,
    inputPencilWidthDot,
    setInputPencilWidthDot,
    pencilAlpha,
    setPencilAlpha,
    inputPencilAlpha,
    setInputPencilAlpha,

    //詳細パネル（ペンツール...厚塗りペンツール）
    oilLerpStep,
    setOilLerpStep,
    inputOilLerpStep,
    setInputOilLerpStep,
    oilNumPoints,
    setOilNumPoints,
    inputOilNumPoints,
    setInputOilNumPoints,
    oilHeightDot,
    setOilHeightDot,
    inputOilHeightDot,
    setInputOilHeightDot,
    oilWidthDot,
    setOilWidthDot,
    inputOilWidthDot,
    setInputOilWidthDot,
    oilAlpha,
    setOilAlpha,
    inputOilAlpha,setInputOilAlpha,

    //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
    mmDensityValue,
    setMmDensityValue,
    inputMmDensityValue,
    setInputMmDensityValue,
    waterDensityValue,
    setWaterDensityValue,
    inputWaterDensityValue,
    setInputWaterDensityValue,
    oilDensityValue,
    setOilDensityValue,
    inputOilDensityValue,
    setInputOilDensityValue,
    mixDensityValue,
    setMixDensityValue,
    inputMixDensityValue,
    setInputMixDensityValue,

    //「ペンツール」のbool値判定（ぼかし）
    mmBlur,
    setMmBlur,
    watercolorBlur,
    setWatercolorBlur,
    pencilBlur,
    setPencilBlur,
    oilBlur,
    setOilBlur,
    mixBlur,
    setMixBlur,

    //図形ツールのパラメータ
    shapesFillChange,
    setShapesFillChange,
    shapesWidthSize,
    setShapesWidthSize,
    inputShapesWidthSize,
    setInputShapesWidthSize,
    shapesHeightSize,
    setShapesHeightSize,
    inputShapesHeightSize,
    setInputShapesHeightSize,
    shapesInstallation,
    setShapesInstallation,
    lineDirection,
    setLineDirection,
    shapesGradation,
    setShapesGradation,

    //図形の角を丸めるかどうかのステート
    cornerChange,
    setCornerChange,
    upperLeft,
    setUpperLeft,
    inputUpperLeft,
    setInputUpperLeft,
    upperRight,
    setUpperRight,
    inputUpperRight,
    setInputUpperRight,
    lowerRight,
    setLowerRight,
    inputLowerRight,
    setInputLowerRight,
    lowerLeft,
    setLowerLeft,
    inputLowerLeft,
    setInputLowerLeft,

    //テキスト関係
    shapesText,
    setShapesText,
    inputShapesText,
    setInputShapesText,
    shapesTextLeading,
    setShapesTextLeading,
    inputShapesTextLeading,
    setInputShapesTextLeading,
    shapesTextFont,
    setShapesTextFont,
    shapesTextStyle,
    setShapesTextStyle,
    shapesTextAlign,
    setShapesTextAlign,
    shapesTextAlignVertical,
    setShapesTextAlignVertical,
    shapesTextFill,
    setShapesTextFill,
    shapesTextStroke,
    setShapesTextStroke,
    inputShapesTextStroke,
    setInputShapesTextStroke,

    //各ぺんの説明
    betaDescription,
    setbetaDescription,
    mmPenDescription,
    setMmPenDescription,
    inkPenDescription,
    setInkPenDescription,
    watercolorDescription,
    setWatercolorDescription,
    pencilDescription,
    setPencilDescription,
    oilPenDescription,
    setOilPenDescription,
    mixPenDescription,
    setMixPenDescription,
    handlePenToolDescription
  };

  return (
    <P5PenToolParametersContext.Provider value={value}>
      {children}
    </P5PenToolParametersContext.Provider>
  );
};
