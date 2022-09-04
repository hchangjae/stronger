import { $ } from '../util';
import Upgrade from '../domain/Upgrade';

export const createButton = (
  text: string,
  className: string,
  onClick: () => void
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener('click', onClick);
  return button;
};

const appendButton = ($target: Element | null, $button: HTMLButtonElement) => {
  $target?.appendChild($button);
};

const $upgradeWeapon = $('.upgrades .weapons');
const createUpgradeButton = (upgrade: Upgrade, onClick: () => void) =>
  createButton(
    `${upgrade.getTarget()} +${upgrade.getAmount()} (👻${upgrade.getResourceNeeded()})`,
    'button',
    onClick
  );
export const appendUpgradeWeapon = (upgrade: Upgrade, onClick: () => void) => {
  appendButton($upgradeWeapon, createUpgradeButton(upgrade, onClick));
};

const $upgradePassive = $('.upgrades .passives');
export const appendUpgradePassive = (upgrade: Upgrade, onClick: () => void) => {
  appendButton($upgradePassive, createUpgradeButton(upgrade, onClick));
};
