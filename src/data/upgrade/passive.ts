import { UpgradeProps } from '../../domain/Upgrade';

let PASSIVES: UpgradeProps[] = [
  {
    target: 'ATTACK_POWER',
    label: 'Attack Power',
    amount: 10,
    rN: 30,
  },
  {
    target: 'HEALTH',
    label: 'Max Health',
    amount: 10,
    rN: 30,
  },
  {
    target: 'ATTACK_RANGE',
    label: 'Attack Range',
    amount: 10,
    rN: 50,
  },
  {
    target: 'ATTACK_RATE',
    label: 'Attack Rate',
    amount: 10,
    rN: 70,
  },
];

export default PASSIVES;
