import { useRef, useState, useCallback, useEffect } from 'react';

export const useAudioVisualization = () => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const animationFrame = useRef(null);
  const [data, setData] = useState({});
  const isReady = Boolean(data.analyser);

  const startAnimation = useCallback(() => {
    if (!contextRef.current && canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d');
    }

    if (canvasRef.current) {
      canvasRef.current.height = rectRef.current.height;
      canvasRef.current.width = rectRef.current.width;
    }

    if (data.dataArray && data.analyser && contextRef.current && rectRef.current) {
      let x = 0;
      const ratio = rectRef.current.height / 256;
      const gap = rectRef.current.width / 1000;
      const barWidth = (rectRef.current.width - gap * data.analyser.frequencyBinCount + gap) / data.analyser.frequencyBinCount;

      contextRef.current.clearRect(0, 0, rectRef.current.width, rectRef.current.height);
      data.analyser.getByteFrequencyData(data.dataArray);
      data.dataArray.forEach((val, i) => {
        const barHeight = ratio * val;
        const red = (i * barHeight) / 10;
        const green = i * 4;
        const blue = barHeight / 4 - 12;
        contextRef.current.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        contextRef.current.fillRect(x + gap * i, rectRef.current.height - barHeight, barWidth, barHeight);
        x += barWidth;
      });
    }

    animationFrame.current = requestAnimationFrame(startAnimation);
  }, [data.analyser, data.dataArray]);

  const createContext = useCallback(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = context.createMediaElementSource(audioRef.current);
    const analyser = context.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 128;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    setData({ context, analyser, dataArray, audioSource });
  }, [audioRef]);

  const onPlay = useCallback(() => {
    if (!data.audioSource) {
      createContext();
    } else if (data.context?.state === 'suspended') {
      data.context.resume();
      startAnimation();
    }
  }, [createContext, data.audioSource, data.context, startAnimation]);

  const onPause = useCallback(() => {
    if (data.context?.state === 'running') {
      data.context.suspend();
    }
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
  }, [data.context]);

  const onEnded = useCallback(() => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    if (contextRef.current && rectRef.current) {
      contextRef.current.clearRect(0, 0, rectRef.current.width, rectRef.current.height);
    }
  }, []);

  useEffect(() => {
    if (isReady) startAnimation();
  }, [isReady, startAnimation]);

  useEffect(
    () => () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    },
    []
  );

  return { audioRef, canvasRef, rectRef, onPlay, onPause, onEnded, ...data };
};

export const useResizeObserver = (rectRef) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;
      let animationFrame;

      const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
        animationFrame = requestAnimationFrame(() => {
          rectRef.current.width = contentRect.width; // eslint-disable-line no-param-reassign
          rectRef.current.height = contentRect.height; // eslint-disable-line no-param-reassign
        });
      });

      resizeObserver.observe(wrapper);

      return () => {
        cancelAnimationFrame(animationFrame);
        resizeObserver.unobserve(wrapper);
      };
    }

    return () => null;
  }, [rectRef, wrapperRef]);

  return wrapperRef;
};
