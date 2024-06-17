
import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';
import PixiTest from './PixiTest';

const AllComposite = ({ allComposite, itemAllId, spaceAllId, subUserAllId, profileId }) => {
    
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(false);
  const [spaceObject, setSpaceObject] = useState();
  const [itemObject, setItemObject] = useState();

  const [defaultPixi, setDefaultPixi] = useState(true);

  const [changeDate, setChangeDate] = useState(false);

  const [pixiDateId, setPixiDateId] = useState();

  const [selectCompositeName, setSelectCompositeName] = useState();

  // const [randomEpisodes, setRandomEpisodes] = useState([]);


  useEffect(() => {
    if (itemAllId.length > 0 && subUserAllId.length > 0) {
      // subUserAllId を ID をキーとするオブジェクトに変換して高速アクセスを可能にする
      const subUserIndex = subUserAllId.reduce((acc, subUser) => {
        acc[subUser.id] = subUser;
        return acc;
      }, {});
  
      // item.episode と対応する sub_user の last_accessed_at を抽出
      const episodesWithAccessInfo = itemAllId.map(item => {
        const subUser = subUserIndex[item.sub_user_id];
        return {
          id: item.item_id,
          episode: item.episode,
          lastAccessedAt: subUser ? subUser.last_accessed_at : 'Unknown'
        };
      });
  
      // シャッフル関数を適用
      // const shuffledEpisodes = shuffleArray(episodesWithAccessInfo);
      // setRandomEpisodes(shuffledEpisodes);
    }
  }, [itemAllId, subUserAllId]);  // subUserAllId 依存関係にも注意
  
  // // Fisher-Yates Shuffle Algorithm
  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }


  useEffect(() => {
    // allComposite 配列が空であるかどうかを確認
    if (allComposite.length === 0) {
      setDefaultPixi(false);
      // console.log('allCompositeの中', allComposite)
    } else {
      // allComposite の中で一番大きいIDを持つ composite を見つける
      const selectComposite = allComposite.reduce((max, composite) => composite.id > max.id ? composite : max, allComposite[0]);
      
      if (selectComposite) {
        const spaceData = selectComposite.composite_space;
        const itemData = selectComposite.composite_item;
        setSpaceObject(spaceData);
        setItemObject(itemData);
        setSelectCompositeName(selectComposite.composite_name);
      }
    }
  }, []);
  
//   useEffect(() => {
// console.log('プロフ', profileId);
//   }, [profileId]);
  

  
  // const handleCompositeChange = (compositeId) => {
  //   const selectComposite = allComposite.find(composite => composite.id === compositeId);
  //   if (selectComposite) {
  //     const spaceDate = selectComposite.composite_space;
  //     const itemDate = selectComposite.composite_item;
  //     setSpaceObject(spaceDate);
  //     setItemObject(itemDate);
  //     setChangeDate(true);
  //     console.log('allCompositeの中', allComposite)
  //   }
  // }

  const handleCompositeChange = (dateId) => {
    const selectComposite = allComposite.find(composite => composite.id === dateId);
    if (selectComposite) {
      const spaceData = selectComposite.composite_space;
      const itemData = selectComposite.composite_item;
      setSpaceObject(spaceData);
      setItemObject(itemData);
      setPixiDateId(dateId);  // compositeIdを更新
      setChangeDate(true);
      setDefaultPixi(true);
      setSelectCompositeName(selectComposite.composite_name);
    }
  }



  // const getClassForLastRandom = (lastAccessedAt) => {
  //   if (!lastAccessedAt) return 'default-class';
  
  //   const hoursElapsed = Math.round((new Date() - new Date(lastAccessedAt)) / (1000 * 60 * 60));
  
  //   switch (true) {
  //     case (hoursElapsed >= 0 && hoursElapsed <= 2):
  //       return 'blur-0-card';
  //     case (hoursElapsed >= 3 && hoursElapsed <= 24):
  //       return 'blur-1-card';
  //     case (hoursElapsed >= 25 && hoursElapsed <= 72):
  //       return 'blur-2-card';
  //     case (hoursElapsed >= 73 && hoursElapsed <= 168):
  //       return 'blur-3-card';
  //     case (hoursElapsed >= 169 && hoursElapsed <= 720):
  //       return 'blur-4-card';
  //     case (hoursElapsed >= 721 && hoursElapsed <= 1464):
  //       return 'blur-5-card';
  //     case (hoursElapsed >= 1465 && hoursElapsed <= 2184):
  //       return 'blur-6-card';
  //     case (hoursElapsed >= 2185 && hoursElapsed <= 2568):
  //       return 'blur-7-card';
  //     case (hoursElapsed >= 2569 && hoursElapsed <= 4392):
  //       return 'item-card-container-gray-detail';
  //     case (hoursElapsed >= 4393 && hoursElapsed <= 8760):
  //       return 'item-card-container-black-detail';
  //     default:
  //       return 'item-card-container-redblack-detail';
  //   }
  // };
  


  return (
    <div className="flex-column top-container">
      <div className="flux-screen-show-third">
        <div className="flux-screen-show-frame">
          <div className="flux-screen-show-frame-second">
            {defaultPixi ? (
              <>
                <PixiSet
                  // key={compositeId}
                  // compositeId={compositeId}
                  key={pixiDateId}
                  itemAllId={itemAllId}
                  spaceAllId={spaceAllId}
                  subUserAllId={subUserAllId}
                  spaceObject={spaceObject}
                  itemObject={itemObject}
                  pixiMode={pixiMode}
                  changeDate={changeDate}
                  setChangeDate={setChangeDate}
                />
              </>
            ) : (
              <>
                {/* <PixiTest /> */}
                <div className="info-btn-fram flex">
                <a href="/info">
                <div className="info-botann">
                <div className="wave wave1"></div>
                  <div className="wave wave2"></div>
                  <div className="wave wave3"></div>
                  <div className="wave wave4"></div>
                <div className="info-botann-text">
                    <span className="f-text">F</span>low <span className="t-text">T</span>hing<span className="gray-text">とは？</span>
                </div>
                </div>
                </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>




      {selectCompositeName ? (
        <>
        <div className="nameplate"><p>{selectCompositeName}</p></div>
        </>
      ):(
        <>
        <span>Flux Screenがありません。</span>
        </>
      )}

      <div style={{ position: 'relative' }}>
        <div className="flux-screen-show-third-mini" style={{ width: '163.1px', position: 'absolute' }}>
          <div className="flux-screen-show-frame-mini">
            <div className="flux-screen-show-frame-second-mini">
              <div className="mini-top-canvas">
                <div
                  className="default-composite-btn info-botann"
                  style={{ position: 'absolute', left: '-268px', cursor: 'pointer' }}
                  onClick={() => setDefaultPixi(false)}
                  onTouchStart={() => setDefaultPixi(false)}
                >
                  <div className="wave wave1"></div>
                  <div className="wave wave2"></div>
                  <div className="wave wave3"></div>
                  <div className="wave wave4"></div>
                  <div className="info-botann-text">
                    <span className="f-text">F</span>low 
                    <span className="t-text">T</span>hing
                    <span className="gray-text">とは？</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div style={{ width: '178px', height: '51px', marginRight: '8px'}}></div>
          <div style={{ overflowX: 'auto', height: 'auto', display: 'flex', width:'725px' }}>
            <div className="flex-start-center">
              {allComposite.map((composite, index) => (
                <div key={index} className="flex">
                  <div className="flux-screen-show-third-mini">
                    <div className="flux-screen-show-frame-mini">
                      <div className="flux-screen-show-frame-second-mini">
                        <div className="mini-top-canvas">
                          <div style={{ margin: '2.5px' }}>
                            <div
                                onClick={() => handleCompositeChange(composite.id)}
                                onTouchStart={() => handleCompositeChange(composite.id)}
                                style={{ cursor: 'pointer' }}
                                // className="tooltip-container"
                              >
                              <img src={composite.composite_image} alt="Canvas Image" style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
                              {/* <span className="tooltip-text" style={{ textAlign: 'left' }}>{composite.composite_name}</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AllComposite;


