import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';
import { PixiComponentShareProvider } from './PixiComponentShareContext';
import { PixiListPanel } from './PixiListPanel';
import { PixiCustomPanel } from './PixiCustomPanel';
import { PixiDetailPanel } from './PixiDetailPanel';
import { usePixiGroup } from './PixiGroupContext';

const PixiComponent = ({ itemAllId, spaceAllId, onDataFromGrandchild, pixiMode, itemObject, spaceObject, subUserAllId, compositeId }) => {
  
  //データ取得確認用
  useEffect(() => {
    console.log('サブユーザー', subUserAllId);
    console.log('アイテム', itemAllId);
  }, []);


  //全体共有からの取得
  const {
    customPanelVisible,
    pixiDetailPanelVisible,
    togglePixiDetailPanelVisible,
    topBottomAmplitude,
    topBottomPeriod,
    leftRightAmplitude,
    leftRightPeriod,
    clockwiseType,
    setClockwiseType,
    rotationSpeed,
    pendulumMaxRotation,
    pendulumPeriod,
    handleAlertMessageAnime,
    alertToastAnime,
    setAlertToastAnime,
    alertMessageAnime,
    scaleAnimationMinScale,
    scaleAnimationMaxScale,
    scaleAnimationPeriod,
    scaleSprite,
    alphaSprite,
    angleSprite
  } = usePixiGroup();


  //pixiを管理するref
  const pixiContainer = useRef(null);


  //外部からappにアクセスするref
  const appRef = useRef(null);

  //スプライトのid
  const nextSpriteIdRef = useRef(1);

  //スプライトとitemを紐付けたり、スプライトの状態を管理するもの（セーブ対象）
  const [spriteInfo, setSpriteInfo] = useState([]);

  //背景とspaceを紐付けたり、背景の状態を管理するもの（セーブ対象）
  const [spaceInfo, setSpaceInfo] = useState({ space_id: null, others_anime: false, anime_value: null });

  //スプライトの上限
  const [maxSprite, setMaxSprite] = useState(50);

  //選択状態のスプライトを管理する
  const [activeSprite, setActiveSprite] = useState(null);
  const activeSpriteRef = useRef(activeSprite);

  //選択しているスプライトの周りにつける枠
  const borderRef = useRef(null);

  const [moveClickSprites, setMoveClickSprites] = useState([]);
  const moveClickSpritesRef = useRef(moveClickSprites);

  useEffect(() => {
    moveClickSpritesRef.current = moveClickSprites;
  }, [moveClickSprites]);

  useEffect(() => {
    activeSpriteRef.current = activeSprite;
  }, [activeSprite]);

  //クリックされた座標を保管する
  const [clickPositionApp, setClickPositionApp] = useState({x: 0, y: 0});
  const clickPositionAppRef = useRef(clickPositionApp);
  useEffect(() => {
    clickPositionAppRef.current = clickPositionApp;
  }, [clickPositionApp]);

  // アイテムを管理する
  const [itemSprites, setItemSprites] = useState([]);

  // 背景画像を管理する
  const [backgroundSprites, setBackgroundSprites] = useState([]);


  //再描画の場合の復元処理（マウント時に1回実行される）
  useEffect(() => {
    //spaceObjectが存在する場合、JSON形式からオブジェクトに変換してステートを更新
    if (spaceObject && spaceObject !== '' && spaceObject !== 'undefined' && spaceObject !== 'null') {
      const spaceData = JSON.parse(spaceObject);
      if (Array.isArray(spaceData) && spaceData.length > 0) {
        const spaceDataFirstItem = spaceData[0];
        const newSpaceInfo = {
          space_id: spaceDataFirstItem.space_id,
          others_anime: spaceDataFirstItem.others_anime,
          anime_value: spaceDataFirstItem.anime_value
        };
        setSpaceInfo(newSpaceInfo);
        console.log('spaceDataの中', spaceDataFirstItem);
        console.log('space_id:', spaceDataFirstItem.space_id);
      }
    }
  }, [spaceObject]);


  //pixiのメイン
  useEffect(() => {
    const init = async () => {
      const app = new Application({
        background: 0x1099bb,
        width: 1000,
        height: 750
      });

      pixiContainer.current.appendChild(app.view);
      appRef.current = app;
      app.stage.interactive = true;
      app.stage.hitArea = app.screen;

      //初期の背景処理
      // 透明なグラフィックスオブジェクトを作成
      const transparentGraphics = new Graphics();
      transparentGraphics.beginFill(0x000000, 0); // 完全に透明な色で塗りつぶし
      transparentGraphics.drawRect(0, 0, app.screen.width, app.screen.height);
      transparentGraphics.endFill();

      // グラフィックスからテクスチャを生成
      const transparentTexture = app.renderer.generateTexture(transparentGraphics);

      // 生成したテクスチャからスプライトを作成
      const backgroundSprite = new Sprite(transparentTexture);
      backgroundSprite.x = 0;
      backgroundSprite.y = 0;

      // ステージに背景スプライトを追加
      app.stage.addChild(backgroundSprite);

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


    // app.stage.on('pointerdown', (event) => {
    //   const mousePosition = event.data.global;
    //   // ステージの全子要素をループして、moveClickSprites配列に含まれるIDのスプライトに処理を適用
    //   app.stage.children.forEach(sprite => {
    //     if (moveClickSpritesRef.current.includes(sprite.id)) {
    //       moveToTarget(mousePosition, sprite);
    //     }
    //   });
    // });
    app.stage.on('pointerdown', (event) => {
      const mousePosition = event.data.global;
      // moveClickSpritesRef.current 内の各スプライト情報に基づいて移動処理を適用
      moveClickSpritesRef.current.forEach(spriteId => {
        const sprite = app.stage.children.find(child => child.id === spriteId.id);
        if (sprite) {
          moveToTarget(mousePosition, sprite, spriteId.speed);
        }
      });
    });


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



  // function moveToTarget(targetPos, sprite, speed) {
  //   const app = appRef.current;
  //   // const speed = 0.01; // ここでスピードを調整（0から1の間で、低いほどゆっくり移動）
  //   //const targetPos = event.data.global;
  
  //   const move = () => {
  //     if (!app.stage.children.includes(sprite)) {
  //       console.log("スプライトは既に削除されています");
  //       app.ticker.remove(move);
  //       return;
  //     }
  
  //     const dx = targetPos.x - sprite.x;
  //     const dy = targetPos.y - sprite.y;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
  
  //     if (distance > 1) {
  //       sprite.x += dx * speed;
  //       sprite.y += dy * speed;
  //     } else {
  //       sprite.x = targetPos.x;
  //       sprite.y = targetPos.y;
  //       app.ticker.remove(move); // 目的地に到達したら移動を停止
  //       console.log("目的地に到達しました");
  //     }
  //   };
  
  //   app.ticker.add(move);
  // }


  function moveToTarget(targetPos, sprite, speed) {
    const app = appRef.current;
  
    const move = () => {
      if (!app.stage.children.includes(sprite) || !moveClickSpritesRef.current.some(s => s.id === sprite.id)) {
        console.log("スプライトは既に削除されています、または登録解除されました");
        app.ticker.remove(move);
        return;
      }
  
      const dx = targetPos.x - sprite.x;
      const dy = targetPos.y - sprite.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance > 1) {
        sprite.x += dx * speed;
        sprite.y += dy * speed;
      } else {
        sprite.x = targetPos.x;
        sprite.y = targetPos.y;
        app.ticker.remove(move); // 目的地に到達したら移動を停止
        console.log("目的地に到達しました");
      }
    };
  
    app.ticker.add(move);
  }
  


  //アイテムの再描画の場合の復元処理（マウント時に1回実行される）
  useEffect(() => {
    if (itemObject && appRef.current && itemAllId.length > 0) {
      //itemObjectが存在する場合、JSON形式からオブジェクトに変換してステートを更新
      if (itemObject !== '' && itemObject !== 'undefined' && itemObject !== 'null') {
        let itemData = JSON.parse(itemObject);
        console.log('itemObjectの中', itemObject)

        // 有効なアイテムのみフィルタリング
        itemData = itemData.filter(spriteData => {
          const itemDetails = itemAllId.find(item => item.id === spriteData.item_id);
          return itemDetails !== undefined; // itemDetailsが見つかればtrue、見つからなければfalse
        });
        
        setSpriteInfo(itemData.map(sprite => ({
          sprite_id: sprite.sprite_id,
          item_id: sprite.item_id,
          sprite_position: sprite.sprite_position,
          sprite_scale: sprite.sprite_scale,
          sprite_mask: sprite.sprite_mask,
          mask_value: sprite.mask_value,
          sprite_alpha: sprite.sprite_alpha,
          top_bottom: sprite.top_bottom,
          top_bottom_value: sprite.top_bottom_value,
          left_right: sprite.left_right,
          left_right_value: sprite.left_right_value,
          rotate_anime: sprite.rotate_anime,
          rotate_value: sprite.rotate_value,
          scale_anime: sprite.scale_anime,
          scale_anime_value: sprite.scale_anime_value,
          others_anime: sprite.others_anime,
          anime_value: sprite.anime_value,
          angleDegrees_value: sprite.angleDegrees_value,
        })));

        itemData.forEach(spriteData => {
          // itemAllIdから対応するitem_idのデータを検索
          const itemDetails = itemAllId.find(item => item.id === spriteData.item_id);
          
          let texture;
          if (itemDetails) {
            switch (itemDetails.image_choice) {
              case 'item_canvas':
                texture = Texture.from(itemDetails.item_canvas);
                break;
              case 'item_image':
                texture = Texture.from(itemDetails.item_image.url);
                break;
              default:
                // デフォルトのテクスチャを設定
                texture = Texture.from('https://pixijs.com/assets/bunny.png');
            }

            // スプライトの作成
            createSprite(appRef.current, texture, spriteData.sprite_position.x, spriteData.sprite_position.y, spriteData.item_id, false, spriteData.sprite_scale, spriteData.sprite_alpha, spriteData.angleDegrees_value, spriteData.sprite_id)
            .then(sprite => {
              if (spriteData.left_right) {
                applyHorizontalSwingById(appRef.current, sprite.id, spriteData.left_right_value.amplitude_value, spriteData.left_right_value.period_value);
              }
              if (spriteData.top_bottom) {
                applyVerticalSwingById(appRef.current, sprite.id, spriteData.top_bottom_value.amplitude_value, spriteData.top_bottom_value.period_value);
              }
              if (spriteData.rotate_anime) {
                if (spriteData.rotate_value.rotate_mode === 'revolution') {
                  applyRotationById(appRef.current, sprite.id, spriteData.rotate_value.speed_value, spriteData.rotate_value.clockwise_value);
                } else if (spriteData.rotate_value.rotate_mode === 'pendulum') {
                  swingPendulumAnime(appRef.current, sprite.id, spriteData.rotate_value.maxRotation_value, spriteData.rotate_value.period_value, spriteData.rotate_value.clockwise_value);
                }
              }
              if (spriteData.others_anime) {
                if (spriteData.anime_value.rotate_mode === 'random') {
                  addRandomMove(appRef.current, sprite.id, spriteData.anime_value.easing_value, spriteData.anime_value.closeEnough_value);
                } else if (spriteData.anime_value.rotate_mode === 'click') {

                  const newLoadData = {
                    id: spriteData.sprite_id,
                    speed: spriteData.anime_value.speed_value
                  }
                  
                  setMoveClickSprites(loadData => [...loadData, newLoadData])
                }
                if (spriteData.scale_anime) {
                  applyScaleAnimationById(appRef.current, sprite.id, spriteData.scale_anime_value.min_scale, spriteData.scale_anime_value.max_scale, spriteData.scale_anime_value.period_value);
                }
              }
            });

          } else {
            console.error('Item details not found for item_id:', spriteData.item_id);
          }
        });

        const maxSpriteId = itemData.reduce((max, sprite) => Math.max(max, sprite.sprite_id), 0);
        nextSpriteIdRef.current = maxSpriteId + 1;
        const result = maxSprite - itemData.length;
        setMaxSprite(result);
      }
    }
  }, [itemObject]);



  //スペースの再描画の場合の復元処理（マウント時に1回実行される）
  useEffect(() => {
    if (spaceObject && appRef.current && spaceAllId.length > 0) {
      if (spaceObject !== '' && spaceObject !== 'undefined' && spaceObject !== 'null') {
        const spaceData = JSON.parse(spaceObject);
        spaceData.forEach(spriteData => {
          //spaceAllIdから対応するspace_idのデータを検索
          const spaceDetails = spaceAllId.find(space => space.id === spriteData.space_id);
          
          if (spaceDetails) {
            const texture = Texture.from(spaceDetails.space_canvas);
  
            handleAddBackground(appRef.current, texture, spriteData.space_id, false);
            // 追加のプロパティやイベントリスナーを設定する場所
          } else {
            console.error('Space details not found for space_id:', spriteData.space_id);
          }
        });
      }
    }
  }, [spaceObject]);



  //背景画像を描画する処理
  const handleAddSpace = (spaceId) => {
    const space = spaceAllId.find(space => space.id === spaceId);
    if (space) {
      const newTexture = Texture.from(space.space_canvas);
      handleAddBackground(appRef.current, newTexture, spaceId, true);
    }
  }


    //背景画像を描画する処理
    const handleAddSpaceChange = (spaceId) => {
      const space = spaceAllId.find(space => space.id === spaceId);
      if (space) {
        const newTexture = Texture.from(space.space_canvas);
        handleAddBackgroundAnime(appRef.current, newTexture, spaceId);
      }
    }
  

  //背景画像を切り替える処理
  const handleAddBackground = (app, texture, spaceId, updateState) => {
    // 古い背景スプライトを削除
    backgroundSprites.forEach(sprite => app.stage.removeChild(sprite));
    setBackgroundSprites([]);

    const backgroundSprite = new Sprite(texture);
    setBackgroundSprites([backgroundSprite]);
    backgroundSprite.width = app.screen.width;
    backgroundSprite.height = app.screen.height;
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    // 背景スプライトをステージに追加
    app.stage.addChild(backgroundSprite);
    // 背景スプライトを最下層に設定
    app.stage.setChildIndex(backgroundSprite, 0);
    backgroundSprite.texture = texture;

    if (updateState) {
      updateSpaceInfo(spaceId);
    }
    return backgroundSprite;
  };


  const updateSpaceInfo = (newSpaceId) => {
    setSpaceInfo(prevSpaceInfo => ({
      ...prevSpaceInfo, // 既存のステートを展開
      space_id: newSpaceId // 新しいspace_idで上書き
    }));
  };

//背景アニメーション
const handleAddBackgroundAnime = (app, texture, spaceId) => {
  // 古い背景スプライトを削除
  backgroundSprites.forEach(sprite => app.stage.removeChild(sprite));
  setBackgroundSprites([]);

  const backgroundSprite = new Sprite(texture);
  const backgroundSprite2 = new Sprite(texture);
  setBackgroundSprites([backgroundSprite]);
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

  // if (updateState) {
  //   updateSpaceInfo(spaceId);
  // }
  return backgroundSprite;
};


  
  
  const updateBorder = (sprite) => {
      const border = borderRef.current;
      if (sprite) {
      border.clear();
      border.lineStyle(2, 0xFF0000, 1);
      border.drawRect(
        sprite.x - sprite.width / 2,
        sprite.y - sprite.height / 2,
        sprite.width,
        sprite.height
      );
      
    }
  };




  //スプライトの画像の処理
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
      //let spriteid = nextSpriteIdRef.current++;
    createSprite(appRef.current, spriteImage, appRef.current.screen.width / 2, appRef.current.screen.height / 2, itemId, true, scaleSprite, alphaSprite, angleSprite, 1);
    //randomMove(itemSprite, appRef.current);
  };


  //スプライトの作成
  const createSprite = (app, texture, x, y, itemId, bool, scaleValue, alphaValue, angleDegrees, spriteid) => {
    const sprite = new Sprite(texture);
    if (bool) {
      sprite.id = nextSpriteIdRef.current++;
    } else {
      sprite.id = spriteid;
    }
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.cursor = 'pointer';
    sprite.rotation = angleDegrees * (Math.PI / 180);

    const scale = scaleValue;
    sprite.scale.set(scale);
    //sprite.hitArea = new Rectangle(200, 200, 400, 400);

    sprite.alpha = alphaValue;



    const mask = new Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawCircle(sprite.x, sprite.y, 100); // 位置を調整し、半径100の円を描画
    mask.endFill();


    // マスクをスプライトに適用
    sprite.mask = mask;

    // ステージにマスクとスプライトを追加
    app.stage.addChild(mask);
    // app.stage.addChild(sprite);







    sprite.on('pointerdown', event => {
      event.stopPropagation();  // ステージのクリックイベントが発火しないように阻止
      onDragStart(event, sprite, app);  // ドラッグ開始処理を呼び出し
      setActiveSprite(sprite.id);  // スプライトをアクティブに設定
      //console.log(`Sprite clicked: ID=${spriteid}`, 'Sprite now active');
      togglePixiDetailPanelVisible();
    });
  
    // sprite.on('pointerup', () => onDragEnd(sprite));
    // sprite.on('pointerupoutside', () => onDragEnd(sprite));

    sprite.on('pointerup', () => {
      onDragEnd(sprite);
      updateBorder(sprite);
    });
    sprite.on('pointerupoutside', () => {
      onDragEnd(sprite);
      updateBorder(sprite);
    });

    if (bool) {
    const newSpriteInfo = {
      sprite_id: sprite.id,
      item_id: itemId,
      sprite_position: { x: x, y: y },
      sprite_scale: scale,
      sprite_mask: false,
      mask_value: null,
      sprite_alpha: 1,
      top_bottom: false,
      top_bottom_value: null,
      left_right: false,
      left_right_value: null,
      rotate_anime: false,
      rotate_value: null,
      scale_anime: false,
      scale_anime_value: null,
      others_anime: false,
      anime_value: null,
      angleDegrees_value: angleDegrees
    };

    setSpriteInfo(prevInfo => [...prevInfo, newSpriteInfo])
    const result = maxSprite - 1;
    setMaxSprite(result);
  }

    app.stage.addChild(sprite);
    // setItemSprites(prevSprites => [...prevSprites, sprite]);

    if (!bool) {
      // 非同期処理が必要な場合（例：ロードが完了するのを待つ）
      return new Promise(resolve => {
        resolve(sprite);
      });
    } else {
      // 非同期処理が不要な場合でもPromiseを返す
      return Promise.resolve(sprite);
    }
  };

  //アニメーションがあった場合に処理をする関数
  // const loadAnimation = () => {
  //   let itemData = JSON.parse(itemObject);
  //   itemData.forEach(spriteData => {
  //     if (spriteData.top_bottom) {
  //     console.log(spriteData.top_bottom)
  //     applyHorizontalSwingById(appRef.current, spriteData.sprite_id, spriteData.top_bottom_value.amplitude_value, spriteData.top_bottom_value.period_value);
  //     }
  //   });
  // };

  // IDを指定してスプライトを特定し、何か操作をする
  const modifySpriteById = (app, spriteId, modification) => {
    const children = app.stage.children;
    const sprite = children.find(child => child.id === spriteId);
    if (sprite) {
      modification(sprite);  // 特定の変更を適用
    }
  };

  //選択したスプライトのスケールを変える
  const changeSpriteScale = (app, spriteId, newScale) => {
    modifySpriteById(app, spriteId, sprite => {
      sprite.scale.set(newScale); // 新しいスケールを設定
    });
    setSpriteInfo(prevSprites =>
      prevSprites.map(sprite =>
        sprite.sprite_id === spriteId
          ? {
              ...sprite,
              sprite_scale: newScale
            }
          : sprite
      )
    );
  };

  //選択したスプライトのスケールを変えるトリガー
  const changeNewScale = () => {
    if (!activeSprite) {
      console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
      return;
    }
    changeSpriteScale(appRef.current, activeSprite, scaleSprite);
  };




  //選択したスプライトの透明度を変える
  const changeSpriteAlpha = (app, spriteId, newAlpha) => {
    modifySpriteById(app, spriteId, sprite => {
      sprite.alpha = newAlpha;
    });

    setSpriteInfo(prevSprites =>
      prevSprites.map(sprite =>
        sprite.sprite_id === spriteId
          ? {
              ...sprite,
              sprite_alpha: newAlpha
            }
          : sprite
      )
    );
  };

  //選択したスプライトの透明度を変えるトリガー
  const changeNewAlpha = () => {
    if (!activeSprite) {
      console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
      return;
    }
    changeSpriteAlpha(appRef.current, activeSprite, alphaSprite);
  };


    //選択したスプライトの角度を変える
    const changeSpriteAngle = (app, spriteId, newAngle) => {
      modifySpriteById(app, spriteId, sprite => {
        sprite.rotation = newAngle * (Math.PI / 180);
      });

      setSpriteInfo(prevSprites =>
        prevSprites.map(sprite =>
          sprite.sprite_id === spriteId
            ? {
                ...sprite,
                angleDegrees_value: newAngle
              }
            : sprite
        )
      );
    };
  
    //選択したスプライトの角度を変えるトリガー
    const changeNewAngle = () => {
      if (!activeSprite) {
        console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
        return;
      }
      changeSpriteAngle(appRef.current, activeSprite, angleSprite);
    };
  





  //選択したスプライトにマスクをつける処理
  const applyMaskToSprite = (app, spriteId, x, y, width, height) => {
    modifySpriteById(app, spriteId, sprite => {
      const mask = new Graphics();
      mask.beginFill(0xFFFFFF);
  
      // スプライトの anchor 設定が (0.5, 0.5) だと仮定して、相対座標を計算
      const maskX = sprite.x - sprite.width * sprite.anchor.x + x;
      const maskY = sprite.y - sprite.height * sprite.anchor.y + y;

      // mask.drawRect(sprite.x, sprite.y, 20);
  
      mask.drawRect(maskX, maskY, width, height);
      mask.endFill();
      sprite.mask = mask;
      // app.stage.addChild(mask);
      // app.stage.addChild(sprite);
    });
  };
  
  
  //選択したスプライトにマスクをつけるトリガー
  const changeNewMask = () => {
    applyMaskToSprite(appRef.current, activeSprite, 0, 0, 10, 10);
  };
  
  

  //ストライプの削除
  // const handleRemoveSprite = () => {
  //   // 選択されたスプライトのIDを参照
  //   const activeId = activeSpriteRef.current;
  
  //   // appRef.current.stage.children で全スプライトを取得
  //   const allSprites = appRef.current.stage.children;
  
  //   // 選択されたIDと一致するスプライトを探し、ステージから削除
  //   const spriteToRemove = allSprites.find(sprite => sprite.id === activeId);
  //   if (spriteToRemove) {
  //     appRef.current.stage.removeChild(spriteToRemove);
  //     // スプライトのリソース解放、必要に応じて
  //     spriteToRemove.destroy({children:true, texture:true, baseTexture:true});

  //     if (borderRef.current) {
  //       borderRef.current.clear(); // 直接枠をクリア
  //     }
  //     setActiveSprite(null);
  //   }

  //   setSpriteInfo(prevSprites => 
  //     prevSprites.filter(sprite => sprite.sprite_id !== activeId)
  //   );

  // };


  //スプライトの削除
  const handleRemoveSprite = () => {
    const activeId = activeSpriteRef.current;
    const allSprites = appRef.current.stage.children;
    const spriteToRemove = allSprites.find(sprite => sprite.id === activeId);
    if (spriteToRemove) {
      // イベントハンドラを解除
      spriteToRemove.off('pointerdown');
      spriteToRemove.off('pointerup');
      spriteToRemove.off('pointerupoutside');
      spriteToRemove.off('pointermove');  // ドラッグ操作などで設定している場合
  
      appRef.current.stage.removeChild(spriteToRemove);
      //spriteToRemove.destroy({children:true, texture:true, baseTexture:true});
  
      if (borderRef.current) {
        borderRef.current.clear(); // 枠をクリア
      }
      setActiveSprite(null); // アクティブスプライトをリセット
  
      setSpriteInfo(prevSprites => 
        prevSprites.filter(sprite => sprite.sprite_id !== activeId)
      );
      const result = maxSprite + 1;
      setMaxSprite(result);
    }
  };
  

  //左右アニメーション
  const addContinuousHorizontalSwingAnimation = (sprite, app, amplitude, period) => {
    let startTime = app.ticker.lastTime;
    const horizontalSwing = () => {
      if (!app.stage.children.includes(sprite)) {
        console.log("スプライトは既に削除されています");
        app.ticker.remove(horizontalSwing); // スプライトが削除されたらTickerからこの関数を削除する
        return; // スプライトが存在しなければ関数を抜ける
      }

      const elapsedTime = app.ticker.lastTime - startTime;
      const angle = (2 * Math.PI * elapsedTime) / period;
      sprite.x += amplitude * Math.sin(angle);
    };

    app.ticker.add(horizontalSwing);
    sprite.stopAnimation = () => app.ticker.remove(horizontalSwing); // スプライトに停止関数を追加
  };


  //作動
  const applyHorizontalSwingById = (app, spriteId, amplitude, period) => {
    modifySpriteById(app, spriteId, sprite => {
      addContinuousHorizontalSwingAnimation(sprite, app, amplitude, period);
    });

    setSpriteInfo(prevSprites =>
      prevSprites.map(sprite =>
        sprite.sprite_id === spriteId
          ? {
              ...sprite,
              left_right: true,
              left_right_value: {
                amplitude_value: amplitude,
                period_value: period
              }
            }
          : sprite
      )
    );
  };


//作動ボタン
const handleHorizontalSwingById = () => {
  // activeSpriteが存在しない場合、何もせずに関数を終了する。
  if (!activeSprite) {
    console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
    return;
  }
  // スプライトを検索する。
  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);

  // spriteが見つからない場合、エラーメッセージを表示する。
  if (!sprite) {
    console.log("Sprite not found."); // 実際の実装ではユーザーに通知するための方法を使用することが推奨される。
    return;
  }
  // spriteのアニメーション状態に応じて処理を分岐する。
  if (sprite.others_anime) {
    handleAlertMessageAnime();
  } else if (sprite.left_right) {
    stopSwingAnimation(activeSprite);
  } else {
    applyHorizontalSwingById(appRef.current, activeSprite, leftRightAmplitude, leftRightPeriod);
  }
};


//停止
const stopSwingAnimation = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopAnimation) {
      sprite.stopAnimation();
      delete sprite.stopAnimation;
      const targetSpriteInfo = spriteInfo.find(sprite => sprite.sprite_id === spriteId);
      if (targetSpriteInfo) {
        const positionReset = targetSpriteInfo.sprite_position.x;
        sprite.x = positionReset;
      }
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            left_right: false,
            left_right_value: null
          }
        : sprite
    )
  );
};

//停止ボタン
// const handleHorizontalStopById = () => {
//   stopSwingAnimation(activeSprite)
// };



//上下アニメーション
const addContinuousVerticalSwingAnimation = (sprite, app, amplitude, period) => {
  let startTime = app.ticker.lastTime;
  const verticalSwing = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトは既に削除されています");
      app.ticker.remove(verticalSwing); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    const elapsedTime = app.ticker.lastTime - startTime;
    const angle = (2 * Math.PI * elapsedTime) / period;
    sprite.y += amplitude * Math.sin(angle);
  };
  app.ticker.add(verticalSwing);
  sprite.stopVerticalAnimation = () => app.ticker.remove(verticalSwing);
};


//上下アニメ
const applyVerticalSwingById = (app, spriteId, amplitude, period) => {
  modifySpriteById(app, spriteId, sprite => {
    addContinuousVerticalSwingAnimation(sprite, app, amplitude, period);
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            top_bottom: true,
            top_bottom_value: {
              amplitude_value: amplitude,
              period_value: period
            }
          }
        : sprite
    )
  );
};

//上下アニメーション実行/停止ボタン
const handleVerticalSwingById = () => {
  // activeSpriteが存在しない場合、何もせずに関数を終了する。
  if (!activeSprite) {
    console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
    return;
  }
  // スプライトを検索する。
  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);

  // spriteが見つからない場合、エラーメッセージを表示する。
  if (!sprite) {
    console.log("Sprite not found."); // 実際の実装ではユーザーに通知するための方法を使用することが推奨される。
    return;
  }
  // spriteのアニメーション状態に応じて処理を分岐する。
  if (sprite.others_anime) {
    handleAlertMessageAnime();
  } else if (sprite.top_bottom) {
    stopVerticalSwingAnimation(activeSprite)
  } else {
    applyVerticalSwingById(appRef.current, activeSprite, topBottomAmplitude, topBottomPeriod);
  }
};


//停止
const stopVerticalSwingAnimation = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopVerticalAnimation) {
      sprite.stopVerticalAnimation();
      delete sprite.stopVerticalAnimation;
      const targetSpriteInfo = spriteInfo.find(sprite => sprite.sprite_id === spriteId);
      if (targetSpriteInfo) {
        const positionReset = targetSpriteInfo.sprite_position.y;
        sprite.y = positionReset;
      }
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            top_bottom: false,
            top_bottom_value: null
          }
        : sprite
    )
  );
};

// const handleVerticalSwingAnimationStop = () => {
//   stopVerticalSwingAnimation(activeSprite)
// };



//ランダム移動
const randomMove = (app, sprite, easing, closeEnough) => {
  if (sprite.ticker) {
    app.ticker.remove(sprite.ticker);
    sprite.ticker = null;
  }

  let targetX = Math.random() * app.screen.width;
  let targetY = Math.random() * app.screen.height;

  // Tickerイベントを追加する前にスプライトが有効であるかをチェック
  if (!app.stage.children.includes(sprite)) {
    console.log("スプライトは既に削除されています");
    return; // スプライトが存在しなければ関数を抜ける
  }

  const tickerCallback = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトが削除されたため、移動を停止します");
      app.ticker.remove(tickerCallback); // スプライトが削除されたらTickerを停止する
      return;
    }

    sprite.x += (targetX - sprite.x) * easing;
    sprite.y += (targetY - sprite.y) * easing;
    if (Math.abs(sprite.x - targetX) < closeEnough && Math.abs(sprite.y - targetY) < closeEnough) {
      targetX = Math.random() * app.screen.width;
      targetY = Math.random() * app.screen.height;
    }
  };

  app.ticker.add(tickerCallback);  // スプライトのプロパティとしてTickerのコールバックを保存
  sprite.stopRandomMoveAnimation = () => app.ticker.remove(tickerCallback);
};



  //作動
  const addRandomMove = (app, spriteId, easing, closeEnough) => {
    modifySpriteById(app, spriteId, sprite => {
      randomMove(app, sprite, easing, closeEnough);
    });

    setSpriteInfo(prevSprites =>
      prevSprites.map(sprite =>
        sprite.sprite_id === spriteId
          ? {
              ...sprite,
              others_anime: true,
              anime_value: {
                rotate_mode: 'random',
                easing_value: easing,
                closeEnough_value: closeEnough
              }
            }
          : sprite
      )
    );
  };


//作動ボタン
const handleRandomMove = () => {
  addRandomMove(appRef.current, activeSprite, 0.05, 1);
};



//停止
const stopRandomMove = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopRandomMoveAnimation) {
      sprite.stopRandomMoveAnimation();
      delete sprite.stopRandomMoveAnimation;
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            others_anime: false,
            anime_value: null
          }
        : sprite
    )
  );
};

const stopRandomMoveBtn = () => {
  stopRandomMove(activeSprite)
};




//回転アニメ
const addRotationAnimation = (app, sprite, speed, clockwise) => {
  const rotationDirection = clockwise ? 1 : -1;

  const rotateAnime = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトは既に削除されています");
      app.ticker.remove(rotateAnime); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    sprite.rotation += rotationDirection * speed * app.ticker.deltaMS * 0.001;
  };
  app.ticker.add(rotateAnime);
  sprite.stopRotateAnimeTicker = () => app.ticker.remove(rotateAnime);
  
};

// 特定のスプライトIDに回転アニメーションを適用する関数
const applyRotationById = (app, spriteId, speed, clockwise) => {
  modifySpriteById(app, spriteId, sprite => {
    addRotationAnimation(app, sprite, speed, clockwise);
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            rotate_anime: true,
            rotate_value: {
              rotate_mode: 'revolution',
              speed_value: speed,
              clockwise_value: clockwise
            }
          }
        : sprite
    )
  );
};

// const handleRotationAnimation = () => {
//   applyRotationById(appRef.current, activeSprite, rotationSpeed, clockwiseType);
// };

const handleRotationAnimation = () => {
  // activeSpriteが存在しない場合、何もせずに関数を終了する。
  if (!activeSprite) {
    console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
    return;
  }
  // スプライトを検索する。
  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);

  // spriteが見つからない場合、エラーメッセージを表示する。
  if (!sprite) {
    console.log("Sprite not found."); // 実際の実装ではユーザーに通知するための方法を使用することが推奨される。
    return;
  }
  // spriteのアニメーション状態に応じて処理を分岐する。
  if (sprite.rotate_value && sprite.rotate_value.rotate_mode === 'pendulum') {
    handleAlertMessageAnime();
  } else if (sprite.rotate_anime) {
    stopRotateAnimeRevolution(activeSprite)
  } else {
    applyRotationById(appRef.current, activeSprite, rotationSpeed, clockwiseType);
  }
};


//停止
const stopRotateAnimeRevolution = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopRotateAnimeTicker) {
      sprite.stopRotateAnimeTicker();
      delete sprite.stopRotateAnimeTicker;
      const targetSpriteInfo = spriteInfo.find(sprite => sprite.sprite_id === spriteId);
      if (targetSpriteInfo) {
        const angleRadians = targetSpriteInfo.angleDegrees_value * (Math.PI / 180);
        sprite.rotation = angleRadians;
      }
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            rotate_anime: false,
            rotate_value: null
          }
        : sprite
    )
  );
};

// const handleRotateAnimeStop = () => {
//   stopRotateAnimeRevolution(activeSprite)
// };






//振り子アニメ
const addSwingPendulumAnimation = (app, sprite, maxRotation, period, clockwise) => {
  let rotationDirection = clockwise ? 1 : -1;
  let startTime = app.ticker.lastTime; // アニメーション開始時の時間を保存
  let maxRotationValue = Math.PI / maxRotation;

  const swingPendulum = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトは既に削除されています");
      app.ticker.remove(swingPendulum); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    const currentTime = app.ticker.lastTime;
    const elapsedTime = (currentTime - startTime) % period; // 現在の周期内での経過時間
    const phase = (elapsedTime / period) * Math.PI * 2; // 振動のフェーズ（全周の2π）

    // Math.sinの範囲は-1から1なので、この値に最大回転角度を掛ける
    sprite.rotation = maxRotationValue * Math.sin(phase) * rotationDirection;

    // πに到達したら方向を反転
    if (phase >= Math.PI) {
      rotationDirection *= -1;
      startTime = currentTime; // 次の周期の開始時刻を更新
    }
  };

  app.ticker.add(swingPendulum);
  sprite.stopSwingPendulumTicker = () => app.ticker.remove(swingPendulum); // アニメーション停止用の関数を提供
};


// 特定のスプライトIDに回転アニメーションを適用する関数
const swingPendulumAnime = (app, spriteId, maxRotation, period, clockwise) => {
  modifySpriteById(app, spriteId, sprite => {
    addSwingPendulumAnimation(app, sprite, maxRotation, period, clockwise);
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            rotate_anime: true,
            rotate_value: {
              rotate_mode: 'pendulum',
              maxRotation_value: maxRotation,
              period_value: period,
              clockwise_value: clockwise
            }
          }
        : sprite
    )
  );
};

// const handleSwingPendulumBtn = () => {
//   swingPendulumAnime(appRef.current, activeSprite, pendulumMaxRotation, pendulumPeriod, clockwiseType);
// };


const handleSwingPendulumBtn = () => {
  // activeSpriteが存在しない場合、何もせずに関数を終了する。
  if (!activeSprite) {
    console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
    return;
  }
  // スプライトを検索する。
  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);

  // spriteが見つからない場合、エラーメッセージを表示する。
  if (!sprite) {
    console.log("Sprite not found."); // 実際の実装ではユーザーに通知するための方法を使用することが推奨される。
    return;
  }
  // spriteのアニメーション状態に応じて処理を分岐する。
  if (sprite.rotate_value && sprite.rotate_value.rotate_mode === 'revolution') {
    handleAlertMessageAnime();
  } else if (sprite.rotate_anime) {
    stopSwingPendulum(activeSprite);
  } else {
    swingPendulumAnime(appRef.current, activeSprite, pendulumMaxRotation, pendulumPeriod, clockwiseType);
  }
};


//停止
const stopSwingPendulum = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopSwingPendulumTicker) {
      sprite.stopSwingPendulumTicker();
      delete sprite.stopSwingPendulumTicker;
      const targetSpriteInfo = spriteInfo.find(sprite => sprite.sprite_id === spriteId);
      if (targetSpriteInfo) { 
        const angleRadians = targetSpriteInfo.angleDegrees_value * (Math.PI / 180);
        sprite.rotation = angleRadians;
      }
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            rotate_anime: false,
            rotate_value: null
          }
        : sprite
    )
  );
};

// const handleSwingPendulumStop = () => {
//   stopSwingPendulum(activeSprite)
// };








//スケールアニメ
const addScaleAnimation = (sprite, app, minScale, maxScale, period) => {
  let startTime = app.ticker.lastTime;
  const scaleAnimation = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトは既に削除されています");
      app.ticker.remove(scaleAnimation); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    const elapsedTime = app.ticker.lastTime - startTime;
    const phase = (elapsedTime / period) * Math.PI * 2; // 完全なサイクル
    const scale = minScale + (maxScale - minScale) * (1 + Math.sin(phase)) / 2;
    sprite.scale.set(scale, scale);
  };
  app.ticker.add(scaleAnimation);
  sprite.stopScaleAnimationTicker = () => app.ticker.remove(scaleAnimation);
};

// スケールアニメーションを特定のスプライトIDに適用する関数
const applyScaleAnimationById = (app, spriteId, minScale, maxScale, period) => {
  modifySpriteById(app, spriteId, sprite => {
    addScaleAnimation(sprite, app, minScale, maxScale, period);
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            scale_anime: true,
            scale_anime_value: {
              min_scale: minScale,
              max_scale: maxScale,
              period_value: period
            }
          }
        : sprite
    )
  );

};

// const handleScaleAnimationById = () => {
//   applyScaleAnimationById(appRef.current, activeSprite, 0.5, 1.5, 2000);
// };

const handleScaleAnimationById = () => {
  // activeSpriteが存在しない場合、何もせずに関数を終了する。
  if (!activeSprite) {
    console.log("No active sprite selected."); // 必要に応じて適切なエラーハンドリングを追加
    return;
  }
  // スプライトを検索する。
  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);

  // spriteが見つからない場合、エラーメッセージを表示する。
  if (!sprite) {
    console.log("Sprite not found."); // 実際の実装ではユーザーに通知するための方法を使用することが推奨される。
    return;
  }
  // spriteのアニメーション状態に応じて処理を分岐する。
  if (sprite.scale_anime) {
    stopScaleAnimation(activeSprite);
  } else {
    applyScaleAnimationById(appRef.current, activeSprite, scaleAnimationMinScale, scaleAnimationMaxScale, scaleAnimationPeriod);
  }
};


// スケールアニメーションを停止する関数
const stopScaleAnimation = (spriteId) => {
  modifySpriteById(appRef.current, spriteId, sprite => {
    if (sprite.stopScaleAnimationTicker) {
      sprite.stopScaleAnimationTicker();
      delete sprite.stopScaleAnimationTicker;
      const targetSpriteInfo = spriteInfo.find(sprite => sprite.sprite_id === spriteId);
      if (targetSpriteInfo && targetSpriteInfo.sprite_scale) {
      sprite.scale.set(targetSpriteInfo.sprite_scale);
      }
    }
  });

  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite =>
      sprite.sprite_id === spriteId
        ? {
            ...sprite,
            scale_anime: false,
            scale_anime_value: null
          }
        : sprite
    )
  );
};

// const handleScaleAnimationStop = () => {
//   stopScaleAnimation(activeSprite);
// };







//登録
const handleMoveClickSprites = (speed) => {
  if (activeSprite) {
    setMoveClickSprites(prevSprites => {
      // activeSprite ID がすでに配列内に存在するかどうかをチェック
      if (!prevSprites.some(sprite => sprite.id === activeSprite)) {
        // 存在しない場合は、新しいオブジェクトを配列に追加

        setSpriteInfo(prevSprites =>
          prevSprites.map(sprite =>
            sprite.sprite_id === activeSprite
              ? {
                  ...sprite,
                  others_anime: true,
                  anime_value: {
                    rotate_mode: 'click',
                    speed_value: speed
                  }
                }
              : sprite
          )
        );
        return [...prevSprites, { id: activeSprite, speed: speed }];
      }
      // 既に存在する場合は、配列をそのまま返す
      return prevSprites;
    });

  }
};


//登録解除
const handleMoveClickDelete = () => {
  if (activeSprite) {
    setMoveClickSprites(prevSprites => 
      prevSprites.filter(sprite => sprite.id !== activeSprite)
    );

    setSpriteInfo(prevSprites =>
      prevSprites.map(sprite =>
        sprite.sprite_id === activeSprite
          ? {
              ...sprite,
              others_anime: false,
              anime_value: null
            }
          : sprite
      )
    );
  }
};

//全登録解除
const handleMoveClickDeleteAll = () => {
  setMoveClickSprites([])
  setSpriteInfo(prevSprites =>
    prevSprites.map(sprite => ({
      ...sprite,
      others_anime: false,
      anime_value: null
    }))
  );
};


  // const handleSprite = () => {
  // // 特定のスプライトの位置を変更する例
  // modifySpriteById(appRef.current, 3, sprite => {
  //   sprite.x = 100;  // 新しいx座標
  //   sprite.y = 200;  // 新しいy座標
  // });
  // console.log(activeSpriteRef.current);
  // };


  // const onDragStart = (event, sprite, app) => {
  //   sprite.alpha = 0.5;
  //   sprite.data = event.data;
  //   app.stage.on('pointermove', e => onDragMove(e, sprite));
  // };

  // const onDragMove = (event, sprite) => {
  //   const newPosition = sprite.data.getLocalPosition(sprite.parent);
  //   sprite.x = newPosition.x;
  //   sprite.y = newPosition.y;
  // };

  // const onDragEnd = (sprite) => {
  //   sprite.alpha = 1;  // スプライトの透明度を完全に元に戻す
  //   sprite.data = null;
  //   appRef.current.stage.off('pointermove');  // ドラッグ中に追加したポインタームーブイベントを削除

  //   // ドラッグ終了時のスプライトの位置を記録
  //   console.log(`スプライトのポジション x: ${sprite.x}, y: ${sprite.y}`);

  //   // スプライトの情報を更新する関数を呼び出す（状態管理がある場合）
  //   updateSpritePosition(sprite.id, { x: sprite.x, y: sprite.y });
  // };



  const onDragStart = (event, sprite, app) => {
    if (!sprite) {
      console.error("スプライトが存在しません。");
      return;
    }
    // sprite.alpha = 0.5;
    sprite.data = event.data;
    app.stage.on('pointermove', e => onDragMove(e, sprite, app));
  };
  
  const onDragMove = (event, sprite, app) => {
    if (!sprite || !sprite.data) {
      app.stage.off('pointermove'); // ドラッグ中のイベントを安全に削除
      console.error("スプライトが無効です。");
      return;
    }
    const newPosition = sprite.data.getLocalPosition(sprite.parent);
    sprite.x = newPosition.x;
    sprite.y = newPosition.y;
  };
  
  const onDragEnd = (sprite) => {
    if (!sprite) {
      console.error("ドラッグ終了時にスプライトが見つかりません。");
      return;
    }
    // sprite.alpha = 1;
    sprite.data = null;
    appRef.current.stage.off('pointermove');
  
    console.log(`スプライトのポジション x: ${sprite.x}, y: ${sprite.y}`);
    updateSpritePosition(sprite.id, { x: sprite.x, y: sprite.y });
  };
  




  // スプライト情報を更新する関数（ステートを使用している場合）
  const updateSpritePosition = (spriteId, newPosition) => {
    setSpriteInfo(prevSprites => 
      prevSprites.map(sprite =>
        sprite.sprite_id === spriteId ? { ...sprite, sprite_position: newPosition } : sprite
      )
    );
  };

  //現在のspriteInfoの中身を確認する
  const checkSpriteInfo = () => {
    console.log('spriteInfoの中身', spriteInfo )
    console.log('背景データの中身', spaceInfo )
    console.log('ざんき', maxSprite);
    console.log('クリックストライプ', moveClickSprites);
    console.log('選択スプライトのid', activeSprite);
  };



  //「送信ボタン」が押された時にデータを保存
  const getData = useCallback(() => {
    if (appRef.current) {
      const dataURL = appRef.current.renderer.view.toDataURL('image/png');

      const saveSpaceData = [spaceInfo];
      const spaceId = spaceInfo.space_id;

      let saveItemData = [];
      if (spriteInfo) {
        saveItemData = spriteInfo.map(sprite => {
          return {
            sprite_id: sprite.sprite_id,
            item_id: sprite.item_id,
            sprite_position: sprite.sprite_position,
            sprite_scale: sprite.sprite_scale,
            sprite_mask: sprite.sprite_mask,
            mask_value: sprite.mask_value,
            sprite_alpha: sprite.sprite_alpha,
            top_bottom: sprite.top_bottom,
            top_bottom_value: sprite.top_bottom_value,
            left_right: sprite.left_right,
            left_right_value: sprite.left_right_value,
            rotate_anime: sprite.rotate_anime,
            rotate_value: sprite.rotate_value,
            scale_anime: sprite.scale_anime,
            scale_anime_value: sprite.scale_anime_value,
            others_anime: sprite.others_anime,
            anime_value: sprite.anime_value,
            angleDegrees_value: sprite.angleDegrees_value
          };
        });
      } else {
        saveItemData = null;
      }
      return { dataURL, saveItemData, saveSpaceData, spaceId };
    }
  }, [spriteInfo, spaceInfo]);

  // 親にデータ取得関数を伝達
  useEffect(() => {
    if (onDataFromGrandchild) {
      onDataFromGrandchild(getData);
    }
  }, [getData]);


  
  //共有するもの
  const value = {
    handleAddSprite,
    handleAddSpace,
    activeSprite,
    spriteInfo,
    handleVerticalSwingById,
    handleHorizontalSwingById,
    handleRotationAnimation,
    handleSwingPendulumBtn,
    handleScaleAnimationById,
    changeNewScale,
    changeNewAlpha,
    changeNewAngle
  }

  return (
    <>
    <button onClick={checkSpriteInfo}>スプライトインフォの中</button>
      <div
        style={{
          width: '1000px',
          height: '750px',
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

  {/* アニメ不可の時のアラートメッセージ */}
  {alertToastAnime && (
    <div
    className="alert-message"
      style={{
        // position: 'absolute',
        // left: '50%',
        // top: '50%',
        // transform: 'translate(-60%, 40%)',
        textAlign: 'left',
        lineHeight: '1.3',
        whiteSpace: 'pre-wrap'
      }}
    >
      {alertMessageAnime}
    </div>
  )}

        <PixiComponentShareProvider value={value}>
          {/* リストパネル(作業専用) */}
          {pixiMode && <PixiListPanel itemAllId={itemAllId} spaceAllId={spaceAllId} />}

          {/* 調整パネル(作業専用) */}
          {pixiMode && customPanelVisible && <PixiCustomPanel />}

          {/* 詳細パネル(再描画専用) */}
          {!pixiMode && pixiDetailPanelVisible && <PixiDetailPanel itemAllId={itemAllId} />}
        </PixiComponentShareProvider>

        <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} id={`compositeStage_${compositeId}`} />
      </div>
        {/* <button onClick={() => handleAddSprite(385, 'item_canvas')}>Add Sprite</button> */}
        {/* <button onClick={handleSprite}>3番目のバニーが飛ぶ</button> */}
        {/* <button onClick={handleActiveSprite}>アクティブストライプのみ飛ばす</button> */}
          
{/* 
        <button onClick={handleHorizontalSwingById}>左右</button>
        <button onClick={handleHorizontalStopById}>左右ストップ</button>

  <button onClick={handleVerticalSwingById}>上下</button>
  <button onClick={handleVerticalSwingAnimationStop}>上下ストップ</button> */}

  <button onClick={handleRandomMove}>ランダム</button>
  <button onClick={stopRandomMoveBtn}>ランダムストップ</button>


  {/* <button onClick={handleRotationAnimation}>回転</button>
  <button onClick={handleRotateAnimeStop}>回転ストップ</button>

  <button onClick={handleSwingPendulumBtn}>振り子</button>
  <button onClick={handleSwingPendulumStop}>振り子ストップ</button> */}
{/* 
  <button onClick={handleScaleAnimationById}>スケール</button>
  <button onClick={handleScaleAnimationStop}>スケールストップ</button> */}

  <button onClick={() => handleMoveClickSprites(0.01)}>登録0.01</button>
  <button onClick={() => handleMoveClickSprites(0.05)}>登録0.05</button>
  <button onClick={handleMoveClickDelete}>登録削除</button>
  <button onClick={handleMoveClickDeleteAll}>全登録削除</button>
  

  <button onClick={() => handleAddSpaceChange(1)}>背景アニメ</button>
  
  <button onClick={handleRemoveSprite}>削除</button>
{/* 
  <button onClick={changeNewScale}>拡大</button> */}
  <button onClick={changeNewMask}>マスク</button>

    </>
  );
};

export { PixiComponent };

