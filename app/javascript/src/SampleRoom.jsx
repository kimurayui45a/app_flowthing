import React, { useState } from 'react';
import { PixiGroupSampleProvider } from './PixiGroupSampleContext';
import SampleRoomPixi from './SampleRoomPixi';

const SampleRoom = () => {

  const [sampleRoomId, setSampleRoomId] = useState('myRoom');

  return (
    <>
      <PixiGroupSampleProvider>
        <div className="flux-screen-show-third">
          <div className="flux-screen-show-frame">
            <div>
              <SampleRoomPixi sampleRoomId={sampleRoomId} />
            </div>
          </div>
        </div>
      </PixiGroupSampleProvider>
    </>
  );
};
export default SampleRoom;