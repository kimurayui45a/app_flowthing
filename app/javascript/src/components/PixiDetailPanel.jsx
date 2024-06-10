import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';


const PixiDetailPanel = ({ itemAllId, subUserAllId }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubUser, setSelectedSubUser] = useState(null);
  const [containerClass, setContainerClass] = useState('default-background');
  const [blurClass, setBlurClass] = useState('default-class');

  const {
    pixiDetailPanelPosition,
    setPixiDetailPanelPosition,
    handlePixiPanelDragStop,
    togglePixiDetailPanelClose
  } = usePixiGroup();


  const {
    activeSprite,
    spriteInfo
  } = usePixiComponentShare();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);
    if (sprite) {
      const item = itemAllId.find(item => item.id === sprite.item_id);
      const subUser = subUserAllId.find(user => user.id === sprite.sub_user_id);
      setSelectedItem(item);
      setSelectedSubUser(subUser);
      if (subUser) {
        setContainerClass(getContainerClassForItemsCount(subUser.items_count));
        const classFromLastAccessed = getClassForLastAccessed(subUser.last_accessed_at);
        setBlurClass(classFromLastAccessed);
      }
    } else {
      setSelectedItem(null);
      setSelectedSubUser(null);
      setContainerClass('default-background');
      setBlurClass('default-class');
    }

  }, [activeSprite]);



  const getContainerClassForItemsCount = (itemsCount) => {
    if (!itemsCount) return 'default-background';

    switch (true) {
      case itemsCount >= 50:
        return 'red-background';
      case itemsCount >= 40:
        return 'purple-background';
      case itemsCount >= 30:
        return 'blue-background';
      case itemsCount >= 25:
        return 'melon-background';
      case itemsCount >= 20:
        return 'light-blue-background';
      case itemsCount >= 15:
        return 'green-background';
      case itemsCount >= 10:
        return 'sakura-background';
      case itemsCount >= 5:
        return 't-red-background';
      case itemsCount >= 3:
        return 'yellowgreen-background';
      case itemsCount >= 1:
        return 'yellow-background';
      default:
        return 'default-background';
    }
  };
  

  const getClassForLastAccessed = (lastAccessedAt) => {
    if (!lastAccessedAt) return 'default-class';
  
    const hoursElapsed = Math.round((new Date() - new Date(lastAccessedAt)) / (1000 * 60 * 60));
  
    switch (true) {
      case (hoursElapsed >= 0 && hoursElapsed <= 2):
        return 'blur-0-card';
      case (hoursElapsed >= 3 && hoursElapsed <= 24):
        return 'blur-1-card';
      case (hoursElapsed >= 25 && hoursElapsed <= 72):
        return 'blur-2-card';
      case (hoursElapsed >= 73 && hoursElapsed <= 168):
        return 'blur-3-card';
      case (hoursElapsed >= 169 && hoursElapsed <= 720):
        return 'blur-4-card';
      case (hoursElapsed >= 721 && hoursElapsed <= 1464):
        return 'blur-5-card';
      case (hoursElapsed >= 1465 && hoursElapsed <= 2184):
        return 'blur-6-card';
      case (hoursElapsed >= 2185 && hoursElapsed <= 2568):
        return 'blur-7-card';
      case (hoursElapsed >= 2569 && hoursElapsed <= 4392):
        return 'item-card-container-gray-detail';
      case (hoursElapsed >= 4393 && hoursElapsed <= 8760):
        return 'item-card-container-black-detail';
      default:
        return 'item-card-container-redblack-detail';
    }
  };
  

  

  return (
    <Rnd
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      //className={`item-detail-panel ${containerClass} ${blurClass}`}
      // className="item-detail-panel"
      position={{ x: pixiDetailPanelPosition.x, y: pixiDetailPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setPixiDetailPanelPosition, e, d)}
      size={{ width: 200, height: 200 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >


<div className="poi-container">
<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 163.83 133.92" width="163.83" height="133.92">
  <defs>
    <style>
    {`
      .poi-icon-cls-1 {
        fill: url(#_名称未設定グラデーション_87);
      }

      .poi-icon-cls-1, .poi-icon-cls-2, .poi-icon-cls-3, .poi-icon-cls-4 {
        stroke-width: 0px;
      }

      .poi-icon-cls-2 {
        fill: url(#_名称未設定グラデーション_130);
      }

      .poi-icon-cls-5 {
        opacity: .75;
      }

      .poi-icon-cls-3 {
        fill: #4d74b1;
      }

      .poi-icon-cls-4 {
        fill: #fff;
      }
      `}
    </style>
    <linearGradient id="_名称未設定グラデーション_130" data-name="名称未設定グラデーション 130" x1="64.4" y1="19.9" x2="114.52" y2="106.7" gradientUnits="userSpaceOnUse">
      <stop offset=".38" stopColor="#413d3c"/>
      <stop offset=".88" stopColor="#8e8e8e"/>
    </linearGradient>
    <linearGradient id="_名称未設定グラデーション_87" data-name="名称未設定グラデーション 87" x1="115.32" y1="-22.46" x2="29.91" y2="125.46" gradientUnits="userSpaceOnUse">
      <stop offset=".13" stopColor="#cddef2"/>
      <stop offset=".49" stopColor="#559ed7"/>
      <stop offset=".79" stopColor="#5c80b1"/>
    </linearGradient>
  </defs>
  <g id="_レイヤー_3" data-name="レイヤー 3" className="poi-icon-cls-5">
    <path className="poi-icon-cls-2" d="m162.59,7.75c2.18,3.12,1.43,7.41-1.69,9.59-1.56,1.09-3.41,1.44-5.15,1.14l-.26-.06s-37.03,25.92-51.91,36.33c-3.35,2.34-4.6,6.67-3.08,10.46,8.44,21.12,1.62,46.03-17.82,59.63-22.67,15.87-53.92,10.35-69.79-12.32C-2.98,89.87,2.54,58.62,25.21,42.75c19.44-13.61,45.18-11.5,62.13,3.67,3.05,2.72,7.54,3.03,10.89.69,14.88-10.41,51.91-36.33,51.91-36.33l.03-.27c.31-1.74,1.28-3.35,2.84-4.44,3.12-2.18,7.41-1.43,9.59,1.69h0Zm-3.89,6.45c1.38-.96,1.71-2.87.75-4.25s-2.87-1.71-4.25-.75-1.71,2.87-.75,4.25,2.87,1.71,4.25.75Z"/>
  </g>
  <g id="_レイヤー_2" data-name="レイヤー 2">
    <g>
      <g>
        <path className="poi-icon-cls-1" d="m50.84,129.75c-16.42,0-31.83-8.02-41.24-21.45C1.9,97.3-1.06,83.96,1.28,70.73c2.33-13.23,9.68-24.75,20.68-32.45,8.5-5.95,18.46-9.09,28.79-9.09,12.43,0,24.34,4.54,33.54,12.78,1.53,1.37,3.49,2.12,5.52,2.12h0c1.68,0,3.29-.51,4.67-1.47L145.87,6.64v-.05c.35-1.95,1.42-3.64,3.03-4.76,1.24-.87,2.7-1.33,4.21-1.33,2.4,0,4.64,1.17,6.02,3.13,2.32,3.32,1.51,7.9-1.8,10.22-1.24.87-2.7,1.33-4.22,1.33-.42,0-.85-.04-1.26-.11l-.07-.02-51.38,35.97c-3.13,2.19-4.31,6.22-2.88,9.8,8.7,21.77,1.35,46.37-17.88,59.83-8.5,5.95-18.45,9.09-28.79,9.09ZM153.11,5.31c-.52,0-1.02.16-1.45.46-.55.39-.92.97-1.04,1.63-.12.67.03,1.34.42,1.89.47.67,1.25,1.08,2.08,1.08h0c.52,0,1.02-.16,1.45-.46.55-.39.92-.97,1.04-1.63.12-.67-.03-1.34-.42-1.89-.47-.67-1.25-1.08-2.08-1.08Z"/>
        <path className="poi-icon-cls-3" d="m153.11,1c2.16,0,4.28,1.02,5.61,2.92,2.17,3.1,1.42,7.36-1.68,9.53-1.2.84-2.57,1.24-3.93,1.24-.4,0-.79-.03-1.18-.1l-.26-.06s-36.78,25.75-51.56,36.09c-3.33,2.33-4.57,6.63-3.06,10.4,8.39,20.98,1.61,45.72-17.7,59.24-8.69,6.08-18.64,9-28.5,9-15.7,0-31.14-7.4-40.83-21.24C-5.75,85.49-.28,54.45,22.25,38.69c8.69-6.08,18.65-9,28.51-9,12.05,0,23.95,4.36,33.21,12.65,1.66,1.48,3.76,2.25,5.86,2.25,1.73,0,3.46-.51,4.96-1.56,14.78-10.35,51.56-36.09,51.56-36.09l.03-.27c.3-1.73,1.27-3.33,2.82-4.41,1.19-.84,2.56-1.24,3.92-1.24m0,9.87c.6,0,1.21-.18,1.73-.55,1.37-.96,1.7-2.85.74-4.22-.59-.84-1.53-1.29-2.49-1.29-.6,0-1.21.18-1.73.55-1.37.96-1.7,2.85-.74,4.22.59.84,1.53,1.29,2.49,1.29m0-10.87c-1.61,0-3.17.49-4.49,1.42-1.68,1.18-2.82,2.92-3.21,4.93l-51.21,35.85c-1.29.91-2.81,1.38-4.38,1.38-1.91,0-3.75-.71-5.19-1.99-9.3-8.32-21.33-12.9-33.88-12.9-10.44,0-20.5,3.18-29.08,9.19C10.56,45.64,3.14,57.28.79,70.64c-2.36,13.36.63,26.83,8.41,37.94,9.5,13.56,25.06,21.66,41.65,21.66,10.44,0,20.49-3.18,29.08-9.18,9.44-6.61,16.41-16.32,19.62-27.36,3.17-10.87,2.61-22.61-1.57-33.07-1.34-3.36-.23-7.15,2.71-9.2l51.21-35.85c.4.06.81.09,1.22.09,1.62,0,3.18-.49,4.51-1.42,1.72-1.2,2.86-3,3.23-5.06.36-2.06-.1-4.14-1.3-5.86-1.47-2.1-3.87-3.35-6.43-3.35h0Zm0,9.87c-.67,0-1.29-.32-1.67-.86-.64-.92-.42-2.19.5-2.83.34-.24.74-.37,1.16-.37.67,0,1.29.32,1.67.86.31.44.43.98.33,1.52-.09.54-.39,1-.83,1.31-.34.24-.74.37-1.16.37h0Z"/>
      </g>
      <circle className="poi-icon-cls-4" cx="50.78" cy="79.47" r="44.42"/>
    </g>
  </g>
</svg>
</div>


      <div className="item-detail-panel-title" style={{ marginTop: '8px' }}>
        {/* <span>Flow Thing詳細</span> */}


          {/* 閉じる */}
          <div className="close-btn-position" style={{ top: '110px', right: '15px' }}>
  
            <div
              className="close-btn tooltip-container"
              onClick={togglePixiDetailPanelClose}
              onTouchStart={togglePixiDetailPanelClose}
              style={{ color: '#4A4A4A' }}
            >
              <i className="bi bi-x-lg"></i>
              <span className="tooltip-text">閉じる</span>
            </div>
          </div>


      </div>

      <div className="flex-column">
      <div key={selectedItem?.id}>
      {selectedItem ? (
        <div className="item-info" style={{ position: 'relative' }}>
            

              
              
                  <div style={{ position: 'absolute', zIndex: 51, top: '55px', left: '-95px' }}>
                    {selectedItem.image_choice === 'item_canvas' && selectedItem.item_canvas ? (
                      <a href={`/items/${selectedItem.id}`}>
                      <img src={selectedItem.item_canvas} alt="Canvas Image" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                      </a>
                    ) : selectedItem.image_choice === 'item_image' && selectedItem.item_image ? (
                      <a href={`/items/${selectedItem.id}`}>
                      <img src={selectedItem.item_image.url} alt="Uploaded Image" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                      </a>
                    ) : (
                      <a href={`/items/${selectedItem.id}`}>
                      <div className="flex angleDegrees_value" style={{ justifyContent: 'flex-start' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{selectedItem.item_name}</span></div>
                      </a>
                    )}
                  </div>
              
              

              <div className="detail-plate">
              
                <div className="angleDegrees_value flex-start-start"><span className="text-Rounded" style={{ fontSize: '12px', color: '#4A4A4A', textAlign: 'left' }}>名前: {selectedItem.item_name || '---'}</span></div>
                <div className="angleDegrees_value flex-start-start"><span className="text-Rounded" style={{ fontSize: '12px', color: '#4A4A4A', textAlign: 'left' }}>場所: {selectedItem.item_place || '---'}</span></div>
              </div>
          

        </div>
      ) : (
        <span className="text-Rounded" style={{ fontSize: '12px', color: '#4A4A4A', textAlign: 'left' }}>---</span>
      )}
    </div>





    <div key={selectedSubUser?.id}>
      {selectedSubUser ? (
        <div className="item-info">

          <div style={{ position: 'absolute', zIndex: 49, bottom: '5px', right: '5px' }}>
            <div className="flex" style={{ width: '40px', height: '40px', marginTop: '-8px', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
              <div>
                <div>
                  {selectedSubUser.icon_choice === 'sub_canvas' && selectedSubUser.sub_canvas ? (
                    <a href={`/sub_users/${selectedSubUser.id}`}>
                    <img src={selectedSubUser.sub_canvas} alt="Canvas Image" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '50%' }} />
                    </a>
                  ) : selectedSubUser.icon_choice === 'sub_image' && selectedSubUser.sub_image ? (
                    <a href={`/sub_users/${selectedSubUser.id}`}>
                    <img className="item-icon-small" src={selectedSubUser.sub_image.url} alt="Uploaded Image" style={{ width: '40px', height: '40px%', objectFit: 'contain', borderRadius: '50%' }} />
                    </a>
                  ) : (
                    <a href={`/sub_users/${selectedSubUser.id}`}>
                    <div className="flex" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: selectedSubUser.sub_color }}></div>
                    </a>
                  )}
                </div>
                  
              </div>
            </div>
            {/* 
            <div className="flex-start-start">
              <div><span>名前: {selectedSubUser.item_name || '---'}</span></div>
              <div><span>場所: {selectedSubUser.item_place || '---'}</span></div>
            </div> */}
          </div>

        </div>
      ) : (
        <span className="text-Rounded" style={{ fontSize: '12px', color: '#4A4A4A', textAlign: 'left' }}>---</span>
      )}
    </div>








    </div>


  </Rnd>
  );
};


export { PixiDetailPanel };