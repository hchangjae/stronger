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
  button.onclick = () => {
    onClick();
  };
  return button;
};

const appendButton = ($target: Element | null, $button: HTMLButtonElement) => {
  $target?.appendChild($button);
};

const $upgradeWeapon = $('.upgrades .weapons');
export const appendUpgradeWeapon = (upgrade: Upgrade) => {
  console.log(upgrade);
  appendButton(
    $upgradeWeapon,
    createButton(upgrade.getTarget(), 'weapon', () => {
      upgrade.activate();
    })
  );
};
