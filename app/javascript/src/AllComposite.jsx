
import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';
import PixiTest from './PixiTest';

const AllComposite = ({ allComposite, itemAllId, spaceAllId, subUserAllId }) => {
    
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(false);
  const [spaceObject, setSpaceObject] = useState();
  const [itemObject, setItemObject] = useState();

  const [defaultPixi, setDefaultPixi] = useState(true);

  const [changeDate, setChangeDate] = useState(false);

  const [pixiDateId, setPixiDateId] = useState();

  const [selectCompositeName, setSelectCompositeName] = useState();

  
  useEffect(() => {
    // allComposite 配列が空であるかどうかを確認
    if (allComposite.length === 0) {
      setDefaultPixi(false);
      console.log('allCompositeの中', allComposite)
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








    <div className="flux-screen-menu-frame" style={{ position: 'relative' }}>


    <div
      className="default-composite-btn info-botann"
      style={{ position: 'absolute', left: '-268px'}}
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

  <div className="flex">
<div style={{ width: '122px', height: '51px', marginRight: '8px'}}></div>

<div style={{ overflowX: 'auto', height: 'auto', display: 'flex', width:'725px' }}>
      <div className="flex-start-center">



        {allComposite.map((composite, index) => (
          <div key={index} className="flex">
            <div style={{ margin: '2.5px' }}>
            <div
                onClick={() => handleCompositeChange(composite.id)}
                onTouchStart={() => handleCompositeChange(composite.id)}
                // className="tooltip-container"
              >
              <img src={composite.composite_image} alt="Canvas Image" style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
              {/* <span className="tooltip-text" style={{ textAlign: 'left' }}>{composite.composite_name}</span> */}
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


