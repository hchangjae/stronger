import { angleToTarget, collides, GameObject, GameObjectClass } from 'kontra';
import Bullet from '../domain/Bullet';
import Corp from '../domain/Corp';
import Ground from '../domain/Ground';
import User from '../domain/User';
import Soul from '../effect/soul';
import { GROUND_POSITION, TOWER_POSITION } from '../main';
import Enemy, { isAir } from '../unit/enemy';
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

  private running: boolean;

  constructor(user: User, canvas: HTMLCanvasElement) {
    super();
    this.user = user;
    this.info = new Info({
      wave: new GameWave(waveRecipes),
      generation: user.getGeneration(),
    });
    this.corp = new Corp(canvas);
    this.ground = new Ground();
    this.effect = [];
    this.canvas = canvas;
    this.running = false;
  }

  start() {
    $('.info')?.classList.remove('hide');
    $('.upgrades')?.classList.remove('hide');
    $('.current-upgrades')?.classList.remove('hide');
    this.running = true;
  }

  end() {
    $('.info')?.classList.add('hide');
    $('.upgrades')?.classList.add('hide');
    $('.current-upgrades')?.classList.add('hide');
    const $passives = $('.passives-container .passives');
    while ($passives?.firstChild) {
      $passives.removeChild($passives.firstChild);
    }
    const $weapons = $('.weapons-container .weapons');
    while ($weapons?.firstChild) [$weapons.removeChild($weapons.firstChild)];
    this.running = false;
  }

  isRunning() {
    return this.running;
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
          if (enemy.isReadyToAttack()) {
            this.user.setLife(-1 * enemy.getAttackPower());
            enemy.cooldownAttack();
          }
        }

        weapons.forEach((w) => {
          if (this.user.calculateIsInRange(w, getDistanceFromTower(enemy))) {
            if (this.user.calculateCanFire(w) && enemy.isAlive()) {
              const bullet = w.fire(enemy) as Bullet;
              this.user.coolDownFire()
              if (bullet) w.reload(bullet);
            }
          }
        });
      });

    this.corp.update(dt);

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
            const power = this.user.calculateBulletDamage(bullet.attackPower);
            const isDead = enemy.hit(power);
            if (isDead) {
              createSouls(enemy);
            }
            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));
          }
        } else {
          if (bullet.y > GROUND_POSITION) {
            this.corp.getAliveEnemies().forEach((enemy) => {
              if (bullet.splashRadius !== 0) {
                if (Math.abs(bullet.x - enemy.Sprite.x) < bullet.splashRadius && !isAir(enemy.getName())) {
                  const power = bullet.attackPower * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.splashRadius);

                  const isDead = enemy.hit(this.user.calculateBulletDamage(power));
                  if (isDead) {
                    createSouls(enemy);
                  }
                }
              } else if (collides(bullet, enemy.Sprite)) {
                const isDead = enemy.hit(this.user.calculateBulletDamage(bullet.attackPower));
                if (isDead) {
                  createSouls(enemy);
                }
              }
            });

            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));

            if (bullet.onDestroy) bullet.onDestroy();
          } else {
            if (bullet.onFly) bullet.onFly();
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
