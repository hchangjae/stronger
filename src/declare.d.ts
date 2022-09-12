declare module 'tinyfont' {
  let font: {};
  function initFont(
    // @ts-ignore
    font: font,
    ctx: CanvasRenderingContext2D | null
  ): (text: string, x?: number, y?: number, size?: number, color?: string) => void;
  // @ts-ignore
  export = {
    font,
    initFont,
  };
}
