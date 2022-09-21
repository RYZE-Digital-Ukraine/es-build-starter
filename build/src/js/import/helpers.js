/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
// import { isMobile } from "mobile-device-detect";
import opts from './options';

// Global helpers
// YT Player
function onYouTubeIframeAPIReady() {
  // function onPlayerReady(event) {
  // event.target.mute();
  // event.target.playVideo();
  // $(event.target.h).parent().find('img').fadeOut(3000);
  // }

  const config = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      loop: 1,
      controls: 1,
      disablekb: 1,
      fs: 0,
      rel: 0,
      playlist: '',
      showinfo: 0,
      enablejsapi: 1,
      autohide: 0,
      modestbranding: 1,
      wmode: 'opaque',
    },
    videoId: '',
  };
  document.querySelectorAll('[data-video]').forEach((el) => {
    // eslint-disable-next-line no-multi-assign
    config.videoId = config.playerVars.playlist = el.dataset.id;
    const wrap = el.parentElement;
    // eslint-disable-next-line no-undef
    const player = new YT.Player(el, config);
    wrap.querySelector('button').addEventListener('click', (ev) => {
      player.playVideo();
      const banner = document.querySelector('.banner');
      banner.classList.add('hide');
      ev.currentTarget.classList.add('hide');
    });
  });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

window.blockScroll = () => {
  const scrollPosition = [
    window.pageXOffset
    || document.documentElement.scrollLeft
    || document.body.scrollLeft,
    window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop,
  ];
  // it would make more sense to apply this to body, but IE7 won't have that
  const html = document.documentElement;
  html.dataset.scrollPosition = scrollPosition;
  html.dataset.previousOverflow = html.style.overflow;
  html.style.overflow = 'hidden';
  window.scrollTo(scrollPosition[0], scrollPosition[1]);
};

window.unblockScroll = () => {
  const html = document.documentElement;
  const { scrollPosition } = html.dataset;
  html.style.overflow = html.dataset.previousOverflow;
  if (scrollPosition) window.scrollTo(scrollPosition[0], scrollPosition[1]);
};
// end

// Smooth scroll to ellement
export function scrollHeader() {
  const scrollTop = !!window.scrollY;
  if (scrollTop) opts.header.classList.add('is-scroll');
  else opts.header.classList.remove('is-scroll');
}

export function setIntersectionObserver(callback, section) {
  const boxElement = document.querySelector(section);
  let prevRatio = 0.0;

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > prevRatio) {
        setTimeout(() => {
          callback();
        }, 1000);
      } else {
        setTimeout(() => {
          callback();
        }, 1000);
      }

      prevRatio = entry.intersectionRatio;
    });
  };

  const buildThresholdList = () => {
    const thresholds = [];
    const numSteps = 1;

    for (let i = 1.0; i <= numSteps; i++) {
      const ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  };
  function createObserver() {
    const observerOpts = {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList(),
    };
    const observer = new IntersectionObserver(handleIntersect, observerOpts);
    observer.observe(boxElement);
  }

  createObserver();
}

// Insert iframe API YT script
export function embedYoutube() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Set aspect ratio to html video
export function setAspectRatioVideo() {
  const media = document.querySelectorAll('video, iframe');
  media.forEach((item) => {
    if (item.parentNode.tagName === 'p') {
      item.parentNode.classList.add('ratio ratio-16x9');
    } else {
      const wrap = document.createElement('div');
      wrap.className = 'ratio ratio-16x9';
      item.replaceWith(wrap);
      wrap.append(item);
    }
  });
}

// Accordion menu
export function accordionMenu(cls) {
  const clickTitles = document.querySelectorAll(cls);
  let heightContent;

  clickTitles.forEach((clickTitle, idx) => {
    clickTitle.addEventListener('click', () => {
      const accordionTab = document.querySelectorAll('.accordion__tab')[idx];
      const accordionContent = document.querySelectorAll('.accordion__content')[idx];

      if (accordionTab.classList.contains('active')) {
        accordionContent.style.height = heightContent;
        accordionTab.classList.remove('active');
      } else {
        heightContent = `${accordionContent.offsetHeight}px`;
        accordionTab.classList.add('active');
        accordionContent.style.height = '0px';
      }
    });
  });
}

// Burger sidebar
export function showMenu(close = false) {
  if (close || opts.header.querySelector('.burger-container').classList.contains('is-animate')) {
    opts.header.classList.remove('is-open');
    opts.header.querySelector('.burger-container').classList.remove('is-animate');
    unblockScroll();
  } else {
    opts.header.classList.add('is-open');
    opts.header.querySelector('.burger-container').classList.add('is-animate');
    blockScroll();
  }
}

// Site loader
export function setFullHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.setAttribute('style', `--vh: ${vh}px`);
}

// Checking input for empty value
// export function fillInput(ev) {
//   makeActive();
//   const el = $(ev.currentTarget);
//   if (el.is("input[type='checkbox']")) {
//     return ev.type === 'change'
//       ? el.closest('.form-group').toggleClass('is-filled')
//       : false;
//   } if (el.is("input[type='radio']")) {
//     return makeActive();
//   }
//   if (el.val() !== '' || ev.type === 'focus') {
//     el.closest('.form-group').addClass('is-filled');
//   } else {
//     el.closest('.form-group').removeClass('is-filled');
//   }
//   function makeActive() {
//     $("input[type='radio']").each(function () {
//       if ($(this).prop('checked')) {
//         $(this).closest('.form-group').addClass('is-filled');
//       } else {
//         $(this).closest('.form-group').removeClass('is-filled');
//       }
//     });
//   }
// }

// Smooth scroll to ellement
// export function scrollTo(ev) {
//   showMenu(true);
//   const toEl = $(ev.currentTarget).attr('href');
//   // toEl ? scroll.scrollTo(toEl, -70) : scroll.scrollTo(0);
//   $('html, body').animate({
//     scrollTop: $(toEl).offset().top - opts.header.outerHeight(),
//   }, 500, 'linear');
//   return false;
// }

// Universal Selector toggler
export function toggler(ev) {
  if (ev.currentTarget) ev.currentTarget.classList.toggle('is-open');
}

// Expand text
export function expander(ev) {
  const content = ev.currentTarget.previousElementSibling;
  // const curHeight = content.clientHeight;
  content.style.height = 'auto';
  content.setAttribute('aria-expanded', true);
  const autoHeight = content.clientHeight;
  // with scroll height of scrolled element
  content.style.height = autoHeight;
  ev.currentTarget.remove();
}

// Tabs
// export function openTab(ev) {
//   ev.preventDefault();
//   const id = $(ev.currentTarget).data('target');
//   const pos = $(this).position();
//   if ($(this).parent().find('.tab-slider').length) {
//     $(this).parent().find('.tab-slider')
//       .stop()
//       .css({
//         left: pos.left,
//         width: $(this).outerWidth(),
//       });
//   }
//   $('.tab__content').each((i, el) => {
//     $(el).attr('visibility', 'hidden');
//     $(el).removeClass('active');
//   });
//   $('.tab__link').each((i, el) => {
//     $(el).removeClass('active');
//   });
//   $(id).attr('visibility', '');
//   $(id).addClass('active');
//   $(ev.currentTarget).addClass('active');
// }

// Modals & popups
export class Modal {
  constructor(selector) {
    this.selector = selector;
    this.run();
  }

  closeOnEsc(ev) {
    if (ev.keyCode === 27) {
      opts.body.style.overflow = '';
      document.querySelector('.show-modal').classList.remove('show-modal');
      window.removeEventListener('keydown', this.closeOnEsc);
    }
  }

  closeModal(modal) {
    if (modal) {
      opts.body.style.overflow = '';
      modal.parentNode.classList.remove('show-modal');
      window.removeEventListener('keydown', this.closeOnEsc);
    }
  }

  openModal(modal) {
    if (modal) {
      opts.body.style.overflow = 'hidden';
      modal.parentNode.classList.add('show-modal');
      window.addEventListener('keydown', this.closeOnEsc);
    }
  }

  render(el) {
    const modalEl = document.querySelector(el.dataset.modal || '.modal');
    const btnClose = modalEl.querySelectorAll('.btn-close');
    el.addEventListener('click', () => this.openModal(modalEl));
    btnClose.forEach((elem) => elem.addEventListener('click', () => this.closeModal(modalEl)));
    modalEl
      .parentNode
      .addEventListener('click', (ev) => {
        if (ev.currentTarget === ev.target) this.closeModal(modalEl);
      });
  }

  run() {
    const elements = document.querySelectorAll(this.selector);
    elements.forEach((el) => this.render(el));
  }
}
// Coundown
export function countdown(cls) {
  const cd = document.querySelector(cls);
  if (!cd) return;
  cls.forEach((el) => {
    const { end } = el.dataset;
    const timer = setInterval(() => {
      const t = end - Date.now();
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);
      // eslint-disable-next-line no-param-reassign
      el.innerText = days
        ? `${days}d ${hours}h ${minutes}min ${seconds}sec`
        : `${hours}h ${minutes}min ${seconds}sec`;
      if (t <= 0) {
        clearInterval(timer);
        el.closest('.card').remove();
      }
    }, 1000);
  });
}

// global end

// const hover = $("a, button, .border-corner")
// hover.mouseover(() => {
//   gsap.to(cursor, 0.8, { ease: "elastic", scale: 2 })
// });
// hover.mouseout(() => {
//   gsap.to(cursor, 0.8, { ease: "elastic", scale: 1 })
// });
