import React, { useRef, useState, useCallback } from 'react';

import { useAudioContext } from 'utils/hooks';
import Canvas from 'components/Canvas';
import Player from 'components/Player';

import { Container } from './styles';

const Visualizer = () => {
  const audioRef = useRef();
  const [state, setState] = useState({ playing: false, stopped: true });
  const { analyser, onPlay, onPause, getByteFrequencyData } = useAudioContext(audioRef);

  const handlePlay = useCallback(() => {
    onPlay();
    setState({ playing: true, stopped: false });
  }, [onPlay]);
  const handlePause = useCallback(() => {
    onPause();
    setState(($) => ({ ...$, playing: false }));
  }, [onPause]);
  const handleEnded = useCallback(() => {
    onPause();
    setState({ playing: false, stopped: true });
  }, [onPause]);

  return (
    <Container>
      <Canvas state={state} analyser={analyser} getByteFrequencyData={getByteFrequencyData} />
      <Player ref={audioRef} onPlay={handlePlay} onPause={handlePause} onEnded={handleEnded} />
    </Container>
  );
};

export default Visualizer;
