// import { isMobile } from "mobile-device-detect";
import { options } from "./options";
// import "simplebar";

// Global helpers
// YT Player
function onYouTubeIframeAPIReady() {
  function onPlayerReady(event) {
    // event.target.mute();
    // event.target.playVideo();
    // $(event.target.h).parent().find('img').fadeOut(3000);
  }

  let config = {
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
    videoId: ''
  };
  $("[data-video]").each((i, el) => {
    config.videoId = config.playerVars.playlist = $(el).data('id');
    let $wrap = $(el).parent();
    const player = new YT.Player(el, config);
    $wrap.find("button").on("click", (ev) => {
      player.playVideo();
      $(ev.currentTarget).fadeOut().prev("img").fadeOut(800);
    });
  });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

window.blockScroll = function() {
  let scrollPosition = [
    this.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    this.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
  ];
  let html = $("html"); // it would make more sense to apply this to body, but IE7 won't have that
  html.data("scroll-position", scrollPosition);
  html.data("previous-overflow", html.css("overflow"));
  html.css("overflow", "hidden");
  window.scrollTo(scrollPosition[0], scrollPosition[1]);;
}

window.unblockScroll = function() {
  let html = $("html");
  let scrollPosition = html.data("scroll-position");
  html.css("overflow", html.data("previous-overflow"));
  if (scrollPosition) window.scrollTo(scrollPosition[0], scrollPosition[1])
}
// end

// Smooth scroll to ellement
export function scrollHeader() {
  const scrollTop = options.header.offset().top ? true : false;
  scrollTop
    ? options.header.addClass("is-scroll")
    : options.header.removeClass("is-scroll");
}

export function setIntersectionObserver (callback, section) {

  let boxElement;
  let prevRatio = 0.0;

  boxElement = document.querySelector(section);

  createObserver();

  function createObserver() {
    let observer;

    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersect, observerOptions);
    observer.observe(boxElement);
  }

  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 1;

    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > prevRatio) {
        setTimeout(() => {
          callback()
        }, 1000);
      } else {
        setTimeout(() => {
          callback()
        }, 1000);
      }

      prevRatio = entry.intersectionRatio;
    });
  }
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
  const $video = $("video, iframe");
  if ($video.length) {
    $video.parent().is("p")
      ? $video.parent().addClass("ratio-16x9")
      : $video.wrap("<div class='ratio-16x9'></div>");
  }
}

export function accordionMenu(ev) {
  if (!$(ev.currentTarget).closest('.accordion__tab').hasClass('active')) {
    $(ev.currentTarget).closest('.accordion__tab').addClass('active').find('.accordion__content').slideToggle();
    // $(ev.currentTarget).closest('.accordion__tab').addClass('active').siblings('.accordion__tab.active').removeClass('active')
    // .find('.accordion__content').slideToggle();
  }
  else $(ev.currentTarget).closest('.accordion__tab').removeClass('active').find('.accordion__content').slideToggle();
}

// Burger sidebar
export function showMenu(close = false) {
  if (close || options.header.find(".burger-container").hasClass("is-animate")) {
    options.header.removeClass("is-open");
    options.header.find(".burger-container").removeClass("is-animate");
    unblockScroll();
  } else {
    options.header.addClass("is-open");
    options.header.find(".burger-container").addClass("is-animate");
    blockScroll();
  }
}
// Site loader
export function setProgress(action) {
  let $counter = $(".preloader-counter"),
    $bar = $(".preloader-bar");
  if (action) $counter.text("1");
  let interval = setInterval(bar, Math.ceil(Math.random() * 100 + 50));
  function bar() {
    let progress = parseInt($counter.text());
    if (!action) {
      clearInterval(interval);
      $counter.text("100");
      $bar.css("background-size", "100%");
      options.body.addClass("loaded");
    } else if (progress <= 80) {
      let random = Math.floor(Math.random() * 10);
      progress += random;
      $counter.text(progress);
      $bar.css("background-size", `${progress}%`);
    }
  }
}
export function setFullHeight() {
  let vh = $(window).innerHeight() * 0.01;
  $("html").attr("style", `--vh: ${vh}px`);
}
// Checking input for empty value
export function fillInput(ev) {
  makeActive();
  let el = $(ev.currentTarget);
  if (el.is("input[type='checkbox']")) {
    return ev.type === "change"
      ? el.closest(".form-group").toggleClass("is-filled")
      : false;
  } else if (el.is("input[type='radio']")) {
    return makeActive();
  }
  if (el.val() !== "" || ev.type === "focus") {
    el.closest(".form-group").addClass("is-filled");
  } else {
    el.closest(".form-group").removeClass("is-filled");
  }
  function makeActive() {
    $("input[type='radio']").each(function () {
      if ($(this).prop("checked")) {
        $(this).closest(".form-group").addClass("is-filled");
      } else {
        $(this).closest(".form-group").removeClass("is-filled");
      }
    });
  }
}
// Show pass in input[password] when hold
export function showPass(ev) {
  if (isMobile && ev.type === "click") {
    $(ev.currentTarget).prev().attr("type") === "text"
      ? $(ev.currentTarget).prev().attr("type", "password")
      : $(ev.currentTarget).prev().attr("type", "text");
  } else if (ev.type === "mousedown" && !isMobile) {
    $(ev.currentTarget).prev().prop("type", "text");
  } else if ((ev.type === "mouseup" || ev.type === "mouseout") && !isMobile) {
    $(ev.currentTarget).prev().prop("type", "password");
  }
}
// Smooth scroll to ellement
export function scrollTo(ev) {
  showMenu(true);
  let toEl = $(ev.currentTarget).attr("href");
  // toEl ? scroll.scrollTo(toEl, -70) : scroll.scrollTo(0);
  $("html, body").animate({
    scrollTop: $(toEl).offset().top - options.header.outerHeight()
}, 500, "linear");
  return false;
}

// Universal Selector
export function selector(ev) {
  if ($(ev.currentTarget).length) $(ev.currentTarget).toggleClass("is-open");
}
// Expand text
export function expander(ev) {
  let $content = $(ev.currentTarget).prev(),
    curHeight = $content.height();
  $content.css("height", "auto");
  $content.attr("aria-expanded", true);
  let autoHeight = $content.height();
  // with scroll height of scrolled element
  $content
    .height(curHeight)
    .animate({ height: autoHeight }, 300);
  $(ev.currentTarget).remove();
}

// Tabs
export function openTab(ev) {
  ev.preventDefault();
  const id = $(ev.currentTarget).data("target");
  const pos = $(this).position();
  if ($(this).parent().find(".tab-slider").length) {
    $(this).parent().find(".tab-slider")
      .stop()
      .css({
        left: pos.left,
        width: $(this).outerWidth(),
      });
  }
  $(".tab__content").each((i, el) => {
    $(el).attr("visibility", "hidden");
    $(el).removeClass("active");
  });
  $(".tab__link").each((i, el) => {
    $(el).removeClass("active");
  });
  $(id).attr("visibility", "");
  $(id).addClass("active");
  $(ev.currentTarget).addClass("active");
}

// Modals & popups
export class Modal {
  constructor(selector) {
    this.selector = selector;
    this.run();
  }
  closeOnEsc(ev) {
    if (ev.keyCode == 27) {
      options.body.css("overflow", "");
      $(".show-modal").removeClass("show-modal");
      $(window).off("keydown", this.closeOnEsc);
    }
  }
  closeModal(modal) {
    if ($(modal).length) {
      options.body.css("overflow", "");
      $(modal).parent().removeClass("show-modal");
      $(window).off("keydown", this.closeOnEsc);
    }
  }
  openModal(modal) {
    if ($(modal).length) {
      options.body.css("overflow", "hidden");
      $(modal).parent().addClass("show-modal");
      $(window).on("keydown", this.closeOnEsc);
    }
  }
  render(el) {
    const modalClass = $(el).data("modal") || ".modal",
      $btnClose = $(modalClass).find(".btn-close");
    $(el).on("click", () => this.openModal(modalClass));
    $btnClose.on("click", () => this.closeModal(modalClass));
    $(modalClass)
      .parent()
      .on("click", (ev) => {
        if (ev.currentTarget === ev.target) this.closeModal(modalClass);
      });
  }
  run() {
    const $elements = $(this.selector);
    $elements.each((i, el) => this.render(el));
  }
}
// Coundown
export function countdown(cls) {
  if (!$(cls).length) return;
  $(cls).each((i, el) => {
    const end = $(el).data("end");
    let timer = setInterval(() => {
      let t = end - Date.now(),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((t % (1000 * 60)) / 1000);
      days
        ? $(el).text(`${days}d ${hours}h ${minutes}min ${seconds}sec`)
        : $(el).text(`${hours}h ${minutes}min ${seconds}sec`);
      if (t <= 0) {
        clearInterval(timer);
        $(el).closest(".card").remove();
      }
    }, 1000);
  });
}
export class Timer {
  constructor(element) {
    this.clock = $(element);
    this.end = this.clock.data("end");
    this.initClock(this.clock, this.end);
  }
  getTimeRemaining(endtime = Date.now() + 604800000) {
    let t = endtime - Date.now(),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor(t / (1000 * 60 * 60 * 24));
    return { total: t, days, hours, minutes, seconds };
  }
  initClock(clock, endtime) {
    if (!clock.length) return;
    let daysSpan = clock.find(".days"),
      hoursSpan = clock.find(".hours"),
      minutesSpan = clock.find(".minutes"),
      secondsSpan = clock.find(".seconds");

    let $circ = this.clock.find(".timer-circle path"),
      radius = Math.round($circ.get(0).getTotalLength());
    $circ.css("strokeDasharray", `${radius} ${radius}`);
    $circ.css("strokeDashoffset", radius);
    let updateClock = () => {
      const t = this.getTimeRemaining(endtime);
      if (t.total <= 0) {
        clearInterval(timeinterval);
        daysSpan.text("0");
        hoursSpan.text("0");
        minutesSpan.text("0");
        secondsSpan.text("0");
      } else {
        daysSpan.text(t.days);
        hoursSpan.text(("0" + t.hours).slice(-2));
        hoursSpan
          .parent()
          .prev()
          .find("path")
          .css("strokeDashoffset", (radius * t.hours) / 24);
        minutesSpan.text(("0" + t.minutes).slice(-2));
        minutesSpan
          .parent()
          .prev()
          .find("path")
          .css("strokeDashoffset", (radius * t.minutes) / 60);
        secondsSpan.text(("0" + t.seconds).slice(-2));
        secondsSpan
          .parent()
          .prev()
          .find("path")
          .css("strokeDashoffset", (radius * t.seconds) / 60);
      }
    };
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }
}
// global end
// export function blogFilter(ev) {
//   let $input = $(ev.currentTarget);
//   if (parseInt($input.val()) === 0) {
//     $input
//       .closest(".form-group")
//       .siblings()
//       .removeClass("is-filled")
//       .find(".form-control")
//       .prop("checked", false);
//   } else
//     $input
//       .closest(".form-group")
//       .siblings()
//       .eq(0)
//       .removeClass("is-filled")
//       .find(".form-control")
//       .prop("checked", false);
// }

// let cursor;
// export function customCursor(el, ev) {
//   cursor = $(el);
//   const mouseX = ev.clientX,
//   mouseY = ev.clientY,
//   posX = cursor.width() / 2,
//   posY = cursor.height() / 2;
//   gsap.to(cursor, 0.2, {
//     x: mouseX - posX,
//     y: mouseY - posY
//   })
// }

// const hover = $("a, button, .border-corner")
// hover.mouseover(() => {
//   gsap.to(cursor, 0.8, { ease: "elastic", scale: 2 })
// });
// hover.mouseout(() => {
//   gsap.to(cursor, 0.8, { ease: "elastic", scale: 1 })
// });
