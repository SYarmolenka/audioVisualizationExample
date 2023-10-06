import { BAR_1, BAR_2, VOLUME_1, LINE_1 } from './consts';

export const renderMap = {
  [BAR_1]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const gap = width / 1000;
    const barWidth = (width - gap * length + gap) / length;

    ctx.clearRect(0, 0, width, height);

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      ctx.fillStyle = `hsl(${255 - val}, 100%, 50%)`;
      ctx.fillRect(barWidth * i + gap * i, height - barHeight, barWidth, barHeight);
    });
  },
  [BAR_2]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const gap = width / 200;
    const barWidth = (width - gap * length + gap) / length;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#555';

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      ctx.fillRect(barWidth * i + gap * i, height - barHeight, barWidth, barHeight);
    });
  },
  [VOLUME_1]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const x = width / length;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = '#f00';

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      i === 0 ? ctx.moveTo(0, height - barHeight) : ctx.lineTo(x * i, height - barHeight);
    });

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  },
  [LINE_1]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const x = width / length;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#00f';
    ctx.lineWidth = 2;

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      i === 0 ? ctx.moveTo(0, height - barHeight) : ctx.lineTo(x * i, height - barHeight);
    });

    ctx.stroke();
  },
};
