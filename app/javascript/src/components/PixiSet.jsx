import React from 'react';
import { PixiGroupProvider } from './PixiGroupContext';
import { PixiComponent } from './PixiComponent';



const PixiSet = ({
  itemAllId,
  spaceAllId,
  onDataFromGrandchild,
  pixiMode
}) => {
  return (
    <>
      <PixiGroupProvider>
        <div>
          <PixiComponent
            onDataFromGrandchild={onDataFromGrandchild}
            // key={canvasImgId}
            // canvasImgId={canvasImgId}
            itemAllId={itemAllId}
            spaceAllId={spaceAllId}
            pixiMode={pixiMode}
          />
        </div>
      </PixiGroupProvider>
    </>
  );
};



export { PixiSet };
