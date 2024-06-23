import React, { useEffect, useState, useRef } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { PixiCustomStyle } from './PixiCustomStyle';
import { PixiCustomSimple } from './PixiCustomSimple';
import { PixiCustomSpecial } from './PixiCustomSpecial';
// import { PixiPanelParts } from './PixiPanelParts';
// import { Rnd } from 'react-rnd';
//import { usePixiComponentShare } from './PixiComponentShareContext';



const PixiItemCustom = () => {



  const {
    pixiItemListTab,
    setPixiItemListTab
  } = usePixiGroup();

  // const { 
  //   activeSprite,
  //   spriteInfo,
  //   handleVerticalSwingById,
  //   handleVerticalSwingAnimationStop,
  //   handleHorizontalSwingById,
  //   handleHorizontalStopById
  // } = usePixiComponentShare();


  const renderCustom = (group) => {
    switch (group) {
      case 'style':
        return <PixiCustomStyle />;
      case 'simple':
        return <PixiCustomSimple />;
      case 'special':
        return <PixiCustomSpecial />;
      default:
        return <span>設定はありません。</span>;
    }
  };
  

  const handleSelecCustomTabChange = (newSelectMode) => {
    setPixiItemListTab(newSelectMode);
  };
  

  return (

<>
<div className="select-arrange-btn-block">



{/* スタイル */}
<div
  className="select-arrange-btn arrange-btn-left tooltip-container"
  onClick={() => handleSelecCustomTabChange('style')}
  onTouchStart={() => handleSelecCustomTabChange('style')}
  style={{
    backgroundColor: pixiItemListTab === 'style' ? '#9199AE' : '#c2c1c1',
    width: '55px'
    }}
>
<span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>スタイル</span>
      <span className="tooltip-text">スタイル</span>
    

</div>

{/* シンプル */}
<div
  className="select-arrange-btn arrange-btn-center tooltip-container"
  onClick={() => handleSelecCustomTabChange('simple')}
  onTouchStart={() => handleSelecCustomTabChange('simple')}
  style={{
    backgroundColor: pixiItemListTab === 'simple' ? '#9199AE' : '#c2c1c1',
    width: '55px'
    }}
>
<span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>シンプル</span>
  <span className="tooltip-text">シンプル</span>
</div>


{/* スペシャル */}
<div
  className="select-arrange-btn arrange-btn-right tooltip-container"
  onClick={() => handleSelecCustomTabChange('special')}
  onTouchStart={() => handleSelecCustomTabChange('special')}
  style={{
    backgroundColor: pixiItemListTab === 'special' ? '#9199AE' : '#c2c1c1',
    width: '55px'
    }}
>
  
<span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>トクベツ</span>
  <span className="tooltip-text">スペシャル</span>
</div>
</div>




    {/* パネル内容の切り替え */}
    {renderCustom(pixiItemListTab)}


</>
  );
};


export { PixiItemCustom };