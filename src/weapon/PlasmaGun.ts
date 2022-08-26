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

  fire() {
    super.fire();
  }
}
