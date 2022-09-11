import tinyfont from 'tinyfont';

const { initFont, font } = tinyfont;

type Option = {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
};

const pixelText = (
  canvas: HTMLCanvasElement,
  defaultValue = '',
  template?: (value: string) => string,
  option?: Option
) => {
  let value = defaultValue;
  const ctx = canvas.getContext('2d');
  const render = initFont(font, ctx);
  const template_ = template || ((value) => value);
  const { x: _ = 0, y = 0, size = 16, color = '#fff' } = option || {};

  return {
    render() {
      const textWidth = ctx?.measureText(value).width || 0;
      render(template_(value), canvas.width / 2 - textWidth / 2, y, size, color);
    },
    update(newValue?: string) {
      if (newValue) value = newValue;
      this.render();
    },
    getText() {
      return value;
    },
  };
};

export default pixelText;
