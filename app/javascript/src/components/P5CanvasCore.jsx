import React, { useEffect, useRef, useState, useCallback } from 'react';
import p5 from 'p5';
import iro from '@jaames/iro';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { useP5ToolModeContext } from './P5ModeContext';
import { P5CanvasCoreShareProvider } from './P5CanvasCoreShareContext';
import { P5Cursor } from './P5Cursor';
import { P5DefaultPanel } from './P5DefaultPanel';
import { P5CompactPanel } from './P5CompactPanel';
import { P5ColorPalettePanel } from './P5ColorPalettePanel';
import { P5DetailPanel } from './P5DetailPanel';
import { P5LayersInfoPanel } from './P5LayersInfoPanel';
import { P5ScalePanel } from './P5ScalePanel';
import { P5SizePanel } from './P5SizePanel';
import { useP5Color } from './P5ColorContext';
import { useP5PenToolParametersContext } from './P5PenToolParametersContext';

const P5CanvasCore = ({ canvasImgId, canvasData, canvasSaveData, canvasSize, onDataFromGrandchild, canvasSpaceSize, setCanvasP5ToPixi, canvasP5ToPixi }) => {
  
  //canvas全体の情報に関するRef
  const sketchRef = useRef();
  const p5InstanceRef = useRef();
  const p5CanvasInstanceRef = useRef(null);
  const canvasRef = useRef();

  //「ツールモードコンテキスト」から受け取るもの
  const {
    penGroup,
    toolMode,
    setToolMode,
    handleToolChange,
    isImageInsertionActive,
    setIsImageInsertionActive,
    setDetailGroup,
    toast,
    setToast,
    message,
    setMessage,
    position,
    setPosition,
    handleAlertMessage,
    selectArrangeMode,
    setSelectArrangeMode,
    mouseModes,
    pressureModes,
    penDetailGroup,
    customBrushModes,
    shapesTool,
    handleAlertLayerMessage,
    layerMessage,
    layerToast
  } = useP5ToolModeContext();

  //「カラーコンテキスト」から受け取るもの
  const {
    currentColor,
    setCurrentColor,
    currentAlphaColor,
    secondAlphaColor,
    selectAlphaColorPreview,
    h,
    s,
    v,
  } = useP5Color();

  //「パネル」コンテキスト
  const {
    mainPanelMode,
    colorPalettePanelVisible,
    layersInfoPanelVisible,
    scalePanelVisible,
    sizePanelVisible,
    p5DrawingEnabled,
    detailPanelVisible,
    setP5DrawingEnabled
  } = useP5PanelGroupContext();

  //「詳細設定パラメータコンテキスト」から受け取るもの
  const {
    //詳細パネル（ペンツール...筆圧とSとVのMAX）
    pressureAdjustment,
    userCustomS,
    sMin,
    userCustomV,
    vMax,

    //詳細パネル（ペンツール...各設定の「ぼかし」bool値）
    mmBlur,
    watercolorBlur,
    pencilBlur,
    oilBlur,
    mixBlur,

    //詳細パネル（ペンツール...各設定の「その他」bool値）
    pressurePen,
    sizeCustomBool,
    activeS,
    maxChangeSBool,
    maxChangeVBool,
    activeV,
    alphaDecayBool,

    //詳細パネル（ペンツール...ぼかし、ミリペン、水彩ペン、エアブラシ、厚塗りペン、色混ぜ）
    mmBlurValue,
    watercolorBlurValue,
    pencilBlurValue,
    oilBlurValue,
    mixBlurValue,

    //詳細パネル（ペンツール...滑らかさ調整(インクペン, ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)）
    densityValue,
    waterDensityValue,
    mmDensityValue,
    oilDensityValue,
    mixDensityValue,

    //詳細パネル（ペンツール...筆圧変動に関する補間率）
    lerpRateMin,
    lerpRateMax,

    //詳細パネル（ペンツール...サイズに関する補間率）
    rateSize,

    //詳細パネル（ペンツール...S値に関する補間率）
    maxChangeS,
    setMaxChangeS,
    rateS,

    //詳細パネル（ペンツール...V値に関する補間率）
    maxChangeV,
    setMaxChangeV,
    rateV,

    //詳細パネル（ペンツール...指先・色混ぜツール）
    alphaRate,
    alphaDecayRate,
    activeMixAlpha,
    setActiveMixAlpha,

    //詳細パネル（ペンツール...エアブラシツール）
    pencilLerpStep,
    pencilNumPoints,
    pencilHeightDot,
    pencilWidthDot,
    pencilAlpha,
    setPencilHeightDot,
    setPencilWidthDot,
    
    //詳細パネル（ペンツール...厚塗りペンツール）
    oilLerpStep,
    oilNumPoints,
    oilHeightDot,
    oilWidthDot,
    oilAlpha,
    setOilHeightDot,
    setOilWidthDot,

    //図形ツールのパラメータ
    shapesFillChange,
    setShapesFillChange,
    shapesWidthSize,
    shapesHeightSize,
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
    upperRight,
    lowerRight,
    lowerLeft,

    //テキスト関係
    shapesText,
    shapesTextLeading,
    shapesTextFont,
    setShapesTextFont,
    shapesTextStyle,
    setShapesTextStyle,
    shapesTextAlign,
    setShapesTextAlign,
    shapesTextAlignVertical,
    shapesTextStroke
  } = useP5PenToolParametersContext();


  //パネル操作とcanvas操作の挙動を管理するもの（p5DrawingEnabledはパネルコンテキスト管理）
  const p5DrawingEnabledRef = useRef(p5DrawingEnabled);
  useEffect(() => {
    p5DrawingEnabledRef.current = p5DrawingEnabled;
  }, [p5DrawingEnabled]);

  //「スケール」機能関係
  //スケールパネルの表示管理
  const scalePanelVisibleRef = useRef(scalePanelVisible);

  useEffect(() => {
    scalePanelVisibleRef.current = scalePanelVisible;
  }, [scalePanelVisible]);

  //canvasの移動に関するもの、canvasの移動範囲を管理する外側
  const canvasContainerRef = useRef();
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const canvasPosRef = useRef({ x: 0, y: 0 });

  //canvasのプレビュー
  const [dateAllCanvas, setDateAllCanvas] = useState(null);
  const [layersInfoCanvas, setLayersInfoCanvas] = useState([]);
  const [selectedAreaCanvas, setSelectedAreaCanvas] = useState(null);
  const [copyLayerCanvas, setCopyLayerCanvas] = useState(null);

  //エアブラシのプレビュー
  const pencilPreviewRef = useRef(null);
  const [pencilPreviewCanvas, setPencilPreviewCanvas] = useState(null);

  //厚塗りペンのプレビュー
  const oilPenPreviewRef = useRef(null);
  const [oilPenPreviewCanvas, setOilPenPreviewCanvas] = useState(null);

  //「ツールモード」
  //ツールモードの管理
  const toolModeRef = useRef(toolMode);

  useEffect(() => {
    toolModeRef.current = toolMode;
  }, [toolMode]);

  //「ツールサイズ」
  //「toolSize：通常ツールサイズ」、「minSize：筆圧で変動する最小サイズ」
  const [toolSize, setToolSize] = useState(5);
  const [minSize, setMinSize] = useState(2.5);
  const toolSizeRef = useRef(toolSize);
  const minSizeRef = useRef(minSize);
  const [inputMinValue, setInputMinValue] = useState(String(minSize));

  useEffect(() => {
    toolSizeRef.current = toolSize;
  }, [toolSize]);

  useEffect(() => {
    setInputMinValue(String(minSize));
  }, [minSize]);

  useEffect(() => {
    setMinSize(toolSize / 2);
    setInputMinValue(String(toolSize / 2));
  }, [toolSize]);

  //minSizeの内部処理は外部に飛ばすためminSizeの更新とRefが完全に同期するように記述
  useEffect(() => {
    minSizeRef.current = minSize;
  }, [minSize]);


  //「レイヤー機能」
  //レイヤー選択機能（描画レイヤー）
  const [selectLayer, setSelectLayer] = useState(1);
  const selectLayerRef = useRef(selectLayer);

  //2つ目のレイヤー選択モード
  const [secondLayerSelectMode, setSecondLayerSelectMode] = useState(false);
  const secondLayerSelectModeRef = useRef(secondLayerSelectMode);

  //2つ目のレイヤーの情報を管理するもの（選択レイヤー）
  const [selectSecondLayer, setSelectSecondLayer] = useState(null);
  const selectSecondLayerRef = useRef(selectSecondLayer);

  //レイヤー選択モードのuseEffect
  useEffect(() => {
    selectLayerRef.current = selectLayer;
  }, [selectLayer]);

  useEffect(() => {
    secondLayerSelectModeRef.current = secondLayerSelectMode;
  }, [secondLayerSelectMode]);
  
  useEffect(() => {
    selectSecondLayerRef.current = selectSecondLayer;
  }, [selectSecondLayer]);

  //メインレイヤー12枚（その他詳細な状態管理は下記「メインレイヤー12枚」）
  const layerRefs = useRef(new Array(12).fill(null).map(() => null));

  //レイヤーのセーブ状態を管理する
  const [saveLayersBool, setSaveLayersBool] = useState(false);
  const saveLayersBoolRef = useRef(saveLayersBool);

  useEffect(() => {
    saveLayersBoolRef.current = saveLayersBool;
  }, [saveLayersBool]);

  //一時レイヤー
  const [selectedArea, setSelectedArea] = useState(null);
  const [isGraphicsCreated, setIsGraphicsCreated] = useState(false);
  const selectedAreaRef = useRef(selectedArea);
  const [selectedAreaShow, setSelectedAreaShow] = useState(true);
  const selectedAreaShowRef = useRef(selectedAreaShow);
  const isTransformingActiveRef = useRef(false);
  const objectRef = useRef({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    angle: 0
  });

  useEffect(() => {
    selectedAreaRef.current = selectedArea;
  }, [selectedArea]);

  useEffect(() => {
    selectedAreaShowRef.current = selectedAreaShow;
  }, [selectedAreaShow]);

  // 視覚的な選択範囲の表示を管理するバッファ
  const selectingLayerRef = useRef(null);

  //コピー用一時バッファ
  const copyLayerRef = useRef(null);
  //const [copyMode, setCopyMode] = useState(false);
  const [copyLayerActive, setCopyLayerActive] = useState(false);
  //const copyModeRef = useRef(copyMode);
  //コピー用object
  const copyObjectRef = useRef({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    angle: 0
  });

  //背景レイヤーの表示
  const [backgroundLayerVisible, setBackgroundLayerVisible] = useState(true);
  const backgroundLayerVisibleRef = useRef(backgroundLayerVisible);

  useEffect(() => {
    backgroundLayerVisibleRef.current = backgroundLayerVisible;
  }, [backgroundLayerVisible]);


  //「範囲選択」「画像」機能・ツール
  //「範囲選択」「画像」機能・ツールの管理
  const selectArrangeModeRef = useRef(selectArrangeMode);
  useEffect(() => {
    selectArrangeModeRef.current = selectArrangeMode;
  }, [selectArrangeMode]);

  //ロード画像を管理するもの
  const imgRef = useRef(null);

  //画像のbool値（縮小するか）
  const [defaultScaleMode, setDefaultScaleMode] = useState(false);
  const isImageInsertionActiveRef = useRef(isImageInsertionActive);
  const defaultScaleModeRef = useRef(defaultScaleMode);

  useEffect(() => {
    isImageInsertionActiveRef.current = isImageInsertionActive;
  }, [isImageInsertionActive]);

  useEffect(() => {
    defaultScaleModeRef.current = defaultScaleMode;
  }, [defaultScaleMode]);

  //ぼかし（「選択範囲」）
  const [selectLayerBlurValue, setSelectLayerBlurValue] = useState(1);
  //const selectLayerBlurValueRef = useRef(selectLayerBlurValue);

  const [selectToolBlurBool, setSelectToolBlurBool] = useState(false);
  const selectToolBlurBoolRef = useRef(selectToolBlurBool);
  
  useEffect(() => {
    selectToolBlurBoolRef.current = selectToolBlurBool;
  }, [selectToolBlurBool]);

  //「選択範囲」の削除
  const [selectDeleteInversion, setSelectDeleteInversion] = useState(false);
  const selectDeleteInversionRef = useRef(selectDeleteInversion);

  useEffect(() => {
    selectDeleteInversionRef.current = selectDeleteInversion;
  }, [selectDeleteInversion]);


  //「メインレイヤー12枚」
  //メインレイヤー12枚の状態管理
  const [layersInfo, setLayersInfo] = useState(
    new Array(12).fill(null).map((_, index) => ({
      layer_id: index + 1,
      name: `レイヤー${index + 1}`,
      isVisible: index === 0,
      alphas: 255,
      blendMode: 'BLEND'
    }))
  );

  //レイヤー情報に外部からアクセスするためのもの
  const selectedLayerInfo = layersInfo.find(layer => layer.layer_id === selectLayer);
  const selectSecondLayerInfo = layersInfo.find(layer => layer.layer_id === selectSecondLayer);

  //メインレイヤー12枚の状態管理のRef
  const nameRef = useRef(new Array(12).fill('レイヤー${index + 1}'));
  const isVisibleRef = useRef(new Array(12).fill(true));
  const alphasRef = useRef(new Array(12).fill(255));
  const blendModeRef = useRef(new Array(12).fill('BLEND'));

  //再描画の場合の復元処理（マウント時に1回実行される）
  useEffect(() => {
    // canvasSaveDataが存在する場合、JSON形式からオブジェクトに変換してステートを更新
    if (canvasSaveData && canvasSaveData !== '' && canvasSaveData !== 'undefined' && canvasSaveData !== 'null') {
      const parsedData = JSON.parse(canvasSaveData);
  
      // すべてのレイヤーデータをもとにステートを更新（isVisibleがfalseの場合でも含める）
      setLayersInfo(parsedData.map(layerData => ({
        layer_id: layerData.layer_id,
        isVisible: layerData.isVisible || false,
        name: layerData.name || `レイヤー${layerData.layer_id}`, // nameが存在しない場合のデフォルト値
        alphas: layerData.alphas || 255, // alphasが存在しない場合のデフォルト値
        blendMode: layerData.blendMode || 'BLEND', // blendModeが存在しない場合のデフォルト値
      })));
      setSaveLayersBool(true);
    }
  }, [canvasSaveData]);  

  //レイヤー情報を管理するもの（layersInfoの更新時に全体を合わせる）
  useEffect(() => {
    layersInfo.forEach((layer, index) => {
      nameRef.current[index] = layer.name;
      alphasRef.current[index] = layer.alphas;
      isVisibleRef.current[index] = layer.isVisible;
      blendModeRef.current[index] = layer.blendMode;
    });
  }, [layersInfo]);


  //「ペンツール」
  //「カラー」関係
  const currentColorRef = useRef(currentColor);

  useEffect(() => {
    currentColorRef.current = currentColor;

    if (toolModeRef.current === 'pencilPen') {
      //エアブラシプレビューの更新
      getPencilParameters();
    }
    if (toolModeRef.current === 'oilPen') {
      //厚塗りペンプレビューの更新
      getOilPenParameters();
    }
  }, [currentColor]);

  //HSV
  const hRef = useRef(h);
  const sRef = useRef(s);
  const vRef = useRef(v);

  useEffect(() => {
    hRef.current = h;
    sRef.current = s;
    vRef.current = v;
  }, [h, s, v]);

  //色混ぜ用
  const [mixColor, setMixColor] = useState('rgba(255, 255, 255, 0)');

  const [mixH, setMixH] = useState(0);
  const [mixS, setMixS] = useState(0);
  const [mixV, setMixV] = useState(100);

  //HSV
  const mixHRef = useRef(mixH);
  const mixSRef = useRef(mixS);
  const mixVRef = useRef(mixV);

  useEffect(() => {
    mixHRef.current = mixH;
    mixSRef.current = mixS;
    mixVRef.current = mixV;
  }, [mixH, mixS, mixV]);

  useEffect(() => {
    const color = new iro.Color(mixColor);
    const hsv = color.hsv;
    setMixH(hsv.h);
    setMixS(hsv.s);
    setMixV(hsv.v);
  }, [mixColor]);


  //「カスタムブラシ」
  //「RGBカスタムペン」に関するバッファの管理
  const brushRef = useRef(null);
  //「HSVカスタムペン」に関するバッファの管理
  const brushHsvRef = useRef(null);
  //「指先カスタムペンHSV」に関するバッファの管理
  const mixBrushRef = useRef(null);


  // 筆圧加算値
  const pressureAdjustmentRef = useRef(pressureAdjustment);

  useEffect(() => {
    pressureAdjustmentRef.current = pressureAdjustment;
  }, [pressureAdjustment]);


  //S値のユーザーカスタム値
  const userCustomSRef = useRef(userCustomS);
  const sMinRef = useRef(sMin);

  useEffect(() => {
    userCustomSRef.current = userCustomS;
  }, [userCustomS]);

  useEffect(() => {
    sMinRef.current = sMin;
  }, [sMin]);


  //V値のユーザーカスタム値
  const userCustomVRef = useRef(userCustomV);
  const vMaxRef = useRef(vMax);

  useEffect(() => {
    userCustomVRef.current = userCustomV;
  }, [userCustomV]);

  useEffect(() => {
    vMaxRef.current = vMax;
  }, [vMax]);


  //詳細パネル（ペンツール...各設定の「ぼかし」bool値）
  const mmBlurRef = useRef(mmBlur);
  const watercolorBlurRef = useRef(watercolorBlur);
  const pencilBlurRef = useRef(pencilBlur);
  const oilBlurRef = useRef(oilBlur);
  const mixBlurRef = useRef(mixBlur);

  //詳細パネル（ペンツール...各設定の「その他」bool値）
  const pressurePenRef = useRef(pressurePen);
  const sizeCustomBoolRef = useRef(sizeCustomBool);
  const activeSRef = useRef(activeS);
  const activeVRef = useRef(activeV);
  const maxChangeSBoolRef = useRef(maxChangeSBool);
  const maxChangeVBoolRef = useRef(maxChangeVBool);
  //const alphaDecayBoolRef = useRef(alphaDecayBool);

  //詳細パネル（ペンツール...各設定の「ぼかし」bool値）
  useEffect(() => {
    mmBlurRef.current = mmBlur;
  }, [mmBlur]);

  useEffect(() => {
    watercolorBlurRef.current = watercolorBlur;
  }, [watercolorBlur]);

  useEffect(() => {
    pencilBlurRef.current = pencilBlur;
    //エアブラシプレビューの更新
    getPencilParameters();
  }, [pencilBlur]);

  useEffect(() => {
    oilBlurRef.current = oilBlur;
    //厚塗りペンプレビューの更新
    getOilPenParameters();
  }, [oilBlur]);

  useEffect(() => {
    mixBlurRef.current = mixBlur;
  }, [mixBlur]);

  //詳細パネル（ペンツール...各設定の「その他」bool値）
  useEffect(() => {
    pressurePenRef.current = pressurePen;
  }, [pressurePen]);

  useEffect(() => {
    sizeCustomBoolRef.current = sizeCustomBool;
  }, [sizeCustomBool]);

  useEffect(() => {
    activeSRef.current = activeS;
  }, [activeS]);

  useEffect(() => {
    activeVRef.current = activeV;
  }, [activeV]);

  useEffect(() => {
    maxChangeSBoolRef.current = maxChangeSBool;
  }, [maxChangeSBool]);

  useEffect(() => {
    maxChangeVBoolRef.current = maxChangeVBool;
  }, [maxChangeVBool]);

  // useEffect(() => {
  //   alphaDecayBoolRef.current = alphaDecayBool;
  // }, [alphaDecayBool]);


  //詳細パネル（ペンツール...ぼかし、ミリペン、水彩ペン、エアブラシ、厚塗りペン、色混ぜ）
  //ぼかし（「ミリペン」）
  const mmBlurValueRef = useRef(mmBlurValue);
  useEffect(() => {
    mmBlurValueRef.current = mmBlurValue;
  }, [mmBlurValue]);


  //ぼかし（「水彩ペン」）
  const watercolorBlurValueRef = useRef(watercolorBlurValue);
  useEffect(() => {
    watercolorBlurValueRef.current = watercolorBlurValue;
  }, [watercolorBlurValue]);


  //ぼかし（「エアブラシ」）
  const pencilBlurValueRef = useRef(pencilBlurValue);

  useEffect(() => {
    pencilBlurValueRef.current = pencilBlurValue;
  }, [pencilBlurValue]);


  //ぼかし（「厚塗りペン」）
  const oilBlurValueRef = useRef(oilBlurValue);

  useEffect(() => {
    oilBlurValueRef.current = oilBlurValue;
  }, [oilBlurValue]);


  //ぼかし（「色混ぜ」）
  const mixBlurValueRef = useRef(mixBlurValue);

  useEffect(() => {
    mixBlurValueRef.current = mixBlurValue;
  }, [mixBlurValue]);



  //滑らかさ調整（インクペン）
  const densityValueRef = useRef(densityValue);

  useEffect(() => {
    densityValueRef.current = densityValue;
  }, [densityValue]);


  //滑らかさ調整（ミリペン）
  const mmDensityValueRef = useRef(mmDensityValue);

  useEffect(() => {
    mmDensityValueRef.current = mmDensityValue;
  }, [mmDensityValue]);


  //滑らかさ調整（水彩ペン）
  const waterDensityValueRef = useRef(waterDensityValue);

  useEffect(() => {
    waterDensityValueRef.current = waterDensityValue;
  }, [waterDensityValue]);


  //滑らかさ調整（厚塗りペン）
  const oilDensityValueRef = useRef(oilDensityValue);

  useEffect(() => {
    oilDensityValueRef.current = oilDensityValue;
  }, [oilDensityValue]);


  //滑らかさ調整（色混ぜペン）
  const mixDensityValueRef = useRef(mixDensityValue);

  useEffect(() => {
    mixDensityValueRef.current = mixDensityValue;
  }, [mixDensityValue]);


  //補間率の調整
  const lerpRateMinRef = useRef(lerpRateMin);
  const lerpRateMaxRef = useRef(lerpRateMax);

  useEffect(() => {
    lerpRateMinRef.current = lerpRateMin;
  }, [lerpRateMin]);

  useEffect(() => {
    lerpRateMaxRef.current = lerpRateMax;
  }, [lerpRateMax]);


  //サイズ補間率
  const rateSizeRef = useRef(rateSize);

  useEffect(() => {
    rateSizeRef.current = rateSize;
  }, [rateSize]);


  //S値の補間率の調整
  const maxChangeSRef = useRef(maxChangeS);
  const rateSRef = useRef(rateS);

  useEffect(() => {
    maxChangeSRef.current = maxChangeS;
  }, [maxChangeS]);

  useEffect(() => {
    rateSRef.current = rateS;
  }, [rateS]);


  // V値の補間率の調整
  const maxChangeVRef = useRef(maxChangeV);
  const rateVRef = useRef(rateV);

  useEffect(() => {
    maxChangeVRef.current = maxChangeV;
  }, [maxChangeV]);

  useEffect(() => {
    rateVRef.current = rateV;
  }, [rateV]);


  //指先・色混ぜツール
  const alphaRateRef = useRef(alphaRate);
  const alphaDecayRateRef = useRef(alphaDecayRate);
  const activeMixAlphaRef = useRef(activeMixAlpha);

  useEffect(() => {
    alphaRateRef.current = alphaRate;
  }, [alphaRate]);

  useEffect(() => {
    alphaDecayRateRef.current = alphaDecayRate;
  }, [alphaDecayRate]);

  useEffect(() => {
    activeMixAlphaRef.current = activeMixAlpha;
  }, [activeMixAlpha]);

  //エアブラシツール
  const pencilLerpStepRef = useRef(pencilLerpStep);
  const pencilNumPointsRef = useRef(pencilNumPoints);
  const pencilHeightDotRef = useRef(pencilHeightDot);
  const pencilWidthDotRef = useRef(pencilWidthDot);
  const pencilAlphaRef = useRef(pencilAlpha);

  useEffect(() => {
    pencilLerpStepRef.current = pencilLerpStep;
    //プレビューの更新
    getPencilParameters();
  }, [pencilLerpStep]);

  useEffect(() => {
    pencilNumPointsRef.current = pencilNumPoints;
    //プレビューの更新
    getPencilParameters();
  }, [pencilNumPoints]);

  useEffect(() => {
    pencilHeightDotRef.current = pencilHeightDot;
    //プレビューの更新
    getPencilParameters();
  }, [pencilHeightDot]);

  useEffect(() => {
    pencilWidthDotRef.current = pencilWidthDot;
    //プレビューの更新
    getPencilParameters();
  }, [pencilWidthDot]);

  useEffect(() => {
    pencilAlphaRef.current = pencilAlpha;
    //プレビューの更新
    getPencilParameters();
  }, [pencilAlpha]);

  //ツールサイズが更新されたらエアブラシのドットのサイズを初期値に戻す
  useEffect(() => {
    setPencilHeightDot(1);
    setPencilWidthDot(1);
  }, [toolSize]);


  //油絵の具ツール
  const oilLerpStepRef = useRef(oilLerpStep);
  const oilNumPointsRef = useRef(oilNumPoints);
  const oilHeightDotRef = useRef(oilHeightDot);
  const oilWidthDotRef = useRef(oilWidthDot);
  const oilAlphaRef = useRef(oilAlpha);

  useEffect(() => {
    oilLerpStepRef.current = oilLerpStep;
    //プレビューの更新
    getOilPenParameters();
  }, [oilLerpStep]);

  useEffect(() => {
    oilNumPointsRef.current = oilNumPoints;
    //プレビューの更新
    getOilPenParameters();
  }, [oilNumPoints]);

  useEffect(() => {
    oilHeightDotRef.current = oilHeightDot;
    //プレビューの更新
    getOilPenParameters();
  }, [oilHeightDot]);

  useEffect(() => {
    oilWidthDotRef.current = oilWidthDot;
    //プレビューの更新
    getOilPenParameters();
  }, [oilWidthDot]);

  useEffect(() => {
    oilAlphaRef.current = oilAlpha;
    //プレビューの更新
    getOilPenParameters();
  }, [oilAlpha]);

  //ツールサイズが更新されたら厚塗りペンのドットのサイズを初期値に戻す
  useEffect(() => {
    setOilHeightDot(1);
    setOilWidthDot(1);
  }, [toolSize]);


  //S値に変動具合をつける、S値が更新されるたびに初期値「10」にリセットする
  useEffect(() => {
    setMaxChangeS(0);
  }, [s]);

  //V値に変動具合をつける、V値が更新されるたびに初期値「10」にリセットする
  useEffect(() => {
    setMaxChangeV(10);
  }, [v]);

  //ツールサイズが更新されたら「カスタムブラシ」のバッファを作成しなおす
  useEffect(() => {
    if (!customBrushModes.has(toolMode)) {
      return;
    } else {
      if (p5CanvasInstanceRef.current && toolSize) {
        p5CanvasInstanceRef.current.updateBrush(toolSize);
      }
    }
  }, [toolSize, toolMode]);


  //「筆圧カスタムペン」と通常のペンの切り替え処理
  useEffect(() => {
    // penModeが変更されたときにtogglePenMode関数を呼び出す
    if (p5CanvasInstanceRef.current) {
      if (pressureModes.has(toolMode)) {
        p5CanvasInstanceRef.current.startPressureDrawing(); // HSVモードへの切り替え
      } else {
      // HSVモードへの切り替えの前に、以前のイベントリスナーを削除する
      p5CanvasInstanceRef.current.stopPressureDrawing();
      }
    }
  }, [toolMode]);


  //縮小率を管理する
  const [reductionRateValue, setReductionRateValue] = useState(0.8);
  const reductionRateValueRef = useRef(reductionRateValue);

  useEffect(() => {
    reductionRateValueRef.current = reductionRateValue;
  }, [reductionRateValue]);


  //図形ツールのパラメータ
  //図形に関するbool値
  const shapesFillChangeRef = useRef(shapesFillChange);
  const cornerChangeRef = useRef(cornerChange);
  const shapesInstallationRef = useRef(shapesInstallation);

  useEffect(() => {
    shapesFillChangeRef.current = shapesFillChange;
  }, [shapesFillChange]);

  useEffect(() => {
    cornerChangeRef.current = cornerChange;
  }, [cornerChange]);

  useEffect(() => {
    shapesInstallationRef.current = shapesInstallation;
  }, [shapesInstallation]);


  //図形サイズ指定
  //横のサイズ
  const shapesWidthSizeRef = useRef(shapesWidthSize);
  useEffect(() => {
    shapesWidthSizeRef.current = shapesWidthSize;
  }, [shapesWidthSize]);

  //縦のサイズ
  const shapesHeightSizeRef = useRef(shapesHeightSize);
  useEffect(() => {
    shapesHeightSizeRef.current = shapesHeightSize;
  }, [shapesHeightSize]);

  //「図形」角(左上)
  const upperLeftRef = useRef(upperLeft);
  useEffect(() => {
    upperLeftRef.current = upperLeft;
  }, [upperLeft]);

  //「図形」角(右上)
  const upperRightRef = useRef(upperRight);
  useEffect(() => {
    upperRightRef.current = upperRight;
  }, [upperRight]);
  
  //「図形」角(右下)
  const lowerRightRef = useRef(lowerRight);
  useEffect(() => {
    lowerRightRef.current = lowerRight;
  }, [lowerRight]);

  //「図形」角(左下)
  const lowerLeftRef = useRef(lowerLeft);
  useEffect(() => {
    lowerLeftRef.current = lowerLeft;
  }, [lowerLeft]);

  //円形のグラデーションのタイプを決めるステート
  const lineDirectionRef = useRef(lineDirection);

  useEffect(() => {
    lineDirectionRef.current = lineDirection;
  }, [lineDirection]);

  //図形にグラデーションをするステート
  const shapesGradationRef = useRef(shapesGradation);

  useEffect(() => {
    shapesGradationRef.current = shapesGradation;
  }, [shapesGradation]);

  //図形ツールで使用する透明度を含むカラー
  const currentAlphaColorRef = useRef(currentAlphaColor);

  useEffect(() => {
    currentAlphaColorRef.current = currentAlphaColor;
  }, [currentAlphaColor]);

  const secondAlphaColorRef = useRef(secondAlphaColor);

  useEffect(() => {
    secondAlphaColorRef.current = secondAlphaColor;
  }, [secondAlphaColor]);


  //テキスト関係
  const shapesTextRef = useRef(shapesText);
  const shapesTextLeadingRef = useRef(shapesTextLeading);
  const shapesTextFontRef = useRef(shapesTextFont);
  const shapesTextStyleRef = useRef(shapesTextStyle);
  const shapesTextAlignRef = useRef(shapesTextAlign);
  const shapesTextAlignVerticalRef = useRef(shapesTextAlignVertical);
  const shapesTextStrokeRef = useRef(shapesTextStroke);
  // const shapesTextFillRef = useRef(shapesTextFill);

  useEffect(() => {
    shapesTextRef.current = shapesText;
  }, [shapesText]);

  useEffect(() => {
    shapesTextLeadingRef.current = shapesTextLeading;
  }, [shapesTextLeading]);

  useEffect(() => {
    shapesTextFontRef.current = shapesTextFont;
  }, [shapesTextFont]);

  useEffect(() => {
    shapesTextStyleRef.current = shapesTextStyle;
  }, [shapesTextStyle]);

  useEffect(() => {
    shapesTextAlignRef.current = shapesTextAlign;
  }, [shapesTextAlign]);

  useEffect(() => {
    shapesTextAlignVerticalRef.current = shapesTextAlignVertical;
  }, [shapesTextAlignVertical]);

  useEffect(() => {
    shapesTextStrokeRef.current = shapesTextStroke;
  }, [shapesTextStroke]);


  

  //アンドゥ・リドゥ関連
  //アンドゥ・リドゥ
  const undoRef = useRef();

  useEffect(() => {
    undoRef.current = new ExtendedUndo(30);
  }, []);

  // mac用のcommand + Zをきかせるためのもの
  useEffect(() => {
    // キーダウンイベントを処理する関数
    const handleKeyDown = (event) => {
      const isMeta = event.metaKey; // Commandキー（Mac）またはWindowsキー（Windows）
      const isZ = event.key === 'z' || event.key === 'Z';
      const isShift = event.shiftKey;
      // const isC = event.key === 'c' || event.key === 'C';
      // const isV = event.key === 'v' || event.key === 'V';
  
      if (isMeta && isZ) {
        if (isShift) {
          // Command + Shift + Z (リドゥ)
          handleRedo();
        } else {
          // Command + Z (アンドゥ)
          handleUndo();
        }
        event.preventDefault(); // ブラウザのデフォルトの挙動を抑制
      } 
      // else if (isMeta && isV) {
      //   handleCopyLayerConfirm();
      //   event.preventDefault(); // ブラウザのデフォルトの挙動を抑制
      // }
    };
  
    // イベントリスナーを登録
    window.addEventListener('keydown', handleKeyDown);
  
    // コンポーネントのクリーンアップ時にイベントリスナーを削除
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  //その他
  //pcに保存
  const [shouldDraw, setShouldDraw] = useState(false);
  const shouldDrawRef = useRef(shouldDraw);

  useEffect(() => {
    shouldDrawRef.current = shouldDraw;
  }, [shouldDraw]);


  // ぼかし率と縮小ブラシサイズを計算する
  const updatetReductionDetail = (toolSizeValue) => {
    let scalingFactor = Math.round( 0 + ( 0.8 * ( toolSizeValue - 0 ) / 5 ) * 100 ) / 100;
    if (toolSizeValue <=  6) {
      setReductionRateValue(scalingFactor);
    } else {
      scalingFactor = 1;
      setReductionRateValue(scalingFactor);
    }
  };

  useEffect(() => {
    console.log('canvasサイズ', canvasSize)
  }, [canvasSize]);
  

  //「p5メインコード」
  useEffect(() => {
    const sketch = (p) => {
      //座標調整の管理
      let offsetX = 0;
      let offsetY = 0;
      let prev = { x: 0, y: 0 };
      let startX, startY;

      //「変形」処理用の管理
      let dragging = false;
      let resizing = false;
      let rotating = false;
      const handleSize = 8;
      const handleOffset = 4;
      const rotationHandleDistance = 40;
      let selectedHandle = null;
      let rotationStartAngle = 0;

      //「ペンツール」の管理
      let isBrush = false;
      let pressure = 0.5;
      let currentStrokeSize;
      let brushSize = toolSizeRef.current;
      let startHSV = false;
      //let getColor = [];
      //let currentAlpha;
      let lerpStep;
      let numPoints;
      let alphaMin;
      let widthDot;
      let heightDot;
      //let waterDensity;

      let mixToolColor = false;

      //「図形ツール」の開始点
      let shapesX, shapesY;

      //「図形ツール」の一時レイヤー
      let shapesLayer;

      //「テキストツール」の一時レイヤー
      let shapesTextLayer;

      //canvasの変形の管理
      let zoomScale = 1.0;

      //背景レイヤーのバッファを管理
      let backgroundLayer;
      

      p.setup = () => {
        canvasRef.current = p.createCanvas(canvasSize.width, canvasSize.height);
        p.smooth();

        //背景レイヤー
        backgroundLayer = p.createGraphics(p.width, p.height);
        backgroundLayer.clear();
        backgroundLayer.background(255);

        //「図形ツール」の一時レイヤー
        shapesLayer = p.createGraphics(p.width, p.height);

        //「図形ツール」の一時レイヤー
        shapesTextLayer = p.createGraphics(p.width, p.height);

        //選択範囲の表示をするレイヤー
        selectingLayerRef.current = p.createGraphics(p.width, p.height);
        selectingLayerRef.current.clear();

        //エアブラシのプレビュー
        pencilPreviewRef.current = p.createGraphics(90, 90);
        pencilPreviewRef.current.noFill();
        pencilPreviewRef.current.colorMode(p.HSB, 360, 100, 100);

        //厚塗りペンのプレビュー
        oilPenPreviewRef.current = p.createGraphics(90, 90);
        oilPenPreviewRef.current.noFill();
        oilPenPreviewRef.current.colorMode(p.HSB, 360, 100, 100);

        //「カスタムブラシ」バッファ
        //RGBペン（「ミリペン」）
        brushRef.current = p.createGraphics(brushSize / 2 * 8, brushSize / 2 * 8);
        brushRef.current.noFill();

        //HSVペン（「インクペン」「水彩ペン」「エアブラシ」「厚塗りペン」）
        brushHsvRef.current = p.createGraphics(brushSize * 8, brushSize * 8);
        brushHsvRef.current.noFill();
        brushHsvRef.current.colorMode(p.HSB, 360, 100, 100);

        //「色混ぜ」
        mixBrushRef.current = p.createGraphics(brushSize * 16, brushSize * 16);

        //mixBrushRef.current.noStroke();
        mixBrushRef.current.noFill();
        mixBrushRef.current.colorMode(p.HSB, 360, 100, 100);

        //「カスタムブラシ」の初期設定
        // ブラシのグラデーションを作成（中心を黒で、外側に向かって透明度を上げる）
        for (let r = brushSize * 2; r > 0; --r) {
          brushRef.current.stroke(0);
          brushRef.current.ellipse(brushSize * 2, brushSize * 2, r, r);
        }
        brushRef.current.filter(p.BLUR, 1);

        for (let r = brushSize * 2; r > 0; --r) {
          brushHsvRef.current.stroke(0);
          brushHsvRef.current.ellipse(brushSize * 4, brushSize * 4, r, r);
        }
        brushHsvRef.current.filter(p.BLUR, 1);

        for (let r = brushSize * 2; r > 0; --r) {
          //mixBrushRef.current.fill(0);
          mixBrushRef.current.stroke(0);
          mixBrushRef.current.ellipse(brushSize * 4, brushSize * 4, r, r);
        }
        mixBrushRef.current.filter(p.BLUR, 1);

        //メインレイヤー
        // if (!canvasSaveData || canvasSaveData === '') {
        // layerRefs.current = layerRefs.current.map(() => p.createGraphics(p.width, p.height));

        // // 初期状態のキャプチャ
        // undoRef.current.capture(layerRefs.current);
        // console.log(layerRefs.current);
        // } else {
        //   // 再描画の場合
        //   const layersData = JSON.parse(canvasSaveData);
        //   layerRefs.current = layersData.map((layerData, index) => {
        //     const graphics = p.createGraphics(p.width, p.height);
        //     if (layerData.content && layerData.isVisible) {
        //       p.loadImage(layerData.content, img => {
        //         graphics.image(img, 0, 0, p.width, p.height);
        //         graphics.noTint();
        //       });
        //     }
        //     return graphics;
        //   });
        // }

        //メインレイヤー（再描画時はcanvasDataかcanvasSaveDataから描画される）
        if (!canvasSaveData || canvasSaveData === '') {
          // canvasSaveDataがない場合、新規レイヤーを作成し、canvasDataから描画
          layerRefs.current = layerRefs.current.map(() => p.createGraphics(p.width, p.height));
      
          if (canvasData) {
            // canvasDataが存在する場合、それをレイヤー1にロードして描画
            p.loadImage(canvasData, img => {
              layerRefs.current[0].image(img, 0, 0, p.width, p.height);
            });
          }
      
          // 初期状態のキャプチャ
          undoRef.current.capture(layerRefs.current);
          console.log("Initialized new layers with canvasData", layerRefs.current);
        } else {
          // 再描画の場合、保存されたレイヤーデータを復元
          const layersData = JSON.parse(canvasSaveData);
          layerRefs.current = layersData.map((layerData, index) => {
            const graphics = p.createGraphics(p.width, p.height);
            if (layerData.content && layerData.isVisible) {
              p.loadImage(layerData.content, img => {
                graphics.image(img, 0, 0, p.width, p.height);
                graphics.noTint();
              });
            }
            return graphics;
          });
        }
      

        // タッチ操作の場合、デフォルトのスクロールやズームを無効化
        canvasRef.current.touchStarted((event) => {
          if (event.cancelable) {
            event.preventDefault();
          }
        });
      };

      p.draw = () => {
        const object = objectRef.current;
        p.noTint();
        p.clear();

        //背景レイヤーの表示
        if (backgroundLayerVisibleRef.current) {
          p.image(backgroundLayer, 0, 0);
        }

        let hasSelectedAreaBeenDrawn = false;
        layerRefs.current.forEach((layerRef, index) => {
          if (isVisibleRef.current[index]) {
            const alphaValue = alphasRef.current[index];
            const blendModeValue = blendModeRef.current[index];
            p.blendMode(p[blendModeValue]);
            p.tint(255, alphaValue);
            p.image(layerRef, 0, 0);
            p.image(shapesLayer, 0, 0);
            p.image(shapesTextLayer, 0, 0);
            p.blendMode(p.BLEND);
          }
          // 選択されたレイヤーの直後に一時バッファを描画
          if (index === selectLayerRef.current - 1 && selectedAreaRef.current && !hasSelectedAreaBeenDrawn) {
            if (selectedAreaShowRef.current) {
              if (isTransformingActiveRef.current) {
                const selectedAreaAlphaValue = alphasRef.current[selectLayerRef.current - 1];
                const selectedAreaBlendModeValue = blendModeRef.current[selectLayerRef.current - 1];
                p.push();
                p.translate(object.x + object.width / 2, object.y + object.height / 2);
                p.rotate(object.angle);
                p.blendMode(p[selectedAreaBlendModeValue]);
                p.tint(255, selectedAreaAlphaValue);
                p.image(selectedAreaRef.current, -object.width / 2, -object.height / 2, object.width, object.height);
                p.blendMode(p.BLEND);
                p.pop();

                //変形ハンドルの呼び出し
                drawResizeHandles();
                drawRotationHandle();
                hasSelectedAreaBeenDrawn = true;
              }
            }
          }
        });
        // 選択レイヤーが最後で、まだ一時バッファが描画されていない場合
        if (!hasSelectedAreaBeenDrawn && selectedAreaRef.current) {
          if (selectedAreaShowRef.current) {
            if (isTransformingActiveRef.current) {
              p.push();
              p.translate(object.x + object.width / 2, object.y + object.height / 2);
              p.rotate(object.angle);
              p.image(selectedAreaRef.current, -object.width / 2, -object.height / 2, object.width, object.height);
              p.pop();
              drawResizeHandles();
              drawRotationHandle();
            }
          }
        }

        //「選択範囲」の表示（選択ツール）
        if (toolModeRef.current === 'selectMode' && !isImageInsertionActiveRef.current && selectingLayerRef.current) {
          p.image(selectingLayerRef.current, 0, 0);
        }
        p.noTint();
      };

      //「カスタムブラシ」バッファのサイズ変更
      p.updateBrush = (newToolSize) => {
        brushSize = newToolSize / 2;
        brushRef.current = p.createGraphics(brushSize * 8, brushSize * 8);
        brushRef.current.noFill();

        brushHsvRef.current = p.createGraphics(brushSize * 8, brushSize * 8);
        brushHsvRef.current.noFill();
        brushHsvRef.current.colorMode(p.HSB, 360, 100, 100);
  
        mixBrushRef.current = p.createGraphics(brushSize * 16, brushSize * 16);
        //mixBrushRef.current.noStroke();
        mixBrushRef.current.noFill();
        mixBrushRef.current.colorMode(p.HSB, 360, 100, 100);
      };



      //「変形機能」関係
      //変形ハンドル（回転）
      const drawRotationHandle = () => {
        const object = objectRef.current;
        if (rotating) {
          p.fill(0, 232, 255);
        } else {
          p.fill(255, 255, 255);
        }
        p.stroke(0);
        p.strokeWeight(1);
        
        p.push();
        p.translate(object.x + object.width / 2, object.y + object.height / 2);
        p.rotate(object.angle);
        p.circle(0, -object.height / 2 - rotationHandleDistance, 10);
        p.pop();
      };

      //変形ハンドル（リサイズ）
      const drawResizeHandles = () => {
        const object = objectRef.current;
        // 辺の中間地点のハンドル情報を追加
        const edges = [
          { x: object.x + object.width / 2 - handleSize / 2, y: object.y - handleOffset, handle: 'top-middle' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y + object.height / 2 - handleSize / 2, handle: 'right-middle' },
          { x: object.x + object.width / 2 - handleSize / 2, y: object.y + object.height + handleOffset - handleSize, handle: 'bottom-middle' },
          { x: object.x - handleOffset, y: object.y + object.height / 2 - handleSize / 2, handle: 'left-middle' },
        ];

        const corners = [
          { x: object.x - handleOffset, y: object.y - handleOffset, handle: 'left-top' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y - handleOffset, handle: 'right-top' },
          { x: object.x - handleOffset, y: object.y + object.height + handleOffset - handleSize, handle: 'left-bottom' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y + object.height + handleOffset - handleSize, handle: 'right-bottom' },
        ];

        const handles = corners.concat(edges);
        drawResizeArea(handles);
      
        handles.forEach(handle => {
          // マウスがハンドル上にあるか判定し、選択状態に応じて色を変更
          if (selectedHandle === handle.handle && resizing) {
            p.fill(0, 232, 255); // 選択状態のハンドルは青色
          } else {
            p.fill(255, 255, 255); // 非選択状態のハンドルは白色
          }
          p.stroke(0); // 枠線の色を黒に設定
          p.strokeWeight(1); // 枠線の太さを1pxに設定
          p.square(handle.x, handle.y, handleSize);
        });
      };

      // 範囲を明示的に示す（点線または連続した線）
      function drawResizeArea(handles) {
        p.noFill();
        p.stroke(0);
        p.strokeWeight(1);

        // オブジェクトの幅と高さを計算
        const minWidth = Math.min(...handles.map(handle => handle.x)) + handleSize / 2;
        const maxWidth = Math.max(...handles.map(handle => handle.x)) + handleSize / 2;
        const minHeight = Math.min(...handles.map(handle => handle.y)) + handleSize / 2;
        const maxHeight = Math.max(...handles.map(handle => handle.y)) + handleSize / 2;
        const objectWidth = maxWidth - minWidth;
        const objectHeight = maxHeight - minHeight;

        // サイズの閾値
        const sizeThreshold = 60; // この値は調整可能

        // 点線のパラメータ
        const dashLength = 3;
        const spaceLength = 2;

        // ハンドルを結ぶ順を指定
        const order = ['left-top', 'top-middle', 'right-top', 'right-middle', 'right-bottom', 'bottom-middle', 'left-bottom', 'left-middle'];
        for (let i = 0; i < order.length; i++) {
          const startKey = order[i];
          const endKey = order[(i + 1) % order.length];
          const startHandle = handles.find(h => h.handle === startKey);
          const endHandle = handles.find(h => h.handle === endKey);
          
          if (startHandle && endHandle) {
            // オブジェクトのサイズが閾値以下の場合は連続した線を描画
            if (objectWidth <= sizeThreshold || objectHeight <= sizeThreshold) {
              p.line(startHandle.x + handleSize / 2, startHandle.y + handleSize / 2, endHandle.x + handleSize / 2, endHandle.y + handleSize / 2);
            } else {
              drawDashedLine(startHandle.x + handleSize / 2, startHandle.y + handleSize / 2, endHandle.x + handleSize / 2, endHandle.y + handleSize / 2, dashLength, spaceLength);
            }
          }
        }
      }

      function drawDashedLine(x1, y1, x2, y2, dashLength, spaceLength) {
        const distance = p.dist(x1, y1, x2, y2);
        const dashCount = distance / (dashLength + spaceLength);
        const deltaX = (x2 - x1) / dashCount;
        const deltaY = (y2 - y1) / dashCount;
      
        for (let i = 0; i < dashCount; i++) {
          const startX = x1 + (deltaX * i) + (deltaX / dashCount) * spaceLength;
          const startY = y1 + (deltaY * i) + (deltaY / dashCount) * spaceLength;
          const endX = startX + (deltaX / dashCount) * dashLength;
          const endY = startY + (deltaY / dashCount) * dashLength;
          p.line(startX, startY, endX, endY);
        }
      }

      const overHandle = () => {
        const object = objectRef.current;
        // corners配列をhandles配列に統合
        const edges = [
          { x: object.x + object.width / 2 - handleSize / 2, y: object.y - handleOffset, handle: 'top-middle' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y + object.height / 2 - handleSize / 2, handle: 'right-middle' },
          { x: object.x + object.width / 2 - handleSize / 2, y: object.y + object.height + handleOffset - handleSize, handle: 'bottom-middle' },
          { x: object.x - handleOffset, y: object.y + object.height / 2 - handleSize / 2, handle: 'left-middle' },
        ];

        const corners = [
          { x: object.x - handleOffset, y: object.y - handleOffset, handle: 'left-top' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y - handleOffset, handle: 'right-top' },
          { x: object.x - handleOffset, y: object.y + object.height + handleOffset - handleSize, handle: 'left-bottom' },
          { x: object.x + object.width + handleOffset - handleSize, y: object.y + object.height + handleOffset - handleSize, handle: 'right-bottom' },
        ];

        const handles = corners.concat(edges);

        for (let handle of handles) {
          if (
            p.mouseX / zoomScale >= handle.x && p.mouseX / zoomScale <= handle.x + handleSize &&
            p.mouseY / zoomScale >= handle.y && p.mouseY / zoomScale <= handle.y + handleSize
          ) {
            selectedHandle = handle.handle;
            return true;
          }
        }
        selectedHandle = null;
        return false;
      };
      
      const overRotationHandle = () => {
        const object = objectRef.current;
        // 回転ハンドルの位置を計算し、マウスがその上にあるかどうかを判定
        const handleX = object.x + object.width / 2 + Math.cos(object.angle) * (0) - Math.sin(object.angle) * (-object.height / 2 - rotationHandleDistance);
        const handleY = object.y + object.height / 2 + Math.sin(object.angle) * (0) + Math.cos(object.angle) * (-object.height / 2 - rotationHandleDistance);
        return p.dist(p.mouseX / zoomScale, p.mouseY / zoomScale, handleX, handleY) < handleSize;
      };


      //フォントのスタイル「NORMAL」「ITALIC」「BOLD」「BOLDITALIC」
      const textStyleMapping = {
        "NORMAL": p.NORMAL,
        "ITALIC": p.ITALIC,
        "BOLD": p.BOLD,
        "BOLDITALIC": p.BOLDITALIC
      };

      //水平方向のテキストの揃え位置「RIGHT」「CENTER」「LEFT」
      const textAlignMapping = {
        "RIGHT": p.RIGHT,
        "CENTER": p.CENTER,
        "LEFT": p.LEFT
      };


      //垂直方向のテキストの揃え位置「TOP」「CENTER」「BASELINE」「BOTTOM」（現状必要ない）
      // const textAlignVerticalMapping = {
      //   "TOP": p.TOP,
      //   "CENTER": p.CENTER,
      //   "BASELINE": p.BASELINE,
      //   "BOTTOM": p.BOTTOM
      // };


      //p5マウス関数
      //マウスタッチ開始時
      p.mousePressed = () => {
          const object = objectRef.current;
        
          //再描画時に最初の描画を記録
          if (!undoRef.current.hasCapturedInitial) {
            undoRef.current.capture(layerRefs.current);
            undoRef.current.hasCapturedInitial = true;
          }

          if (!startHSV) {
            if (p5DrawingEnabledRef.current) {
              const layerIndex = selectLayerRef.current - 1;

              if (isVisibleRef.current[layerIndex]) {
                // マウスの位置がcanvasの範囲内にあるかチェック
                if (p.mouseX / zoomScale >= 0 && p.mouseX / zoomScale <= p.width && p.mouseY / zoomScale >= 0 && p.mouseY / zoomScale <= p.height) {

                
                if (mouseModes.has(toolModeRef.current)) {
                  //「p.mouse」で発火するペンの処理
                  isBrush = true;
                } else if (toolModeRef.current === 'selectMode' && !isImageInsertionActiveRef.current) {
                  //選択ツール
                  //選択モードが有効な場合、選択開始点を記録し、他の処理をスキップ
                  startX = p.mouseX / zoomScale;
                  startY = p.mouseY / zoomScale;
                  isBrush = true;
                  selectingLayerRef.current.clear();
                } else if (toolModeRef.current === 'dropperTool') {
                  let c = p.get(p.mouseX / zoomScale, p.mouseY / zoomScale);
                  //スポイト
                  // RGBA形式の色情報をiro.jsのカラーピッカーにセット
                  const colorString = `rgba(${c[0]},${c[1]},${c[2]},${c[3] / 255})`;
                  setCurrentColor(colorString);
                } else if (shapesTool.has(toolModeRef.current)) {
                  shapesX = p.mouseX / zoomScale;
                  shapesY = p.mouseY / zoomScale;
                  isBrush = true;
                }
                prev.x = p.mouseX / zoomScale;
                prev.y = p.mouseY / zoomScale;
              }
            
              //「変形処理」
              if (isTransformingActiveRef.current) {
                if (overRotationHandle()) {
                  rotating = true;
                  rotationStartAngle = Math.atan2(p.mouseY / zoomScale - (object.y + object.height / 2), p.mouseX / zoomScale - (object.x + object.width / 2)) - object.angle;
                } else if (overHandle()) {
                  resizing = true;
                } else if (p.mouseX / zoomScale > object.x && p.mouseX / zoomScale < object.x + object.width && p.mouseY / zoomScale > object.y && p.mouseY / zoomScale < object.y + object.height) {
                  dragging = true;
                  offsetX = p.mouseX / zoomScale - object.x;
                  offsetY = p.mouseY / zoomScale - object.y;
                }
              }
            } else {
              //アラートの表示
              handleAlertLayerMessage();
            }
          }
        }
      };

      //マウスドラッグ時
      p.mouseDragged = () => {
        if (!startHSV) {
          const object = objectRef.current;
          if (p5DrawingEnabledRef.current) {
            const layerIndex = selectLayerRef.current - 1;

            // if (isVisibleRef.current[layerIndex]) {
              const layer = layerRefs.current[layerIndex];

              //「ペンツール」
              if (isBrush) {
                if (mouseModes.has(toolModeRef.current)) {
                  if (toolModeRef.current === 'betaPen') {
                    //ベタ塗りペン
                    layer.stroke(currentColorRef.current);
                    layer.strokeWeight(toolSizeRef.current);
                    layer.line(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);
                    prev.x = p.mouseX / zoomScale;
                    prev.y = p.mouseY / zoomScale;
                    return;
                  } else if (toolModeRef.current === 'eraseTool') {
                    //消しゴム
                    layer.erase();
                    layer.strokeWeight(toolSizeRef.current);
                    layer.line(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);
                    prev.x = p.mouseX / zoomScale;
                    prev.y = p.mouseY / zoomScale;
                    return;
                  } else if (toolModeRef.current === 'mmPen') {
                    //ミリペン
                    brushRef.current.clear();
                    let scalingFactor = reductionRateValueRef.current;
      
                    brushRef.current.stroke(currentColorRef.current);
                    for (let r = brushSize * 2; r > 0; --r) {
                      brushRef.current.ellipse(brushSize * 4, brushSize * 4, r, r);
                    }
                    
                    if (mmBlurRef.current) {
                      const blurValue = 1;
                      brushRef.current.filter(p.BLUR, blurValue);
                    }
                    let waterDensity = mmDensityValueRef.current;
                    let steps = p.dist(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);

                    let scaledWidth = brushRef.current.width * scalingFactor;
                    let scaledHeight = brushRef.current.height * scalingFactor;
                    for (let i = 0; i < steps; i += brushSize / waterDensity) {
                      let x = p.lerp(prev.x, p.mouseX / zoomScale, i / steps);
                      let y = p.lerp(prev.y, p.mouseY / zoomScale, i / steps);
                      layer.image(brushRef.current, x - brushSize * 4 * scalingFactor, y - brushSize * 4 * scalingFactor, scaledWidth, scaledHeight);
                      //layer.image(brushRef.current, x - brushSize * 2, y - brushSize * 2);
                    }
                    prev.x = p.mouseX / zoomScale;
                    prev.y = p.mouseY / zoomScale;
                    return;
                  }
                  
                  // prev.x = p.mouseX / zoomScale;
                  // prev.y = p.mouseY / zoomScale;
                } else if (toolModeRef.current === 'selectMode' && !isImageInsertionActiveRef.current) {
                  //「選択範囲」
                  selectingLayerRef.current.clear();
                  selectingLayerRef.current.noFill();
                  selectingLayerRef.current.stroke(0, 255, 0);
                  selectingLayerRef.current.strokeWeight(1);
                  selectingLayerRef.current.rect(startX, startY, p.mouseX / zoomScale - startX, p.mouseY / zoomScale - startY);
                } else if (shapesTool.has(toolModeRef.current) && !shapesInstallationRef.current) {
                  //「図形ツール（描画モード）」
                  if (toolModeRef.current === 'rectTool') {
                    shapesLayer.clear();
      
                    if (shapesFillChangeRef.current === 'nostroke') {
                      shapesLayer.noStroke();
                      shapesLayer.fill(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'nofill') {
                      shapesLayer.noFill();
                      shapesLayer.stroke(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'allpaint') {
                      shapesLayer.fill(currentAlphaColorRef.current);
                      shapesLayer.stroke(secondAlphaColorRef.current);
                    }
      
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    const width = p.mouseX / zoomScale - shapesX;
                    const height = p.mouseY / zoomScale - shapesY;
                    
                    shapesLayer.strokeWeight(toolSizeRef.current);

                    // 幅と高さを常に正の値に
                    const rectWidth = Math.abs(width);
                    const rectHeight = Math.abs(height);
                    
                    // 図形の左上の角を計算
                    const rectX = width > 0 ? shapesX : p.mouseX / zoomScale;
                    const rectY = height > 0 ? shapesY : p.mouseY / zoomScale;
                    
                    if (p.keyIsDown(p.SHIFT)) {
                      const size = Math.min(rectWidth, rectHeight);
                      if (cornerChangeRef.current) {
                        shapesLayer.rect(rectX, rectY, size, size, upperLeftRef.current, upperRightRef.current, lowerRightRef.current, lowerLeftRef.current);
                      } else {
                        shapesLayer.rect(rectX, rectY, size, size);
                      }
                    } else {
                      if (cornerChangeRef.current) {
                        shapesLayer.rect(rectX, rectY, rectWidth, rectHeight, upperLeftRef.current, upperRightRef.current, lowerRightRef.current, lowerLeftRef.current);
                      } else {
                        shapesLayer.rect(rectX, rectY, rectWidth, rectHeight);
                      }
                    }
                    
                    return;
      
                  } else if (toolModeRef.current === 'circleTool') {
                    shapesLayer.clear();
      
                    if (shapesFillChangeRef.current === 'nostroke') {
                      shapesLayer.noStroke();
                      shapesLayer.fill(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'nofill') {
                      shapesLayer.noFill();
                      shapesLayer.stroke(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'allpaint') {
                      shapesLayer.fill(currentAlphaColorRef.current);
                      shapesLayer.stroke(secondAlphaColorRef.current);
                    }
      
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    const dx = p.mouseX / zoomScale - shapesX;
                    const dy = p.mouseY / zoomScale - shapesY;
                    const diameterX = Math.abs(dx) * 2;
                    const diameterY = Math.abs(dy) * 2;
                    if (p.keyIsDown(p.SHIFT)) {
                      // Shiftが押されている場合、正円を描画
                      const diameter = Math.min(diameterX, diameterY);
                      shapesLayer.circle(shapesX, shapesY, diameter);
                    } else {
                      // Shiftが押されていない場合、自由な楕円を描画
                      shapesLayer.ellipse(shapesX, shapesY, diameterX, diameterY);
                    }
                    return;
      
                  } else if (toolModeRef.current === 'triangleTool') {
                    shapesLayer.clear();
      
                    if (shapesFillChangeRef.current === 'nostroke') {
                      shapesLayer.noStroke();
                      shapesLayer.fill(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'nofill') {
                      shapesLayer.noFill();
                      shapesLayer.stroke(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'allpaint') {
                      shapesLayer.fill(currentAlphaColorRef.current);
                      shapesLayer.stroke(secondAlphaColorRef.current);
                    }
      
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    const endX = p.mouseX / zoomScale;
                    const endY = p.mouseY / zoomScale;
                    const centerX = (shapesX + endX) / 2; // 底辺の中心点
                    if (p.keyIsDown(p.SHIFT)) {
                      // Shiftが押されている場合、正三角形を描画
                      const height = Math.abs(endX - shapesX) * Math.sqrt(3) / 2; // 正三角形の高さ
                      shapesLayer.triangle(shapesX, endY, endX, endY, centerX, endY - height);
                    } else {
                      // Shiftが押されていない場合、自由な形の三角形を描画
                      shapesLayer.triangle(shapesX, shapesY, endX, endY, centerX, shapesY - Math.abs(endX - shapesX) / 2);
                    }
                    return;
      
                  } else if (toolModeRef.current === 'lineTool') {
                    shapesLayer.clear();
                    shapesLayer.stroke(currentAlphaColorRef.current);
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    if (p.keyIsDown(p.SHIFT)) {
                      // 垂直または水平に近い方向に直線を修正
                      const dx = Math.abs(p.mouseX / zoomScale - shapesX);
                      const dy = Math.abs(p.mouseY / zoomScale - shapesY);

                      // const dx = Math.abs(p.mouseX - shapesX);
                      // const dy = Math.abs(p.mouseY - shapesY);
                      if (dx > dy) {
                        // 水平方向が優勢な場合
                        p.mouseY = shapesY * zoomScale; // y座標を開始点に合わせる
                      } else {
                        // 垂直方向が優勢または等しい場合
                        p.mouseX = shapesX * zoomScale; // x座標を開始点に合わせる
                      }
                    }
                    shapesLayer.line(shapesX, shapesY, p.mouseX / zoomScale, p.mouseY / zoomScale);
                    //shapesLayer.line(shapesX, shapesY, p.mouseX, p.mouseY);
                  }
                } else if (shapesTool.has(toolModeRef.current) && shapesInstallationRef.current) {
                  //「図形ツール（配置モード）」
                  if (toolModeRef.current === 'rectTool') {
                    shapesLayer.clear();
            
                    if (shapesGradationRef.current) {
                      const from = shapesLayer.color(currentAlphaColorRef.current);
                      const to = shapesLayer.color(secondAlphaColorRef.current);
                      // グラデーションを描画（縦方向）
                      for (let i = 0; i <= shapesHeightSizeRef.current; i++) {
                        let inter = shapesLayer.lerpColor(from, to, i / shapesHeightSizeRef.current);
                        shapesLayer.stroke(inter);
                        // グラデーションの開始位置と終了位置をマウスのX座標に基づいて計算
                        const startX = p.mouseX / zoomScale - shapesWidthSizeRef.current / 2;
                        const endX = p.mouseX / zoomScale + shapesWidthSizeRef.current / 2;
                        // Y座標もマウスに基づいて調整
                        const startY = p.mouseY / zoomScale - shapesHeightSizeRef.current / 2 + i;
                        const endY = startY; // 水平線なのでY座標は変わらない
                        // グラデーションを描画
                        shapesLayer.line(startX, startY, endX, endY);
                      }
                    } else {
                      if (shapesFillChangeRef.current === 'nostroke') {
                        shapesLayer.noStroke();
                        shapesLayer.fill(currentAlphaColorRef.current);
        
                      } else if (shapesFillChangeRef.current === 'nofill') {
                        shapesLayer.noFill();
                        shapesLayer.stroke(currentAlphaColorRef.current);
        
                      } else if (shapesFillChangeRef.current === 'allpaint') {
                        shapesLayer.fill(currentAlphaColorRef.current);
                        shapesLayer.stroke(secondAlphaColorRef.current);
                      }

                      shapesLayer.strokeWeight(toolSizeRef.current);
                      if (cornerChangeRef.current) {
                        shapesLayer.rect(p.mouseX / zoomScale, p.mouseY / zoomScale, shapesWidthSizeRef.current, shapesHeightSizeRef.current, upperLeftRef.current, upperRightRef.current, lowerRightRef.current, lowerLeftRef.current);
                      } else {
                        shapesLayer.rect(p.mouseX / zoomScale, p.mouseY / zoomScale, shapesWidthSizeRef.current, shapesHeightSizeRef.current);
                      }
                    }
                    return;
                  } else if (toolModeRef.current === 'circleTool') {
                    shapesLayer.clear();
            
                    if (shapesGradationRef.current) {
                      if (lineDirectionRef.current) {
                        shapesLayer.loadPixels();
                        for (let x = 0; x < shapesLayer.width; x++) {
                          for (let y = 0; y < shapesLayer.height; y++) {
                            // 楕円形の領域を計算（マウスの位置に基づく）
                            let dx = (x - (p.mouseX / zoomScale)) / (shapesWidthSizeRef.current / 2);
                            let dy = (y - (p.mouseY / zoomScale)) / (shapesHeightSizeRef.current / 2);
                            if (dx * dx + dy * dy <= 1) {
                              // グラデーションの計算（縦方向）
                              let inter = p.map(y, (p.mouseY / zoomScale) - (shapesHeightSizeRef.current / 2), (p.mouseY / zoomScale) + (shapesHeightSizeRef.current / 2), 0, 1);
                              let c = p.lerpColor(p.color(currentAlphaColorRef.current), p.color(secondAlphaColorRef.current), inter);
                              shapesLayer.set(x, y, c);
                            }
                          }
                        }
                        shapesLayer.updatePixels();
                        
                      } else {
                        const from = p.color(currentAlphaColorRef.current);
                        const to = p.color(secondAlphaColorRef.current);
                        
                        p.radGrad(shapesLayer, p.mouseX / zoomScale, p.mouseY / zoomScale, shapesWidthSizeRef.current, shapesHeightSizeRef.current, from, to);
                        
                      }
                    } else {
                      if (shapesFillChangeRef.current === 'nostroke') {
                        shapesLayer.noStroke();
                        shapesLayer.fill(currentAlphaColorRef.current);
        
                      } else if (shapesFillChangeRef.current === 'nofill') {
                        shapesLayer.noFill();
                        shapesLayer.stroke(currentAlphaColorRef.current);
        
                      } else if (shapesFillChangeRef.current === 'allpaint') {
                        shapesLayer.fill(currentAlphaColorRef.current);
                        shapesLayer.stroke(secondAlphaColorRef.current);
                      }
                      shapesLayer.strokeWeight(toolSizeRef.current);
                      shapesLayer.ellipse(p.mouseX / zoomScale, p.mouseY / zoomScale, shapesWidthSizeRef.current, shapesHeightSizeRef.current);
                    }

                    return;
      
                  } else if (toolModeRef.current === 'triangleTool') {
                    shapesLayer.clear();
          
                    if (shapesFillChangeRef.current === 'nostroke') {
                      shapesLayer.noStroke();
                      shapesLayer.fill(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'nofill') {
                      shapesLayer.noFill();
                      shapesLayer.stroke(currentAlphaColorRef.current);
      
                    } else if (shapesFillChangeRef.current === 'allpaint') {
                      shapesLayer.fill(currentAlphaColorRef.current);
                      shapesLayer.stroke(secondAlphaColorRef.current);
                    }
                    let x1 = p.mouseX / zoomScale;
                    let y1 = p.mouseY / zoomScale;
                    let x2 = x1 + shapesWidthSizeRef.current; // 基点から横幅分右に移動
                    let y2 = y1;
                    let x3 = x1 + shapesWidthSizeRef.current / 2; // 基点から横幅の半分右に移動
                    let y3 = y1 - shapesHeightSizeRef.current; // 基点から高さ分下に移動
                    
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    shapesLayer.triangle(x1, y1, x2, y2, x3, y3);
                    return;
      
                  } else if (toolModeRef.current === 'lineTool') {
                    shapesLayer.clear();
                    shapesLayer.stroke(currentAlphaColorRef.current);
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    shapesLayer.line(p.mouseX / zoomScale, p.mouseY / zoomScale, p.mouseX / zoomScale, p.mouseY / zoomScale - shapesHeightSizeRef.current);
                    shapesLayer.strokeWeight(toolSizeRef.current);
                    return;
                  }  else if (toolModeRef.current === 'textTool') {
                    shapesTextLayer.clear();

                    shapesTextLayer.textSize(toolSizeRef.current);
                    shapesTextLayer.textAlign(textAlignMapping[shapesTextAlignRef.current]);
                    shapesTextLayer.textStyle(textStyleMapping[shapesTextStyleRef.current]);
                    shapesTextLayer.textFont(shapesTextFontRef.current);
                    shapesTextLayer.textLeading(shapesTextLeadingRef.current);
                    

                    if (shapesFillChangeRef.current === 'nostroke') {
                      shapesTextLayer.noStroke();
                      shapesTextLayer.fill(currentAlphaColorRef.current);
                      
                    } else if (shapesFillChangeRef.current === 'nofill') {
                      shapesTextLayer.noFill();
                      shapesTextLayer.stroke(currentAlphaColorRef.current);
                      
                    } else if (shapesFillChangeRef.current === 'allpaint') {
                      shapesTextLayer.fill(currentAlphaColorRef.current);
                      shapesTextLayer.stroke(secondAlphaColorRef.current);
                    }
                  
                    shapesTextLayer.strokeWeight(shapesTextStrokeRef.current);
                    shapesTextLayer.text(shapesTextRef.current, p.mouseX / zoomScale, p.mouseY / zoomScale);
                    
                    return;
                  }
                }
                return;
              }

              //「変形処理」
              if (resizing) {
                let newWidth = object.width, newHeight = object.height;
                let newX = object.x, newY = object.y;
                const aspectRatio = object.width / object.height;
            
                if (p.keyIsDown(p.SHIFT) && !['top-middle', 'right-middle', 'bottom-middle', 'left-middle'].includes(selectedHandle)) {
                  // SHIFTキーが押されている時のリサイズロジック
                  let widthChange, heightChange;
            
                  switch (selectedHandle) {
                    case 'left-top':
                      widthChange = object.x - p.mouseX / zoomScale;
                      heightChange = object.y - p.mouseY / zoomScale;
                      newWidth = object.width + widthChange;
                      newHeight = object.height + heightChange;
                      newX = p.mouseX / zoomScale;
                      newY = p.mouseY / zoomScale;
                      break;
                    case 'right-top':
                      widthChange = p.mouseX / zoomScale - (object.x + object.width);
                      heightChange = object.y - p.mouseY / zoomScale;
                      newWidth = object.width + widthChange;
                      newHeight = object.height + heightChange;
                      newY = p.mouseY / zoomScale;
                      break;
                    case 'left-bottom':
                      widthChange = object.x - p.mouseX / zoomScale;
                      heightChange = p.mouseY / zoomScale - (object.y + object.height);
                      newWidth = object.width + widthChange;
                      newHeight = object.height + heightChange;
                      newX = p.mouseX / zoomScale;
                      break;
                    case 'right-bottom':
                      widthChange = p.mouseX / zoomScale - (object.x + object.width);
                      heightChange = p.mouseY / zoomScale - (object.y + object.height);
                      newWidth = object.width + widthChange;
                      newHeight = object.height + heightChange;
                      break;
                  }

                  // 比率を保持してリサイズ
                  if (Math.abs(widthChange) < Math.abs(heightChange)) {
                    newWidth = object.width + widthChange;
                    newHeight = newWidth / aspectRatio;
                  } else {
                    newHeight = object.height + heightChange;
                    newWidth = newHeight * aspectRatio;
                  }

                  // 新しいサイズに基づいて位置も調整
                  switch (selectedHandle) {
                    case 'left-top':
                    case 'left-bottom':
                      newX = object.x + object.width - newWidth;
                      newY = object.y + object.height - newHeight;
                      break;
                    case 'right-top':
                    case 'right-bottom':
                      newX = object.x;
                      newY = object.y;
                      break;
                  }
                } else {
                // 通常のリサイズロジック
                switch (selectedHandle) {
                  case 'left-top':
                    newWidth = object.width + (object.x - p.mouseX / zoomScale);
                    newHeight = object.height + (object.y - p.mouseY / zoomScale);
                    newX = p.mouseX / zoomScale;
                    newY = p.mouseY / zoomScale;
                    break;
                  case 'right-top':
                    newWidth = p.mouseX / zoomScale - object.x;
                    newHeight = object.height + (object.y - p.mouseY / zoomScale);
                    newX = object.x;
                    newY = p.mouseY / zoomScale;
                    break;
                  case 'left-bottom':
                    newWidth = object.width + (object.x - p.mouseX / zoomScale);
                    newHeight = p.mouseY / zoomScale - object.y;
                    newX = p.mouseX / zoomScale;
                    newY = object.y;
                    break;
                  case 'right-bottom':
                    newWidth = p.mouseX / zoomScale - object.x;
                    newHeight = p.mouseY / zoomScale - object.y;
                    newX = object.x;
                    newY = object.y;
                    break;

                  case 'top-middle':
                    let deltaY = p.mouseY / zoomScale - object.y;
                    newHeight = object.height - deltaY;
                    if (newHeight > 20) {
                      newY = p.mouseY / zoomScale;
                    } else {
                      newHeight = 20;
                    }
                    break;
            
                  case 'right-middle':
                    newWidth = p.mouseX / zoomScale - object.x;
                    if (newWidth < 20) {
                      newWidth = 20;
                    }
                    break;
            
                  case 'bottom-middle':
                    newHeight = p.mouseY / zoomScale - object.y;
                    if (newHeight < 20) {
                      newHeight = 20;
                    }
                    break;
            
                  case 'left-middle':
                    let deltaX = p.mouseX / zoomScale - object.x;
                    newWidth = object.width - deltaX;
                    if (newWidth > 20) {
                      newX = p.mouseX / zoomScale;
                    } else {
                      newWidth = 20;
                    }
                    break;
                  }
                }

                // 新しい幅や高さが最小サイズを下回らないように調整
                newWidth = Math.max(newWidth, 20);
                newHeight = Math.max(newHeight, 20);

                // 最終的なサイズと位置をオブジェクトに適用
                object.width = newWidth;
                object.height = newHeight;
                object.x = newX;
                object.y = newY;
              } else if (dragging) {
                // ドラッグ操作による図形の移動
                object.x = p.mouseX / zoomScale - offsetX;
                object.y = p.mouseY / zoomScale - offsetY;
              } else if (rotating) {
                const currentAngle = Math.atan2(p.mouseY / zoomScale - (object.y + object.height / 2), p.mouseX / zoomScale - (object.x + object.width / 2));
                let angle = currentAngle - rotationStartAngle;
              
                if (p.keyIsDown(p.SHIFT)) {
                  // 角度を度に変換
                  let angleDeg = angle * (180 / Math.PI);
                  // 90度区切りに丸める
                  angleDeg = Math.round(angleDeg / 90) * 90;
                  // ラジアンに戻す
                  angle = angleDeg * (Math.PI / 180);
                }
              
                object.angle = angle;
              }
            // } else {
            //   //アラートの表示
            //   handleAlertLayerMessage();
            // }
          }
        }
      }

      //マウス操作終了時
      p.mouseReleased = () => {
        if (!startHSV) {
          dragging = false;
          resizing = false;
          rotating = false;
          const layerIndex = selectLayerRef.current - 1;
          const layer = layerRefs.current[layerIndex];

          if (isVisibleRef.current[layerIndex]) {
            if (isBrush) {
              if (mouseModes.has(toolModeRef.current)) {

                if (isBrush) {
                  undoRef.current.capture(layerRefs.current);
                }
                isBrush = false;

                if (toolModeRef.current === 'eraseTool') {
                  layer.noErase();
                }
                return;
              }

              if (shapesTool.has(toolModeRef.current)) {
                // const layerIndex = selectLayerRef.current - 1;
                // const layer = layerRefs.current[layerIndex];

                if (toolModeRef.current !== 'textTool') {
                  layer.image(shapesLayer, 0, 0);
                  shapesLayer.clear();
                } else {
                  layer.image(shapesTextLayer, 0, 0);
                  shapesTextLayer.clear();
                }
                if (isBrush) {
                  undoRef.current.capture(layerRefs.current);
                }
                isBrush = false;
                return;
              }

              //移動・コピー処理
              if (p.mouseX / zoomScale >= 0 && p.mouseX / zoomScale <= p.width && p.mouseY / zoomScale >= 0 && p.mouseY / zoomScale <= p.height) {
                if (toolModeRef.current === 'selectMode' && !isImageInsertionActiveRef.current) {
                  // 選択範囲を計算
                  const selectionX = Math.min(p.mouseX / zoomScale, startX);
                  const selectionY = Math.min(p.mouseY / zoomScale, startY);
                  const selectionWidth = Math.abs(p.mouseX / zoomScale - startX);
                  const selectionHeight = Math.abs(p.mouseY / zoomScale - startY);
              
                  // selectedArea.currentの幅と高さに基づいてobjectを更新
                  if (selectionWidth >= 20 && selectionHeight >= 20) {
                    // objectに読み込んだ画像に合わせた数値を定義
                    objectRef.current = { x: selectionX, y: selectionY, width: selectionWidth, height: selectionHeight, angle: 0 };
              
                    selectedAreaRef.current = p.createGraphics(selectionWidth, selectionHeight);
                    setIsGraphicsCreated(true);
              
                  } else {
                    selectedAreaRef.current = null;
                    setIsGraphicsCreated(false);
                  }
                }
                isBrush = false;
                return;
              }
            }
          }
        }
      };


      p.radGrad = (layer, x, y, width, height, innerCol, outerCol) => {
        const maxRadius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2)); // 最大半径を計算
        for (let r = maxRadius; r >= 0; r--) {
          const inter = p.map(r, 0, maxRadius, 0, 1);
          const col = p.lerpColor(innerCol, outerCol, inter);
          layer.fill(col);
          layer.noStroke();
          // 楕円のサイズを動的に計算
          const ellipseWidth = p.map(r, 0, maxRadius, 0, width);
          const ellipseHeight = p.map(r, 0, maxRadius, 0, height);
          layer.ellipse(x, y, ellipseWidth, ellipseHeight);
        }
      };
      


      //「筆圧カスタムブラシ」
      // HSVモードで描画するための関数（こちらは「Pointer Events API」イベントを使用する）
      p.startPressureDrawing = () => {
        if (!startHSV) {
          startHSV = true;
          const canvasElement = canvasRef.current.elt; // canvasの実DOM要素にアクセス
          canvasElement.addEventListener('pointerdown', (event) => p.pointerDown(event));
          canvasElement.addEventListener('pointermove', (event) => p.pointerMove(event));
          canvasElement.addEventListener('pointerup', (event) => p.pointerUp(event));
          canvasElement.addEventListener('pointerleave', (event) => p.pointerUp(event));
        }
      };

      // p5のsetup関数内やp5オブジェクトに追加する関数でイベントリスナーを削除するstopPressureDrawing関数を定義
      p.stopPressureDrawing = () => {
        if (startHSV) {
          startHSV = false;
          const canvasElement = canvasRef.current.elt;
          // pointerDown, pointerMove, pointerUp, pointerLeaveに対応するリスナーを削除
          canvasElement.removeEventListener('pointerdown', p.pointerDown);
          canvasElement.removeEventListener('pointermove', p.pointerMove);
          canvasElement.removeEventListener('pointerup', p.pointerUp);
          canvasElement.removeEventListener('pointerleave', p.pointerUp);
        }
      };

      
      p.pointerDown = (event) => {
        const layerIndex = selectLayerRef.current - 1;
        if (isVisibleRef.current[layerIndex]) {
          if (pressureModes.has(toolModeRef.current)) {
            const layer = layerRefs.current[layerIndex];
              if (toolModeRef.current === 'mixTool') {
                let c = layer.get(p.mouseX / zoomScale, p.mouseY / zoomScale);
                
                let colorString;
                // 透明度を考慮して、RGBがすべて0かつ透明度も0の場合は白として扱う
                if (c[0] === 0 && c[1] === 0 && c[2] === 0 && c[3] === 0) {
                  colorString = `rgba(255, 255, 255, ${c[3] / 255})`;
                  mixToolColor = false;
                } else {
                  colorString = `rgba(${c[0]},${c[1]},${c[2]},${c[3] / 255})`;
                  mixToolColor = true;
                }

                //const colorString = `rgba(${c[0]},${c[1]},${c[2]},${c[3] / 255})`;
                setMixColor(colorString);

                layer.colorMode(p.HSB, 360, 100, 100);
              } else {
                layer.colorMode(p.HSB, 360, 100, 100);
              }
          if (toolModeRef.current === 'pencilPen') {
            lerpStep = pencilLerpStep.current;
            numPoints = pencilNumPointsRef.current;
            alphaMin = pencilAlphaRef.current;
            widthDot = pencilWidthDotRef.current;
            heightDot = pencilHeightDotRef.current;
          } else if (toolModeRef.current === 'oilPen') {
            lerpStep = oilLerpStepRef.current;
            numPoints = oilNumPointsRef.current;
            alphaMin = oilAlphaRef.current;
            widthDot = oilWidthDotRef.current;
            heightDot = oilHeightDotRef.current;
          }
            isBrush = true;
            pressure = event.pressure;
            prev.x = event.offsetX;
            prev.y = event.offsetY;
          }
        } else {
          //アラートの表示
          handleAlertLayerMessage();
        }
      }


      p.pointerMove = (event) => {
        const layerIndex = selectLayerRef.current - 1;
        if (pressureModes.has(toolModeRef.current) && isBrush) {
          const layer = layerRefs.current[layerIndex];
          let newPressure = event.pressure;
          
          // 筆圧の変化速度を計算（単純な例として、絶対値の差分を使用）
          let pressureChangeSpeed = Math.abs(newPressure - pressure);

          // 筆圧の変化速度に基づいて補間率を動的に調整
          const LerpRateMin = lerpRateMinRef.current;
          const LerpRateMax = lerpRateMaxRef.current;
          let lerpRate = p.map(pressureChangeSpeed, 0, 1, LerpRateMin, LerpRateMax);
          pressure = p.lerp(pressure, newPressure, lerpRate);

          let userPressureAdjustment = parseFloat(pressureAdjustmentRef.current.toFixed(2))
          let adjustedPressure = pressure + userPressureAdjustment;
          // 0未満にならないようにし、1を超えないように制限
          adjustedPressure = Math.max(0, Math.min(1, adjustedPressure));

          let strokeWeightBasedOnPressure;
          if  (pressurePenRef.current) {
            let baseSize = toolSizeRef.current;
            let minSize = minSizeRef.current; // 最小のブラシサイズを基本の半分に設定
            let maxSize = baseSize; // 最大のブラシサイズを基本のサイズと同じに設定

            if  (sizeCustomBoolRef.current) {
              let rateSize = rateSizeRef.current;
              // 筆圧に応じて線の太さを調整
              let targetSize = p.map(adjustedPressure, 0, 1, minSize, maxSize);
              if (currentStrokeSize === undefined) {
                currentStrokeSize = targetSize;
              }
              currentStrokeSize = p.lerp(currentStrokeSize, targetSize, rateSize);
            
              strokeWeightBasedOnPressure = currentStrokeSize;
            } else {
              // 筆圧に応じて線の太さを調整
              strokeWeightBasedOnPressure = toolSizeRef.current * adjustedPressure;
              strokeWeightBasedOnPressure = p.constrain(strokeWeightBasedOnPressure, minSize, maxSize);
            }
          } else {
            strokeWeightBasedOnPressure = toolSizeRef.current;
          }

          // H値処理
          let colorH;
          if (toolModeRef.current === 'mixTool') {
            colorH = mixHRef.current;
          } else {
            colorH = hRef.current;
          }
          //colorH = hRef.current;

          // S値処理
          let colorS;
          let S_base;
          //S_base = sRef.current;

          if (toolModeRef.current === 'mixTool') {
            S_base = mixSRef.current;
          } else {
            S_base = sRef.current;
          }

          if (activeSRef.current) {
            const S_min = sMinRef.current;

            // S値が0の場合、colorSを0に固定
            if (S_base === 0) {
              colorS = 0;
            } else {
              if (maxChangeSBoolRef.current) {
                let maxChange = maxChangeSRef.current;
                let rate = rateSRef.current;
          
                // pressureに基づいてcolorSを計算
                let currentS = S_min + (S_base - S_min) * adjustedPressure;
                currentS = Math.max(Math.min(currentS, S_base), 1);
          
                let newMin = Math.max(currentS - maxChange, S_min);
                let newMax = Math.min(currentS + maxChange, S_base);
                let targetS = currentS;
                targetS = p.constrain(targetS, newMin, newMax);
          
                colorS = p.lerp(currentS, targetS, rate);
              } else {
                colorS = S_min + (S_base - S_min) * adjustedPressure;
                // colorSが1以下にならないように、最低値を1にする
                colorS = Math.max(Math.min(colorS, S_base), 1);
              }
            }
          } else {
            colorS = S_base
          }

          // V値処理
          let colorV;
          let V_base;
          //V_base = vRef.current;

          if (toolModeRef.current === 'mixTool') {
            V_base = mixVRef.current;
          } else {
            V_base = vRef.current;
          }

          if (activeVRef.current) {
            const V_max = vMaxRef.current

            // V値が100の場合、colorVを100に固定
            if (V_base === 100) {
              colorV = 100;
            } else {
              if (maxChangeVBoolRef.current) {
                let maxChange = maxChangeVRef.current;
                let rate = rateVRef.current;
        
                let currentV = V_max - (V_max - V_base) * adjustedPressure;
                currentV = Math.min(currentV, 99);
          
                let newMin = Math.max(currentV - maxChange, V_base);
                let newMax = Math.min(currentV + maxChange, V_max);
                let targetV = currentV;
                targetV = p.constrain(targetV, newMin, newMax);
          
                colorV = p.lerp(currentV, targetV, rate);
              } else {
                // pressureに基づいてcolorVを計算
                colorV = V_max - (V_max - V_base) * adjustedPressure;
                colorV = Math.min(colorV, 99); // colorVが100にならないように、99に制限
              }
            }
          } else {
            colorV = V_base
          }

          //透明度に筆圧をつける処理
          let currentAlphaMix;
          if (activeMixAlphaRef.current) {
            let currentAlpha = (alphaRateRef.current / 100) * adjustedPressure;
            currentAlphaMix = Math.max(Math.min(currentAlpha, 1), 0);
          } else {
            currentAlphaMix = alphaRateRef.current / 100;
          }

          if (toolModeRef.current === 'inkPen') {
          //インクペンの処理
          let distance = p.dist(prev.x, prev.y, event.offsetX, event.offsetY);
          let density = densityValueRef.current;
          let steps = distance / density;

          for (let i = 0; i <= steps; i++) {
            let lerpAmount = i / steps;
            let x = p.lerp(prev.x, event.offsetX, lerpAmount);
            let y = p.lerp(prev.y, event.offsetY, lerpAmount);

            layer.strokeWeight(strokeWeightBasedOnPressure);
            layer.stroke(colorH, colorS, colorV);
            layer.line(prev.x, prev.y, x, y);
              prev.x = p.mouseX / zoomScale;
              prev.y = p.mouseY / zoomScale;
            }
            return;
          } else if (toolModeRef.current === 'watercolorPen') {
            //水彩ペンの処理
            p.watercolorPenEvent(event, strokeWeightBasedOnPressure, colorH, colorS, colorV);
            return;
          } else if (toolModeRef.current === 'mixTool') {
            //色混ぜツールの処理
            //p.mixToolEvent(event, strokeWeightBasedOnPressure, colorH, colorS, colorV, currentAlphaMix);

  if (mixToolColor) {
    p.mixToolEvent(event, strokeWeightBasedOnPressure, colorH, colorS, colorV, currentAlphaMix);
  } else {
    layer.erase();
    layer.strokeWeight(toolSizeRef.current);
    layer.line(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);
    prev.x = p.mouseX / zoomScale;
    prev.y = p.mouseY / zoomScale;
  }

            return;
          } else if  (toolModeRef.current === 'pencilPen' || toolModeRef.current === 'oilPen') {
            //エアブラシ・厚塗りペンの処理
            p.pencilPenEvent(event, strokeWeightBasedOnPressure, colorH, colorS, colorV);
          }
        }
      }

      p.pointerUp = (event) => {
        if (pressureModes.has(toolModeRef.current)) {
          const layerIndex = selectLayerRef.current - 1;
          const layer = layerRefs.current[layerIndex];
          if (isBrush) {
            undoRef.current.capture(layerRefs.current);
          }
          isBrush = false;
          currentStrokeSize = undefined;

          layer.colorMode(p.RGB, 255);

          if (toolModeRef.current === 'mixTool') {
            if (!mixToolColor) {
              layer.noErase();
            }
          }
        }
      }


      //エアブラシ・厚塗りペンの処理
      p.pencilPenEvent = (event, strokeWeightBasedOnPressure, colorH, colorS, colorV) => {
        const layerIndex = selectLayerRef.current - 1;
        const layer = layerRefs.current[layerIndex];
        let scalingFactor = reductionRateValueRef.current;
        let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPressure / 2;
        prev.x = event.offsetX;
        prev.y = event.offsetY;
        brushHsvRef.current.clear();
        for (let t = 0; t <= 1; t += lerpStep) { // tを0から1まで0.05刻みで増やす
          let lerpX = p.lerp(prev.x, p.mouseX / zoomScale, t) - prev.x;
          let lerpY = p.lerp(prev.y, p.mouseY / zoomScale, t) - prev.y;
        
          // ブラシの中心からの距離に応じて点を描画
          for (let i = 0; i < numPoints; i++) { // 点の数を調整
            let offsetX = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let offsetY = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let distance = p.dist(0, 0, offsetX, offsetY);
            let alpha = p.map(distance, 0, strokeWeightBasedOnPressurehalf, 100, alphaMin); // 中心から遠いほど透明度が高く
        
            brushHsvRef.current.noStroke();
            brushHsvRef.current.fill(colorH, colorS, colorV, alpha);
            brushHsvRef.current.ellipse(lerpX + offsetX + strokeWeightBasedOnPressurehalf * 4, lerpY + offsetY + strokeWeightBasedOnPressurehalf * 4, widthDot, heightDot); // 補間された位置に小さな点を描画
          }
        }

        //layer.image(brushHsvRef.current, prev.x - strokeWeightBasedOnPressurehalf * 8, prev.y - strokeWeightBasedOnPressurehalf * 8);
        let scaledWidth = brushHsvRef.current.width * scalingFactor;
        let scaledHeight = brushHsvRef.current.height * scalingFactor;

        if (toolModeRef.current === 'pencilPen') {
          if (pencilBlurRef.current) {
            const selectblurValue = 1;
            brushHsvRef.current.filter(p.BLUR, selectblurValue);
          }
          //layer.image(brushHsvRef.current, prev.x - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, prev.y - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, scaledWidth, scaledHeight);
          layer.image(brushHsvRef.current, prev.x - strokeWeightBasedOnPressurehalf * 4, prev.y - strokeWeightBasedOnPressurehalf * 4);
        } else if (toolModeRef.current === 'oilPen') {
          if (oilBlurRef.current) {
            const selectblurValue = 1;
            brushHsvRef.current.filter(p.BLUR, selectblurValue);
          }
          let waterDensity = oilDensityValueRef.current;
          let steps = p.dist(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);


          for (let i = 0; i < steps; i += strokeWeightBasedOnPressurehalf / waterDensity) {
            let x = p.lerp(prev.x, p.mouseX / zoomScale, i / steps);
            let y = p.lerp(prev.y, p.mouseY / zoomScale, i / steps);
            layer.image(brushHsvRef.current, x - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, y - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, scaledWidth, scaledHeight);
            //layer.image(brushHsvRef.current, x - strokeWeightBasedOnPressurehalf * 4, y - strokeWeightBasedOnPressurehalf * 4);
          }
        }
      }


    //色混ぜツールの処理
    p.mixToolEvent = (event, strokeWeightBasedOnPressure, colorH, colorS, colorV, currentAlphaMix) => {
      if (mixToolColor) {
      const layerIndex = selectLayerRef.current - 1;
      const layer = layerRefs.current[layerIndex];
      let waterDensity = mixDensityValueRef.current;
      let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPressure / 2;
      let scalingFactor = reductionRateValueRef.current;
      let alphaMix = currentAlphaMix;

      // if (alphaDecayBoolRef.current) {
      //   let alphaDecayRate = alphaDecayRateRef.current / 100;
      //   alphaMix -= alphaDecayRate;
      // }

      mixBrushRef.current.clear();
      //mixBrushRef.current.fill(colorH, colorS, colorV, alphaMix);

    mixBrushRef.current.stroke(colorH, colorS, colorV, alphaMix);
  
      //mixBrushRef.current.stroke(colorH, colorS, colorV, alphaMix);

      console.log('透明度', currentAlphaMix);

      for (let r = strokeWeightBasedOnPressurehalf * 2; r > 0; --r) {
        mixBrushRef.current.ellipse(strokeWeightBasedOnPressurehalf * 8, strokeWeightBasedOnPressurehalf * 8, r, r);
      }

      if (mixBlurRef.current) {
        const selectblurValue = mixBlurValueRef.current;
        mixBrushRef.current.filter(p.BLUR, selectblurValue);
      }

      prev.x = event.offsetX;
      prev.y = event.offsetY;
      let steps = p.dist(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);

      let scaledWidth = mixBrushRef.current.width * scalingFactor;
      let scaledHeight = mixBrushRef.current.height * scalingFactor;
      for (let i = 0; i < steps; i += strokeWeightBasedOnPressurehalf / waterDensity) {
        let x = p.lerp(prev.x, p.mouseX / zoomScale, i / steps);
        let y = p.lerp(prev.y, p.mouseY / zoomScale, i / steps);
        layer.image(mixBrushRef.current, x - strokeWeightBasedOnPressurehalf * 8 * scalingFactor, y - strokeWeightBasedOnPressurehalf * 8 * scalingFactor, scaledWidth, scaledHeight);
      }
    }
    }


      //水彩ペンの処理
      p.watercolorPenEvent = (event, strokeWeightBasedOnPressure, colorH, colorS, colorV) => {
        const layerIndex = selectLayerRef.current - 1;
        const layer = layerRefs.current[layerIndex];
        let waterDensity = waterDensityValueRef.current;
        let scalingFactor = reductionRateValueRef.current;
        let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPressure / 2;
        brushHsvRef.current.clear();
        // カスタムペンの位置を確認する用
        // brushHsvRef.current.background(255);
      
        brushHsvRef.current.stroke(colorH, colorS, colorV);
        for (let r = strokeWeightBasedOnPressurehalf * 2; r > 0; --r) {
          brushHsvRef.current.ellipse(strokeWeightBasedOnPressurehalf * 4, strokeWeightBasedOnPressurehalf * 4, r, r);
        }
        if (watercolorBlurRef.current) {
          const blurValue = 1;
          brushHsvRef.current.filter(p.BLUR, blurValue);
        }
      
        prev.x = event.offsetX;
        prev.y = event.offsetY;
        let steps = p.dist(prev.x, prev.y, p.mouseX / zoomScale, p.mouseY / zoomScale);

        
        let scaledWidth = brushHsvRef.current.width * scalingFactor;
        let scaledHeight = brushHsvRef.current.height * scalingFactor;
        for (let i = 0; i < steps; i += strokeWeightBasedOnPressurehalf / waterDensity) {
          let x = p.lerp(prev.x, p.mouseX / zoomScale, i / steps);
          let y = p.lerp(prev.y, p.mouseY / zoomScale, i / steps);
          layer.image(brushHsvRef.current, x - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, y - strokeWeightBasedOnPressurehalf * 4 * scalingFactor, scaledWidth, scaledHeight);
        }
      }
      

      //鉛筆のプレビュー
      p.pencilPreview = () => {
        const lerpStepPreview = pencilLerpStep.current;
        const numPointsPreview = pencilNumPointsRef.current;
        const alphaMinPreview = pencilAlphaRef.current;
        const widthDotPreview = Math.min(pencilWidthDotRef.current, 35);
        const heightDotPreview = Math.min(pencilHeightDotRef.current, 35);
        const colorHPreview = hRef.current;
        const colorSPreview = sRef.current;
        const colorVPreview = vRef.current;
        const strokeWeightBasedOnPreview = Math.min(toolSizeRef.current, 70);

        pencilPreviewRef.current.clear();
        let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPreview / 2;
        
        // キャンバスの中心座標を取得
        let centerX = pencilPreviewRef.current.width / 2;
        let centerY = pencilPreviewRef.current.height / 2;

        // キャンバスをクリアして背景を設定
        pencilPreviewRef.current.clear();
        for (let t = 0; t <= 1; t += lerpStepPreview) {
          // ブラシの中心からの距離に応じて点を描画
          for (let i = 0; i < numPointsPreview; i++) {
            let offsetX = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let offsetY = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let distance = p.dist(0, 0, offsetX, offsetY);
            let alpha = p.map(distance, 0, strokeWeightBasedOnPressurehalf, 100, alphaMinPreview);

            pencilPreviewRef.current.noStroke();
            pencilPreviewRef.current.fill(colorHPreview, colorSPreview, colorVPreview, alpha);
            // キャンバスの中心からのオフセットを考慮して点を描画
            pencilPreviewRef.current.ellipse(centerX + offsetX, centerY + offsetY, widthDotPreview, heightDotPreview);
          }
        }
      
        if (pencilBlurRef.current) {
          const selectblurValue = 1;
          pencilPreviewRef.current.filter(p.BLUR, selectblurValue);
        }
        getPencilPreviewData();
      }


      //厚塗りペンのプレビュー
      p.oilPenPreview = () => {
        const lerpStepPreview = oilLerpStepRef.current;
        const numPointsPreview = oilNumPointsRef.current;
        const alphaMinPreview = oilAlphaRef.current;
        const widthDotPreview = Math.min(oilWidthDotRef.current, 35);
        const heightDotPreview = Math.min(oilHeightDotRef.current, 35);
        const colorHPreview = hRef.current;
        const colorSPreview = sRef.current;
        const colorVPreview = vRef.current;
        const strokeWeightBasedOnPreview = Math.min(toolSizeRef.current, 70);

        oilPenPreviewRef.current.clear();
        let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPreview / 2;
        
        // キャンバスの中心座標を取得
        let centerX = oilPenPreviewRef.current.width / 2;
        let centerY = oilPenPreviewRef.current.height / 2;

        // キャンバスをクリアして背景を設定
        oilPenPreviewRef.current.clear();
        for (let t = 0; t <= 1; t += lerpStepPreview) {
          // ブラシの中心からの距離に応じて点を描画
          for (let i = 0; i < numPointsPreview; i++) {
            let offsetX = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let offsetY = p.random(-strokeWeightBasedOnPressurehalf, strokeWeightBasedOnPressurehalf);
            let distance = p.dist(0, 0, offsetX, offsetY);
            let alpha = p.map(distance, 0, strokeWeightBasedOnPressurehalf, 100, alphaMinPreview);

            oilPenPreviewRef.current.noStroke();
            oilPenPreviewRef.current.fill(colorHPreview, colorSPreview, colorVPreview, alpha);
            // キャンバスの中心からのオフセットを考慮して点を描画
            oilPenPreviewRef.current.ellipse(centerX + offsetX, centerY + offsetY, widthDotPreview, heightDotPreview);
          }
        }

        if (oilBlurRef.current) {
          const selectblurValue = 1;
          oilPenPreviewRef.current.filter(p.BLUR, selectblurValue);
        }
        getOilPenPreviewData();
      }


      //「範囲選択」関係・選択ツール
      //「全選択」の場合の処理、レイヤーと同じサイズの一時バッファを作成する
      p.selectAllArea = () => {
        selectedAreaRef.current = p.createGraphics(p.width, p.height);
        objectRef.current = { x: 0, y: 0, width: selectedAreaRef.current.width, height: selectedAreaRef.current.height, angle: 0 };

        if (selectArrangeModeRef.current === 'selectFillColor') {
          //「塗りつぶし」の場合の処理関数
          p.handleSelectFillColorConfirm();
        } else {
          //その他の場合の処理関数
          p.handleSelectConfirm();
        }
      }

      //「範囲削除」「選択範囲外削除」の処理
      p.selectAreaDeleteConfirm = () => {
        const object = objectRef.current;
        const layerIndex = selectLayerRef.current - 1;
        selectingLayerRef.current.clear();
        const layer = layerRefs.current[layerIndex];

        if (isVisibleRef.current[layerIndex]) {
          // undoRef.current.capture(layerRefs.current);

          if (selectDeleteInversionRef.current) {
            // 選択範囲外を消去
            selectedAreaRef.current.image(layer, 0, 0, object.width, object.height, object.x, object.y, object.width, object.height);
            layer.clear();
            layer.image(selectedAreaRef.current, object.x, object.y);

          } else {
          // 選択範囲を消去
          layer.erase();
          layer.strokeWeight(0);
          
          layer.rect(object.x, object.y, object.width, object.height);
          layer.noErase();
          layer.strokeWeight(1);
          }

          selectedAreaRef.current = null;
          setIsGraphicsCreated(false);
          getTemporaryLayersData();
          getLayersInfoData();
          undoRef.current.capture(layerRefs.current);
        }
      }

      //ぼかし処理
      p.selectLayerBlurDecision = (blurValue) => {
        const layerBlurValue = blurValue;
        selectedAreaRef.current.filter(p.BLUR, layerBlurValue);
      }

      //選択範囲「決定」時に「塗りつぶし」時の処理（ここではまだ塗りつぶし自体は実行しない）
      p.handleSelectFillColorConfirm = () => {
        isTransformingActiveRef.current = true;
        selectingLayerRef.current.clear();
      }

      //選択範囲「決定」時の処理
      p.handleSelectConfirm = () => {
        const object = objectRef.current;
        const layerIndex = selectLayerRef.current - 1;
        isTransformingActiveRef.current = true;
        selectingLayerRef.current.clear();
        
        const layer = layerRefs.current[layerIndex];
        
          if (isVisibleRef.current[layerIndex]) {
            selectedAreaRef.current.image(layer, 0, 0, object.width, object.height, object.x, object.y, object.width, object.height);
            getTemporaryLayersData();
        
            if ((selectArrangeModeRef.current === 'selectMove') || (selectArrangeModeRef.current === 'selectBlur' && !selectToolBlurBoolRef.current)) {
              undoRef.current.capture(layerRefs.current);
              // erase()を使用して選択範囲を消去
              layer.erase();
              layer.strokeWeight(0);
              layer.rect(object.x, object.y, object.width, object.height);
              layer.noErase();
              layer.strokeWeight(1);
            } else if (selectArrangeModeRef.current === 'selectCopy') {
              copyLayerRef.current = p.createGraphics(object.width, object.height);
              copyLayerRef.current.clear();
              copyLayerRef.current.image(layer, 0, 0, object.width, object.height, object.x, object.y, object.width, object.height);
              getCopyLayersData();
            }
          }
        }

        //「塗りつぶし」の実行
        p.selectFillColorChange = (colorState, directionGradation, firstColor, secondColor) => {
          selectedAreaRef.current.clear();
          if (colorState) {
            selectedAreaRef.current.background(firstColor);
            console.log('firstColor', firstColor)
          } else {
            let layer = selectedAreaRef.current;
            const from = layer.color(firstColor);
            const to = layer.color(secondColor);
            
            if (directionGradation === 'vertical') {
              // グラデーションを描画（縦方向）
              for (let i = 0; i <= layer.height; i++) {
                let inter = layer.lerpColor(from, to, i / layer.height);
                layer.stroke(inter);
                layer.line(0, i, layer.width, i); // 縦方向に線を描画
              }
            } else if (directionGradation === 'beside') {
              // グラデーションを描画（横方向）
              for (let i = 0; i <= layer.width; i++) {
                let inter = p.lerpColor(from, to, i / layer.width);
                layer.stroke(inter);
                layer.line(i, 0, i, layer.height);
              }
            }
          }
        }

      //「画像挿入」「選択範囲」の「最終決定」処理
      p.handleImageConfirm = (layerIndex) => {
      const object = objectRef.current;
      
      if (isVisibleRef.current[layerIndex]) {
        const tempGraphics = p.createGraphics(p.width, p.height);
        tempGraphics.clear();
        tempGraphics.push();

        // 回転の中心を画像の中心に移動
        tempGraphics.translate(object.x + object.width / 2, object.y + object.height / 2);
        tempGraphics.rotate(object.angle); // 指定された角度で回転
      
        // 画像を中心に戻して描画
        tempGraphics.image(selectedAreaRef.current, -object.width / 2, -object.height / 2, object.width, object.height);
        tempGraphics.pop();
      
        const layer = layerRefs.current[layerIndex];
        layer.image(tempGraphics, 0, 0);
      }
      
      undoRef.current.capture(layerRefs.current);
      isTransformingActiveRef.current = false;
      selectedAreaRef.current = null;
      //プレビューを更新する
      getTemporaryLayersData();
      getLayersInfoData();
        
      if ((selectArrangeModeRef.current === 'selectCopy') && (toolModeRef.current === 'selectMode')) {
        copyObjectRef.current = objectRef.current;
        setCopyLayerActive(true);
      }
    }

    //「コピー」の複製処理
    p.copyLayerConfirm = (layerIndex) => {
      const object = copyObjectRef.current;
      if (isVisibleRef.current[layerIndex]) {
        const tempGraphics = p.createGraphics(p.width, p.height);
        tempGraphics.clear();
        tempGraphics.push();
        tempGraphics.translate(object.x + object.width / 2, object.y + object.height / 2);
        tempGraphics.rotate(object.angle);
        tempGraphics.image(copyLayerRef.current, -object.width / 2, -object.height / 2, object.width, object.height);
        tempGraphics.pop();
        const layer = layerRefs.current[layerIndex];
        layer.image(tempGraphics, 0, 0);
      }
      undoRef.current.capture(layerRefs.current);
      getLayersInfoData();
    }

    //レイヤーの「入れ替え」「転写」「複製」関係
    //レイヤー内の描画を「入れ替え」
    p.changeSketch = (layerIndex1, layerIndex2) => {
      if (selectSecondLayerRef.current != null) {
        // 操作前の状態をキャプチャ
        // undoRef.current.capture(layerRefs.current);

        const tempLayerRef = layerRefs.current[layerIndex1];
        layerRefs.current[layerIndex1] = layerRefs.current[layerIndex2];
        layerRefs.current[layerIndex2] = tempLayerRef;

        undoRef.current.capture(layerRefs.current);
      }
    };

    //レイヤー内の描画を「転写」「複製」
    p.moveLayersSketch = (layerIndex1, layerIndex2, shouldCopy) => {
      const layer1 = layerRefs.current[layerIndex1];
      const layer2 = layerRefs.current[layerIndex2];
      
      if (selectSecondLayerRef.current != null) {
        layer2.image(layer1, 0, 0); // 描画の統合
        if (!shouldCopy) {
          layer1.clear();
        }

        undoRef.current.capture(layerRefs.current);
      }
    };

    //「画像挿入」関係
    //「画像挿入」
    p.handleImageChange = (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
    
        // p5のloadImageを使用して画像を読み込む
        p.loadImage(url, (loadedImage) => {
          if (loadedImage.width >= 20 && loadedImage.height >= 20) {
            imgRef.current = loadedImage;
            p.selectedAreaSketch();
          } else {
            isImageInsertionActiveRef.current = false;
          }
        });
        e.target.value = '';
      }
    };

    //挿入された画像に合わせて一時バッファを作成し、変形を有効にする
    p.selectedAreaSketch = () => {
      if (imgRef.current) {
        setIsGraphicsCreated(true);

        let imageWidth;
        let imageHeight;
        if ((imgRef.current.width <= p.width * 2 && defaultScaleModeRef.current) || (imgRef.current.height <= p.height * 2 && defaultScaleModeRef.current)) {
          imageWidth = imgRef.current.width;
          imageHeight = imgRef.current.height;
        } else {
          const scaleX = p.width / imgRef.current.width;
          const scaleY = p.height / imgRef.current.height;
          const scale = Math.min(scaleX, scaleY, 1);
          imageWidth = imgRef.current.width * scale;
          imageHeight = imgRef.current.height * scale;
        }
    
        selectedAreaRef.current = p.createGraphics(imageWidth, imageHeight);
        selectedAreaRef.current.image(imgRef.current, 0, 0, imageWidth, imageHeight);

        // 変形・移動機能のフラグをtrueにセット
        isTransformingActiveRef.current = true;
    
        // objectに読み込んだ画像に合わせた数値を定義
        objectRef.current = { x: 0, y: 0, width: imageWidth, height: imageHeight, angle: 0 };
        getTemporaryLayersData();
      }
    };

    //「画像挿入」・「選択範囲」の処理の「キャンセル」
    p.handleImageConfirmCancel = () => {
      selectingLayerRef.current.clear();
      selectedAreaRef.current = null;
      getTemporaryLayersData();

      isTransformingActiveRef.current = false;
      console.log('isTransformingActiveRef', isTransformingActiveRef.current);
      if (isImageInsertionActiveRef.current && toolModeRef.current === 'selectMode') {
        if ((selectArrangeModeRef.current === 'selectMove') || (selectArrangeModeRef.current === 'selectBlur' && !selectToolBlurBoolRef.current)){
          handleUndo();
        } else if (selectArrangeModeRef.current === 'selectCopy') {
          copyLayerRef.current = null;
          getCopyLayersData();
        }
      }
    }

    //「クリア」関係
    //描画しているレイヤーをクリアする
    p.selectLayerClear = () => {
      const layerIndex = selectLayerRef.current - 1;
      if (isVisibleRef.current[layerIndex]) {
        const layer = layerRefs.current[layerIndex];
        layer.clear();
      }
      undoRef.current.capture(layerRefs.current);
      getLayersInfoData();
    }

    //コピーレイヤーをクリアする
    p.copyLayerDelete = () => {
      copyLayerRef.current = null;
      copyObjectRef.current = null;
      getCopyLayersData();
    }

    //「反転」処理
    //反転
    p.inversionChange = (bool, direction) => {
      const layerIndex = selectLayerRef.current - 1;
    
      if (!bool && !isVisibleRef.current[layerIndex]) {
        handleAlertLayerMessage();
        return;
      }
    
      let layer = bool ? selectedAreaRef.current : layerRefs.current[layerIndex];
      const tempGraphics = p.createGraphics(layer.width, layer.height);
      tempGraphics.clear();
      tempGraphics.push();
      // キャンバスの中心に原点を移動
      tempGraphics.translate(tempGraphics.width / 2, tempGraphics.height / 2);
    
      if (direction === 'topAndBottom') {
        // 上下方向に反転
        tempGraphics.scale(1, -1);
      } else if (direction === 'leftAndRight') {
        // 左右方向に反転
        tempGraphics.scale(-1, 1);
      } else if (direction === 'rotateVertical') {
        // 90度回転
        tempGraphics.rotate(p.HALF_PI); // π/2 ラジアンで回転
        // 回転後の描画位置を調整するためのオフセット
        if (layer.width !== layer.height) {
          tempGraphics.translate((layer.height - layer.width) / 2, (layer.width - layer.height) / 2);
        }
      } else if (direction === 'rotateVerticalOpposition') {
        // -90度（または270度）回転
        tempGraphics.rotate(-p.HALF_PI); // -π/2 ラジアンで回転
        // 回転後の描画位置を調整するためのオフセット
        if (layer.width !== layer.height) {
          tempGraphics.translate((layer.width - layer.height) / 2, (layer.height - layer.width) / 2);
        }
      }
    
      tempGraphics.translate(-tempGraphics.width / 2, -tempGraphics.height / 2);
      tempGraphics.image(layer, 0, 0, tempGraphics.width, tempGraphics.height, 0, 0, tempGraphics.width, tempGraphics.height); // 反転した内容をtempGraphicsに描画
      tempGraphics.pop(); // 描画状態を復元
      layer.clear();
    
      layer.image(tempGraphics, 0, 0);
    }

    //「拡大・縮小」関係（スケール）
    //マウスのスクロールに合わせて拡大縮小
    p.mouseWheel = (event) => {
      if (event.target === sketchRef.current.childNodes[0]) {
        zoomScale += event.delta * -0.001;
        zoomScale = p.constrain(zoomScale, 0.5, 5);
        setScaleFactor(zoomScale);
        p.redraw();
        event.preventDefault();
        if (scalePanelVisibleRef.current) {
          handleScaleChangeSlider(zoomScale);
        }
      }
    };

    //スライダーなどの入力値によってスケールを変動する
    p.handleScale = (newScale) => {
      p.scale(newScale); // p5のscale関数を使用してスケールを適用
      p.redraw(); // 再描画をトリガー
      zoomScale = newScale;
    };


    //「ショートカットキー」
    //主にアンドゥ・リドゥ
    p.keyPressed = () => {
      // macOSのCommandキーまたはWindows/LinuxのCtrlキーをサポート
      const isUndo = (p.keyIsDown(90) && (p.keyIsDown(p.CONTROL) || p.keyIsDown(p.META))); // Z key
      const isRedo = (p.keyIsDown(90) && (p.keyIsDown(p.CONTROL) || p.keyIsDown(p.META)) && p.keyIsDown(p.SHIFT)); // Z key + Shift
      // const isPaste = (p.keyIsDown(66) && p.keyIsDown(81) && (p.keyIsDown(p.CONTROL) || p.keyIsDown(p.META))); // V key
    
      if (isUndo) {
        if (!p.keyIsDown(p.SHIFT)) { // Command + Z (アンドゥ)
          handleUndo();
        }
      } else if (isRedo) {
        handleRedo(); // Command + Shift + Z (リドゥ)
      } 
      // else if (isPaste) {
      //   handleCopyLayerConfirm(); // Command + V (ペースト)
      //   return false; // p5.jsによるデフォルトの挙動を防ぐ
      // }
    };


    //その他
    //pcに保存
      p.mouseClicked = () => {
        if (shouldDrawRef.current) {
        p.saveCanvas('myCanvas', 'png');
        setShouldDraw(false)
        }
      }

      //canvasの状態を画像で保存する
      p5InstanceRef.current = p;

    };

    // p5canvasインスタンスに保存
    p5CanvasInstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5CanvasInstanceRef.current) {
        p5CanvasInstanceRef.current.remove();
      }
    };
  }, [canvasSize, canvasSaveData, canvasData]);



  //レイヤーの「入れ替え」「転写」「複製」関係
  //レイヤー内の描画を「入れ替え」
  const handleSwapLayers = () => {
    if (p5CanvasInstanceRef.current && secondLayerSelectMode && (selectSecondLayer != null)) {
      const layerIndex1 = selectLayerRef.current - 1;
      const layerIndex2 = selectSecondLayerRef.current - 1;
    
      // layersInfoステートを更新して、alphasとisVisibleの値を交換
      const updatedLayersInfo = layersInfo.map((layer, index) => {
        if (index === layerIndex1) {
          return { ...layer, alphas: alphasRef.current[layerIndex2], isVisible: isVisibleRef.current[layerIndex2], blendMode: blendModeRef.current[layerIndex2], name: nameRef.current[layerIndex2] };
        } else if (index === layerIndex2) {
          return { ...layer, alphas: alphasRef.current[layerIndex1], isVisible: isVisibleRef.current[layerIndex1], blendMode: blendModeRef.current[layerIndex1], name: nameRef.current[layerIndex1] };
        } else {
          return layer;
        }
      });
    
      setLayersInfo(updatedLayersInfo);
      p5CanvasInstanceRef.current.changeSketch(layerIndex1, layerIndex2);
      // 操作後はレイヤー入れ替えモードを終了し、状態をリセット
      setSecondLayerSelectMode(false);
      setSelectSecondLayer(null);
      getLayersInfoData();
    }
  };

  //レイヤー内の描画を「転写」「複製」
  const handleMoveLayers = (state) => {
    if (p5CanvasInstanceRef.current && secondLayerSelectMode && (selectSecondLayer != null)) {
      const layerIndex1 = selectLayerRef.current - 1;
      const layerIndex2 = selectSecondLayerRef.current - 1;
      let stateValue = state === 'copy';
  
      p5CanvasInstanceRef.current.moveLayersSketch(layerIndex1, layerIndex2, stateValue);
      // 操作後はレイヤー入れ替えモードを終了し、状態をリセット
      setSecondLayerSelectMode(false);
      setSelectSecondLayer(null);
      getLayersInfoData();
    }
  };



  //「送信ボタン」が押された時にレイヤーデータを親コンポーネントに送る処理（保存関係）
  //「送信ボタン」が押された時のcanvasの状態をpngで保存（「全体」と「レイヤーごとに個別」の2種類）
  const getData = useCallback(() => {
    if (p5InstanceRef.current) {
      const dataURL = p5InstanceRef.current.canvas.toDataURL('image/png');

      let saveLayersData = [];
      if (saveLayersBoolRef.current) {
        saveLayersData = layersInfo.map((layer, index) => {
          if (layer.isVisible) {
            const graphics = layerRefs.current[index];
            const imageData = graphics.canvas.toDataURL('image/png');
            return { layer_id: layer.layer_id, isVisible: true, name: layer.name, content: imageData, alphas: layer.alphas, blendMode: layer.blendMode };
          } else {
            return { layer_id: layer.layer_id, isVisible: false, name: `レイヤー${layer.layer_id}`, content: null, alphas: 255, blendMode: 'BLEND' };
          }
        });
      } else {
        saveLayersData = null;
      }
      return { dataURL, saveLayersData };
    }
  }, [layersInfo]); 

  // 親にデータ取得関数を伝達
  useEffect(() => {
    if (onDataFromGrandchild) {
      onDataFromGrandchild(getData);
    }
  }, [getData]);

  //レイヤーの「セーブ管理」するチェックボックス（外部に出してもいいが、レイヤーのセーブを管理するもののためここにした）
  const toggleLayersSaveCheck = () => {
    setSaveLayersBool(!saveLayersBool);
  };

  // pcに保存
  const savePc = () => {
    if (p5InstanceRef.current) {
      setShouldDraw(true);
    }
  };


  //「プレビュー」関係
  // 一時レイヤーのプレビュー
  const getTemporaryLayersData = () => {
    if (p5InstanceRef.current) {
      if (selectedAreaRef.current) {
        const selectedAreaData = selectedAreaRef.current.canvas.toDataURL('image/png');
        setSelectedAreaCanvas(selectedAreaData);
      } else {
        setSelectedAreaCanvas(null);
      }
    }
  };

  // コピーバッファのプレビュー
  const getCopyLayersData = () => {
    if (p5InstanceRef.current) {
      if (copyLayerRef.current) {
        const copyLayerData = copyLayerRef.current.canvas.toDataURL('image/png');
        setCopyLayerCanvas(copyLayerData);
      } else {
        setCopyLayerCanvas(null);
      }
    }
  };

  // メインレイヤーのプレビュー
  const getLayersInfoData = () => {
    if (p5InstanceRef.current) {
      const dataURL = p5InstanceRef.current.canvas.toDataURL('image/png');
      // 全体のキャンバス画像を設定
      setDateAllCanvas(dataURL);
  
      let saveLayersData = [];
      if (layerRefs.current) {
        saveLayersData = layerRefs.current.map((layerRef, index) => {
          if (layerRef) { // layerRefがnullでないことを確認
            const imageData = layerRef.canvas.toDataURL('image/png');
            return imageData; // 各レイヤーの画像データ
          }
          return null;
        });
        // 各レイヤーの画像データを設定
        setLayersInfoCanvas(saveLayersData);
      }
    }
  };


  //エアブラシのプレビュー
  const getPencilPreviewData = () => {
    if (p5InstanceRef.current) {
      if (pencilPreviewRef.current) {
        const pencilPreviewData = pencilPreviewRef.current.canvas.toDataURL('image/png');
        setPencilPreviewCanvas(pencilPreviewData);
      } else {
        setPencilPreviewCanvas(null);
      }
    }
  };

  //エアブラシのプレビューを更新するトリガー
  const getPencilParameters = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.pencilPreview();
    }
  };


  //厚塗りペンのプレビュー
  const getOilPenPreviewData = () => {
    if (p5InstanceRef.current) {
      if (oilPenPreviewRef.current) {
        const oilPenPreviewData = oilPenPreviewRef.current.canvas.toDataURL('image/png');
        setOilPenPreviewCanvas(oilPenPreviewData);
      } else {
        setOilPenPreviewCanvas(null);
      }
    }
  };

  //厚塗りペンのプレビューを更新するトリガー
  const getOilPenParameters = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.oilPenPreview();
    }
  };


  //「画像挿入」関係
  //画像挿入
  const handleImage = (e) => {
    if (!isImageInsertionActiveRef.current) {
      if (p5CanvasInstanceRef.current) {
        p5CanvasInstanceRef.current.handleImageChange(e);
        setIsImageInsertionActive(true);
        setToolMode('imageTool');
        setDetailGroup('selectToolGroup');
      }
    }
  };


  //「決定ボタン」
  //「決定」ボタンの処理、「画像」なら最終決定・「選択ツール」なら「範囲決定」
  const handleConfirm = () => {
    const layerIndex = selectLayer - 1;
    if (p5CanvasInstanceRef.current && isVisibleRef.current[layerIndex]) {
      if (toolMode === 'imageTool') {
        p5CanvasInstanceRef.current.handleImageConfirm(layerIndex);
        setIsImageInsertionActive(false);
        setIsGraphicsCreated(false);
      } else if (toolMode === 'selectMode') {
        if (selectArrangeMode === 'selectFillColor') {
          //「塗りつぶし」の場合の処理関数
          p5CanvasInstanceRef.current.handleSelectFillColorConfirm();
          //選択範囲の処理中は他のモードに行けないようにする
          setIsImageInsertionActive(true);
          //選択範囲の処理中は選択レイヤーを変更できないようにする、2つ目のレイヤーは選択可能
          setSecondLayerSelectMode(true);
        } else if (selectArrangeMode === 'selectAreaDelete') {
          //「範囲削除」の場合の処理関数
          p5CanvasInstanceRef.current.selectAreaDeleteConfirm();
        } else {
          //「移動・コピー・ぼかし」の処理関数
          p5CanvasInstanceRef.current.handleSelectConfirm();
          setIsImageInsertionActive(true);
          setSecondLayerSelectMode(true);
        }
      }
    } else {
      //アラートの表示
      handleAlertLayerMessage();
    }
  };

  //「画像挿入」・「選択範囲」の処理の「キャンセル」（キャンセルボタン）
  const handleConfirmCancel = () => {
    if (p5CanvasInstanceRef.current) {
      p5CanvasInstanceRef.current.handleImageConfirmCancel();
      setIsImageInsertionActive(false);
      setSecondLayerSelectMode(false);
      //一時レイヤーに画像がないことを記録
      setIsGraphicsCreated(false);
    }
  };


  //「範囲選択」関係・選択ツール
  //「塗りつぶし」色の変更
  const handleSelectFillColorChange = (colorState, directionGradation) => {
    let firstColor;
    let secondColor;
    if (p5CanvasInstanceRef.current) {
      if (selectAlphaColorPreview) {
        firstColor = currentAlphaColor;
        secondColor = secondAlphaColor;
      } else {
        firstColor = secondAlphaColor;
        secondColor = currentAlphaColor;
      }
      p5CanvasInstanceRef.current.selectFillColorChange(colorState, directionGradation, firstColor, secondColor);
    }
  };

  //「全選択」の場合の処理
  const handleSelectAllArea = (e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      if (p5CanvasInstanceRef.current) {
        p5CanvasInstanceRef.current.selectAllArea();
        setToolMode('selectMode');
        //選択範囲の処理中は他のモードに行けないようにする
        setIsImageInsertionActive(true);
        //選択範囲の処理中は選択レイヤーを変更できないようにする、2つ目のレイヤーは選択可能
        setSecondLayerSelectMode(true);
        setIsGraphicsCreated(true);
      }
    }
  };

  //「ぼかし」処理
  const handleSelectLayerBlurDecision = () => {
    if (p5CanvasInstanceRef.current) {
      const blurValue = selectLayerBlurValue;
      p5CanvasInstanceRef.current.selectLayerBlurDecision(blurValue);
    }
  };

  //「コピー」の複製処理
  const handleCopyLayerConfirm = () => {
    const layerIndex = selectLayer - 1;
    if (p5CanvasInstanceRef.current && isVisibleRef.current[layerIndex]) {
      p5CanvasInstanceRef.current.copyLayerConfirm(layerIndex);
    } else {
      //アラートの表示
      handleAlertLayerMessage();
    }
  };

  //「選択ツール」の最終決定
  const handleConfirmTransform = () => {
    const layerIndex = selectLayer - 1;
  
    if (p5CanvasInstanceRef.current && isVisibleRef.current[layerIndex]) {
      if (selectSecondLayerRef.current != null) {
        const layerIndex2 = selectSecondLayer - 1;
        if (isVisibleRef.current[layerIndex2]) {
          p5CanvasInstanceRef.current.handleImageConfirm(layerIndex2);
        }
      } else {
        //セレクトレイヤーに描画
        p5CanvasInstanceRef.current.handleImageConfirm(layerIndex);
      }
      setIsImageInsertionActive(false);
      setSecondLayerSelectMode(false);
      setIsGraphicsCreated(false);
      setSelectSecondLayer(null);
    } else {
      //アラートの表示
      handleAlertLayerMessage();
    }
  };


  //「クリア」関係
  //描画中のレイヤーの描画をクリアする
  const handleSelectLayerClear = () => {
    const layerIndex = selectLayer - 1;
    if (p5CanvasInstanceRef.current && isVisibleRef.current[layerIndex]) {
      p5CanvasInstanceRef.current.selectLayerClear();
    } else {
      //アラートの表示
      handleAlertLayerMessage();
    }
  };

  //コピーレイヤーをクリアする
  const handleCopyDelete = () => {
    // 確認ダイアログを表示
    if (window.confirm("コピーした描画を削除してもよろしいですか？")) {
      // ユーザーがOKをクリックした場合の処理
      if (p5CanvasInstanceRef.current) {
        p5CanvasInstanceRef.current.copyLayerDelete();
        setCopyLayerActive(false);
      }
    }
  };


  //「レイヤー機能」
  //レイヤー選択機能（レイヤー選択解除ボタン）
  const handleCancelSecondLayer = () => {
    setSelectSecondLayer(null);
    setSecondLayerSelectMode(false);
  };


  //「反転」処理
  //反転
  const handleInversionClickChange = (direction) => {
    if (p5CanvasInstanceRef.current) {
      if (isGraphicsCreated) {
        p5CanvasInstanceRef.current.inversionChange(true, direction);
      } else {
        p5CanvasInstanceRef.current.inversionChange(false, direction);
      }
    }
  };


  //「アンドゥ・リドゥ」
  //アンドゥ・リドゥ操作の処理
  function handleUndo() {
    const historyState = undoRef.current.undo();
    if (historyState) {
      applyHistoryState(historyState);
    }
    //プレビュー更新、もしパフォーマンスに影響あるようなら削除
    getLayersInfoData();
  }

  function handleRedo() {
    const historyState = undoRef.current.redo();
    if (historyState) {
      applyHistoryState(historyState);
    }
    //プレビュー更新、もしパフォーマンスに影響あるようなら削除
    getLayersInfoData();
  }

  // 履歴の状態を各レイヤーに適用
  function applyHistoryState(historyState) {
    if (!historyState) return; // 履歴の状態がnullの場合は何もしない

    historyState.forEach((layerState, index) => {
      layerRefs.current[index].clear();
      layerRefs.current[index].image(layerState, 0, 0);
    });
  }


  //「スケール」機能関係
  //スケール調整
  useEffect(() => {
    //外枠の中央にcanvasを配置する計算
    const containerWidth = canvasSpaceSize.width; // 外枠の幅
    const containerHeight = canvasSpaceSize.height; // 外枠の高さ
    const canvasWidth = canvasSize.width; // canvasの幅
    const canvasHeight = canvasSize.height; // canvasの高さ
    const initialX = (containerWidth - canvasWidth) / 2;
    const initialY = (containerHeight - canvasHeight) / 2;
    setCanvasPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    if (sketchRef.current && sketchRef.current.childNodes[0]) {
        const canvas = sketchRef.current.childNodes[0];
        canvas.style.transform = `scale(${scaleFactor})`;
        canvas.style.transformOrigin = 'center center';
    }
  }, [scaleFactor]);

  useEffect(() => {
    canvasPosRef.current = canvasPosition;
    if (sketchRef.current && sketchRef.current.childNodes[0]) {
        const canvas = sketchRef.current.childNodes[0];
        canvas.style.position = 'absolute';
        canvas.style.left = `${canvasPosition.x}px`;
        canvas.style.top = `${canvasPosition.y}px`;
    }
  }, [canvasPosition]);

    const onMouseDown = (event) => {
      if (toolMode === 'handMode') {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            draggingRef.current = true;
            dragStartRef.current = { x: event.clientX - canvasPosRef.current.x, y: event.clientY - canvasPosRef.current.y };
        }
      }
    };

    //マウス対応関数
  const onMouseMove = (event) => {
    if (toolMode === 'handMode') {
      if (draggingRef.current) {
          const newX = event.clientX - dragStartRef.current.x;
          const newY = event.clientY - dragStartRef.current.y;
          setCanvasPosition({ x: newX, y: newY });
      }
    }
  };

  const onMouseUp = () => {
    if (toolMode === 'handMode') {
      draggingRef.current = false;
    }
  };

  //タッチ対応関数
  // const onTouchStart = (event) => {
  //   if (toolMode === 'handMode') {
  //     const touch = event.touches[0]; // 最初のタッチポイントを取得
  //     const rect = canvasContainerRef.current.getBoundingClientRect();
  //     if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
  //         touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
  //         draggingRef.current = true;
  //         dragStartRef.current = { x: touch.clientX - canvasPosRef.current.x, y: touch.clientY - canvasPosRef.current.y };
  //     }
  //   }
  // };

  // const onTouchMove = (event) => {
  //   if (toolMode === 'handMode') {
  //     if (draggingRef.current && event.touches.length > 0) {
  //         const touch = event.touches[0]; // 最初のタッチポイントを取得
  //         const newX = touch.clientX - dragStartRef.current.x;
  //         const newY = touch.clientY - dragStartRef.current.y;
  //         setCanvasPosition({ x: newX, y: newY });
  //     }
  //   }
  // };

  // const onTouchEnd = () => {
  //   if (toolMode === 'handMode') {
  //     draggingRef.current = false;
  //   }
  // };

  //スライダーなどの入力値によってスケールを変動する
  const handleScaleChange = (newScale) => {
    if (p5CanvasInstanceRef.current && p5CanvasInstanceRef.current.handleScale) {
      p5CanvasInstanceRef.current.handleScale(newScale);
    }
    setScaleFactor(newScale);
  };

  //スケールスライダーを更新するハンドラ
  const handleScaleChangeSlider = (newScale) => {
    const scaleSlider = document.getElementById('scaleSlider');
    const percentage = (newScale - 0.5) / (5 - 0.5) * 100;
    scaleSlider.style.background = `linear-gradient(to right, rgba(127, 168, 235, 0.5) ${percentage}%, transparent ${percentage}%)`;
  };

  //スケールスライダーを更新するハンドラ
  const handleSample = () => {
    if (p5InstanceRef.current) {
      const dataURL = p5InstanceRef.current.canvas.toDataURL('image/png');
      setCanvasP5ToPixi(dataURL);
    }
  };


  // メインレイヤーのプレビュー
  const sampleData = () => {
    if (p5InstanceRef.current) {
      const dataURL = p5InstanceRef.current.canvas.toDataURL('image/png');
      console.log(dataURL);
    }
  };



  //「共有」
  //他のコンポーネントと共有するもの
  const value = {
    //topライン
    handleUndo,
    handleRedo,
    handleSelectLayerClear,
    saveLayersBool,
    setSaveLayersBool,
    toggleLayersSaveCheck,

    //centerライン
    handleImage,
    copyLayerActive,
    handleCopyLayerConfirm,
    // updateBrushChange,
    // updateHsvBrushChange,
    // updateMixBrushChange,

    //レイヤー関係
    layersInfo,
    setLayersInfo,
    layersInfoCanvas,
    setLayersInfoCanvas,
    selectLayer,
    setSelectLayer,
    selectSecondLayer,
    setSelectSecondLayer,
    secondLayerSelectMode,
    setSecondLayerSelectMode,
    selectedLayerInfo,
    handleSwapLayers,
    handleMoveLayers,
    getLayersInfoData,
    selectSecondLayerInfo,
    handleCancelSecondLayer,
    backgroundLayerVisible,
    setBackgroundLayerVisible,

    //スケールパネル
    scaleFactor,
    setScaleFactor,
    handleScaleChange,
    dateAllCanvas,
    handleScaleChangeSlider,

    //サイズパネル
    toolSize,
    setToolSize,
    // updatetToolDetail,

    //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
    minSize,
    setMinSize,
    inputMinValue,
    setInputMinValue,
    updatetReductionDetail,
    getPencilParameters,
    getOilPenParameters,
    pencilPreviewCanvas,
    oilPenPreviewCanvas,

    //詳細パネル（選択ツール）
    getTemporaryLayersData,
    selectedAreaCanvas,
    handleConfirm,
    handleConfirmCancel,
    isGraphicsCreated,
    handleConfirmTransform,
    handleInversionClickChange,
    handleSelectAllArea,
    handleCopyDelete,
    selectLayerBlurValue,
    setSelectLayerBlurValue,
    selectToolBlurBool,
    setSelectToolBlurBool,
    handleSelectLayerBlurDecision,
    copyLayerCanvas,
    selectDeleteInversion,
    setSelectDeleteInversion,
    handleSelectFillColorChange,
    selectedAreaShow,
    setSelectedAreaShow,

    //詳細パネル（画像）
    defaultScaleMode,
    setDefaultScaleMode

  };


  return (
    <div>




<div
  className= "panel-tool-button-small midasi-t-five"
  onClick={sampleData}
>
  <span style={{ color: '#3e3e3e', fontSize: '12px' }}>pngデータ</span>
  
</div>

      <div ref={canvasContainerRef} style={{
          width: `${canvasSpaceSize.width}px`,
          height: `${canvasSpaceSize.height}px`,
          border: '1px solid black',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          background: '#262626',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        // onTouchStart={onTouchStart}
        // onTouchMove={onTouchMove}
        // onTouchEnd={onTouchEnd}
        id="cursorP5SaveRab"
      >
        <P5CanvasCoreShareProvider value={value}>
          {/* ツール切り替えに関するアラートメッセージ */}
          {toast && (
            <div
            className="alert-message"
              style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-60%, 40%)',
              }}
            >
              {message}
            </div>
          )}


    {/* 対象のレイヤーが選択されていない時に出るアラートメッセージ */}
    {layerToast && (
      <div
      className="alert-message"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-60%, 40%)',
          textAlign: 'left',
          lineHeight: '1.3',
          whiteSpace: 'pre-wrap'
        }}
      >
        {layerMessage}
      </div>
    )}

          <P5Cursor />
          {colorPalettePanelVisible && <P5ColorPalettePanel />}
          {mainPanelMode ? <P5DefaultPanel /> : <P5CompactPanel />}
          {layersInfoPanelVisible && <P5LayersInfoPanel />}
          {detailPanelVisible && <P5DetailPanel />}

          {sizePanelVisible && <P5SizePanel />}
          {scalePanelVisible && <P5ScalePanel />}
        </P5CanvasCoreShareProvider>

        <div
          ref={sketchRef}
          id={`userCanvas_${canvasImgId}`}
          onMouseDown={() => setP5DrawingEnabled(true)}
          onTouchStart={() => setP5DrawingEnabled(true)}
        ></div>
      </div>

      {/* <button onClick={getData}>レイヤーを手動保存</button> */}
      {/* <button onClick={savePc}>pcに保存</button> */}
      <div
        className= "panel-tool-button-small tooltip-container midasi-t-five"
        onClick={savePc}
        onTouchStart={savePc}
        style={{
          backgroundColor: '#c2c1c1',
          borderRadius: '5px',
          borderRight: '0.5px solid #4A4A4A',
          width: '90px',
          height: '40px',
          marginLeft: '659px',
          marginTop: '10px',
          boxShadow: 'black 1px 1px',
          textAlign: 'center'
        }}
      >
        <span style={{ color: '#3e3e3e', fontSize: '12px' }}>pcに保存(png)</span>
        
        <span className="tooltip-text" style={{ textAlign: 'left' }}>お客様のPCに作成された描画をpngで保存できます。</span>
      </div>






      { canvasP5ToPixi && (
          <div
          className= "panel-tool-button-small midasi-t-five"
          onClick={handleSample}
          onTouchStart={handleSample}
          style={{
            backgroundColor: '#c2c1c1',
            borderRadius: '5px',
            borderRight: '0.5px solid #4A4A4A',
            width: '150px',
            height: '40px',
            marginLeft: '659px',
            marginTop: '10px',
            boxShadow: 'black 1px 1px',
            textAlign: 'center',
            position: 'absolute',
            top: '600px',
            left: '-400px'
          }}
        >
          <span style={{ color: '#3e3e3e', fontSize: '12px' }}>イラストを作成</span>
        </div>
      )}

      {/* テスト用 */}
      {/* <div
        className="panel-tool-button"
        onClick={() => handleToolChange('inkPen')}
        onTouchStart={() => handleToolChange('inkPen')}
        style={{ backgroundColor: toolMode === 'inkPen' ? '#9199AE' : '#c2c1c1' }}
      >
        <i className="bi bi-pencil-fill"></i>
      </div> */}

    </div>
  );
};

  //「アンドゥ・リドゥ」関係
  class ExtendedUndo {
    constructor(maxHistoryCount) {
      this.maxHistoryCount = maxHistoryCount;
      this.history = [];
      this.current = -1; // 最初は履歴がないため
    }

    capture(layers) {
      const state = layers.map(layer => layer.get()); // すべてのレイヤーの状態をキャプチャ
      // 現在位置より後の履歴を削除
      this.history = this.history.slice(0, this.current + 1);
      this.history.push(state);
      this.current++;

      // 履歴の最大数を超えた場合、古い履歴を削除
      if (this.history.length > this.maxHistoryCount) {
        this.history.shift();
        this.current--;
      }
    }

    undo() {
      if (this.current > 0) {
        this.current--;
        return this.history[this.current]; // 履歴の状態を返す
      }
      return null;
    }

    redo() {
      if (this.current < this.history.length - 1) {
        this.current++;
        return this.history[this.current]; // 履歴の状態を返す
      }
      return null;
    }
  }

export { P5CanvasCore };


