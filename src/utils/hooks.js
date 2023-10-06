import { useState, useCallback } from 'react';

const initAudioData = { dataArray: [], bufferLength: 0 };

export const useAudioContext = (audioRef) => {
  const [audioData, setAudioData] = useState(initAudioData);

  const createContext = useCallback(() => {
    if (!audioRef.current) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = context.createMediaElementSource(audioRef.current);
    const analyser = context.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    setAudioData({ context, analyser, dataArray, audioSource, bufferLength });
  }, [audioRef]);

  const getByteFrequencyData = useCallback(() => {
    if (audioData.analyser) audioData.analyser.getByteFrequencyData(audioData.dataArray);

    return audioData.dataArray;
  }, [audioData]);

  const onPlay = useCallback(() => {
    if (!audioData.audioSource) createContext();
    if (audioData.context?.state === 'suspended') audioData.context.resume();
  }, [createContext, audioData]);
  const onPause = useCallback(() => {
    if (audioData.context?.state === 'running') audioData.context.suspend();
  }, [audioData]);

  return { analyser: audioData?.analyser, onPlay, onPause, getByteFrequencyData };
};
