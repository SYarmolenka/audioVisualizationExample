/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useCallback } from 'react';

import { useAudioVisualization, useResizeObserver } from './hooks';
import { ReactComponent as Icon } from './icon.svg';
import { Container, CanvasWrap, PlayerWrap, Title, InputWrap } from './styles';

const Root = () => {
  const [src, setSrc] = useState(null);
  const [fileName, setFileName] = useState('');

  const onChange = useCallback(({ currentTarget }) => {
    const file = currentTarget.files[0];
    const { name = '', size = 0, type = '' } = file || {};

    if (type && type.includes('audio/') && size > 0) {
      setSrc(($) => {
        if ($) URL.revokeObjectURL($);

        return URL.createObjectURL(file);
      });
      setFileName(name || 'Anonymous');
    }
  }, []);
  const { audioRef, canvasRef, rectRef, onPlay, onPause, onEnded } = useAudioVisualization();
  const wrapperRef = useResizeObserver(rectRef);

  return (
    <Container>
      <CanvasWrap ref={wrapperRef}>
        <canvas ref={canvasRef} width="0" height="0" />
      </CanvasWrap>
      <PlayerWrap>
        <Title>{fileName}</Title>
        <audio ref={audioRef} src={src} controls onPlay={onPlay} onPause={onPause} onEnded={onEnded} />
        <InputWrap>
          <Icon />
          <input type="file" onChange={onChange} accept="audio/*" multiple={false} />
        </InputWrap>
      </PlayerWrap>
    </Container>
  );
};

export default Root;
