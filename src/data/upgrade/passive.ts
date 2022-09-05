import { UpgradeProps } from '../../domain/Upgrade';

const PASSIVES: UpgradeProps[] = [
  {
    isPassive: true,
    target: 'ATTACK_POWER',
    amount: 10,
    resourceNeeded: 100,
  },
  {
    isPassive: true,
    target: 'HEALTH',
    amount: 10,
    resourceNeeded: 100,
  },
  {
    isPassive: true,
    target: 'ATTACK_RANGE',
    amount: 10,
    resourceNeeded: 100,
  },
  {
    isPassive: true,
    target: 'ATTACK_RATE',
    amount: 0.1,
    resourceNeeded: 100,
  },
  {
    isPassive: true,
    target: 'KILL_PROBABILITY',
    amount: 5,
    resourceNeeded: 100,
  },
];

export default PASSIVES;
