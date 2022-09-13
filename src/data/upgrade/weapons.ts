import ElectricFence from '../../weapon/ElectricFence';
import Cannon from '../../weapon/Cannon';
import PlasmaGun from '../../weapon/PlasmaGun';
import Weapon from '../../weapon/Weapon';
import GooBomb from '../../weapon/GooBomb';

export type WeaponUpgradeType = {
  label: string;
  weaponClass: new () => Weapon;
  rN: number;
};

let WEAPONS: WeaponUpgradeType[] = [
  {
    label: 'Cannon',
    weaponClass: Cannon,
    rN: 40,
  },
  {
    label: 'Electric Fence',
    weaponClass: ElectricFence,
    rN: 40,
  },
  {
    label: 'Goo Bomb',
    weaponClass: GooBomb,
    rN: 50,
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
