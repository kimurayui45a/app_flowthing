import React, { useEffect, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import iro from '@jaames/iro';


const AlphaColorPicker = () => {

  const {
    currentColor,
    currentAlphaColor,
    setCurrentAlphaColor,
    setSecondAlphaColor,
    selectAlphaColorPreview
  } = useP5Color();

  const { colorPaletteDrag, colorPaletteDragEnd } = useP5PanelGroupContext();

  const alphaPickerRef = useRef(null);

  const selectAlphaColorPreviewRef = useRef(selectAlphaColorPreview);

    // currentColorが変更されたときに実行するuseEffect
    useEffect(() => {
      selectAlphaColorPreviewRef.current = selectAlphaColorPreview;
    }, [selectAlphaColorPreview]);

  useEffect(() => {
    if (!alphaPickerRef.current) {
      alphaPickerRef.current = new iro.ColorPicker("#alpha-picker-container", {
        width: 165,
        color: currentAlphaColor,
        layout: [
          {
            component: iro.ui.Slider,
            options: {sliderType: 'alpha'}
          }
        ]
      });

      const handleColorChange = function(color) {
        if (selectAlphaColorPreviewRef.current) {
          setCurrentAlphaColor(color.rgbaString);
          //console.log('currentAlphaColor', currentAlphaColor)
        } else {
          setSecondAlphaColor(color.rgbaString);
        }
      };
  
      alphaPickerRef.current.on(["color:init", "color:change"], handleColorChange);
  
      // クリーンアップ関数
      return () => {
        // イベントリスナーの削除
        if (alphaPickerRef.current) {
          alphaPickerRef.current.off(["color:init", "color:change"], handleColorChange);
        }
      };
    }
  }, []);
  
  // currentColorが変更されたときに実行するuseEffect
  useEffect(() => {
    if (alphaPickerRef.current) {
      // currentColorの変更をカラーピッカーに反映
      alphaPickerRef.current.color.set(currentColor);
    }
  }, [currentColor]);


  return (
    <div className="gradation-slider-container">
      <div
        className="gradation-slider-background"
        onMouseDown={colorPaletteDrag}
        onTouchStart={colorPaletteDrag}
        onMouseUp={colorPaletteDragEnd}
        onTouchEnd={colorPaletteDragEnd}
        id="alpha-picker-container"
      ></div>
    </div>
  );
};


export { AlphaColorPicker };
