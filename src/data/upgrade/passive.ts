import { UpgradeProps } from '../../domain/Upgrade';

const PASSIVES: UpgradeProps[] = [
  {
    target: 'ATTACK_POWER',
    label: 'Attack Power',
    amount: 10,
    resourceNeeded: 30,
  },
  {
    target: 'HEALTH',
    label: 'Max Health',
    amount: 10,
    resourceNeeded: 30,
  },
  {
    target: 'ATTACK_RANGE',
    label: 'Attack Range',
    amount: 10,
    resourceNeeded: 50,
  },
  {
    target: 'ATTACK_RATE',
    label: 'Attack Rate',
    amount: 10,
    resourceNeeded: 70,
  },
  {
    target: 'KILL_PROBABILITY',
    label: 'Instant Kill',
    amount: 5,
    resourceNeeded: 100,
  },
];

export default PASSIVES;
