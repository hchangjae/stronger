import ElectricFence from '../../weapon/ElectricFence';
import Cannon from '../../weapon/Cannon';
import PlasmaGun from '../../weapon/PlasmaGun';
import Weapon from '../../weapon/Weapon';
import GooBomb from '../../weapon/GooBomb';

export type WeaponUpgradeType = {
  label: string;
  weaponClass: new () => Weapon;
  targets: string[];
  resourceNeeded: number;
  unlockWave: number;
};

const WEAPONS: WeaponUpgradeType[] = [
  {
    label: 'Cannon',
    weaponClass: Cannon,
    targets: ['land'],
    resourceNeeded: 40,
    unlockWave: 2,
  },
  {
    label: 'Electric Fence',
    weaponClass: ElectricFence,
    targets: ['land'],
    resourceNeeded: 40,
    unlockWave: 3,
  },
  {
    label: 'Goo Bomb',
    weaponClass: GooBomb,
    targets: ['land'],
    resourceNeeded: 50,
    unlockWave: 4,
  },
  {
    label: 'Plasma Gun',
    weaponClass: PlasmaGun,
    targets: ['air', 'land'],
    resourceNeeded: 70,
    unlockWave: 1,
  },
];

export default WEAPONS;
