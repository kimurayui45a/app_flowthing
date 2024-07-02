import React, { useEffect, useState, useRef } from 'react';
import { PenToolShareValueComponent } from './PenToolShareValueComponent';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { DotPenPartsComponent } from './DotPenPartsComponent';
//import { useP5Color } from '../P5ColorContext';
//import { useP5PanelGroupContext } from '../P5PanelGroupContext';
//import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';


const DetailDotPenBlock = () => {


  const { 
    toolMode
  } = useP5ToolModeContext();

  // const { 
  // //詳細パネル（ペンツール...minSize：筆圧で変動する最小サイズ）
  // minSize,
  // setMinSize,
  // inputMinValue,
  // setInputMinValue,
  // toolSize
  // } = useP5CanvasCoreShare();

  //「カラーコンテキスト」から受け取るもの
  // const {
  //   currentColor,
  //   setCurrentColor,
  //   currentAlphaColor,
  //   secondAlphaColor,
  //   selectAlphaColorPreview,
  //   h,
  //   s,
  //   v,
  //   inputS,
  //   inputV
  // } = useP5Color();

  const {
    //詳細パネル（ペンツール...エアブラシツール）
    inputPencilLerpStep,
    inputPencilNumPoints,
    inputPencilHeightDot,
    inputPencilWidthDot,
    inputPencilAlpha,

    //詳細パネル（ペンツール...厚塗りペンツール）
    inputOilLerpStep,
    inputOilNumPoints,
    inputOilHeightDot,
    inputOilWidthDot,
    inputOilAlpha,

    //滑らかさ調整(ミリペン, 水彩ペン, 厚塗りペン, 色混ぜペン)
    inputOilDensityValue,

    //「ペンツール」のbool値判定（ぼかし）
    pencilBlur,
    setPencilBlur,
    oilBlur,
    setOilBlur,
    setPencilDescription,
    handlePenToolDescription,
    setOilPenDescription
  } = useP5PenToolParametersContext();


  //選択されたツールに応じてオプション内の内容を切り替える
  const renderDotPenToolComponent = (toolMode) => {
    if (toolMode === 'pencilPen') {
      return (
        <>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>
            {/* 「エアブラシ」のオプション */}
            <div
              className="flex-column-start"
              style={{ alignItems: 'flex-start' }}
              onMouseEnter={() => handlePenToolDescription(setPencilDescription, 'エアブラシ', '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。また描く速度によって線の繋がり具合が大きく変動します。')}
              onTouchStart={() => handlePenToolDescription(setPencilDescription, 'エアブラシ', '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。また描く速度によって線の繋がり具合が大きく変動します。')}
            >
              <span className="destination-layer" style={{ color: '#ececec' }}>エアブラシのプレビュー</span>
                {/* エアブラシのプレビュー */}
                <DotPenPartsComponent dotPenFormParts="pencilPreviewParts" />
            </div>
            
            <div style={{ width: '100px' }} className="flex-end-start">
              <div className="flex-column-start">
                <div
                  onMouseEnter={() => handlePenToolDescription(setPencilDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                  onTouchStart={() => handlePenToolDescription(setPencilDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                >
                  {/* ぼかし調整UI（エアブラシ） */}
                  <PenToolShareValueComponent penToolShareParts="blurValuePen" tool="pencilPen" blurBool={pencilBlur} setBlurBool={setPencilBlur} />
                </div>

                <div style={{ marginTop: '10px', width: '86px' }}>
                  <div className="flex-end-end">
                    <div style={{ lineHeight: '0.7', textAlign: 'left', height: '36px', width: '60px' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>密度調整は<br />ありません。</span></div>
                    {/* リセットボタン（エアブラシ） */}
                    <DotPenPartsComponent dotPenFormParts="resetValueBtn" tool="pencilPen" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-column-end" style={{ marginTop: '10px', marginLeft: '10px' }}>
            <div className="flex">
              <div className="flex" style={{ marginTop: '5px', justifyContent: 'flex-start', width: '70px' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ドットの調整</span></div>
            
              <div
                onMouseEnter={() => handlePenToolDescription(setPencilDescription, 'ドットのサイズ', 'ペンのドットの形状を調整します。横幅と縦幅を同じ値に設定すると、完全な円形のドットが形成されます。横幅と縦幅に異なる値を設定すると、楕円形または線形のドットが形成されます。')}
                onTouchStart={() => handlePenToolDescription(setPencilDescription, 'ドットのサイズ', 'ペンのドットの形状を調整します。横幅と縦幅を同じ値に設定すると、完全な円形のドットが形成されます。横幅と縦幅に異なる値を設定すると、楕円形または線形のドットが形成されます。')}
              >
                {/* ドットのサイズ調整（エアブラシ） */}
                <DotPenPartsComponent dotPenFormParts="lerpDotForm" tool="pencilPen" widthInputValue={inputPencilWidthDot} heightInputValue={inputPencilHeightDot} />
              </div>
            </div>

            <div className="flex" style={{ alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '5px' }}>
              <div
                onMouseEnter={() => handlePenToolDescription(setPencilDescription, '透明度の調整', 'ペンの外側の透明度を調整します。値を小さくするとペンの形状が四角に近づきます。値を大きくすると円形に近づきます。')}
                onTouchStart={() => handlePenToolDescription(setPencilDescription, '透明度の調整', 'ペンの外側の透明度を調整します。値を小さくするとペンの形状が四角に近づきます。値を大きくすると円形に近づきます。')}
              >
                {/* 透明度の調整（エアブラシ） */}
                <DotPenPartsComponent dotPenFormParts="lerpAlphaBlurForm" tool="pencilPen" inputValue={inputPencilAlpha} />
              </div>
              <div
                onMouseEnter={() => handlePenToolDescription(setPencilDescription, '補間調整値', '線を引く際の点の配置間隔を調整します。値を小さくすると、より多くの点が補間され、線が滑らかになります。値を大きくすると点の間隔が広がり、線に独特のテクスチャや途切れが生じます。')}
                onTouchStart={() => handlePenToolDescription(setPencilDescription, '補間調整値', '線を引く際の点の配置間隔を調整します。値を小さくすると、より多くの点が補間され、線が滑らかになります。値を大きくすると点の間隔が広がり、線に独特のテクスチャや途切れが生じます。')}
              >
                {/* 線を引く際の点の配置間隔を調整する値（エアブラシ） */}
                <DotPenPartsComponent dotPenFormParts="lerpStepForm" tool="pencilPen" inputValue={inputPencilLerpStep} />
              </div>
              <div
                onMouseEnter={() => handlePenToolDescription(setPencilDescription, 'ドットの数', 'ペンが描画する点の数を調整できます。値を高く設定すると、ブラシがより多くの点を生成します。値を低く設定すると、点の間隔が広がりブラシのテクスチャが目立つようになります。')}
                onTouchStart={() => handlePenToolDescription(setPencilDescription, 'ドットの数', 'ペンが描画する点の数を調整できます。値を高く設定すると、ブラシがより多くの点を生成します。値を低く設定すると、点の間隔が広がりブラシのテクスチャが目立つようになります。')}
              >
                {/* 描画される点の数を制御する値（エアブラシ） */}
                <DotPenPartsComponent dotPenFormParts="lerpNumPointsForm" tool="pencilPen" inputValue={inputPencilNumPoints} />
              </div>
            </div>
          </div>
        </>
      );

    } else if (toolMode === 'oilPen') {
      return (
        <>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '205px', marginTop: '5px' }}>
            {/* 「厚塗りペン」のオプション */}
            <div
              className="flex-column-start"
              style={{ alignItems: 'flex-start' }}
              onMouseEnter={() => handlePenToolDescription(setOilPenDescription, '厚塗りペン', '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。一貫した厚みのある表現ができます。')}
              onTouchStart={() => handlePenToolDescription(setOilPenDescription, '厚塗りペン', '「筆圧」と「ぼかし」機能がついたペンです。\nこのペンはドットを調整することができ、その数値によって描き味が変化します。一貫した厚みのある表現ができます。')}
            >
              <span className="destination-layer" style={{ color: '#ececec' }}>厚塗りペンのプレビュー</span>
                {/* 厚塗りペンのプレビュー */}
                <DotPenPartsComponent dotPenFormParts="oilPenPreviewParts" />
            </div>
            
            <div style={{ width: '100px' }} className="flex-end-start">
              <div className="flex-column-start">
                <div
                  onMouseEnter={() => handlePenToolDescription(setOilPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                  onTouchStart={() => handlePenToolDescription(setOilPenDescription, 'ペンをぼかす', 'ペンの輪郭をぼかします。\n1px程ぼかされるためブラシサイズが指定サイズより少し大きくなります。')}
                >
                  {/* ぼかし調整UI（厚塗りペン） */}
                  <PenToolShareValueComponent penToolShareParts="blurValuePen" tool="oilPen" blurBool={oilBlur} setBlurBool={setOilBlur} />
                </div>

                <div style={{ marginTop: '10px', width: '86px' }}>
                  <div className="flex-end-end">
                    <div
                      onMouseEnter={() => handlePenToolDescription(setOilPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                      onTouchStart={() => handlePenToolDescription(setOilPenDescription, 'ペンの密度', 'ペンの線の密度を調整できます。値を高くすると線が密になり、より滑らかな描画が可能になります。\n値を低く設定すると、線の間隔が広がり、点々とした表現が得られるようになります。')}
                    >
                      {/* 密度を調整するフォーム（厚塗りペン） */}
                      <PenToolShareValueComponent penToolShareParts="densityValueParts" tool="oilPen" inputValue={inputOilDensityValue} minValue={0.01} maxValue={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-column-end" style={{ marginTop: '10px', marginLeft: '10px' }}>
            <div className="flex">
              <div className="flex" style={{ marginTop: '5px', justifyContent: 'flex-start', width: '70px' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>ドットの調整</span></div>
            
              <div
                onMouseEnter={() => handlePenToolDescription(setOilPenDescription, 'ドットのサイズ', 'ペンのドットの形状を調整します。横幅と縦幅を同じ値に設定すると、完全な円形のドットが形成されます。横幅と縦幅に異なる値を設定すると、楕円形または線形のドットが形成されます。')}
                onTouchStart={() => handlePenToolDescription(setOilPenDescription, 'ドットのサイズ', 'ペンのドットの形状を調整します。横幅と縦幅を同じ値に設定すると、完全な円形のドットが形成されます。横幅と縦幅に異なる値を設定すると、楕円形または線形のドットが形成されます。')}
              >

                {/* ドットのサイズ調整（厚塗りペン） */}
                <DotPenPartsComponent dotPenFormParts="lerpDotForm" tool="oilPen" widthInputValue={inputOilWidthDot} heightInputValue={inputOilHeightDot} />
              </div>
            </div>

            <div className="flex" style={{ alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '5px' }}>
              <div
                onMouseEnter={() => handlePenToolDescription(setOilPenDescription, '透明度の調整', 'ペンの外側の透明度を調整します。値を小さくするとペンの形状が四角に近づきます。値を大きくすると円形に近づきます。')}
                onTouchStart={() => handlePenToolDescription(setOilPenDescription, '透明度の調整', 'ペンの外側の透明度を調整します。値を小さくするとペンの形状が四角に近づきます。値を大きくすると円形に近づきます。')}
              >
                {/* 透明度の調整（厚塗りペン） */}
                <DotPenPartsComponent dotPenFormParts="lerpAlphaBlurForm" tool="oilPen" inputValue={inputOilAlpha} />
              </div>
              <div
                onMouseEnter={() => handlePenToolDescription(setOilPenDescription, '補間調整値', '線を引く際の点の配置間隔を調整します。値を小さくすると、より多くの点が補間され、線が滑らかになります。値を大きくすると点の間隔が広がり、線に独特のテクスチャや途切れが生じます。')}
                onTouchStart={() => handlePenToolDescription(setOilPenDescription, '補間調整値', '線を引く際の点の配置間隔を調整します。値を小さくすると、より多くの点が補間され、線が滑らかになります。値を大きくすると点の間隔が広がり、線に独特のテクスチャや途切れが生じます。')}
              >
                {/* 線を引く際の点の配置間隔を調整する値（厚塗りペン） */}
                <DotPenPartsComponent dotPenFormParts="lerpStepForm" tool="oilPen" inputValue={inputOilLerpStep} />
              </div>
              <div
                onMouseEnter={() => handlePenToolDescription(setOilPenDescription, 'ドットの数', 'ペンが描画する点の数を調整できます。値を高く設定すると、ブラシがより多くの点を生成します。値を低く設定すると、点の間隔が広がりブラシのテクスチャが目立つようになります。')}
                onTouchStart={() => handlePenToolDescription(setOilPenDescription, 'ドットの数', 'ペンが描画する点の数を調整できます。値を高く設定すると、ブラシがより多くの点を生成します。値を低く設定すると、点の間隔が広がりブラシのテクスチャが目立つようになります。')}
              >
                {/* 描画される点の数を制御する値（厚塗りペン） */}
                <DotPenPartsComponent dotPenFormParts="lerpNumPointsForm" tool="oilPen" inputValue={inputOilNumPoints} />
              </div>
            </div>
          </div>
        </>
      );
    }
    // 該当する条件がない場合のデフォルトのレンダリング「selectAreaDelete」「selectMove」
    return <span className="text-Rounded" style={{ fontSize: '14px', color: '#ececec' }}>設定はありません。</span>;
  }






  return (
  <>
  


      {/* ツール・モード別分岐要素 */}
      {renderDotPenToolComponent(toolMode)}


      </>
  );
};


export { DetailDotPenBlock };