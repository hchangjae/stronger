import User from '../domain/User';
import Enemy from '../domain/enemy';
import Weapon from '../weapon/Weapon';

type UserProps = {
  userName: string;
  userImage: string;
  userResource?: number;
  userWeapons?: Weapon[];
  userLife?: number;
};
class Game {
  protected user: User;
  protected wave: number;
  protected enemies: Enemy[];

  constructor({userName, userImage, userResource = 100, userWeapons = [], userLife = 100}: UserProps) {
    this.user = new User({
      name: userName,
      image: userImage,
      resource: userResource,
      weapons: userWeapons,
      life: userLife,
    });
    this.wave = 1;
    this.enemies = [];
  }

  getUser() {
    return this.user;
  }

  passWave() {
    this.setWave();
  }

  getWave() {
    return this.wave;
  }

  setEnemies(enemies: Enemy[]) {
    this.enemies = enemies;
  }

  render() {
    this.user.render();
  }

  private setWave(dw = 1) {
    this.wave += dw;
  }
}

export default Game;
