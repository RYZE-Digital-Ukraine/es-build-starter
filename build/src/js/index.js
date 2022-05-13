import options from './import/options';

class App {
  constructor() {
    this.initPhrase = 'App init';
  }

  init() {
    // eslint-disable-next-line
    if (DEBUG) {
      // eslint-disable-next-line
      console.log(this.initPhrase, options.body);
    }
  }
}

const APP = new App();
APP.init();
