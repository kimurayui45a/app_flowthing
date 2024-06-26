
import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';
// import PixiTest from './PixiTest';
import SampleRoom from './SampleRoom';

const AllComposite = ({ allComposite, itemAllId, spaceAllId, subUserAllId, profileId }) => {
    



  const [itemNameSearch, setItemNameSearch] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [foundComposites, setfoundComposites] = useState([]);

//検索フォームから検索できるアイテム item or composite
const [selectedSearchTarget, setSelectedSearchTarget] = useState('item');


  
  // const handleSearch = () => {
  //   let targets;
  //   if (selectedSearchTarget === 'item') {
  //     targets = itemAllId.filter(target => target.item_name === itemNameSearch);
  //     setFoundItems(targets.length > 0 ? targets : null);
  //   } else {
  //     targets = allComposite.filter(target => target.composite_name === itemNameSearch);
  //     setfoundComposites(targets.length > 0 ? targets : null);
  //   }
  // };

  const handleSearch = () => {
    let targets;
    if (selectedSearchTarget === 'item') {
      targets = itemAllId.filter(target => 
        target.item_name.toLowerCase().includes(itemNameSearch.toLowerCase())
      );
      setFoundItems(targets.length > 0 ? targets : null);
    } else {
      targets = allComposite.filter(target => 
        target.composite_name.toLowerCase().includes(itemNameSearch.toLowerCase())
      );
      setfoundComposites(targets.length > 0 ? targets : null);
    }
  };



  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(false);
  const [spaceObject, setSpaceObject] = useState();
  const [itemObject, setItemObject] = useState();

  const [defaultPixi, setDefaultPixi] = useState(true);

  const [changeDate, setChangeDate] = useState(false);

  const [pixiDateId, setPixiDateId] = useState();

  const [selectCompositeName, setSelectCompositeName] = useState();

  // const [randomEpisodes, setRandomEpisodes] = useState([]);


  // useEffect(() => {
  //   if (itemAllId.length > 0 && subUserAllId.length > 0) {
  //     // subUserAllId を ID をキーとするオブジェクトに変換して高速アクセスを可能にする
  //     const subUserIndex = subUserAllId.reduce((acc, subUser) => {
  //       acc[subUser.id] = subUser;
  //       return acc;
  //     }, {});
  
  //     // item.episode と対応する sub_user の last_accessed_at を抽出
  //     const episodesWithAccessInfo = itemAllId.map(item => {
  //       const subUser = subUserIndex[item.sub_user_id];
  //       return {
  //         id: item.item_id,
  //         episode: item.episode,
  //         lastAccessedAt: subUser ? subUser.last_accessed_at : 'Unknown'
  //       };
  //     });
  
  //     // シャッフル関数を適用
  //     // const shuffledEpisodes = shuffleArray(episodesWithAccessInfo);
  //     // setRandomEpisodes(shuffledEpisodes);
  //   }
  // }, [itemAllId, subUserAllId]);  // subUserAllId 依存関係にも注意
  
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
      //const selectComposite = allComposite.reduce((max, composite) => composite.id > max.id ? composite : max, allComposite[0]);
      
      // allComposite の中で最新の updated_at を持つ composite を見つける
      const selectComposite = allComposite.reduce((latest, composite) => {
        return new Date(composite.updated_at) > new Date(latest.updated_at) ? composite : latest;
      }, allComposite[0]);



      if (selectComposite) {
        const spaceData = selectComposite.composite_space;
        const itemData = selectComposite.composite_item;
        setSpaceObject(spaceData);
        setItemObject(itemData);
        setSelectCompositeName(selectComposite.composite_name);
      }
    }
  }, []);

  // useEffect(() => {
  //   // allComposite 配列が空かどうかを確認
  //   if (allComposite.length === 0) {
  //     setDefaultPixi(false);
  //     // console.log('allCompositeの中', allComposite)
  //   } else {
  //     // allComposite の中で最新の updated_at を持つ composite を見つける
  //     const selectComposite = allComposite.reduce((latest, composite) => {
  //       return new Date(composite.updated_at) > new Date(latest.updated_at) ? composite : latest;
  //     }, allComposite[0]);
  
  //     if (selectComposite) {
  //       const spaceData = selectComposite.composite_space;
  //       const itemData = selectComposite.composite_item;
  //       setSpaceObject(spaceData);
  //       setItemObject(itemData);
  //       setSelectCompositeName(selectComposite.composite_name);
  //     }
  //   }
  // }, []);
  
  
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
  


  const handleTargetSearch = (target) => {
    setSelectedSearchTarget(target);  // 選択された値でステートを更新
  };


  // エンターキーでのフォーム送信を防ぐための関数
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className="flex-column top-container">



<div className="flex">
    <div>
      <div  style={{ width: '200px', textAlign: 'left' }}>
      <div><span className="midasi-t-five">探し物をする</span></div>
        <input
          type="text"
          value={itemNameSearch}
          onChange={(e) => setItemNameSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className='form-control board-item-form'
        />
      </div>


      <div
        className="select-confirm-btn"
        onClick={handleSearch}
        onTouchStart={handleSearch}
        style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '5px' }}
        >
        決定
      </div>


      <div className="flex">
        <div
          className="select-confirm-btn"
          onClick={() => handleTargetSearch('item')}
          onTouchStart={() => handleTargetSearch('item')}  
          style={{ width: 'auto', height: 'auto', padding: '2px 12px', margin: '5px', backgroundColor: selectedSearchTarget === 'item' ? '#9199AE' : '#c2c1c1', borderRadius: '2px'}}
          >
          Flow Thing
        </div>

        <div
          className="select-confirm-btn"
          onClick={() => handleTargetSearch('composite')}
          onTouchStart={() => handleTargetSearch('composite')}
          style={{ width: 'auto', height: 'auto', padding: '2px 12px', margin: '5px', backgroundColor: selectedSearchTarget === 'composite' ? '#9199AE' : '#c2c1c1', borderRadius: '2px' }}
          >
          Flux Screen
        </div>
      </div>
    </div>



{selectedSearchTarget === 'item' && (
  foundItems ? (
    foundItems.map((target, index) => (
      <div key={index}>
        <a href={`/items/${target.id}`}>
        <img src={target.item_canvas} alt="Canvas Image" style={{ width: '50px' }}  />
        </a>
      </div>
    ))
  ) : (
    <span>検索アイテムがありません</span>
  )
)}



{selectedSearchTarget === 'composite' && (
  foundComposites ? (
    foundComposites.map((target, index) => (
      <div key={index}>
                  <div onClick={() => handleCompositeChange(target.id)} onTouchStart={() => handleCompositeChange(target.id)} style={{ cursor: 'pointer' }}>
            <img src={target.composite_image} alt="Canvas Image" style={{ width: '100px' }} />
          </div>
      </div>
    ))
  ) : (
    <span>検索アイテムがありません</span>
  )
)}

</div>









      
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
                <div className="flex">

                <SampleRoom />

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
                    <span className="f-text">サンプル</span> 
                    <span className="t-text">ルーム</span>
                    {/* <span className="gray-text">とは？</span> */}
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

            {allComposite
              .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // 更新日時で降順にソート
              .slice(0, 4) // 最新の6つの要素を取得
              .map((composite, index) => (

                <div key={index} className="flex">
                  <div className="flux-screen-show-third-mini">
                    <div className="flux-screen-show-frame-mini">
                      <div>
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


