import { UpgradeProps } from '../../domain/Upgrade';

const PASSIVES: UpgradeProps[] = [
  {
    isPassive: true,
    target: 'ATTACK_POWER',
    amount: 10,
  },
  {
    isPassive: true,
    target: 'HEALTH',
    amount: 10,
  },
  {
    isPassive: true,
    target: 'ATTACK_RANGE',
    amount: 10,
  },
  {
    isPassive: true,
    target: 'ATTACK_RATE',
    amount: 10,
  },
  {
    isPassive: true,
    target: 'KILL_PROBABILITY',
    amount: 5,
  },
];

export default PASSIVES;