import Weapon from './Weapon';

export default class PlasmaGun extends Weapon {
  constructor() {
    super({
      name: 'plasma-gun',
      targets: ['air', 'land'],
      attackPower: 3,
      attackRange: 10,
      splashRadius: 0,
      fireCooltime: 500,
    });
  }

  fire(enemy: any) {
    if (super.fire(enemy)) {
      // 총알 생성

      return true;
    }

    return false;
  }
}
