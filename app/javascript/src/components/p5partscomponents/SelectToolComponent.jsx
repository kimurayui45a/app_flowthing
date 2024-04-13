import React from 'react';
import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectModeDetail } from './SelectModeDetail';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';


const SelectToolComponent = ({handleChangeButton, selectToolButton}) => {

  const { toolMode } = useP5ToolModeContext();

  const { handleCopyLayerConfirm } = useP5CanvasCoreShare();

  switch (selectToolButton) {
    case 'selectMode':
      return  (
        <>
          {/* 選択ツール */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('selectMode', e)}
            onTouchStart={(e) => handleChangeButton('selectMode', e)}
            style={{ backgroundColor: toolMode === 'selectMode' ? '#9199AE' : '#c2c1c1' }}
          >
            <SelectModeDetail selectToolPanelParts="selectModeIcon" />
            <span className="tooltip-text">選択範囲</span>
          </div>
        </>
      );
    case 'textTool':
      return (
        <>
          {/* テキストツール */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('textTool', e)}
            onTouchStart={(e) => handleChangeButton('textTool', e)}
            style={{ backgroundColor: toolMode === 'textTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-fonts"></i>
            <span className="tooltip-text">テキスト</span>
          </div>
        </>
      );
    case 'rectTool':
      return  (
        <>
          {/* 四角形 */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('rectTool', e)}
            onTouchStart={(e) => handleChangeButton('rectTool', e)}
            style={{ backgroundColor: toolMode === 'rectTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-square"></i>
            <span className="tooltip-text">四角形</span>
          </div>
        </>
      );
    case 'circleTool':
      return  (
        <>
          {/* 円形 */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('circleTool', e)}
            onTouchStart={(e) => handleChangeButton('circleTool', e)}
            style={{ backgroundColor: toolMode === 'circleTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-circle"></i>
            <span className="tooltip-text">円形</span>
          </div>
        </>
      );
    case 'triangleTool':
      return  (
        <>
          {/* 三角形 */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('triangleTool', e)}
            onTouchStart={(e) => handleChangeButton('triangleTool', e)}
            style={{ backgroundColor: toolMode === 'triangleTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-triangle"></i>
            <span className="tooltip-text">三角形</span>
          </div>
        </>
      );
    case 'lineTool':
      return  (
        <>
          {/* 直線 */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('lineTool', e)}
            onTouchStart={(e) => handleChangeButton('lineTool', e)}
            style={{ backgroundColor: toolMode === 'lineTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-slash-lg"></i>
            <span className="tooltip-text">直線</span>
          </div>
        </>
      );
    case 'imageTool':
      return  (
        <>
          {/* 画像挿入 */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('imageTool', e)}
            onTouchStart={(e) => handleChangeButton('imageTool', e)}
            style={{ backgroundColor: toolMode === 'imageTool' ? '#9199AE' : '#c2c1c1' }}
          >
            <i className="bi bi-image"></i>
            <span className="tooltip-text">画像</span>
          </div>
        </>
      );   
    case 'copyLayerBtn':
      return (
        <>
          <div
            className="panel-tool-button tooltip-container"
            onClick={handleCopyLayerConfirm}
            onTouchStart={handleCopyLayerConfirm}
          >
            <svg id="_レイヤー_17" data-name="レイヤー 17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.16 31.15" width="31.16" height="31.15">
              <defs>
                <style>
                  {`
                    .copylayer-cls-1, .copylayer-cls-2, .copylayer-cls-3, .copylayer-cls-4, .copylayer-cls-5, .copylayer-cls-6 {
                      stroke: #000;
                    }

                    .copylayer-cls-1, .copylayer-cls-2, .copylayer-cls-3, .copylayer-cls-5 {
                      stroke-linecap: round;
                    }

                    .copylayer-cls-1, .copylayer-cls-2, .copylayer-cls-5, .copylayer-cls-6 {
                      stroke-linejoin: round;
                    }

                    .copylayer-cls-1, .copylayer-cls-3, .copylayer-cls-4, .copylayer-cls-5, .copylayer-cls-6 {
                      fill: none;
                    }

                    .copylayer-cls-2, .copylayer-cls-4 {
                      stroke-width: .75px;
                    }

                    .copylayer-cls-3, .copylayer-cls-4 {
                      stroke-miterlimit: 10;
                    }

                    .copylayer-cls-3, .copylayer-cls-5, .copylayer-cls-6 {
                      stroke-width: .5px;
                    }

                    .copylayer-cls-7 {
                      stroke-width: 0px;
                    }
                  `}
                </style>
              </defs>
              <g id="_レイヤー_13" data-name=" レイヤー 13">
                <path className="copylayer-cls-1" d="m8.39,7.54h-1.54c-.68,0-1.24.56-1.24,1.24v17.3c0,.68.56,1.24,1.24,1.24h11.42c.68,0,1.24-.56,1.24-1.24v-9.94"/>
                <path className="copylayer-cls-4" d="m17.01,13.75c.72.42,1.57.72,2.5.87.42.08.86.11,1.31.11,3.5,0,6.33-2.19,6.33-4.89s-2.84-4.89-6.33-4.89c-3.02,0-6.33,2.28-6.33,4.89,0,1.17.66,2.14,1.24,2.76"/>
                <path className="copylayer-cls-5" d="m17.31,13.66c-.26.23-.75.65-1.52.87-.77.23-1.42.17-1.75.12.57-.75,1.15-1.51,1.7-2.26"/>
                <path className="copylayer-cls-2" d="m14.61,5.62c-.36.53-.77,1.19-1.13,1.99-.3.66-.51,1.3-.66,1.84h-2.11c-.48,0-.87-.39-.87-.87v-2.08c0-.24.09-.45.26-.62.2-.2.45-.24.62-.26.57-.06,2.01-.08,3.91,0Z"/>
              </g>
              <g id="_レイヤー_14" data-name=" レイヤー 14">
                <path className="copylayer-cls-6" d="m11.03,14.31c-.71,0-1.21.41-1.37.54-.11.08-.53.45-.77,1.09-.24.66-.14,1.24,0,1.99.09.48.18.95.47,1.51.17.3.57,1.06,1.42,1.54,1.49.86,3.11.23,3.41.11.77-.3,1.24-.74,1.49-.97.95-.89,1.34-1.9,1.49-2.43-.33-.06-.77-.15-1.27-.33-.77-.27-1.51-.53-2.13-1.16-.26-.27-.39-.5-.87-.97-.44-.42-.66-.56-.74-.59-.2-.11-.6-.33-1.16-.32l.03-.02Z"/>
                <circle className="copylayer-cls-7" cx="10.32" cy="16.63" r=".5"/>
                <path className="copylayer-cls-3" d="m10.4,22.33c.17-.35.33-.69.5-1.04"/>
                <path className="copylayer-cls-3" d="m15.29,22.38l-.77-1.45"/>
                <line className="copylayer-cls-3" x1="8.47" y1="17.13" x2="7.96" y2="17.13"/>
              </g>
              <g id="_レイヤー_14のコピー" data-name=" レイヤー 14のコピー">
                <path className="copylayer-cls-6" d="m19.72,6.84c-.53,0-.9.3-1.03.39-.08.06-.39.33-.57.81-.18.5-.11.92,0,1.48.06.35.14.71.35,1.12.12.23.42.78,1.06,1.15,1.1.63,2.31.17,2.53.08.57-.23.92-.54,1.12-.72.71-.66,1-1.42,1.12-1.79-.24-.05-.57-.12-.94-.24-.57-.2-1.12-.39-1.57-.86-.18-.2-.29-.38-.65-.71-.33-.32-.5-.41-.56-.44-.15-.08-.45-.24-.86-.24v-.02Z"/>
                <circle className="copylayer-cls-7" cx="19.19" cy="8.56" r=".36"/>
                <path className="copylayer-cls-3" d="m19.25,12.8c.12-.26.26-.51.38-.77"/>
                <path className="copylayer-cls-3" d="m22.89,12.83c-.2-.36-.38-.72-.57-1.09"/>
                <line className="copylayer-cls-3" x1="17.81" y1="8.92" x2="17.43" y2="8.92"/>
              </g>
            </svg>
            <span className="tooltip-text">ペースト</span>
          </div>
        </>
      );
      case 'selectAreaDeleteIcon':
        return (
          <>
            {/* 選択範囲削除のアイコン */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
              <defs>
                <style>
                  {`
                    .select-area-delete-cls-1, .select-area-delete-cls-2, .select-area-delete-cls-3 {
                      fill: none;
                      stroke: #000;
                      stroke-miterlimit: 10;
                    }

                    .select-area-delete-cls-1, .select-area-delete-cls-3 {
                      stroke-linecap: round;
                    }

                    .select-area-delete-cls-2 {
                      stroke-width: 4px;
                    }

                    .select-area-delete-cls-3 {
                      stroke-dasharray: 0 0 0 0 0 0 1 2;
                    }

                    .select-area-delete-cls-4 {
                      stroke-width: 0px;
                    }
                  `}
                </style>
              </defs>
              <g id="_レイヤー_44のコピー" data-name="レイヤー 44のコピー">
                <g>
                  <line className="select-area-delete-cls-1" x1="17.76" y1="8.62" x2="17.76" y2="11.39"/>
                  <line className="select-area-delete-cls-1" x1="14.61" y1="9.46" x2="16" y2="11.85"/>
                  <line className="select-area-delete-cls-1" x1="12.31" y1="11.76" x2="14.71" y2="13.14"/>
                  <line className="select-area-delete-cls-1" x1="11.47" y1="14.9" x2="14.23" y2="14.9"/>
                  <line className="select-area-delete-cls-1" x1="12.31" y1="18.05" x2="14.71" y2="16.67"/>
                  <line className="select-area-delete-cls-1" x1="14.61" y1="20.35" x2="16" y2="17.95"/>
                  <line className="select-area-delete-cls-1" x1="17.76" y1="21.19" x2="17.76" y2="18.43"/>
                  <line className="select-area-delete-cls-1" x1="20.9" y1="20.35" x2="19.52" y2="17.95"/>
                  <line className="select-area-delete-cls-1" x1="23.2" y1="18.05" x2="20.81" y2="16.67"/>
                  <line className="select-area-delete-cls-1" x1="24.05" y1="14.9" x2="21.28" y2="14.9"/>
                  <line className="select-area-delete-cls-1" x1="23.2" y1="11.76" x2="20.81" y2="13.14"/>
                  <line className="select-area-delete-cls-1" x1="20.9" y1="9.46" x2="19.52" y2="11.85"/>
                </g>
              </g>
              <g id="_レイヤー_38のコピー" data-name="レイヤー 38のコピー">
                <g>
                  <g id="_レイヤー_9" data-name=" レイヤー 9">
                    <path className="select-area-delete-cls-3" d="m9.74,20.55V6.97s.03-.08.08-.08h15.87s.08.03.08.08v15.87s-.03.08-.08.08h-13.5"/>
                  </g>
                  <g id="_レイヤー_22のコピー" data-name=" レイヤー 22のコピー">
                    <g>
                      <line className="select-area-delete-cls-2" x1="4.45" y1="28.22" x2="7.81" y2="24.86"/>
                      <polygon className="select-area-delete-cls-4" points="9.54 28.01 11.32 21.35 4.66 23.13 9.54 28.01"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </>
        );

        case 'selectAreaDeleteInversionIcon':
          return (
            <>
              {/* 選択範囲外削除のアイコン */}
              <svg id="_レイヤー_44のコピー_2" data-name="レイヤー 44のコピー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .select-area-inversion-cls-1, .select-area-inversion-cls-2, .select-area-inversion-cls-3, .select-area-inversion-cls-4 {
                        fill: none;
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }

                      .select-area-inversion-cls-2 {
                        stroke-dasharray: 0 0 1.03 2.07;
                      }

                      .select-area-inversion-cls-3 {
                        stroke-dasharray: 0 0 .98 1.97;
                      }

                      .select-area-inversion-cls-4 {
                        stroke-dasharray: 0 0 1.12 2.24;
                      }
                    `}
                  </style>
                </defs>
                <g>
                  <line className="select-area-inversion-cls-1" x1="10.09" y1="23.8" x2="12.53" y2="22.4"/>
                  <line className="select-area-inversion-cls-1" x1="13.72" y1="27.42" x2="15.9" y2="23.65"/>
                  <line className="select-area-inversion-cls-1" x1="18.67" y1="28.75" x2="18.67" y2="24.4"/>
                  <line className="select-area-inversion-cls-1" x1="23.62" y1="27.42" x2="21.43" y2="23.65"/>
                  <line className="select-area-inversion-cls-1" x1="27.24" y1="23.8" x2="23.47" y2="21.63"/>
                  <line className="select-area-inversion-cls-1" x1="28.57" y1="18.85" x2="24.22" y2="18.85"/>
                  <line className="select-area-inversion-cls-1" x1="27.24" y1="13.9" x2="23.47" y2="16.08"/>
                  <line className="select-area-inversion-cls-1" x1="23.62" y1="10.28" x2="22.2" y2="12.73"/>
                </g>
                <g>
                  <line className="select-area-inversion-cls-1" x1="20.16" y1="11.96" x2="20.16" y2="12.46"/>
                  <line className="select-area-inversion-cls-3" x1="20.16" y1="14.43" x2="20.16" y2="19.35"/>
                  <polyline className="select-area-inversion-cls-1" points="20.16 20.34 20.16 20.84 19.66 20.84"/>
                  <line className="select-area-inversion-cls-2" x1="17.59" y1="20.84" x2="6.21" y2="20.84"/>
                  <polyline className="select-area-inversion-cls-1" points="5.18 20.84 4.68 20.84 4.68 20.34"/>
                  <line className="select-area-inversion-cls-2" x1="4.68" y1="18.27" x2="4.68" y2="6.89"/>
                  <polyline className="select-area-inversion-cls-1" points="4.68 5.85 4.68 5.35 5.18 5.35"/>
                  <line className="select-area-inversion-cls-2" x1="7.25" y1="5.35" x2="18.63" y2="5.35"/>
                  <polyline className="select-area-inversion-cls-1" points="19.66 5.35 20.16 5.35 20.16 5.85"/>
                  <line className="select-area-inversion-cls-4" x1="20.16" y1="8.1" x2="20.16" y2="10.34"/>
                  <line className="select-area-inversion-cls-1" x1="20.16" y1="11.46" x2="20.16" y2="11.96"/>
                </g>
              </svg>
            </>
          );
    default:
      return  (
        <>
          {/* 選択ツール */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={(e) => handleChangeButton('selectMode', e)}
            onTouchStart={(e) => handleChangeButton('selectMode', e)}
            style={{ backgroundColor: toolMode === 'selectMode' ? '#9199AE' : '#c2c1c1' }}
          >
            <SelectModeDetail selectToolPanelParts="selectModeIcon" />
            <span className="tooltip-text">選択範囲</span>
          </div>
        </>
      );
  }
};


export { SelectToolComponent };