import Cannon from '../../weapon/Cannon';
import PlasmaGun from '../../weapon/PlasmaGun';
import Weapon from '../../weapon/Weapon';

export type WeaponUpgradeType = {
  label: string;
  weaponClass: new () => Weapon;
  targets: string[];
  resourceNeeded: number;
  unlockWave: number;
};

const WEAPONS: WeaponUpgradeType[] = [
  {
    label: 'Plasma Gun',
    weaponClass: PlasmaGun,
    targets: ['air', 'land'],
    resourceNeeded: 100,
    unlockWave: 1,
  },
  {
    label: 'Cannon',
    weaponClass: Cannon,
    targets: ['land'],
    resourceNeeded: 100,
    unlockWave: 2,
  },
  {
    label: 'Electric Fence',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
    unlockWave: 3,
  },
  {
    label: 'Goo Missle',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
    unlockWave: 4,
  },
  {
    label: 'Laser Gun',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
    unlockWave: 5,
  },
  {
    label: 'Sniper Gun',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
    unlockWave: 6,
  },
];

export default WEAPONS;
