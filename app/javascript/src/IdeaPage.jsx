import React, { useState } from 'react';
import { PixiGroupSampleProvider } from './PixiGroupSampleContext';
import SampleRoomPixi from './SampleRoomPixi';

const SampleRoom = () => {

  const [sampleRoomId, setSampleRoomId] = useState('ideaPage');

  return (
    <>
      <PixiGroupSampleProvider>
        <SampleRoomPixi sampleRoomId={sampleRoomId} />
      </PixiGroupSampleProvider>
    </>
  );
};
export default SampleRoom;