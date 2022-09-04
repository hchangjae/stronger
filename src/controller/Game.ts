import { angleToTarget, collides, GameObjectClass } from 'kontra';
import Bullet from '../domain/Bullet';
import User from '../domain/User';
import { TOWER_POSITION } from '../main';
import Enemy from '../unit/enemy';
import GameWave, { waveRecipes } from '../wave/Wave';

const getDistanceFromTower = (enemy: Enemy) => enemy.Sprite.x - TOWER_POSITION;

class Game extends GameObjectClass {
  protected user: User;
  protected wave: GameWave;
  protected enemies: Enemy[];
  protected canvas: HTMLCanvasElement;

  constructor(user: User, canvas: HTMLCanvasElement) {
    super();
    this.user = user;
    this.wave = new GameWave(waveRecipes);
    this.enemies = [];
    this.canvas = canvas;
  }

  getUser() {
    return this.user;
  }

  render() {
    this.user.render();
    this.enemies.forEach(enemy => enemy.render());
  }

  update(dt: number): void {
    if (this.enemies.length === 0 && this.wave.isWaveDone()) {
      this.wave.next();
    }
    if (this.wave.isReadyToSummon()) {
      const summon = this.wave.summon();
      this.enemies.push(
        new Enemy({
          name: summon?.type,
          x: this.canvas.width - 1,
          y: 160 + Math.round(Math.random() * 10),
        })
      );
    }
    
    const weapons = this.user.getWeapons();
    weapons.forEach(w => w.update(dt));

    this.enemies = this.enemies.filter((e) => !e.isDone());
    this.enemies.forEach((enemy) => {
      if (enemy.Sprite.x < TOWER_POSITION) {
        enemy.stop();
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
          Math.pow(eSprite.x - bullet.x, 2) +
            Math.pow(eSprite.y - bullet.y, 2)
        );
        bullet.x += ((eSprite.x - bullet.x) / distance) * bullet.speed;
        bullet.y += ((eSprite.y - bullet.y) / distance) * bullet.speed;

        bullet.rotation = angleToTarget(
          { x: bullet.x, y: bullet.y },
          eSprite
        );

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
