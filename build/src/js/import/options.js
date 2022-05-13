const options = {
  mathUtils: {
    // Random float
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
    calcWinsize: () => ({ width: window.innerWidth, height: window.innerHeight }),
  },
};

export default options;
