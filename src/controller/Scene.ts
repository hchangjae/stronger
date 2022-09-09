import { GameObject, Scene } from 'kontra';

const scene = (current?: Scene | GameObject) => {
  let current_ = current;
  return {
    update(dt?: number) {
      current_?.update(dt);
    },
    render() {
      current_?.render();
    },
    set(newScene: Scene | GameObject) {
      current_ = newScene;
    },
  };
};

export default scene;
