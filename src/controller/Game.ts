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
let ES = ['info', 'ups', 'cr-ups', 'cr-ws'];
let rE = ($e: Element | null) => {
  while ($e?.firstChild) {
    $e.removeChild($e.firstChild);
  }
};

class Game extends GameObjectClass {
  user: User;
  info: Info;
  corp: Corp;
  ground: Ground;
  effect: GameObject[];
  canvas: HTMLCanvasElement;
  running: boolean;

  constructor(user: User, canvas: HTMLCanvasElement) {
    super();
    this.user = user;
    this.info = new Info({
      wave: new GameWave(waveRecipes),
      generation: user.generation,
    });
    this.corp = new Corp(canvas);
    this.ground = new Ground();
    this.effect = [];
    this.canvas = canvas;
    this.running = false;
  }

  start() {
    ES.forEach((n) => $(`.${n}`)?.classList.remove('hide'));
    this.running = true;
  }

  end() {
    ES.forEach((n) => $(`.${n}`)?.classList.add('hide'));
    rE($('.pa-con .pa'));
    rE($('.ws-con .ws'));
    this.running = false;
  }

  render() {
    this.ground.render();
    this.user.render();
    this.corp.render();
    this.effect.forEach((e) => e.render());
  }

  update(dt: number): void {
    let corp = this.corp;
    let info = this.info;
    let wave = info.wave;
    let user = this.user;
    let effect = this.effect;

    wave.update(dt);
    if (corp.isDestroyed() && wave.isWaveDone()) {
      wave.next();
      info.update();
    }
    if (wave.isReadyToSummon()) {
      corp.buildUp(wave);
    }

    let ws = user.ws;
    user.update(dt);

    corp
      .getAliveEnemies()
      .sort((a, b) => a.Sprite.x - b.Sprite.x)
      .forEach((enemy) => {
        if (enemy.Sprite.x < TOWER_POSITION) {
          enemy.stop();
          if (enemy.isReadyToAttack()) {
            this.user.setLife(-1 * enemy.aP);
            enemy.cooldownAttack();
          }
        }

        ws.forEach((w) => {
          if (user.calculateIsInRange(w, getDistanceFromTower(enemy))) {
            if (user.calculateCanFire(w) && enemy.isAlive()) {
              let bullet = w.fire(enemy) as Bullet;
              user.coolDownFire();
              if (bullet) w.reload(bullet);
            }
          }
        });
      });

    corp.update(dt);

    let createSouls = (enemy: Enemy) => {
      let soulList = new Array(enemy.sP).fill('').map(
        () =>
          new Soul({
            x: enemy.Sprite.x,
            y: enemy.Sprite.y,
          })
      );

      effect.push(...soulList);
    };

    ws.forEach((weapon) => {
      let bulletList = weapon.bullets;

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
            let power = user.calculateBulletDamage(bullet.aP);
            if (bullet.slowPower) {
              let slowPower = 1 - (1 - bullet.slowPower) * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.sR);
              enemy.setSpeed(slowPower);
            }
            let isDead = enemy.hit(power);
            if (isDead) {
              createSouls(enemy);
            }
            bullet.ttl = 0;
            weapon.bullets = bulletList.filter((b) => b.isAlive());

            if (bullet.onDestroy) bullet.onDestroy();
          }
        } else {
          if (bullet.y > GROUND_POSITION) {
            corp.getAliveEnemies().forEach((enemy) => {
              if (bullet.sR !== 0) {
                if (Math.abs(bullet.x - enemy.Sprite.x) < bullet.sR && !isAir(enemy.name)) {
                  let power = bullet.aP * (1 - Math.abs(bullet.x - enemy.Sprite.x) / bullet.sR);

                  let isDead = enemy.hit(user.calculateBulletDamage(power));
                  if (isDead) {
                    createSouls(enemy);
                  }
                }
              } else if (collides(bullet, enemy.Sprite)) {
                let isDead = enemy.hit(user.calculateBulletDamage(bullet.aP));
                if (isDead) {
                  createSouls(enemy);
                }
              }
            });

            bullet.ttl = 0;
            weapon.bullets = bulletList.filter((b) => b.isAlive());

            if (bullet.onDestroy) bullet.onDestroy();
          } else {
            if (bullet.onFly) bullet.onFly();
          }
        }

        bullet.update(dt);
      });
    });

    effect.forEach((e) => e.update());
    this.effect = effect.filter((e) => {
      if (e.isDone()) {
        user.setResource(1);
        return false;
      }
      return true;
    });
  }
}

export default Game;
