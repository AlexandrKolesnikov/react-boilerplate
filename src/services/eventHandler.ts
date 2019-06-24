export const isActionKeys = (e: KeyboardEvent) => (
  [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1
);

export const isCtrlOrMeta = (e: KeyboardEvent) => e.ctrlKey === true || e.metaKey === true;

export const isCtrlOrCmdPlusA = (e: KeyboardEvent) => e.keyCode === 65 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusC = (e: KeyboardEvent) => e.keyCode === 67 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusV = (e: KeyboardEvent) => e.keyCode === 86 && isCtrlOrMeta(e);

export const isCtrlOrCmdPlusX = (e: KeyboardEvent) => e.keyCode === 88 && isCtrlOrMeta(e);

export const isNavigationKeys = (e: KeyboardEvent) => e.keyCode >= 35 && e.keyCode <= 39;

export const isDot = (e: KeyboardEvent) => e.key === '.';
export const isComa = (e: KeyboardEvent) => e.key === ',';

export const isNonDigitKeys = (e: KeyboardEvent) => {
  const { shiftKey, keyCode } = e;

  return (shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105);
};

export const preventNonDigitKeyEvents = (
  e: KeyboardEvent,
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
