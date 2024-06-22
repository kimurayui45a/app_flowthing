import React, { useEffect, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';


const ColorFormBlock = () => {

  const {
    setCurrentColor,

    //RGBフォーム
    r,
    setR,
    g,
    setG,
    b,
    setB,
    a,
    inputR,
    setInputR,
    inputG,
    setInputG,
    inputB,
    setInputB,
    setInputA,

    //HSVフォーム
    h,
    setH,
    s,
    setS,
    v,
    setV,
    inputH,
    setInputH,
    inputS,
    setInputS,
    inputV,
    setInputV
  } = useP5Color();


  const hRef = useRef(h);
  const sRef = useRef(s);
  const vRef = useRef(v);

  useEffect(() => {
    hRef.current = h;
    sRef.current = s;
    vRef.current = v;
  }, [h, s, v]);

  const rRef = useRef(r);
  const gRef = useRef(g);
  const bRef = useRef(b);
  const aRef = useRef(a);

  useEffect(() => {
    rRef.current = r;
    gRef.current = g;
    bRef.current = b;
    aRef.current = a;
  }, [r, g, b, a]);


  //「HSVのフォーム」各項目で微調整の可能性を考慮し個別に関数を定義する
  //H値更新関数
  const updateH = (newValue) => {
    if (newValue >= 0 && newValue <= 360) {
      setH(newValue);
      hRef.current = newValue;
      setInputH(newValue);
      setInputH(String(newValue));
      updateColorHSV();
    }
  };

  //S値更新関数
  const updateS = (newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      setS(newValue);
      sRef.current = newValue;
      setInputS(newValue);
      setInputS(String(newValue));
      updateColorHSV();
    }
  };

  //V値更新関数
  const updateV = (newValue) => {
    if (newValue >= 0 && newValue <= 100) {
      setV(newValue);
      vRef.current = newValue;
      setInputV(newValue);
      setInputV(String(newValue));
      updateColorHSV();
    }
  };

  //カラーピッカーとフォームの色を同期する関数（確実に最新で同期させるためにRefを使用する）
  const updateColorHSV = () => {
    const newColor = { h: hRef.current, s: sRef.current, v: vRef.current };
    setCurrentColor(newColor);
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

  //Hフォームのフォーカスが外れた時の処理
  const handleBlurH = () => {
    const newValue = parseInt(inputH, 10);
    if (newValue >= 0 && newValue <= 360) {
      updateH(newValue);
    } else {
      // 無効な値または空の場合、最後の有効な値にリセット
      setInputH(String(h));
    }
  };

  //Sフォームのフォーカスが外れた時の処理
  const handleBlurS = () => {
    const newValue = parseInt(inputS, 10);
    if (newValue >= 0 && newValue <= 100) {
      updateS(newValue);
    } else {
      setInputS(String(s));
    }
  };

  //Vフォームのフォーカスが外れた時の処理
  const handleBlurV = () => {
    const newValue = parseInt(inputV, 10);
    if (newValue >= 0 && newValue <= 100) {
      updateV(newValue);
    } else {
      setInputV(String(v));
    }
  };


  //「RGBのフォーム」（Aは内部的に定義するのみでフォームUIは表示しない）
  //R値更新関数
  const updateR = (newValue) => {
    if (newValue >= 0 && newValue <= 255) {
      setR(newValue);
      rRef.current = newValue;
      setInputR(String(newValue));
      updateColor();
    }
  };

  //G値更新関数
  const updateG = (newValue) => {
    if (newValue >= 0 && newValue <= 255) {
      setG(newValue);
      gRef.current = newValue;
      setInputG(String(newValue));
      updateColor();
    }
  };

  //B値更新関数
  const updateB = (newValue) => {
    if (newValue >= 0 && newValue <= 255) {
      setB(newValue);
      bRef.current = newValue;
      setInputB(String(newValue));
      updateColor();
    }
  };

  //A値更新関数
  // const updateA = (newValue) => {
  //   if (newValue >= 0 && newValue <= 1) {
  //     setA(newValue);
  //     aRef.current = newValue;
  //     updateColor();
  //   }
  // };

  // カラーピッカーとフォームの色を同期する関数
  const updateColor = () => {
    const newColor = `rgba(${rRef.current},${gRef.current},${bRef.current},${aRef.current})`;
    setCurrentColor(newColor);
  };

  // RGBAフォームの値を更新する関数
  const handleRGBAChange = (e, colorComponent) => {
    // 入力値を一時的に保存するだけで、ここでは値の検証を行わない
    switch (colorComponent) {
      case 'r':
        setInputR(e.target.value);
        break;
      case 'g':
        setInputG(e.target.value);
        break;
      case 'b':
        setInputB(e.target.value);
        break;
      case 'a':
        setInputA(e.target.value);
        break;
      default:
        break;
    }
  };

  // フォームのフォーカスが外れた時の処理の修正
  //Rフォームのフォーカスが外れた時の処理
  const handleBlurR = () => {
    const newValue = parseInt(inputR, 10);
    if (newValue >= 0 && newValue <= 255) {
      updateR(newValue);
    } else {
      setInputR(String(r));
    }
  };

  //Gフォームのフォーカスが外れた時の処理
  const handleBlurG = () => {
    const newValue = parseInt(inputG, 10);
    if (newValue >= 0 && newValue <= 255) {
      updateG(newValue);
    } else {
      setInputG(String(g));
    }
  };

  //Bフォームのフォーカスが外れた時の処理
  const handleBlurB = () => {
    const newValue = parseInt(inputB, 10);
    if (newValue >= 0 && newValue <= 255) {
      updateB(newValue);
    } else {
      setInputB(String(b));
    }
  };

  // フォームのフォーカスが外れた時の処理の修正
  // const handleBlurA = () => {
  //   let newValue = parseFloat(inputA);
  //   if (isNaN(newValue) || newValue < 0 || newValue > 1) {
  //     setInputA(String(a));
  //   } else {
  //     updateA(newValue);
  //     setInputA(newValue.toString());
  //   }
  // };



  return (
    <div className="flex-column" style={{ marginTop: '4px', marginBottom: '4px' }}>
      {/* HSVフォーム */}
      <div className="flex-between" style={{ width: '210px' }}>

        {/* H・Rフォーム */}
        <div className="flex-items-end">
          <div style={{ marginBottom: '8px' }}>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>H:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="360"
              step="1"
              value={inputH}
              onChange={(e) => handleHSVChange(e, 'h')}
              onBlur={handleBlurH}
              style={{ width: '50px' }}
            />
          </div>
          <div>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>R:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="255"
              step="1"
              value={inputR}
              onChange={(e) => handleRGBAChange(e, 'r')}
              onBlur={handleBlurR}
              style={{ width: '50px' }}
            />
          </div>
        </div>

        {/* S・Gフォーム */}
        <div className="flex-items-end">
          <div style={{ marginBottom: '8px' }}>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>S:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="100"
              step="1"
              value={inputS}
              onChange={(e) => handleHSVChange(e, 's')}
              onBlur={handleBlurS}
              style={{ width: '50px' }}
            />
          </div>
          <div>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>G:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="255"
              step="1"
              value={inputG}
              onChange={(e) => handleRGBAChange(e, 'g')}
              onBlur={handleBlurG}
              style={{ width: '50px' }}
            />
          </div>
        </div>

        {/* V・Bフォーム */}
        <div className="flex-items-end">
          <div style={{ marginBottom: '8px' }}>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>V:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="100"
              step="1"
              value={inputV}
              onChange={(e) => handleHSVChange(e, 'v')}
              onBlur={handleBlurV}
              style={{ width: '50px' }}
            />
          </div>
          <div>
            <span className="text-Rounded" style={{ fontSize: '16px' }}>B:</span>
            <input
              className="no-drag form-select-value"
              type="number"
              min="0"
              max="255"
              step="1"
              value={inputB}
              onChange={(e) => handleRGBAChange(e, 'b')}
              onBlur={handleBlurB}
              style={{ width: '50px' }}
            />
          </div>
        </div>
      </div>

      {/* A値フォーム（必要になった時に咄嗟に対応できるように） */}
      {/* <input type="number" value={inputA} onChange={(e) => handleRGBAChange(e, 'a')} onBlur={handleBlurA} min="0" max="1" step="0.01" />A */}
  
    </div>
  );
};


export { ColorFormBlock };