import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import iro from '@jaames/iro';

function P5PointerEventsTest() {
  const sketchRef = useRef(); // Canvasを描画するdivへの参照を作成

  // 初期色を設定
  const [currentColor, setCurrentColor] = useState('rgba(255, 255, 255, 1)');
  const currentColorRef = useRef(currentColor);

  const wheelPickerRef = useRef(null);
  const boxPickerRef = useRef(null);

  // HSV用の管理
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(100);
  
  const hRef = useRef(h);
  const sRef = useRef(s);
  const vRef = useRef(v);

  const [inputH, setInputH] = useState('0');
  const [inputS, setInputS] = useState('0');
  const [inputV, setInputV] = useState('100');
  
  // ペンモードの状態の管理
  const [toolMode, setToolMode] = useState('betaPen');
  const toolModeRef = useRef(toolMode);
  const hsvModes = new Set(['inkPen', 'watercolorPen']);

  //ペンサイズ
  const [toolSize, setToolSize] = useState(1); // ツールサイズの初期値
  const [inputValue, setInputValue] = useState(String(toolSize)); // ユーザー入力値を一時的に保持する状態
  const toolSizeRef = useRef(toolSize);
  const [selectedSize, setSelectedSize] = useState(toolSize); // 選択されているツールサイズを追跡

  // ツールサイズの最小変動範囲(筆圧ペン専用)
  const [minSize, setMinSize] = useState(0.5);
  const minSizeRef = useRef(minSize);
  const [inputMinValue, setInputMinValue] = useState(String(minSize));

  const p5InstanceRef = useRef(null); // p5 インスタンスを保存するための ref
  const canvasRef = useRef(); // p5.jsのキャンバス参照を保持するための useRef
  const brushRef = useRef(null);
  const brushHsvRef = useRef(null);

  // 筆圧加算値
  const [pressureAdjustment, setPressureAdjustment] = useState(0);
  const pressureAdjustmentRef = useRef(pressureAdjustment);

  //S値のユーザーカスタム値
  const [userCustomS, setUserCustomS] = useState(0);
  const userCustomSRef = useRef(userCustomS);
  const [sMin, setSMin] = useState(0);
  const sMinRef = useRef(sMin);

  useEffect(() => {
    userCustomSRef.current = userCustomS;
  }, [userCustomS]);

  useEffect(() => {
    sMinRef.current = sMin;
  }, [sMin]);

  //V値のユーザーカスタム値
  const [userCustomV, setUserCustomV] = useState(0);
  const userCustomVRef = useRef(userCustomV);
  const [vMax, setVMax] = useState(0);
  const vMaxRef = useRef(vMax);

  useEffect(() => {
    userCustomVRef.current = userCustomV;
  }, [userCustomV]);

  useEffect(() => {
    vMaxRef.current = vMax;
  }, [vMax]);

  //bool値判定
  const [blur, setBlur] = useState(true);
  const [pressurePen, setPressurePen] = useState(true);
  const [sizeCustomBool, setSizeCustomBool] = useState(true);
  const [activeS, setActiveS] = useState(true);
  const [maxChangeSBool, setMaxChangeSBool] = useState(true);
  const [maxChangeVBool, setMaxChangeVBool] = useState(true);
  const [activeV, setActiveV] = useState(true);
  const blurRef = useRef(blur);
  const pressurePenRef = useRef(pressurePen);
  const sizeCustomBoolRef = useRef(sizeCustomBool);
  const activeSRef = useRef(activeS);
  const activeVRef = useRef(activeV);
  const maxChangeSBoolRef = useRef(maxChangeSBool);
  const maxChangeVBoolRef = useRef(maxChangeVBool);

  //ぼかし
  const [blurValue, setBlurValue] = useState(1);
  const blurValueRef = useRef(blurValue);
  const [inputBlurValue, setInputBlurValue] = useState(String(blurValue));
  const [blurValueMax, setBlurValueMax] = useState(0.3);

  //滑らかさ調整フォーム
  const [densityValue, setDensityValue] = useState(0.01);
  const densityValueRef = useRef(densityValue);
  const [inputDensityValue, setInputDensityValue] = useState(String(densityValue));

  const [waterDensityValue, setWaterDensityValue] = useState(20);
  const waterDensityValueRef = useRef(waterDensityValue);
  const [inputWaterDensityValue, setInputWaterDensityValue] = useState(String(waterDensityValue));

  //補間率の調整
  const [lerpRateMin, setLerpRateMin] = useState(0.1);
  const [lerpRateMax, setLerpRateMax] = useState(0.5);
  const lerpRateMinRef = useRef(lerpRateMin);
  const lerpRateMaxRef = useRef(lerpRateMax);
  const [inputLerpRateMin, setInputLerpRateMin] = useState(String(lerpRateMin));
  const [inputLerpRateMax, setInputLerpRateMax] = useState(String(lerpRateMax));

  //サイズ補間率
  const [rateSize, setRateSize] = useState(0.1);
  const rateSizeRef = useRef(rateSize);
  const [inputRateSize, setInputRateSize] = useState(String(rateSize));

  //S値の補間率の調整
  const [maxChangeS, setMaxChangeS] = useState(10);
  const [rateS, setRateS] = useState(0.1);
  const [inputRateS, setInputRateS] = useState(String(rateS));
  const maxChangeSRef = useRef(maxChangeS);
  const rateSRef = useRef(rateS);

  // V値の補間率の調整
  const [maxChangeV, setMaxChangeV] = useState(0);
  const [rateV, setRateV] = useState(0.1);
  const [inputRateV, setInputRateV] = useState(String(rateV));
  const maxChangeVRef = useRef(maxChangeV);
  const rateVRef = useRef(rateV);

  useEffect(() => {
    setInputBlurValue(String(blurValue));
  }, [blurValue]);

  useEffect(() => {
    blurRef.current = blur;
  }, [blur]);

  useEffect(() => {
    setInputDensityValue(String(densityValue));
  }, [densityValue]);

  useEffect(() => {
    setInputWaterDensityValue(String(waterDensityValue));
  }, [waterDensityValue]);

  useEffect(() => {
    setInputLerpRateMin(String(lerpRateMin));
  }, [lerpRateMin]);

  useEffect(() => {
    setInputLerpRateMax(String(lerpRateMax));
  }, [lerpRateMax]);

  useEffect(() => {
    setInputRateSize(String(rateSize));
  }, [rateSize]);

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
    maxChangeSRef.current = maxChangeS;
  }, [maxChangeS]);

  useEffect(() => {
    setMaxChangeS(10);
  }, [s]);

  useEffect(() => {
    setInputRateS(String(rateS));
  }, [rateS]);

  useEffect(() => {
    maxChangeVBoolRef.current = maxChangeVBool;
  }, [maxChangeVBool]);

  useEffect(() => {
    maxChangeVRef.current = maxChangeV;
  }, [maxChangeV]);

  useEffect(() => {
    setInputRateV(String(rateV));
  }, [rateV]);

  useEffect(() => {
    setMaxChangeV(10);
  }, [v]);

  useEffect(() => {
    blurValueRef.current = blurValue;
  }, [blurValue]);

  useEffect(() => {
    let blurMax;
    if (toolSize < 10) {
      blurMax = Math.round((toolSize / 4) * 10) / 10;
    } else {
      blurMax = Math.round((toolSize / 5) * 10) / 10;
    }
    let blurPrime = Math.min(blurValue, blurMax);
    setBlurValueMax(blurMax);
    setBlurValue(blurPrime);
  }, [toolSize]);

  const updateBlurValue = (newSize) => {
    if (newSize >= 0 && newSize <= blurValueMax) {
      setBlurValue(newSize);
      blurValueRef.current = newSize;
    }
  };

  const handleLerpBlurValueChange = (e) => {
    const value = e.target.value;
    setInputBlurValue(value);
  };

  const handleLerpBlurValueBlur = () => {
    const newSize = parseFloat(inputBlurValue);
    if (newSize >= 0 && newSize <= blurValueMax) {
      updateBlurValue(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputBlurValue(String(blurValue));
    }
  };

  useEffect(() => {
    const blurValueForm = document.getElementById('blurValueForm');
    const changeListener = (e) => {
      updateBlurValue(parseFloat(e.target.value));
    };
    blurValueForm.addEventListener('change', changeListener);
  }, []);

  const updateDensityValue = (newSize) => {
    if (newSize >= 0.005 && newSize <= 9999) {
      setDensityValue(newSize);
      densityValueRef.current = newSize;
    }
  };

  const handleLerpDensityValueChange = (e) => {
    const value = e.target.value;
    setInputDensityValue(value);
  };

  const handleLerpDensityValueBlur = () => {
    const newSize = parseFloat(inputDensityValue);
    if (newSize >= 0.005 && newSize <= 9999) {
      updateDensityValue(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputDensityValue(String(densityValue));
    }
  };

  const resetDensityValue = () => {
    setDensityValue(0.01);
  }

  const updateWaterDensityValue = (newSize) => {
    if (newSize >= 0.01 && newSize <= 100) {
      setWaterDensityValue(newSize);
      waterDensityValueRef.current = newSize;
    }
  };

  const handleLerpWaterDensityValueChange = (e) => {
    const value = e.target.value;
    setInputWaterDensityValue(value);
  };

  const handleLerpWaterDensityValueBlur = () => {
    const newSize = parseFloat(inputWaterDensityValue);
    if (newSize >= 0.01 && newSize <= 100) {
      updateWaterDensityValue(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputWaterDensityValue(String(waterDensityValue));
    }
  };

  const resetWaterDensityValue = () => {
    setWaterDensityValue(20);
  }

  useEffect(() => {
    const densityValueForm = document.getElementById('densityValueForm');
    const changeListener = (e) => {
      updateDensityValue(parseFloat(e.target.value));
    };
    densityValueForm.addEventListener('change', changeListener);
  }, []);


  useEffect(() => {
    const waterdensityValueForm = document.getElementById('waterdensityValueForm');
    const changeListener = (e) => {
      updateWaterDensityValue(parseFloat(e.target.value));
    };
    waterdensityValueForm.addEventListener('change', changeListener);
  }, []);

  const updateLerpRateMin = (newSize) => {
    if (newSize >= 0 && newSize <= 1) {
      setLerpRateMin(newSize);
      lerpRateMinRef.current = newSize;
    }
  };

  const handleLerpRateMinChange = (e) => {
    const value = e.target.value;
    setInputLerpRateMin(value);
  };

  const handleLerpRateMinBlur = () => {
    const newSize = parseFloat(inputLerpRateMin);
    if (newSize >= 0 && newSize <= 1) {
      updateLerpRateMin(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputLerpRateMin(String(lerpRateMin));
    }
  };

  const updateLerpRateMax = (newSize) => {
    if (newSize >= 0 && newSize <= 1) {
      setLerpRateMax(newSize);
      lerpRateMaxRef.current = newSize;
    }
  };

  const handleLerpRateMaxChange = (e) => {
    const value = e.target.value;
    setInputLerpRateMax(value);
  };

  const handleLerpRateMaxBlur = () => {
    const newSize = parseFloat(inputLerpRateMax);
    if (newSize >= 0 && newSize <= 1) {
      updateLerpRateMax(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputLerpRateMax(String(lerpRateMax));
    }
  };

  useEffect(() => {
    const lerpRateMinForm = document.getElementById('lerpRateMinForm');
    const changeListener = (e) => {
      updateLerpRateMin(parseFloat(e.target.value));
    };
    lerpRateMinForm.addEventListener('change', changeListener);
  }, []);

  useEffect(() => {
    const lerpRateMaxForm = document.getElementById('lerpRateMaxForm');
    const changeListener = (e) => {
      updateLerpRateMax(parseFloat(e.target.value));
    };
    lerpRateMaxForm.addEventListener('change', changeListener);
  }, []);

  const updateRateSize = (newSize) => {
    if (newSize >= 0 && newSize <= 1) {
      setRateSize(newSize);
      rateSizeRef.current = newSize;
    }
  };

  const handleLerpRateSizeChange = (e) => {
    const value = e.target.value;
    setInputRateSize(value);
  };

  const handleLerpRateSizeBlur = () => {
    const newSize = parseFloat(inputRateSize);
    if (newSize >= 0 && newSize <= 1) {
      updateRateSize(newSize);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputRateSize(String(rateSize));
    }
  };

  useEffect(() => {
    const rateSizeForm = document.getElementById('rateSizeForm');
    const changeListener = (e) => {
      updateRateSize(parseFloat(e.target.value));
    };
    rateSizeForm.addEventListener('change', changeListener);
  }, []);


  const updateRateS = (newSize) => {
    if (newSize >= 0 && newSize <= 1) {
      setRateS(newSize);
      rateSRef.current = newSize; // 直接toolSizeRefを更新
    }
  };

  const handleRateSChange = (e) => {
    const value = e.target.value;
    setInputRateS(value); // ユーザーの入力を一時的に保持
  };

  const handleRateSBlur = () => {
    const newSize = parseFloat(inputRateS);
    if (newSize >= 0 && newSize <= 1) {
      updateRateS(newSize); // 有効な値が入力されていれば更新
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputRateS(String(rateS));
    }
  };

  // ツールサイズの最小変動範囲(筆圧ペン専用)
  useEffect(() => {
    const rateSForm = document.getElementById('rateSForm');
    const changeListener = (e) => {
      updateRateS(parseFloat(e.target.value));
    };
    rateSForm.addEventListener('change', changeListener);
  }, []);

  const updateRateV = (newSize) => {
    if (newSize >= 0 && newSize <= 1) {
      setRateV(newSize);
      rateVRef.current = newSize; // 直接toolSizeRefを更新
    }
  };

  // フォームの変更をハンドルする関数
  const handleRateVChange = (e) => {
    const value = e.target.value;
    setInputRateV(value); // ユーザーの入力を一時的に保持
  };

  // フォーカスが外れた時の処理
  const handleRateVBlur = () => {
    const newSize = parseFloat(inputRateV);
    if (newSize >= 0 && newSize <= 1) {
      updateRateV(newSize); // 有効な値が入力されていれば更新
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputRateV(String(rateV));
    }
  };

  // ツールサイズの最小変動範囲(筆圧ペン専用)
  useEffect(() => {
    const rateVForm = document.getElementById('rateVForm');
    const changeListener = (e) => {
      updateRateV(parseFloat(e.target.value));
    };
    rateVForm.addEventListener('change', changeListener);
  }, []);


  const updateValueS = (change) => {
    setUserCustomS((prev) => {
      const S_base = sRef.current;
      // S_baseに基づいて許可される変動の最小値と最大値を設定
      const allowedMin = -7 * (S_base / 10);
      const allowedMax = S_base - 7 * (S_base / 10);
      
      // prev + changeがallowedMinとallowedMaxの範囲内に収まるように調整
      let updatedValue = Math.min(allowedMax, Math.max(allowedMin, prev + change));
  
      return updatedValue;
    });
  };

  const updateValueV = (change) => {
    setUserCustomV((prev) => {
      const V_base = vRef.current;
      const allowedMin = - (80 - (8 * (V_base / 10)));
      const allowedMax = (100-V_base)-(80 - (8 * (V_base / 10)));
      // 更新後の値が-80から20の範囲内に収まるように調整
      let updatedValue = Math.min(allowedMax, Math.max(allowedMin, prev + change));
      return updatedValue;
    });
  };

  const resetValueS = () => {
    setUserCustomS(0);
  }

  const resetValueV = () => {
    setUserCustomV(0);
  }

  const updateMaxChangeS = (change) => {
    setMaxChangeS((prev) => {
      let updatedValue = Math.min(s, Math.max(0, prev + change));
  
      return updatedValue;
    });
  };

  const updateMaxChangeV = (change) => {
    setMaxChangeV((prev) => {
      let updatedValue = Math.min(vMax, Math.max(0, prev + change));
  
      return updatedValue;
    });
  };

  // userCustomSの値が変更されたらupdateSminを呼び出す
  useEffect(() => {
    updateSmin();
  }, [s, userCustomS]);

  // userCustomVの値が変更されたらupdateVmaxを呼び出す
  useEffect(() => {
    updateVmax();
  }, [v, userCustomV]);

  const updateSmin = () => {
    const S_base = sRef.current;
    const UserCustomS = Math.round(userCustomSRef.current);
    let SX = Math.max(0, 7*(S_base / 10) + UserCustomS);
    let S_min = Math.max(0, S_base - SX);
    S_min = Math.min(S_base, S_min);

    setSMin(S_min);
  }

  const updateVmax = () => {
    const V_base = vRef.current;
    const UserCustomV = Math.round(userCustomVRef.current);
    let VX = Math.max(0, 80 - (8 * (V_base / 10)) + UserCustomV); 
    let V_max = Math.min(100, V_base + VX);
    V_max = Math.max(V_max, V_base);

    setVMax(V_max);
  }


  // 白色に設定する関数
  const setWhite = () => {
    const whiteColor = 'rgba(255, 255, 255, 1)'; // RGBA形式で白色を指定
    setCurrentColor(whiteColor);
    // setR(255);
    // setG(255);
    // setB(255);
    // setA(1);
    setH(0);
    setS(0);
    setV(100);
    setInputH(0);
    setInputS(0);
    setInputV(100);
    // カラーピッカーの色を更新
    if (wheelPickerRef.current && boxPickerRef.current) {
      wheelPickerRef.current.color.set(whiteColor);
      boxPickerRef.current.color.set(whiteColor);
    }
  };

  // 黒色に設定する関数
  const setBlack = () => {
    const blackColor = 'rgba(0, 0, 0, 1)'; // RGBA形式で黒色を指定
    setCurrentColor(blackColor);
    // setR(0);
    // setG(0);
    // setB(0);
    // setA(1);
    setH(0);
    setS(0);
    setV(0);
    setInputH(0);
    setInputS(0);
    setInputV(0);
    // カラーピッカーの色を更新
    if (wheelPickerRef.current && boxPickerRef.current) {
      wheelPickerRef.current.color.set(blackColor);
      boxPickerRef.current.color.set(blackColor);
    }
  };

  // HSV更新関数の修正
  const updateH = (newValue) => {
    if (newValue >= 0 && newValue <= 360) {
      setH(newValue);
      hRef.current = newValue;
      setInputH(newValue);
      updateColorHSV();
    }
  };

  const updateS = (newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      setS(newValue);
      sRef.current = newValue;
      setInputS(newValue);
      updateColorHSV();
    }
  };

  const updateV = (newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      setV(newValue);
      vRef.current = newValue;
      setInputV(newValue);
      updateColorHSV();
    }
  };

  // カラーピッカーとフォームの色を同期する関数
  const updateColorHSV = () => {
    // const newColor = `{ h: ${hRef.current}, s: ${sRef.current}, v: ${vRef.current} }`;
    const newColor = { h: hRef.current, s: sRef.current, v: vRef.current };
    setCurrentColor(newColor);
    if (wheelPickerRef.current && boxPickerRef.current) {
      wheelPickerRef.current.color.set(newColor);
      boxPickerRef.current.color.set(newColor);
    }
  };

  // HSVフォームの値を更新する関数
  const handleHSVChange = (e, colorComponent) => {
    // 入力値を一時的に保存するだけで、ここでは値の検証を行わない
    switch (colorComponent) {
      case 'h':
        setInputH(e.target.value);
        break;
      case 's':
        setInputS(e.target.value);
        break;
      case 'v':
        setInputV(e.target.value);
        break;
      default:
        break;
    }
  };

  // フォームのフォーカスが外れた時の処理の修正
  const handleBlurH = () => {
    const newValue = parseInt(inputH, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 360) {
      setInputH(String(inputH)); // 不正な値の場合は直前の値にリセット
    } else {
      updateH(newValue); // 有効な値が入力されていれば更新
    }
  };

  // フォームのフォーカスが外れた時の処理の修正
  const handleBlurS = () => {
    const newValue = parseInt(inputS, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      setInputS(String(inputS)); // 不正な値の場合は直前の値にリセット
    } else {
      updateS(newValue); // 有効な値が入力されていれば更新
    }
  };

  // フォームのフォーカスが外れた時の処理の修正
  const handleBlurV = () => {
    const newValue = parseInt(inputV, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      setInputV(String(inputV)); // 不正な値の場合は直前の値にリセット
    } else {
      updateV(newValue); // 有効な値が入力されていれば更新
    }
  };

  // カラーピッカーが外部から変更された場合にinputValueも更新する
  useEffect(() => {
    setInputH(String(inputH));
    setInputS(String(inputS));
    setInputV(String(inputV));
  }, [inputH, inputS, inputV]);

  useEffect(() => {
    // 各useEffectでの参照更新の修正
    hRef.current = h;
    sRef.current = s;
    vRef.current = v;
  }, [h, s, v]);

  // toolSizeが外部から変更された場合にinputValueも更新する
  useEffect(() => {
    setInputMinValue(String(minSize));
  }, [minSize]);

  useEffect(() => {
    setMinSize(toolSize / 2);
    setInputMinValue(String(toolSize / 2));
  }, [toolSize]);

  // サイズボタンの選択をハンドルする関数
  const handleSizeSelect = (size) => {
    const newSize = parseFloat(size);
    setToolSize(newSize);
    setSelectedSize(newSize); // 選択されたサイズを更新
    toolSizeRef.current = newSize; // 直接toolSizeRefを更新
  };

  // ツールサイズの更新処理を関数として定義
  const updateToolSize = (newSize) => {
    if (newSize >= 0.1 && newSize <= 100) {
      setToolSize(newSize);
      setSelectedSize(newSize); // 選択されたサイズを更新
      toolSizeRef.current = newSize; // 直接toolSizeRefを更新
      // console.log(newSize);
    }
  };

  // フォームの変更をハンドルする関数
  const handleToolSizeChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // ユーザーの入力を一時的に保持
  };

  // フォーカスが外れた時の処理
  const handleBlur = () => {
    const newSize = parseFloat(inputValue);
    if (newSize >= 0.1 && newSize <= 100) {
      updateToolSize(newSize); // 有効な値が入力されていれば更新
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputValue(String(toolSize));
    }
  };

  // ツールサイズの更新処理を関数として定義
  const updateMinSize = (newSize) => {
    if (newSize >= 0.1 && newSize <= toolSize) {
      setMinSize(newSize);
      minSizeRef.current = newSize; // 直接toolSizeRefを更新
    }
  };

  // フォームの変更をハンドルする関数
  const handleMinSizeChange = (e) => {
    const value = e.target.value;
    setInputMinValue(value); // ユーザーの入力を一時的に保持
  };

  // フォーカスが外れた時の処理
  const handleMinBlur = () => {
    const newSize = parseFloat(inputMinValue);
    if (newSize >= 0.1 && newSize <= toolSize) {
      updateMinSize(newSize); // 有効な値が入力されていれば更新
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputMinValue(String(minSize));
    }
  };
  
  // toolSizeが外部から変更された場合にinputValueも更新する
  useEffect(() => {
    setInputValue(String(toolSize));
  }, [toolSize]);
  
  // ツールサイズ
  useEffect(() => {
    const sizeButtons = document.querySelectorAll('.sizeBtn');
    const clickListener = (e) => {
      const size = e.currentTarget.getAttribute('data-size');
      updateToolSize(parseFloat(size));
    };

    sizeButtons.forEach(div => {
      div.addEventListener('click', clickListener);
    });

    const toolSizeForm = document.getElementById('toolSizeForm');
    const changeListener = (e) => {
      updateToolSize(parseFloat(e.target.value));
    };
    toolSizeForm.addEventListener('change', changeListener);

    return () => {
      sizeButtons.forEach(div => {
        div.removeEventListener('click', clickListener);
      });
      toolSizeForm.removeEventListener('change', changeListener);
    };
  }, []);

  // ツールサイズの最小変動範囲(筆圧ペン専用)
  useEffect(() => {
    const minSizeForm = document.getElementById('minSizeForm');
    const changeListener = (e) => {
      updateMinSize(parseFloat(e.target.value));
    };
    minSizeForm.addEventListener('change', changeListener);
  }, []);

  // フォームのフォーカスについて
  useEffect(() => {
    // タッチイベントリスナーを設定
    const handleTouchOutside = (event) => {
      // 現在フォーカスされている要素を取得
      const activeElement = document.activeElement;
      // フォーカスされている要素が input または textarea であるか確認
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        // タッチされた要素がフォーム要素でない場合、フォーカスを外す
        if (!activeElement.contains(event.target)) {
          activeElement.blur();
        }
      }
    };
  
    document.addEventListener('touchstart', handleTouchOutside);
  
    // クリーンアップ関数
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, []);

  const increment = (amount) => {
    setPressureAdjustment((prev) => Math.min(0.5, prev + amount));
  };

  const decrement = (amount) => {
    setPressureAdjustment((prev) => Math.max(-0.5, prev - amount));
  };

  useEffect(() => {
    pressureAdjustmentRef.current = pressureAdjustment;
  }, [pressureAdjustment]);

  useEffect(() => {
    toolModeRef.current = toolMode;
    // console.log(toolModeRef.current);
  }, [toolMode]);

  useEffect(() => {
    currentColorRef.current = currentColor;
  }, [currentColor]);

  useEffect(() => {
    // 円形カラーピッカーの初期化
    wheelPickerRef.current = new iro.ColorPicker("#wheel-picker-container", {
      width: 140,
      color: currentColor,
      layout: [
        {
          component: iro.ui.Wheel, // 円形カラーピッカー
          options: {wheelLightness: false}
        },
        {
          component: iro.ui.Slider, // 明度調整バー
          options: {
            sliderType: 'value' // 明度（Value）を調整するためのスライダー
          }
        },
        {
          component: iro.ui.Slider, // 色相調整バー
          options: {
            sliderType: 'alpha' // 透明度（alpha）を調整するためのスライダー
          }
        }
      ]
    });

    // 四角形カラーピッカーの初期化
    boxPickerRef.current = new iro.ColorPicker("#box-picker-container", {
      width: 140,
      color: currentColor,
      layout: [
        {
          component: iro.ui.Box, // 四角形カラーピッカー
          options: {}
        },
        {
          component: iro.ui.Slider, // 色相調整バー
          options: {
            sliderType: 'hue' // 色相（Hue）を調整するためのスライダー
          }
        },
        {
          component: iro.ui.Slider, // 色相調整バー
          options: {
            sliderType: 'alpha' // 透明度（alpha）を調整するためのスライダー
          }
        }
      ]
    });

    // カラーピッカーで色が変更されたときの同期処理
    const syncColors = (color) => {
      setCurrentColor(color.rgbaString); // RGBA形式で色情報を更新
      // console.log('RGBAの値', color.rgbaString);
      if (wheelPickerRef.current.color.rgbaString !== color.rgbaString) {
        wheelPickerRef.current.color.set(color.rgbaString);
      }
      if (boxPickerRef.current.color.rgbaString !== color.rgbaString) {
        boxPickerRef.current.color.set(color.rgbaString);
      }
    };

    //HSV用の処理
    const syncColorsHsv = (color) => {
    // Hの値は0から360の範囲、SとVの値は0から100の範囲であるため、整数に丸める
    const roundedH = Math.round(color.hsv.h);
    const roundedS = Math.round(color.hsv.s);
    const roundedV = Math.round(color.hsv.v);

      // HSV形式でH値の情報を更新
      setH(color.hsv.h);
      setInputH(roundedH); // フォームの表示値を整数に
      // handleBlurH();

      // V値が0の場合、S値を0として設定
      if (color.hsv.v === 0) {
        setS(0);
        setInputS('100');
      } else {
        setS(color.hsv.s); // それ以外の場合、受け取ったS値で更新
        setInputS(roundedS);
      }

      // HSV形式でV値の情報を更新
      setV(color.hsv.v);
      setInputV(roundedV);

      // console.log('HSVの値', color.hsv);
      // console.log('Hの値', color.hsv.h);
      // console.log('Sの値', color.hsv.s);
      // console.log('Sの値', sRef.current);
      // console.log('Vの値', color.hsv.v);
    }


    wheelPickerRef.current.on(["color:init", "color:change"], function(color) {
      syncColors(color);
      syncColorsHsv(color);
    });

    boxPickerRef.current.on(["color:init", "color:change"], function(color) {
      syncColors(color);
      syncColorsHsv(color);
    });
  }, []);

  useEffect(() => {
    if (p5InstanceRef.current && toolSize) {
      p5InstanceRef.current.updateBrush(toolSize);
    }
  }, [toolSize]);

  useEffect(() => {
    const sketch = (p) => {
      let isBrush = false;
      let prev = { x: 0, y: 0 };
      let pressure = 0.5;
      let layer;
      let currentStrokeSize;
      let brushSize = 0.5;
      let startHSV = false;

      p.setup = () => {
        canvasRef.current = p.createCanvas(400, 400);
        p.background(220);
        p.noStroke();
        p.smooth();
        brushRef.current = p.createGraphics(brushSize * 4, brushSize * 4);
        brushRef.current.noFill();
        brushHsvRef.current = p.createGraphics(brushSize * 16, brushSize * 16);
        brushHsvRef.current.noFill();
        brushHsvRef.current.colorMode(p.HSB, 360, 100, 100);
        layer = p.createGraphics(400, 400);
        // layer.blendMode(p.BLEND);

        // ブラシのグラデーションを作成（中心を黒で、外側に向かって透明度を上げる）
        for (let r = brushSize * 2; r > 0; --r) {
          // let alpha = p.map(r, 0, brushSize * 2, 0, 255); // 外側に向かって透明度を減少
          // brush.stroke(0, alpha);
          brushRef.current.stroke(0);
          brushRef.current.ellipse(brushSize * 2, brushSize * 2, r, r);
        }
        brushRef.current.filter(p.BLUR, 1);

        for (let r = brushSize * 2; r > 0; --r) {
          // let alpha = p.map(r, 0, brushSize * 2, 0, 255); // 外側に向かって透明度を減少
          // brush.stroke(0, alpha);
          brushHsvRef.current.stroke(0);
          brushHsvRef.current.ellipse(brushSize * 2, brushSize * 2, r, r);
        }
        brushHsvRef.current.filter(p.BLUR, 1);

        // タッチ操作の場合、デフォルトのスクロールやズームを無効化
        canvasRef.current.touchStarted((event) => {
          if (event.cancelable) {
            event.preventDefault();
          }
        });
      };

      p.draw = () => {
        p.background(220);
        p.image(layer, 0, 0);
      };

      p.updateBrush = (newToolSize) => {
        brushSize = newToolSize / 2;
        brushRef.current = p.createGraphics(brushSize * 4, brushSize * 4);
        brushRef.current.noFill();

        brushHsvRef.current = p.createGraphics(brushSize * 16, brushSize * 16);
        brushHsvRef.current.noFill();
        brushHsvRef.current.colorMode(p.HSB, 360, 100, 100);
  
        // for (let r = brushSize * 2; r > 0; --r) {
        //   brushRef.current.stroke(0);
        //   brushRef.current.ellipse(brushSize * 2, brushSize * 2, r, r);
        // }
        // brushRef.current.filter(p.BLUR, 1);
      };

      // RGBモードで描画するための関数（こちらはp5関数を使用する）
      p.mousePressed = () => {
        if (toolModeRef.current === 'betaPen') {
          isBrush = true;
          layer.strokeWeight(toolSizeRef.current);
          layer.stroke(currentColorRef.current);
          layer.point(p.mouseX, p.mouseY);
        } else if (toolModeRef.current === 'dropper') {
          if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            let c = p.get(p.mouseX, p.mouseY);
            // コンソールに色情報を出力
            // console.log(c);
            // RGBA形式の色情報をiro.jsのカラーピッカーにセット
            const colorString = `rgba(${c[0]},${c[1]},${c[2]},${c[3] / 255})`;
            wheelPickerRef.current.color.set(colorString);
            boxPickerRef.current.color.set(colorString);
          }
        } else if (toolModeRef.current === 'mmPen') {
          isBrush = true;
        }
        prev.x = p.mouseX;
        prev.y = p.mouseY;
      };

      p.mouseDragged = () => {
        if (isBrush) {
          if (toolModeRef.current === 'betaPen') {
            layer.strokeWeight(toolSizeRef.current);
            layer.stroke(currentColorRef.current);
            layer.line(prev.x, prev.y, p.mouseX, p.mouseY);
          } else if (toolModeRef.current === 'mmPen') {

            brushRef.current.clear();
            // カスタムペンの位置を確認する用
            // brushRef.current.background(255);

            brushRef.current.stroke(currentColorRef.current);
            for (let r = brushSize * 2; r > 0; --r) {
              brushRef.current.ellipse(brushSize * 2, brushSize * 2, r, r);
            }
            if (blurRef.current) {
              const blurValue = blurValueRef.current;
              brushRef.current.filter(p.BLUR, blurValue);
            }

            let waterDensity = waterDensityValueRef.current;
            let steps = p.dist(prev.x, prev.y, p.mouseX, p.mouseY);
            for (let i = 0; i < steps; i += brushSize / waterDensity) {
              let x = p.lerp(prev.x, p.mouseX, i / steps);
              let y = p.lerp(prev.y, p.mouseY, i / steps);
              layer.image(brushRef.current, x - brushSize * 2, y - brushSize * 2);
            }
          }
          prev.x = p.mouseX;
          prev.y = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        if (toolModeRef.current === 'betaPen') {
          isBrush = false;
        } else if (toolModeRef.current === 'mmPen') {
          isBrush = false;
        }
      };

      // HSVモードで描画するための関数（こちらは「Pointer Events API」イベントを使用する）
      p.startHSVDrawing = () => {
        console.log('HSVモードフラグstart', startHSV);
        if (!startHSV) {
          startHSV = true;
          const canvasElement = canvasRef.current.elt; // canvasの実DOM要素にアクセス
          canvasElement.addEventListener('pointerdown', (event) => p.pointerDown(event));
          canvasElement.addEventListener('pointermove', (event) => p.pointerMove(event));
          canvasElement.addEventListener('pointerup', (event) => p.pointerUp(event));
          canvasElement.addEventListener('pointerleave', (event) => p.pointerUp(event));
        }
      };

      // p5のsetup関数内やp5オブジェクトに追加する関数でイベントリスナーを削除するstopDrawing関数を定義
      p.stopDrawing = () => {
        console.log('HSVモードフラグstop', startHSV);
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
        if (hsvModes.has(toolModeRef.current)) {
          layer.colorMode(p.HSB, 360, 100, 100);
          // brushRef.current.colorMode(p.HSB, 360, 100, 100);
          isBrush = true;
          pressure = event.pressure;
          prev.x = event.offsetX;
          prev.y = event.offsetY;
        }
      }

      p.pointerMove = (event) => {
        if (hsvModes.has(toolModeRef.current) && isBrush) {
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
          let colorH = hRef.current

          // S値処理
          let colorS;
          const S_base = sRef.current;
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
          const V_base = vRef.current;
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

          if (toolModeRef.current === 'inkPen') {
            // 移動距離を基にしたstepsの計算を、一定の密度で補間点を生成する方式に変更
            let distance = p.dist(prev.x, prev.y, event.offsetX, event.offsetY);
            let density = densityValueRef.current; // 補間点の間隔（小さくするほど補間点が密になる）
            let steps = distance / density;

            for (let i = 0; i <= steps; i++) {
              let lerpAmount = i / steps;
              let x = p.lerp(prev.x, event.offsetX, lerpAmount);
              let y = p.lerp(prev.y, event.offsetY, lerpAmount);

              // ここで補間点を使用して線を描画
              layer.strokeWeight(strokeWeightBasedOnPressure);
              layer.stroke(colorH, colorS, colorV);
              layer.line(prev.x, prev.y, x, y); // 前の点から現在の補間点まで線を描く

              prev.x = x; // 前の点を更新
              prev.y = y;
            }
          } else if (toolModeRef.current === 'watercolorPen') {
            let waterDensity = waterDensityValueRef.current;
            let strokeWeightBasedOnPressurehalf = strokeWeightBasedOnPressure / 2;
            brushHsvRef.current.clear();
            // カスタムペンの位置を確認する用
            // brushHsvRef.current.background(255);

            brushHsvRef.current.stroke(colorH, colorS, colorV);
            for (let r = strokeWeightBasedOnPressurehalf * 2; r > 0; --r) {
              brushHsvRef.current.ellipse(strokeWeightBasedOnPressurehalf * 8, strokeWeightBasedOnPressurehalf * 8, r, r);
            }
            if (blurRef.current) {
              const blurValue = blurValueRef.current;
              brushHsvRef.current.filter(p.BLUR, blurValue);
            }

            prev.x = event.offsetX;
            prev.y = event.offsetY;
            let steps = p.dist(prev.x, prev.y, p.mouseX, p.mouseY);
            for (let i = 0; i < steps; i += strokeWeightBasedOnPressurehalf / waterDensity) {
              let x = p.lerp(prev.x, p.mouseX, i / steps);
              let y = p.lerp(prev.y, p.mouseY, i / steps);
              layer.image(brushHsvRef.current, x - strokeWeightBasedOnPressurehalf * 8, y - strokeWeightBasedOnPressurehalf * 8); // ブラシの中心をマウス位置に合わせて描画
            }
          }
        }
      }

      p.pointerUp = (event) => {
        if (hsvModes.has(toolModeRef.current)) {
          isBrush = false;
          currentStrokeSize = undefined;
          // 描画が終了したらRGBモードに戻す
          layer.colorMode(p.RGB, 255);
          // brushRef.current.colorMode(p.RGB, 255);
        }
      }
    };
    // p5インスタンスに保存
    p5InstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    }
  }, []);
  
  useEffect(() => {
    // penModeが変更されたときにtogglePenMode関数を呼び出す
    if (p5InstanceRef.current) {
      if (hsvModes.has(toolMode)) {
        p5InstanceRef.current.startHSVDrawing(); // HSVモードへの切り替え
      } else {
      // HSVモードへの切り替えの前に、以前のイベントリスナーを削除する
      p5InstanceRef.current.stopDrawing();
      }
    }
  }, [toolMode]);

  
  const selectBetaPenMode = () => setToolMode('betaPen');

  const selectMmPenMode = () => setToolMode('mmPen');

  const selectInkPenMode = () => setToolMode('inkPen');

  // スポイトモードに切り替える関数
  const setDropperMode = () => setToolMode('dropper');

  const selectWatercolorPenMode = () => setToolMode('watercolorPen');



  return (
    <div>
      <div className="flex-between">
        <div>
          <span>筆圧変動が遅い時の補間率：</span>
          <input
            type="number"
            id="lerpRateMinForm"
            min="0"
            max="1"
            step="0.1"
            style={{ width: '100px' }}
            value={inputLerpRateMin} // ユーザー入力をvalueとして使用
            onChange={handleLerpRateMinChange} // onChangeイベントハンドラを指定
            onBlur={handleLerpRateMinBlur} // フォーカスが外れた時のイベントハンドラを追加
          />
        </div>
          <div>
          <span>筆圧変動が早い時の補間率：</span>
          <input
            type="number"
            id="lerpRateMaxForm"
            min="0"
            max="1"
            step="0.1"
            style={{ width: '100px' }}
            value={inputLerpRateMax} // ユーザー入力をvalueとして使用
            onChange={handleLerpRateMaxChange} // onChangeイベントハンドラを指定
            onBlur={handleLerpRateMaxBlur} // フォーカスが外れた時のイベントハンドラを追加
          />
        </div>
      </div> 

      <div>
        <button onClick={() => decrement(0.1)}>-0.1</button>
        <button onClick={() => decrement(0.05)}>-0.05</button>
        <span>{pressureAdjustment.toFixed(2)}</span>
        <button onClick={() => increment(0.05)}>+0.05</button>
        <button onClick={() => increment(0.1)}>+0.1</button>
      </div>

      <div className="flex">
        <div>
          <button onClick={() => updateValueS(5)}>-5</button>
          <button onClick={() => updateValueS(10)}>-10</button>
          {/* <span>S値の変動値の調整：{userCustomS}</span> */}
          <span>S値の最小値：{Math.floor(sMin)}</span>
          <span>S値の最大値：{inputS}</span>
          <button onClick={() => updateValueS(-10)}>+10</button>
          <button onClick={() => updateValueS(-5)}>+5</button>
        </div>
        <button onClick={resetValueS}>S値の変動値をリセット</button>
        <label>
          <input
            type="checkbox"
            checked={activeS}
            onChange={(e) => setActiveS(e.target.checked)}
          /> S値に筆圧をつける
        </label>
      </div>

      <div className="flex-between">
        <div className="toolsize-form">
          <input
            type="number"
            id="rateSForm"
            min="0"
            max="1"
            step="0.1"
            style={{ width: '100px' }}
            value={inputRateS} // ユーザー入力をvalueとして使用
            onChange={handleRateSChange} // onChangeイベントハンドラを指定
            onBlur={handleRateSBlur} // フォーカスが外れた時のイベントハンドラを追加
          />
        </div> 

        <div>
          <button onClick={() => updateMaxChangeS(-10)}>-10</button>
          <button onClick={() => updateMaxChangeS(-5)}>-5</button>
          <span>S値の変動：{Math.round(maxChangeS)}</span>
          <button onClick={() => updateMaxChangeS(5)}>+5</button>
          <button onClick={() => updateMaxChangeS(10)}>+10</button>
        </div>

        <div>
        <label>
          <input
            type="checkbox"
            checked={maxChangeSBool}
            onChange={(e) => setMaxChangeSBool(e.target.checked)}
          /> S値に変動具合をつける
          </label>
        </div>
      </div>

      <div>
        <button onClick={() => updateValueV(-10)}>-10</button>
        <button onClick={() => updateValueV(-5)}>-5</button>
        {/* <span>V値の変動値の調整：{userCustomV}</span> */}
        <span>V値の最小値：{inputV}</span>
        <span>V値の最大値：{Math.ceil(vMax)}</span>
        <button onClick={() => updateValueV(5)}>+5</button>
        <button onClick={() => updateValueV(10)}>+10</button>
      </div>
      <button onClick={resetValueV}>V値の変動値をリセット</button>
      <label>
        <input
          type="checkbox"
          checked={activeV}
          onChange={(e) => setActiveV(e.target.checked)}
        /> V値に筆圧をつける
      </label>

      <div className="flex">
        <div className="toolsize-form">
            <input
              type="number"
              id="rateVForm"
              min="0"
              max="1"
              step="0.1"
              style={{ width: '100px' }}
              value={inputRateV}
              onChange={handleRateVChange}
              onBlur={handleRateVBlur}
            />
          </div> 

        <div>
          <button onClick={() => updateMaxChangeV(-10)}>-10</button>
          <button onClick={() => updateMaxChangeV(-5)}>-5</button>
          <span>V値の変動：{Math.round(maxChangeV)}</span>
          <button onClick={() => updateMaxChangeV(5)}>+5</button>
          <button onClick={() => updateMaxChangeV(10)}>+10</button>
        </div>

        <div>
          <label>
          <input
            type="checkbox"
            checked={maxChangeVBool}
            onChange={(e) => setMaxChangeVBool(e.target.checked)}
          /> V値に変動具合をつける
          </label>
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={blur}
            onChange={(e) => setBlur(e.target.checked)}
          /> ブラシをぼかす
          </label>
      </div>
      <div>
        <span>最大ぼかし値：{blurValueMax}</span>
        <span>ぼかし：</span>
        <input
          type="number"
          id="blurValueForm"
          min="0"
          max="100"
          step="1"
          style={{ width: '70px' }}
          value={inputBlurValue}
          onChange={handleLerpBlurValueChange}
          onBlur={handleLerpBlurValueBlur}
        />
      </div>

      <div className="flex-between tool-group">
        {["0.3", "0.5", "1", "1.5", "2", "3", "5", "7"].map((size) => (
          <div
            key={size}
            className={`sizeBtn ${selectedSize === parseFloat(size) ? "selected-size-btn" : ""}`}
            data-size={size}
            onClick={() => handleSizeSelect(size)}
            onTouchStart={() => handleSizeSelect(size)} // タッチ操作をサポート
          >
            <div><i className="bi bi-circle-fill" style={{ fontSize: `${size}px` }}></i></div>
            <div>{size}</div>
          </div>
        ))}
        </div>

      <div className="flex">
        <div>
          <span>サイズの補間率：</span>
          <input
            type="number"
            id="rateSizeForm"
            min="0"
            max="1"
            step="0.1"
            style={{ width: '150px' }}
            value={inputRateSize}
            onChange={handleLerpRateSizeChange}
            onBlur={handleLerpRateSizeBlur}
          />
        </div>
        <div className="toolsize-form">
          <span>最小ペンサイズ：</span>
          <input
            type="number"
            id="minSizeForm"
            min="0.1"
            max={toolSize}
            step="0.1"
            value={inputMinValue} // ユーザー入力をvalueとして使用
            onChange={handleMinSizeChange} // onChangeイベントハンドラを指定
            onBlur={handleMinBlur} // フォーカスが外れた時のイベントハンドラを追加
          /><span>px</span>
        </div>
        <span> 〜 </span>
        <div className="toolsize-form">
        <span>ペンサイズ：</span>
          <input
            type="number"
            id="toolSizeForm"
            min="0.1"
            max="100"
            step="0.1"
            value={inputValue} // ユーザー入力をvalueとして使用
            onChange={handleToolSizeChange} // onChangeイベントハンドラを指定
            onBlur={handleBlur} // フォーカスが外れた時のイベントハンドラを追加
          /><span>px</span>
        </div> 
        <label>
          <input
            type="checkbox"
            checked={pressurePen}
            onChange={(e) => setPressurePen(e.target.checked)}
          /> ペンに筆圧をつける
        </label>
        <label>
          <input
            type="checkbox"
            checked={sizeCustomBool}
            onChange={(e) => setSizeCustomBool(e.target.checked)}
          /> ペンの変動具合を調整する
        </label>
      </div>
      <div className="flex-between">
        <div>
          <span>インクペンの滑らかさ：</span>
          <input
            type="number"
            id="densityValueForm"
            min="0.005"
            max="9999"
            step="0.001"
            style={{ width: '70px' }}
            value={inputDensityValue}
            onChange={handleLerpDensityValueChange}
            onBlur={handleLerpDensityValueBlur}
          />
          <button onClick={resetDensityValue}>インクペンの滑らかさをデフォルトに戻す</button>
        </div>
        
        <div>
          <span>ミリ・水彩のブラシサイズの変化率：</span>
          <input
            type="number"
            id="waterdensityValueForm"
            min="0.01"
            max="100"
            step="0.01"
            style={{ width: '70px' }}
            value={inputWaterDensityValue}
            onChange={handleLerpWaterDensityValueChange}
            onBlur={handleLerpWaterDensityValueBlur}
          />
          <button onClick={resetWaterDensityValue}>ミリ・水彩のサイズの変化率をデフォルトに戻す</button>
        </div>
      </div>

      {/* 白色に設定するボタン */}
      <div
        onClick={setWhite}
        onTouchStart={setWhite}
        className="specialcolor"
        style={{ cursor: 'pointer', backgroundColor: '#858585' }}>
      </div>

      {/* 黒色に設定するボタン */}
      <div
        onClick={setBlack}
        onTouchStart={setBlack}
        className="specialcolor"
        style={{ cursor: 'pointer', backgroundColor: '#000' }}>
      </div>
      {/* HSVフォーム */}
      <div className="rgba-form">
        <input type="number" value={inputH} onChange={(e) => handleHSVChange(e, 'h')} onBlur={handleBlurH} min="0" max="360" />H
        <input type="number" value={inputS} onChange={(e) => handleHSVChange(e, 's')} onBlur={handleBlurS} min="0" max="100" />S
        <input type="number" value={inputV} onChange={(e) => handleHSVChange(e, 'v')} onBlur={handleBlurV} min="0" max="100" />V
      </div>

      <div ref={sketchRef}></div>
      <div className="flex">
        <div id="wheel-picker-container" style={{ marginBottom: "20px" }}></div> {/* 円形カラーピッカー */}
       <div id="box-picker-container" style={{ marginBottom: "20px" }}></div> {/* 四角形カラーピッカー */}
      </div>
      <div>
        <button className="pain-button" onClick={selectBetaPenMode} onTouchStart={selectBetaPenMode} style={{ backgroundColor: toolMode === 'betaPen' ? '#9199AE' : '#c2c1c1' }}>beta</button>
        <button className="pain-button" onClick={selectMmPenMode} onTouchStart={selectMmPenMode} style={{ backgroundColor: toolMode === 'mmPen' ? '#9199AE' : '#c2c1c1' }}>mm</button>
        <button className="pain-button" onClick={selectInkPenMode} onTouchStart={selectInkPenMode} style={{ backgroundColor: toolMode === 'inkPen' ? '#9199AE' : '#c2c1c1' }}>ink</button>
        <button className="pain-button" onClick={selectWatercolorPenMode} onTouchStart={selectWatercolorPenMode} style={{ backgroundColor: toolMode === 'watercolorPen' ? '#9199AE' : '#c2c1c1' }}>water</button>
        <div className="pain-button" onClick={setDropperMode} onTouchStart={setDropperMode} style={{ backgroundColor: toolMode === 'dropper' ? '#9199AE' : '#c2c1c1' }}>
          <i className="bi bi-eyedropper"></i>
        </div>
      </div>



      <div
      className="panel-tool-button"
    >
      <svg id="_レイヤー_8" data-name="レイヤー 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15">
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
    </div>






    </div>
    
  )
}

export default P5PointerEventsTest;


