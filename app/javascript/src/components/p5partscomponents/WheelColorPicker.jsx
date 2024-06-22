import React, { useEffect, useState, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import iro from '@jaames/iro';



const WheelColorPicker = () => {


  const {
    currentColor,
    setCurrentColor,

    //RGBフォーム
    setR,
    setG,
    setB,
    setA,

    //HSVフォーム
    setH,
    setS,
    setV,
    setInputH,
    setInputS,
    setInputV
  } = useP5Color();

  const { colorPaletteDrag, colorPaletteDragEnd, mainPanelMode, meinPicker } = useP5PanelGroupContext();

  const wheelPickerRef = useRef(null);

  //「currentColor」でboxPickerと連携しているためform処理はwheelPickerコンポーネントにのみ記述する
  useEffect(() => {
    // カラーピッカーが既に存在しない場合のみ初期化

    // 円形カラーピッカーの初期化
    if (!wheelPickerRef.current) {

    
        wheelPickerRef.current = new iro.ColorPicker("#wheel-picker-container", {
          width: 140,
          color: currentColor,
          layout: [
            {
              component: iro.ui.Wheel,
              options: {wheelLightness: false}
            },
            {
              component: iro.ui.Slider,
              options: {sliderType: 'value'}
            }
          ]
        });
      
        

      // const handleColorChange = function(color) {
      //   setCurrentColor(color.rgbaString);
      // };
  
      // wheelPickerRef.current.on(["color:init", "color:change"], handleColorChange);

    //カラーピッカーで色が変更されたときの処理
    const syncColors = (color) => {
      setCurrentColor(color.rgbaString);
    };

    //カラーピッカーとRGBフォームを同期
    const updateRGBA = (color) => {
      setR(color.rgb.r);
      setG(color.rgb.g);
      setB(color.rgb.b);
      setA(color.alpha);
    };

    //HSV用の処理
    const syncColorsHsv = (color) => {
      const roundedH = Math.round(color.hsv.h);
      const roundedS = Math.round(color.hsv.s);
      const roundedV = Math.round(color.hsv.v);
  
        // HSV形式でH値の情報を更新
        setH(color.hsv.h);
        setInputH(roundedH);
  
        // V値が0の場合、S値を0として設定
        if (color.hsv.v === 0) {
          setS(0);
          setInputS('100');
        } else {
          setS(color.hsv.s);
          setInputS(roundedS);
        }
  
        // HSV形式でV値の情報を更新
        setV(color.hsv.v);
        setInputV(roundedV);
      }

      wheelPickerRef.current.on(["color:init", "color:change"], function(color) {
        syncColors(color);
        syncColorsHsv(color);
        updateRGBA(color);
      });
  
      // クリーンアップ関数
      return () => {
        // イベントリスナーの削除
        if (wheelPickerRef.current) {
          // wheelPickerRef.current.off(["color:init", "color:change"], handleColorChange);

          wheelPickerRef.current.off(["color:init", "color:change"], function(color) {
            syncColors(color);
            syncColorsHsv(color);
            updateRGBA(color);
          });
        }
      };
    }
  }, []);
  
  // currentColorが変更されたときに実行するuseEffect
  useEffect(() => {
    if (wheelPickerRef.current) {
      // currentColorの変更をカラーピッカーに反映
      wheelPickerRef.current.color.set(currentColor);
    }
  }, [currentColor]);


  return (
    <div>
      <div
        onMouseDown={colorPaletteDrag}
        onTouchStart={colorPaletteDrag}
        onMouseUp={colorPaletteDragEnd}
        onTouchEnd={colorPaletteDragEnd}
        id="wheel-picker-container"
        style={{ display: (!mainPanelMode && meinPicker === 'wheel') ? 'none' : 'block' }}
        //style={{ display: mainPanelMode ? 'block' : 'none' }}
      ></div>
    </div>
  );
};


export { WheelColorPicker };