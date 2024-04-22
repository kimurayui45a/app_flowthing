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
      className={`item-detail-panel ${containerClass} ${blurClass}`}
      position={{ x: pixiDetailPanelPosition.x, y: pixiDetailPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setPixiDetailPanelPosition, e, d)}
      size={{ width: 200, height: 140 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >
      <div className="item-detail-panel-title" style={{ marginTop: '8px' }}>
        <span>アイテム詳細</span>


          {/* 閉じる */}
          <div className="close-btn-position" style={{ top: '2px', right: '10px' }}>
  
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
        <div className="item-info">
          
          {/* <a href={`/items/${selectedItem.id}`}>View Details for Item ID: {selectedItem.id}</a> */}
  

<div className="flex-start-start-flex" style={{ width: '180px' }}>
            <div className="flex pixi-detail-item-background" style={{ width: '60px', height: '60px', margin: '3px', borderRadius: '3px' }}>
              <div>
                <div>
                  {selectedItem.image_choice === 'item_canvas' && selectedItem.item_canvas ? (
                    <a href={`/items/${selectedItem.id}`}>
                    <img src={selectedItem.item_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </a>
                  ) : selectedItem.image_choice === 'item_image' && selectedItem.item_image ? (
                    <a href={`/items/${selectedItem.id}`}>
                    <img src={selectedItem.item_image.url} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </a>
                  ) : (
                    <a href={`/items/${selectedItem.id}`}>
                    <div className="flex angleDegrees_value" style={{ justifyContent: 'flex-start' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{selectedItem.item_name}</span></div>
                    </a>
                  )}
                </div>
                  
              </div>
            </div>

            <div className="flex-start-start" style={{ marginLeft: '2px', width: '110px', marginTop: '5px' }}>
            
              <div className="angleDegrees_value flex-start-start"><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A', textAlign: 'left' }}>名前: {selectedItem.item_name || '---'}</span></div>
              <div className="angleDegrees_value flex-start-start"><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A', textAlign: 'left' }}>場所: {selectedItem.item_place || '---'}</span></div>
            </div>
            </div>

        </div>
      ) : (
        <span>Flow Thing情報がありません</span>
      )}
    </div>





    <div key={selectedSubUser?.id}>
{selectedSubUser ? (
  <div className="item-info">


    <div className="flex-end-end" style={{ width: '180px' }}>
      <div className="flex" style={{ width: '40px', height: '40px', marginTop: '-8px', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
        <div>
          <div>
            {selectedSubUser.icon_choice === 'sub_canvas' && selectedSubUser.sub_canvas ? (
              <a href={`/sub_users/${selectedSubUser.id}`}>
              <img src={selectedSubUser.sub_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </a>
            ) : selectedSubUser.icon_choice === 'sub_image' && selectedSubUser.sub_image ? (
              <a href={`/sub_users/${selectedSubUser.id}`}>
              <img className="item-icon-small" src={selectedSubUser.sub_image.url} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
  <span>Sub Thing情報がありません</span>
)}
</div>








    </div>
  </Rnd>
  );
};


export { PixiDetailPanel };