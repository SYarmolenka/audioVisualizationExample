import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Icon } from 'assets/svg/uploadFile.svg';

import { Container, Title, InputWrap } from './styles';

const Player = forwardRef(({ onPlay, onPause, onEnded }, ref) => {
  const [src, setSrc] = useState(null);
  const [fileName, setFileName] = useState('');

  const onChange = useCallback(({ currentTarget }) => {
    const [file] = currentTarget.files;
    const { name = '', size = 0, type = '' } = file || {};

    if (type && type.includes('audio/') && size > 0) {
      setSrc(($) => {
        if ($) URL.revokeObjectURL($);

        return URL.createObjectURL(file);
      });
      setFileName(name || 'Anonymous');
    }
  }, []);

  return (
    <Container>
      <Title>{fileName}</Title>
      <audio ref={ref} src={src} onPlay={onPlay} onPause={onPause} onEnded={onEnded} controls />
      <InputWrap>
        <Icon />
        <input type="file" onChange={onChange} accept="audio/*" multiple={false} />
      </InputWrap>
    </Container>
  );
});

Player.defaultProps = {
  onPlay: undefined,
  onPause: undefined,
  onEnded: undefined,
};
Player.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func,
};

export default Player;
