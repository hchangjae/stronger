import { angleToTarget, collides, GameObject, GameObjectClass } from 'kontra';
import Bullet from '../domain/Bullet';
import Corp from '../domain/Corp';
import Ground from '../domain/Ground';
import User from '../domain/User';
import Soul from '../effect/soul';
import { GROUND_POSITION, TOWER_POSITION } from '../main';
import Enemy, { isAir } from '../unit/Enemy';
import { $ } from '../util';
import GameWave, { waveRecipes } from '../wave/Wave';
import Info from './Info';

let getDistanceFromTower = (enemy: Enemy) => enemy.Sprite.x - TOWER_POSITION;

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
    $('.ups')?.classList.remove('hide');
    $('.cr-ups')?.classList.remove('hide');
    $('.cr-ws')?.classList.remove('hide');
    this.running = true;
  }

  end() {
    $('.info')?.classList.add('hide');
    $('.ups')?.classList.add('hide');
    $('.cr-ups')?.classList.add('hide');
    $('.cr-ws')?.classList.add('hide');
    let $pa = $('.pa-con .pa');
    while ($pa?.firstChild) {
      $pa.removeChild($pa.firstChild);
    }
    let $ws = $('.ws-con .ws');
    while ($ws?.firstChild) [$ws.removeChild($ws.firstChild)];
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
    let wave = this.info.getWave();
    wave.update(dt);
    if (this.corp.isDestroyed() && wave.isWaveDone()) {
      wave.next();
      this.info.updateWave();
      this.info.updateGeneration();
    }
    if (wave.isReadyToSummon()) {
      this.corp.buildUp(wave);
    }

    let ws = this.user.getWeapons();
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

        ws.forEach((w) => {
          if (this.user.calculateIsInRange(w, getDistanceFromTower(enemy))) {
            if (this.user.calculateCanFire(w) && enemy.isAlive()) {
              let bullet = w.fire(enemy) as Bullet;
              this.user.coolDownFire();
              if (bullet) w.reload(bullet);
            }
          }
        });
      });

    this.corp.update(dt);

    let createSouls = (enemy: Enemy) => {
      let soulList = new Array(enemy.getSoulPoint()).fill('').map(
        () =>
          new Soul({
            x: enemy.Sprite.x,
            y: enemy.Sprite.y,
          })
      );

      this.effect.push(...soulList);
    };

    ws.forEach((weapon) => {
      let bulletList = weapon.getBullets();

      bulletList.forEach((bullet) => {
        if (bullet.followEnemy) {
          let enemy = bullet.targetEnemy as Enemy;
          let eSprite = enemy.Sprite;
          let targetCenter = {
            x: eSprite.x + eSprite.width / 2,
            y: eSprite.y + eSprite.height / 2,
          };
          let distance = Math.sqrt(Math.pow(targetCenter.x - bullet.x, 2) + Math.pow(targetCenter.y - bullet.y, 2));
          bullet.x += ((targetCenter.x - bullet.x) / distance) * bullet.sp;
          bullet.y += ((targetCenter.y - bullet.y) / distance) * bullet.sp;

          bullet.rotation = angleToTarget({ x: bullet.x, y: bullet.y }, targetCenter);

          if (collides(bullet, eSprite)) {
            let power = this.user.calculateBulletDamage(bullet.aP);
            if (bullet.slowPower) {
              let slowPower = 1 - (1 - bullet.slowPower) * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.sR);
              enemy.setSpeed(slowPower);
            }
            let isDead = enemy.hit(power);
            if (isDead) {
              createSouls(enemy);
            }
            bullet.ttl = 0;
            weapon.setBullets(bulletList.filter((b) => b.isAlive()));

            if (bullet.onDestroy) bullet.onDestroy();
          }
        } else {
          if (bullet.y > GROUND_POSITION) {
            this.corp.getAliveEnemies().forEach((enemy) => {
              if (bullet.sR !== 0) {
                if (Math.abs(bullet.x - enemy.Sprite.x) < bullet.sR && !isAir(enemy.getName())) {
                  let power = bullet.aP * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.sR);

                  let isDead = enemy.hit(this.user.calculateBulletDamage(power));
                  if (isDead) {
                    createSouls(enemy);
                  }
                }
              } else if (collides(bullet, enemy.Sprite)) {
                let isDead = enemy.hit(this.user.calculateBulletDamage(bullet.aP));
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
