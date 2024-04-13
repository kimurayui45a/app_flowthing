import React from 'react';
import { useP5ToolModeContext } from '../P5ModeContext';


const PenToolComponent = ({handleChangeButton, selectPenButton, penClassName}) => {

  const { 
    toolMode
  } = useP5ToolModeContext();

  switch (selectPenButton) {
    case 'betaPen':
      return  (
        <>
          {/* ベタ塗りペン */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('betaPen', e)}
            onTouchStart={(e) => handleChangeButton('betaPen', e)}
            style={{ backgroundColor: toolMode === 'betaPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_2" data-name="レイヤー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15"  width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .beta-cls-1 {
                      stroke-miterlimit: 10;
                    }

                    .beta-cls-1, .beta-cls-2 {
                      fill: #231815;
                    }

                    .beta-cls-1, .beta-cls-3 {
                      stroke: #000;
                      stroke-width: .5px;
                    }

                    .beta-cls-2 {
                      stroke-width: 0px;
                    }

                    .beta-cls-3 {
                      fill: none;
                      stroke-miterlimit: 10;
                    }
                  `}
                </style>
              </defs>
              <g id="_べた" data-name=" べた">
                <path className="beta-cls-3" d="m8.91,20.45c-.27.46-.55,1.08-.7,1.84-.04.21-.07.42-.08.61l.49.49"/>
                <path className="beta-cls-3" d="m11.55,23.09c-.46.27-1.08.55-1.84.7-.21.04-.42.07-.61.08l-.49-.49"/>
              </g>
              <g id="_レイヤー_6" data-name=" レイヤー 6">
                <g id="_レイヤー_5" data-name=" レイヤー 5">
                  <path className="beta-cls-2" d="m7.97,24.6c-.34-.06-.68-.12-1.02-.19l1.35-1.35.6.61-.93.92h0Z"/>
                </g>
                <path className="beta-cls-1" d="m8.36,14.01h14.47c.19,0,.34.15.34.34v4.16c0,.18-.15.33-.33.33h-14.47c-.19,0-.34-.15-.34-.34v-4.15c0-.19.15-.34.34-.34Z" transform="translate(-7.04 15.77) rotate(-44.84)"/>
              </g>
            </svg>
            <span className="tooltip-text">ベタ塗りペン</span>
          </div>
        </>
      );
    case 'mmPen':
      return (
        <>
          {/* ミリペン */}
          <div
          className={`${penClassName} tooltip-container`}
          onClick={(e) => handleChangeButton('mmPen', e)}
          onTouchStart={(e) => handleChangeButton('mmPen', e)}
          style={{ backgroundColor: toolMode === 'mmPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_4" data-name="レイヤー 4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .mm-cls-1 {
                      fill: #231815;
                      stroke-width: 0px;
                    }
    
                    .mm-cls-2 {
                      fill: none;
                      stroke: #000;
                      stroke-miterlimit: 10;
                      stroke-width: .25px;
                    }
                  `}
                </style>
              </defs>
              <g>
                <path className="mm-cls-1" d="m8.69,23.89l-.69-.69c.38-.79.77-1.57,1.14-2.36l1.94,1.94c-.79.37-1.56.76-2.35,1.14l-.04-.04Z"/>
                <path className="mm-cls-1" d="m7.07,24.89l1.66-.96c-.12.12-.22.21-.28.27-.36.32-.73.63-1.21.69-.07,0-.13,0-.16,0Z"/>
                <path className="mm-cls-1" d="m8.04,23.23l-.97,1.65s0-.09,0-.16c.06-.48.37-.85.69-1.21.06-.06.15-.16.27-.28Z"/>
                <polygon className="mm-cls-1" points="8.69 23.89 8.73 23.93 7.07 24.89 8.04 23.23 8.69 23.89"/>
                <path className="mm-cls-1" d="m22.61,12.07l-10.9,10.84c-.14.14-.34.17-.44.07l-2.3-2.31c-.09-.11-.06-.3.08-.44l10.9-10.84c.14-.14.34-.17.44-.07l2.3,2.31c.1.1.06.3-.08.44Z"/>
              </g>
              <g>
                <path className="mm-cls-2" d="m10.36,22.06l-1.38-1.39c-.09-.11-.06-.3.08-.44l10.9-10.84c.14-.14.34-.17.44-.07l2.3,2.31c.1.1.06.3-.08.44l-10.9,10.84c-.14.14-.34.17-.44.07l-.2-.2"/>
                <path className="mm-cls-2" d="m8.69,23.89l.04.04c.79-.39,1.57-.77,2.35-1.14"/>
                <path className="mm-cls-2" d="m8.69,23.89l-.69-.69c.38-.79.77-1.57,1.14-2.36"/>
                <polyline className="mm-cls-2" points="11.08 22.78 10.36 22.06 9.15 20.84"/>
              </g>
            </svg>
            <span className="tooltip-text">ミリペン</span>
          </div>
        </>
      );
    case 'inkPen':
      return  (
        <>
          {/* インクペン */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('inkPen', e)}
            onTouchStart={(e) => handleChangeButton('inkPen', e)}
            style={{ backgroundColor: toolMode === 'inkPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_5" data-name="レイヤー 5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .ink-cls-1 {
                      fill: #231815;
                      stroke-width: 0px;
                    }

                    .ink-cls-2 {
                      fill: none;
                      stroke: #000;
                      stroke-miterlimit: 10;
                      stroke-width: .5px;
                    }
                  `}
                </style>
              </defs>
              <g>
                <path className="ink-cls-1" d="m12.57,21.1c-.39.24-.77.48-1.16.73l-.76-.76.73-1.16.31.32.55.55.31.32h.01Z"/>
                <g>
                  <path className="ink-cls-2" d="m12.57,21.1c-.39.24-.77.48-1.16.73l-.76-.76"/>
                  <path className="ink-cls-2" d="m10.65,21.06l.73-1.16.31.32.55.55"/>
                  <path className="ink-cls-2" d="m12.26,20.78c.19,0,.45,0,.74-.06.12-.02.34-.07.58-.17.39-.17.64-.41.76-.53,3.8-3.77,6.72-7.69,6.72-7.69.25-.33.75-1.02,1.33-1.99.31-.52-.02-.88-.54-.55-.93.59-1.61,1.1-1.93,1.35,0,0-3.79,2.98-7.47,6.9-.12.13-.35.39-.51.79-.1.24-.15.48-.17.6-.05.31-.08.58-.06.77"/>
                  <path className="ink-cls-2" d="m12.24,20.78l.31.32"/>
                </g>
              </g>
              <g id="_レイヤー_7" data-name=" レイヤー 7">
                <g>
                  <path className="ink-cls-1" d="m8.64,23.28c.07-.08.21-.04.29.02.08.07.14.17.23.22.08.04.17.06.29.06.51-.01.81-.02,1.07-.16-.02.02-.04.04-.05.07.01,0,.02-.01.03-.02l-.07.07c-.45.35-.91.47-1.08.5-.77.14-1.38-.15-1.58-.25.19-.03.46-.11.68-.32.07-.07.14-.14.18-.21h.02Z"/>
                  <g>
                    <path className="ink-cls-2" d="m10.51,23.46l.05-.05"/>
                    <path className="ink-cls-2" d="m10.65,23.35s-.05.05-.08.06"/>
                    <path className="ink-cls-2" d="m10.47,23.49s.02-.01.03-.02"/>
                    <path className="ink-cls-2" d="m10.53,23.42s-.04.04-.05.07c-.01.02-.03.03-.04.04"/>
                    <path className="ink-cls-2" d="m10.61,23.34v.02s-.05.03-.07.05"/>
                    <path className="ink-cls-2" d="m10.57,23.41s.05-.05.07-.07"/>
                    <path className="ink-cls-2" d="m10.57,23.41s-.03.04-.05.05"/>
                    <path className="ink-cls-2" d="m10.64,23.34l.02-.02c.3-.24.4-.59.53-1.04.05-.16.08-.31.08-.31.01-.09.02-.18.03-.24-.04-.08-.12-.2-.26-.31-.12-.1-.25-.17-.33-.2-.23.06-.55.19-.9.41-.2.14-.55.37-.83.81-.24.37-.24.61-.36.83-.04.07-.1.14-.18.21-.22.21-.49.29-.68.32.2.1.81.39,1.58.25.18-.03.64-.15,1.08-.5l.07-.07h.01"/>
                    <path className="ink-cls-2" d="m10.64,23.34s-.03.02-.04.02"/>
                    <path className="ink-cls-2" d="m10.54,23.41s.04-.03.06-.05"/>
                    <path className="ink-cls-2" d="m10.54,23.41h0"/>
                    <path className="ink-cls-2" d="m8.64,23.28c.07-.08.21-.04.29.02.08.07.14.17.23.22.08.04.17.06.29.06.51-.01.81-.02,1.07-.16"/>
                  </g>
                </g>
              </g>
            </svg>
            <span className="tooltip-text">インクペン</span>
          </div>
        </>
      );
    case 'watercolorPen':
      return  (
        <>
          {/* 水彩ペン */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('watercolorPen', e)}
            onTouchStart={(e) => handleChangeButton('watercolorPen', e)}
            style={{ backgroundColor: toolMode === 'watercolorPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_6" data-name="レイヤー 6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .water-cls-1 {
                      stroke-linecap: round;
                      stroke-linejoin: round;
                    }

                    .water-cls-1, .water-cls-2 {
                      fill: none;
                      stroke: #000;
                      stroke-width: .5px;
                    }

                    .water-cls-3 {
                      fill: #231815;
                      stroke-width: 0px;
                    }

                    .water-cls-2 {
                      stroke-miterlimit: 10;
                    }
                  `}
                </style>
              </defs>
              <g id="_レイヤー_3" data-name=" レイヤー 3">
                <g>
                  <path className="water-cls-3" d="m20.62,12.99s-2.76,3.6-6.4,7.07c-.11.11-1.78.91-1.67,1.01l-1.15-1.16c.1.1.92-1.54,1.02-1.66,3.5-3.6,7.11-6.35,7.11-6.35.31-.23.95-.71,1.84-1.24.49-.29.9-.5,1.16-.64-.14.27-.36.67-.65,1.15-.54.89-1.02,1.52-1.27,1.83h.01Z"/>
                  <g>
                    <path className="water-cls-1" d="m10.68,21.04c.24-.38.49-.75.71-1.13.1.1.92-1.54,1.02-1.66,3.5-3.6,7.11-6.35,7.11-6.35.31-.23.95-.71,1.84-1.24.49-.29.9-.5,1.16-.64-.14.27-.36.67-.65,1.15-.54.89-1.02,1.52-1.27,1.83,0,0-2.76,3.6-6.4,7.07-.11.11-1.78.91-1.67,1.01"/>
                    <path className="water-cls-1" d="m10.68,21.04l.74.74c.39-.23.75-.48,1.13-.71l-1.15-1.16"/>
                  </g>
                </g>
              </g>
              <g id="_レイヤー_3のコピー" data-name=" レイヤー 3のコピー">
                <g id="_レイヤー_7" data-name=" レイヤー 7">
                  <g>
                    <path className="water-cls-3" d="m8.62,23.31c.07-.08.2-.04.29.02.08.07.13.16.22.21.08.04.16.06.29.06.5-.01.8-.02,1.05-.15-.02.02-.04.04-.05.07.01,0,.02-.01.03-.02l-.07.07c-.44.35-.89.46-1.06.49-.75.13-1.36-.14-1.55-.24.18-.03.45-.11.66-.32.07-.07.13-.13.17-.2h.02Z"/>
                    <g>
                      <path className="water-cls-2" d="m10.46,23.49l.05-.05"/>
                      <path className="water-cls-2" d="m10.59,23.38s-.05.05-.08.06"/>
                      <path className="water-cls-2" d="m10.42,23.52s.02-.01.03-.02"/>
                      <path className="water-cls-2" d="m10.47,23.45s-.04.04-.05.07c-.01.02-.03.03-.04.04"/>
                      <path className="water-cls-2" d="m10.55,23.37v.02s-.05.03-.07.05"/>
                      <path className="water-cls-2" d="m10.51,23.44s.05-.05.07-.07"/>
                      <path className="water-cls-2" d="m10.51,23.44s-.03.04-.05.05"/>
                      <path className="water-cls-2" d="m10.58,23.37l.02-.02c.3-.23.39-.58.52-1.02.05-.15.08-.31.08-.31.01-.09.02-.17.03-.23-.04-.08-.12-.19-.26-.31-.12-.1-.24-.16-.33-.19-.22.06-.54.18-.88.4-.19.13-.54.37-.82.8-.23.37-.23.6-.36.82-.04.07-.1.13-.17.2-.21.2-.48.29-.66.32.19.1.8.38,1.55.24.17-.03.62-.14,1.06-.49l.07-.07h.01"/>
                      <path className="water-cls-2" d="m10.58,23.37s-.03.02-.04.02"/>
                      <path className="water-cls-2" d="m10.48,23.44s.04-.03.06-.05"/>
                      <path className="water-cls-2" d="m10.48,23.44h0"/>
                      <path className="water-cls-2" d="m8.62,23.31c.07-.08.2-.04.29.02.08.07.13.16.22.21.08.04.16.06.29.06.5-.01.8-.02,1.05-.15"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span className="tooltip-text">水彩ペン</span>
          </div>
        </>
      );
    case 'pencilPen':
      return  (
        <>
          {/* エアブラシ */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('pencilPen', e)}
            onTouchStart={(e) => handleChangeButton('pencilPen', e)}
            style={{ backgroundColor: toolMode === 'pencilPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-pencil-fill"></i>
            <span className="tooltip-text">エアブラシ</span>
          </div>
        </>
      );
    case 'oilPen':
      return  (
        <>
          {/* 厚塗りペン */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('oilPen', e)}
            onTouchStart={(e) => handleChangeButton('oilPen', e)}
            style={{ backgroundColor: toolMode === 'oilPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_7" data-name="レイヤー 7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .oil-cls-1 {
                      fill: #231815;
                      stroke-width: 0px;
                    }

                    .oil-cls-2 {
                      fill: none;
                      stroke: #000;
                      stroke-miterlimit: 10;
                      stroke-width: .5px;
                    }
                  `}
                </style>
              </defs>
              <g id="_レイヤー_9" data-name=" レイヤー 9">
                <g>
                  <path className="oil-cls-1" d="m14.92,18.79c-.7.75-1.53,1.61-2.68,2.59l-1.61-1.61c.99-1.14,1.84-1.97,2.6-2.67,2.75-2.59,4.98-4.44,6.64-5.76,2.35-1.88,2.68-1.99,2.76-1.92s-.06.42-1.93,2.75c-1.4,1.75-3.25,3.95-5.78,6.63Z"/>
                  <g>
                    <path className="oil-cls-2" d="m10.75,22.59c.3-.23.74-.58,1.25-1.01.08-.07.17-.14.25-.21,1.15-.99,1.97-1.84,2.68-2.59,2.53-2.67,4.37-4.88,5.78-6.63,1.87-2.33,2-2.67,1.93-2.75s-.41.04-2.76,1.92c-1.66,1.32-3.89,3.17-6.64,5.76-.75.7-1.61,1.53-2.6,2.67-.08.08-.14.17-.21.25-.44.52-.78.96-1.01,1.25"/>
                    <path className="oil-cls-2" d="m10.09,21.93l.66.67"/>
                    <path className="oil-cls-2" d="m10.09,21.93l-.67-.67"/>
                    <line className="oil-cls-2" x1="12.25" y1="21.38" x2="10.65" y2="19.78"/>
                  </g>
                </g>
              </g>
              <g>
                <path className="oil-cls-1" d="m10.01,24.08h.01c-.14.22-.27.43-.4.62-.09-.04-.24-.12-.43-.22-.29-.17-.52-.33-.73-.5-.45-.37-.7-.68-.98-1.03-.19-.25-.3-.42-.24-.5.02-.03.07-.04.13-.04.03,0,.06,0,.09.01.2.02.45.11.45.11,0,0,.22.21.29.29.26.26.26.35.47.58.15.18.4.47.81.61.22.07.41.08.53.07Z"/>
                <path className="oil-cls-2" d="m10.01,24.08c-.12.01-.31,0-.53-.07-.41-.14-.66-.43-.81-.61-.21-.23-.21-.32-.47-.58-.07-.08-.29-.29-.29-.29,0,0-.25-.09-.45-.11-.03-.01-.06-.01-.09-.01-.06,0-.11.01-.13.04-.06.08.05.25.24.5.28.35.53.66.98,1.03.21.17.44.33.73.5.19.1.34.18.43.22.13-.19.26-.4.4-.62.33-.58.56-1.13.73-1.62-.39-.4-.78-.81-1.18-1.21-.15.06-.29.13-.4.19-.14.08-.25.14-.29.16-.53.3-.88.68-1.18.74-.02,0-.24.04-.24.04"/>
              </g>
            </svg>
            <span className="tooltip-text">厚塗りペン</span>
          </div>
        </>
      );
    case 'mixTool':
      return  (
        <>
          {/* 指先ツール */}
          <div
            className={`${penClassName} tooltip-container`}
            onClick={(e) => handleChangeButton('mixTool', e)}
            onTouchStart={(e) => handleChangeButton('mixTool', e)}
            style={{ backgroundColor: toolMode === 'mixTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-droplet-half"></i>
            <span className="tooltip-text">色混ぜ</span>
          </div>
        </>
      );
    case 'eraseTool':
      return  (
        <>
          {/* 消しゴム */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('eraseTool', e)}
            onTouchStart={(e) => handleChangeButton('eraseTool', e)}
            style={{ backgroundColor: toolMode === 'eraseTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-eraser-fill"></i>
            <span className="tooltip-text">消しゴム</span>
          </div>
        </>
      )
    default:
      return (
        <>
          {/* ミリペン */}
          <div
          className="panel-tool-button tooltip-container"
          onClick={(e) => handleChangeButton('mmPen', e)}
          onTouchStart={(e) => handleChangeButton('mmPen', e)}
          style={{ backgroundColor: toolMode === 'mmPen' ? '#9199AE' : '#c2c1c1' }}
          >
            <svg id="_レイヤー_4" data-name="レイヤー 4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .mm-cls-1 {
                      fill: #231815;
                      stroke-width: 0px;
                    }
    
                    .mm-cls-2 {
                      fill: none;
                      stroke: #000;
                      stroke-miterlimit: 10;
                      stroke-width: .25px;
                    }
                  `}
                </style>
              </defs>
              <g>
                <path className="mm-cls-1" d="m8.69,23.89l-.69-.69c.38-.79.77-1.57,1.14-2.36l1.94,1.94c-.79.37-1.56.76-2.35,1.14l-.04-.04Z"/>
                <path className="mm-cls-1" d="m7.07,24.89l1.66-.96c-.12.12-.22.21-.28.27-.36.32-.73.63-1.21.69-.07,0-.13,0-.16,0Z"/>
                <path className="mm-cls-1" d="m8.04,23.23l-.97,1.65s0-.09,0-.16c.06-.48.37-.85.69-1.21.06-.06.15-.16.27-.28Z"/>
                <polygon className="mm-cls-1" points="8.69 23.89 8.73 23.93 7.07 24.89 8.04 23.23 8.69 23.89"/>
                <path className="mm-cls-1" d="m22.61,12.07l-10.9,10.84c-.14.14-.34.17-.44.07l-2.3-2.31c-.09-.11-.06-.3.08-.44l10.9-10.84c.14-.14.34-.17.44-.07l2.3,2.31c.1.1.06.3-.08.44Z"/>
              </g>
              <g>
                <path className="mm-cls-2" d="m10.36,22.06l-1.38-1.39c-.09-.11-.06-.3.08-.44l10.9-10.84c.14-.14.34-.17.44-.07l2.3,2.31c.1.1.06.3-.08.44l-10.9,10.84c-.14.14-.34.17-.44.07l-.2-.2"/>
                <path className="mm-cls-2" d="m8.69,23.89l.04.04c.79-.39,1.57-.77,2.35-1.14"/>
                <path className="mm-cls-2" d="m8.69,23.89l-.69-.69c.38-.79.77-1.57,1.14-2.36"/>
                <polyline className="mm-cls-2" points="11.08 22.78 10.36 22.06 9.15 20.84"/>
              </g>
            </svg>
            <span className="tooltip-text">ミリペン</span>
          </div>
        </>
      );
  }
};


export { PenToolComponent };

