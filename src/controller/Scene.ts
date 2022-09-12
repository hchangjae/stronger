import { GameObject, Scene } from 'kontra';

let scene = (current?: Scene | GameObject) => {
  let current_ = current;
  return {
    update(dt?: number) {
      current_?.update(dt);
    },
    render() {
      current_?.render();
    },
    set(newScene: Scene | GameObject) {
      if (current_ && current_.hide) current_.hide();
      current_ = newScene;
      if (newScene.show) newScene.show();
    },
  };
};

export default scene;
