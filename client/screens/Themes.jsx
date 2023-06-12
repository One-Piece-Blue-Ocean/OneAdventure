const muted = {
  gold: 'rgb(249, 191, 35)',
  red: 'rgb(213,43,30)',
  blue: 'rgb(28,143,210)',
  orange: 'rgb(255,112,67)',
  peach: 'rgb(188,143,143)',
  black: 'rgb(0,0,0)',
  white: 'rgb(255,255,255)',
};

const categoryTheme = {
  hiking: muted.gold,
};

const myTheme = {
  dark: false,
  colors: {
    primary: muted.red,
    background: muted.white,
    card: muted.white,
    text: muted.black,
    border: muted.peach,
    notification: muted.orange,
  },
};

export { myTheme, muted, categoryTheme };
