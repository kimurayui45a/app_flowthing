import React, { createContext, useContext, useState, useEffect } from 'react';


// コンテキストの作成
const P5ColorContext = createContext();

export const useP5Color = () => useContext(P5ColorContext);

// コンテキストプロバイダコンポーネント
export const P5ColorProvider = ({ children }) => {
  
  //ベースで使用するもの
  //カラーを共有・管理するステート（RGBカラー専用）
  const [currentColor, setCurrentColor] = useState('rgba(255, 255, 255, 1)');

  //フリーパレット
  const [paletteColors9, setPaletteColors9] = useState(Array(9).fill(''));
  const [paletteColors18, setPaletteColors18] = useState(Array(18).fill(''));
  const [paletteColors27, setPaletteColors27] = useState(Array(27).fill(''));

  //カラープレビューの選択
  const [selectColorPreview, setSelectColorPreview] = useState(true);

  //カラープレビューの記録
  // const [firstColorPreview, setFirstColorPreview] = useState('rgba(0, 0, 0, 1)');
  // const [secondColorPreview, setSecondColorPreview] = useState('rgba(255, 255, 255, 1)');

  const [firstColorPreview, setFirstColorPreview] = useState('rgba(255, 255, 255, 1)');
  const [secondColorPreview, setSecondColorPreview] = useState('rgba(0, 0, 0, 1)');

  //透明度
  //透明度を含む色を管理する
  const [currentAlphaColor, setCurrentAlphaColor] = useState(currentColor);
  const [secondAlphaColor, setSecondAlphaColor] = useState('rgba(255, 255, 255, 1)');

  //透明度カラープレビューの選択
  const [selectAlphaColorPreview, setSelectAlphaColorPreview] = useState(true);


  //RGBA関係
  //RGBAフォーム（AフォームはUIとして使用しない方向になったが、何かの時のために内部的には保持する）
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(255);
  const [a, setA] = useState(1);

  //RGBAフォームの値を管理するもの（HSVに合わせてここに定義）
  const [inputR, setInputR] = useState(String(r));
  const [inputG, setInputG] = useState(String(g));
  const [inputB, setInputB] = useState(String(b));
  const [inputA, setInputA] = useState(String(a));

  // カラーピッカーが外部から変更された場合にinputValueも更新する
  useEffect(() => {
    setInputR(String(r));
    setInputG(String(g));
    setInputB(String(b));
    setInputA(String(a));
  }, [r, g, b, a]);


  ////HSV関係
  //HSVフォームとp5canvasと色を共有するステート
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(100);

  //HSVフォームの値を管理するもの
  const [inputH, setInputH] = useState('0');
  const [inputS, setInputS] = useState('0');
  const [inputV, setInputV] = useState('100');

  // カラーピッカーが外部から変更された場合にinputValueも更新する
  useEffect(() => {
    setInputH(String(inputH));
    setInputS(String(inputS));
    setInputV(String(inputV));
  }, [inputH, inputS, inputV]);


  // 白色に設定する関数
  const setWhiteButton = () => {
    const whiteColor = 'rgba(255, 255, 255, 1)'; // RGBA形式で白色を指定
    setCurrentColor(whiteColor);
    setR(255);
    setG(255);
    setB(255);
    setA(1);
    setH(0);
    setS(0);
    setV(100);
    setInputH(0);
    setInputS(0);
    setInputV(100);
  };

  // 黒色に設定する関数
  const setBlackButton = () => {
    const blackColor = 'rgba(0, 0, 0, 1)'; // RGBA形式で黒色を指定
    setCurrentColor(blackColor);
    setR(0);
    setG(0);
    setB(0);
    setA(1);
    setH(0);
    setS(0);
    setV(0);
    setInputH(0);
    setInputS(0);
    setInputV(0);
  };

  //1つ目のカラープレビューに切り替えるボタン
  const toggleFirstPreviewMode = () => {
    if (!selectColorPreview) {
      setSelectColorPreview(true);
    }
  };

  //2つ目のカラープレビューに切り替えるボタン
  const toggleSecondPreviewMode = () => {
    if (selectColorPreview) {
      setSelectColorPreview(false);
    }
  };

  //カラープレビューボタンをクリックしたらそのプレビューの色を現在の色にする
  const setColorPreviewButton = (colorPreview) => {
    setCurrentColor(colorPreview);
  };

  //カラープレビューの色を交換するボタン
  const toggleColorPreviewChange = () => {
    setFirstColorPreview(secondColorPreview);
    setSecondColorPreview(firstColorPreview);
  };

  //２つのカラープレビューボタンの更新を管理する
  useEffect(() => {
    if (selectColorPreview) {
      setFirstColorPreview(currentColor);
    } else {
      setSecondColorPreview(currentColor);
    }
  }, [currentColor]);


  //1つ目の透明カラープレビューに切り替えるボタン
  const toggleAlphaPreviewMode = () => {
    if (!selectAlphaColorPreview) {
      setSelectAlphaColorPreview(true);
    }
  };

  //2つ目の透明カラープレビューに切り替えるボタン
  const toggleSecondAlphaPreviewMode = () => {
    if (selectAlphaColorPreview) {
      setSelectAlphaColorPreview(false);
    }
  };


  //透明カラープレビューの色を交換するボタン
  const toggleAlphaColorPreviewChange = () => {
    setCurrentAlphaColor(secondAlphaColor);
    setSecondAlphaColor(currentAlphaColor);
  };

  //２つのカラープレビューボタンの更新を管理する
  useEffect(() => {
    if (selectAlphaColorPreview) {
      setCurrentAlphaColor(currentColor);
    } else {
      setSecondAlphaColor(currentColor);
    }
  }, [currentColor]);



  // コンテキストの値として複数の状態と関数を含むオブジェクトを渡す
  const value = {
    currentColor,
    setCurrentColor,
    paletteColors9,
    setPaletteColors9,
    paletteColors18,
    setPaletteColors18,
    paletteColors27,
    setPaletteColors27,
    setWhiteButton,
    setBlackButton,
    selectColorPreview,
    setSelectColorPreview,
    firstColorPreview,
    setFirstColorPreview,
    secondColorPreview,
    setSecondColorPreview,
    toggleFirstPreviewMode,
    toggleSecondPreviewMode,
    setColorPreviewButton,
    toggleColorPreviewChange,
    currentAlphaColor,
    setCurrentAlphaColor,
    secondAlphaColor,
    setSecondAlphaColor,
    selectAlphaColorPreview,
    setSelectAlphaColorPreview,
    toggleAlphaPreviewMode,
    toggleSecondAlphaPreviewMode,
    toggleAlphaColorPreviewChange,

    //RGBフォーム
    r,
    setR,
    g,
    setG,
    b,
    setB,
    a,
    setA,
    inputR,
    setInputR,
    inputG,
    setInputG,
    inputB,
    setInputB,
    inputA,
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
  };


  return (
    <P5ColorContext.Provider value={value}>
      {children}
    </P5ColorContext.Provider>
  );
};

