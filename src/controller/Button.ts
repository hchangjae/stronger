import { $ } from '../util';
import { WeaponUpgradeType } from '../data/upgrade/weapons';

export const createButton = (text: string, className: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.classList.add(className);
  button.addEventListener('click', onClick);
  return button;
};

const appendButton = ($target: Element | null, $button: HTMLButtonElement) => {
  $target?.appendChild($button);
};

const $upgradeWeapon = $('.upgrades .weapons');
const createWeaponButton = (upgrade: WeaponUpgradeType, onClick: () => void) =>
  createButton(
    `<div>${upgrade.label} <span class="resource">👻 ${upgrade.resourceNeeded}</span></div>`,
    'button',
    onClick
  );

export const appendUpgradeWeapon = (upgrade: WeaponUpgradeType, onClick: () => void) => {
  appendButton($upgradeWeapon, createWeaponButton(upgrade, onClick));
};
