import React from 'react';
import { PixiGroupProvider } from './PixiGroupContext';
import { PixiComponent } from './PixiComponent';



const PixiSet = ({
  itemAllId,
  spaceAllId,
  onDataFromGrandchild,
  pixiMode,
  subUserAllId,
  compositeId,
  spaceObject,
  itemObject
}) => {
  return (
    <>
      <PixiGroupProvider>
        <div>
          <PixiComponent
            onDataFromGrandchild={onDataFromGrandchild}
            key={compositeId}
            compositeId={compositeId}
            itemAllId={itemAllId}
            spaceAllId={spaceAllId}
            pixiMode={pixiMode}
            subUserAllId={subUserAllId}
            spaceObject={spaceObject}
            itemObject={itemObject}
          />
        </div>
      </PixiGroupProvider>
    </>
  );
};



export { PixiSet };
