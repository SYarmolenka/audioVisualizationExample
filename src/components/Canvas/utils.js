import { BAR_1, BAR_2, VOLUME_1, LINE_1 } from './consts';

export const renderMap = {
  [BAR_1]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const gap = width / 1000;
    const barWidth = (width - gap * length + gap) / length;

    ctx.clearRect(0, 0, width, height);

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      ctx.fillStyle = `rgb(${(i * barHeight) / 10}, ${i * 4}, ${barHeight / 4 - 12})`;
      ctx.fillRect(barWidth * i + gap * i, height - barHeight, barWidth, barHeight);
    });
  },
  [BAR_2]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const gap = width / 50;
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
    const x = width / length + 1;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = '#f00';

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      i === 0 ? ctx.moveTo(x * i + 1, height - barHeight) : ctx.lineTo(x * i + 1, height - barHeight);
    });

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  },
  [LINE_1]: (ctx, { width, height, dataArray }) => {
    const { length } = dataArray;
    const x = width / length + 1;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#00f';

    dataArray.forEach((val, i) => {
      const barHeight = (height / 255) * val;

      i === 0 ? ctx.moveTo(x * i + 1, height - barHeight) : ctx.lineTo(x * i + 1, height - barHeight);
    });

    ctx.stroke();
  },
};
