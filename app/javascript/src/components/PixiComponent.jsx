import React, { useEffect, useRef, useState } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';
import { PixiComponentShareProvider } from './PixiComponentShareContext';
import { PixiListPanel } from './PixiListPanel';
import { PixiCustomPanel } from './PixiCustomPanel';
import { PixiDetailPanel } from './PixiDetailPanel';
import { usePixiGroup } from './PixiGroupContext';

const PixiComponent = ({ itemAllId, spaceAllId, onDataFromGrandchild, pixiMode }) => {
  const pixiContainer = useRef(null);
  const appRef = useRef(null);
  const nextSpriteIdRef = useRef(1);

  const borderRef = useRef(null);


  const [activeSprite, setActiveSprite] = useState(null);
  const activeSpriteRef = useRef(activeSprite);

  useEffect(() => {
    activeSpriteRef.current = activeSprite;
  }, [activeSprite]);

  const [clickPositionApp, setClickPositionApp] = useState({x: 0, y: 0});

  // 背景画像を管理する状態を追加
  const [backgroundSprites, setBackgroundSprites] = useState([]);

  const {
    customPanelVisible,
    pixiDetailPanelVisible,
    togglePixiDetailPanelVisible
  } = usePixiGroup();


  useEffect(() => {
    const init = async () => {
      const app = new Application({
        background: 0x1099bb,
        width: 800,
        height: 600
      });
      pixiContainer.current.appendChild(app.view);
      appRef.current = app;
      app.stage.interactive = true;
      app.stage.hitArea = app.screen;
    //   app.stage.on('pointerdown', () => {
    //     console.log('Stage clicked, deselecting any active sprite');
    //     setActiveSprite(null);  // すべてのスプライトの選択を解除
    // });
    const handleClickOutside = (event) => {
      console.log('Stage clicked, deselecting any active sprite');
      if (borderRef.current) {
        borderRef.current.clear(); // 直接枠をクリア
      }
      setActiveSprite(null);
      // クリックされた座標を保存
      const position = event.data.global;
      setClickPositionApp({ x: position.x, y: position.y });
    };

    app.stage.on('pointerdown', handleClickOutside);


    // 枠を示すグラフィックスオブジェクトを作成
    const border = new Graphics();
    border.lineStyle(2, 0xFF0000, 1); // 赤色の枠
    app.stage.addChild(border);
    borderRef.current = border;

    };

    init();

    return () => {
      if (pixiContainer.current && pixiContainer.current.children.length > 0) {
        pixiContainer.current.removeChild(pixiContainer.current.children[0]);
      }
    };
  }, []);


  const handleAddSpace = (spaceId) => {
    const space = spaceAllId.find(space => space.id === spaceId);
    if (space) {
      const newTexture = Texture.from(space.space_canvas);
      handleAddBackground(appRef.current, newTexture);
    }
  }


  const handleAddBackground = (app, texture) => {
    // 古い背景スプライトを削除
    backgroundSprites.forEach(sprite => app.stage.removeChild(sprite));
    setBackgroundSprites([]);

    const backgroundSprite = new Sprite(texture);
    const backgroundSprite2 = new Sprite(texture);
    setBackgroundSprites([backgroundSprite, backgroundSprite2]);
    backgroundSprite.width = app.screen.width;
    backgroundSprite.height = app.screen.height;
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    backgroundSprite2.width = app.screen.width;
    backgroundSprite2.height = app.screen.height;
    backgroundSprite2.x = 0;
    backgroundSprite2.y = -600;
    // 背景スプライトをステージに追加
    app.stage.addChild(backgroundSprite);
    // 背景スプライトを最下層に設定
    app.stage.setChildIndex(backgroundSprite, 0);
    // 背景スプライトをステージに追加
    app.stage.addChild(backgroundSprite2);
    // 背景スプライトを最下層に設定
    app.stage.setChildIndex(backgroundSprite2, 0);

    app.ticker.add(() => {
      // 背景を下に移動させる
      backgroundSprite.y += 1;
      backgroundSprite2.y += 1;
    
      // 背景が完全に下まで来たら、上にリセット
      if (backgroundSprite.y > 600) backgroundSprite.y = backgroundSprite2.y - 600;
      if (backgroundSprite2.y > 600) backgroundSprite2.y = backgroundSprite.y - 600;
    });
    backgroundSprite.texture = texture;
    return backgroundSprite;
  };


  // const handleAddSprite = () => {
  //   const texture = Texture.from('https://pixijs.com/assets/bunny.png');
  //   // const itemWithIdOne = itemAllId.find(item => item.id === 385);
  //   // const texture = Texture.from(itemWithIdOne.item_canvas);
  //   // createSprite(appRef.current, texture, Math.random() * appRef.current.screen.width, Math.random() * appRef.current.screen.height);
  //   createSprite(appRef.current, texture, Math.random() * appRef.current.screen.width, Math.random() * appRef.current.screen.height);
  // };


  // アクティブスプライトの ID が変更されたとき、枠を更新
  useEffect(() => {
    const app = appRef.current;
  
    const updateBorder = () => {
      // スプライトのIDと変更処理を `modifySpriteById` に渡す
      modifySpriteById(app, activeSprite, (sprite) => {
        const border = borderRef.current;
        border.clear();
        border.lineStyle(2, 0xFF0000, 1);
        border.drawRect(
          sprite.x - sprite.width / 2,
          sprite.y - sprite.height / 2,
          sprite.width,
          sprite.height
        );
      });
    };
  
    app.ticker.add(updateBorder);
  
    return () => app.ticker.remove(updateBorder);
  }, [activeSprite]);
  
  

  const handleAddSprite = (itemId, choice) => {
    const loadItem = itemAllId.find(item => item.id === itemId);
    let spriteImage;
      if (choice === 'item_canvas') {
        spriteImage = Texture.from(loadItem.item_canvas);
        //spriteImage.baseTexture.scaleMode = SCALE_MODES.LINEAR;
      } else if (choice === 'item_image') {
        spriteImage = Texture.from(loadItem.item_image.url);
      } else {
        spriteImage = Texture.from('https://pixijs.com/assets/bunny.png');
      }
      createSprite(appRef.current, spriteImage, appRef.current.screen.width / 2, appRef.current.screen.height / 2);
      //randomMove(itemSprite, appRef.current);
    };

    
  // let nextSpriteId = 1;

  //スプライトの作成
  const createSprite = (app, texture, x, y) => {
    const sprite = new Sprite(texture);
    sprite.id = nextSpriteIdRef.current++;
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.cursor = 'pointer';

    const scale = 0.1;
    sprite.scale.set(scale);
    //sprite.hitArea = new Rectangle(200, 200, 400, 400);


  sprite.on('pointerdown', event => {
    event.stopPropagation();  // ステージのクリックイベントが発火しないように阻止
    onDragStart(event, sprite, app);  // ドラッグ開始処理を呼び出し
    setActiveSprite(sprite.id);  // スプライトをアクティブに設定
    console.log(`Sprite clicked: ID=${sprite.id}`, 'Sprite now active');
  });
  
    sprite.on('pointerup', () => onDragEnd(sprite));
    sprite.on('pointerupoutside', () => onDragEnd(sprite));

    app.stage.addChild(sprite);
    return sprite;
  };

  // IDを指定してスプライトを特定し、何か操作をする
  const modifySpriteById = (app, spriteId, modification) => {
    const children = app.stage.children;
    const sprite = children.find(child => child.id === spriteId);
    if (sprite) {
      modification(sprite);  // 特定の変更を適用
    }
  };

  const changeSpriteScale = (app, spriteId, newScale) => {
    modifySpriteById(app, spriteId, sprite => {
      sprite.scale.set(newScale); // 新しいスケールを設定
    });
  };


  const changeNewScale = () => {
    changeSpriteScale(appRef.current, activeSprite, 0.5);
  };

  const applyMaskToSprite = (app, spriteId, x, y, width, height) => {
    modifySpriteById(app, spriteId, sprite => {
      const mask = new Graphics();
      mask.beginFill(0xFFFFFF);
  
      // スプライトの anchor 設定が (0.5, 0.5) だと仮定して、相対座標を計算
      const maskX = sprite.x - sprite.width * sprite.anchor.x + x;
      const maskY = sprite.y - sprite.height * sprite.anchor.y + y;
  
      mask.drawRect(maskX, maskY, width, height);
      mask.endFill();
      sprite.mask = mask; // マスクをスプライトに適用
    });
  };
  
  
  
  const changeNewMask = () => {
    applyMaskToSprite(appRef.current, activeSprite, 0, 0, 10, 10);
  };
  
  

  const handleActiveSprite = () => {
    // 選択されたスプライトのIDを参照
    const activeId = activeSpriteRef.current;
  
    // appRef.current.stage.children で全スプライトを取得
    const allSprites = appRef.current.stage.children;
  
    // 選択されたIDと一致するスプライトにのみ randomMove を適用
    allSprites.forEach(sprite => {
      if (sprite.id === activeId) {
        handleAddAnimations(sprite, appRef.current);
      }
    });
  };

  const handleRemoveSprite = () => {
    // 選択されたスプライトのIDを参照
    const activeId = activeSpriteRef.current;
  
    // appRef.current.stage.children で全スプライトを取得
    const allSprites = appRef.current.stage.children;
  
    // 選択されたIDと一致するスプライトを探し、ステージから削除
    const spriteToRemove = allSprites.find(sprite => sprite.id === activeId);
    if (spriteToRemove) {
      appRef.current.stage.removeChild(spriteToRemove);
      // スプライトのリソース解放、必要に応じて
      spriteToRemove.destroy({children:true, texture:true, baseTexture:true});

      if (borderRef.current) {
        borderRef.current.clear(); // 直接枠をクリア
      }
      setActiveSprite(null);
    }
  };


  // const handleSprite = () => {
  // // 特定のスプライトの位置を変更する例
  // modifySpriteById(appRef.current, 3, sprite => {
  //   sprite.x = 100;  // 新しいx座標
  //   sprite.y = 200;  // 新しいy座標
  // });
  // console.log(activeSpriteRef.current);
  // };


  const onDragStart = (event, sprite, app) => {
    sprite.alpha = 0.5;
    sprite.data = event.data;
    app.stage.on('pointermove', e => onDragMove(e, sprite));
    
    const border = borderRef.current;
    border.clear();
    border.lineStyle(2, 0xFF0000, 1);
    border.drawRect(
      sprite.x - sprite.width / 2 * sprite.scale.x,
      sprite.y - sprite.height / 2 * sprite.scale.y,
      sprite.width * sprite.scale.x,
      sprite.height * sprite.scale.y
    );
  };

  const onDragMove = (event, sprite) => {
    const newPosition = sprite.data.getLocalPosition(sprite.parent);
    sprite.x = newPosition.x;
    sprite.y = newPosition.y;
    
    const border = borderRef.current;
    border.clear();
    border.lineStyle(2, 0xFF0000, 1);
    border.drawRect(
      sprite.x - sprite.width / 2 * sprite.scale.x,
      sprite.y - sprite.height / 2 * sprite.scale.y,
      sprite.width * sprite.scale.x,
      sprite.height * sprite.scale.y
    );
  };

  const onDragEnd = (sprite) => {
    sprite.alpha = 1;  // スプライトの透明度を完全に元に戻す
    sprite.data = null;
    appRef.current.stage.off('pointermove');  // ドラッグ中に追加したポインタームーブイベントを削除
  };
  
  //共有するもの
  const value = {
    handleAddSprite,
    handleAddSpace
  }

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
          {pixiMode && <PixiListPanel itemAllId={itemAllId} spaceAllId={spaceAllId} />}

          {/* 調整パネル(作業専用) */}
          {pixiMode && customPanelVisible && <PixiCustomPanel />}

          {/* 詳細パネル(再描画専用) */}
          {!pixiMode && pixiDetailPanelVisible && <PixiDetailPanel />}
        </PixiComponentShareProvider>

        <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} />
      </div>
        {/* <button onClick={() => handleAddSprite(385, 'item_canvas')}>Add Sprite</button> */}
        {/* <button onClick={handleSprite}>3番目のバニーが飛ぶ</button> */}
        <button onClick={handleActiveSprite}>アクティブストライプのみ飛ばす</button>
          
  // ボタンがクリックされた時に実行
  <button onClick={handleRemoveSprite}>Remove Active Sprite</button>

  <button onClick={changeNewScale}>拡大</button>
  <button onClick={changeNewMask}>マスク</button>

    </>
  );
};

export { PixiComponent };

