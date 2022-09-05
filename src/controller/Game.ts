import { angleToTarget, collides, GameObjectClass } from 'kontra';
import Bullet from '../domain/Bullet';
import Corp from '../domain/Corp';
import User from '../domain/User';
import { TOWER_POSITION } from '../main';
import Enemy from '../unit/enemy';
import GameWave, { waveRecipes } from '../wave/Wave';
import Info from './Info';

const getDistanceFromTower = (enemy: Enemy) => enemy.Sprite.x - TOWER_POSITION;

class Game extends GameObjectClass {
  protected user: User;
  protected info: Info;
  protected corp: Corp;
  protected canvas: HTMLCanvasElement;

  constructor(user: User, canvas: HTMLCanvasElement) {
    super();
    this.user = user;
    this.info = new Info({
      wave: new GameWave(waveRecipes),
      generation: 1,
    });
    this.corp = new Corp(canvas);
    this.canvas = canvas;
  }

  getUser() {
    return this.user;
  }

  render() {
    this.user.render();
    this.corp.render();
  }

  update(dt: number): void {
    const wave = this.info.getWave();
    if (this.corp.isDestroyed() && wave.isWaveDone()) {
      wave.next();
      this.info.updateWave();
    }
    if (wave.isReadyToSummon()) {
      this.corp.buildUp(wave);
    }

    const weapons = this.user.getWeapons();
    this.user.update(dt);

    this.corp.getAliveEnemies().forEach((enemy) => {
      if (enemy.Sprite.x < TOWER_POSITION) {
        enemy.stop();
        this.user.setLife(-1 * enemy.getAttackPower());
      }
      weapons.forEach((w) => {
        if (w.isInRange(getDistanceFromTower(enemy))) {
          if (w.canFire() && enemy.isAlive()) {
            const bullet = w.fire(enemy) as Bullet;
            if (bullet) w.reload(bullet);
          }
        }
      });
      enemy.update();
    });
    
    weapons.forEach((weapon) => {
      const bulletList = weapon.getBullets();
      bulletList.forEach((bullet) => {
        const enemy = bullet.targetEnemy;
        const eSprite = enemy.Sprite;
        const distance = Math.sqrt(
          Math.pow(eSprite.x - bullet.x, 2) + Math.pow(eSprite.y - bullet.y, 2)
        );
        bullet.x += ((eSprite.x - bullet.x) / distance) * bullet.speed;
        bullet.y += ((eSprite.y - bullet.y) / distance) * bullet.speed;

        bullet.rotation = angleToTarget({ x: bullet.x, y: bullet.y }, eSprite);

        if (collides(bullet, eSprite)) {
          enemy.hit(bullet.attackPower);
          bullet.ttl = 0;
          weapon.setBullets(bulletList.filter((b) => b.isAlive()));
        }

        bullet.update(dt);
      });
    });
  }
}

export default Game;
