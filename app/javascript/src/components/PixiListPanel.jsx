import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import p5 from 'p5';


const PixiListPanel = ({ itemAllId }) => {


  // useEffect(() => {
  //   console.log('アイテム', itemAllId);

  //   itemAllId.forEach(item => {
  //     console.log(`Name: ${item.item_name}`);
  //   });

  // }, []);

  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop
  } = usePixiGroup();


  const {

  } = usePixiComponentShare();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };


  // const containerRef = useRef(null);
  
  // useEffect(() => {
  //   const sketches = itemAllId.map(item => {
  //     const sketchHolder = document.createElement('div');
  //     containerRef.current.appendChild(sketchHolder);
      
  //     return new p5(p => {
  //       p.setup = () => {
  //         p.createCanvas(50, 50);
  //         p.background(255);
  //         // Load and display the item's image or handle different types of content
  //         if (item.image_choice === 'item_canvas') {
  //           p.loadImage(item.item_canvas, img => {
  //             p.image(img, 0, 0, 50, 50);
  //           });
  //         } else if (item.image_choice === 'item_image') {
  //           p.loadImage(item.item_image.url, img => {
  //             p.image(img, 0, 0, 50, 50);
  //           });
  //         } else {
  //           p.text('No Image', 10, 100);
  //         }
  //       };
  //     }, sketchHolder);
  //   });

  //   return () => {
  //     sketches.forEach(sketch => sketch.remove());
  //   };
  // }, [itemAllId]);


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
      className="control-panel"
      position={{ x: listPanelPosition.x, y: listPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setListPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >


        {/* <div ref={containerRef}></div>; */}
        {itemAllId.map((item, index) => (
        <div key={index} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
          {item.image_choice === 'item_canvas' && item.item_canvas ? (
            <img src={item.item_canvas} alt="Canvas Image" style={{ width: 50, height: 50 }} />
          ) : item.image_choice === 'item_image' && item.item_image ? (
            <img src={item.item_image.url} alt="Uploaded Image" style={{ width: 50, height: 50 }} />
          ) : (
            <p>No Image</p>
          )}


<div>
<span>{item.id}</span>
</div>
        </div>
      ))}

  </Rnd>
  );
};


export { PixiListPanel };