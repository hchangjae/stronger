import { angleToTarget, collides, GameObject, GameObjectClass } from 'kontra';
import Bullet from '../domain/Bullet';
import Corp from '../domain/Corp';
import Ground from '../domain/Ground';
import User from '../domain/User';
import Soul from '../effect/soul';
import { particles, TOWER_POSITION } from '../main';
import Enemy from '../unit/enemy';
import { $ } from '../util';
import GameWave, { waveRecipes } from '../wave/Wave';
import Info from './Info';

const getDistanceFromTower = (enemy: Enemy) => enemy.Sprite.x - TOWER_POSITION;

class Game extends GameObjectClass {
  protected user: User;
  protected info: Info;
  protected corp: Corp;
  protected ground: Ground;
  protected effect: GameObject[];
  protected canvas: HTMLCanvasElement;

  constructor(user: User, canvas: HTMLCanvasElement) {
    super();
    this.user = user;
    this.info = new Info({
      wave: new GameWave(waveRecipes),
      generation: 1,
    });
    this.corp = new Corp(canvas);
    this.ground = new Ground();
    this.effect = [];
    this.canvas = canvas;
  }

  start() {
    $('.info')?.classList.remove('hide');
    $('.upgrades')?.classList.remove('hide');
  }

  end() {
    $('.info')?.classList.add('hide');
    $('.upgrades')?.classList.add('hide');
    const $passives = $('.passives-container .passives');
    while ($passives?.firstChild) {
      $passives.removeChild($passives.firstChild);
    }
    const $weapons = $('.weapons-container .weapons');
    while ($weapons?.firstChild) [
      $weapons.removeChild($weapons.firstChild)
    ]
  }

  getUser() {
    return this.user;
  }

  render() {
    this.ground.render();
    this.user.render();
    this.corp.render();
    this.effect.forEach((e) => e.render());
  }

  update(dt: number): void {
    const wave = this.info.getWave();
    wave.update(dt);
    if (this.corp.isDestroyed() && wave.isWaveDone()) {
      wave.next();
      this.info.updateWave();
      this.info.updateGeneration();
    }
    if (wave.isReadyToSummon()) {
      this.corp.buildUp(wave);
    }

    const weapons = this.user.getWeapons();
    this.user.update(dt);

    this.corp
      .getAliveEnemies()
      .sort((a, b) => a.Sprite.x - b.Sprite.x)
      .forEach((enemy) => {
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
      });

    this.corp.update();

    const createSouls = (enemy: Enemy) => {
      const soulList = new Array(enemy.getSoulPoint()).fill('').map(
        () =>
          new Soul({
            x: enemy.Sprite.x,
            y: enemy.Sprite.y,
          })
      );

      this.effect.push(...soulList);
    };

    weapons.forEach((weapon) => {
      const bulletList = weapon.getBullets();
      bulletList.forEach((bullet) => {
        if (bullet.followEnemy) {
          const enemy = bullet.targetEnemy as Enemy;
          const eSprite = enemy.Sprite;
          const targetCenter = {
            x: eSprite.x + eSprite.width / 2,
            y: eSprite.y + eSprite.height / 2,
          };
          const distance = Math.sqrt(Math.pow(targetCenter.x - bullet.x, 2) + Math.pow(targetCenter.y - bullet.y, 2));
          bullet.x += ((targetCenter.x - bullet.x) / distance) * bullet.speed;
          bullet.y += ((targetCenter.y - bullet.y) / distance) * bullet.speed;

          bullet.rotation = angleToTarget({ x: bullet.x, y: bullet.y }, targetCenter);

          if (collides(bullet, eSprite)) {
            const isDead = enemy.hit(bullet.attackPower);
            if (isDead) {
              createSouls(enemy);
            }
            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));
          }
        } else {
          if (bullet.y > 220) {
            this.corp.getAliveEnemies().forEach((enemy) => {
              if (Math.abs(bullet.x - enemy.Sprite.x) < bullet.splashRadius) {
                const power = bullet.attackPower * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.splashRadius);

                const isDead = enemy.hit(power);
                if (isDead) {
                  createSouls(enemy);
                }
              }
            });

            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));
          } else {
            for (let i = 1; i < 2; i++) {
              particles.get({
                x: bullet.x + bullet.width / 2,
                y: bullet.y + bullet.height / 2,
                width: 6,
                height: 6,
                color: '#666',
                ttl: 20,
                opacity: 1,
                rotation: Math.random() * 2 * Math.PI,
              });
            }
          }
        }

        bullet.update(dt);
      });
    });

    this.effect.forEach((e) => e.update());
    this.effect = this.effect.filter((e) => {
      if (e.isDone()) {
        this.user.setResource(1);
        return false;
      }
      return true;
    });
  }
}

export default Game;
