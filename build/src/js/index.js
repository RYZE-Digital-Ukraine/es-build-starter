// Libs/Plugins
import lozad from 'lozad';
// Global options and utils
import opts from './import/options';
// import "./import/sliders";
import {
  // embedYoutube,
  // accordionMenu,
  setFullHeight,
  // fillInput,
  formsValidations,
  // expander,
  // scrollTo,
  // scrollHeader,
  // selector,
  // openTab,
  showMenu,
  // setProgress,
  scrollHeader,
  // setIntersectionObserver,
  // setAspectRatioVideo,
  // Modal,
  // Timer,
  // customCursor,
} from './import/helpers';

class App {
  constructor() {
    // Vars
    this.initPhrase = opts.initText;
    this.validation = null;
    // Funcs
    // embedYoutube();
    setFullHeight();
    // Calls
    App.loadSvgOnPage();
    this.addEventListeners();
    this.setFormsValidations();
  }

  static loadSvgOnPage() {
    const sprite = document.getElementById('sprite');
    const path = sprite.dataset.path || '';
    fetch(`${path}/imgs/stack/sprite.svg`)
      .then((res) => res.text())
      .then((text) => {
        sprite.innerHTML = text;
      });
  }

  static lazyLoadInit(cls = '[data-src]') {
    const observer = lozad(cls, opts.lozad);
    observer.observe();
  }

  setFormsValidations() {
    this.validation = formsValidations();
  }

  addEventListeners() {
    // eslint-disable-next-line no-underscore-dangle
    this._initScriptsEvent = new Event('scriptsInit');

    document.addEventListener('scriptsInit', () => {
      console.info(`Init scripts\n`);
    });

    document.addEventListener('dblclick', (ev) => {
      const now = new Date().getTime();
      let lastTouchEnd = 0;
      if (now - lastTouchEnd <= 300) {
        ev.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    window.addEventListener('scroll', () => {
      scrollHeader();
    });

    window.addEventListener('load', () => {
      scrollHeader();
      // eslint-disable-next-line
      console.log(`${this.initPhrase}\n`);
    });

    window.addEventListener('resize', () => {
      setFullHeight();
    });

    // Elements events
    // $('.to-top, a[href^=\'#sec\']').on('click', scrollTo);
    document.querySelector('#nav-toggle')
      .addEventListener('click', () => showMenu());
    // $('.accordion__title').on('click', accordionMenu);
  }

  init() {
    // eslint-disable-next-line
    if (DEBUG) {
      // eslint-disable-next-line
      console.info('Debug is ON');
    }
    App.lazyLoadInit();
    // eslint-disable-next-line no-underscore-dangle
    document.dispatchEvent(this._initScriptsEvent);
  }
}

const APP = new App();
APP.init();
