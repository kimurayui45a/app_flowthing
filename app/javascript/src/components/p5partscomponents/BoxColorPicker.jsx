import React, { useEffect, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import iro from '@jaames/iro';



const BoxColorPicker = () => {


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

  const boxPickerRef = useRef(null);


  useEffect(() => {
    if (!boxPickerRef.current) {
      
      
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
            }
          ]
        });


      // const handleColorChange = function(color) {
      //   setCurrentColor(color.rgbaString);
      // };
  
      //boxPickerRef.current.on(["color:init", "color:change"], handleColorChange);
  

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

      boxPickerRef.current.on(["color:init", "color:change"], function(color) {
        syncColors(color);
        syncColorsHsv(color);
        updateRGBA(color);
      });


      // クリーンアップ関数
      return () => {
        // イベントリスナーの削除
        if (boxPickerRef.current) {
          // boxPickerRef.current.off(["color:init", "color:change"], handleColorChange);

          boxPickerRef.current.off(["color:init", "color:change"], function(color) {
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
    if (boxPickerRef.current) {
      boxPickerRef.current.color.set(currentColor);
    }
  }, [currentColor]);


  return (
    <div>
      <div
        onMouseDown={colorPaletteDrag}
        onTouchStart={colorPaletteDrag}
        onMouseUp={colorPaletteDragEnd}
        onTouchEnd={colorPaletteDragEnd}
        id="box-picker-container"
        style={{ display: (!mainPanelMode && meinPicker === 'box') ? 'none' : 'block' }}
        //style={{ display: mainPanelMode ? 'block' : 'none' }}
      ></div>
    </div>
  );
};


export { BoxColorPicker };