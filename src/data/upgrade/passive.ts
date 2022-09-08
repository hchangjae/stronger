import { UpgradeProps } from '../../domain/Upgrade';

const PASSIVES: UpgradeProps[] = [
  {
    isPassive: true,
    target: 'ATTACK_POWER',
    label: 'Attack Power',
    amount: 10,
    resourceNeeded: 30,
  },
  {
    isPassive: true,
    target: 'HEALTH',
    label: 'Max Health',
    amount: 10,
    resourceNeeded: 30,
  },
  {
    isPassive: true,
    target: 'ATTACK_RANGE',
    label: 'Attack Range',
    amount: 10,
    resourceNeeded: 50,
  },
  {
    isPassive: true,
    target: 'ATTACK_RATE',
    label: 'Attack Rate',
    amount: 10,
    resourceNeeded: 70,
  },
  {
    isPassive: true,
    target: 'KILL_PROBABILITY',
    label: 'Instant Kill',
    amount: 5,
    resourceNeeded: 100,
  },
];

export default PASSIVES;
