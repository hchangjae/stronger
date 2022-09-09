import { Button, init, initPointer, Scene, Text } from "kontra";

const TitleScene = (onStart: () => void) => {
  init();
  initPointer();

  const title = Text({
    x: 512,
    y: 128,
    font: '24px Monospace',
    text: 'STRONGER\n\n(What does kill you)',
    textAlign: 'center',
    color: '#fff',
    anchor: {
      x: 0.5,
      y: 0.5,
    }
  })
  
  const start = Button({
    x: 512,
    y: 240,
    text: {
      text: 'START',
      color: '#fff',
      font: '24px Monospace',
      anchor: { x: 0.5, y: 0.5 }
    },
    padx: 20,
    padY: 10,
  
    onDown: onStart,
  
    render() {
      if (this.hovered) {
        this.textNode.color = 'red';
      } else {
        this.textNode.color = '#fff';
      }
    }
  })
  
  const scene = Scene({
    id: 'title',
    objects: [title, start],
  })
  
  
  return scene;
}

export default TitleScene;
