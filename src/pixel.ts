import tinyfont from 'tinyfont';

const { initFont, font } = tinyfont;

type Ctx = CanvasRenderingContext2D | null;

const pixelText = (ctx: Ctx, defaultValue = '', template?: (value: string) => string) => {
  let value = defaultValue;
  const render = initFont(font, ctx);
  const template_ = template || ((value) => value);

  return {
    render() {
      render(template_(value), 0, 0, 24, '#fff');
    },
    update(newValue?: string) {
      if (newValue) value = newValue;
      this.render();
    },
    getText() {
      return value;
    }
  }
}

export default pixelText;
