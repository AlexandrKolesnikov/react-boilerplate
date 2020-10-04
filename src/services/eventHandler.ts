export const isActionKeys = (e: React.KeyboardEvent) => (
  [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1
);

export const isCtrlOrMeta = (e: React.KeyboardEvent) => e.ctrlKey === true || e.metaKey === true;

export const isCtrlOrCmdPlusA = (e: React.KeyboardEvent) => e.keyCode === 65 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusC = (e: React.KeyboardEvent) => e.keyCode === 67 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusV = (e: React.KeyboardEvent) => e.keyCode === 86 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusX = (e: React.KeyboardEvent) => e.keyCode === 88 && isCtrlOrMeta(e);

export const isNavigationKeys = (e: React.KeyboardEvent) => e.keyCode >= 35 && e.keyCode <= 39;

export const isDot = (e: React.KeyboardEvent) => e.key === '.';
export const isComa = (e: React.KeyboardEvent) => e.key === ',';

export const isNonDigitKeys = (e: React.KeyboardEvent) => {
  const { shiftKey, keyCode } = e;

  return (shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105);
};

export const preventNonDigitKeyEvents = (
  e: React.KeyboardEvent,
  allowControlKeys = true,
  allowDot = true,
  allowComa = true,
) => {
  let allowedKey = false;

  if (allowDot && isDot(e)) {
    allowedKey = true;
  }

  if (allowComa && isComa(e)) {
    allowedKey = true;
  }

  if (allowControlKeys) {
    if (
      isActionKeys(e)
      || isCtrlOrCmdPlusA(e)
      || isCtrlOrCmdPlusC(e)
      || isCtrlOrCmdPlusV(e)
      || isCtrlOrCmdPlusX(e)
      || isNavigationKeys(e)
    ) {
      allowedKey = true;
    }
  }

  if (isNonDigitKeys(e) && !allowedKey) {
    e.preventDefault();

    return true;
  }

  return false;
};
