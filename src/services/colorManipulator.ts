// TODO: Complete types for this file

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value: number, min: number, max: number) : number {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of, 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function convertColorToString(color) {
  const { type, values } = color;

  if (type.indexOf('rgb') > -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    for (let i = 0; i < 3; i += 1) {
      values[i] = parseInt(values[i], 10);
    }
  }

  let colorString;

  if (type.indexOf('hsl') > -1) {
    colorString = `${color.type}(${values[0]}, ${values[1]}%, ${values[2]}%`;
  } else {
    colorString = `${color.type}(${values[0]}, ${values[1]}, ${values[2]}`;
  }

  if (values.length === 4) {
    colorString += `, ${color.values[3]})`;
  } else {
    colorString += ')';
  }

  return colorString;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
export function convertHexToRGB(color: string) : string {
  let newColor = color;

  if (newColor.length === 4) {
    let extendedColor = '#';
    for (let i = 1; i < newColor.length; i += 1) {
      extendedColor += newColor.charAt(i) + newColor.charAt(i);
    }
    newColor = extendedColor;
  }

  const values = {
    r: parseInt(newColor.substr(1, 2), 16),
    g: parseInt(newColor.substr(3, 2), 16),
    b: parseInt(newColor.substr(5, 2), 16),
  };

  return `rgb(${values.r}, ${values.g}, ${values.b})`;
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values and color names.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {{type: string, values: number[]}} A color object
 */
export function decomposeColor(color: string) {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  const marker = color.indexOf('(');

  if (marker === -1) {
    throw new Error(`The ${color} color was not parsed correctly`);
  }

  const type = color.substring(0, marker);
  let values = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map(value => parseFloat(value));

  return { type, values };
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color) {
  let newColor = color;
  newColor = decomposeColor(newColor);

  if (newColor.type.indexOf('rgb') > -1) {
    const rgb = newColor.values.map((val) => {
      let value = val;
      value /= 255; // normalized
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return Number(((0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]))
      .toFixed(3)); // Truncate at 3 digits
  }

  if (newColor.type.indexOf('hsl') > -1) {
    return newColor.values[2] / 100;
  }

  return newColor;
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21 with 2 digit precision.
 */
export function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  const contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

  return Number(contrastRatio.toFixed(2)); // Truncate at two digits
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color, coefficient) {
  let newColor = color;
  let newCoefficient = coefficient;
  newColor = decomposeColor(newColor);
  newCoefficient = clamp(newCoefficient, 0, 1);

  if (newColor.type.indexOf('hsl') > -1) {
    newColor.values[2] *= 1 - newCoefficient;
  } else if (newColor.type.indexOf('rgb') > -1) {
    for (let i = 0; i < 3; i += 1) {
      newColor.values[i] *= 1 - newCoefficient;
    }
  }

  return convertColorToString(newColor);
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color, coefficient) {
  let newColor = color;
  let newCoefficient = coefficient;
  newColor = decomposeColor(newColor);
  newCoefficient = clamp(newCoefficient, 0, 1);

  if (newColor.type.indexOf('hsl') > -1) {
    newColor.values[2] += (100 - newColor.values[2]) * newCoefficient;
  } else if (newColor.type.indexOf('rgb') > -1) {
    for (let i = 0; i < 3; i += 1) {
      newColor.values[i] += (255 - newColor.values[i]) * newCoefficient;
    }
  }

  return convertColorToString(newColor);
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient);
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function fade(color, value) {
  let newColor = color;
  let newValue = value;
  newColor = decomposeColor(newColor);
  newValue = clamp(newValue, 0, 1);

  if (newColor.type === 'rgb' || newColor.type === 'hsl') {
    newColor.type += 'a';
  }
  newColor.values[3] = newValue;

  return convertColorToString(newColor);
}

function padZero(str, len) {
  let length = len;
  const string = str;
  length = length || 2;
  const zeros = new Array(length).join('0');

  return (zeros + string).slice(-length);
}

export function invertColor(hex, bw) {
  let newHex = hex;

  if (newHex.indexOf('#') === 0) {
    newHex = newHex.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (newHex.length === 3) {
    newHex = newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2];
  }

  if (newHex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  let r = parseInt(newHex.slice(0, 2), 16);
  let g = parseInt(newHex.slice(2, 4), 16);
  let b = parseInt(newHex.slice(4, 6), 16);

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return

  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
}

// @ts-ignore-end