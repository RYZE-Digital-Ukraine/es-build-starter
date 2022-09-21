import opts from './import/options';
// import "./import/sliders";
import {
  // embedYoutube,
  // accordionMenu,
  setFullHeight,
  // fillInput,
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
    this.addEventListeners();
    this.loadSvgOnPage();
    // embedYoutube();
    setFullHeight();
    this.initPhrase = opts.initText;
  }

  loadSvgOnPage() {
    const sprite = document.getElementById('sprite');
    const path = sprite.dataset.path || '';
    fetch(`${path}/imgs/stack/sprite.svg`)
      .then((res) => res.text())
      .then((text) => {
        sprite.innerHTML = text;
      });
  }

  addEventListeners() {
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
      .addEventListener('click', showMenu);
    // $('.accordion__title').on('click', accordionMenu);
  }

  init() {
    // eslint-disable-next-line
    if (DEBUG) {
      // eslint-disable-next-line
      console.info('Debug is ON');
    }
  }
}

const APP = new App();
APP.init();
