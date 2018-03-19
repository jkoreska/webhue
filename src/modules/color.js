
const hueToRgb = hue => {
  hue = (hue / 65535) * 360;
  let r = 0, g = 0, b = 0;
  const v = 1, s = 1;
  const C = v * s;
  const hex = hue / 60;
  const X = C * (1 - Math.abs(hex % 2 - 1));
  if (hex >= 0 && hex < 1) {
    r = C;
    g = X;
  } else if (hex >= 1 && hex < 2) {
    r = X;
    g = C;
  } else if (hex >= 2 && hex < 3) {
    g = C;
    b = X;
  } else if (hex >= 3 && hex < 4) {
    g = X;
    b = C;
  } else if (hex >= 4 && hex < 5) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }
  const m = v - C;
  r = Math.round((r + m) * 255.0);
  g = Math.round((g + m) * 255.0);
  b = Math.round((b + m) * 255.0);
  return { r, g, b };
};

export {
  hueToRgb,
};
