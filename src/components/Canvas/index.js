import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useMotionValue, useMotionValueEvent } from 'framer-motion';
import PropTypes from 'prop-types';

import { INIT_DATA, OPTIONS, BAR_1 } from './consts';
import { renderMap } from './utils';
import { Container, Cnv, Select, Input } from './styles';

const Canvas = ({ state, analyser, getByteFrequencyData }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [type, setType] = useState(BAR_1);
  const data = useMotionValue(INIT_DATA);
  const updateData = useCallback((updatedData) => data.set({ ...data.get(), ...updatedData }), [data]);

  const renderCanvas = useCallback(
    (values) => {
      if (!(ctx && canvasRef.current)) return;

      canvasRef.current.height = values.height;
      canvasRef.current.width = values.width;

      if (typeof renderMap[type] === 'function') renderMap[type](ctx, values);
    },
    [ctx, type]
  );
  useMotionValueEvent(data, 'change', renderCanvas);

  const startAnimation = useCallback(() => {
    frameRef.current = requestAnimationFrame(startAnimation);
    updateData({ dataArray: getByteFrequencyData() });
  }, [getByteFrequencyData, updateData]);

  const stopAnimation = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
  }, []);

  const onSelect = useCallback(({ currentTarget }) => setType(currentTarget.value), []);
  const onChange = useCallback(
    ({ currentTarget }) => {
      if (analyser) analyser.smoothingTimeConstant = currentTarget.value; // eslint-disable-line no-param-reassign
    },
    [analyser]
  );

  const clearCanvas = useCallback(() => {
    if (ctx) {
      const { width, height } = data.get();

      ctx.clearRect(0, 0, width, height);
    }
  }, [ctx, data]);

  useEffect(() => {
    if (canvasRef.current) setCtx(canvasRef.current.getContext('2d'));

    return stopAnimation;
  }, [stopAnimation]);

  useEffect(() => {
    const elem = containerRef.current;

    if (!(canvasRef.current && elem)) return () => null;

    let animationFrame;
    const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
      animationFrame = requestAnimationFrame(() => {
        updateData({ width: contentRect.width, height: contentRect.height });
      });
    });

    resizeObserver.observe(elem);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.unobserve(elem);
    };
  }, [updateData]);

  useEffect(() => {
    state.playing ? startAnimation() : stopAnimation();

    return stopAnimation;
  }, [state.playing, startAnimation, stopAnimation]);

  useEffect(() => {
    if (state.stopped) clearCanvas();
  }, [state.stopped, clearCanvas]);

  return (
    <Container ref={containerRef}>
      <Cnv ref={canvasRef} width="0" height="0" />
      <Select value={type} onChange={onSelect} title="Type">
        {OPTIONS.map(({ id, name }) => (
          <option key={id} value={id} label={name}>
            {name}
          </option>
        ))}
      </Select>
      {analyser && (
        <Input
          type="range"
          defaultValue={analyser.smoothingTimeConstant}
          onChange={onChange}
          min="0"
          max="0.99"
          step="0.01"
          title="Smoothing Time"
        />
      )}
    </Container>
  );
};

Canvas.defaultProps = { analyser: null };
Canvas.propTypes = {
  state: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    stopped: PropTypes.bool.isRequired,
  }).isRequired,
  analyser: PropTypes.shape({
    smoothingTimeConstant: PropTypes.number.isRequired,
  }),
  getByteFrequencyData: PropTypes.func.isRequired,
};

export default Canvas;
