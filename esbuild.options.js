const devMode = process.env.ESBUILD_DEV === 'true' || false,
  URL = null, // if use different server (e.g. OpenServer)
  base = './build',
  paths = {
  src: `${base}/src`,
  dist: `${base}/dist`,
  getJS() {
    return {
      src: `${this.src}/js/`,
      dist: `${this.dist}/js/`,
    }
  },
  getCSS() {
    return {
      src: `${this.src}/css/`,
      dist: `${this.dist}/css/`,
    }
  },
  getFonts() {
    return {
      src: `${this.src}/fonts/`,
      dist: `${this.dist}/fonts/`,
    }
  },
  getImgs() {
    return {
      src: `${this.src}/imgs/`,
      dist: `${this.dist}/imgs/`,
    }
  }
},
utils = {
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }
    return true;
  }
},
settings = {
  support: ['chrome58', 'firefox57', 'safari11', 'edge16']
};

export {
  devMode,
  URL,
  base,
  paths,
  utils,
  settings
};
