import ElectricFence from '../../weapon/ElectricFence';
import Cannon from '../../weapon/Cannon';
import PlasmaGun from '../../weapon/PlasmaGun';
import Weapon from '../../weapon/Weapon';
import GooBomb from '../../weapon/GooBomb';

export type WeaponUpgradeType = {
  label: string;
  weaponClass: new () => Weapon;
  targets: string[];
  rN: number;
  unlockWave: number;
};

let WEAPONS: WeaponUpgradeType[] = [
  {
    label: 'Cannon',
    weaponClass: Cannon,
    targets: ['land'],
    rN: 40,
    unlockWave: 2,
  },
  {
    label: 'Electric Fence',
    weaponClass: ElectricFence,
    targets: ['land'],
    rN: 40,
    unlockWave: 3,
  },
  {
    label: 'Goo Bomb',
    weaponClass: GooBomb,
    targets: ['land'],
    rN: 50,
    unlockWave: 4,
  },
  {
    label: 'Plasma Gun',
    weaponClass: PlasmaGun,
    targets: ['air', 'land'],
    rN: 70,
    unlockWave: 1,
  },
];

export default WEAPONS;
