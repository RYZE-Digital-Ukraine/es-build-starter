const options = {
  initText: 'App init',
  mathUtils: {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b,
    // eslint-disable-next-line no-nested-ternary
    clamp: (num, min, max) => (num <= min ? min : num >= max ? max : num),
    // Random float
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
    calcWinsize: () => ({ width: window.innerWidth, height: window.innerHeight }),
  },
  body: document.body, // $("body")
  header: document.querySelector('.page-header'),
};

export default options;
