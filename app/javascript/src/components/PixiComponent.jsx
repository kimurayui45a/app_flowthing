import React, { useEffect, useRef } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';
import { PixiComponentShareProvider } from './PixiComponentShareContext';
import { PixiListPanel } from './PixiListPanel';
import { PixiCustomPanel } from './PixiCustomPanel';
import { PixiDetailPanel } from './PixiDetailPanel';
import { usePixiGroup } from './PixiGroupContext';

const PixiComponent = ({ itemAllId, spaceAllId, onDataFromGrandchild, pixiMode }) => {


  const {
    customPanelVisible,
    pixiDetailPanelVisible,
    togglePixiDetailPanelVisible
  } = usePixiGroup();


  const pixiContainer = useRef(null);
  const appRef = useRef(null);


  useEffect(() => {
    console.log('アイテム', itemAllId);
    console.log('スペース', spaceAllId);

    itemAllId.forEach(item => {
      console.log(`Name: ${item.item_name}`);
    });

  }, []);


  useEffect(() => {
    const init = async () => {
      const app = new Application({
        background: 0x1099bb,
        width: 800,
        height: 600
        // resizeTo: window
      });
      pixiContainer.current.appendChild(app.view);
      appRef.current = app;

      const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;


      const itemWithIdSecond = itemAllId.find(item => item.id === 385);
      if (itemWithIdSecond) {
        const textureimage = Texture.from(itemWithIdSecond.item_canvas);
        const itemSprite = createItemSprite(app, textureimage, app.screen.width / 2, app.screen.height / 2);
        randomMove(itemSprite, app);
      }


      const itemWithIdOne = itemAllId.find(item => item.id === 387);
      if (itemWithIdOne) {
        const textureimage = Texture.from(itemWithIdOne.item_canvas);
        const itemSprite = createItemSprite(app, textureimage, app.screen.width / 2, app.screen.height / 2);
        randomMove(itemSprite, app);
      }


      for (let i = 0; i < 10; i++) {
        const bunny = createBunny(app, texture, app.screen.width / 2, app.screen.height / 2);
        randomMove(bunny, app);
      }

      app.stage.interactive = true;
      app.stage.hitArea = app.screen;
      app.stage.on('pointerup', onDragEnd);
      app.stage.on('pointerupoutside', onDragEnd);
    };



    const randomMove = (sprite, app) => {
      let targetX = Math.random() * app.screen.width;
      let targetY = Math.random() * app.screen.height;

      app.ticker.add(() => {
        // 現在の位置と目標位置の間で少しずつ移動
        sprite.x += (targetX - sprite.x) * 0.05;
        sprite.y += (targetY - sprite.y) * 0.05;

        // 目的地に十分近づいたら新しい目的地を設定
        if (Math.abs(sprite.x - targetX) < 1 && Math.abs(sprite.y - targetY) < 1) {
          targetX = Math.random() * app.screen.width;
          targetY = Math.random() * app.screen.height;
        }
      });
    };

    const createItemSprite = (app, texture, x, y) => {
      const itemSprite = new Sprite(texture);
      itemSprite.anchor.set(0.5);
      itemSprite.x = x;
      itemSprite.y = y;
      itemSprite.interactive = true;
      itemSprite.buttonMode = true;
      itemSprite.cursor = 'pointer';
      itemSprite.scale.set(0.3);
  
      const mask = new Graphics();
      mask.beginFill(0xFFFFFF);
      mask.drawCircle(0, 0, 200);
      mask.endFill();
  
      itemSprite.addChild(mask);
      itemSprite.mask = mask;
      itemSprite.on('pointerdown', event => onDragStart(event, itemSprite, app));
      app.stage.addChild(itemSprite);
      return itemSprite;
    };


    const createBunny = (app, texture, x, y) => {
      const bunny = new Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = x;
      bunny.y = y;
      bunny.interactive = true;
      bunny.buttonMode = true;
      bunny.cursor = 'pointer';
      bunny.scale.set(3);
      bunny.on('pointerdown', (event) => onDragStart(event, bunny, app));
      app.stage.addChild(bunny);
      return bunny;
    };

    let dragTarget = null;

    const onDragStart = (event, sprite, app) => {
      sprite.alpha = 0.5;
      dragTarget = sprite;
      dragTarget.data = event.data;
      app.stage.on('pointermove', (e) => onDragMove(e, dragTarget));
    };

    const onDragMove = (event, sprite) => {
      if (sprite) {
        const newPosition = sprite.data.getLocalPosition(sprite.parent);
        sprite.x = newPosition.x;
        sprite.y = newPosition.y;
      }
    };

    const onDragEnd = () => {
      if (dragTarget) {
        dragTarget.alpha = 1;
        dragTarget.data = null;
        dragTarget = null;
      }
      // Notice that we might need to also remove the pointermove listener here if needed
    };

    init();

    return () => {
      if (pixiContainer.current && pixiContainer.current.children.length > 0) {
        pixiContainer.current.removeChild(pixiContainer.current.children[0]);
      }
    };
  }, []);


  // スプライトを追加する関数
  const addSprite = (imageUrl) => {
    const texture = Texture.from(imageUrl);
    const sprite = new Sprite(texture);
    sprite.x = Math.random() * appRef.current.screen.width;
    sprite.y = Math.random() * appRef.current.screen.height;
    appRef.current.stage.addChild(sprite);
  };


  const handleAddSprite = () => {
    addSprite('https://pixijs.com/assets/bunny.png');
  };

  const value = {};

  return (
    <>
      <div
        style={{
          width: '1200px',
          height: '900px',
          border: '1px solid black',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          background: '#fff'
        }}
      >
        <PixiComponentShareProvider value={value}>
          {/* リストパネル(作業専用) */}
          {pixiMode && <PixiListPanel itemAllId={itemAllId} />}

          {/* 調整パネル(作業専用) */}
          {pixiMode && customPanelVisible && <PixiCustomPanel />}

          {/* 詳細パネル(再描画専用) */}
          {!pixiMode && pixiDetailPanelVisible && <PixiDetailPanel />}
        </PixiComponentShareProvider>

        <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} />
        <button onClick={handleAddSprite}>Add Sprite</button>
      </div>
    </>
  );
};

export { PixiComponent };
