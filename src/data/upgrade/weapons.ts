import PlasmaGun from '../../weapon/PlasmaGun';
import Weapon from '../../weapon/Weapon';

export type WeaponUpgradeType = {
  label: string;
  weaponClass: new () => Weapon;
  targets: string[];
  resourceNeeded: number;
};

const WEAPONS: WeaponUpgradeType[] = [
  {
    label: 'Plasma Gun',
    weaponClass: PlasmaGun,
    targets: ['air', 'land'],
    resourceNeeded: 100,
  },
  {
    label: 'Cannon',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
  },
  {
    label: 'Cannon',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
  },
  {
    label: 'Cannon',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
  },
  {
    label: 'Cannon',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
  },
  {
    label: 'Cannon',
    weaponClass: PlasmaGun,
    targets: ['land'],
    resourceNeeded: 100,
  },
];

export default WEAPONS;
