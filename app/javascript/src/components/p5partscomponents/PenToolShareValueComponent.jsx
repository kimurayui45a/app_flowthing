import React, { useEffect, useRef, useState } from 'react';
import { useP5ToolModeContext } from '../P5ModeContext';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5Color } from '../P5ColorContext';
import { DotPenPartsComponent } from './DotPenPartsComponent';


const PenToolShareValueComponent = ({penToolShareParts, tool, inputValue, minValue, maxValue, blurBool, setBlurBool, selectBlurValue}) => {

  const { 
    toolMode
  } = useP5ToolModeContext();

  const { 
  //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
  minSize,
  setMinSize,
  inputMinValue,
  setInputMinValue,
  toolSize,
  updatetReductionDetail
  } = useP5CanvasCoreShare();

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
    inputS,
    inputV
  } = useP5Color();

  const {
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

    //詳細パネル（ペンツール...インクペン滑らかさ）
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
    setMixBlur
  } = useP5PenToolParametersContext();



  //詳細パネル（ペンツール...筆圧変動に関する補間率）
  //補間率の調整（「筆圧変動が遅い時の補間率」フォーム）
  const updateLerpRateMin = (newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setLerpRateMin(newValue);
      setInputLerpRateMin(String(newValue));
    }
  };

  const handleLerpRateMinChange = (e) => {
    const value = e.target.value;
    setInputLerpRateMin(value);
  };

  const handleLerpRateMinBlur = () => {
    const inputNewValue = parseFloat(inputLerpRateMin);
    const newValue = Math.round(inputNewValue * 1000) / 1000;
    if (newValue >= 0 && newValue <= 1) {
      updateLerpRateMin(newValue);
    } else {
      setInputLerpRateMin(String(lerpRateMin));
    }
  };

  //補間率の調整（「筆圧変動が早い時の補間率」フォーム）
  const updateLerpRateMax = (newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setLerpRateMax(newValue);
      setInputLerpRateMax(String(newValue));
    }
  };

  const handleLerpRateMaxChange = (e) => {
    const value = e.target.value;
    setInputLerpRateMax(value);
  };

  const handleLerpRateMaxBlur = () => {
    const inputNewValue = parseFloat(inputLerpRateMax);
    const newValue = Math.round(inputNewValue * 1000) / 1000;
    if (newValue >= 0 && newValue <= 1) {
      updateLerpRateMax(newValue);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputLerpRateMax(String(lerpRateMax));
    }
  };

  //「変動率調整」を全てデフォルトに戻す
  const resetLerpRateValue = () => {
    setLerpRateMin(0.1);
    setLerpRateMax(0.5);
    setPressureAdjustment(0);
  }

  // 筆圧加算値
  const updatePressureAdjustment = (change) => {
    setPressureAdjustment((prev) => {
      let updatedValue = Math.min(0.5, Math.max(-0.5, prev + change));
  
      return updatedValue;
    });
  };


  //詳細パネル（ペンツール...サイズに関する補間率）
  //サイズ補間率
  const updateRateSize = (newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setRateSize(newValue);
      setInputRateSize(String(newValue));
    }
  };

  const handleLerpRateSizeChange = (e) => {
    const value = e.target.value;
    setInputRateSize(value);
  };

  const handleLerpRateSizeBlur = () => {
    const inputNewValue = parseFloat(inputRateSize);
    const newValue = Math.round(inputNewValue * 100) / 100;
    if (newValue >= 0 && newValue <= 1) {
      updateRateSize(newValue);
    } else {
      setInputRateSize(String(rateSize));
    }
  };


  //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
  const updateMinSize = (newSize) => {
    if (newSize >= 0.1 && newSize <= toolSize) {
      setMinSize(newSize);
      setInputMinValue(String(newSize));
    }
  };

  const handleMinSizeChange = (e) => {
    const value = e.target.value;
    setInputMinValue(value);
  };

  const handleMinBlur = () => {
    const inputNewSize = parseFloat(inputMinValue);
    const newSize = Math.round(inputNewSize * 10) / 10;
    if (newSize >= 0.1 && newSize <= toolSize) {
      updateMinSize(newSize);
    } else {
      setInputMinValue(String(minSize));
    }
  };

  //ペンに「筆圧をつける」かどうかの処理（bool値）
  const handlPressurePenCheckChange = () => {
    setPressurePen(!pressurePen);
  };

  //ペンの「変動具合を調整する」かどうかの処理（bool値）
  const handlSizeCustomCheckChange = () => {
    setSizeCustomBool(!sizeCustomBool);
  };

  //「変動率調整」を全てデフォルトに戻す
  const resetSizePartsValue = () => {
    setRateSize(0.1);
    setMinSize(toolSize / 2);
  }




  //詳細パネル（ペンツール...S値に関する補間率）
  //S値の補間率の調整
  const updateRateS = (newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setRateS(newValue);
      setInputRateS(String(newValue));
    }
  };

  const handleRateSChange = (e) => {
    const value = e.target.value;
    setInputRateS(value);
  };

  const handleRateSBlur = () => {
    const inputNewValue = parseFloat(inputRateS);
    const newValue = Math.round(inputNewValue * 100) / 100;
    if (newValue >= 0 && newValue <= 1) {
      updateRateS(newValue);
    } else {
      setInputRateS(String(rateS));
    }
  };

  //S値のユーザーカスタム値
  const updateValueS = (change) => {
    setUserCustomS((prev) => {
      const S_base = s;
      // S_baseに基づいて許可される変動の最小値と最大値を設定
      const allowedMin = -7 * (S_base / 10);
      const allowedMax = S_base - 7 * (S_base / 10);
      
      // prev + changeがallowedMinとallowedMaxの範囲内に収まるように調整
      let updatedValue = Math.min(allowedMax, Math.max(allowedMin, prev + change));
  
      return updatedValue;
    });
  };


  const updateMaxChangeS = (change) => {
    setMaxChangeS((prev) => {
      let updatedValue = Math.min(s, Math.max(0, prev + change));
  
      return updatedValue;
    });
  };

  
  // userCustomSの値が変更されたらupdateSminを呼び出す
  useEffect(() => {
    updateSmin();
  }, [s, userCustomS]);


  const updateSmin = () => {
    const S_base = s;
    const UserCustomS = Math.round(userCustomS);
    let SX = Math.max(0, 7*(S_base / 10) + UserCustomS);
    let S_min = Math.max(0, S_base - SX);
    S_min = Math.min(S_base, S_min);

    setSMin(S_min);
  }

  //「S値に筆圧をつける」チェックボックス処理（bool値）
  const handlActiveSCheckChange = () => {
    setActiveS(!activeS);
  };

  //「S値に変動具合をつける」チェックボックス処理（bool値）
  const handlMaxChangeSCheckChange = () => {
    setMaxChangeSBool(!maxChangeSBool);
  };

  //「S値調整」を全てデフォルトに戻す
  const resetValueS = () => {
    setUserCustomS(0);
    setMaxChangeS(0);
    setRateS(0.1);
  }



  //詳細パネル（ペンツール...V値に関する補間率）
  //V値の補間率の調整
  const updateRateV = (newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setRateV(newValue);
      setInputRateV(String(newValue));
    }
  };

  const handleRateVChange = (e) => {
    const value = e.target.value;
    setInputRateV(value); // ユーザーの入力を一時的に保持
  };

  const handleRateVBlur = () => {
    const inputNewValue = parseFloat(inputRateV);
    const newValue = Math.round(inputNewValue * 100) / 100;
    if (newValue >= 0 && newValue <= 1) {
      updateRateV(newValue);
    } else {
      setInputRateV(String(rateV));
    }
  };

  //V値のユーザーカスタム値
  const updateValueV = (change) => {
    setUserCustomV((prev) => {
      const V_base = v;
      const allowedMin = - (80 - (8 * (V_base / 10)));
      const allowedMax = (100-V_base)-(80 - (8 * (V_base / 10)));
      // 更新後の値が-80から20の範囲内に収まるように調整
      let updatedValue = Math.min(allowedMax, Math.max(allowedMin, prev + change));
      return updatedValue;
    });
  };


  const updateMaxChangeV = (change) => {
    setMaxChangeV((prev) => {
      let updatedValue = Math.min(vMax, Math.max(0, prev + change));
  
      return updatedValue;
    });
  };

  // userCustomVの値が変更されたらupdateVmaxを呼び出す
  useEffect(() => {
    updateVmax();
  }, [v, userCustomV]);



  const updateVmax = () => {
    const V_base = v;
    const UserCustomV = Math.round(userCustomV);
    let VX = Math.max(0, 80 - (8 * (V_base / 10)) + UserCustomV); 
    let V_max = Math.min(100, V_base + VX);
    V_max = Math.max(V_max, V_base);

    setVMax(V_max);
  }


  //「V値に筆圧をつける」チェックボックス処理（bool値）
  const handlActiveVCheckChange = () => {
    setActiveV(!activeV);
  };


  //「V値に変動具合をつける」チェックボックス処理（bool値）
  const handlMaxChangeVCheckChange = () => {
    setMaxChangeVBool(!maxChangeVBool);
  };


  //「V値調整」を全てデフォルトに戻す
  const resetValueV = () => {
    setUserCustomV(0);
    setMaxChangeV(0);
    setRateV(0.1);
  }





  //詳細パネル（ペンツール...ぼかし）
  //ぼかしフォーム処理
  // const updateBlurValue = (tool, newValue, maxValue) => {
  //   if (newValue >= 0 && newValue <= maxValue) {

  //     if (tool === 'mmPen') {
  //       setMmBlurValue(newValue);
  //       setInputMmBlurValue(String(newValue));
  //       updatetReductionDetail(newValue);
  //       return;
  //     } else if (tool === 'watercolorPen') {
  //       setWatercolorBlurValue(newValue);
  //       setInputWatercolorBlurValue(String(newValue));
  //       updatetReductionDetail(newValue);
  //       return;
  //     } else if (tool === 'pencilPen') {
  //       setPencilBlurValue(newValue);
  //       setInputPencilBlurValue(String(newValue));
  //       updatetReductionDetail(newValue);
  //       return;
  //     } else if (tool === 'oilPen') {
  //       setOilBlurValue(newValue);
  //       setInputOilBlurValue(String(newValue));
  //       updatetReductionDetail(newValue);
  //       return;
  //     } else if (tool === 'mixTool') {
  //       setMixBlurValue(newValue);
  //       setInputMixBlurValue(String(newValue));
  //       updatetReductionDetail(newValue);
  //       return;
  //     }
  //   }
  // };

  // const handleLerpBlurValueChange = (e, tool) => {
  //   const value = e.target.value;

  //   if (tool === 'mmPen') {
  //     setInputMmBlurValue(value);
  //     return;
  //   } else if (tool === 'watercolorPen') {
  //     setInputWatercolorBlurValue(value);
  //     return;
  //   } else if (tool === 'pencilPen') {
  //     setInputPencilBlurValue(value);
  //     return;
  //   } else if (tool === 'oilPen') {
  //     setInputOilBlurValue(value);
  //     return;
  //   } else if (tool === 'mixTool') {
  //     setInputMixBlurValue(value);
  //     return;
  //   }
  // };


  // const handleLerpBlurValueBlur = (tool, inputValue, maxValue) => {
  //   const inputNewValue = parseFloat(inputValue);
  //   const newValue = Math.round(inputNewValue * 10) / 10;

  //   if (newValue >= 0 && newValue <= maxValue) {
  //     updateBlurValue(tool, newValue, maxValue);
      
  //   } else {
  //     if (tool === 'mmPen') {
  //       setInputMmBlurValue(String(mmBlurValue));
  //       return;
  //     } else if (tool === 'watercolorPen') {
  //       setInputWatercolorBlurValue(String(watercolorBlurValue));
  //       return;
  //     } else if (tool === 'pencilPen') {
  //       setInputPencilBlurValue(String(pencilBlurValue));
  //       return;
  //     } else if (tool === 'oilPen') {
  //       setInputOilBlurValue(String(oilBlurValue));
  //       return;
  //     } else if (tool === 'mixTool') {
  //       setInputMixBlurValue(String(mixBlurValue));
  //       return;
  //     }
  //   }
  // };

  //ぼかしチェックボックス処理（bool値）
  const handlBlurCheckChange = (blurBool, setBlurBool) => {
    setBlurBool(!blurBool);
  };




  //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
  //ミリ・水彩・色混ぜ・厚塗りの「ペンの密度」の更新処理
  const updateDensityValue = (tool, newValue, minValue, maxValue) => {
    if (newValue >= minValue && newValue <= maxValue) {
      if (tool === 'mmPen') {
        setMmDensityValue(newValue);
        setInputMmDensityValue(String(newValue));
        return;

      } else if (tool === 'watercolorPen') {
        setWaterDensityValue(newValue);
        setInputWaterDensityValue(String(newValue));
        return;

      } else if (tool === 'oilPen') {
        setOilDensityValue(newValue);
        setInputOilDensityValue(String(newValue));
        return;

      } else if (tool === 'mixTool') {
        setMixDensityValue(newValue);
        setInputMixDensityValue(String(newValue));
        return;
      }
    }
  };

  //「ペンの密度」フォームの入力値を一時的に保持
    const handleLerpWaterDensityValueChange = (e, tool) => {
      const value = e.target.value;
      if (tool === 'mmPen') {
        setInputMmDensityValue(value);
        return;
      } else if (tool === 'watercolorPen') {
        setInputWaterDensityValue(value);
        return;
      } else if (tool === 'oilPen') {
        setInputOilDensityValue(value);
        return;
      } else if (tool === 'mixTool') {
        setInputMixDensityValue(value);
        return;
      }
    };

  //「ペンの密度」フォームのフォーカスが外れた時
  const handleLerpWaterDensityValueBlur = (tool, inputValue, minValue, maxValue) => {
    const inputNewValue = parseFloat(inputValue);
    const newValue = Math.round(inputNewValue * 1000) / 1000;

    if (newValue >= minValue && newValue <= maxValue) {
      updateDensityValue(tool, newValue, minValue, maxValue);

    } else {
      if (tool === 'mmPen') {
        setInputMmDensityValue(String(mmDensityValue));
        return;
      } else if (tool === 'watercolorPen') {
        setInputWaterDensityValue(String(waterDensityValue));
        return;
      } else if (tool === 'oilPen') {
        setInputOilDensityValue(String(oilDensityValue));
        return;
      } else if (tool === 'mixTool') {
        setInputMixDensityValue(String(mixDensityValue));
        return;
      }
    }
  };

  //「ペンの密度」をデフォルトに戻す
  const resetWaterDensityValue = (tool) => {
    if (tool === 'mmPen') {
      setMmDensityValue(20);
      return;
    } else if (tool === 'watercolorPen') {
      setWaterDensityValue(20);
      return;
    } else if (tool === 'oilPen') {
      setOilDensityValue(20);
      return;
    } else if (tool === 'mixTool') {
      setMixDensityValue(20);
      return;
    }
  }



  //インクペン
  //滑らかさ調整フォーム
  const updateInkDensityValue = (newValue) => {
    if (newValue >= 0.005 && newValue <= 9999) {
      setDensityValue(newValue);
      setInputDensityValue(String(newValue));
    }
  };

  const handleInkLerpDensityValueChange = (e) => {
    const value = e.target.value;
    setInputDensityValue(value);
  };

  const handleInkLerpDensityValueBlur = () => {
    const inputNewValue = parseFloat(inputDensityValue);
    const newValue = Math.round(inputNewValue * 1000) / 1000;
    if (newValue >= 0.005 && newValue <= 9999) {
      updateInkDensityValue(newValue);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputDensityValue(String(densityValue));
    }
  };

  const resetInkDensityValue = () => {
    setDensityValue(0.01);
  }



  switch (penToolShareParts) {
    case 'pressureParts':
      return  (
        <>
          {/* 筆圧調整UI */}
          {/* 「変動率調整」フォーム */}

          {/* 「筆圧変動が遅い時の補間率」フォーム */}
          <div className="flex-column pen-pressure-settings-frame">
            <span className="text-Rounded pen-pressure-settings-title" style={{ fontSize: '14px', color: '#ececec' }}>筆圧の補間率調整</span>
            <div className="flex-between" style={{ width: '150px', marginTop: '8px' }}>
              <div className="flex-column">
                <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>最小補間率</span>
                <div>
                  <input
                    className="no-drag form-select-value"
                    type="number"
                    id="lerpRateMinForm"
                    min="0"
                    max="1"
                    step="0.01"
                    style={{ width: '60px', fontSize: '14px' }}
                    value={inputLerpRateMin}
                    onChange={handleLerpRateMinChange}
                    onBlur={handleLerpRateMinBlur}
                    onMouseEnter={() => handleDescriptionMouseEnter('最小補間率', '筆圧がゆっくり変化する時のペンの反応速度。値が小さいほど滑らかに、大きいほど直接的に反応します。')}
                    onTouchStart={() => handleDescriptionMouseEnter('最小補間率', '筆圧がゆっくり変化する時のペンの反応速度。値が小さいほど滑らかに、大きいほど直接的に反応します。')}
                  />
                </div>
              </div>

              {/* 「筆圧変動が早い時の補間率」フォーム */}
              <div className="flex-column">
                <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>最大補間率</span>
                  <div>
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      id="lerpRateMaxForm"
                      min="0"
                      max="1"
                      step="0.01"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputLerpRateMax}
                      onChange={handleLerpRateMaxChange}
                      onBlur={handleLerpRateMaxBlur}
                      onMouseEnter={() => handleDescriptionMouseEnter('最大補間率', '筆圧が急激に変化する時のペンの反応速度。値が小さいほど滑らかに、大きいほど即座に反応します。')}
                      onTouchStart={() => handleDescriptionMouseEnter('最大補間率', '筆圧が急激に変化する時のペンの反応速度。値が小さいほど滑らかに、大きいほど即座に反応します。')}
                    />
                  </div>
              </div>
            </div>

            {/* 筆圧加算値UI */}
            <div style={{ textAlign: 'center' }}>
              <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>筆圧調整値</span>
              <div className="flex">
                <div
                  className="pen-panel-button tooltip-container"
                  onClick={() => updatePressureAdjustment(-0.1)}
                  style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                  onMouseEnter={() => handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。')}
                  onTouchStart={() => {
                    updatePressureAdjustment(-0.1);
                    handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。');
                  }}
                >
                  <i className="bi bi-chevron-double-left"></i>
                  <span className="tooltip-text">-0.1</span>
                </div>

                <div
                  className="pen-panel-button tooltip-container"
                  onClick={() => updatePressureAdjustment(-0.05)}
                  style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                  onMouseEnter={() => handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。')}
                  onTouchStart={() => {
                    updatePressureAdjustment(-0.05);
                    handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。');
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                  <span className="tooltip-text">-0.05</span>
                </div>

                <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{pressureAdjustment.toFixed(2)}</span>

                <div
                  className="pen-panel-button tooltip-container"
                  onClick={() => updatePressureAdjustment(0.05)}
                  style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                  onMouseEnter={() => handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。')}
                  onTouchStart={() => {
                    updatePressureAdjustment(0.05);
                    handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。');
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                  <span className="tooltip-text">+0.05</span>
                </div>
                <div
                  className="pen-panel-button tooltip-container"
                  onClick={() => updatePressureAdjustment(0.1)}
                  style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                  onMouseEnter={() => handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。')}
                  onTouchStart={() => {
                    updatePressureAdjustment(0.1);
                    handleDescriptionMouseEnter('筆圧調整値', '通常の筆圧を人工的に上げたり下げたりすることができます。');
                  }}
                >
                  <i className="bi bi-chevron-double-right"></i>
                  <span className="tooltip-text">+0.1</span>
                </div>
              </div>
            </div>

            {/* 「変動率調整」を全てデフォルトに戻すボタン */}
            <div className="flex-end-end" style={{ alignSelf: 'flex-end'}}>
              <div
                className="pen-panel-button tooltip-container"
                onClick={resetLerpRateValue}
                onTouchStart={resetLerpRateValue}
                style={{ width: '18px', height: '18px', margin: '-7px 5px 2px 0px' }}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span className="tooltip-text" style={{ left: '-750%', textAlign: 'left', lineHeight: '1.2', width: '150px' }}>「変動率調整」の全ての値を初期値に戻す</span>
              </div>
            </div>
          </div>

        </>
      );
    case 'sizeParts':
      return (
        <>
          {/* サイズ調整UI */}
          <div className="flex-column pen-pressure-settings-frame">

            {/* ペンに「筆圧をつける」かどうかのチェックボックス */}
            <div className="flex pen-pressure-settings-title">
              <div
                className={`layers-visibility-checkbox tooltip-container ${pressurePen ? "checked" : ""}`}
                onClick={handlPressurePenCheckChange}
                onMouseEnter={() => handleDescriptionMouseEnter('サイズに筆圧をつける', '有効にすると、筆圧の強弱に応じてペンの太さが変わります。\n筆圧最大値(1)で押した時に選択中のサイズになります。')}
                onTouchStart={() => {
                  handlPressurePenCheckChange();
                  handleDescriptionMouseEnter('サイズに筆圧をつける', '有効にすると、筆圧の強弱に応じてペンの太さが変わります。\n筆圧最大値(1)で押した時に選択中のサイズになります。');
                }}
                >
                {pressurePen && <i className="bi bi-check-lg"></i>}
                <span className="tooltip-text">ペンのサイズに筆圧をつける</span>
              </div>
              <span className="text-Rounded" style={{ fontSize: '14px', letterSpacing: '-0.5px', color: pressurePen ? '#ececec' : '#4A4A4A' }}>サイズに筆圧をつける</span>
            </div>

            {pressurePen ? (
              <>
                {/* ペンの「変動具合を調整する」かどうかのチェックボックス */}
                <div className="flex" style={{ marginTop: '15px' }}>
                  <div
                    className={`layers-visibility-checkbox tooltip-container ${sizeCustomBool ? "checked" : ""}`}
                    onClick={handlSizeCustomCheckChange}
                    onMouseEnter={() => handleDescriptionMouseEnter('サイズの変動具合を調整する', '筆圧の強さに応じて、変動するペンのサイズを細かく設定します。\n筆圧によって変動する最小サイズや筆圧が変化する時のサイズの補間率を調整できます。')}
                    onTouchStart={() => {
                      handlSizeCustomCheckChange();
                      handleDescriptionMouseEnter('サイズの変動具合を調整する', '筆圧の強さに応じて、変動するペンのサイズを細かく設定します。\n筆圧によって変動する最小サイズや筆圧が変化する時のサイズの補間率を調整できます。');
                    }}
                    >
                    {sizeCustomBool && <i className="bi bi-check-lg"></i>}
                    <span className="tooltip-text">サイズの変動具合を調整する</span>
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>サイズの変動具合を調整する</span>
                </div>
              </>
            ) : (
              <>
              {/* ペンの「変動具合を調整する」かどうかのチェックボックス、グレーアウト */}
                <div className="flex" style={{ marginTop: '15px' }}>
                  <div
                    className="layers-visibility-checkbox"
                    >
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>ペンの変動具合を調整する</span>
                </div>
              </>
            )}

            { pressurePen && sizeCustomBool ? (
            <>
              <div className="flex-column-end" style={{ position: 'relative' }}>
                {/* 「サイズ補間率」フォーム */}
                <div className="flex" style={{ marginTop: '8px' }}>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>サイズの補間率：</span>
                  <div>
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      id="rateSizeForm"
                      min="0"
                      max="1"
                      step="0.01"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputRateSize}
                      onChange={handleLerpRateSizeChange}
                      onBlur={handleLerpRateSizeBlur}
                      onMouseEnter={() => handleDescriptionMouseEnter('サイズの補間率', '筆圧が変化する時のサイズの補間率を調整します。')}
                      onTouchStart={() => handleDescriptionMouseEnter('サイズの補間率', '筆圧が変化する時のサイズの補間率を調整します。')}
                    />
                  </div>
                </div>

                {/* 「最小ペンサイズ」フォーム */}
                <div className="flex" style={{ marginTop: '8px' }}>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>最小ペンサイズ：</span>
                  <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      id="minSizeForm"
                      min="0.1"
                      max={toolSize}
                      step="0.1"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputMinValue}
                      onChange={handleMinSizeChange}
                      onBlur={handleMinBlur}
                      onMouseEnter={() => handleDescriptionMouseEnter('最小ペンサイズ', '筆圧によって変化するペンのサイズの最小値を調整します。')}
                      onTouchStart={() => handleDescriptionMouseEnter('最小ペンサイズ', '筆圧によって変化するペンのサイズの最小値を調整します。')}
                    />
                  </div>
                </div>
                <span className="text-Rounded" style={{ fontSize: '14px', right: '-18px', color:'#4A4A4A', position: 'absolute', bottom: '0px' }}>px</span>
              </div>
            </>
            ) : (
              <>
                <div className="flex-column-end" style={{ position: 'relative' }}>
                  {/* 「サイズ補間率」フォーム */}
                  <div className="flex" style={{ marginTop: '8px' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>サイズの補間率：</span>
                    <div
                      className="form-select-value"
                      style={{ width: '60px', height: '27px' }}
                    />
                  </div>

                  {/* 「最小ペンサイズ」フォーム */}
                  <div className="flex" style={{ marginTop: '8px' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>最小ペンサイズ：</span>
                    <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                      <div
                        className="form-select-value"
                        style={{ width: '60px', height: '27px' }}
                      />
                    </div>
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '14px', right: '-18px', color:'#4A4A4A', position: 'absolute', bottom: '0px' }}>px</span>
                </div>
              </>
            )}
            <div>
                <span className="text-Rounded" style={{ fontSize: '10px', color: pressurePen && sizeCustomBool ? '#ececec' : '#4A4A4A' }}>現在のペンサイズ：{toolSize}</span>
                <span className="text-Rounded" style={{ fontSize: '12px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
            </div>
            {/* 「変動率調整」を全てデフォルトに戻すボタン */}
            <div className="flex-end-end" style={{ alignSelf: 'flex-end'}}>
              <div
                className="pen-panel-button tooltip-container"
                onClick={resetSizePartsValue}
                onTouchStart={resetSizePartsValue}
                style={{ width: '18px', height: '18px', margin: '-7px 5px 2px 0px' }}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span className="tooltip-text" style={{ left: '-750%', textAlign: 'left', lineHeight: '1.2', width: '150px' }}>「サイズ調整」の全ての値を初期値に戻す</span>
              </div>
            </div>
          </div>
        </>
      );
    case 'saturationParts':
      return  (
        <>
          {/* S値調整UI */}
          <div className="flex-column pen-pressure-settings-frame">
            {/* 「S値に筆圧をつける」つけるかどうかのチェックボックス */}
            <div className="flex pen-pressure-settings-title">
              <div
                className={`layers-visibility-checkbox tooltip-container ${activeS ? "checked" : ""}`}
                onClick={handlActiveSCheckChange}
                onMouseEnter={() => handleDescriptionMouseEnter('S値に筆圧をつける', '有効にすると、筆圧の強弱に応じて彩度が変わります。\n強く押すほど彩度が上がります。')}
                onTouchStart={() => {
                  handlActiveSCheckChange();
                  handleDescriptionMouseEnter('S値に筆圧をつける', '有効にすると、筆圧の強弱に応じて彩度が変わります\n強く押すほど彩度が上がります。');
                }}
                >
                {activeS && <i className="bi bi-check-lg"></i>}
                <span className="tooltip-text">S値に筆圧をつける</span>
              </div>
              <span className="text-Rounded" style={{ fontSize: '14px', letterSpacing: '-0.5px', color: activeS ? '#ececec' : '#4A4A4A' }}>S値に筆圧をつける</span>
            </div>

              {activeS ? (
                <>
                {/* 「S値に変動具合をつける」つけるかどうかのチェックボックス */}
                <div className="flex" style={{ marginTop: '15px' }}>
                  <div
                    className={`layers-visibility-checkbox tooltip-container ${maxChangeSBool ? "checked" : ""}`}
                    onClick={handlMaxChangeSCheckChange}
                    onMouseEnter={() => handleDescriptionMouseEnter('S値の変動具合を調整する', '筆圧の強さに応じて、変動する彩度の範囲を細かく設定します。\n筆圧によって変動する彩度の範囲や筆圧が変化する時の彩度の補間率を調整できます。')}
                    onTouchStart={() => {
                      handlMaxChangeSCheckChange();
                      handleDescriptionMouseEnter('S値の変動具合を調整する', '筆圧の強さに応じて、変動する彩度の範囲を細かく設定します。\n筆圧によって変動する彩度の範囲や筆圧が変化する時の彩度の補間率を調整できます。');
                    }}
                    >
                    {maxChangeSBool && <i className="bi bi-check-lg"></i>}
                    <span className="tooltip-text">S値の変動具合を調整する</span>
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>S値の変動具合を調整する</span>
                </div>
                </>
              ) : (
                <>
                {/* S値の「変動具合を調整する」かどうかのチェックボックス、グレーアウト */}
                  <div className="flex" style={{ marginTop: '15px' }}>
                    <div
                      className="layers-visibility-checkbox"
                      >
                    </div>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>S値の変動具合を調整する</span>
                  </div>
                </>
              )}

              { activeS && maxChangeSBool ? (
              <>
              <div className="flex-column-end">
                {/* 「S値補間率」フォーム */}
                <div className="flex" style={{ marginTop: '8px' }}>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>S値の補間率：</span>
                  <div>
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      id="rateSForm"
                      min="0"
                      max="1"
                      step="0.01"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputRateS}
                      onChange={handleRateSChange}
                      onBlur={handleRateSBlur}
                      onMouseEnter={() => handleDescriptionMouseEnter('S値の補間率', '彩度が筆圧に応じてどれくらい速く変化するかをコントロールします。\n低い値ではゆっくりと変化し、高い値では急速に変化します。')}
                      onTouchStart={() => handleDescriptionMouseEnter('S値の補間率', '彩度が筆圧に応じてどれくらい速く変化するかをコントロールします。\n低い値ではゆっくりと変化し、高い値では急速に変化します。')}
                    />
                  </div>
                </div>

                {/* S値のユーザーカスタム値UI（色変化の最小値） */}
                <div style={{ textAlign: 'center' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>最小彩度設定</span>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>(現在の最大値：{inputS})</span>
                  <div className="flex">
                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateValueS(5)}
                      onMouseEnter={() => handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。')}
                      onTouchStart={() => {
                        updateValueS(5);
                        handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。');
                      }}
                    >
                      <i className="bi bi-chevron-double-left"></i>
                      <span className="tooltip-text">-5</span>
                    </div>

                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateValueS(10)}
                      onMouseEnter={() => handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。')}
                      onTouchStart={() => {
                        updateValueS(10);
                        handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。');
                      }}
                    >
                      <i className="bi bi-chevron-left"></i>
                      <span className="tooltip-text">-10</span>
                    </div>
                    <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.floor(sMin)}</span>
                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateValueS(-10)}
                      onMouseEnter={() => handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。')}
                      onTouchStart={() => {
                        updateValueS(-10);
                        handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。');
                      }}
                    >
                      <i className="bi bi-chevron-right"></i>
                      <span className="tooltip-text">+10</span>
                    </div>

                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateValueS(-5)}
                      onMouseEnter={() => handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。')}
                      onTouchStart={() => {
                        updateValueS(-5);
                        handleDescriptionMouseEnter('最小彩度設定', '筆圧が最も軽い時に適用される彩度の値を設定します。筆圧に応じて彩度はこの最小値から設定された彩度範囲内で増減します。筆圧が弱い時にも一定の彩度を保つことができます。');
                      }}
                    >
                      <i className="bi bi-chevron-double-right"></i>
                      <span className="tooltip-text">+5</span>
                    </div>
                  </div>
                </div>

                {/* S値の変動具合UI(筆圧・速度によって変化する色味の調整) */}
                <div style={{ textAlign: 'center' }}>
                <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>S値の最大変化量</span>
                  <div className="flex">
                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateMaxChangeS(-10)}

                      onMouseEnter={() => handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。')}
                      onTouchStart={() => {
                        updateMaxChangeS(-10);
                        handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。');
                      }}
                    >
                      <i className="bi bi-chevron-double-left"></i>
                      <span className="tooltip-text">-10</span>
                    </div>

                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateMaxChangeS(-5)}

                      onMouseEnter={() => handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。')}
                      onTouchStart={() => {
                        updateMaxChangeS(-5);
                        handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。');
                      }}
                    >
                      <i className="bi bi-chevron-left"></i>
                      <span className="tooltip-text">-5</span>
                    </div>

                    <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.round(maxChangeS)}</span>

                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateMaxChangeS(5)}

                      onMouseEnter={() => handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。')}
                      onTouchStart={() => {
                        updateMaxChangeS(5);
                        handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。');
                      }}
                    >
                      <i className="bi bi-chevron-right"></i>
                      <span className="tooltip-text">+5</span>
                    </div>

                    <div
                      className="pen-panel-button tooltip-container"
                      style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      onClick={() => updateMaxChangeS(10)}

                      onMouseEnter={() => handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。')}
                      onTouchStart={() => {
                        updateMaxChangeS(10);
                        handleDescriptionMouseEnter('S値の最大変化量', '筆圧によるS値の最大変化量を設定します。\n筆圧に応じてS値が変化する際にこの値が変化最大値になり、彩度の変化を一定の範囲内に制限することができます。');
                      }}
                    >
                      <i className="bi bi-chevron-double-right"></i>
                      <span className="tooltip-text">+10</span>
                    </div>
                  </div>

                </div>
              </div>
              </>
              ) : (
                <>
                  <div className="flex-column-end">
                    {/* 「S値補間率」フォーム、グレーアウト */}
                    <div className="flex" style={{ marginTop: '8px' }}>
                      <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>S値の補間率：</span>
                      <div
                        className="form-select-value"
                        style={{ width: '60px', height: '27px' }}
                      />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>最小彩度設定</span>
                      <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>(現在の最大値：{inputS})</span>
                      <div className="flex">
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-double-left"></i>
                        </div>
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </div>
                        <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.floor(sMin)}</span>
                        
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </div>
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-double-right"></i>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>S値の最大変化量</span>
                      <div className="flex">
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-double-left"></i>
                        </div>
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </div>
                        <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.round(maxChangeS)}</span>
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </div>
                        <div
                          className="pen-panel-button tooltip-container"
                          style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          <i className="bi bi-chevron-double-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 「変動率調整」を全てデフォルトに戻すボタン */}
              <div className="flex-end-end" style={{ alignSelf: 'flex-end'}}>
                <div
                  className="pen-panel-button tooltip-container"
                  onClick={resetValueS}
                  onTouchStart={resetValueS}
                  style={{ width: '18px', height: '18px', margin: '-7px 5px 2px 0px' }}
                >
                  <i className="bi bi-arrow-counterclockwise"></i>
                  <span className="tooltip-text" style={{ left: '-750%', textAlign: 'left', lineHeight: '1.2', width: '150px' }}>「S値調整」の全ての値を初期値に戻す</span>
                </div>
              </div>
            </div>
        </>
      );
    case 'brightnessParts':
      return  (
        <>
          {/* V値調整UI */}
          <div className="flex-column pen-pressure-settings-frame">

            {/* 「V値に筆圧をつける」つけるかどうかのチェックボックス */}
            <div className="flex pen-pressure-settings-title">
              <div
                className={`layers-visibility-checkbox tooltip-container ${activeV ? "checked" : ""}`}
                onClick={handlActiveVCheckChange}
                onMouseEnter={() => handleDescriptionMouseEnter('V値に筆圧をつける', '有効にすると、筆圧の強弱に応じて明度が変わります。\n強く押すほど明度が下がります。')}
                onTouchStart={() => {
                  handlActiveVCheckChange();
                  handleDescriptionMouseEnter('V値に筆圧をつける', '有効にすると、筆圧の強弱に応じて明度が変わります。\n強く押すほど明度が下がります。');
                }}
                >
                {activeV && <i className="bi bi-check-lg"></i>}
                <span className="tooltip-text">V値に筆圧をつける</span>
              </div>
              <span className="text-Rounded" style={{ fontSize: '14px', letterSpacing: '-0.5px', color: activeV ? '#ececec' : '#4A4A4A' }}>V値に筆圧をつける</span>
            </div>

            {activeV ? (
              <>
                {/* 「V値に変動具合をつける」つけるかどうかのチェックボックス */}
                <div className="flex" style={{ marginTop: '15px' }}>
                  <div
                    className={`layers-visibility-checkbox tooltip-container ${maxChangeVBool ? "checked" : ""}`}
                    onClick={handlMaxChangeVCheckChange}
                    onMouseEnter={() => handleDescriptionMouseEnter('V値の変動具合を調整する', '筆圧の強さに応じて、変動する明度の範囲を細かく設定します。\n筆圧によって変動する明度の範囲や筆圧が変化する時の明度の補間率を調整できます。')}
                    onTouchStart={() => {
                      handlMaxChangeVCheckChange();
                      handleDescriptionMouseEnter('V値の変動具合を調整する', '筆圧の強さに応じて、変動する明度の範囲を細かく設定します。\n筆圧によって変動する明度の範囲や筆圧が変化する時の明度の補間率を調整できます。');
                    }}
                    >
                    {maxChangeVBool && <i className="bi bi-check-lg"></i>}
                    <span className="tooltip-text">V値の変動具合を調整する</span>
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>V値の変動具合を調整する</span>
                </div>
              </>
            ) : (
              <>
              {/* V値の「変動具合を調整する」かどうかのチェックボックス、グレーアウト */}
                <div className="flex" style={{ marginTop: '15px' }}>
                  <div
                    className="layers-visibility-checkbox"
                    >
                  </div>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>V値の変動具合を調整する</span>
                </div>
              </>
            )}

            { activeV && maxChangeVBool ? (
              <>
                <div className="flex-column-end">
                  {/* 「V値補間率」フォーム */}
                  <div className="flex" style={{ marginTop: '8px' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>V値の補間率：</span>
                    <input
                    className="no-drag form-select-value"
                      type="number"
                      id="rateVForm"
                      min="0"
                      max="1"
                      step="0.1"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputRateV}
                      onChange={handleRateVChange}
                      onBlur={handleRateVBlur}
                      onMouseEnter={() => handleDescriptionMouseEnter('V値の補間率', '明度が筆圧に応じてどれくらい速く変化するかを設定します。速度が高いほど、小さな筆圧の変化で大きく明度は変化し、速度が低いと筆圧の変化に対して明度がゆっくりと変化します。')}
                      onTouchStart={() => handleDescriptionMouseEnter('V値の補間率', '明度が筆圧に応じてどれくらい速く変化するかを設定します。速度が高いほど、小さな筆圧の変化で大きく明度は変化し、速度が低いと筆圧の変化に対して明度がゆっくりと変化します。')}
                    />
                  </div>

                  {/* V値のユーザーカスタム値UI（色変化の最大値） */}
                  <div style={{ textAlign: 'center' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>最大明度設定</span>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>(現在の最小値：{inputV})</span>
                    <div className="flex">

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateValueV(-10)}
                        onMouseEnter={() => handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。')}
                        onTouchStart={() => {
                          updateValueV(-10);
                          handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。');
                        }}
                      >
                        <i className="bi bi-chevron-double-left"></i>
                        <span className="tooltip-text">-10</span>
                      </div>

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateValueV(-5)}
                        onMouseEnter={() => handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。')}
                        onTouchStart={() => {
                          updateValueV(-5);
                          handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。');
                        }}
                      >
                        <i className="bi bi-chevron-left"></i>
                        <span className="tooltip-text">-5</span>
                      </div>

                      <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.ceil(vMax)}</span>
                      
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateValueV(5)}
                        onMouseEnter={() => handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。')}
                        onTouchStart={() => {
                          updateValueV(5);
                          handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。');
                        }}
                      >
                        <i className="bi bi-chevron-right"></i>
                        <span className="tooltip-text">+5</span>
                      </div>

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateValueV(10)}
                        onMouseEnter={() => handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。')}
                        onTouchStart={() => {
                          updateValueV(10);
                          handleDescriptionMouseEnter('最大明度設定', '筆圧が最も強い時に適用される明度の値を設定します。最大値を高く設定することで、筆圧を強くしても明るさを保つことができます。');
                        }}
                      >
                        <i className="bi bi-chevron-double-right"></i>
                        <span className="tooltip-text">+10</span>
                      </div>
                    </div>
                  </div>

                  {/* V値の変動具合UI(筆圧・速度によって変化する色味の調整) */}
                  <div style={{ textAlign: 'center' }}>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>V値の最大変化量</span>
                    <div className="flex">
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateMaxChangeV(-10)}

                        onMouseEnter={() => handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。')}
                        onTouchStart={() => {
                          updateMaxChangeV(-10);
                          handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。');
                        }}
                      >
                        <i className="bi bi-chevron-double-left"></i>
                        <span className="tooltip-text">-10</span>
                      </div>

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateMaxChangeV(-5)}

                        onMouseEnter={() => handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。')}
                        onTouchStart={() => {
                          updateMaxChangeV(-5);
                          handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。');
                        }}
                      >
                        <i className="bi bi-chevron-left"></i>
                        <span className="tooltip-text">-5</span>
                      </div>

                      <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.round(maxChangeV)}</span>

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateMaxChangeV(5)}

                        onMouseEnter={() => handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。')}
                        onTouchStart={() => {
                          updateMaxChangeV(5);
                          handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。');
                        }}
                      >
                        <i className="bi bi-chevron-right"></i>
                        <span className="tooltip-text">+5</span>
                      </div>

                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                        onClick={() => updateMaxChangeV(10)}

                        onMouseEnter={() => handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。')}
                        onTouchStart={() => {
                          updateMaxChangeV(10);
                          handleDescriptionMouseEnter('V値の最大変化量', '筆圧によるV値の変化幅の最大値を設定します。\n筆圧に応じてV値が変化する際にこの値が変化最大値になり、明度の変化を一定の範囲内に制限することができます。');
                        }}
                      >
                        <i className="bi bi-chevron-double-right"></i>
                        <span className="tooltip-text">+10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex-column-end">
                  {/* 「V値補間率」フォーム、グレーアウト */}
                  <div className="flex" style={{ marginTop: '8px' }}>
                  <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>V値の補間率：</span>
                    <div
                      className="form-select-value"
                      style={{ width: '60px', height: '27px' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>最大明度設定</span>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>(現在の最小値：{inputV})</span>
                    <div className="flex">
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-double-left"></i>
                      </div>
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </div>
                      <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.ceil(vMax)}</span>
                      
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-double-right"></i>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>V値の最大変化量</span>
                    <div className="flex">
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-double-left"></i>
                      </div>
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </div>
                      <span className="text-Rounded" style={{ fontSize: '12px', width: '40px', color: '#7FA8EB' }}>{Math.round(maxChangeV)}</span>
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      <div
                        className="pen-panel-button tooltip-container"
                        style={{ borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}
                      >
                        <i className="bi bi-chevron-double-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* 「変動率調整」を全てデフォルトに戻すボタン */}
            <div className="flex-end-end" style={{ alignSelf: 'flex-end'}}>
              <div
                className="pen-panel-button tooltip-container"
                onClick={resetValueV}
                onTouchStart={resetValueV}
                style={{ width: '18px', height: '18px', margin: '-7px 5px 2px 0px' }}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span className="tooltip-text" style={{ left: '-750%', textAlign: 'left', lineHeight: '1.2', width: '150px' }}>「V値調整」の全ての値を初期値に戻す</span>
              </div>
            </div>
          </div>
        </>
      );
    case 'blurValuePen':
      return  (
        <>
          <div className="flex-column-start" style={{ alignItems: 'flex-start' }}>
            {/* ペンに「ぼかし」つけるかどうかのチェックボックス */}
            <div className="flex">
              <div
                className={`layers-visibility-checkbox tooltip-container ${blurBool ? "checked" : ""}`}
                onClick={() => handlBlurCheckChange(blurBool, setBlurBool)}
                onTouchStart={() => handlBlurCheckChange(blurBool, setBlurBool)}
                >
                {blurBool && <i className="bi bi-check-lg"></i>}
                <span className="tooltip-text">ペンにぼかし効果をつける</span>
              </div>
              <span className="text-Rounded" style={{ fontSize: '10px', color: blurBool ? '#ececec' : '#4A4A4A' }}>ペンをぼかす</span>
            </div>
            {/* ぼかし調整UI */}
            {/* 「ぼかし値」フォーム */}
            {/* { blurBool ? (
              <>
                <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-8px' }}>
                  <div style={{ marginBottom: '-8px' }}><span style={{ fontSize: '10px', color: '#ececec' }}>最大ぼかし値：{maxValue}</span></div>
                  <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ぼかし値</span></div>
                  <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputValue}
                      onChange={(e) => handleLerpBlurValueChange(e, tool)}
                      onBlur={() => handleLerpBlurValueBlur(tool, inputValue, maxValue)}
                    /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-8px' }}>
                  <div style={{ marginBottom: '-8px' }}><span style={{ fontSize: '10px', color: '#4A4A4A' }}>最大ぼかし値：{maxValue}</span></div>
                  <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>ぼかし値</span></div>
                  <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                    <div
                      className="form-select-value"
                      style={{ width: '60px', height: '27px' }}
                    /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                  </div>
                </div>
              </>
            )} */}
          </div>
        </>
      );
    case 'densityValueParts':
      return  (
        <>
          <div className="flex-end-end">

            {/* ペンの密度を調整するフォーム */}
            <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ペンの密度</span>
              <input
                className="no-drag form-select-value"
                type="number"
                min="0.01"
                max="100"
                step="0.01"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputValue}
                onChange={(e) => handleLerpWaterDensityValueChange(e, tool)}
                onBlur={() => handleLerpWaterDensityValueBlur(tool, inputValue, minValue, maxValue)}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>ペンの密度を調整する<br />(調整範囲：0.01〜100)</span>
            </div>

            {tool !== 'oilPen' && tool !== 'mixTool' ? (
              <>
                {/* 「補間率」をデフォルトに戻すボタン */}
                <div
                  className="pen-panel-button tooltip-container"
                  onClick={() => resetWaterDensityValue(tool)}
                  onTouchStart={() => resetWaterDensityValue(tool)}
                  style={{ margin: '0px 0px 0px 8px', width: '18px', height: '18px' }}
                >
                  <i className="bi bi-arrow-counterclockwise"></i>
                  <span className="tooltip-text">「ペンの密度」を初期値に戻す</span>
                </div>
              </>
            ) : tool === 'oilPen' ? (
              <>
                {/* リセットボタン（厚塗りペン） */}
                <DotPenPartsComponent dotPenFormParts="resetValueBtn" tool="oilPen" />
              </>
            ) : null}
          </div>
        </>
      )
      case 'toolPreview':
        return  (
          <>
            <div className="pen-tool-preview-container">
              <div className="pen-tool-preview-background flex">
                <div
                  className="flex"
                  style={{
                    width: `${parseFloat(toolSize) > 70 ? 70 : toolSize}px`,
                    height: `${parseFloat(toolSize) > 70 ? 70 : toolSize}px`,
                    filter: `blur(${blurBool ? "1px" : "0px"})`,
                    backgroundColor: `${currentColor}`,
                    borderRadius: '50%'
                  }}
                />
              </div>
            </div>
          </>
        );

      case 'inkPenParts':
        return  (
          <>
            <div className="flex-end-start">
              <div className="flex-column-start tooltip-container" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
                <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ペンの密度</span>
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min="0.005"
                  max="9999"
                  step="0.01"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputDensityValue}
                  onChange={handleInkLerpDensityValueChange}
                  onBlur={handleInkLerpDensityValueBlur}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>ペンの密度を調整する<br />(調整範囲：0.005〜9999)</span>
              </div>
    
              {/* 「補間率」をデフォルトに戻すボタン */}
              <div
                className="pen-panel-button tooltip-container"
                onClick={resetInkDensityValue}
                onTouchStart={resetInkDensityValue}
                style={{ margin: '0px 0px 0px 8px', width: '18px', height: '18px' }}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span className="tooltip-text">「ペンの密度」を初期値に戻す</span>
              </div>
            </div>
          </>
        );
    default:
      return (
        <>
          {/* 例外処理 */}
          <span>詳細設定はありません。</span>
        </>
      );
  }
};


export { PenToolShareValueComponent };

