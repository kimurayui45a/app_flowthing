import React, { useRef, useState } from 'react';
import { PenToolAllDetail } from './PenToolAllDetail';
import { PenToolShareValueComponent } from './PenToolShareValueComponent';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5ToolModeContext } from '../P5ModeContext';


const DetailPen = () => {

  //タブの切り替えを管理するステート
  const [penDetailTabTabChange, setPenDetailTabTabChange] = useState(true); 

  const { 
    //概要説明
    description,
    betaDescription,
    mmPenDescription,
    inkPenDescription,
    watercolorDescription,
    pencilDescription,
    oilPenDescription,
    mixPenDescription
  } = useP5PenToolParametersContext();

  const { 
    toolMode
  } = useP5ToolModeContext();



  // コンテナ内で特定の位置(例: 200px)にスクロールする関数
  const scrollToItem = (containerId, position) => {
    const container = document.getElementById(containerId);

    if(container) {
      container.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  };

  //「概要欄」の切り替え
  const penToolDescriptionChange = (penToolDescription) => {
    switch (penToolDescription) {
      case 'betaPen':
        {/* ベタ塗り「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{betaDescription.description}</span>;
      case 'mmPen':
        {/* ミリペン「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{mmPenDescription.description}</span>;
      case 'inkPen':
        {/* インクペン「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{inkPenDescription.description}</span>;
      case 'watercolorPen':
        {/* 水彩ペン「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{watercolorDescription.description}</span>;
      case 'pencilPen':
        {/* エアブラシ「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{pencilDescription.description}</span>;
      case 'oilPen':
        {/* 厚塗りペン「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{oilPenDescription.description}</span>;
      case 'mixTool':
        {/* 色混ぜ「概要欄」 */}
        return <span className="text-Rounded" style={{ fontSize: '10px' }}>{mixPenDescription.description}</span>;
      default:
        return <span>説明はありません。</span>;
    }
  };


  //「概要欄のタイトル」の切り替え
  const penToolDescriptionTitleChange = (penToolDescription) => {
    switch (penToolDescription) {
      case 'betaPen':
        {/* ベタ塗り「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{betaDescription.title}]</span></div>;
      case 'mmPen':
        {/* ミリペン「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{mmPenDescription.title}]</span></div>;
      case 'inkPen':
        {/* インクペン「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{inkPenDescription.title}]</span></div>;
      case 'watercolorPen':
        {/* 水彩ペン「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{watercolorDescription.title}]</span></div>;
      case 'pencilPen':
        {/* エアブラシ「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{pencilDescription.title}]</span></div>;
      case 'oilPen':
        {/* 厚塗りペン「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{oilPenDescription.title}]</span></div>;
      case 'mixTool':
        {/* 色混ぜ「概要欄」 */}
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[{mixPenDescription.title}]</span></div>;
      default:
        return <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}><i className="bi bi-question-circle-fill"></i>[概要欄]</span></div>        ;
    }
  };

  return (
    <div className="select-detail-tool-container" style={{ position: 'relative' }}>
      <div className="flex">
        <div
          className="select-tool-tabbtn tooltip-container"
          onClick={() => setPenDetailTabTabChange(true)}
          onTouchStart={() => setPenDetailTabTabChange(true)}
          style={{
            backgroundColor: penDetailTabTabChange ? '#777777' : '#616161',
            borderBottom: penDetailTabTabChange ? 'none' : '1px solid #4A4A4A',
            color: penDetailTabTabChange ? '#ececec' : '#343434'
          }}
        >
          <span>ペン</span>
          <span className="tooltip-text" style={{ zIndex: '90' }}>ペンツールタブ</span>
        </div>

        <div
          className="shapes-tool-tabbtn tooltip-container"
          onClick={() => setPenDetailTabTabChange(false)}
          onTouchStart={() => setPenDetailTabTabChange(false)}
          style={{
            backgroundColor: !penDetailTabTabChange ? '#777777' : '#616161',
            borderBottom: !penDetailTabTabChange ? 'none' : '1px solid #4A4A4A',
            color: !penDetailTabTabChange ? '#ececec' : '#343434'
          }}
        >
          <span>筆圧設定</span>
          <span className="tooltip-text">筆圧設定タブ</span>
        </div>
      </div>

    
      {/* グループ分岐 */}
      {penDetailTabTabChange ? (
        <>
          <div className="select-detail-tool-group" style={{ position: 'relative' }}>
            {/* 「ペンツール」タブ */}
            <PenToolAllDetail />
          </div>

          <div
            style={{
              width: '100%',
              height: '75px',
              backgroundColor: '#c2c1c1',
              textAlign: 'left',
              lineHeight: '0.7',
              whiteSpace: 'pre-wrap',
              padding: '4px',
              borderTop: '2px solid #4A4A4A',
              position: 'absolute',
              top: '291px'
            }}>

            {/* 「概要説明」が表示される部分 */}
            {penToolDescriptionTitleChange(toolMode)}

            {/* 「ペン概要欄」の内容の切り替え */}
            {penToolDescriptionChange(toolMode)}

          </div>
        </>

      ) : (
        <>
        {/* 「筆圧設定」タブ */}
          <div className="select-detail-tool-group" style={{ position: 'relative', paddingTop: '18px' }}>
            <i className="bi bi-arrow-down-up"></i>
            <div
              className="flex-column text-Rounded"
              style={{
                width: '30px',
                height: '100px',
                backgroundColor: '#c2c1c1',
                position: 'absolute',
                top: '12px',
                left: '0px',
                zIndex: '80',
                boxShadow: '1px 1px black',
                fontSize: '10px',
                borderRadius: '0px 7px 7px 0px',
              }}
            >
              <div
                className="flex pressure-panel-btn"
                onClick={() => scrollToItem('shareValueContainer', 0)}
                onTouchStart={() => scrollToItem('shareValueContainer', 0)}
                style={{
                  borderBottom: '0.5px solid #4A4A4A',
                  borderRadius: '0px 7px 0px 0px'
                }}
              >
                筆圧
              </div>

              <div
                className="flex pressure-panel-btn"
                onClick={() => scrollToItem('shareValueContainer', 160)}
                onTouchStart={() => scrollToItem('shareValueContainer', 160)}
                style={{
                  borderBottom: '0.5px solid #4A4A4A',
                  borderTop: '0.5px solid #4A4A4A',
                  fontSize: '8px'
                }}
              >
                サイズ
              </div>

              <div
                className="flex pressure-panel-btn"
                onClick={() => scrollToItem('shareValueContainer', 360)}
                onTouchStart={() => scrollToItem('shareValueContainer', 360)}
                style={{
                  borderBottom: '0.5px solid #4A4A4A',
                  borderTop: '0.5px solid #4A4A4A'
                }}
              >
                S値
              </div>

              <div
                className="flex pressure-panel-btn"
                onClick={() => scrollToItem('shareValueContainer', 594)}
                onTouchStart={() => scrollToItem('shareValueContainer', 594)}
                style={{
                  borderTop: '0.5px solid #4A4A4A',
                  borderRadius: '0px 0px 7px 0px'
                }}
              >
                V値
              </div>
            </div>

            <div
              id="shareValueContainer"
              style={{ overflowY: 'auto', height: '250px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ marginTop: '20px' }}>
                {/* 筆圧調整UI */}
                <PenToolShareValueComponent penToolShareParts="pressureParts" />
              </div>
              <div style={{ marginTop: '35px' }}>
                {/* サイズ調整UI */}
                <PenToolShareValueComponent penToolShareParts="sizeParts" />
              </div>
              <div style={{ marginTop: '35px' }}>
                {/* S値調整UI */}
                <PenToolShareValueComponent penToolShareParts="saturationParts" />
              </div>
              <div style={{ marginTop: '35px' }}>
                {/* V値調整UI */}
                <PenToolShareValueComponent penToolShareParts="brightnessParts" />
              </div>
            </div>
          </div>
          
          <div
            style={{
              width: '100%',
              height: '75px',
              backgroundColor: '#c2c1c1',
              textAlign: 'left',
              lineHeight: '0.7',
              whiteSpace: 'pre-wrap',
              padding: '4px',
              borderTop: '2px solid #4A4A4A',
              position: 'absolute',
              top: '291px'
            }}>
            {/* 「概要説明」が表示される部分 */}
            <div><span className="text-Rounded" style={{ fontSize: '12px', fontWeight: '500' }}>
              <i className="bi bi-question-circle-fill"></i>[{description.title}]</span>
            </div>
            <span className="text-Rounded" style={{ fontSize: '10px' }}>
              {description.desc}
            </span>
          </div>
        </>
      )}
    </div>
  );
};



export { DetailPen };